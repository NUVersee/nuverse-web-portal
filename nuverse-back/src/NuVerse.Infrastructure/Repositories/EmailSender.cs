using System;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using NuVerse.Application.Interfaces.Repositories;
using NuVerse.Domain.Entities;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace NuVerse.Infrastructure.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly EmailSettings _settings;
        private readonly ILogger<EmailSender> _logger;

        public EmailSender(IOptions<EmailSettings> settings, ILogger<EmailSender> logger)
        {
            _settings = settings.Value;
            _logger = logger;
        }

        public async Task SendEmailAsync(string fullName, string email, string phone, string reason)
        {
            var username = _settings.Username ?? Environment.GetEnvironmentVariable("SMTP_USER");
            var password = _settings.Password ?? Environment.GetEnvironmentVariable("SMTP_PASS");

            if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
            {
                throw new InvalidOperationException("SMTP credentials are not configured. Set EmailSettings:Username/Password or environment variables SMTP_USER/SMTP_PASS.");
            }

            if (string.IsNullOrWhiteSpace(_settings.From))
            {
                _logger.LogError("EmailSettings.From is not configured.");
                throw new InvalidOperationException("EmailSettings:From is not configured.");
            }

            using var client = new SmtpClient(_settings.Host, _settings.Port)
            {
                EnableSsl = _settings.UseSsl,
                Credentials = new NetworkCredential(username, password)
            };

            // SEND TO NUSERSE
            var adminBody =
                $"VR Request From: {fullName}\n" +
                $"Email: {email}\n" +
                $"Phone: {phone}\n\n" +
                $"Reason:\n{reason}";

            var adminMsg = new MailMessage
            {
                // Use the configured, verified From address to avoid spoofing/SPF failures
                From = new MailAddress(_settings.From),
                Subject = $"VR Request - {fullName}",
                Body = adminBody
            };

            // Add the user's address as Reply-To so admins can reply directly
            if (!string.IsNullOrWhiteSpace(email))
            {
                try
                {
                    adminMsg.ReplyToList.Add(new MailAddress(email));
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Invalid user reply-to address: {Email}", email);
                }
            }

            adminMsg.To.Add(_settings.From);

            try
            {
                await client.SendMailAsync(adminMsg);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send admin notification email.");
                throw; // bubble up so callers can handle or observe failure
            }

            // AUTO REPLY TO USER
            // Send auto-reply to user only if their email appears valid
            if (!string.IsNullOrWhiteSpace(email))
            {
                try
                {
                    var userMsg = new MailMessage
                    {
                        From = new MailAddress(_settings.From),
                        Subject = "NuVerse - We Received Your VR Request",
                        Body = $"Hello {fullName},\n\nWe received your VR request:\n\n{reason}\n\nWe will contact you soon.\n\nRegards,\nNuVerse Team"
                    };

                    userMsg.To.Add(new MailAddress(email));

                    await client.SendMailAsync(userMsg);
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Failed to send auto-reply to user {Email}", email);
                    // swallow: admin message already sent, user reply is optional
                }
            }
        }
    }
}
