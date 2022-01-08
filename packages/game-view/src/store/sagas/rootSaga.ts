import { authSagas } from '@store/sagas/authSagas';
import { gameSagas } from '@store/sagas/gameSagas';
import {
  leaderBoardFetchRequestedWatcherSaga,
  setUserScoreWatcherSaga,
} from '@store/sagas/leaderBoardSaga';
import { all, AllEffect } from 'redux-saga/effects';

export default function* rootSaga(): Generator<AllEffect<unknown>> {
  yield all([
    leaderBoardFetchRequestedWatcherSaga(),
    setUserScoreWatcherSaga(),
    ...authSagas,
    ...gameSagas,
  ]);
}
