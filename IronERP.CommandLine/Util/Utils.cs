using System.Diagnostics;
using System.Reflection;

namespace IronERP.CommandLine.Util;

public static class Utils
{
    public static string? GetAssemblyVersion()
    {
        var assembly = Assembly.GetExecutingAssembly();
        var fvi = FileVersionInfo.GetVersionInfo(assembly.Location);
        return fvi.ProductVersion;
    }
}