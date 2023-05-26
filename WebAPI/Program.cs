using WebAPI.Data;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data.Repo;
using WebAPI.Interfaces;
using WebAPI.Helpers;
using System.Net;
using Microsoft.AspNetCore.Diagnostics;
using WebAPI.Extensions;
using WebAPI.Middlewares;

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
var env = builder.Environment;
app.ConfigureExceptionHandler(env);
//app.ConfigureBuiltinExceptionHandler(env);

//app.UseMiddleware<ExceptionMiddleware>();

app.UseSwagger();
app.UseSwaggerUI();

//if (app.Environment.IsDevelopment()) {
//    app.UseSwagger();
//    app.UseSwaggerUI();
//} else {
//    app.UseSwagger();
//    app.UseSwaggerUI();
//    app.UseExceptionHandler(
//        options => {
//            options.Run(
//                async context => {
//                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
//                    var ex = context.Features.Get<IExceptionHandlerFeature>();
//                    if (ex != null) {
//                        await context.Response.WriteAsync(ex.Error.Message);
//                    }
//            });
//        }
//    );
//}

app.UseHttpsRedirection();

app.UseCors(m => m.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());  // Before UseAuthorization and After Routing Middleware

app.UseAuthorization();

app.MapControllers();

app.Run();
