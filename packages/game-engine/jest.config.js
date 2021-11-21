/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  projects: [
    {
      displayName: 'game-engine',
      clearMocks: true,
      resetMocks: true,
      testEnvironment: 'node',
      coverageThreshold: {
        global: {
          branches: 60,
          functions: 60,
          lines: 60,
          statements: 60,
        },
      },

      testMatch: ['**/*.test.ts'],
      globals: {
        'ts-jest': {
          diagnostics: false,
        },
      },
      preset: 'ts-jest',
      transform: {
        '^.+\\.ts?$': 'ts-jest',
      },
      moduleFileExtensions: ['ts', 'js', 'node'],
    },
  ],
};
