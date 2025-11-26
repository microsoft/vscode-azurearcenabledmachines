import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    eslintConfigPrettier,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            "@typescript-eslint/explicit-function-return-type": "error",
            "@typescript-eslint/no-floating-promises": [
                "error",
                {
                    ignoreVoid: true,
                },
            ],
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    destructuredArrayIgnorePattern: "^_",
                },
            ],
            "@typescript-eslint/prefer-nullish-coalescing": [
                "error",
                {
                    ignoreConditionalTests: true,
                    ignoreMixedLogicalExpressions: true,
                },
            ],
        },
    },
);
