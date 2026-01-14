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

        /// <summary>
        /// Adds a new contact submission to the database.
        /// </summary>
        /// <param name="submission">The submission to add.</param>
        /// <returns>The added submission with its generated ID.</returns>
        public async Task<ContactSubmission> AddAsync(ContactSubmission submission)
        {
            _context.ContactSubmissions.Add(submission);
            await _context.SaveChangesAsync();
            return submission;
        }

        /// <summary>
        /// Retrieves all contact submissions from the database, ordered by submission date descending.
        /// </summary>
        /// <returns>A collection of all contact submissions.</returns>
        public async Task<IEnumerable<ContactSubmission>> GetAllAsync()
        {
            return await _context.ContactSubmissions
                .OrderByDescending(x => x.SubmittedAt)
                .ToListAsync();
        }

        /// <summary>
        /// Retrieves a specific contact submission by its unique identifier.
        /// </summary>
        /// <param name="id">The ID of the submission.</param>
        /// <returns>The submission if found, otherwise null.</returns>
        public async Task<ContactSubmission?> GetByIdAsync(int id)
        {
            return await _context.ContactSubmissions.FindAsync(id);
        }

        /// <summary>
        /// Retrieves all contact submissions associated with a specific email address.
        /// </summary>
        /// <param name="email">The email address to filter by.</param>
        /// <returns>A collection of submissions for the given email.</returns>
        public async Task<IEnumerable<ContactSubmission>> GetByEmailAsync(string email)
        {
            return await _context.ContactSubmissions
                .Where(x => x.Email == email)
                .OrderByDescending(x => x.SubmittedAt)
                .ToListAsync();
        }
    }
}
