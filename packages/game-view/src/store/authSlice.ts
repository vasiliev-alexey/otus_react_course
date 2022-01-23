import {
  CaseReducer,
  createAction,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

export interface UserProfile {
  uid: string;
  userName: string;
  errorMessage?: string;
  photoUrl?: string;
}

export interface Identity {
  password: string;
  login: string;
}

export interface ErrorData {
  errorMessage: string;
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

const rootActionName = 'auth';

export const loginWithNameAndPass = createAction<Identity>(
  `${rootActionName}/loginWithNameAndPass`
);

export const logout = createAction<Identity>(`${rootActionName}/logout`);

export const registerUserWithNameAndPass = createAction<Identity>(
  `${rootActionName}/registerUserWithNameAndPass`
);
export const loginWithGitHubAuth = createAction<Identity>(
  `${rootActionName}/loginWithGitHubAuth`
);
export const loginWithGoogleAuth = createAction<Identity>(
  `${rootActionName}/google`
);

export const authRejected: CaseReducer<
  AuthStateType,
  PayloadAction<ErrorData>
> = (state, action) => {
  state.isAuth = false;
  state.errorMessage = action.payload.errorMessage;
  state.userName = null;
  state.uid = null;
  state.userPict = null;
};
export const doLogout: CaseReducer = (state) => {
  state.isAuth = false;
  state.userName = null;
  state.uid = null;
  state.userPict = null;
};

const setAuthData: CaseReducer<AuthStateType, PayloadAction<UserProfile>> = (
  state,
  action
) => {
  state.isAuth = true;
  state.userName = action.payload.userName;
  state.uid = action.payload.uid;
  state.userPict = action.payload.photoUrl;
};
const authSlice = createSlice({
  name: rootActionName,
  initialState,
  reducers: {
    setAuthData,
    authRejected,
    doLogout,
  },
});

export const { reducer, actions } = authSlice;
