using IronERP.CommandLine;

var builder = WebApplication.CreateBuilder(args);

var entrypoint = new Entrypoint();

await entrypoint.Configure(builder.Services, builder.Configuration);

var app = builder.Build();

if (args.Length > 0)
{
    
    return await entrypoint.Execute(args, app.Services);
}

app.MapGet("/", () => "Hello World!");

await app.RunAsync();
return 0;
