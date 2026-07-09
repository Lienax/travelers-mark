using Application.Users.Local.Login;
using Application.Users.Local.Register;
using Common;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly ILogger<AuthController> _logger;
    private readonly IMediator _mediator;

    public AuthController(ILogger<AuthController> logger, IMediator mediator)
    {
        _logger = logger;
        _mediator = mediator;
    }

    [HttpPost("local/register")]
    public async Task<IActionResult> LocalRegister([FromBody] LocalRegisterCommand command, CancellationToken cancellationToken = default)
    {
        Result result = await _mediator.Send(command, cancellationToken);
        return result.IsSuccess ? Ok(result) : BadRequest(result.Error);
    }

    [HttpPost("local/login")]
    public async Task<IActionResult> LocalLogin([FromBody] LocalLoginCommand command, CancellationToken cancellationToken = default)
    {
        Result result = await _mediator.Send(command, cancellationToken);
        return result.IsSuccess ? Ok(result) : BadRequest(result.Error);
    }
}