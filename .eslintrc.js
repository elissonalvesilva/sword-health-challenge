module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  parseOptions: {
    "project": "./tsconfig.json"
  },
  rules: {
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/comma-spacing": "off",
    "@typescript-eslint/return-await": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-namespace": "off",
    "import/export": "off"
  },
};
