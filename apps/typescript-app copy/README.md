# TypeScript Template App 🚀

This is a template app for developing and deploying TypeScript applications with ease and confidence.

| Statements                                                                            | Branches                                                                             | Functions                                                                              | Lines                                                                       |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| ![Statements](https://img.shields.io/badge/statements-88.09%25-yellow.svg?style=flat) | ![Branches](https://img.shields.io/badge/branches-100%25-brightgreen.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-88.09%25-yellow.svg?style=flat) |

## Getting Started 🎬

- Clone the repository:

```bash
git clone https://github.com/Green2Moon/typescript-app.git
```

- Install dependencies:

```bash
cd typescript-app

corepack enable
pnpm install
```

## Prerequisites 🔧

### Before running the app, make sure you have the following:

- Node.js installed on your system.

- [pnpm](https://pnpm.io/installation) installed on your system.

## Start the app ▶️ 🟢 

### To run your app in production mode, use the following command:

```bash
pnpm start
```

A `.env` file is required to run the app in production mode. This file will not be exposed on GitHub.

## Development 💻

### Run your app in development mode, use the following command:

```bash
pnpm dev
```

Notice that it will load environment variables from the [.env.dev](./.env.dev) file.

This command will start your app with tsx, which will monitor for changes and automatically restart the app.

## Testing 🧪

The project includes a [.env.test](./.env.test) file, which contains environment variables for running unit tests locally. This file does not include any secrets.

Vitest is the testing library used and is configured in the [.vitest.config.ts](./vitest.config.ts) file.
To run your tests, you need to have the following environment files in the root directory of your project:

- `.env.test` for running unit tests. This file should contain the necessary variables for your app, such as the database connection string.

- `.env` for running integration tests. This file should contain the necessary variables for your app, such as the database connection string and integration secrets.

To understand how environment variables are loaded in the tests, check the [load-env](./test/load-env) file and where it is called in [.vitest.config.ts](./vitest.config.ts).

- To run tests in parallel:

  - Typically, for parallel runs, you wouldn't want tests from different files to use the same database.
  - To avoid this, make sure to connect to a different database in each file inside a `beforeAll` hook.

### Run unit tests:

```bash
pnpm test
```

### Run all tests (requires `.env` file):

```bash
pnpm test-all
```

### Run only integration tests (requires `.env` file), use:

```bash
pnpm test:integration
```

## To Check different aspects of your code, such as audit, type, lint, secrets and style, use:

```bash
pnpm check-ci
```

### Lint and format your code, use:

```bash
pnpm lint
```

## Changeset 📝

The template comes with changeset, which is a tool for managing changelogs and releases.

To add a new change, use the following command:

```bash
pnpm add-change
```

This will create a changeset for your release with a summary of your changes.

To release a new version, use the following command:

changeset configuration is set in [.changeset](./.changeset) folder.

## Deployment 🚢

### To deploy your app, follow these steps:

- Commit your changes and run:

```bash
pnpm add-change
```

This will create a changeset for your release with a summary of your changes.

- Push the branch and create a pull request. Assign peers to review the pull request.

- After the pull request is approved and merged to the main branch, Another pull request called `Version Packages` will be created to update the version of the project.

- When the `Version Packages` pull request is approved and merged, the `ci` pipeline will run with the new tag and push the image to the docker registry.

## GitHub Actions ⚙️

- You can check it out in [.github/workflows](./.github/workflows/)

### To use the GitHub actions in your app, follow these steps:

- Go to your github repository settings:

![Alt text](./docs/assets/github/settings.png?raw=true)

- Then go to Actions under Security:

![Alt text](./docs/assets/github/secrets-and-variables.png?raw=true)

- Make sure to add all your secrets and vars.

#### Required Secrets 🔑:

##### Add Personal Access Token (Advanced) 🔑

- Certain workflows require a personal access token (PAT) to fully function.

- To do this, you need to add your personal access token to your repository secrets as `MY_PAT`.

### Additional Modifications 🔧:

- Make sure to modify the env in the action files inside [.github/workflows](./.github/workflows/) to match your app.

- Make sure that the node version is up to date.

### Available GitHub actions in your app:

- `test`: Run static and unit tests on the code. This action runs on every pull request.

- `release`: Create a tag for the new version and update the CHANGELOG.md file. This action runs on every push to the main branch.

- `dependabot-merge`: Merge any pull requests from dependabot that have passed the tests. This action runs on every push to the main branch.

- `ci`: Run all tests and create a coverage badge. Create an image of the app and push it to docker. This action runs on every push to the main branch.

## Dependabot 🤖

Dependabot generates a pull request for any new dependency updates. For patch updates or devDependency updates, the Dependabot Review workflow will automatically run tests and merge the pull request if it passes. If you want to include these changes in your next release’s CHANGELOG.md, you need to add your `MY_PAT` secret as mentioned above.

## Docker 🐳

- The template comes with a Dockerfile which creates an image of the app.

- It also comes with a docker-compose file which includes the app and mongo services.

- Make sure to modify the docker-compose file to match your app env variables.

## Bin 🗑️

The [bin](./bin/) folder contains scripts that are used in the package.json and the actions files.

## Contributors 👥

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/DavidBK"><img src="https://avatars.githubusercontent.com/u/59542304?v=4?s=100" width="100px;" alt="david ben-kalifa"/><br /><sub><b>david ben-kalifa</b></sub></a><br /><a href="https://github.com/Green2Moon/typescript-app/commits?author=DavidBK" title="Code">💻</a> <a href="#maintenance-DavidBK" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/moderj"><img src="https://avatars.githubusercontent.com/u/118797659?v=4?s=100" width="100px;" alt="moderj"/><br /><sub><b>moderj</b></sub></a><br /><a href="https://github.com/Green2Moon/typescript-app/commits?author=moderj" title="Code">💻</a> <a href="#maintenance-moderj" title="Maintenance">🚧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

#### To Add a new contributor:

- Make sure to install the the [all-contributors](https://allcontributors.org) bot to your repository.

- Follow the documentation to add a new contributor.

- If you do not wish to use this bot, you can remove the [.all-contributorsrc](./.all-contributorsrc) file.
