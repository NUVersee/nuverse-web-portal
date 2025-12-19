using System;

namespace NuVerse.Domain.DTOs
{
    public class HealthCheckResponse
    {
        public string Status { get; set; } = string.Empty;
        public string Ollama { get; set; } = string.Empty;
        public int ActiveSessions { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
