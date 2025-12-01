using System;

namespace NuVerse.Domain.Configurations
{
    public class EmailTemplates
    {
        // Example: "VR Request - {FullName}"
        public string? AdminSubject { get; set; }

        // Example: "VR Request From: {FullName}\nEmail: {Email}\nPhone: {Phone}\n\nReason:\n{Reason}"
        public string? AdminBody { get; set; }

        // Example: "NuVerse - We Received Your VR Request"
        public string? UserSubject { get; set; }

        // Example: "Hello {FullName},\n\nWe received your VR request:\n\n{Reason}\n\nRegards,\nNuVerse Team"
        public string? UserBody { get; set; }
    }
}
