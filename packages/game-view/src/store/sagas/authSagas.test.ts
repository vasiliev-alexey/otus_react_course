import {
  doLogoutWatcherSaga,
  loginWithEmailAndPasswordWatcherSaga,
  loginWithGitHubAuthWatcherSaga,
  loginWithGitHubAuthWorker,
  loginWithGoogleAuthWatcherSaga,
  loginWithGoogleAuthWorker,
  loginWithNameAndPassword,
  logOutWorkerSaga,
  registerWithEmailAndPasswordWatcherSaga,
  RegisterWithNameAndPasswordWorker,
} from '@store/sagas/authSagas';
import {
  actions,
  loginWithGitHubAuth,
  loginWithGoogleAuth,
  logout,
  reducer,
  registerUserWithNameAndPass,
} from '@store/authSlice';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import {
  doSignInWithEmailAndPassword,
  doSignOut,
  registerUser,
  signInWithGithub,
  signInWithGoogle,
} from '@api/auth';
import { loginWithNameAndPass } from '@store/authSlice';
import faker from 'faker';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

const generateRandomUser = (): {
  uid: string;
  login: string;
  password: string;
  photoUrl: string;
} => {
  return {
    login: faker.name.firstName(),
    uid: faker.datatype.string(11),
    password: faker.datatype.string(11),
    photoUrl: faker.internet.url(),
  };
};

describe('test loginWithNameAndPassword', () => {
  test('test loginWithNameAndPassword is a Function', () => {
    expect(loginWithNameAndPassword).toBeInstanceOf(Function);
  });

  test('exact loginWithNameAndPassword order with redux-saga-test-plan', () => {
    const user = generateRandomUser();

    expect(
      testSaga(loginWithNameAndPassword, loginWithNameAndPass(user))
        .next()
        .call(doSignInWithEmailAndPassword, user.login, user.password)
        .next({
          user: {
            uid: user.uid,
            email: user.login,
          },
        })
        .put(actions.setAuthData({ uid: user.uid, userName: user.login }))
        .next()
        .isDone()
    ).toBeTruthy();
  });
});
describe('test loginWithEmailAndPasswordWatcherSaga', () => {
  test('test loginWithEmailAndPasswordWatcherSaga is a Function', () => {
    expect(loginWithEmailAndPasswordWatcherSaga).toBeInstanceOf(Function);
  });

  test('exact loginWithEmailAndPasswordWatcherSaga order with redux-saga-test-plan', async () => {
    const user = generateRandomUser();

    const dummyUser = {
      user: {
        uid: user.uid,
        email: user.login,
      },
    };

    await expectSaga(loginWithEmailAndPasswordWatcherSaga)
      .withReducer(reducer)
      .provide([
        [
          matchers.call(
            doSignInWithEmailAndPassword,
            user.login,
            user.password
          ),
          dummyUser,
        ],
      ])
      .dispatch(loginWithNameAndPass(user))
      .call(loginWithNameAndPassword, loginWithNameAndPass(user))
      .put(actions.setAuthData({ uid: user.uid, userName: user.login }))
      .hasFinalState({
        isAuth: true,
        userName: user.login,
        uid: user.uid,
        userPict: undefined,
      })
      .run({ silenceTimeout: true });
  });

  test('exact loginWithEmailAndPasswordWatcherSaga with error with redux-saga-test-plan', async () => {
    const error = faker.hacker.phrase();
    const user = generateRandomUser();

    await expectSaga(loginWithEmailAndPasswordWatcherSaga)
      .withReducer(reducer)
      .provide([
        [
          matchers.call(
            doSignInWithEmailAndPassword,
            user.login,
            user.password
          ),
          throwError(new Error(error)),
        ],
      ])
      .dispatch(loginWithNameAndPass(user))
      .call(loginWithNameAndPassword, loginWithNameAndPass(user))
      .put(actions.authRejected({ errorMessage: error }))
      .hasFinalState({
        isAuth: false,
        errorMessage: error,
        userName: null,
        uid: null,
        userPict: null,
      })
      .run({ silenceTimeout: true });
  });
});

describe('test logOutWorkerSaga', () => {
  test('test logOutWorkerSaga is a Function', () => {
    expect(doLogoutWatcherSaga).toBeInstanceOf(Function);
  });

  test('exact logOutWorkerSaga order with redux-saga-test-plan', () => {
    testSaga(logOutWorkerSaga)
      .next()
      .call(doSignOut)
      .next()
      .put(actions.doLogout())
      .next()
      .isDone();
  });
});

