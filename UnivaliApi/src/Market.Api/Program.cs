using Market.Api.Contexts;
using Microsoft.EntityFrameworkCore;
using Pokedex.Api.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(options => { //Para colocar o host sempre em 5000
   options.ListenLocalhost(5000);
});

builder.Services.AddControllers();

builder.Services.AddDbContext<ItemContext>( //Para usar o Banco de Dados
    options => {
        options
            .UseNpgsql("Host=localhost;Database=MarketProject;Username=postgres;Password=Gui250504");
    }
);

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

await app.ResetDatabaseAsync();

app.Run();
