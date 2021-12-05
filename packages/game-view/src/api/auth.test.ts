import { doSignInWithEmailAndPassword } from './auth';
import { config } from 'dotenv';
import firebase from 'firebase';

describe('test auth', () => {
  beforeAll(() => {
    config();
  });
  afterAll(() => {
    firebase.app().delete();
  });
  test('test doSignInWithEmailAndPassword', async () => {
    const x = await doSignInWithEmailAndPassword('av@auth.me', '11111111');
    expect(x.user.uid).toBe('HoZR2hJVo4hzMc0Q6RtHizuwsRF3');
  });
});
