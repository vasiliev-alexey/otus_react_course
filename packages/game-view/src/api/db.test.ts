import { config } from 'dotenv';
import { getTopGamerList, saveUserResult } from './db';

import firebase from 'firebase';

describe('test db functions', () => {
  beforeAll(() => {
    config();
  });

  afterAll(() => {
    firebase.app().delete();
  });

  test('test get', async () => {
    const x = await getTopGamerList(10);
    expect(x).not.toBeNull();
    expect(x.length).toBeLessThanOrEqual(10);
  });

  test('test setUserCategoryTree', async () => {
    const x = await saveUserResult({
      uid: 'gamer22',
      userName: '',
      pictUrl: '',
      topScore: 111,
    });
    expect(x).not.toBeNull();
  });
});
