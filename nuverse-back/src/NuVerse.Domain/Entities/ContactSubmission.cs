using System;
using System.ComponentModel.DataAnnotations;

namespace NuVerse.Domain.Entities
{
    /// <summary>
    /// Entity to store contact form submissions
    /// </summary>
    public class ContactSubmission : BaseEntity
    {
        /// <summary>
        /// User's email address
        /// </summary>
        [Required]
        [MaxLength(255)]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Reason for the contact request
        /// </summary>
        [Required]
        public string Reason { get; set; } = string.Empty;

        /// <summary>
        /// User's full name
        /// </summary>
        [MaxLength(200)]
        public string? FullName { get; set; }

        /// <summary>
        /// User's phone number
        /// </summary>
        [MaxLength(50)]
        public string? PhoneNumber { get; set; }

        /// <summary>
        /// Whether the submission has been processed/submitted
        /// </summary>
        public bool IsSubmitted { get; set; } = true;

        /// <summary>
        /// Timestamp when the form was submitted
        /// </summary>
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    }
}
