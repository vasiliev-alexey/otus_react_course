import {
  reducer,
  loginWithEmailAndPassword,
  loginWithGitHubAuth,
  loginWithGoogleAuth,
} from './authSlice';
import { nanoid } from '@reduxjs/toolkit';
import {
  doSignInWithEmailAndPassword,
  signInWithGithub,
  signInWithGoogle,
} from '@api/auth';
import { store } from './store';

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

describe('auth reducer tests', () => {
  const initialState = { isAuth: true };

  it('test if auth service is pending', () => {
    const action = { type: loginWithEmailAndPassword.pending.type };
    const state = reducer(initialState, action);
    expect(state.isAuth).toBeFalsy();
  });

  it('test if auth service is resolved', () => {
    const uid = nanoid(10);
    const userName = nanoid(10);

    const action = {
      type: loginWithEmailAndPassword.fulfilled.type,
      payload: { uid, userName },
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({ uid, isAuth: true, userName });
  });

  it('test if authService rejected', () => {
    const action = {
      type: loginWithEmailAndPassword.rejected.type,
      error: { errorMessage: 'some error' },
      payload: { error: 'some error' },
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({ isAuth: false });
  });
});

jest.mock('../api/auth');
describe('test for rejected thunk doSignInWithEmailAndPasswordMock', () => {
  it('reject thunk if auth service is error', async () => {
    const doSignInWithEmailAndPasswordMock =
      doSignInWithEmailAndPassword as jest.MockedFunction<
        typeof doSignInWithEmailAndPassword
      >;
    doSignInWithEmailAndPasswordMock.mockClear();
    doSignInWithEmailAndPasswordMock.mockImplementation(() => {
      throw new Error('some exception');
    });

    store.dispatch(loginWithEmailAndPassword({ username: 'a', password: 'a' }));
    await sleep(0);

    expect(doSignInWithEmailAndPasswordMock).toBeCalledTimes(1);
    expect(store.getState().auth).toEqual({
      errorMessage: 'some exception',
      isAuth: false,
    });
  });
});

describe('test login with googleAuth - Error', () => {
  it('resolve thunk if auth service is Error', async () => {
    const signInWithGoogleMock = signInWithGoogle as jest.MockedFunction<
      typeof signInWithGoogle
    >;
    signInWithGoogleMock.mockImplementation(() => {
      throw new Error('some exception');
    });

    store.dispatch(loginWithGoogleAuth());
    await sleep(0);
    expect(signInWithGoogle).toBeCalledTimes(1);
    expect(store.getState().auth).toEqual({
      errorMessage: 'some exception',
      isAuth: false,
    });
  });
});

describe('test login with GitHubAuth - Error', () => {
  it('reject GitHubAuth thunk if auth service is Error', async () => {
    const signInWithGithubMock = signInWithGithub as jest.MockedFunction<
      typeof signInWithGithub
    >;
    signInWithGithubMock.mockImplementation(() => {
      throw new Error('some exception');
    });

    store.dispatch(loginWithGitHubAuth());
    await sleep(0);
    expect(signInWithGithub).toBeCalledTimes(1);
    expect(store.getState().auth).toEqual({
      errorMessage: 'some exception',
      isAuth: false,
    });
  });
});
