using System.Net.Http.Json;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NuVerse.Domain.DTOs;
using NuVerse.Infrastructure.Configurations;
using NuVerse.Application.Interfaces;

namespace NuVerse.Infrastructure.Services
{

    public class ChatbotService : IChatbotService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<ChatbotService> _logger;
        private readonly ChatbotSettings _settings;

        public ChatbotService(
            HttpClient httpClient,
            ILogger<ChatbotService> logger,
            IOptions<ChatbotSettings> settings)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _settings = settings?.Value ?? throw new ArgumentNullException(nameof(settings));

            _httpClient.BaseAddress = new Uri(_settings.BaseUrl);
            _httpClient.Timeout = TimeSpan.FromSeconds(_settings.TimeoutSeconds);
        }

        public async Task<ChatbotResponse> AskQuestionAsync(ChatbotRequest request, CancellationToken cancellationToken = default)
        {
            try
            {
                _logger.LogInformation("Sending question to RAG API: {Question}", request.Question);

                var payload = new
                {
                    question = request.Question,
                    session_id = request.SessionId ?? "default",
                    use_memory = request.UseMemory
                };

                var response = await _httpClient.PostAsJsonAsync("/ask", payload, cancellationToken);
                response.EnsureSuccessStatusCode();

                // Get raw content for parsing
                var rawContent = await response.Content.ReadAsStringAsync(cancellationToken);
                _logger.LogInformation("Raw response from RAG API: {Response}", rawContent);

                string actualAnswer = string.Empty;
                List<string> sources = new List<string>();
                
                // Check if response is plain text format (Python object string representation)
                if (rawContent.Contains("message=Message(") && rawContent.Contains("content="))
                {
                    _logger.LogInformation("Parsing string format response");
                    
                    // Extract content using a simpler approach - find content=\" or content=' and extract until \", thinking= or ', thinking=
                    // Use regex to properly handle escaped sequences
                    var match = System.Text.RegularExpressions.Regex.Match(
                        rawContent,
                        @"content=\\?[""'](.+?)\\?[""'],?\s*thinking=",
                        System.Text.RegularExpressions.RegexOptions.Singleline
                    );
                    
                    if (match.Success)
                    {
                        actualAnswer = match.Groups[1].Value;
                        
                        // The content may have double-escaped sequences from JSON -> Python string
                        // Unescape them: \\n -> \n in the JSON becomes \n in our string
                        actualAnswer = actualAnswer
                            .Replace("\\\\n", "\n")   // \\n in JSON -> \n
                            .Replace("\\\\r", "\r")   // \\r in JSON -> \r
                            .Replace("\\\\t", "\t")   // \\t in JSON -> \t
                            .Replace("\\\\'", "'")    // \\' in JSON -> '
                            .Replace("\\\\\"", "\"")  // \\" in JSON -> "
                            .Replace("\\n", "\n")     // \n directly
                            .Replace("\\r", "\r")     // \r directly
                            .Replace("\\t", "\t")     // \t directly
                            .Replace("\\'", "'")      // \' directly
                            .Replace("\\\"", "\"")    // \" directly
                            .Replace("\\\\", "\\");   // \\\\ -> \ or \\ -> \
                        
                        _logger.LogInformation("Extracted answer: {Answer}", actualAnswer);
                    }
                    else
                    {
                        _logger.LogWarning("Could not extract content with regex, trying fallback");
                        
                        // Fallback: find content= and extract everything until , thinking=
                        var contentIdx = rawContent.IndexOf("content=");
                        if (contentIdx >= 0)
                        {
                            var thinkingIdx = rawContent.IndexOf(", thinking=", contentIdx);
                            if (thinkingIdx > contentIdx)
                            {
                                var fullContent = rawContent.Substring(contentIdx, thinkingIdx - contentIdx);
                                // Extract just the value between quotes
                                var valueMatch = System.Text.RegularExpressions.Regex.Match(
                                    fullContent,
                                    @"content=\\?[""'](.+?)\\?[""']$",
                                    System.Text.RegularExpressions.RegexOptions.Singleline
                                );
                                if (valueMatch.Success)
                                {
                                    actualAnswer = valueMatch.Groups[1].Value
                                        .Replace("\\n", "\n")
                                        .Replace("\\r", "\r")
                                        .Replace("\\t", "\t")
                                        .Replace("\\\"", "\"")
                                        .Replace("\\'", "'")
                                        .Replace("\\\\", "\\");
                                }
                            }
                        }
                    }

                    // Extract sources from "Sources:" section
                    var sourcesStartIndex = rawContent.IndexOf("Sources:");
                    if (sourcesStartIndex >= 0)
                    {
                        var sourcesSection = rawContent.Substring(sourcesStartIndex);
                        var sourceMatches = System.Text.RegularExpressions.Regex.Matches(
                            sourcesSection,
                            @"•\s*([^\n\r]+)"
                        );
                        
                        foreach (System.Text.RegularExpressions.Match sourceMatch in sourceMatches)
                        {
                            sources.Add(sourceMatch.Groups[1].Value.Trim());
                        }
                    }
                }
                else
                {
                    // Try to parse as JSON
                    try
                    {
                        var result = System.Text.Json.JsonSerializer.Deserialize<ChatbotApiResponse>(rawContent);
                        
                        if (result != null)
                        {
                            if (result.Message != null && !string.IsNullOrEmpty(result.Message.Content))
                            {
                                actualAnswer = result.Message.Content;
                            }
                            else if (!string.IsNullOrEmpty(result.Answer))
                            {
                                actualAnswer = result.Answer;
                            }
                            sources = result.Sources ?? new List<string>();
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning(ex, "Failed to parse as JSON");
                    }
                }

                if (string.IsNullOrEmpty(actualAnswer))
                {
                    _logger.LogError("Unable to extract answer from response: {Response}", rawContent);
                    actualAnswer = "Unable to process response from chatbot service";
                }

                return new ChatbotResponse
                {
                    Answer = actualAnswer,
                    Category = null,
                    Sources = sources,
                    Timestamp = DateTime.UtcNow,
                    MemorySize = 0
                };
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "HTTP error when calling RAG API");
                throw new Exception("Failed to communicate with chatbot service", ex);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error asking question to RAG API");
                throw;
            }
        }

        public async Task<List<string>> GetCategoriesAsync(CancellationToken cancellationToken = default)
        {
            try
            {
                _logger.LogInformation("Fetching categories from RAG API");

                var response = await _httpClient.GetAsync("/categories", cancellationToken);
                response.EnsureSuccessStatusCode();

                var result = await response.Content.ReadFromJsonAsync<CategoryApiResponse>(cancellationToken);
                
                return result?.Categories ?? new List<string>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching categories from RAG API");
                throw;
            }
        }

        public async Task<string?> DetectCategoryAsync(string question, CancellationToken cancellationToken = default)
        {
            try
            {
                _logger.LogInformation("Detecting category for question: {Question}", question);

                var payload = new { question };
                var response = await _httpClient.PostAsJsonAsync("/detect-category", payload, cancellationToken);
                response.EnsureSuccessStatusCode();

                var result = await response.Content.ReadFromJsonAsync<CategoryApiResponse>(cancellationToken);
                
                return result?.Detected;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error detecting category from RAG API");
                throw;
            }
        }

        public async Task<bool> ClearMemoryAsync(string sessionId, CancellationToken cancellationToken = default)
        {
            try
            {
                _logger.LogInformation("Clearing memory for session: {SessionId}", sessionId);

                var payload = new { session_id = sessionId };
                var response = await _httpClient.PostAsJsonAsync("/clear-memory", payload, cancellationToken);
                response.EnsureSuccessStatusCode();

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error clearing memory in RAG API");
                return false;
            }
        }

        public async Task<HealthCheckResponse> HealthCheckAsync(CancellationToken cancellationToken = default)
        {
            try
            {
                _logger.LogInformation("Checking RAG API health");

                var response = await _httpClient.GetAsync("/health", cancellationToken);
                response.EnsureSuccessStatusCode();

                var result = await response.Content.ReadFromJsonAsync<HealthCheckApiResponse>(cancellationToken);
                
                if (result == null)
                {
                    throw new InvalidOperationException("Failed to deserialize health check response");
                }

                return new HealthCheckResponse
                {
                    Status = result.Status,
                    Ollama = result.Ollama,
                    ActiveSessions = result.ActiveSessions,
                    Timestamp = DateTime.Parse(result.Timestamp)
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error checking RAG API health");
                throw;
            }
        }

        #region Internal API Response Models
        
        private class ChatbotApiResponse
        {
            public string Answer { get; set; } = string.Empty;
            public string? Category { get; set; }
            public List<string>? Sources { get; set; }
            public string Timestamp { get; set; } = string.Empty;
            public int MemorySize { get; set; }
            public MessageContent? Message { get; set; }
        }

        private class MessageContent
        {
            public string Content { get; set; } = string.Empty;
        }

        private class CategoryApiResponse
        {
            public List<string>? Categories { get; set; }
            public string? Detected { get; set; }
        }

        private class HealthCheckApiResponse
        {
            public string Status { get; set; } = string.Empty;
            public string Ollama { get; set; } = string.Empty;
            public int ActiveSessions { get; set; }
            public string Timestamp { get; set; } = string.Empty;
        }

        #endregion
    }
}
