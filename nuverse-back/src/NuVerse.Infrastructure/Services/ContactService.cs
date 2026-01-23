using Microsoft.Extensions.Logging;
using NuVerse.Application.Interfaces.Repositories;
using NuVerse.Application.Interfaces.Services;
using NuVerse.Domain.DTOs;
using NuVerse.Domain.Entities;
using System;
using System.Threading.Tasks;

namespace NuVerse.Infrastructure.Services
{
    public class ContactService : IContactService
    {
        private readonly IEmailSender _emailSender;
        private readonly IContactSubmissionRepository _repository;
        private readonly IRecaptchaService _recaptcha;
        private readonly ILogger<ContactService> _logger;

        public ContactService(
            IEmailSender emailSender,
            IContactSubmissionRepository repository,
            IRecaptchaService recaptcha,
            ILogger<ContactService> logger)
        {
            _emailSender = emailSender;
            _repository = repository;
            _recaptcha = recaptcha;
            _logger = logger;
        }

        public async Task SubmitContactFormAsync(ContactFormDto dto, string? remoteIp)
        {
            // 1. Verify Captcha
            // Note: If captcha is configured but disabled in appsettings, VerifyAsync returns true.
            var captchaOk = await _recaptcha.VerifyAsync(dto.CaptchaToken, remoteIp);
            if (!captchaOk)
            {
                _logger.LogWarning("Captcha verification failed for contact submission from {IP}", remoteIp);
                throw new InvalidOperationException("Captcha verification failed.");
            }

            // 2. Save Logic (Moved from EmailSender)
            try
            {
                var submission = new ContactSubmission
                {
                    Email = dto.Email ?? string.Empty,
                    Reason = dto.Reason ?? string.Empty,
                    FullName = dto.FullName ?? "Anonymous",
                    PhoneNumber = dto.PhoneNumber ?? string.Empty,
                    IsSubmitted = true,
                    SubmittedAt = DateTime.UtcNow
                };

                await _repository.AddAsync(submission);
                _logger.LogInformation("Contact submission saved to database for {Email}", dto.Email);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to save contact submission for {Email}", dto.Email);
                // We typically want to continue to send the email even if DB save fails, 
                // BUT if strict data reliability is required, we might throw.
                // For now, I'll log and continue to match previous best-effort behavior.
            }

            // 3. Send Email
            try
            {
                await _emailSender.SendEmailAsync(
                    dto.FullName ?? "Anonymous",
                    dto.Email!,
                    dto.PhoneNumber ?? "",
                    dto.Reason!
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send contact email for {Email}", dto.Email);
                throw new InvalidOperationException("Failed to send email service.");
            }
        }
    }
}
