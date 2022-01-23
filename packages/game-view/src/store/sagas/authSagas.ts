import { PayloadAction } from '@reduxjs/toolkit';
import {
  CallEffect,
  PutEffect,
  call,
  put,
  ForkEffect,
  takeLeading,
} from 'redux-saga/effects';

import {
  Identity,
  loginWithNameAndPass,
  actions as AuthActions,
  loginWithGitHubAuth,
  loginWithGoogleAuth,
  registerUserWithNameAndPass,
  logout,
} from '@store/authSlice';
import {
  doSignInWithEmailAndPassword,
  doSignOut,
  registerUser,
  signInWithGithub,
  signInWithGoogle,
} from '@api/auth';
import firebase from '@api/firebase';

export function* loginWithNameAndPassword(
  action: PayloadAction<Identity>
): Generator<
  | CallEffect<Awaited<ReturnType<typeof doSignInWithEmailAndPassword>>>
  | PutEffect<
      ReturnType<
        typeof AuthActions.setAuthData | typeof AuthActions.authRejected
      >
    >
> {
  try {
    const { login, password } = action.payload;
    const {
      user: { uid, email: userName },
    } = (yield call(
      doSignInWithEmailAndPassword,
      login,
      password
    )) as firebase.auth.UserCredential;

    yield put(
      AuthActions.setAuthData({
        uid,
        userName,
      })
    );
  } catch (e) {
    yield put(AuthActions.authRejected({ errorMessage: e.message }));
  }
}

export function* RegisterWithNameAndPasswordWorker(
  action: PayloadAction<Identity>
): Generator<
  | CallEffect<Awaited<ReturnType<typeof doSignInWithEmailAndPassword>>>
  | PutEffect<
      ReturnType<
        typeof AuthActions.setAuthData | typeof AuthActions.authRejected
      >
    >
> {
  try {
    const { login: email, password } = action.payload;
    const {
      user: { uid, email: userName },
    } = (yield call(
      registerUser,
      email,
      password
    )) as firebase.auth.UserCredential;

    yield put(
      AuthActions.setAuthData({
        uid,
        userName,
      })
    );
  } catch (e) {
    yield put(AuthActions.authRejected({ errorMessage: e.message }));
  }
}

export function* logOutWorkerSaga(): Generator<
  | CallEffect<Awaited<ReturnType<typeof doSignOut>>>
  | PutEffect<
      ReturnType<
        typeof AuthActions.setAuthData | typeof AuthActions.authRejected
      >
    >
> {
  try {
    yield call(doSignOut);
    yield put(AuthActions.doLogout());
  } catch (e) {
    yield put(AuthActions.authRejected({ errorMessage: e.message }));
  }
}

export function* loginWithGitHubAuthWorker(): Generator<
  | CallEffect<Awaited<ReturnType<typeof signInWithGithub>>>
  | PutEffect<
      ReturnType<
        typeof AuthActions.setAuthData | typeof AuthActions.authRejected
      >
    >
> {
  try {
    const {
      uid,
      displayName: userName,
      photoUrl,
    } = (yield call(signInWithGithub)) as Awaited<
      ReturnType<typeof signInWithGithub>
    >;
    yield put(
      AuthActions.setAuthData({
        uid,
        userName,
        photoUrl,
      })
    );
  } catch (e) {
    yield put(AuthActions.authRejected({ errorMessage: e.message }));
  }
}

export function* loginWithGoogleAuthWorker(): Generator<
  | CallEffect<Awaited<ReturnType<typeof signInWithGoogle>>>
  | PutEffect<
      ReturnType<
        typeof AuthActions.setAuthData | typeof AuthActions.authRejected
      >
    >
> {
  try {
    const {
      uid,
      displayName: userName,
      photoUrl,
    } = (yield call(signInWithGoogle)) as Awaited<
      ReturnType<typeof signInWithGoogle>
    >;
    yield put(
      AuthActions.setAuthData({
        uid,
        userName,
        photoUrl,
      })
    );
  } catch (e) {
    yield put(AuthActions.authRejected({ errorMessage: e.message }));
  }
}

export function* loginWithEmailAndPasswordWatcherSaga(): Generator<ForkEffect> {
  yield takeLeading(loginWithNameAndPass.type, loginWithNameAndPassword);
}

export function* registerWithEmailAndPasswordWatcherSaga(): Generator<ForkEffect> {
  yield takeLeading(
    registerUserWithNameAndPass.type,
    RegisterWithNameAndPasswordWorker
  );
}

export function* doLogoutWatcherSaga(): Generator<ForkEffect> {
  yield takeLeading(logout.type, logOutWorkerSaga);
}

export function* loginWithGitHubAuthWatcherSaga(): Generator<ForkEffect> {
  yield takeLeading(loginWithGitHubAuth.type, loginWithGitHubAuthWorker);
}

export function* loginWithGoogleAuthWatcherSaga(): Generator<ForkEffect> {
  yield takeLeading(loginWithGoogleAuth.type, loginWithGoogleAuthWorker);
}

export const authSagas = [
  loginWithEmailAndPasswordWatcherSaga(),
  doLogoutWatcherSaga(),
  loginWithGitHubAuthWatcherSaga(),
  loginWithGoogleAuthWatcherSaga(),
  registerWithEmailAndPasswordWatcherSaga(),
];
