import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import leaderBoardReducer from './leaderBoardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    leaderBoard: leaderBoardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
