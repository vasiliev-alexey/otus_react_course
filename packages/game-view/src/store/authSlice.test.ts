import {
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
import firebase from 'firebase';
import { store } from './store';

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

jest.mock('../api/auth');
describe('test login with email and pass - success', () => {
  it('resolve thunk if auth service is success', async () => {
    const rndUser = {
      uid: nanoid(11),
      email: 'aa', // nanoid(20),
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
      userName: rndUser.email,
      isAuth: true,
    });
  });
});

describe('test login with googleAuth - success', () => {
  it('resolve thunk if auth service is success', async () => {
    const rndUser = {
      uid: nanoid(11),
      photoUrl: nanoid(11),
      displayName: nanoid(20),
    };
    const signInWithGoogleMock = signInWithGoogle as jest.MockedFunction<
      typeof signInWithGoogle
    >;
    signInWithGoogleMock.mockResolvedValue(
      Promise.resolve({
        ...rndUser,
      })
    );

    store.dispatch(loginWithGoogleAuth());
    await sleep(0);
    expect(signInWithGoogle).toBeCalledTimes(1);
    expect(store.getState().auth).toEqual({
      uid: rndUser.uid,
      userName: rndUser.displayName,
      isAuth: true,
      userPict: rndUser.photoUrl,
    });
  });
});

describe('test login with GitHubAuth - success', () => {
  it('resolve thunk if  GitHubAuth  service is success', async () => {
    const rndUser = {
      uid: nanoid(11),
      photoUrl: nanoid(11),
      displayName: nanoid(20),
    };
    const signInWithGithubMock = signInWithGithub as jest.MockedFunction<
      typeof signInWithGithub
    >;
    signInWithGithubMock.mockResolvedValue(
      Promise.resolve({
        ...rndUser,
      })
    );

    store.dispatch(loginWithGitHubAuth());
    await sleep(0);
    expect(signInWithGithubMock).toBeCalledTimes(1);
    expect(store.getState().auth).toEqual({
      uid: rndUser.uid,
      userName: rndUser.displayName,
      isAuth: true,
      userPict: rndUser.photoUrl,
    });
  });
});
