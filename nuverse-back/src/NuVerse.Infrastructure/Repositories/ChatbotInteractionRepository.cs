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

        public async Task<ChatbotInteraction> AddAsync(ChatbotInteraction interaction)
        {
            _context.ChatbotInteractions.Add(interaction);
            await _context.SaveChangesAsync();
            return interaction;
        }

        public async Task<IEnumerable<ChatbotInteraction>> GetAllAsync()
        {
            return await _context.ChatbotInteractions
                .OrderByDescending(x => x.Timestamp)
                .ToListAsync();
        }

        public async Task<ChatbotInteraction?> GetByIdAsync(int id)
        {
            return await _context.ChatbotInteractions.FindAsync(id);
        }

        public async Task<IEnumerable<ChatbotInteraction>> GetBySessionIdAsync(string sessionId)
        {
            return await _context.ChatbotInteractions
                .Where(x => x.SessionId == sessionId)
                .OrderBy(x => x.Timestamp)
                .ToListAsync();
        }
    }
}
