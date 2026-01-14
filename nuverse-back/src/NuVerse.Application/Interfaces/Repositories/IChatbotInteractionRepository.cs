using System.Collections.Generic;
using System.Threading.Tasks;
using NuVerse.Domain.Entities;

namespace NuVerse.Application.Interfaces.Repositories
{
    /// <summary>
    /// Repository interface for ChatbotInteraction entities
    /// </summary>
    public interface IChatbotInteractionRepository
    {
        /// <summary>
        /// Add a new chatbot interaction
        /// </summary>
        Task<ChatbotInteraction> AddAsync(ChatbotInteraction interaction);

        /// <summary>
        /// Get all interactions for a specific session
        /// </summary>
        Task<IEnumerable<ChatbotInteraction>> GetBySessionIdAsync(string sessionId);

        /// <summary>
        /// Get all chatbot interactions
        /// </summary>
        Task<IEnumerable<ChatbotInteraction>> GetAllAsync();

        /// <summary>
        /// Get interaction by ID
        /// </summary>
        Task<ChatbotInteraction?> GetByIdAsync(int id);
    }
}
