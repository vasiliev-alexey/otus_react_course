/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  projects: [
    {
      displayName: 'dom',
      clearMocks: true,
      resetMocks: true,
      testEnvironment: 'jsdom',
      setupFiles: ['dotenv/config'],
      coverageThreshold: {
        global: {
          branches: 60,
          functions: 60,
          lines: 60,
          statements: 60,
        },
      },
      //  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
      testMatch: ['**/*.test.ts?(x)'],
      globals: {
        'ts-jest': {
          diagnostics: false,
        },
      },
      preset: 'ts-jest',
      transform: {
        '^.+\\.tsx?$': 'ts-jest',

        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|md|mp3|svg)$':
          'jest-transform-stub',
      },
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    },
  ],
};
