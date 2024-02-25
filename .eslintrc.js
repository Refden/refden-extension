module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    browser: true,
    chrome: true,
    global: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:jest/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
  },
};
