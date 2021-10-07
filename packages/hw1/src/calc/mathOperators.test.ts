import {
  mul,
  div,
  add,
  minus,
  square,
  power,
  factorial,
} from './mathOperators';

describe('mathOperators test cases', () => {
  it('mul 1 * 2 to equal 2', () => {
    expect(mul(1, 2)).toBe(2);
  });

  it('mul 2 * 2 to equal 4', () => {
    expect(mul(2, 2)).toBe(4);
  });

  it('div 2 / 2 to equal 1', () => {
    expect(div(2, 2)).toBe(1);
  });

  it('div 4 / 2 to equal 2', () => {
    expect(div(4, 2)).toBe(2);
  });

  it('add 4 + 2 to equal 6', () => {
    expect(add(4, 2)).toBe(6);
  });

  it('minus 4 - 2 to equal 2', () => {
    expect(minus(4, 2)).toBe(2);
  });

  it('25 squared equal 5', () => {
    expect(square(25)).toBe(5);
  });

  it('7 to the power of 2 equal 49', () => {
    expect(power(7, 2)).toBe(49);
  });

  it('factorial 5 equal 120', () => {
    expect(factorial(5)).toBe(120);
  });
});
