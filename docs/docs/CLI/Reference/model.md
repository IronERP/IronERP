# The Models Module

This is a module for interacting with models.

## Commands

### `models:sync`
This is a utility for syncing model states between local files
and the database.

By default, the authoritative source for data model structure is
the database and IronERP generates convenience POCO classes to make
working with the database easier.

With this command, you can pull the current model state from the database
and update the local generated files to reflect the latest structure. Alternatively,
when running in [local-to-db](#) mode, you can use this command to update
the database state based on your local model files.

#### Flags
  - `--always-overwrite`: Always regenerate local files, even if they exist and are in sync.
  - `--local-to-db`: Use local files as the source of truth and update the database accordingly.