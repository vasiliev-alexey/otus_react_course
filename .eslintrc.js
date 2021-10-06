module.exports = {
  env: {
    es2021: true,
    'jest/globals': true,
  },
  parser: '@typescript-eslint/parser',
  //  plugins: ["@typescript-eslint", "jest", "eslint-plugin-import"],
  plugins: [
    '@typescript-eslint',
    'react',
    'eslint-plugin-import',
    'prettier',
    'jest',
  ],

  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'latest',
    },
  },

  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
      },
    ],
    'react/prop-types': 'off',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],

    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'off',
      { devDependencies: ['**/*.test.js'] },
    ],
    'import/no-unresolved': 'off', // https://github.com/typescript-eslint/typescript-eslint/issues/1624
    'import/extensions': ['warn', 'never', { json: 'off' }], // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
  },
};
