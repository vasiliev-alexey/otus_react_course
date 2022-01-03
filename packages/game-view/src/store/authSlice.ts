import {
  CaseReducer,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  doSignInWithEmailAndPassword,
  doSignOut,
  registerUser,
  signInWithGithub,
  signInWithGoogle,
  User,
} from '@api/auth';
import { Gamer } from '@api/db';

interface userCred {
  uid: string;
  userName: string;
  errorMessage?: string;
}

export interface AuthStateType {
  uid?: string;
  userName?: string;
  userPict?: string;
  errorMessage?: string;
  isAuth: boolean;
}

const initialState = {
  isAuth: false,
} as Readonly<AuthStateType>;

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
        userName: data.user.email,
        isAuth: true,
      };
    } catch (e) {
      return thunkApi.rejectWithValue({ errorMessage: e.message });
    }
  }
);
export const doRegisterUser = createAsyncThunk<
  userCred,
  { username: string; password: string }
>(
  'auth/register',

  async ({ username, password }, thunkApi) => {
    try {
      const data = await registerUser(username, password);
      return {
        uid: data.user.uid,
        userName: data.user.email,
        isAuth: true,
      };
    } catch (e) {
      return thunkApi.rejectWithValue({ errorMessage: e.message });
    }
  }
);
export const doLogOut = createAsyncThunk<userCred>(
  'auth/logout',

  async (_, thunkApi) => {
    try {
      await doSignOut();
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

const setUserName: CaseReducer<AuthStateType, PayloadAction<Gamer>> = (
  state,
  action
) => {
  state.userName = action.payload.userName;
  state.uid = action.payload.uid;
  state.userPict = action.payload.pictUrl;
  state.isAuth = true;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserName,
  },
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

    builder.addCase(doLogOut.fulfilled, (state) => {
      state.isAuth = false;
      state.userName = null;
      state.uid = null;
      state.userPict = null;
    });

    builder.addCase(doLogOut.rejected, (state, action) => {
      state.isAuth = false;
      state.errorMessage = (action.payload as userCred).errorMessage;
    });
  },
});

export const { reducer, actions } = authSlice;
