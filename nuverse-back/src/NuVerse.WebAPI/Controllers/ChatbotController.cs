using Microsoft.AspNetCore.Mvc;
using NuVerse.Domain.DTOs;
using NuVerse.Application.Interfaces;

namespace NuVerse.WebAPI.Controllers
{
    /// <summary>
    /// Controller for handling chatbot interactions with the AI admission officer.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ChatbotController : ControllerBase
    {
        private readonly IChatbotService _chatbotService;
        private readonly ILogger<ChatbotController> _logger;

        /// <summary>
        /// Initializes a new instance of the ChatbotController.
        /// </summary>
        /// <param name="chatbotService">The chatbot service for processing questions.</param>
        /// <param name="logger">The logger for tracking requests and errors.</param>
        public ChatbotController(
            IChatbotService chatbotService,
            ILogger<ChatbotController> logger)
        {
            _chatbotService = chatbotService ?? throw new ArgumentNullException(nameof(chatbotService));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        /// <summary>
        /// Sends a question to the chatbot and returns the AI-generated response.
        /// </summary>
        /// <param name="request">The chatbot request containing the question and session info.</param>
        /// <param name="cancellationToken">Cancellation token for the async operation.</param>
        /// <returns>The chatbot response with answer, category, and sources.</returns>
        [HttpPost("ask")]
        [ProducesResponseType(typeof(ChatbotResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<ChatbotResponse>> AskQuestion(
            [FromBody] ChatbotRequest request,
            CancellationToken cancellationToken)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(request.Question))
                {
                    return BadRequest(new { error = "Question cannot be empty" });
                }

                _logger.LogInformation("Processing chatbot question: {Question}", request.Question);

                var response = await _chatbotService.AskQuestionAsync(request, cancellationToken);
                
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing chatbot question");
                return StatusCode(500, new { error = "An error occurred while processing your question" });
            }
        }

        /// <summary>
        /// Detects the category of a given question (e.g., Admissions, Fees, Academics).
        /// </summary>
        /// <param name="request">The request containing the question to categorize.</param>
        /// <param name="cancellationToken">Cancellation token for the async operation.</param>
        /// <returns>The detected category for the question.</returns>
        [HttpPost("detect-category")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<string>> DetectCategory(
            [FromBody] ChatbotRequest request,
            CancellationToken cancellationToken)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(request.Question))
                {
                    return BadRequest(new { error = "Question cannot be empty" });
                }

                var category = await _chatbotService.DetectCategoryAsync(request.Question, cancellationToken);
                
                return Ok(new { category });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error detecting category");
                return StatusCode(500, new { error = "Failed to detect category" });
            }
        }

        /// <summary>
        /// Clears the conversation memory for a specific session.
        /// </summary>
        /// <param name="request">The request containing the session ID to clear.</param>
        /// <param name="cancellationToken">Cancellation token for the async operation.</param>
        /// <returns>Success message if memory was cleared successfully.</returns>
        [HttpPost("clear-memory")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> ClearMemory(
            [FromBody] ClearMemoryRequest request,
            CancellationToken cancellationToken)
        {
            try
            {
                var success = await _chatbotService.ClearMemoryAsync(request.SessionId, cancellationToken);
                
                if (success)
                {
                    return Ok(new { message = $"Memory cleared for session: {request.SessionId}" });
                }

                return StatusCode(500, new { error = "Failed to clear memory" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error clearing memory");
                return StatusCode(500, new { error = "Failed to clear memory" });
            }
        }

        /// <summary>
        /// Checks the health status of the chatbot service.
        /// </summary>
        /// <param name="cancellationToken">Cancellation token for the async operation.</param>
        /// <returns>Health check response with service status.</returns>
        [HttpGet("health")]
        [ProducesResponseType(typeof(HealthCheckResponse), StatusCodes.Status200OK)]
        public async Task<ActionResult<HealthCheckResponse>> HealthCheck(CancellationToken cancellationToken)
        {
            try
            {
                var health = await _chatbotService.HealthCheckAsync(cancellationToken);
                return Ok(health);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error checking chatbot health");
                return StatusCode(500, new { error = "Chatbot service unavailable" });
            }
        }
    }
}
