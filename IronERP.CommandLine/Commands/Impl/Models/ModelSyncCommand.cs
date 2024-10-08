using IronERP.CommandLine.Generator;
using IronERP.CommandLine.Models;
using IronERP.CommandLine.Util;
using MongoDB.Driver;
using Spectre.Console;

using static IronERP.CommandLine.Util.LogUtil;

namespace IronERP.CommandLine.Commands.Impl.Models;

public class ModelSyncCommand : CommandBase
{
    private MongoClient _client;
    private string _dbName;
    private IMongoCollection<ModelModel>? _collection;
    
    private const string ModelCollectionName = "Models";
    
    public ModelSyncCommand(MongoClient client, string dbName)
    {
        Name = "sync";
        Description = "Syncs local model state with DB";
        
        Flags["--always-overwrite"] = "Always overwrite all model files, even if they exist and are in sync.";

        _client = client;
        _dbName = dbName;
        
        var db = _client.GetDatabase(_dbName);
        if (db != null)
        {
            _collection = db.GetCollection<ModelModel>(ModelCollectionName);
        }
    }

    public override async Task ExecuteAsync(string[] args)
    {
        var alwaysOverwrite = MicroFlagParser.HasLongFlag("always-overwrite", args);
        var localToDb = MicroFlagParser.HasLongFlag("local-to-db", args);

        if (alwaysOverwrite)
        {
            Warning("Heads up! Running with [cyan]--always-overwrite[/]. All models will be regenerated, even if they already exist and are in sync.");
            NewLine();
        }

        if (localToDb)
        {
            Warning("Heads up! Running with [cyan]--local-to-db[/]. The remote database model definitions will be updated based on local model files!");
            NewLine();
            Error("Sorry, local-to-db mode is not supported yet.");
            return;
        }
        
        if (_collection is null)
        {
            Error("The 'models' collection is missing.");
            return;
        }
        
        Log("Determining local vs database sync state...");

        var models = await (await _collection.FindAsync(_ => true)).ToListAsync();

        if (models is null)
        {
            Emphasis("no models found");
            return;
        }

        if (models.Count < 1)
        {
            Emphasis("no models in database");
            return;
        }
        
        var modelsToCreate = new List<ModelModel>();
        
        foreach (var model in models)
        {
            if (model.Fields?.Any(f => string.Equals(f.Name, "Id", StringComparison.OrdinalIgnoreCase)) ?? false)
            {
                Error($"Model [purple]{model.Name}[/] contains an explicit ID field definition. This is not allowed as all models have an ID field added automatically to ensure compatiblity!");
                return;
            }
            if (alwaysOverwrite || !File.Exists(Path.Join("Models", $"{model.Name}.generated.cs")))
            {
                modelsToCreate.Add(model);
            }
        }

        if (modelsToCreate.Count > 0)
        {
            NewLine();
            Emphasis("The following local model files are missing and will be created:");
            NewLine();
            
            foreach (var model in modelsToCreate)
            {
                Emphasis($"  - [cyan]{model.Name}[/] ([green]Models/{model.Name}.generated.cs[/])");
            }

            NewLine();
            var confirmation = AnsiConsole.Prompt(
                new TextPrompt<bool>("Create missing model files?")
                    .AddChoice(true)
                    .AddChoice(false)
                    .DefaultValue(false)
                    .WithConverter(choice => choice ? "yes" : "no"));

            if (confirmation)
            {
                NewLine();
                Emphasis("Creating local model files...");

                NewLine();
                
                foreach (var model in modelsToCreate)
                {
                    var content = CsFileGenerator.Generate(model, "IronERP.Generators", Utils.GetAssemblyVersion() ?? "1.0.0.0");
                    if (content == null)
                    {
                        Error("could not generate model file");
                        return;
                    }
                    
                    await File.WriteAllTextAsync(Path.Join("Models", $"{model.Name}.generated.cs"), content);
                    Log($"  - Models/{model.Name}.generated.cs [[[green]OK[/]]]");
                }
            }
        }
        
        NewLine();
        Success("models synced successfully");

        return;
    }
}