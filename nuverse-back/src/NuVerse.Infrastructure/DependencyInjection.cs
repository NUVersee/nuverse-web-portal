using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NuVerse.Application.Interfaces.Repositories;
using NuVerse.Infrastructure.Services;
using NuVerse.Domain.Entities;

namespace NuVerse.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        // Bind email settings from configuration (appsettings / user-secrets / env)
        services.Configure<EmailSettings>(configuration.GetSection("EmailSettings"));

        // Register infrastructure services
        services.AddTransient<IEmailSender, EmailSender>();

        return services;
    }
}
