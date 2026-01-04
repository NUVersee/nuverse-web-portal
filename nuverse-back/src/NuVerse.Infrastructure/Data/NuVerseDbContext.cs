using Microsoft.EntityFrameworkCore;
using NuVerse.Domain.Entities;

namespace NuVerse.Infrastructure.Data
{
    /// <summary>
    /// Entity Framework Core DbContext for NuVerse application
    /// </summary>
    public class NuVerseDbContext : DbContext
    {
        public NuVerseDbContext(DbContextOptions<NuVerseDbContext> options) : base(options)
        {
        }

        /// <summary>
        /// Chatbot Q&A interactions
        /// </summary>
        public DbSet<ChatbotInteraction> ChatbotInteractions { get; set; }

        /// <summary>
        /// Contact form submissions
        /// </summary>
        public DbSet<ContactSubmission> ContactSubmissions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ChatbotInteraction configuration
            modelBuilder.Entity<ChatbotInteraction>(entity =>
            {
                entity.ToTable("ChatbotInteractions");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Question).IsRequired();
                entity.Property(e => e.Answer).IsRequired();
                entity.Property(e => e.SessionId).HasMaxLength(100);
                entity.Property(e => e.Category).HasMaxLength(100);
                entity.HasIndex(e => e.SessionId);
                entity.HasIndex(e => e.Timestamp);
            });

            // ContactSubmission configuration
            modelBuilder.Entity<ContactSubmission>(entity =>
            {
                entity.ToTable("ContactSubmissions");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
                entity.Property(e => e.Reason).IsRequired();
                entity.Property(e => e.FullName).HasMaxLength(200);
                entity.Property(e => e.PhoneNumber).HasMaxLength(50);
                entity.HasIndex(e => e.Email);
                entity.HasIndex(e => e.SubmittedAt);
            });
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            // Automatically set UpdatedAt for modified entities
            foreach (var entry in ChangeTracker.Entries<BaseEntity>())
            {
                if (entry.State == EntityState.Modified)
                {
                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }
    }
}
