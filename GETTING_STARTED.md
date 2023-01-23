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
    // e.g npm run dev --filter meally.com.au
```
## Contributing
Please see our [contributing guide](./CONTRIBUTING.md) for more information on how to contribute to the project.

### Good First issues
If you are new to the project and want to help out but don't know where to start than please check out our [good first issues](https://github.com/Eirfire/Meally/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)


## file structure 
The repo uses a custom Nextjs 13 file structure with [Turborepo](https://turbo.build/repo). This means that the repo is a monorepo with multiple apps and packages. The apps are the actual websites and the packages are the shared code between the apps. The apps and packages are all in the same repo but are separate from each other. This means that the apps and packages can be developed and tested independently of each other. This also means that the apps and packages can be published independently of each other. This is very useful for the packages as they can be published to npm and used in other projects.

## Workspaces
If you aren't familiar with Workspaces they are pretty much ways of separating where things are in a project. so when installing into a certain workspace it will only install into that workspace and not the others, E.x `yarn workspace meally.com.au add React`. [for more information](https://classic.yarnpkg.com/en/docs/workspaces/)

## Consistent coding style
Through this project there is mostly a consistent code style so it is easy to follow and understand no matter where you are in the project. When working on the project it would be greatly appreciated if you could follow this style. 

### Passing props
When passing props to a component i like to have this sort of structure:
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
or if you want to access React props like `displayName` than you can do this:
```jsx
    import React from 'react';
    interface componentProps{
        prop1: string;
        prop2: string;
        prop3: string;
    }

    const Component: React.Fc<componentProps>  = ({prop1, prop2, prop3, ...props}) => {
        return (
            <div {...props}>
                ...
            </div>
        )
    }
```
A interface is used to define the props types named with camelCase fashion E.g (`interface <component_name>Props {}`). 