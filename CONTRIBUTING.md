# Contributing

Thank you for your interest in making Meally a better website.

Due to me being a solo Dev Please make sure when writing code it is readable or commented properly so i can easily accept pull requests. Thank you in advance for you help.
Look to [getting started](./GETTING_STARTED.md) for more information on how to get started.

## Project structure

This repo was migrated from Nextjs 12 to a monorepo using Turborepo and Nextjs 13 for it's app. with huge improvements in build times and code structure.
All shared code is now under [packages](./packages/) and all apps are under [apps](./apps/).
This repo was migrated from Nextjs 12 to a monorepo using Turborepo and Nextjs 13 for it's app. with huge improvements in build times and code structure.
All shared code is now under [packages](./packages/) and all apps are under [apps](./apps/).

### Requirements

- Node >= 18
- Git >= 2.38


### Committing changes

In this project we use commit messages to better identify the changes along with making things more clear.

FEAT: Use this keyword to indicate that you are committing to a new feature.
"FEAT: Add new login functionality."

CHANGE: Use this keyword to indicate that you are committing to a change in functionality.
"CHANGE: Update login functionality to use new API."

UPDATE: Use this keyword to indicate that you are committing to an update to a feature.
"UPDATE: Update login functionality to use new API."

FIX: Use this keyword to indicate that you are committing a fix for a specific problem or issue.
"FIX: Fix bug causing crashes on certain devices."

DOCS: Use this keyword to indicate that you are committing to a documentation change.
"DOCS: Update README.md to include new login functionality."

STYLE: Use this keyword to indicate that you are making changes to the style or formatting of the code, but not its functionality.
"STYLE: Update indentation in main.js."

REFACTOR: Use this keyword to indicate that you are making changes to the code that improve its structure or organisation, but do not add new features or fix bugs.
"REFACTOR: Refactor the code to improve readability."

TEST: Use this keyword to indicate that you are adding or updating tests for the code.
"TEST: Add new unit tests for login functionality."

CHORE: Use this keyword to indicate that you are making changes to the build process or other tasks that are not directly related to the code itself.
"CHORE: Update dependencies in package.json."

PERF: Use this keyword to indicate that you are making changes to improve the performance of the code.
"PERF: Optimize image loading for faster performance."

CI: Use this keyword to indicate that you are making changes to the continuous integration process.
"CI: Fix issue with test pipeline on Dashboard CI."

BUILD: Use this keyword to indicate that you are making changes to the build process.
"BUILD: Add new script for building the production version of the app."

### Before requesting a PR

Before requesting a PR please make sure you have the following:

1. Made Tests for what you have added (if applicable)
2. Run `pnpm dev`
3. Run `pnpm up --latest && cd apps/meally && pnpm up --latest`
4. run `pnpm build`
5. Fix any issues, bugs or errors in the build step
6. run `pnpm start` go through your change and test for every case there could be and fix any issues
