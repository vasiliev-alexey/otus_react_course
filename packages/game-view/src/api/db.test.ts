import { config } from 'dotenv';
import firebase from 'firebase';

import { getTopGamerList, saveUserResult } from './db';

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
      userName: 'unit-test-user',
      pictUrl: 'https://randomuser.me/api/portraits/men/89.jpg',
      topScore: 111,
    });
    expect(x).not.toBeNull();
  });
});
