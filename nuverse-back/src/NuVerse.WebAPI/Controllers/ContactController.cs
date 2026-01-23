using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Extensions.Logging;
using NuVerse.Application.Interfaces.Services;
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
        private readonly IContactService _contactService;
        private readonly ILogger<ContactController> _logger;

        /// <summary>
        /// Initializes a new instance of the ContactController.
        /// </summary>
        /// <param name="contactService">Service for handling contact submissions.</param>
        /// <param name="logger">Logger for tracking requests and errors.</param>
        public ContactController(IContactService contactService, ILogger<ContactController> logger)
        {
            _contactService = contactService;
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
        [EnableRateLimiting("ContactPolicy")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status503ServiceUnavailable)]
        public async Task<IActionResult> Post([FromBody] ContactFormDto dto)
        {
            try
            {
                // Model validation handled by FluentValidation filter automatically, 
                // but we keep this check if filter is not stripping invalid requests.
                if (!ModelState.IsValid)
                    return Ok(new { status = "error", message = "Validation failed", errors = ModelState });

                var remoteIp = HttpContext.Connection.RemoteIpAddress?.ToString();

                await _contactService.SubmitContactFormAsync(dto, remoteIp);

                return Ok(new { status = "sent" });
            }
            catch (InvalidOperationException ex)
            {
                // Domain/Service exceptions (e.g. Captcha failed, Email failed)
                _logger.LogWarning(ex, "Contact submission failed: {Message}", ex.Message);
                return Ok(new { status = "error", message = ex.Message });
            }
            catch (Exception criticalEx)
            {
                _logger.LogCritical(criticalEx, "Critical error in ContactController");
                return Ok(new { status = "error", message = "An internal server error occurred." });
            }
        }
    }
}
