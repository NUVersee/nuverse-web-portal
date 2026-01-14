using Microsoft.EntityFrameworkCore;
using NuVerse.Application.Interfaces.Repositories;
using NuVerse.Domain.Entities;
using NuVerse.Infrastructure.Data;

namespace NuVerse.Infrastructure.Repositories
{
    /// <summary>
    /// Repository implementation for ChatbotInteraction entities
    /// </summary>
    public class ChatbotInteractionRepository : IChatbotInteractionRepository
    {
        private readonly NuVerseDbContext _context;

        public ChatbotInteractionRepository(NuVerseDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Adds a new chatbot interaction to the database.
        /// </summary>
        /// <param name="interaction">The interaction to add.</param>
        /// <returns>The added interaction with its generated ID.</returns>
        public async Task<ChatbotInteraction> AddAsync(ChatbotInteraction interaction)
        {
            _context.ChatbotInteractions.Add(interaction);
            await _context.SaveChangesAsync();
            return interaction;
        }

        /// <summary>
        /// Retrieves all chatbot interactions from the database, ordered by timestamp descending.
        /// </summary>
        /// <returns>A collection of all chatbot interactions.</returns>
        public async Task<IEnumerable<ChatbotInteraction>> GetAllAsync()
        {
            return await _context.ChatbotInteractions
                .OrderByDescending(x => x.Timestamp)
                .ToListAsync();
        }

        /// <summary>
        /// Retrieves a specific chatbot interaction by its unique identifier.
        /// </summary>
        /// <param name="id">The ID of the interaction.</param>
        /// <returns>The interaction if found, otherwise null.</returns>
        public async Task<ChatbotInteraction?> GetByIdAsync(int id)
        {
            return await _context.ChatbotInteractions.FindAsync(id);
        }

        /// <summary>
        /// Retrieves all chatbot interactions associated with a specific session ID.
        /// </summary>
        /// <param name="sessionId">The session ID to filter by.</param>
        /// <returns>A collection of interactions for the given session.</returns>
        public async Task<IEnumerable<ChatbotInteraction>> GetBySessionIdAsync(string sessionId)
        {
            return await _context.ChatbotInteractions
                .Where(x => x.SessionId == sessionId)
                .OrderBy(x => x.Timestamp)
                .ToListAsync();
        }
    }
}
