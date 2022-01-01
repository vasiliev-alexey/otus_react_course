import { fetchData, setUserScore } from './leaderBoardSlice';

import { getTopGamerList, saveUserResult } from '../api/db';
import { store } from './store';

import { nanoid } from '@reduxjs/toolkit';
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

jest.mock('../api/db');

describe('leader board reducer tests', () => {
  it('getLeaderBoardData is a function', () => {
    expect(fetchData).toBeInstanceOf(Function);
  });

  it('test   getLeaderBoardData is rejected', async () => {
    const getTopGamerListMock = getTopGamerList as jest.MockedFunction<
      typeof getTopGamerList
    >;
    getTopGamerListMock.mockClear();
    getTopGamerListMock.mockImplementation(() => {
      throw new Error('some exception');
    });

    store.dispatch(fetchData());
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
      setUserScore({
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
