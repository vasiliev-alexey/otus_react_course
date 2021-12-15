import { loginWithEmailAndPassword } from './authSlice';
import { nanoid } from '@reduxjs/toolkit';
import { doSignInWithEmailAndPassword } from '../api/auth';
import firebase from 'firebase';
import { store } from './store';

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

jest.mock('../api/auth');
describe('exampleSlice', () => {
  it('resolve thunk if auth service is success', async () => {
    const rndUser = {
      uid: nanoid(11),
      displayName: 'aa', // nanoid(20),
    };
    const doSignInWithEmailAndPasswordMock =
      doSignInWithEmailAndPassword as jest.MockedFunction<
        typeof doSignInWithEmailAndPassword
      >;
    doSignInWithEmailAndPasswordMock.mockResolvedValue({
      user: rndUser,
    } as firebase.auth.UserCredential);

    store.dispatch(loginWithEmailAndPassword({ username: 'a', password: 'a' }));
    await sleep(0);

    expect(doSignInWithEmailAndPasswordMock).toBeCalledTimes(1);

    expect(store.getState().auth).toEqual({
      uid: rndUser.uid,
      userName: rndUser.displayName,
      isAuth: true,
    });
  });
});
