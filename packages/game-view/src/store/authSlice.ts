import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { doSignInWithEmailAndPassword } from '../api/auth';

interface userCred {
  uid: string;
  userName: string;
  errorMessage?: string;
}

export interface initStateType {
  uid?: string;
  userName?: string;
  userPict?: string;
  errorMessage?: string;
  isAuth: boolean;
}

const initialState = {
  isAuth: false,
} as Readonly<initStateType>;

export const loginWithEmailAndPassword = createAsyncThunk<
  userCred,
  { username: string; password: string }
>(
  'auth/login',

  async ({ username, password }, thunkApi) => {
    try {
      const data = await doSignInWithEmailAndPassword(username, password);

      return {
        uid: data.user.uid,
        userName: data.user.displayName,
        isAuth: true,
      };
    } catch (e) {
      return thunkApi.rejectWithValue({ errorMessage: e.message });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginWithEmailAndPassword.pending, (state) => {
      state.isAuth = false;
    });
    builder.addCase(loginWithEmailAndPassword.fulfilled, (state, action) => {
      state.isAuth = true;
      state.userName = action.payload.userName;
      state.uid = action.payload.uid;
    });

    builder.addCase(loginWithEmailAndPassword.rejected, (state, action) => {
      state.isAuth = false;
      state.errorMessage = (action.payload as userCred).errorMessage;
    });
  },
});

const { reducer } = authSlice;

export default reducer;
