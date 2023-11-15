# How to get started

First clone the repository and then cd into it

```bash
    git clone https://github.com/Eirfire/Meally.git
    cd Meally
```

Then install the dependencies

```bash
    yarn
```

Then start the all apps

```bash
    yarn dev
```

start just the one you want

```bash
    npm run dev --filter *app name*
    # e.g npm run dev --filter meally.com.au
    # e.g npm run dev --filter meally.com.au
```

## Contributing

Please see our [contributing guide](./CONTRIBUTING.md) for more information on how to contribute to the project.

### Good First issues

If you are new to the project and want to help out but don't know where to start than please check out our [good first issues](https://github.com/Eirfire/Meally/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)

## file structure

The repo uses a custom Nextjs 13 file structure with [Turborepo](https://turbo.build/repo). The project has been set up as a monorepo with multiple apps and packages.
All apps live under the [apps directory](./apps/) and packages that are shared between apps are under [packages](./packages/).

## Workspaces

If you aren't familiar with Workspaces they are pretty much ways of separating where things are in a project. so when installing into a certain workspace it will only install into that workspace and not the others, E.x `pnpm add React --filter meally`. 

## Consistent coding style

Through this project there is mostly a consistent code style so it is easy to follow and understand no matter where you are in the project. When working on the project it would be greatly appreciated if you could follow this style.

### Passing props

Passing props

```jsx
    interface componentProps {
        prop1: string;
        prop2: string;
        prop3: string;
    }

    const Component = ({prop1, prop2, prop3}: componentProps) => {
        return (
            ...
        )
    }
```