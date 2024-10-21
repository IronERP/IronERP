# [IronERP](https://github.com/IronERP/IronERP)

### IronERP is a free and open-source .NET Enterprise Resource Planning (ERP) system. The goal of IronERP is to be as flexible and customizable as possible while maintaining maximum user-friendliness.

![License GPLv3](https://img.shields.io/badge/License-GPLv3-blue)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-green)](/CONTRIBUTING.md)
![Static Badge](https://img.shields.io/badge/Latest_Release-v0.0.1.0-purple)
![Static Badge](https://img.shields.io/badge/NuGet-IronERP.Core%40v0.0.1.0-blue)




Learn more at [ironerp.org](https://ironerp.org).

## Looking to install IronERP?

You can get started using the following commands on Windows, Linux and macOS. 
(You will need to have [Docker](https://www.docker.com) installed)

```shell
wget https://github.com/IronERP/IronERP/raw/refs/heads/main/examples/full/compose.yaml
docker compose up
```

Afterwards, follow the on-screen instructions.

## Documentation

We have a comprehensive [documentation site](https://ironerp.org/).

Some important links to get started:

 - [Installing IronERP](https://ironerp.org/installing)
 - [Getting to know IronERP](https://ironerp.org/intro)

### Pro Tip: While you can run IronERP from the source code in this repo, the recommended way is to [bootstrap your own project](https://ironerp.org/new-project) based on IronERP.

## License

All IronERP code is published under the [GPLv3 license](https://www.gnu.org/licenses/gpl-3.0.en.html). The
documentation is published under the [FDLv1.3 license](https://www.gnu.org/licenses/fdl-1.3.html).

The name IronERP, the logo and all related marketing material are Copyright &copy; Jakub Sycha, 2024.

## FAQ

#### What is this? Is it production ready?

IronERP is a highly customizable, open-source ERP solution. The project is currently in a very early
proof-of-concept stage and should absolutely **not** be used in production.

#### How is this financed? Do you have a business model?

Currently, IronERP is an experimental project that I'm working on mainly for fun and not for profit.
In the current stage, I'm not working on this project with the intention of making a profit but because
I needed something complex to hone my skills on.

Should this project ever actually take off, I might consider asking for donations to cover my expenses
so I can work on the project full time. (And possibly share with other contributors, should there be any).

On the off-chance that this turns into a real, production ready thing, I plan to finance its development
by establishing a "consulting" company that will sell commercial support and potentially a SaaS offering.

The project will always remain 100% open-source with absolute 1:1 feature parity between the "Community" 
and potential "Commercial" releases.

#### Can I contribute?

**Absolutely!** If you're new to IronERP, please look through issues labeled with
[Good First Issue](https://github.com/IronERP/IronERP/labels/good%20first%20issue) and feel free
to pick anything from there. When you do, please comment on the issue to let other contributors know
somebody is working on the issue.

Please see [CONTRIBUTING.md](/CONTRIBUTING.md) for more information.

#### Why "Engine" and not "Framework"?

Wikipedia defines a "Framework" as
 > a reusable set of libraries or classes for a software system or subsystem [^1]
 
whereas an "Engine" is defined as
 > A software engine is a core component of a complex software system. [^2]

IronERP is not just a collection of components. It's already a complex system in itself,
and in fact, many users will find a base install of IronERP to already fit all of their needs
as a full-featured application. On the other hand, advanced users and larger organizations will
appreciate the extreme customizability and extensibility of IronERP. Therefore we believe that
"Engine" is a more fitting category for IronERP than "Framework".

[^1]: https://en.wikipedia.org/wiki/Framework#Computing
[^2]: https://en.wikipedia.org/wiki/Software_engine