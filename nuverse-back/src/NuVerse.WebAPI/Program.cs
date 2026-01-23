using System.Threading.RateLimiting;
using NuVerse.Application;
using NuVerse.Infrastructure;
using Microsoft.AspNetCore.RateLimiting;

// Load .env file from solution root (two directories up from WebAPI)
var envPath = Path.Combine(Directory.GetCurrentDirectory(), "..", "..", ".env");
if (File.Exists(envPath))
{
    DotNetEnv.Env.Load(envPath);
}

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

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

    options.OnRejected = async (context, token) =>
    {
        var logger = context.HttpContext.RequestServices.GetService(typeof(ILogger<Program>)) as ILogger;
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

// GLOBAL ERROR HANDLER - DEBUGGING ONLY
// Catches any exception (startup, middleware, controller) and returns it as JSON with CORS headers
app.Use(async (context, next) =>
{
    try
    {
        await next();
    }
    catch (Exception ex)
    {
        Console.WriteLine($"[CRITICAL] Unhandled Exception: {ex}");
        
        // Manually add CORS headers to ensure browser allows reading the error
        if (context.Request.Headers.TryGetValue("Origin", out var origin))
        {
            context.Response.Headers["Access-Control-Allow-Origin"] = origin;
            context.Response.Headers["Access-Control-Allow-Credentials"] = "true";
            context.Response.Headers["Access-Control-Allow-Headers"] = "*";
            context.Response.Headers["Access-Control-Allow-Methods"] = "*";
        }
        else
        {
            context.Response.Headers["Access-Control-Allow-Origin"] = "*";
        }

        context.Response.ContentType = "application/json";
        // Return 200 to ensure body is readable by frontend logic
        context.Response.StatusCode = 200; 
        
        var response = new 
        { 
            status = "error", 
            message = $"CRITICAL SERVER ERROR: {ex.Message}",
            details = ex.ToString()
        };
        
        await context.Response.WriteAsJsonAsync(response);
    }
});

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

app.MapControllers();

app.Run();
