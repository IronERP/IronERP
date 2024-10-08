namespace IronERP.CommandLine.Util;

public class MicroFlagParser
{
    public static bool HasLongFlag(string flag, string[] args) => 
        args.Any(f => f.Equals("--" + flag, StringComparison.OrdinalIgnoreCase));
    
    public static bool HasShortFlag(string flag, string[] args) =>
        args.Any(f => f.Equals("-" + flag, StringComparison.OrdinalIgnoreCase));
}