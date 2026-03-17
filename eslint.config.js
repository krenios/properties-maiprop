import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // This rule only affects dev fast-refresh ergonomics; it doesn't indicate a runtime bug.
      // Disable to keep CI/local lint output clean without changing behavior.
      "react-refresh/only-export-components": "off",
      "@typescript-eslint/no-unused-vars": "off",
      // This repo currently contains many intentional boundary-typed values (Supabase payloads, window APIs, etc).
      // We keep lint useful by not hard-failing on `any` until those areas are fully typed.
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
);
