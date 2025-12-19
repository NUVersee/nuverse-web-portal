namespace NuVerse.Domain.DTOs
{
    public class ChatbotRequest
    {
        public string Question { get; set; } = string.Empty;
        public string? SessionId { get; set; }
        public bool UseMemory { get; set; } = true;
    }
}
