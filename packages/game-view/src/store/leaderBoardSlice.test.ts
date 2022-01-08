import { getTopGamerList } from '@api/db';
import { nanoid } from '@reduxjs/toolkit';

import { fetchData, setUserScore } from './leaderBoardSlice';
import { store } from './store';

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

jest.mock('../api/db');

describe('auth leader board reducer tests - get Data', () => {
  it('fetchData is a function', () => {
    expect(fetchData).toBeInstanceOf(Function);
  });

  it('test   fetchData is resolved', async () => {
    const rndId = nanoid(10);

    const getTopGamerListMock = getTopGamerList as jest.MockedFunction<
      typeof getTopGamerList
    >;
    getTopGamerListMock.mockClear();
    getTopGamerListMock.mockResolvedValue([
      { uid: rndId, pictUrl: '', topScore: 100, userName: 'Jon Daw' },
      { uid: nanoid(10), pictUrl: '', topScore: 10, userName: 'Jon Snow' },
    ]);

    store.dispatch(fetchData());
    expect(getTopGamerList).toBeCalledTimes(1);
    await sleep(0);

    const state = store.getState();
    expect(state.leaderBoard.leaderList).toHaveLength(2);
    expect(state.leaderBoard.leaderList[0].uid).toEqual(rndId);
  });
});

jest.mock('@api/auth', () => ({
  doSignInWithEmailAndPassword: jest.fn().mockResolvedValue(() => {
    user: {
    }
  }),
}));

describe('leader board reducer tests - save Data', () => {
  it('setUserScore is a function', () => {
    expect(setUserScore).toBeInstanceOf(Function);
  });
});
