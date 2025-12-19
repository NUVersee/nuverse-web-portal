using System;
using System.Collections.Generic;

namespace NuVerse.Domain.DTOs
{
    /// <summary>
    /// Response model from RAG chatbot
    /// </summary>
    public class ChatbotResponse
    {
        public string Answer { get; set; } = string.Empty;
        public string? Category { get; set; }
        public List<string> Sources { get; set; } = new();
        public DateTime Timestamp { get; set; }
        public int MemorySize { get; set; }
    }
}
