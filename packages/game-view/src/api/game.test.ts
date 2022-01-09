import { moveDown, moveLeft, moveRight, reset, rotate } from './game';

describe('test auth', () => {
  test('test auth declare functions', () => {
    expect(moveLeft).toBeInstanceOf(Function);
    expect(moveRight).toBeInstanceOf(Function);
    expect(moveDown).toBeInstanceOf(Function);
    expect(rotate).toBeInstanceOf(Function);
    expect(reset).toBeInstanceOf(Function);
  });

  test('test click reset', () => {
    const state = reset();
    expect(state.isGameOver).toBeFalsy();
    expect(state.isPause).toBeUndefined();
    expect(state.playfield).toHaveLength(20);
  });

  test.each([
    [reset.name, reset],
    [moveLeft.name, moveLeft],
    [moveRight.name, moveRight],
    [moveDown.name, moveDown],
    [rotate.name, rotate],
  ])('test click   for %s', (funcName: string, func) => {
    const state = func();
    expect(state.isGameOver).toBeFalsy();
    expect(state.isPause).toBeUndefined();
    expect(state.playfield).toHaveLength(20);
  });
});