describe('test doLogoutWatcherSaga', () => {
  test('test doLogoutWatcherSaga is a Function', () => {
    expect(doLogoutWatcherSaga).toBeInstanceOf(Function);
  });

  test('exact doLogoutWatcherSaga order with redux-saga-test-plan', async () => {
    await expectSaga(doLogoutWatcherSaga)
      .withReducer(reducer, {
        isAuth: true,
        userName: 'user',
        uid: 'uid',
        userPict: 'null',
      })
      .provide([[matchers.call(doSignOut), Promise.resolve()]])
      .dispatch(logout())
      .call(logOutWorkerSaga, logout())
      .put(actions.doLogout())
      .hasFinalState({
        isAuth: false,
        userName: null,
        uid: null,
        userPict: null,
      })
      .silentRun();
  });

  test('exact doLogoutWatcherSaga  Error with redux-saga-test-plan', async () => {
    const error = faker.hacker.phrase();

    await expectSaga(doLogoutWatcherSaga)
      .withReducer(reducer, {
        isAuth: true,
        userName: 'user',
        uid: 'uid',
        userPict: 'null',
      })
      .provide([[matchers.call(doSignOut), throwError(new Error(error))]])
      .dispatch(logout())
      .call(logOutWorkerSaga, logout())
      .put(actions.authRejected({ errorMessage: error }))
      .hasFinalState({
        isAuth: false,
        errorMessage: error,
        userName: null,
        uid: null,
        userPict: null,
      })
      .silentRun();
  });
});

describe('test loginWithGitHubAuthWorker', () => {
  test('test logOutWorkerSaga is a Function', () => {
    expect(loginWithGitHubAuthWorker).toBeInstanceOf(Function);
  });

  test('exact loginWithGitHubAuthWorker order with redux-saga-test-plan', () => {
    const user = generateRandomUser();

    const dummyUser = {
      displayName: user.login,
      photoUrl: user.login,
      uid: user.uid,
    };

    testSaga(loginWithGitHubAuthWorker)
      .next()
      .call(signInWithGithub)
      .next(dummyUser)
      .put(
        actions.setAuthData({
          userName: user.login,
          photoUrl: user.login,
          uid: user.uid,
        })
      )
      .next()
      .isDone();
  });
});

describe('test loginWithGitHubAuthWatcherSaga', () => {
  test('test loginWithGitHubAuthWatcherSaga is a Function', () => {
    expect(loginWithGitHubAuthWatcherSaga).toBeInstanceOf(Function);
  });

  test('exact loginWithGitHubAuthWatcherSaga order with redux-saga-test-plan', async () => {
    const user = generateRandomUser();

    const dummyUser = {
      displayName: user.login,
      photoUrl: user.photoUrl,
      uid: user.uid,
    };

    await expectSaga(loginWithGitHubAuthWatcherSaga)
      .withReducer(reducer, {
        isAuth: false,
        userName: 'user',
        uid: 'uid',
        userPict: 'null',
      })
      .provide([[matchers.call(signInWithGithub), dummyUser]])
      .dispatch(loginWithGitHubAuth())
      .call(loginWithGitHubAuthWorker, loginWithGitHubAuth())
      .put(
        actions.setAuthData({
          userName: user.login,
          photoUrl: user.photoUrl,
          uid: user.uid,
        })
      )
      .hasFinalState({
        isAuth: true,
        userName: user.login,
        uid: user.uid,
        userPict: user.photoUrl,
      })
      .silentRun();
  });
  test('exact loginWithGitHubAuthWatcherSaga  Error with redux-saga-test-plan', async () => {
    const error = faker.hacker.phrase();
    await expectSaga(loginWithGitHubAuthWatcherSaga)
      .withReducer(reducer, {
        isAuth: false,
        userName: 'user',
        uid: 'uid',
        userPict: 'null',
      })
      .provide([
        [matchers.call(signInWithGithub), throwError(new Error(error))],
      ])
      .dispatch(loginWithGitHubAuth())
      .call(loginWithGitHubAuthWorker, loginWithGitHubAuth())
      .put(
        actions.authRejected({
          errorMessage: error,
        })
      )
      .hasFinalState({
        isAuth: false,
        errorMessage: error,
        userName: null,
        uid: null,
        userPict: null,
      })
      .silentRun();
  });
});

describe('test loginWithGoogleAuthWorker', () => {
  test('test loginWithGoogleAuthWorker is a Function', () => {
    expect(loginWithGoogleAuthWorker).toBeInstanceOf(Function);
  });

  test('exact loginWithGoogleAuthWorker order with redux-saga-test-plan', () => {
    const user = generateRandomUser();

    const dummyUser = {
      displayName: user.login,
      photoUrl: user.login,
      uid: user.uid,
    };

    testSaga(loginWithGoogleAuthWorker)
      .next()
      .call(signInWithGoogle)
      .next(dummyUser)
      .put(
        actions.setAuthData({
          userName: user.login,
          photoUrl: user.login,
          uid: user.uid,
        })
      )
      .next()
      .isDone();
  });
});

