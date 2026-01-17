using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using NuVerse.Application.Interfaces.Repositories;
using NuVerse.Domain.DTOs;
using NuVerse.WebAPI.Controllers;
using Xunit;

namespace NuVerse.Tests.Controllers;

/// <summary>
/// Unit tests for the ContactController
/// </summary>
public class ContactControllerTests
{
    private readonly Mock<IEmailSender> _mockEmailSender;
    private readonly Mock<IRecaptchaService> _mockRecaptchaService;
    private readonly Mock<ILogger<ContactController>> _mockLogger;
    private readonly ContactController _controller;

    public ContactControllerTests()
    {
        _mockEmailSender = new Mock<IEmailSender>();
        _mockRecaptchaService = new Mock<IRecaptchaService>();
        _mockLogger = new Mock<ILogger<ContactController>>();
        
        _controller = new ContactController(
            _mockEmailSender.Object,
            _mockRecaptchaService.Object,
            _mockLogger.Object);
        
        // Setup HttpContext for RemoteIpAddress
        var httpContext = new DefaultHttpContext();
        httpContext.Connection.RemoteIpAddress = System.Net.IPAddress.Parse("127.0.0.1");
        _controller.ControllerContext = new ControllerContext
        {
            HttpContext = httpContext
        };
    }

    [Fact]
    public async Task Post_WithValidData_ReturnsOk()
    {
        // Arrange
        var dto = new ContactFormDto
        {
            FullName = "Test User",
            Email = "test@example.com",
            PhoneNumber = "+1234567890",
            Reason = "Test reason for contact",
            CaptchaToken = null
        };
        
        _mockRecaptchaService.Setup(x => x.VerifyAsync(It.IsAny<string?>(), It.IsAny<string?>()))
            .ReturnsAsync(true);
        _mockEmailSender.Setup(x => x.SendEmailAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()))
            .Returns(Task.CompletedTask);

        // Act
        var result = await _controller.Post(dto);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.NotNull(okResult.Value);
    }

    [Fact]
    public async Task Post_WithMissingEmail_ReturnsBadRequest()
    {
        // Arrange
        var dto = new ContactFormDto
        {
            FullName = "Test User",
            Email = "",
            Reason = "Test reason"
        };
        
        _mockRecaptchaService.Setup(x => x.VerifyAsync(It.IsAny<string?>(), It.IsAny<string?>()))
            .ReturnsAsync(true);

        // Act
        var result = await _controller.Post(dto);

        // Assert
        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public async Task Post_WhenCaptchaFails_ReturnsBadRequest()
    {
        // Arrange
        var dto = new ContactFormDto
        {
            FullName = "Test User",
            Email = "test@example.com",
            Reason = "Test reason",
            CaptchaToken = "invalid-token"
        };
        
        _mockRecaptchaService.Setup(x => x.VerifyAsync(It.IsAny<string?>(), It.IsAny<string?>()))
            .ReturnsAsync(false);

        // Act
        var result = await _controller.Post(dto);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.NotNull(badRequestResult.Value);
    }

    [Fact]
    public async Task Post_WhenEmailSendFails_Returns503()
    {
        // Arrange
        var dto = new ContactFormDto
        {
            FullName = "Test User",
            Email = "test@example.com",
            Reason = "Test reason"
        };
        
        _mockRecaptchaService.Setup(x => x.VerifyAsync(It.IsAny<string?>(), It.IsAny<string?>()))
            .ReturnsAsync(true);
        _mockEmailSender.Setup(x => x.SendEmailAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()))
            .ThrowsAsync(new Exception("SMTP error"));

        // Act
        var result = await _controller.Post(dto);

        // Assert
        var statusResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(503, statusResult.StatusCode);
    }
}
