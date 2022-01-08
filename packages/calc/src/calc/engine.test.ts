import {
  firstPrioritiesCalc,
  secondPrioritiesCalc,
  unaryPrioritiesCalc,
} from './engine';

describe('unaryPrioritiesCalc', () => {
  it('[5 ! + 2]', () => {
    expect(unaryPrioritiesCalc([5, '!', '+', 2])).toEqual([120, '+', 2]);
  });
});

describe('firstPrioritiesCalc simple cases', () => {
  test.each([
    [[1, '*', 32], [32]],
    [[32, '/', 32], [1]],
    [
      [32, '+', 32],
      [32, '+', 32],
    ],
  ])('firstPrioritiesCalc for %s', (a, expected) => {
    expect(firstPrioritiesCalc(a)).toEqual(expected);
  });
});

describe('firstPrioritiesCalc mixed with second priorities cases', () => {
  it('[32, /, 32, +, 10, *, 10]', () => {
    expect(firstPrioritiesCalc([32, '/', 32, '+', 10, '*', 10])).toEqual([
      1,
      '+',
      100,
    ]);
  });
});

describe('secondPrioritiesCalc invalid cases', () => {
  it('[32, / 32]', () => {
    expect(() => secondPrioritiesCalc([32, '/', 32])).toThrow(
      TypeError('Unexpected stack!')
    );
  });
});

describe('secondPrioritiesCalc simple cases', () => {
  test.each([
    [[32, '+', 32], 64],
    [[32, '-', 32], 0],
    [[32, '-', 32, '+', 10], 10],
  ])('firstPrioritiesCalc for %s', (a, expected) => {
    expect(secondPrioritiesCalc(a)).toEqual(expected);
  });
});
