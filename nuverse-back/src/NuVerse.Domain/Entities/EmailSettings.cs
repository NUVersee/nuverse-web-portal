using System;

namespace NuVerse.Domain.Entities
{
    public class EmailSettings
    {
        public string? Host { get; set; }
        public int Port { get; set; } = 587;
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? From { get; set; }
        public bool UseSsl { get; set; } = true;
    }
}
