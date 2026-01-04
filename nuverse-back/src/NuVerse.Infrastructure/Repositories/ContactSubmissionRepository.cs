using Microsoft.EntityFrameworkCore;
using NuVerse.Application.Interfaces.Repositories;
using NuVerse.Domain.Entities;
using NuVerse.Infrastructure.Data;

namespace NuVerse.Infrastructure.Repositories
{
    /// <summary>
    /// Repository implementation for ContactSubmission entities
    /// </summary>
    public class ContactSubmissionRepository : IContactSubmissionRepository
    {
        private readonly NuVerseDbContext _context;

        public ContactSubmissionRepository(NuVerseDbContext context)
        {
            _context = context;
        }

        public async Task<ContactSubmission> AddAsync(ContactSubmission submission)
        {
            _context.ContactSubmissions.Add(submission);
            await _context.SaveChangesAsync();
            return submission;
        }

        public async Task<IEnumerable<ContactSubmission>> GetAllAsync()
        {
            return await _context.ContactSubmissions
                .OrderByDescending(x => x.SubmittedAt)
                .ToListAsync();
        }

        public async Task<ContactSubmission?> GetByIdAsync(int id)
        {
            return await _context.ContactSubmissions.FindAsync(id);
        }

        public async Task<IEnumerable<ContactSubmission>> GetByEmailAsync(string email)
        {
            return await _context.ContactSubmissions
                .Where(x => x.Email == email)
                .OrderByDescending(x => x.SubmittedAt)
                .ToListAsync();
        }
    }
}
