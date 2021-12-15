import reducer, { loginWithEmailAndPassword } from './authSlice';
import { nanoid } from '@reduxjs/toolkit';
import { doSignInWithEmailAndPassword } from '../api/auth';
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
describe('exampleSlice', () => {
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
