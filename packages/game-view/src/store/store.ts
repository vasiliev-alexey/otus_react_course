import { reducer as authReducer } from './authSlice';
import leaderBoardReducer from './leaderBoardSlice';
import rootSaga from './sagas/rootSaga';
import createSagaMiddleware from 'redux-saga';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

const sagaMiddleware = createSagaMiddleware();
const middleware = getDefaultMiddleware().concat(sagaMiddleware);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    leaderBoard: leaderBoardReducer,
  },
  middleware,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
