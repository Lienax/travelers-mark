using Common;

namespace Domain.Errors;

public static class DomainErrors
{
    public static class User
    {
        public static readonly Error NotFound = new("User.NotFound", "User not found.");
    }
    public static class Email
    {
        public static readonly Error Empty = new("Email.Required", "Email cannot be empty.");
        public static readonly Error Invalid = new("Email.Invalid", "Invalid email address.");
        public static readonly Error TooLong = new("Email.TooLong", "Email cannot exceed 254 characters.");
    }
    public static class Password
    {
        public static readonly Error Empty = new("Password.Required", "Password cannot be empty.");
        public static readonly Error TooShort = new("Password.TooShort", "Password must be at least 8 characters long.");
        public static readonly Error TooLong = new("Password.TooLong", "Password cannot exceed 72 characters.");
    }
    public static class PasswordHash
    {
        public static readonly Error Empty = new("PasswordHash.Required", "Password hash cannot be empty.");
    }
}
