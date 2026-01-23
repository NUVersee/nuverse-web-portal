using System.Threading.RateLimiting;
using NuVerse.Application;
using NuVerse.Infrastructure;
using Microsoft.AspNetCore.RateLimiting;
using FluentValidation.AspNetCore;
using Serilog;
using NuVerse.WebAPI.Infrastructure;

// Load .env file from solution root (two directories up from WebAPI)
// Load .env file
// Check if running from repo root, or inside nuverse-back
var pathsToCheck = new[] 
{
    Path.Combine(Directory.GetCurrentDirectory(), "nuverse-back", ".env"), // From repo root
    Path.Combine(Directory.GetCurrentDirectory(), ".env"),                 // From nuverse-back
    Path.Combine(Directory.GetCurrentDirectory(), "..", ".env")            // From src/WebAPI
};

foreach (var path in pathsToCheck)
{
    if (File.Exists(path))
    {
        DotNetEnv.Env.Load(path);
        Console.WriteLine($"[Program] Loaded .env from: {path}");
        break;
    }
}

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateLogger();
builder.Host.UseSerilog();

// Add global exception handler
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

// Add System Health Checks
builder.Services.AddHealthChecks();

builder.Services.AddControllers();
builder.Services.AddFluentValidationAutoValidation();

// Add CORS policy - use environment variable for production origins
var corsOrigins = Environment.GetEnvironmentVariable("CORS_ORIGINS");
string[] allowedOrigins;

if (!string.IsNullOrWhiteSpace(corsOrigins))
{
    // Production: use comma-separated origins from environment
    allowedOrigins = corsOrigins.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
}
else
{
    // Development fallback
    allowedOrigins = new[] { "http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:3000", "http://127.0.0.1:3001" };
}

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Add rate limiting policies
builder.Services.AddRateLimiter(options =>
{
    // Per-IP fixed window: 6 requests per minute for contact submissions
    options.AddPolicy("ContactPolicy", context =>
    {
        var ip = context.Connection.RemoteIpAddress?.ToString() ?? "unknown";
        return RateLimitPartition.GetFixedWindowLimiter(ip, _ => new FixedWindowRateLimiterOptions
        {
            PermitLimit = 6,
            Window = TimeSpan.FromMinutes(1),
            QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
            QueueLimit = 0
        });
    });

    // Chatbot policy: 20 requests per minute per IP (allow conversation flow but prevent abuse)
    options.AddPolicy("ChatbotPolicy", context =>
    {
        var ip = context.Connection.RemoteIpAddress?.ToString() ?? "unknown";
        return RateLimitPartition.GetFixedWindowLimiter(ip, _ => new FixedWindowRateLimiterOptions
        {
            PermitLimit = 20,
            Window = TimeSpan.FromMinutes(1),
            QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
            QueueLimit = 0
        });
    });

    options.OnRejected = async (context, token) =>
    {
        var logger = context.HttpContext.RequestServices.GetService(typeof(Microsoft.Extensions.Logging.ILogger<Program>)) as Microsoft.Extensions.Logging.ILogger;
        logger?.LogWarning("Rate limit rejected request from {IP}", context.HttpContext.Connection.RemoteIpAddress);
        context.HttpContext.Response.StatusCode = 429;
        await context.HttpContext.Response.WriteAsync("Too Many Requests", token);
    };
});
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();

// Configure the HTTP request pipeline.
// Enable Swagger in all environments for testing purposes
app.UseSwagger();
app.UseSwaggerUI();
app.MapOpenApi();

app.UseHttpsRedirection();

// Enable CORS
app.UseCors("AllowFrontend");

// Enable rate limiting middleware
app.UseRateLimiter();

app.UseAuthorization();

app.UseExceptionHandler();

app.MapControllers();
app.MapHealthChecks("/health");

app.Run();
