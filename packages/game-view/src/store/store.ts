import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { reducer as authReducer } from './authSlice';
import { GameReducer } from './gameSlice';
import { LeaderBoardReducer } from './leaderBoardSlice';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middleware = getDefaultMiddleware().concat(sagaMiddleware);

export const AppReducer = combineReducers({
  auth: authReducer,
  leaderBoard: LeaderBoardReducer,
  game: GameReducer,
});

export const store = configureStore({
  reducer: AppReducer,
  middleware,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
