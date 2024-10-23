/*
 * This file is part of IronERP.
 * 
 * IronERP is free software: you can redistribute it and/or modify it under the terms of 
 * the GNU General Public License as published by the Free Software Foundation, either 
 * version 3 of the License, or (at your option) any later version.
 * IronERP is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR 
 * PURPOSE. See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with IronERP. 
 * If not, see <https://www.gnu.org/licenses/>.
 *
 * Authors:
 *  - Jakub Sycha <utf-8x>
 */

using IronERP.Core;
using IronERP.Core.Search;
using IronERP.Core.Util;
using IronERP.CommandLine;
using IronERP.Web;
using IronERP.Web.Configuration;
using IronERP.Web.Services.Hosted;
using IronERP.Web.Util;
using Microsoft.AspNetCore.Mvc.Formatters;
using MongoDB.Driver;
using Serilog;

// Enable Serilog
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .MinimumLevel.Debug()
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);

// Add Serilog to AspNet
builder.Services.AddSerilog();

// Allow returning raw JSON strings
builder.Services.AddControllers(options => options.OutputFormatters.RemoveType<StringOutputFormatter>());

// Auto-register CRUD controllers
builder.Services.UseDynamicControllers();
builder.Services.AddMvcCore().ConfigureApplicationPartManager(apm => apm.FeatureProviders.Add(new GenericControllerProvider()));

// Use core IronERP services
builder.Services.UseIronERP();

// Connect to MongoDB
builder.Services.Configure<MongoConfig>(builder.Configuration.GetSection("MongoDB"));
builder.Services.AddSingleton(new MongoClient(builder.Configuration.GetSection("MongoDB")["Host"]));

// Enable CORS
builder.Services.AddCors();

// Add search services
builder.Services.AddHostedService<SearchIndexerService>();


// Configure the IronERP CLI. We need to do this here while the ServiceCollection is open
var entrypoint = new Entrypoint();
await entrypoint.PreConfigure(builder.Services, builder.Configuration);

if (builder.Environment.IsDevelopment())
{
    // Enable Swagger
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();   
}

var app = builder.Build();

// Make sure the Search Service gets initialized so the indexer runs on launch
app.Services.GetRequiredService<ISearchService>();

// If we're running with args, launch the CLI
if (args.Length > 0)
{
    await entrypoint.Configure(app.Services, app.Configuration);
    return await entrypoint.Execute(args, app.Services);
}

// If we're in dev mode, enable CORS from everywhere and Swagger UI
if (app.Environment.IsDevelopment())
{
    app.UseCors(o => o.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/", () => $"IronERP Backend v{AssemblyUtil.GetVersion()}");

app.MapControllers();

await app.RunAsync();

return 0;