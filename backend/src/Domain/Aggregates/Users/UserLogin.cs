using Common;
using Domain.Aggregates.Users.ValueObjects;

namespace Domain.Aggregates.Users;

public abstract class UserLogin
{
    public Guid Id { get; private set; }
    public Guid UserId { get; private set; }
    public User? User { get; private set; }
    protected UserLogin() { }
    protected UserLogin(Guid id, User user)
    {
        Id = id;
        UserId = user.Id;
        User = user;
    }
}

public sealed class GuestLogin : UserLogin
{
    public Guid GuestId { get; private set; }
    private GuestLogin() { }
    private GuestLogin(Guid id, User user, Guid guestId) : base (id, user)
    {
        GuestId = guestId;
    }
    public static Result<GuestLogin> Create(User user)
    {
        return Result<GuestLogin>.Success(new GuestLogin(Guid.NewGuid(), user, Guid.NewGuid()));
    }
}

public sealed class LocalLogin : UserLogin
{
    public Email Email { get; private set; } = null!;
    public PasswordHash PasswordHash { get; private set; } = null!;
    private LocalLogin() { }
    private LocalLogin(Guid id, User user, Email email, PasswordHash passwordHash) : base (id, user)
    {
        Email = email;
        PasswordHash = passwordHash;
    }

    public static Result<LocalLogin> Create(User user, string email, string? passwordHash = null)
    {
        Result<Email> emailResult = Email.Create(email);
        if (!emailResult.IsSuccess)
        {
            return Result<LocalLogin>.Failure(emailResult.Error!);
        }

        Result<PasswordHash> passwordHashResult = PasswordHash.Create(passwordHash);
        if (!passwordHashResult.IsSuccess)
        {
            return Result<LocalLogin>.Failure(passwordHashResult.Error!);
        }

        return Result<LocalLogin>.Success(new LocalLogin(Guid.NewGuid(), user, emailResult.Value!, passwordHashResult.Value!));
    }
}