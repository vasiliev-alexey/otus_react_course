import reducer, { saveUserResultFb } from './leaderBoardSlice';

import { Gamer, getTopGamerList, saveUserResult } from '../api/db';
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

  it('test   getLeaderBoardData is rejected', async () => {
    const getTopGamerListMock = getTopGamerList as jest.MockedFunction<
      typeof getTopGamerList
    >;
    getTopGamerListMock.mockClear();
    getTopGamerListMock.mockImplementation(() => {
      throw new Error('some exception');
    });

    store.dispatch(getLeaderBoardData());
    expect(getTopGamerList).toBeCalledTimes(1);
    await sleep(0);

    const state = store.getState();
    expect(state.leaderBoard.leaderList).toHaveLength(0);

    expect(state.leaderBoard.errorMessage).toEqual('some exception');
  });
  it('test   saveUserResultFb is rejected', async () => {
    const rndId = nanoid(10);

    const saveUserResultMock = saveUserResult as jest.MockedFunction<
      typeof saveUserResult
    >;
    saveUserResultMock.mockClear();
    saveUserResultMock.mockImplementation(() => {
      throw new Error('some exception');
    });

    store.dispatch(
      saveUserResultFb({
        uid: rndId,
        pictUrl: '',
        topScore: 100,
        userName: 'Jon Daw',
      })
    );
    expect(saveUserResultMock).toBeCalledTimes(1);
    await sleep(0);

    const state = store.getState();
    expect(state.leaderBoard.leaderList).toHaveLength(0);

    expect(state.leaderBoard.errorMessage).toEqual('some exception');
  });
});
