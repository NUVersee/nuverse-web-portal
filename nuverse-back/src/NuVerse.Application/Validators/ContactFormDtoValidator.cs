using FluentValidation;
using NuVerse.Domain.DTOs;

namespace NuVerse.Application.Validators
{
    public class ContactFormDtoValidator : AbstractValidator<ContactFormDto>
    {
        public ContactFormDtoValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("A valid email address is required.");

            RuleFor(x => x.Reason)
                .NotEmpty().WithMessage("Reason is required.")
                .MaximumLength(1000).WithMessage("Reason must not exceed 1000 characters.");

            RuleFor(x => x.FullName)
                .MaximumLength(100).WithMessage("Name must not exceed 100 characters.");

            RuleFor(x => x.PhoneNumber)
                .Matches(@"^\+?[0-9\s\-]+$").When(x => !string.IsNullOrEmpty(x.PhoneNumber))
                .WithMessage("Phone number format is invalid.");
        }
    }
}
