import { parser } from './parser';

describe('Parser correct cases', () => {
  test.each([
    ['1 + 32', [1, '+', 32]],
    ['5 ! + 25', [5, '!', '+', 25]],
    ['11 + 3 * 22', [11, '+', 3, '*', 22]],
    ['1 + 32 - 2 + 2', [1, '+', 32, '-', 2, '+', 2]],
  ])('test parser for %s', (a, expected) => {
    expect(parser(a)).toEqual(expected);
  });
});

describe('Parser invalid cases', () => {
  test.each([['1 + + 33 - 2'], ['1 ! 33 - 2']])(
    'test parser for %s must throw TypeError',
    (a) => {
      expect(() => parser(a)).toThrow(TypeError('Unexpected string'));
    }
  );
});
