import {
  all,
  put,
  call,
  takeLeading,
  CallEffect,
  PutEffect,
  ForkEffect,
  AllEffect,
} from 'redux-saga/effects';
import { actions, fetchData } from '../leaderBoardSlice';
import { getTopGamerList } from '../../api/db';

export function* fetchUserPosts(): Generator<
  | CallEffect<Awaited<ReturnType<typeof getTopGamerList>>>
  | PutEffect<ReturnType<typeof actions.getData>>
> {
  try {
    const userPosts = (yield call(getTopGamerList, 10)) as Awaited<
      ReturnType<typeof getTopGamerList>
    >;
    yield put(actions.getData(userPosts));
  } catch (e) {
    // yield put({
    //   type: USER_POSTS_FETCH_FAILED,
    //   payload: { message: e.message },
    // });
  }
}

export function* userPostsFetchRequestedWatcherSaga(): Generator<ForkEffect> {
  yield takeLeading(fetchData.type, fetchUserPosts);
}

export default function* rootSaga(): Generator<AllEffect<unknown>> {
  yield all([userPostsFetchRequestedWatcherSaga()]);
}
