import { runner } from './runner';

describe('Runner simple cases', () => {
  test.each([
    ['1 * 32', 32],
    ['2 * 32', 64],
    ['2 + 32', 34],
    ['2 ^ 2', 4],
    ['16 ** 2', 4],
  ])('test runner for %s must be %i', (a, expected) => {
    expect(runner(a)).toEqual(expected);
  });
});

describe('Runner tripled/mixed cases', () => {
  test.each([
    ['2 * 2 * 3', 12],
    ['2 * 2 + 3', 7],
    ['2 + 2 * 3', 8],
  ])('test runner for %s must be %i', (a, expected) => {
    expect(runner(a)).toEqual(expected);
  });
});

describe('Runner long cases', () => {
  test.each([
    ['20 + 1 * 10 - 5 * 3', 15],
    ['20 - 10 * 10 / 5 - 3', -3],
  ])('test runner for %s must be %i', (a, expected) => {
    expect(runner(a)).toEqual(expected);
  });
});
