namespace Application.Users
{
    public interface IJwtProvider
    {
        string Generate(Guid userId);
    }
}
