using Microsoft.AspNetCore.Mvc;
using NuVerse.Domain.DTOs;
using NuVerse.Application.Interfaces;

namespace YourProject.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ChatbotController : ControllerBase
    {
        private readonly IChatbotService _chatbotService;
        private readonly ILogger<ChatbotController> _logger;

        public ChatbotController(
            IChatbotService chatbotService,
            ILogger<ChatbotController> logger)
        {
            _chatbotService = chatbotService ?? throw new ArgumentNullException(nameof(chatbotService));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }
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
