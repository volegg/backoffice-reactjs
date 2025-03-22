import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";

export default tseslint.config({
  ignores: ["dist", "node_modules"]
}, {
  plugins: {
    react: react.configs.recommended,
  },
  extends: [
    js.configs.recommended, ...tseslint.configs.recommended,
  ],
  files: ["**/*.ts", "**/*.tsx"],
  languageOptions: {
    parserOptions: {
      project: ["tsconfig.json"],
      tsconfigRootDir: ".",
      ecmaFeatures: {
        jsx: true
      },
      extraFileExtensions: [".skip"]
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  rules: {
    "@typescript-eslint/no-shadow": [
      "error",
      {
        builtinGlobals: false,
        hoist: "functions",
        allow: []
      }
    ],
    indent: ["error", 2],
    eqeqeq: [
      "error",
      "always",
      {
        "null": "ignore"
      }
    ],
    quotes: ["error", "single"],
    "linebreak-style": ["error", "unix"],
    "no-async-promise-executor": "off",
    "@typescript-eslint/ban-ts-comment": "off"
  }
},);
