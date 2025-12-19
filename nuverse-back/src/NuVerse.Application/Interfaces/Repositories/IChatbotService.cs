using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using NuVerse.Domain.DTOs;

namespace NuVerse.Application.Interfaces
{
    public interface IChatbotService
    {
        Task<ChatbotResponse> AskQuestionAsync(ChatbotRequest request, CancellationToken cancellationToken = default);
        Task<string?> DetectCategoryAsync(string question, CancellationToken cancellationToken = default);
        Task<bool> ClearMemoryAsync(string sessionId, CancellationToken cancellationToken = default);
        Task<HealthCheckResponse> HealthCheckAsync(CancellationToken cancellationToken = default);
    }
}
