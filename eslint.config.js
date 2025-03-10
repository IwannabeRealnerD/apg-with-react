import cspellPlugin from "@cspell/eslint-plugin";
import nextPlugin from "@next/eslint-plugin-next";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import eslintPluginPrettier from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import unicornPlugin from "eslint-plugin-unicorn";
import globals from "globals";
import tseslint from "typescript-eslint";

import { boundaryConfigs } from "./lint/configs/boundary.js";
import { exportConfigs } from "./lint/configs/export.js";
import { namingConventionConfigs } from "./lint/configs/naming-convetion.js";
import { commitRules } from "./lint/rules/commit.js";
import { eslintRules } from "./lint/rules/eslint.js";
import { importRules } from "./lint/rules/import.js";
import { nextRules } from "./lint/rules/next.js";
import { reactRules } from "./lint/rules/react.js";
import { typescriptRules } from "./lint/rules/typescript.js";

const eslintConfig = [
  { ignores: [".vercel/", ".next/"] },
  {
    languageOptions: {
      parser: tseslint.parser,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.serviceworker,
      },
    },
  },
  {
    settings: {
      "import/resolver": {
        typescript: true,
      },
      react: {
        version: "detect",
      },
    },
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    plugins: {
      import: importPlugin,
      "@typescript-eslint": tseslint.plugin,
      "@cspell": cspellPlugin,
      prettier: eslintPluginPrettier,
      "jsx-a11y": jsxA11y,
      react: reactPlugin,
      "@next/next": nextPlugin,
      "react-hooks": reactHooks,
      unicorn: unicornPlugin,
    },
    rules: {
      ...(process.env.IS_COMMIT_CHECK ? {} : { "prettier/prettier": "error" }),
      "unicorn/no-empty-file": "error",
      "@cspell/spellchecker": [
        "error",
        {
          checkComments: false,
          autoFix: true,
          configFile: new URL("./cspell.json", import.meta.url).toString(),
        },
      ],
      ...(process.env.IS_COMMIT_CHECK ? commitRules : []),
      ...typescriptRules,
      ...importRules,
      ...reactRules,
      ...nextRules,
      ...eslintRules,
      ...eslintConfigPrettier.rules,
    },
  },
  ...boundaryConfigs,
  ...namingConventionConfigs,
  ...exportConfigs,
];

export default eslintConfig;
