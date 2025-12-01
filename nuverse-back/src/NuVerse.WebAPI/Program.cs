using System.Threading.RateLimiting;
using NuVerse.Application;
using NuVerse.Infrastructure;
using Microsoft.AspNetCore.RateLimiting;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
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

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// Enable rate limiting middleware
app.UseRateLimiter();

app.UseAuthorization();

app.MapControllers();

app.Run();
