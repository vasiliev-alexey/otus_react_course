import { authSelector, lineCountSelector } from '@store/selectors/selectors';
import { store } from '@store/store';

describe('test selectors', () => {
  test('test selectors is a Function', () => {
    expect(authSelector).toBeInstanceOf(Function);
  });

  test('test selectors return auth from state', () => {
    const state = store.getState();

    const auth = authSelector(state);

    expect(auth).toBe(state.auth);
  });
});
describe('test lineCountSelector', () => {
  test('test lineCountSelector is a Function', () => {
    expect(lineCountSelector).toBeInstanceOf(Function);
  });

  test('test selectors is a Function', () => {
    const state = store.getState();

    const auth = lineCountSelector(state);

    expect(auth).toBe(state.game.lines);
  });
});
