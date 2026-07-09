using Common;
using Domain.Errors;

namespace Domain.Aggregates.Users.ValueObjects;

public sealed record PasswordHash
{
    public string Value { get; init; }
    private PasswordHash(string value) => Value = value;
    public static Result<PasswordHash> Create(string? password)
    {
        if (string.IsNullOrWhiteSpace(password))
        {
            return Result<PasswordHash>.Failure(DomainErrors.PasswordHash.Empty);
        }
        return Result<PasswordHash>.Success(new PasswordHash(password));
    }
}
