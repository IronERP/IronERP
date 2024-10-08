using System.Reflection;
using IronERP.CommandLine;
using IronERP.Core.Data;
using IronERP.Web;
using IronERP.Web.Configuration;
using IronERP.Web.Controllers;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.AspNetCore.Mvc.Controllers;
using MongoDB.Driver;
using Serilog;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .MinimumLevel.Debug()
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSerilog();

builder.Services.AddControllers();
builder.Services.AddMvcCore(opts => {})
    .ConfigureApplicationPartManager(apm =>
    apm.FeatureProviders.Add(new GenericControllerProvider()));

builder.Services.Configure<MongoConfig>(builder.Configuration.GetSection("MongoDB"));
builder.Services.AddSingleton(new MongoClient(builder.Configuration.GetSection("MongoDB")["Host"]));

builder.Services.AddSingleton<ModelDaoFactory>();

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

var app = builder.Build();

await entrypoint.Configure(app.Services, app.Configuration);

if (args.Length > 0)
{
    
    return await entrypoint.Execute(args, app.Services);
}

app.MapGet("/", () => "Hello World!");
app.MapControllers();

await app.RunAsync();
return 0;