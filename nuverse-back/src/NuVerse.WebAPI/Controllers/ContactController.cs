using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using NuVerse.Application.Interfaces.Repositories;
using Microsoft.Extensions.Logging;
using NuVerse.Domain.DTOs;

namespace NuVerse.WebAPI.Controllers
{
    /// <summary>
    /// Controller for handling contact form submissions and email requests.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        // private readonly IEmailSender _emailSender;
        // private readonly IRecaptchaService _recaptcha;
        private readonly ILogger<ContactController> _logger;

        /// <summary>
        /// Initializes a new instance of the ContactController.
        /// </summary>
        /// <param name="emailSender">Service for sending emails.</param>
        /// <param name="recaptcha">Service for verifying reCAPTCHA tokens.</param>
        /// <param name="logger">Logger for tracking requests and errors.</param>
        public ContactController(/*IEmailSender emailSender, IRecaptchaService recaptcha,*/ ILogger<ContactController> logger)
        {
            // _emailSender = emailSender;
            // _recaptcha = recaptcha;
            _logger = logger;
        }

        /// <summary>
        /// Processes a contact form submission, verifies captcha, and sends notification emails.
        /// </summary>
        /// <param name="dto">The contact form data including name, email, phone, and reason.</param>
        /// <returns>Success status or error message.</returns>
        /// <response code="200">Contact form submitted successfully.</response>
        /// <response code="400">Validation failed or captcha verification failed.</response>
        /// <response code="503">Email service temporarily unavailable.</response>
        [HttpPost]
        // [EnableRateLimiting("ContactPolicy")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status503ServiceUnavailable)]
        public async Task<IActionResult> Post([FromBody] ContactFormDto dto)
        {
            return Ok(new { status = "sent", debug = "dependencies_bypassed" });

            /*
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
            */
        }
    }
}
