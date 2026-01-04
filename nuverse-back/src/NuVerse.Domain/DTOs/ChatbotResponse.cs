using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace NuVerse.Domain.DTOs
{
    /// <summary>
    /// Response model from RAG chatbot
    /// </summary>
    public class ChatbotResponse
    {
        [JsonPropertyName("answer")]
        public string Answer { get; set; } = string.Empty;

        [JsonPropertyName("category")]
        public string? Category { get; set; }

        [JsonPropertyName("sources")]
        public List<string> Sources { get; set; } = new();

        [JsonPropertyName("timestamp")]
        public DateTime Timestamp { get; set; }

        [JsonPropertyName("memory_size")]
        public int MemorySize { get; set; }
    }
}
