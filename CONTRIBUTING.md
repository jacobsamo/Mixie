# Contributing

Thank you for your interest in making Meally a better website.

Due to me being a solo Dev Please make sure when writing code it is readable or commented properly so i can easily accept pull requests. Thank you in advance for you help.
Look to [getting started](./GETTING_STARTED.md) for more information on how to get started.

## Project structure

This repo was migrated from Nextjs 12 to a monorepo using Turborepo and Nextjs 13 for it's app. with huge improvements in build times and code structure.
All shared code is now under [packages](./packages/) and all apps are under [apps](./apps/).

### Requirements

- Node >= 16
- Git >= 2.38
- Firebase-cli >= 11.19.0

### Before requesting a PR

Before requesting a PR please make sure you have the following:

1. Made Tests for what you have added (if applicable)
2. Run `yarn dev`
3. run `yarn build`
4. Fix any issues, bugs or errors in the build step
5. run `yarn start` go through your change and test for every case there could be and fix any issues

If you have learnt anything new on the project please add to [what you have learnt](./about_the_project/things_learnt/) by create a file with your name and adding what you have learnt. e.g: `John_doe.md` or `John.d.md`
