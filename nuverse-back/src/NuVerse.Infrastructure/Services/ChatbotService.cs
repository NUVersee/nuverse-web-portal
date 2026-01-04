using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NuVerse.Application.Interfaces;
using NuVerse.Application.Interfaces.Repositories;
using NuVerse.Domain.DTOs;
using NuVerse.Domain.Entities;
using NuVerse.Infrastructure.Configurations;

namespace NuVerse.Infrastructure.Services
{
    public class ChatbotService : IChatbotService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<ChatbotService> _logger;
        private readonly ChatbotSettings _settings;
        private readonly IChatbotInteractionRepository _interactionRepository;

        public ChatbotService(
            HttpClient httpClient,
            ILogger<ChatbotService> logger,
            IOptions<ChatbotSettings> settings,
            IChatbotInteractionRepository interactionRepository)
        {
            _httpClient = httpClient;
            _logger = logger;
            _settings = settings.Value;
            _interactionRepository = interactionRepository;

            _httpClient.BaseAddress = new Uri(_settings.BaseUrl);
            _httpClient.Timeout = TimeSpan.FromSeconds(_settings.TimeoutSeconds);
            _httpClient.DefaultRequestHeaders.Accept.Clear();
            _httpClient.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
        }

        public async Task<ChatbotResponse> AskQuestionAsync(
            ChatbotRequest request,
            CancellationToken cancellationToken = default)
        {
            try
            {
                _logger.LogInformation(
                    "Sending question to HF FastAPI: {Question}",
                    request.Question);

                // 🔹 EXACT payload FastAPI expects
                var payload = new
                {
                    question = request.Question
                };

                var httpResponse = await _httpClient.PostAsync(
                    "/ask",
                    new StringContent(
                        JsonSerializer.Serialize(payload),
                        Encoding.UTF8,
                        "application/json"),
                    cancellationToken);

                var rawResponse = await httpResponse.Content
                    .ReadAsStringAsync(cancellationToken);

                if (!httpResponse.IsSuccessStatusCode)
                {
                    _logger.LogError(
                        "HF returned {StatusCode}: {Body}",
                        httpResponse.StatusCode,
                        rawResponse);

                    return new ChatbotResponse
                    {
                        Answer = "The chatbot service is currently unavailable.",
                        Category = null,
                        Sources = new List<string>(),
                        Timestamp = DateTime.UtcNow,
                        MemorySize = 0
                    };
                }

                _logger.LogDebug("HF raw response: {Body}", rawResponse);

                var result = JsonSerializer.Deserialize<ChatbotResponse>(
                    rawResponse,
                    new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                if (result == null || string.IsNullOrWhiteSpace(result.Answer))
                {
                    return new ChatbotResponse
                    {
                        Answer = "The chatbot returned an empty response.",
                        Category = null,
                        Sources = new List<string>(),
                        Timestamp = DateTime.UtcNow,
                        MemorySize = 0
                    };
                }

                // Save interaction to database
                try
                {
                    var interaction = new ChatbotInteraction
                    {
                        Question = request.Question,
                        Answer = result.Answer,
                        SessionId = request.SessionId,
                        Category = result.Category,
                        Timestamp = result.Timestamp != default ? result.Timestamp : DateTime.UtcNow
                    };
                    await _interactionRepository.AddAsync(interaction);
                    _logger.LogInformation("Chatbot interaction saved to database for session {SessionId}", request.SessionId);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to save chatbot interaction to database");
                    // Continue returning the result even if database save fails
                }

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex, "HF FastAPI connection failed");

                return new ChatbotResponse
                {
                    Answer = $"Chatbot connection error: {ex.Message}",
                    Category = null,
                    Sources = new List<string>(),
                    Timestamp = DateTime.UtcNow,
                    MemorySize = 0
                };
            }
        }

        // ---------------- HEALTH CHECK ----------------

        public async Task<HealthCheckResponse> HealthCheckAsync(
            CancellationToken cancellationToken = default)
        {
            try
            {
                var response = await _httpClient.GetAsync(
                    "/docs",
                    cancellationToken);

                return new HealthCheckResponse
                {
                    Status = response.IsSuccessStatusCode
                        ? "healthy"
                        : "unhealthy",
                    Ollama = "HuggingFace FastAPI",
                    ActiveSessions = 0,
                    Timestamp = DateTime.UtcNow
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Health check failed");

                return new HealthCheckResponse
                {
                    Status = "unhealthy",
                    Ollama = ex.Message,
                    ActiveSessions = 0,
                    Timestamp = DateTime.UtcNow
                };
            }
        }

        // ---------------- UNUSED FEATURES (SAFE STUBS) ----------------

        public Task<List<string>> GetCategoriesAsync(
            CancellationToken cancellationToken = default)
        {
            return Task.FromResult(new List<string>
            {
                "Admissions",
                "Fees",
                "Academics",
                "IT & Systems"
            });
        }

        public Task<string?> DetectCategoryAsync(
            string question,
            CancellationToken cancellationToken = default)
        {
            return Task.FromResult<string?>(null);
        }

        public Task<bool> ClearMemoryAsync(
            string sessionId,
            CancellationToken cancellationToken = default)
        {
            return Task.FromResult(true);
        }
    }
}
