import { all, AllEffect } from 'redux-saga/effects';
import {
  leaderBoardFetchRequestedWatcherSaga,
  setUserScoreWatcherSaga,
} from '@store/sagas/leaderBoardSaga';
import { authSagas } from '@store/sagas/authSagas';

export default function* rootSaga(): Generator<AllEffect<unknown>> {
  yield all([
    leaderBoardFetchRequestedWatcherSaga(),
    setUserScoreWatcherSaga(),

    ...authSagas,
  ]);
}
