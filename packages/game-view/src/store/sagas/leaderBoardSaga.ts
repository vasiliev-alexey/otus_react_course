import { PayloadAction } from '@reduxjs/toolkit';
import {
  CallEffect,
  PutEffect,
  call,
  put,
  ForkEffect,
  takeLeading,
} from 'redux-saga/effects';
import { Gamer, getTopGamerList, saveUserResult } from '@api/db';
import { actions, fetchData, setUserScore } from '@store/leaderBoardSlice';

export function* fetchLeaderBoardData(): Generator<
  | CallEffect<Awaited<ReturnType<typeof getTopGamerList>>>
  | PutEffect<
      ReturnType<
        typeof actions.leaderBoardData | typeof actions.errorLeaderBoardData
      >
    >
> {
  try {
    const userPosts = (yield call(getTopGamerList, 10)) as Awaited<
      ReturnType<typeof getTopGamerList>
    >;
    yield put(actions.leaderBoardData(userPosts));
  } catch (e) {
    yield put(actions.errorLeaderBoardData({ errorMessage: e.message }));
  }
}

export function* setUserScoreWorker(
  action: PayloadAction<Gamer>
): Generator<
  | CallEffect<Awaited<ReturnType<typeof saveUserResult>>>
  | PutEffect<ReturnType<typeof actions.errorLeaderBoardData>>
> {
  try {
    yield call(saveUserResult, action.payload);
  } catch (e) {
    yield put(actions.errorLeaderBoardData({ errorMessage: e.message }));
  }
}

export function* leaderBoardFetchRequestedWatcherSaga(): Generator<ForkEffect> {
  yield takeLeading(fetchData.type, fetchLeaderBoardData);
}

export function* setUserScoreWatcherSaga(): Generator<ForkEffect> {
  yield takeLeading(setUserScore.type, setUserScoreWorker);
}
