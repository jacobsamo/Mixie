# How to get started
First clone the repository and then cd into it
```bash
    git clone https://github.com/Eirfire/Meally.git
    cd Meally
```
Then install the dependencies
```bash
    npm install
```
Then start the all apps
```bash
    npm run dev
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
If you aren't familiar with Workspaces they are pretty much ways of separating where things are in a project. so when installing into a certain workspace it will only install into that workspace and not the others, E.x `npm i <package_name> --workspace=meally.com.au`.

