using System;
using System.ComponentModel.DataAnnotations;

namespace NuVerse.Domain.Entities
{
    /// <summary>
    /// Base entity with common properties for all database entities
    /// </summary>
    public abstract class BaseEntity
    {
        [Key]
        public int Id { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }
    }
}
