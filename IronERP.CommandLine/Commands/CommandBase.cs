namespace IronERP.CommandLine.Commands;

public abstract class CommandBase : ICommand
{
    protected string Name = string.Empty;
    
    protected string Description = string.Empty;

    protected readonly IDictionary<string, string> Flags = new Dictionary<string, string>();

    public string GetName() => Name;

    public string GetDescription() => Description;
    public IDictionary<string, string> GetFlags() => Flags;

    public abstract Task ExecuteAsync(string[] args);
}