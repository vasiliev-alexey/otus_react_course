import { config } from 'dotenv';
import firebase from 'firebase';

import { doSignInWithEmailAndPassword } from './auth';

describe('test auth', () => {
  beforeAll(() => {
    config();
  });
  afterAll(() => {
    firebase.app().delete();
  });
  test('test doSignInWithEmailAndPassword', async () => {
    const x = await doSignInWithEmailAndPassword('av@auth.me', '11111111');
    expect(x.user.uid).toBe('TavGnY9ansU2oHdfsg146cH79Xa2');
  });
});
