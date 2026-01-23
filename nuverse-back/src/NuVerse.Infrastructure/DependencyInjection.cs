using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NuVerse.Application.Interfaces.Repositories;
using NuVerse.Infrastructure.Data;
using NuVerse.Infrastructure.Repositories;
using NuVerse.Infrastructure.Services;
using NuVerse.Domain.Entities;

namespace NuVerse.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        // Configure DbContext with SQL Server
        var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING") 
            ?? configuration.GetConnectionString("DefaultConnection");
        
        services.AddDbContext<NuVerseDbContext>(options =>
            options.UseNpgsql(connectionString, sqlOptions =>
            {
                sqlOptions.EnableRetryOnFailure(
                    maxRetryCount: 3,
                    maxRetryDelay: TimeSpan.FromSeconds(10),
                    errorCodesToAdd: null);
            }));

        // Bind email settings from configuration (appsettings / user-secrets / env)
        services.Configure<EmailSettings>(configuration.GetSection("EmailSettings"));
        // Bind email templates for subjects and bodies
        services.Configure<NuVerse.Domain.Configurations.EmailTemplates>(configuration.GetSection("EmailTemplates"));

        // Override sensitive or environment-specific settings from environment variables if present.
        services.PostConfigure<EmailSettings>(opts =>
        {
            var host = Environment.GetEnvironmentVariable("SMTP_HOST")?.Trim();
            var port = Environment.GetEnvironmentVariable("SMTP_PORT")?.Trim();
            var user = Environment.GetEnvironmentVariable("SMTP_USER")?.Trim();
            var pass = Environment.GetEnvironmentVariable("SMTP_PASS")?.Trim().Replace(" ", "");
            var from = Environment.GetEnvironmentVariable("EMAIL_FROM")?.Trim();
            var to = Environment.GetEnvironmentVariable("EMAIL_TO")?.Trim();
            var useSsl = Environment.GetEnvironmentVariable("SMTP_USESSL")?.Trim();

            if (!string.IsNullOrWhiteSpace(host)) opts.Host = host;
            if (!string.IsNullOrWhiteSpace(port) && int.TryParse(port, out var p)) opts.Port = p;
            if (!string.IsNullOrWhiteSpace(user)) opts.Username = user;
            if (!string.IsNullOrWhiteSpace(pass)) opts.Password = pass;
            if (!string.IsNullOrWhiteSpace(from)) opts.From = from;
            if (!string.IsNullOrWhiteSpace(to)) opts.To = to;
            if (!string.IsNullOrWhiteSpace(useSsl) && bool.TryParse(useSsl, out var b)) opts.UseSsl = b;
        });

        // Configure Chatbot settings
        services.Configure<Configurations.ChatbotSettings>(
            configuration.GetSection(Configurations.ChatbotSettings.SectionName));

        // Register repositories
        services.AddScoped<IChatbotInteractionRepository, ChatbotInteractionRepository>();
        services.AddScoped<IContactSubmissionRepository, ContactSubmissionRepository>();

        // Register infrastructure services
        // EmailSender uses MailKit and holds a reusable SMTP client — register as singleton so the client can be reused.
        services.AddTransient<IEmailSender, Repositories.EmailSender>();
        services.AddHttpClient<IRecaptchaService, RecaptchaService>();
        

        
        // Register Chatbot service with HttpClient
        services.AddHttpClient<Application.Interfaces.IChatbotService, ChatbotService>();

        // Register HttpClient for keep-alive service
        services.AddHttpClient("ChatbotKeepAlive");
        
        // Register background keep-alive service (pings chatbot every 5 minutes)
        services.AddHostedService<ChatbotKeepAliveService>();

        return services;
    }
}

