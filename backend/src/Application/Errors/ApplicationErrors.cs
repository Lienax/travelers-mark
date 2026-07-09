using Common;

namespace Application.Errors;

public static class ApplicationErrors
{
    public static class User
    {
        public static readonly Error InvalidCredentials = new("User.InvalidCredentials", "Invalid email or password.");
    }
    public static class Email
    {
        public static readonly Error NotUnique = new("Email.NotUnique", "The email address is already registered.");
    }
}