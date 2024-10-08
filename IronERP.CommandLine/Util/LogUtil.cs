using Spectre.Console;

namespace IronERP.CommandLine.Util;

public static class LogUtil
{
    public static void NewLine() => AnsiConsole.WriteLine("");
    
    public static void Log(string message) => AnsiConsole.MarkupLine($"[white]{message}[/]");
    
    public static void Emphasis(string message) => AnsiConsole.MarkupLine($"[yellow]{message}[/]");
    
    public static void Success(string message) => AnsiConsole.MarkupLine($"[green]{message}[/]");
    
    public static void Warning(string message) => AnsiConsole.MarkupLine($"[bold yellow]{message}[/]");
    
    public static void Error(string message) => AnsiConsole.MarkupLine($"[bold red]{message}[/]");
}