using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NuVerse.Application.Interfaces.Repositories;
using NuVerse.Domain.DTOs;

namespace NuVerse.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IEmailSender _emailSender;

        public ContactController(IEmailSender emailSender)
        {
            _emailSender = emailSender;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ContactFormDto dto)
        {
            // Model validation is handled by [ApiController] + DataAnnotations on the DTO.
            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            var fullName = string.IsNullOrWhiteSpace(dto.FullName) ? "Anonymous" : dto.FullName;
            var phone = dto.PhoneNumber ?? string.Empty;

            await _emailSender.SendEmailAsync(fullName, dto.Email!, phone, dto.Reason!);

            return Ok(new { status = "sent" });
        }
    }
}
