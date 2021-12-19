import reducer from './leaderBoardSlice';

import { Gamer, getTopGamerList } from '../api/db';
import { getLeaderBoardData } from './leaderBoardSlice';
import { store } from './store';

import { nanoid } from '@reduxjs/toolkit';
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

jest.mock('../api/db');

describe('auth leader board reducer tests', () => {
  const initialState = { leaderList: [] as Gamer[] };

  it('getLeaderBoardData is a function', () => {
    expect(getLeaderBoardData).toBeInstanceOf(Function);
  });

  it('test  getLeaderBoardData is pending', () => {
    const action = { type: getLeaderBoardData.pending.type };
    const state = reducer(initialState, action);
    expect(state.leaderList).toHaveLength(0);
  });

  it('test   getLeaderBoardData is resolved', async () => {
    const rndId = nanoid(10);

    const getTopGamerListMock = getTopGamerList as jest.MockedFunction<
      typeof getTopGamerList
    >;
    getTopGamerListMock.mockClear();
    getTopGamerListMock.mockResolvedValue([
      { uid: rndId, pictUrl: '', topScore: 100, userName: 'Jon Daw' },
      { uid: nanoid(10), pictUrl: '', topScore: 10, userName: 'Jon Snow' },
    ]);

    store.dispatch(getLeaderBoardData());
    expect(getTopGamerList).toBeCalledTimes(1);
    await sleep(0);

    const state = store.getState();
    expect(state.leaderBoard.leaderList).toHaveLength(2);
    expect(state.leaderBoard.leaderList[0].uid).toEqual(rndId);
  });
});
