# Models

To provide as much flexibility as possible and to enable the dynamic model builder
functionality, IronERP doesn't use traditional, hardcoded database models. Instead,
the database structure is defined in the database itself and temporary model classes
are automatically generated when necessary.

## Creating a Model

!!! INFO
    If you want to create your models using a user-friendly graphical model builder,
    please see the [Model Builder](#) page.

Instead of using the graphical Model Builder, you can create model definitions manyually
in the database.

Create a new document in the `Models` collection with the following contents:

```javascript
{
  "_id": {
    "$oid": "<unique id>" // Unique MongoDB ID
  },
  "name": "<Model Name>", // (1)
  "namespace": "IronERP.Web.Models", // (2)
  "fields": [ // (3)
    {
      "name": "Name",
      "label": "Name",
      "type": "string",
      "required": false
    }
    // ...
  ]
}
```

1. The name of this model. This name will be used in the API (`/api/v1/<Name>`) and for
   the generated model classes (`Models/<Name>.generated.cs`).
2. Namespace for the model. If building directly on IronERP, use `IronERP.Web.Models`,
   if building on top or IronERP, change this accordingly. (e.g. `MyAwesomeERP.Models`)
3. List of field definitions. See below.

### Field Definitions

A model definition contains a list of field definitions. These are the fields that will
be available in the model.

The structure for a field definition is:

```javascript
{
    "name": "string", // (1)
    "label": "string", // (2)
    "type": "string", // (3)
    "required": bool // (4)
}
```

1. The internal name of this field. Must be a [valid C# property name](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/identifier-names).
2. A user-friendly label shown in the UI. Can be any valid UTF-8 string.
3. The type of this field. Must be a valid C# type (e.g. `string`, `int`, `bool`, etc.)
4. Marks the field as required. Used in UI and validation.

### Generating Model Classes

When you add a new model through the Model Builder, the appropriate C# files will be
generated automatically. When you add a model manually, you will need to generate them
yourself.

!!! INFO
    For more info about the command line utility, see [CLI/Models](/CLI/Reference/model/)

To generate all model files, run

```shell
./IronERP models:sync --always-overwrite
```