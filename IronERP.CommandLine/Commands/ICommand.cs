namespace IronERP.CommandLine.Commands;

public interface ICommand
{
    /// <summary>
    /// Get the command name
    /// </summary>
    /// <returns></returns>
    string GetName();
    
    /// <summary>
    /// Get the command description
    /// </summary>
    /// <returns></returns>
    string GetDescription();

    IDictionary<string, string> GetFlags();
    
    /// <summary>
    /// Execute the command
    /// </summary>
    /// <param name="args"></param>
    /// <returns></returns>
    Task ExecuteAsync(string[] args);
}