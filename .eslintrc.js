module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react'],
  env: { browser: true, node: true },
  rules: {
    // React/TS basics
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',

    // Don't let ESLint try to sort or delete imports (Prettier handles that)
    // If you use eslint-plugin-import or similar elsewhere, disable its ordering rules:
    // 'import/order': 'off',

    // Let TS rule handle unused vars; Prettier removes unused *imports* already
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_', // allow `_var` as intentionally unused
        argsIgnorePattern: '^_', // allow `_arg`
      },
    ],

    // Your stricter TS rules
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
  },
  settings: {
    react: { version: 'detect' },
  },
};
