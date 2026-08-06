using Api;
using Application;
using Infrastructure;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Serilog;

// Set up a bootstrap logger to capture early logs before the full configuration is loaded
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console(
        outputTemplate: "[{UtcTimestamp:HH:mm:ss.fff zzz} {Level:u3}] {Message:lj} {Properties}{NewLine}{Exception}"
    )
    .WriteTo.Seq("http://seq:5341")
    .CreateBootstrapLogger();

try
{
    Log.Information("Starting web application");

    var builder = WebApplication.CreateBuilder(args);

    // Replace the bootstrap logger with the full Serilog configuration
    builder.Host.UseSerilog((context, loggingConfiguration) =>
    {
        loggingConfiguration
            .ReadFrom.Configuration(context.Configuration);
    });

    // Add services to the container.
    builder.Services.AddControllers();

    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    // Enforce lowercase URLs for consistency across the API
    builder.Services.AddRouting(options =>
    {
        options.LowercaseUrls = true;
    });

    builder.Configuration.AddJsonFile("/run/secrets/appsettings.Secrets.json", true, true);

    builder.Services.AddApplicationServices();
    builder.Services.AddInfrastructureServices(builder.Configuration);

    builder.Services.AddCors(options =>
    {
        options.AddPolicy("Frontend",
            policy =>
            {
                policy.WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
            });
    });

    var app = builder.Build();

    app.UseCors("Frontend");

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseMiddleware<ExceptionHandlingMiddleware>();

    app.UseHttpsRedirection();

    app.UseAuthorization();

    app.MapControllers();

    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}