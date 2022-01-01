import {
  CaseReducer,
  createAction,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Gamer } from '../api/db';

const rootActionName = 'score/leaderboard';

export const fetchData = createAction(`${rootActionName}/fetch`);
export const setUserScore = createAction<Gamer>(
  `${rootActionName}/setUserScore`
);

export interface LeaderList {
  leaderList: Gamer[];
  errorMessage?: string;
  isLoading: boolean;
}

const initialState: LeaderList = {
  leaderList: [],
  isLoading: true,
};

const setLeaderBoardData: CaseReducer<LeaderList, PayloadAction<Gamer[]>> = (
  state,
  action
) => {
  state.leaderList = action.payload;
  state.isLoading = false;
};

const errorLeaderBoardData: CaseReducer<
  LeaderList,
  PayloadAction<{ errorMessage: string }>
> = (state, action) => {
  state.errorMessage = action.payload.errorMessage;
};

const leaderBoardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: { leaderBoardData: setLeaderBoardData, errorLeaderBoardData },
});

export const { reducer, actions } = leaderBoardSlice;

export default reducer;
