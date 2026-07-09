using Domain.Aggregates.Users;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence;

public class TravelersMarkDbContext : DbContext
{
    public TravelersMarkDbContext(DbContextOptions<TravelersMarkDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<UserLogin> UserLogins { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(TravelersMarkDbContext).Assembly);

        base.OnModelCreating(modelBuilder);
    }
}