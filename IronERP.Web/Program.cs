using System.Reflection;
using Core;
using Core.Search;
using IronERP.CommandLine;
using IronERP.Core.Data;
using IronERP.Web;
using IronERP.Web.Configuration;
using IronERP.Web.Controllers;
using IronERP.Web.Services.Hosted;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Formatters;
using MongoDB.Driver;
using Serilog;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .MinimumLevel.Debug()
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSerilog();

builder.Services.AddControllers(options =>
{
    options.OutputFormatters.RemoveType<StringOutputFormatter>();
});
builder.Services.AddMvcCore(opts => {})
    .ConfigureApplicationPartManager(apm =>
    apm.FeatureProviders.Add(new GenericControllerProvider()));

builder.Services.Configure<MongoConfig>(builder.Configuration.GetSection("MongoDB"));
builder.Services.AddSingleton(new MongoClient(builder.Configuration.GetSection("MongoDB")["Host"]));

builder.Services.AddSingleton<ModelDaoFactory>();
builder.Services.AddCors();

builder.Services.AddHostedService<SearchIndexerService>();

var modelTypes = Assembly.GetExecutingAssembly()
    .GetTypes()
    .Where(t => typeof(IModel).IsAssignableFrom(t) && !t.IsInterface && !t.IsAbstract)
    .ToList();

foreach (var model in modelTypes)
{
    var controllerType = typeof(CrudController<>).MakeGenericType(model);
    builder.Services.AddTransient(controllerType);
}

var entrypoint = new Entrypoint();

await entrypoint.PreConfigure(builder.Services, builder.Configuration);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.UseIronERP();

var app = builder.Build();

app.Services.GetRequiredService<ISearchService>();

await entrypoint.Configure(app.Services, app.Configuration);

if (args.Length > 0)
{
    return await entrypoint.Execute(args, app.Services);
}

app.UseCors(o => o.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
app.MapGet("/", () => "Hello World!");
app.MapControllers();

app.UseSwagger();
app.UseSwaggerUI();

await app.RunAsync();
return 0;