describe('test loginWithGoogleAuthWatcherSaga', () => {
  test('test loginWithGitHubAuthWatcherSaga is a Function', () => {
    expect(loginWithGoogleAuthWatcherSaga).toBeInstanceOf(Function);
  });

  test('exact loginWithGoogleAuthWatcherSaga order with redux-saga-test-plan', async () => {
    const user = generateRandomUser();

    const dummyUser = {
      displayName: user.login,
      photoUrl: user.photoUrl,
      uid: user.uid,
    };

    await expectSaga(loginWithGoogleAuthWatcherSaga)
      .withReducer(reducer, {
        isAuth: false,
        userName: 'user',
        uid: 'uid',
        userPict: 'null',
      })
      .provide([[matchers.call(signInWithGoogle), dummyUser]])
      .dispatch(loginWithGoogleAuth())
      .call(loginWithGoogleAuthWorker, loginWithGoogleAuth())
      .put(
        actions.setAuthData({
          userName: user.login,
          photoUrl: user.photoUrl,
          uid: user.uid,
        })
      )
      .hasFinalState({
        isAuth: true,
        userName: user.login,
        uid: user.uid,
        userPict: user.photoUrl,
      })
      .silentRun();
  });
  test('exact loginWithGoogleAuthWatcherSaga Error with redux-saga-test-plan', async () => {
    const error = faker.hacker.phrase();

    await expectSaga(loginWithGoogleAuthWatcherSaga)
      .withReducer(reducer, {
        isAuth: false,
        userName: 'user',
        uid: 'uid',
        userPict: 'null',
      })
      .provide([
        [matchers.call(signInWithGoogle), throwError(new Error(error))],
      ])
      .dispatch(loginWithGoogleAuth())
      .call(loginWithGoogleAuthWorker, loginWithGoogleAuth())
      .put(
        actions.authRejected({
          errorMessage: error,
        })
      )
      .hasFinalState({
        isAuth: false,
        errorMessage: error,
        userName: null,
        uid: null,
        userPict: null,
      })
      .silentRun();
  });
});

////
describe('test RegisterWithNameAndPasswordWorker', () => {
  test('test RegisterWithNameAndPasswordWorker is a Function', () => {
    expect(RegisterWithNameAndPasswordWorker).toBeInstanceOf(Function);
  });

  test('exact RegisterWithNameAndPasswordWorker order with redux-saga-test-plan', () => {
    const user = generateRandomUser();

    expect(
      testSaga(
        RegisterWithNameAndPasswordWorker,
        registerUserWithNameAndPass(user)
      )
        .next()
        .call(registerUser, user.login, user.password)
        .next({
          user: {
            uid: user.uid,
            email: user.login,
          },
        })
        .put(actions.setAuthData({ uid: user.uid, userName: user.login }))
        .next()
        .isDone()
    ).toBeTruthy();
  });
});
describe('test registerWithEmailAndPasswordWatcherSaga', () => {
  test('test registerWithEmailAndPasswordWatcherSaga is a Function', () => {
    expect(registerWithEmailAndPasswordWatcherSaga).toBeInstanceOf(Function);
  });

  test('exact registerWithEmailAndPasswordWatcherSaga order with redux-saga-test-plan', async () => {
    const user = generateRandomUser();

    const dummyUser = {
      user: {
        uid: user.uid,
        email: user.login,
      },
    };

    await expectSaga(registerWithEmailAndPasswordWatcherSaga)
      .withReducer(reducer)
      .provide([
        [matchers.call(registerUser, user.login, user.password), dummyUser],
      ])
      .dispatch(registerUserWithNameAndPass(user))
      .call(
        RegisterWithNameAndPasswordWorker,
        registerUserWithNameAndPass(user)
      )
      .put(actions.setAuthData({ uid: user.uid, userName: user.login }))
      .hasFinalState({
        isAuth: true,
        userName: user.login,
        uid: user.uid,
        userPict: undefined,
      })
      .run({ silenceTimeout: true });
  });
  test('exact registerWithEmailAndPasswordWatcherSaga Error with redux-saga-test-plan', async () => {
    const user = generateRandomUser();
    const error = faker.hacker.phrase();

    await expectSaga(registerWithEmailAndPasswordWatcherSaga)
      .withReducer(reducer)
      .provide([
        [
          matchers.call(registerUser, user.login, user.password),
          throwError(new Error(error)),
        ],
      ])
      .dispatch(registerUserWithNameAndPass(user))
      .call(
        RegisterWithNameAndPasswordWorker,
        registerUserWithNameAndPass(user)
      )
      .put(actions.authRejected({ errorMessage: error }))
      .hasFinalState({
        isAuth: false,
        userName: null,
        uid: null,
        userPict: null,
        errorMessage: error,
      })
      .run({ silenceTimeout: true });
  });
});
