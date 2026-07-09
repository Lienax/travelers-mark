using Application.Errors;
using Common;
using Domain.Aggregates.Users;
using MediatR;

namespace Application.Users.Local.Register;

public class LocalRegisterHandler: IRequestHandler<LocalRegisterCommand, Result<string>>
{
    private readonly IJwtProvider _jwtProvider;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IUserQueryService _queryService;
    private readonly IUserRepository _userRepository;

    public LocalRegisterHandler(IJwtProvider jwtProvider, IPasswordHasher passwordHasher, IUserQueryService queryService, IUserRepository userRepository)
    {
        _jwtProvider = jwtProvider;
        _passwordHasher = passwordHasher;
        _queryService = queryService;
        _userRepository = userRepository;
    }

    public async Task<Result<string>> Handle(LocalRegisterCommand command, CancellationToken cancellationToken = default)
    {
        if (!await _queryService.IsEmailUniqueAsync(command.Email, cancellationToken))
        {
            return Result<string>.Failure(ApplicationErrors.Email.NotUnique);
        }

        Result<User> userResult = User.LocalRegister(command.Email, _passwordHasher.Hash(command.Password));
        if (!userResult.IsSuccess)
        {
            return Result<string>.Failure(userResult.Error!);
        }
        await _userRepository.AddAsync(userResult.Value!);

        string token = _jwtProvider.Generate(userResult.Value!.Id);
        return Result<string>.Success(token);
    }
}