import { signInWithGithub, signInWithGoogle } from '@api/auth';
import { sleep } from '@ui/utils/testUtils';
import faker from 'faker';

import { loginWithGitHubAuth, loginWithGoogleAuth } from './authSlice';
import { store } from './store';

jest.mock('../api/auth');

describe('test login with googleAuth - Error', () => {
  it('resolve thunk if auth service is Error', async () => {
    const error = faker.hacker.phrase();
    const signInWithGoogleMock = signInWithGoogle as jest.MockedFunction<
      typeof signInWithGoogle
    >;
    signInWithGoogleMock.mockImplementation(() => {
      throw new Error(error);
    });

    store.dispatch(loginWithGoogleAuth());
    await sleep(0);
    expect(signInWithGoogle).toBeCalledTimes(1);
    expect(store.getState().auth).toEqual({
      errorMessage: error,
      isAuth: false,
      uid: null,
      userName: null,
      userPict: null,
    });
  });
});

describe('test login with GitHubAuth - Error', () => {
  const error = faker.hacker.phrase();
  it('reject GitHubAuth thunk if auth service is Error', async () => {
    const signInWithGithubMock = signInWithGithub as jest.MockedFunction<
      typeof signInWithGithub
    >;
    signInWithGithubMock.mockImplementation(() => {
      throw new Error(error);
    });

    store.dispatch(loginWithGitHubAuth());
    await sleep(0);
    expect(signInWithGithub).toBeCalledTimes(1);
    expect(store.getState().auth).toEqual({
      errorMessage: error,
      isAuth: false,
      uid: null,
      userName: null,
      userPict: null,
    });
  });
});
