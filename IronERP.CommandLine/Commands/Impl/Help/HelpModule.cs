namespace IronERP.CommandLine.Commands.Impl.Help;

public class HelpModule : ModuleBase
{
    public HelpModule(IDictionary<string, IModule> modules)
    {
        Name = "help";
        Description = "Help operations";
        
        AddCommand(new HelpCommand(modules));
    }
}