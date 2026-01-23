using FluentValidation;
using NuVerse.Domain.DTOs;

namespace NuVerse.Application.Validators
{
    public class ChatbotRequestValidator : AbstractValidator<ChatbotRequest>
    {
        public ChatbotRequestValidator()
        {
            RuleFor(x => x.Question)
                .NotEmpty().WithMessage("Question cannot be empty.")
                .MaximumLength(500).WithMessage("Question is too long (max 500 chars).");

            RuleFor(x => x.SessionId)
                .MaximumLength(100).WithMessage("Session ID is too long.");
        }
    }
}
