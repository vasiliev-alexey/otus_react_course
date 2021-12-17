import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  doSignInWithEmailAndPassword,
  signInWithGithub,
  signInWithGoogle,
  User,
} from '../api/auth';

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

export const loginWithGoogleAuth = createAsyncThunk<User>(
  'auth/google',

  async (_, thunkApi) => {
    try {
      const data = await signInWithGoogle();
      return data;
    } catch (e) {
      return thunkApi.rejectWithValue({ errorMessage: e.message });
    }
  }
);

export const loginWithGitHubAuth = createAsyncThunk<User>(
  'auth/github',

  async (_, thunkApi) => {
    try {
      const data = await signInWithGithub();
      return data;
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

    builder.addCase(loginWithGoogleAuth.pending, (state) => {
      state.isAuth = false;
    });
    builder.addCase(loginWithGoogleAuth.fulfilled, (state, action) => {
      state.isAuth = true;
      state.userName = action.payload.displayName;
      state.uid = action.payload.uid;
      state.userPict = action.payload.photoUrl;
    });

    builder.addCase(loginWithGoogleAuth.rejected, (state, action) => {
      state.isAuth = false;
      state.errorMessage = (action.payload as userCred).errorMessage;
    });

    builder.addCase(loginWithGitHubAuth.pending, (state) => {
      state.isAuth = false;
    });
    builder.addCase(loginWithGitHubAuth.fulfilled, (state, action) => {
      state.isAuth = true;
      state.userName = action.payload.displayName;
      state.uid = action.payload.uid;
      state.userPict = action.payload.photoUrl;
    });

    builder.addCase(loginWithGitHubAuth.rejected, (state, action) => {
      state.isAuth = false;
      state.errorMessage = (action.payload as userCred).errorMessage;
    });
  },
});

const { reducer } = authSlice;

export default reducer;
