using Domain.Aggregates.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users");

        builder.HasKey(user => user.Id);

        builder.HasMany(user => user.Logins)
               .WithOne(userLogin => userLogin.User)
               .HasForeignKey(userLogin => userLogin.UserId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}