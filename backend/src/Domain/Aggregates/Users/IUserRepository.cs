namespace Domain.Aggregates.Users;
public interface IUserRepository
{
    Task AddAsync(User user, CancellationToken cancellationToken = default);
    Task UpdateAsync(User user, CancellationToken cancellationToken = default);
    Task DeleteAsync(User user, CancellationToken cancellationToken = default);
    Task<LocalLogin?> GetByEmailAsync(string email, CancellationToken cancellationToken = default);
}