using MongoDB.Driver;

namespace IronERP.CommandLine.Commands.Impl.Models;

public class ModelsModule : ModuleBase
{
    public ModelsModule(MongoClient mongoClient, string databaseName)
    {
        Name = "models";
        Description = "Work with models";
        
        AddCommand(new ModelSyncCommand(mongoClient, databaseName));
    }
}