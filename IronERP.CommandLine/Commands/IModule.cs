namespace IronERP.CommandLine.Commands;

public interface IModule
{
    /// <summary>
    /// Get the module name
    /// </summary>
    /// <returns></returns>
    string GetName();
    
    /// <summary>
    /// Get the module description
    /// </summary>
    /// <returns></returns>
    string GetDescription();
    
    /// <summary>
    /// Get a dictionary of (name, ICommand instance) pairs
    /// </summary>
    /// <returns></returns>
    IDictionary<string, ICommand> GetCommands();

    /// <summary>
    /// Dispatch a command
    /// </summary>
    /// <param name="commandName"></param>
    /// <param name="args"></param>
    /// <returns></returns>
    Task Dispatch(string commandName, string[] args);
}