import {
  GameActions,
  gameResetState,
  gameSetPause,
  gameUnsetPause,
  syncGameView,
} from '@store/gameSlice';
import { expectFn } from '@ui/utils/testUtils';

import { store } from './store';

describe('test game slice redux', () => {
  it('game slice  have  ac', () => {
    expectFn(gameSetPause);
    expectFn(gameResetState);
    expectFn(syncGameView);
    expectFn(gameUnsetPause);
  });

  it('game slice  ac - gameSetPause set pause', () => {
    expect(store.getState().game.isPause).toBeFalsy();
    store.dispatch(GameActions.gameSetPause());
    expect(store.getState().game.isPause).toBeTruthy();
  });

  it('game slice  ac - gameUnsetPause set un pause', () => {
    store.dispatch(GameActions.gameSetPause());
    expect(store.getState().game.isPause).toBeTruthy();
    store.dispatch(GameActions.gameUnsetPause());
    expect(store.getState().game.isPause).toBeFalsy();
  });
});
