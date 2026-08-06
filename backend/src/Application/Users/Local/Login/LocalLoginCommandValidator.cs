using Domain.Errors;
using FluentValidation;

namespace Application.Users.Local.Login;

public class LocalLoginCommandValidator : AbstractValidator<LocalLoginCommand>
{
    public LocalLoginCommandValidator()
    {
        RuleFor(command => command.Email)
            .NotEmpty()
            .WithErrorCode(DomainErrors.Email.Empty.Code)
            .WithMessage(DomainErrors.Email.Empty.Description)

            .MaximumLength(254)
            .WithErrorCode(DomainErrors.Email.TooLong.Code)
            .WithMessage(DomainErrors.Email.TooLong.Description)

            .EmailAddress()
            .WithErrorCode(DomainErrors.Email.Invalid.Code)
            .WithMessage(DomainErrors.Email.Invalid.Description);

        RuleFor(command => command.Password)
            .NotEmpty()
            .WithErrorCode(DomainErrors.Password.Empty.Description)
            .WithMessage(DomainErrors.Password.Empty.Code)

            .MaximumLength(72)
            .WithErrorCode(DomainErrors.Password.TooLong.Code)
            .WithMessage(DomainErrors.Password.TooLong.Description);
    }
}
