import js from "@eslint/js";

export const eslintRules = {
  ...js.configs.recommended.rules,
  "no-unused-vars": "off",
  "arrow-body-style": "off",
};
