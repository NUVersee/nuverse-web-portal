using System.Collections.Generic;
using System.Threading.Tasks;
using NuVerse.Domain.Entities;

namespace NuVerse.Application.Interfaces.Repositories
{
    /// <summary>
    /// Repository interface for ContactSubmission entities
    /// </summary>
    public interface IContactSubmissionRepository
    {
        /// <summary>
        /// Add a new contact submission
        /// </summary>
        Task<ContactSubmission> AddAsync(ContactSubmission submission);

        /// <summary>
        /// Get all contact submissions
        /// </summary>
        Task<IEnumerable<ContactSubmission>> GetAllAsync();

        /// <summary>
        /// Get contact submission by ID
        /// </summary>
        Task<ContactSubmission?> GetByIdAsync(int id);

        /// <summary>
        /// Get submissions by email
        /// </summary>
        Task<IEnumerable<ContactSubmission>> GetByEmailAsync(string email);
    }
}
