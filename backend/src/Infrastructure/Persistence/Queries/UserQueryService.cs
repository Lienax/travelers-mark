using Application.Users;
using Domain.Aggregates.Users;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Queries
{
    public class UserQueryService : IUserQueryService
    {
        private readonly TravelersMarkDbContext _context;

        public UserQueryService(TravelersMarkDbContext context)
        {
            _context = context;
        }

        public async Task<bool> IsEmailUniqueAsync(string email, CancellationToken cancellationToken = default)
        {
            return !await _context.UserLogins
                .AsNoTracking()
                .OfType<LocalLogin>()
                .AnyAsync(l => l.Email.Value == email, cancellationToken);
        }
    }
}
