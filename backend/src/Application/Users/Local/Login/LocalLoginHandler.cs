using Application.Errors;
using Common;
using Domain.Aggregates.Users;
using MediatR;

namespace Application.Users.Local.Login;

public class LocalLoginHandler : IRequestHandler<LocalLoginCommand, Result<string>>
{
    private readonly IJwtProvider _jwtProvider;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IUserRepository _userRepository;

    public LocalLoginHandler(IJwtProvider jwtProvider, IPasswordHasher passwordHasher, IUserRepository userRepository)
    {
        _jwtProvider = jwtProvider;
        _passwordHasher = passwordHasher;
        _userRepository = userRepository;
    }

    public async Task<Result<string>> Handle(LocalLoginCommand command, CancellationToken cancellationToken = default)
    {
        LocalLogin? localLogin = await _userRepository.GetByEmailAsync(command.Email, cancellationToken);

        if (localLogin is null)
        {
            return Result<string>.Failure(ApplicationErrors.User.InvalidCredentials);
        }

        bool isPasswordValid = _passwordHasher.Verify(command.Password, localLogin.PasswordHash.Value);
        if (!isPasswordValid)
        {
            return Result<string>.Failure(ApplicationErrors.User.InvalidCredentials);
        }

        string token = _jwtProvider.Generate(localLogin.UserId);
        return Result<string>.Success(token);
    }
}
