namespace Application.Users;

public interface IUserQueryService
{
    Task<bool> IsEmailUniqueAsync(string email, CancellationToken cancellationToken = default);
}