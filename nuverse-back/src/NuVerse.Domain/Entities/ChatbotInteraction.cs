using System;
using System.ComponentModel.DataAnnotations;

namespace NuVerse.Domain.Entities
{
    /// <summary>
    /// Entity to store chatbot question and answer interactions
    /// </summary>
    public class ChatbotInteraction : BaseEntity
    {
        /// <summary>
        /// The user's question
        /// </summary>
        [Required]
        public string Question { get; set; } = string.Empty;

        /// <summary>
        /// The chatbot's answer
        /// </summary>
        [Required]
        public string Answer { get; set; } = string.Empty;

        /// <summary>
        /// Session identifier for grouping conversations
        /// </summary>
        [MaxLength(100)]
        public string? SessionId { get; set; }

        /// <summary>
        /// Category of the response (e.g., admissions, fees, etc.)
        /// </summary>
        [MaxLength(100)]
        public string? Category { get; set; }

        /// <summary>
        /// Timestamp when the interaction occurred
        /// </summary>
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}
