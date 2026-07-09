using Common;
using Domain.Errors;
using System.Text.RegularExpressions;

namespace Domain.Aggregates.Users.ValueObjects;

public sealed record Email
{
    private static readonly Regex EmailFormatRegex =
        new(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", RegexOptions.Compiled);

    public string Value { get; private set; }

    private Email(string value) => Value = value;

    public static Result<Email> Create(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
        {
            return Result<Email>.Failure(DomainErrors.Email.Empty);
        }

        if (email.Length > 254)
        {
            return Result<Email>.Failure(DomainErrors.Email.TooLong);
        }

        if (!EmailFormatRegex.IsMatch(email))
        {
            return Result<Email>.Failure(DomainErrors.Email.Invalid);
        }

        return Result<Email>.Success(new Email(email));
    }
}
