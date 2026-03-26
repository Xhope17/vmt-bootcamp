using TalentInsights.Application.Interfaces.Services;
using TalentInsights.Application.Models.DTOs;
using TalentInsights.Application.Services;
using TalentInsights.Shared;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

//services
builder.Services.AddScoped<ICollaboratorService, CollaboratorService>();
//builder.Services.AddScoped<ICollaboratorService, CollaboratorService>();


//agregar lo de cache de TalentInsights.Shared.Cache<T>

//builder.Services.AddSingleton(typeof(TalentInsights.Shared.Cache<>));
builder.Services.AddSingleton<Cache<CollaboratorDTO>>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
