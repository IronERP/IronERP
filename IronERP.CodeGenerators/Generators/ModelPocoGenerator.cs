using System.IO;
using System.Text;
using IronERP.CodeGenerators.Data;
using Microsoft.CodeAnalysis;

namespace IronERP.CodeGenerators.Generators;

[Generator(LanguageNames.CSharp)]
public class ModelPocoGenerator : IIncrementalGenerator
{
    
    public void Initialize(IncrementalGeneratorInitializationContext context)
    {

        
        
        var files = context.AdditionalTextsProvider.Where(static file => file.Path.EndsWith(".json"));
        var namesAndContents = files.Select((text, cancel) => (name: Path.GetFileNameWithoutExtension(text.Path),
            content: text.GetText(cancel)!.ToString()));
        
        context.RegisterSourceOutput(namesAndContents, (spc, nameAndContent) =>
        {
            var diagnostic = Diagnostic.Create(
                new DiagnosticDescriptor(
                    "IERPGEN001",
                    "IronERP Generator",
                    "Generating model file for {0}",
                    "Generator",
                    DiagnosticSeverity.Warning,
                    isEnabledByDefault: true
                ),
                Location.None, nameAndContent.name);
            
            spc.ReportDiagnostic(diagnostic);
            
            var model = Newtonsoft.Json.JsonConvert.DeserializeObject<Model>(nameAndContent.content);
            if (model == null) return;

            var sb = new StringBuilder();
            
            sb.AppendLine($"namespace {model.Namespace}");
            sb.AppendLine($"public partial class {model.Name} {{");
            foreach (var field in model.Fields)
            {
                //if(field.Required) sb.AppendLine("[Required]");
                sb.AppendLine($"public {field.Type} {field.Name} {{ get; set; }}");
            }

            sb.AppendLine("}");
            
            spc.AddSource($"Model.{nameAndContent.name}.generated.cs", sb.ToString());
        });
    }
}