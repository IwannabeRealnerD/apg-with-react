# Environment

- This document contains information related to the environment(such as pnpm, Node, nvm etc.) of the project, including the reasons for selecting libraries, configuration methods, and more.

## 1. Lock PNPM Version

```json
// package.json
{
  "name": "nextjs-starter-kit",
  "version": "0.1.0",
  "private": true,

  // added line
  "engines": {
    "pnpm": "9"
  },
```

- When a user tries to execute commands in the project with another pnpm version, the command won't be executed and the following error messages will appear:

![alt text](<images/env/1.pnpm version lock.png>)

### 1-1. For Corepack Users

```bash
corepack use pnpm@latest
```

```json
  "packageManager": "pnpm@9.3.0+sha256.e1f9e8d1a16607a46dd3c158b5f7a7dc7945501d1c6222d454d63d033d1d918f"
```

- For users who activated pnpm with [corepack](https://nodejs.org/api/corepack.html), this command will make it easier to switch between projects with different pnpm versions. The designated pnpm version will be automatically activated.

## 2. Lock Node Version

```json
// package.json
{
  "name": "nextjs-starter-kit",
  "version": "0.1.0",
  "private": true,
  "engines": {
    "pnpm": "9",
    // added line
    "node": "20"
  },
```

- When a user tries to execute commands in the project with another node version, the command won't be executed and the following error messages will appear:

![alt text](<images/env/2.node version lock.png>)

## 3. nvm

- If a user uses nvm, they can manage the Node.js version easily with the `.nvmrc` file.

```bash
nvm use
```

## 4. husky, lint-staged

- Husky is a package that helps us to manage git hooks easily.
- Lint-staged is a package that allows us to run linters only on staged files, enhancing the performance of commit file linting and type checking.

```bash
pnpm add -D husky lint-staged
pnpm dlx husky-init

pnpm dlx husky-init # init husky
```

```bash
# .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm lint-staged
```

- The `lint-staged` configuration is in the `package.json` file.
- In Next.js, the default linter is next lint. However, since we are using lint-staged, we need to modify the configuration because next lint is not compatible with lint-staged. This incompatibility arises because next lint expects all files to be linted, while lint-staged only lints staged files, leading to errors as it skips linting the pages and app directories.
- When using lint-staged with TypeScript, only the staged files are processed, which results in tsconfig.json being ignored.
- Due to the limitations described above, `eslint --fix` is used instead of `next lint`. For type checking that respects `tsconfig.json`, the command `bash -c tsc --noEmit --pretty` is utilized.

```json
// package.json
{
  // ...omitted
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": ["eslint --fix", "bash -c tsc --noEmit --pretty"]
  }
  // ...omitted
}
```

### 4-1. Husky Specific Lint Rule

- Using console.log for debugging is common in programming. However, it should not be present in the final codebase as it is not part of the business logic. Excessive use of console.log can result in an overloaded console with irrelevant information during development.
- The same applies to unused variables, which can clutter the code and lead to potential confusion or errors.
- Such items should not be merged into the codebase. However, during product development, they are commonly used for debugging and are not as critical as other lint rule errors. If ESLint flags these as “errors” in the codebase, it can be challenging to identify the real issues.
- Therefore, these are marked as warnings in VSCode but as errors in Husky (githook). This setting is a matter of personal preference and can be adjusted by users accordingly.
- The code snippet below demonstrates how to mark these issues as warnings in VSCode and as errors during the commit check process.

```json
// package.json
{
  // ...omitted
  "lint-staged": {
    "**/*.{js,jsx,ts,tsx}": [
      "eslint --fix -c lint-rules/commit-rule.json", // changed line
      "bash -c tsc --noEmit --pretty"
    ]
  }
  // ...omitted
}
```

### 4-2. Deleted prepare : husky install

- The prepare script in package.json has been removed because Husky is already initialized and implemented in the project (the .gitignore file for Husky has also been deleted).
  - Please read [this comment](https://github.com/typicode/husky/issues/1016#issuecomment-901882489) for more information.

## 5. vscode settings

- The nextjs-starter-kit is highly optimized for use with Visual Studio Code (VS Code). For instance, the .vscode directory contains configuration settings tailored for monorepo management and specific extensions.

### 5-1. lint
- Since this project uses lint-fix as the formatter instead of Prettier, appropriate settings for ESLint should be configured in the settings.json file.

```json
{
  "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    "editor.formatOnSave": true
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[svg]": {
    "editor.formatOnSave": false,
    "files.insertFinalNewline": false
  },
  "[typescript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    "editor.formatOnSave": true
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    "editor.formatOnSave": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  //...omitted
```

### 5-2. monorepo
- Given that this project is a monorepo, appropriate settings must be configured in the settings.json file to support the monorepo structure.
- The .eslintrc.json file includes the `"root": true` setting, which ensures that ESLint operates correctly within a monorepo.
- Additionally, the .vscode/settings.json file should contain settings to ensure ESLint functions properly in the monorepo environment.

```json
{
  "eslint.workingDirectories": [
    {
      "mode": "auto"
    }
  ]
}
```
- The JSON above configures ESLint to automatically detect the root directory for each sub-project within the monorepo.
- The mode: "auto" setting ensures that ESLint applies the correct configuration based on the location of .eslintrc or package.json files within the directory hierarchy.

### 5-3. extensions
- The ./vscode/extensions.json file lists the extensions used in the project. While not mandatory, it is advisable to include this file.

```json
{
  "recommendations": ["exodiusstudios.comment-anchors"]
}
```

- `exodiusstudios.comment-anchors` extension for VS Code allows the creation of anchors in the code, making it easier to navigate through the editor’s sidebar.