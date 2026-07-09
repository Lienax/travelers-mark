using Common;
using MediatR;

namespace Application.Users.Local.Register;

public record LocalRegisterCommand : IRequest<Result<string>>
{
    public string Email { get; init; } = string.Empty;
    public string Password { get; init; } = string.Empty;
}