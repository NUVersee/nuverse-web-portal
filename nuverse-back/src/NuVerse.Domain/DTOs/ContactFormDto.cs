using System.ComponentModel.DataAnnotations;

namespace NuVerse.Domain.DTOs
{
    public class ContactFormDto
    {
        public string? FullName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address format")]
        public string? Email { get; set; }

        public string? PhoneNumber { get; set; }

        [Required(ErrorMessage = "Reason is required")]
        public string? Reason { get; set; }
    }
}