import firebase from 'firebase';

import { auth } from './firebase';

export const doSignInWithEmailAndPassword = (
  email: string,
  password: string
): Promise<firebase.auth.UserCredential> =>
  auth.signInWithEmailAndPassword(email, password);

export const doSignOut = (): Promise<void> => auth.signOut();
export const registerUser = (
  email: string,
  password: string
): Promise<firebase.auth.UserCredential> =>
  auth.createUserWithEmailAndPassword(email, password);

const provider = new firebase.auth.GithubAuthProvider();

export interface User {
  displayName: string;
  photoUrl: string;
  uid: string;
}

const getGiHubUser = async (id: string, uid: string): Promise<User> => {
  const data = await fetch(`https://api.github.com/user/${id}`);
  const user = await data.json();

  return {
    displayName: user.login,
    uid,
    photoUrl: user.avatar_url,
  };
};

export const signInWithGithub = async (): Promise<User> => {
  const data = await firebase.auth().signInWithPopup(provider);
  return await getGiHubUser(data.user.providerData.at(0).uid, data.user.uid);
};
const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<User> => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    return {
      displayName: user.displayName,
      uid: user.uid,
      photoUrl: user.providerData.at(0).photoURL,
    };
  } catch (err) {
    // eslint-disable-next-line  no-console
    console.error(err);
  }
};
