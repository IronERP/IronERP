**Thank you for your interest in contributing to IronERP!** This document will explain how to navigate the
whole contribution process from start to finish.

## Before you Start

#### Working on existing issues

If you would like to work on an existing issue, especially one tagged
[Good First Issue](https://github.com/IronERP/IronERP/labels/good%20first%20issue), just drop a comment
under the issue to let others know you're working on it, and you're good to go.

If you would like to contribute something new that hasn't been discussed before, it's usually a good
idea to open an issue first and describe the changes you would like to make. This helps ensure you
won't waste your time working on something that is either already being worked on by someone else, or a
change that wouldn't be accepted for some reason.

Generally, changes might not be accepted for the following reasons:

 - A rudimentary change that doesn't fix anything and doesn't bring anything new to the table,
   e.g. only changing formatting, replacing tabs with spaces / spaces with tabs, arbitrarily renaming
   classes, namespaces, methods or variables, etc.
 - Adding code that's not legally compatible. E.g. code from a project licensed under a non-permissive
   license or a license that's not compatible with the GPL.
 - Adding code that's not ethically compatible. E.g. unnecessary telemetry, any form of DRM, spyware,
   backdoors, etc. The IronERP maintainers reserve the right to decide what's considered ethically
   incompatible.

#### Reporting Security Vulnerabilities

Please do not disclose security vulnerabilities publicly. Until we set up a better system for this, please
report any potential security vulnerabilities directly through email to `hello [at] jakubsycha [dot] com`
or through Signal messenger to `@utf8x.42`.

If you would like to encrypt your email, please use 
[this public key](https://github.com/UTF-8x/UTF-8x/blob/main/hello_at_jakubsycha_dot_com.pem).
(`51E406591E962B190BEB65DA8CC4DE4F1B9F465A`)

#### Code of Conduct

IronERP has adopted the [Rust code of conduct](https://www.rust-lang.org/policies/code-of-conduct), all
public contributions to IronERP (code, issues, issue comments, documentation, etc.) must follow this
code of conduct.

## Setting up your development environment

In order to successfully build and test IronERP, you'll need:

 - A .NET Core SDK (version 8.0.0+)
 - NodeJS v20.12.0+ with Yarn installed
 - Docker, Podman or other way of running MongoDB and Meilisearch
 - A text editor or an IDE (we recommend VSCode, Rider or Visual Studio)
 - A working install of git and a GitHub account

IronERP uses pull requests for contributions. Fork [IronERP/IronERP](https://github.com/IronERP/IronERP)
and clone your fork.

#### Run the Dependencies

To fully launch an IronERP instance, you will, at the very least, need an instance of MongoDB and
Meilisearch. The "official", recommende way of running them is using the included docker-compose file.

```shell
> cd examples/development && docker compose up -d
```

This will spin up an instance of MongoDB and Meilisearch and expose their respective ports. If you already
have something running on these ports, please adjust the compose file accordingly.

#### Install the Frontend Dependencies

For this, you will need to change to the frontend directory and run yarn. Make sure you're using NodeJS 20.

```shell
> cd Frontend/ironerp-frontend && yarn
```

#### Run the Backend

Unless you've changed the ports in the compose file, all the configuration should already be set properly.
Now you just need to run the backend. Change into the `IronERP.Web` directory and run. Make sure to set
the `ASPNETCORE_ENVIRONMENT` env. variable to `Development` to make sure the backend runs in Development
mode.

```shell
cd IronERP.Web
ASPNETCORE_ENVIRONMENT=Development dotnet run
```

The first run might take a while as dotnet downloads external dependencies and IronERP bootstraps the database.

#### Run the frontend

Once you have the backend running, you can start the frontend. To do this, you'll need to change into the
frontend directory again and run `yarn dev`.

```shell
> cd Frontend/ironerp-frontend && yarn dev
```

Once the frontend server starts, you can access your IronERP instance at [http://localhost:3000](http://localhost:3000).

#### Create a new branch for your work

If you're working on something based on an issue, please include the issue number in the branch name. Use prefixes to
indicate the intention of the code in the branch.

In general, please keep branch names in this format: `<feature/fix>/<issue_number>-<description>`.

For example:

 - `feature/1010-add-an-easter-egg`
 - `fix/1011-remove-broken-easter-egg`

## Making your Change

All code contributions sent to IronERP should:

 - Work. Please test all your changes locally before you push!
 - Have unit tests, ideally covering 100% of any added code (for the backend, the frontend does not use unit-testing at the moment)
 - Have complete documentation. If you're changing how a feature works, or you're adding a new feature, don't forget to also
   create a corresponding pull request to the [IronERP/docs](https://github.com/IronERP/docs) project
 - Follow the Microsoft [Common C# code conventions](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions)
 - Adhere to the code of conduct

#### Contributing to Documentation

Please follow the [CONTRIBUTING.md](https://github.com/IronERP/docs/blob/main/CONTRIBUTING.md) file in the
[IronERP/docs](https://github.com/IronERP/docs) repo. If your contribution includes documentation changes, please
link the docs pull request.

#### Creating commits and writing commit messages

The commit messages you write are a very important piece of documentation. They are, among other things, used
for generating changelogs. Please follow these guidelines when creating commits:

 - Write good commit messages. IronERP uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
   Please follow the Conventional Commits guidelines when writing commit messages. All commit messages are automatically
   checked and pull requests with incompatible commit messages will be rejected.
 - [Sign off your commits](https://git-scm.com/docs/git-commit#Documentation/git-commit.txt---signoff) to indicate that
   you agree to the terms of [Developer Certificate of Origin](https://developercertificate.org/). We cannot accept
   pull requests containing commits that are not signed off.

#### Submitting your change

After you submit your pull request, a series of GitHub actions will run, ensuring your commit messages adhere to
conventional commits and your unit tests all pass. An IronERP Maintainer will then review your changes. It is normal
for a PR to go through multiple iterations before it's accepted so please don't be discouraged when someone asks you
to make additional changes.

After your change gets accepted, it will be merged into `main`, released as part of the next nightly build and
eventually released in the following full release.

#### Signing off commits after submitting a PR

If you forgot to sign off your commits, don't worry, you can always do it later.

To sign off a single commit:

`git commit --amend --signoff`

To sign off multiple commits in a branch:

`git rebase --signoff origin/main`

Then force-push your branch

`git push --force origin your-branch`

## Thank You!

We deeply appreciate your effort towards improving IronERP. Please remember that some contributions may
be eligible for a bounty! (coming soon)

If this is your first contribution, please don't forget to add your name to the CONTRIBUTORS file to be
immortalized in the repo forever. While this is not a requirement, we encourage everyone to do so!