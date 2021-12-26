import reducer, { saveUserResultFb } from './leaderBoardSlice';

import { Gamer, getTopGamerList, saveUserResult } from '../api/db';
import { getLeaderBoardData } from './leaderBoardSlice';
import { store } from './store';

import { nanoid } from '@reduxjs/toolkit';
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

jest.mock('../api/db');

describe('auth leader board reducer tests - get Data', () => {
  const initialState = { leaderList: [] as Gamer[], isLoading: true };

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
describe('auth leader board reducer tests - save Data', () => {
  const initialState = { leaderList: [] as Gamer[], isLoading: true };

  it('getLeaderBoardData is a function', () => {
    expect(saveUserResultFb).toBeInstanceOf(Function);
  });

  it('test  getLeaderBoardData is pending', () => {
    const action = { type: saveUserResultFb.pending.type };
    const state = reducer(initialState, action);
    expect(state.leaderList).toHaveLength(0);
  });

  it('test   saveUserResultFb is resolved', async () => {
    const rndId = nanoid(10);

    const saveUserResultMock = saveUserResult as jest.MockedFunction<
      typeof saveUserResult
    >;
    saveUserResultMock.mockClear();
    saveUserResultMock.mockResolvedValue(true);

    store.dispatch(
      saveUserResultFb({
        uid: rndId,
        pictUrl: '',
        topScore: 100,
        userName: 'Jon Daw',
      })
    );

    await sleep(0);
    expect(saveUserResultMock).nthCalledWith(1, {
      uid: rndId,
      pictUrl: '',
      topScore: 100,
      userName: 'Jon Daw',
    });
  });
});
