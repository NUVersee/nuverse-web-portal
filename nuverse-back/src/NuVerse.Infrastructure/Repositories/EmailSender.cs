using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using NuVerse.Application.Interfaces.Repositories;
using NuVerse.Domain.Entities;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace NuVerse.Infrastructure.Repositories
{
    public class EmailSender : IEmailSender, IAsyncDisposable
    {
        private readonly EmailSettings _settings;
        private readonly Domain.Configurations.EmailTemplates _templates;
        private readonly ILogger<EmailSender> _logger;
        private readonly SmtpClient _client;
        private readonly SemaphoreSlim _clientLock = new SemaphoreSlim(1, 1);
        // 0 = not disposed, 1 = disposed
        private int _disposed;

        public EmailSender(IOptions<EmailSettings> settings, IOptions<NuVerse.Domain.Configurations.EmailTemplates> templates, ILogger<EmailSender> logger)
        {
            _settings = settings.Value;
            _templates = templates?.Value ?? new NuVerse.Domain.Configurations.EmailTemplates();
            _logger = logger;
            _client = new SmtpClient();

            if (string.IsNullOrWhiteSpace(_settings.To))
            {
                _logger.LogError("EmailSettings.To is not configured.");
                throw new InvalidOperationException("EmailSettings:To is not configured.");
            }
        }

        public async Task SendEmailAsync(string fullName, string email, string phone, string reason)
        {
            // Prevent operations after DisposeAsync has started
            if (System.Threading.Interlocked.CompareExchange(ref _disposed, 0, 0) == 1)
                throw new ObjectDisposedException(nameof(EmailSender));

            var username = _settings.Username ?? Environment.GetEnvironmentVariable("SMTP_USER");
            var password = _settings.Password ?? Environment.GetEnvironmentVariable("SMTP_PASS");

            if (string.IsNullOrWhiteSpace(_settings.From))
            {
                _logger.LogError("EmailSettings.From is not configured.");
                throw new InvalidOperationException("EmailSettings:From is not configured.");
            }

            var maxAttempts = 3;
            var attempt = 0;

            await _clientLock.WaitAsync();
            try
            {
                // Ensure connected and authenticated
                if (!_client.IsConnected)
                {
                    try
                    {
                        var useSsl = _settings.UseSsl;
                        var secure = useSsl ? SecureSocketOptions.StartTls : SecureSocketOptions.Auto;
                        await _client.ConnectAsync(_settings.Host, _settings.Port, secure);
                        if (!string.IsNullOrWhiteSpace(username) && !string.IsNullOrWhiteSpace(password))
                        {
                            await _client.AuthenticateAsync(username, password);
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Failed to connect/authenticate to SMTP server");
                        throw;
                    }
                }

            // SEND TO NUVERSE
            var adminSubject = Format(_templates.AdminSubject, fullName, email, phone, reason) ?? $"VR Request - {fullName}";
            var adminBody = Format(_templates.AdminBody, fullName, email, phone, reason) ??
                $"VR Request From: {fullName}\nEmail: {email}\nPhone: {phone}\n\nReason:\n{reason}";

            // admin message will be created as a MimeMessage below and sent via MailKit

                // Send admin message with simple retry/backoff
                var adminMime = BuildMimeMessage(_settings.From, _settings.To ?? _settings.From, adminSubject, adminBody, email);
                while (true)
                {
                    attempt++;
                    try
                    {
                        await _client.SendAsync(adminMime, CancellationToken.None);
                        break;
                    }
                    catch (Exception ex) when (attempt < maxAttempts)
                    {
                        var delay = TimeSpan.FromSeconds(Math.Pow(2, attempt));
                        _logger.LogWarning(ex, "Transient SMTP error, attempt {Attempt} of {Max}. Retrying after {Delay}s.", attempt, maxAttempts, delay.TotalSeconds);
                        await Task.Delay(delay);
                        // ensure still connected/authenticated before retrying
                        if (!_client.IsConnected)
                        {
                            try
                            {
                                await _client.ConnectAsync(_settings.Host, _settings.Port, _settings.UseSsl ? SecureSocketOptions.StartTls : SecureSocketOptions.Auto);
                                if (!string.IsNullOrWhiteSpace(username) && !string.IsNullOrWhiteSpace(password))
                                    await _client.AuthenticateAsync(username, password);
                            }
                            catch (Exception inner)
                            {
                                _logger.LogWarning(inner, "Reconnect failed during retry");
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Failed to send admin notification email after {Attempts} attempts.", attempt);
                        throw;
                    }
                }

                // AUTO REPLY TO USER - make it required for parity with admin notification
                if (!string.IsNullOrWhiteSpace(email))
                {
                    try
                    {
                        var userSubject = Format(_templates.UserSubject, fullName, email, phone, reason) ?? "NuVerse - We Received Your VR Request";
                        var userBody = Format(_templates.UserBody, fullName, email, phone, reason) ??
                            $"Hello {fullName},\n\nWe received your VR request:\n\n{reason}\n\nWe will contact you soon.\n\nRegards,\nNuVerse Team";

                        var userMime = BuildMimeMessage(_settings.From, email, userSubject, userBody, null);
                        _logger.LogInformation("Sending auto-reply to {Email}", email);
                        await _client.SendAsync(userMime, CancellationToken.None);
                        _logger.LogInformation("Auto-reply sent to {Email}", email);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Failed to send auto-reply to user {Email}", email);
                        throw; // bubble up so caller knows the overall send failed
                    }
                }
            }
            finally
            {
                _clientLock.Release();
            }
        }

        private static string? Format(string? template, string fullName, string email, string phone, string reason)
        {
            if (string.IsNullOrWhiteSpace(template))
                return null;

            return template
                .Replace("{FullName}", fullName)
                .Replace("{Email}", email)
                .Replace("{Phone}", phone)
                .Replace("{Reason}", reason);
        }

        private MimeMessage BuildMimeMessage(string from, string to, string subject, string body, string? replyTo)
        {
            var message = new MimeMessage();
            message.From.Add(MailboxAddress.Parse(from));
            message.Subject = subject;
            if (!string.IsNullOrWhiteSpace(replyTo))
            {
                try
                {
                    message.ReplyTo.Add(MailboxAddress.Parse(replyTo));
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Invalid reply-to address: {ReplyTo}", replyTo);
                }
            }

            var toAddresses = to?.Split(new[] { ';', ',' }, StringSplitOptions.RemoveEmptyEntries) ?? Array.Empty<string>();
            foreach (var addr in toAddresses)
            {
                try
                {
                    message.To.Add(MailboxAddress.Parse(addr.Trim()));
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Invalid recipient address: {Addr}", addr);
                }
            }

            var builder = new BodyBuilder { TextBody = body };
            message.Body = builder.ToMessageBody();
            return message;
        }

        public async ValueTask DisposeAsync()
        {
            await _clientLock.WaitAsync();
            try
            {
                if (_client.IsConnected)
                {
                    try
                    {
                        await _client.DisconnectAsync(true);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning(ex, "Error disconnecting SMTP client during dispose.");
                    }
                }

                _client.Dispose();
            }
            finally
            {
                _clientLock.Release();
                _clientLock.Dispose();
            }
        }
    }
}
