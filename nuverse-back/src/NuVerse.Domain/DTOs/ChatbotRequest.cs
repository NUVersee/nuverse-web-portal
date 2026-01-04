using System.Text.Json.Serialization;

namespace NuVerse.Domain.DTOs
{
    public class ChatbotRequest
    {
        public string Question { get; set; } = string.Empty;

        [JsonPropertyName("session_id")]
        public string? SessionId { get; set; }

        [JsonPropertyName("use_memory")]
        public bool UseMemory { get; set; } = true;
    }
}
