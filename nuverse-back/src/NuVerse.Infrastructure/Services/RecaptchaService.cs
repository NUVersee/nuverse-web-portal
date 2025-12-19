using System.Net.Http.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using NuVerse.Application.Interfaces.Repositories;

namespace NuVerse.Infrastructure.Services
{
    public class RecaptchaService : IRecaptchaService
    {
        private readonly HttpClient _http;
        private readonly IConfiguration _config;
        private readonly ILogger<RecaptchaService> _logger;

        public RecaptchaService(HttpClient http, IConfiguration config, ILogger<RecaptchaService> logger)
        {
            _http = http;
            _config = config;
            _logger = logger;
        }

        public async Task<bool> VerifyAsync(string? token, string? remoteIp = null)
        {
            // If recaptcha not enabled, treat as passed so it's opt-in
            var enabled = _config.GetValue<bool>("Recaptcha:Enabled");
            if (!enabled)
                return true;

            var secret = _config["Recaptcha:Secret"]; 
            if (string.IsNullOrWhiteSpace(secret))
            {
                _logger.LogWarning("Recaptcha is enabled but no secret is configured.");
                return false;
            }

            if (string.IsNullOrWhiteSpace(token))
            {
                _logger.LogWarning("Recaptcha token missing in request.");
                return false;
            }

            try
            {
                var values = new Dictionary<string, string>
                {
                    { "secret", secret },
                    { "response", token }
                };

                if (!string.IsNullOrWhiteSpace(remoteIp))
                    values.Add("remoteip", remoteIp);
                using var content = new FormUrlEncodedContent(values);
                var response = await _http.PostAsync("https://www.google.com/recaptcha/api/siteverify", new FormUrlEncodedContent(values));
                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogWarning("Recaptcha verification request failed with status {Status}", response.StatusCode);
                    return false;
                }

                var payload = await response.Content.ReadFromJsonAsync<RecaptchaResponse>();
                return payload?.Success ?? false;
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Recaptcha verification failed");
                return false;
            }
        }

        private class RecaptchaResponse
        {
            public bool Success { get; set; }
            public double Score { get; set; }
            public string? Action { get; set; }
            public string[]? ErrorCodes { get; set; }
        }
    }
}
