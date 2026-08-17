import eslintPluginPlaywright from 'eslint-plugin-playwright';
import tsEslintParser from '@typescript-eslint/parser';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.ts'],
    ignores: ['node_modules/**', 'playwright-report/**', 'allure-report/**', 'allure-results/**', 'azure-report/**'],
    plugins: {
      playwright: eslintPluginPlaywright,
      '@typescript-eslint': tsEslintPlugin,
    },
    languageOptions: {
      parser: tsEslintParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...tsEslintPlugin.configs.recommended.rules,
      ...eslintPluginPlaywright.configs['flat/recommended'].rules,
    },
  },
  eslintConfigPrettier,
];