using WebAPI.Data;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data.Repo;
using WebAPI.Interfaces;
using WebAPI.Helpers;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddDbContext<DataContext>(optios => optios.UseSqlServer(builder.Configuration.GetConnectionString("Default") + ";TrustServerCertificate=true;"));
builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddCors(); // After AddControllers
builder.Services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(m => m.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());  // Before UseAuthorization and After Routing Middleware

app.UseAuthorization();

app.MapControllers();

app.Run();
