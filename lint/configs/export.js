/** @type {import("eslint").Linter.Config[]} */
export const exportConfigs = [
  {
    files: ["src/**/*.tsx", "src/**/*.ts"],
    ignores: [
      "src/app/**/page.tsx",
      "src/app/**/layout.tsx",
      "src/app/**/loading.tsx",
      "src/app/**/not-found.tsx",
      "src/app/**/error.tsx",
      "src/app/**/global-error.tsx",
      "src/app/**/route.tsx",
      "src/app/**/template.tsx",
      "src/app/**/default.tsx",
      "**/*.stories.ts",
    ],
    rules: { "import/no-default-export": "error" },
  },
];
