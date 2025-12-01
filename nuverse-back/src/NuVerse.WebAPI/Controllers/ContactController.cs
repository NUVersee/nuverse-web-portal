using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using NuVerse.Application.Interfaces.Repositories;
using Microsoft.Extensions.Logging;
using NuVerse.Domain.DTOs;

namespace NuVerse.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IEmailSender _emailSender;
        private readonly IRecaptchaService _recaptcha;
        private readonly ILogger<ContactController> _logger;

        public ContactController(IEmailSender emailSender, IRecaptchaService recaptcha, ILogger<ContactController> logger)
        {
            _emailSender = emailSender;
            _recaptcha = recaptcha;
            _logger = logger;
        }

        [HttpPost]
        [EnableRateLimiting("ContactPolicy")]
        public async Task<IActionResult> Post([FromBody] ContactFormDto dto)
        {
            // Model validation is handled by [ApiController] + DataAnnotations on the DTO.
            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            var fullName = string.IsNullOrWhiteSpace(dto.FullName) ? "Anonymous" : dto.FullName;
            var phone = dto.PhoneNumber ?? string.Empty;

            // Verify captcha if enabled; if verification fails, return 400
            var remoteIp = HttpContext.Connection.RemoteIpAddress?.ToString();
            var captchaOk = await _recaptcha.VerifyAsync(dto.CaptchaToken, remoteIp);
            if (!captchaOk)
            {
                _logger.LogWarning("Captcha verification failed for request from {IP}", remoteIp);
                return BadRequest(new { status = "captcha_failed" });
            }
            if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.Reason))
            {
                return BadRequest("Required fields are missing");
            }

            try
            {
                await _emailSender.SendEmailAsync(fullName, dto.Email, phone, dto.Reason);
            }
            catch (System.Exception ex)
            {
                // Log the exception and return a generic 500/503 to the caller. Do not expose internal details.
                _logger.LogError(ex, "Failed to process contact form for {Email}", dto.Email);
                // If you prefer to indicate temporary service problems, return 503 Service Unavailable.
                return StatusCode(503, new { status = "error", message = "Service temporarily unavailable" });
            }

            return Ok(new { status = "sent" });
        }
    }
}
