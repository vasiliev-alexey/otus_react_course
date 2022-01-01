import { all, AllEffect } from 'redux-saga/effects';
import {
  leaderBoardFetchRequestedWatcherSaga,
  setUserScoreWatcherSaga,
} from './leaderBoardSaga';

export default function* rootSaga(): Generator<AllEffect<unknown>> {
  yield all([
    leaderBoardFetchRequestedWatcherSaga(),
    setUserScoreWatcherSaga(),
  ]);
}
