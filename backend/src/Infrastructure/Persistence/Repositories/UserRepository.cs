using Domain.Aggregates.Users;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories;

public class UserRepository : IUserRepository
{
    private readonly TravelersMarkDbContext _dbContext;
    public UserRepository(TravelersMarkDbContext context) => _dbContext = context;

    public async Task AddAsync(User user, CancellationToken cancellationToken = default)
    {
        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(User user, CancellationToken cancellationToken = default)
    {
        _dbContext.Users.Update(user);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
    public async Task DeleteAsync(User user, CancellationToken cancellationToken = default)
    {
        _dbContext.Users.Remove(user);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
    public async Task<LocalLogin?> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
    {
        return await _dbContext.UserLogins
            .AsNoTracking()
            .OfType<LocalLogin>()
            .FirstOrDefaultAsync(localLogin => localLogin.Email.Value == email, cancellationToken);
    }
}