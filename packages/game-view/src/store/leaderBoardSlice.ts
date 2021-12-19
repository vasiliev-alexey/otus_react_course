import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {} from '../api/auth';
import { Gamer, getTopGamerList, saveUserResult } from '../api/db';

export const getLeaderBoardData = createAsyncThunk<Gamer[]>(
  'score/leaderboard',
  async (_, thunkApi) => {
    try {
      const data = await getTopGamerList();
      return data;
    } catch (e) {
      return thunkApi.rejectWithValue({ errorMessage: e.message });
    }
  }
);

export const saveUserResultFb = createAsyncThunk<boolean, Gamer>(
  'score/saveUserScore',
  async (gamer, thunkApi) => {
    try {
      const data = await saveUserResult(gamer);
      return data;
    } catch (e) {
      return thunkApi.rejectWithValue({ errorMessage: e.message });
    }
  }
);

export interface LeaderList {
  leaderList: Gamer[];
  errorMessage?: string;
}

const initialState: LeaderList = {
  leaderList: [],
};

const leaderBoardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLeaderBoardData.pending, (state) => {
      state.leaderList = [];
    });
    builder.addCase(getLeaderBoardData.fulfilled, (state, action) => {
      state.leaderList = action.payload;
    });

    builder.addCase(getLeaderBoardData.rejected, (state, action) => {
      state.errorMessage = (action.payload as LeaderList).errorMessage;
    });

    builder.addCase(saveUserResultFb.rejected, (state, action) => {
      state.errorMessage = (action.payload as LeaderList).errorMessage;
    });
  },
});

const { reducer } = leaderBoardSlice;

export default reducer;
