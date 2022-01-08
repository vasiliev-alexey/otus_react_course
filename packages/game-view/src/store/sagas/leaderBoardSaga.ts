import { getTopGamerList, saveUserResult } from '@api/db';
import { PayloadAction } from '@reduxjs/toolkit';
import { AuthStateType } from '@store/authSlice';
import {
  fetchData,
  LeaderBoardActions,
  setUserScore,
} from '@store/leaderBoardSlice';
import { authSelector } from '@store/selectors/authSelector';
import {
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  select,
  SelectEffect,
  takeLeading,
} from 'redux-saga/effects';

export function* fetchLeaderBoardData(): Generator<
  | CallEffect<Awaited<ReturnType<typeof getTopGamerList>>>
  | PutEffect<
      ReturnType<
        | typeof LeaderBoardActions.leaderBoardData
        | typeof LeaderBoardActions.errorLeaderBoardData
      >
    >
> {
  try {
    const userPosts = (yield call(getTopGamerList, 10)) as Awaited<
      ReturnType<typeof getTopGamerList>
    >;
    yield put(LeaderBoardActions.leaderBoardData(userPosts));
  } catch (e) {
    yield put(
      LeaderBoardActions.errorLeaderBoardData({ errorMessage: e.message })
    );
  }
}

export function* setUserScoreWorker(
  action: PayloadAction<number>
): Generator<
  | CallEffect<Awaited<ReturnType<typeof saveUserResult>>>
  | PutEffect<ReturnType<typeof LeaderBoardActions.errorLeaderBoardData>>
  | SelectEffect
> {
  const { isAuth, uid, userPict, userName } = (yield select(
    authSelector
  )) as AuthStateType;

  if (isAuth) {
    try {
      yield call(saveUserResult, {
        uid,
        pictUrl: userPict || '',
        userName,
        topScore: action.payload,
      });
    } catch (e) {
      yield put(
        LeaderBoardActions.errorLeaderBoardData({ errorMessage: e.message })
      );
    }
  }
}

export function* leaderBoardFetchRequestedWatcherSaga(): Generator<ForkEffect> {
  yield takeLeading(fetchData.type, fetchLeaderBoardData);
}

export function* setUserScoreWatcherSaga(): Generator<ForkEffect> {
  yield takeLeading(setUserScore.type, setUserScoreWorker);
}
