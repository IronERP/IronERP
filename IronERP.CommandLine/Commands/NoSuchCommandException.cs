namespace IronERP.CommandLine.Commands;

public class NoSuchCommandException : Exception
{
    public NoSuchCommandException(string message) : base(message)
    { }
    
    public NoSuchCommandException(string message, Exception innerException) : base(message, innerException)
    { }
}