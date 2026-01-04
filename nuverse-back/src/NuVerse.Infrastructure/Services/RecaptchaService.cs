using System.Net.Http.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using NuVerse.Application.Interfaces.Repositories;

namespace NuVerse.Infrastructure.Services
{
    /// <summary>
    /// Service for verifying Google reCAPTCHA v3 tokens.
    /// </summary>
    public class RecaptchaService : IRecaptchaService
    {
        private readonly HttpClient _http;
        private readonly IConfiguration _config;
        private readonly ILogger<RecaptchaService> _logger;

        /// <summary>
        /// Initializes a new instance of the <see cref="RecaptchaService"/> class.
        /// </summary>
        /// <param name="http">HTTP client for making verification requests.</param>
        /// <param name="config">Configuration for retrieving reCAPTCHA secret and settings.</param>
        /// <param name="logger">Logger for recording activities and errors.</param>
        public RecaptchaService(HttpClient http, IConfiguration config, ILogger<RecaptchaService> logger)
        {
            _http = http;
            _config = config;
            _logger = logger;
        }

        /// <summary>
        /// Verifies a reCAPTCHA token with Google's siteverify API.
        /// </summary>
        /// <param name="token">The token to verify.</param>
        /// <param name="remoteIp">Optional remote IP address of the user.</param>
        /// <returns>True if verification is successful or if reCAPTCHA is disabled; otherwise, false.</returns>
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
