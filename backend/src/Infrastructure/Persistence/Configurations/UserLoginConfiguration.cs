using Domain.Aggregates.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class UserLoginConfiguration : IEntityTypeConfiguration<UserLogin>
{
    public void Configure(EntityTypeBuilder<UserLogin> builder)
    {
        builder.ToTable("UserLogins");

        builder.HasKey(userLogin => userLogin.Id);

        builder.HasDiscriminator<string>("Provider")
            .HasValue<GuestLogin>("Guest")
            .HasValue<LocalLogin>("Local");
    }

    public class LocalLoginConfiguration : IEntityTypeConfiguration<LocalLogin>
    {
        public void Configure(EntityTypeBuilder<LocalLogin> builder)
        {
            builder.OwnsOne(localLogin => localLogin.Email, emailBuilder =>
            {
                emailBuilder.Property(email => email.Value)
                .HasColumnName("Email")
                .HasMaxLength(255)
                .IsRequired();
                emailBuilder.HasIndex(email => email.Value)
                .IsUnique();
            });

            builder.OwnsOne(localLogin => localLogin.PasswordHash, passwordHashBuilder =>
            {
                passwordHashBuilder.Property(passworrdHash => passworrdHash.Value)
                .HasColumnName("PasswordHash")
                .HasMaxLength(255)
                .IsRequired();
            });
        }
    }
}
