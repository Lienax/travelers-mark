using Common;

namespace Domain.Aggregates.Users;

public class User
{
    public Guid Id { get; private set; }
    public DateTime CreatedAt { get; private set; }

    private readonly List<UserLogin> _logins = new List<UserLogin>();
    public IReadOnlyCollection<UserLogin> Logins => _logins.AsReadOnly();

    private User(Guid id)
    {
        Id = id;
        CreatedAt = DateTime.UtcNow;
    }

    public static Result<User> GuestCreate()
    {
        User user = new User(Guid.NewGuid());

        Result<GuestLogin> guestLoginResult = GuestLogin.Create(user);
        if (!guestLoginResult.IsSuccess)
        {
            return Result<User>.Failure(guestLoginResult.Error!);
        }
        else
        {
            user._logins.Add(guestLoginResult.Value!);
        }
        return Result<User>.Success(user);
    }

    public static Result<User> LocalRegister(string email, string passwordHash)
    {
        User user = new User(Guid.NewGuid());

        Result<LocalLogin> localLoginResult = LocalLogin.Create(user, email, passwordHash);

        if (!localLoginResult.IsSuccess)
        {
            return Result<User>.Failure(localLoginResult.Error!);
        }
        else
        {
            user._logins.Add(localLoginResult.Value!);
        }
        return Result<User>.Success(user);
    }
}