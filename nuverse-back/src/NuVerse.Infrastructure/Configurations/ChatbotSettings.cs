namespace NuVerse.Infrastructure.Configurations
{
    public class ChatbotSettings
    {
        public const string SectionName = "ChatbotSettings";
        public string BaseUrl { get; set; } = "http://localhost:8000";
        public int TimeoutSeconds { get; set; } = 60;
        public bool EnableRetry { get; set; } = true;
        public int MaxRetryAttempts { get; set; } = 3;
    }
}
