using Microsoft.Extensions.DependencyInjection;
using FluentValidation;

namespace NuVerse.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddValidatorsFromAssembly(System.Reflection.Assembly.GetExecutingAssembly());
        return services;
    }
}
