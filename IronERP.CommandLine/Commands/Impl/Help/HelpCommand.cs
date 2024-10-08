using Spectre.Console;

namespace IronERP.CommandLine.Commands.Impl.Help;

public class HelpCommand : CommandBase
{
    private IDictionary<string, IModule> _modules;
    
    public HelpCommand(IDictionary<string, IModule> modules)
    {
        _modules = modules;
        
        Name = "help";
        Description = "Prints this help text.";
    }
    
    public override Task ExecuteAsync(string[] args)
    {
        AnsiConsole.MarkupLine("[white]Available modules:[/]");
        foreach (var (modName, module) in _modules)
        {
            AnsiConsole.MarkupLine($"  [green]{modName}[/] ==> {module.GetDescription()}");
            foreach (var (cmdName, command) in module.GetCommands())
            {
                AnsiConsole.MarkupLine($"    [green]{modName}[/]:[cyan]{cmdName}[/] ==> {command.GetDescription()}");
                if (command.GetFlags().Count > 0)
                {
                    foreach (var (flagName, flagDescription) in command.GetFlags())
                    {
                        AnsiConsole.MarkupLine($"          [purple]{flagName}[/] - {flagDescription}");
                    }
                }
            }
        }
        
        return Task.CompletedTask;
    }
}