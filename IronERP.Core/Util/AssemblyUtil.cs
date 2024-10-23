using System.Reflection;
using IronERP.Core.Data;

namespace Core.Util;

public class AssemblyUtil
{
    public static List<Type> ListAllModels() => Assembly.GetExecutingAssembly()
        .GetTypes()
        .Where(t => typeof(IModel).IsAssignableFrom(t) && !t.IsInterface && !t.IsAbstract)
        .ToList();

    public static string? GetVersion() => Assembly.GetExecutingAssembly()
        .GetCustomAttribute<AssemblyInformationalVersionAttribute>()
        ?.InformationalVersion?.Split("+").FirstOrDefault();
}