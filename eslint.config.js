const js = require('@eslint/js');
const jest = require('eslint-plugin-jest');
const globals = require('globals');

module.exports = [
  { ignores: ['**/dist/'] },
  js.configs.recommended,
  jest.configs['flat/recommended'],
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.jest,
        // webextension APIs, plus the global object the specs stub
        browser: 'readonly',
        chrome: 'readonly',
        global: 'writable',
      },
    },
    rules: {
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
    },
  },
  {
    // the only CommonJS file: jest's setupFiles hook
    files: ['app/libs/tests/**'],
    languageOptions: { globals: { ...globals.node } },
  },
];
