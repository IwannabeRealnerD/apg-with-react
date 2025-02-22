# Linting and Formatting Setup Guide

- This document contains information related to the linting and formatting of the project, including the reasons for selecting libraries, configuration methods, and more.

## 0. No Abstract Dark Magic

- Starting with ESLint 9, the tool has become significantly more intuitive and user-friendly, thanks to eslint.config.js.
- However, the ESLint ecosystem includes recommended configurations from plugins and shared-configs (e.g., eslint-config-\*), making it challenging for developers to fully understand the setup. This has both advantages and disadvantages.

### Advantages

- Users unfamiliar with ESLint can use it without requiring a deep understanding or complex configurations.

### Disadvantages

- Tracking the specific rules applied in a project can be challenging.
- Users may struggle to understand why ESLint behaves a certain way, making it feel like “dark magic.”

### shared configs are "dark magic"

- Using recommended configurations from plugins or shared-configs makes it difficult to understand how and why specific rules are applied.
- For this reason, nextjs-starter-kit avoids using preset configurations and instead applies only the rules presets defined by plugins.(e.g. `eslint-plugin-import`'s recommended rules) This approach provides users with better control and a clearer understanding of the applied rules.

## 1. ESLint 9 with eslint.config.js

- `nextjs-starter-kit` uses ESLint 9 for linting, which offers improved performance and greater intuitiveness compared to previous versions.
- In ESLint 9, eslint.config.js is the sole configuration file. For more details on the new configuration system, refer to the [official blog post - ESLint New Config System](https://eslint.org/blog/2022/08/new-config-system-part-2/).

### 1-1. separated rules

- Due to the large number of ESLint rules in nextjs-starter-kit, they are divided into multiple files—such as typescript.js, import.js, react.js, next.js, and others—to improve readability and maintainability.

```js
// eslint.config.js
rules: {
      // ...omitted
      ...typescriptRules,
      ...importRules,
      ...reactRules,
      ...nextRules,
      ...eslintRules,
      ...eslintConfigPrettier.rules,
    },
  },
  // ...omitted
];

export default eslintConfig;
```

### 1-2. separated configs

- In eslint.config.js, the overrides property has been removed, and the new structure provides a more intuitive way to set different rules for different files. nextjs-starter-kit adopts this approach, but the configuration can become lengthy and difficult to manage.
- To avoid this, nextjs-starter-kit separates configurations into multiple files and applies them within eslint.config.js.

```js
// eslint.config.js
    // ...omitted
    rules: {
      // ...omitted
    },
  },
  ...boundaryConfigs,
  ...namingConventionConfigs,
  ...exportConfigs,
];

export default eslintConfig;
```

## 2. ESLint scripts in package.json

### 2-1. lint command

- The `lint` command is used for linting in the codespace with the IS_COMMIT_CHECK=true environment variable.
- The `IS_COMMIT_CHECK` environment variable determines whether certain rules are included or excluded in eslint.config.js.
- When IS_COMMIT_CHECK is set to true, the @typescript-eslint/no-unused-vars and no-console rules are enforced, while Prettier rules are ignored for performance reasons.

### 2-2. lint:analyze command

- The `lint:analyze` command is used to analyze linting performance. Developers can use it to identify rules that cause performance issues.

## 3. eslint and prettier

- To fix lint errors using the pnpm lint --fix command (or the format function in VS Code) while applying Prettier formatting simultaneously, Prettier itself is not included as a standalone dependency. Instead, eslint-plugin-prettier is used to handle code style issues along with fixable lint errors.

```bash
pnpm add -D eslint-config-prettier eslint-plugin-prettier
```

### 3-1. eslint-plugin-prettier

- Users can configure Prettier rules in the eslint.config.js file using the following settings.

```js
// eslint.config.js
{
  plugins: {
    prettier: eslintPluginPrettier,
  },
  rules: {
    ...(process.env.IS_COMMIT_CHECK ? {} : { "prettier/prettier": "error" }),
```

- To avoid confusion between Prettier and eslint-plugin-prettier, a .prettierrc file is still used. Prettier settings can be configured within this file.
- Using Prettier within ESLint can be slow and is generally not recommended for large projects. For more details, refer to the [typescript-eslint official document about performance](https://typescript-eslint.io/troubleshooting/typed-linting/performance#eslint-plugin-prettier)
- Nevertheless, nextjs-starter-kit uses Prettier within ESLint for consistency and convenience, enabling automatic formatting when running ESLint fixes.

- Performance issues with Prettier in ESLint are not significant when formatting a single file, such as in an IDE using “format on save” or the format function. However, they become problematic when processing multiple files, particularly in CI/CD environments. To mitigate this, Prettier rules are removed when running ESLint in CI or from the command line, ensuring better performance without compromising consistency and convenience.
- In the development environment, ESLint continues to enforce and report formatting errors based on Prettier rules. As a result, maintaining consistent code formatting in Codespaces remains highly reliable.
- With these settings, nextjs-starter-kit achieves an optimal balance of performance and consistency across both the development environment and CI/CD processes.

### 3-2. eslint-config-prettier

- `eslint-config-prettier` is included to prevent conflicts between ESLint rules and Prettier’s formatting rules.
- Since nextjs-starter-kit does not use shared configurations at the top level, the necessary rules are defined directly in the rules property of eslint.config.js.

```js
// eslint.config.js
  // ...omitted
  rules: {
    // ...omitted
    ...reactRules,
    ...nextRules,
    ...eslintRules,
    ...eslintConfigPrettier.rules,
  },
},
// ...omitted
```

### 3-3. onSave event in vscode

- In VS Code, lint fixing and formatting can be executed together using the onSave event. However, since saving also triggers a hot reload, changes are immediately applied in the browser, which may not always be desirable.
- For this reason, using the save action to handle both lint fixing and formatting is not an ideal approach.
- However, developers who are accustomed to lint fixing and formatting on save can enable this behavior using the following configuration:


```json
    // ...omitted
    "[javascript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true,
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit",
      },
    },
    // ...omitted
```

- In this case, separating ESLint and Prettier is highly recommended. Prettier was integrated into ESLint to enable both eslint --fix and formatting without relying on the save action. If this functionality is not needed, separating ESLint and Prettier is a much better approach in terms of performance.

### 3-4. prettier-plugin-sort-json

- The prettier-plugin-sort-json package is added to sort JSON files.
- While eslint-plugin-sort-keys-fix could achieve this, it requires extensive configuration, making prettier-plugin-sort-json a simpler alternative.

```bash
pnpm add -D prettier-plugin-sort-json
```

- By default, `prettier-plugin-sort-json` will sort only top-level keys. Setting `jsonRecursiveSort` to true will sort all keys at all levels.

```json
// .prettierrc.json
{
  "jsonRecursiveSort": true,
  "plugins": ["prettier-plugin-sort-json"]
}
```

- Note that this will not sort `package.json`, `package-lock.json`, or `composer.json`. This plugin only affects the JSON parser used by Prettier. Prettier uses a different parser (`json-stringify`) for these specific files.

## 4. Additional plugins

### 4-1. eslint-plugin-boundaries

- The eslint-plugin-boundaries is added to enforce project boundaries, such as preventing imports from child directories.
- To improve readability and maintainability, the configuration has been moved from .eslintrc.json to lint-rules/boundary.json.
- To enforce modular boundaries and maintain a clear separation of concerns, shared directories (e.g., src/constants, src/types) are restricted from importing items from the pages directory.

```bash
pnpm add -D eslint-plugin-boundaries
```

### 4-2. @typescript-eslint/naming-convention

- @typescript-eslint/naming-convention is added to enforce naming conventions.
- To improve readability and maintainability, the configuration has been moved from .eslintrc.json to lint-rules/naming-convention.json.
- For project-wide shared items, the naming convention requires them to start with “Global” (PascalCase or camelCase) to ensure consistency and easy identification from code base.
- No additional installation is required, as it is included in `@typescript-eslint`.

### 4-3. @cspell/eslint-plugin

- cspell will help users to catch common spelling errors in their code.

```bash
pnpm add -D @cspell/eslint-plugin
```

- In `cspell.json`, add the following configuration to customize the spell checker. For example, The word "motorrad" is added because it's a correct word for this project but cspell does not recognize it.

```json
//cspell.json
{
  "language": "en",
  "version": "0.1",
  "words": ["khanne", "montag", "motorrad"]
}
```

> **important note** After modifying `cspell.json`, restarting the ESLint server is recommended.

### 5 .vscode

- In order to use ESLint as a formatter in VS Code, The following code is added to the `.vscode/settings.json` file.

```json
//.vscode/settings.json
{
  "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    "editor.formatOnSave": true
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    "editor.formatOnSave": true
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    "editor.formatOnSave": true
  }
}
```

- .js, .ts, .tsx files will be formatted with eslint, but json files will be formatted with prettier. This is because linting json files with eslint requires more settings and slightly unreliable.

### 5-1. vscode eslint Setting

- In order to use ESLint as a formatter in VS Code, User needs to enable "ESLint > Format:Enable" in VS Code settings.
  ![alt text](<images/lint/2. vscode enable ESLint as a formatter.png>)
