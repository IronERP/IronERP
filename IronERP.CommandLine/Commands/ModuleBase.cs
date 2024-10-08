namespace IronERP.CommandLine.Commands;

public class ModuleBase : IModule
{
    protected string Name = string.Empty;
    
    protected string Description = string.Empty;

    private Dictionary<string, ICommand> _commands = new();

    public string GetName() => Name;

    public string GetDescription() => Description;
    
    protected void AddCommand(string name, ICommand command) => _commands.Add(name, command);

    protected void AddCommand(ICommand command) => _commands.Add(command.GetName(), command);

    public IDictionary<string, ICommand> GetCommands() => _commands;
    
    public async Task Dispatch(string commandName, string[] args)
    {
        if (!_commands.TryGetValue(commandName, out var command))
        {
            throw new NoSuchCommandException($"no such command '{commandName}' in module '{Name}");
        }

        await command.ExecuteAsync(args);
    }
}