using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NuVerse.Infrastructure.Configurations;

namespace NuVerse.Infrastructure.Services
{
    /// <summary>
    /// Background service that pings the chatbot every 5 minutes to keep the HuggingFace Space alive.
    /// Prevents cold starts and ensures the service is always responsive.
    /// </summary>
    public class ChatbotKeepAliveService : BackgroundService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<ChatbotKeepAliveService> _logger;
        private readonly ChatbotSettings _settings;
        private readonly TimeSpan _interval = TimeSpan.FromMinutes(5);

        /// <summary>
        /// Initializes a new instance of the ChatbotKeepAliveService.
        /// </summary>
        /// <param name="httpClientFactory">Factory for creating HTTP clients.</param>
        /// <param name="logger">Logger for tracking keep-alive pings.</param>
        /// <param name="settings">Chatbot configuration settings.</param>
        public ChatbotKeepAliveService(
            IHttpClientFactory httpClientFactory,
            ILogger<ChatbotKeepAliveService> logger,
            IOptions<ChatbotSettings> settings)
        {
            _httpClient = httpClientFactory.CreateClient("ChatbotKeepAlive");
            _logger = logger;
            _settings = settings.Value;
            
            _httpClient.BaseAddress = new Uri(_settings.BaseUrl);
            _httpClient.Timeout = TimeSpan.FromSeconds(30);
        }

        /// <summary>
        /// Executes the background keep-alive loop.
        /// </summary>
        /// <param name="stoppingToken">Cancellation token for graceful shutdown.</param>
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Chatbot Keep-Alive Service started. Pinging every {Interval} minutes.", _interval.TotalMinutes);

            // Initial delay to let the application fully start
            await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken);

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    await PingChatbotAsync(stoppingToken);
                }
                catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
                {
                    // Graceful shutdown
                    break;
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Keep-alive ping failed. Will retry in {Interval} minutes.", _interval.TotalMinutes);
                }

                try
                {
                    await Task.Delay(_interval, stoppingToken);
                }
                catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
                {
                    break;
                }
            }

            _logger.LogInformation("Chatbot Keep-Alive Service stopped.");
        }

        /// <summary>
        /// Sends a health check ping to the chatbot service.
        /// </summary>
        /// <param name="cancellationToken">Cancellation token.</param>
        private async Task PingChatbotAsync(CancellationToken cancellationToken)
        {
            var startTime = DateTime.UtcNow;
            
            try
            {
                // Try the /docs endpoint first (FastAPI default health check)
                var response = await _httpClient.GetAsync("/docs", cancellationToken);
                var elapsed = DateTime.UtcNow - startTime;

                if (response.IsSuccessStatusCode)
                {
                    _logger.LogInformation(
                        "✅ Chatbot keep-alive ping successful. Status: {StatusCode}, Response time: {ElapsedMs}ms",
                        (int)response.StatusCode,
                        elapsed.TotalMilliseconds);
                }
                else
                {
                    _logger.LogWarning(
                        "⚠️ Chatbot keep-alive ping returned non-success. Status: {StatusCode}, Response time: {ElapsedMs}ms",
                        (int)response.StatusCode,
                        elapsed.TotalMilliseconds);
                }
            }
            catch (HttpRequestException ex)
            {
                _logger.LogWarning(
                    "⚠️ Chatbot service unreachable: {Message}. The service may be sleeping.",
                    ex.Message);
            }
            catch (TaskCanceledException ex) when (!cancellationToken.IsCancellationRequested)
            {
                _logger.LogWarning("⚠️ Chatbot keep-alive ping timed out after 30 seconds.");
            }
        }
    }
}
