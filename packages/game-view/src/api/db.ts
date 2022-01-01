import { db } from './firebase';

const GAMERS = 'gamers';

export const getTopGamerList = async (limitSize = 10): Promise<Gamer[]> => {
  try {
    const data = await db
      .collection(GAMERS)
      .orderBy('topScore', 'desc')
      .limit(limitSize)
      .get();

    return data.docs.map((d) => {
      return {
        userName: d.get('userName'),
        pictUrl: d.get('pictUrl'),
        uid: d.get('uid'),
        topScore: d.get('topScore'),
      };
    });
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
  }
};

export const saveUserResult = async (user: Gamer): Promise<boolean> => {
  try {
    const data = await db.collection(GAMERS).doc(user.uid).get();
    if ((data.exists && data.get('topScore') < user.topScore) || !data.exists) {
      await db.collection(GAMERS).doc(user.uid).set(user, { merge: true });
    }
    return true;
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    return false;
  }
};

export interface Gamer {
  uid: string;
  pictUrl: string;
  userName: string;
  topScore: number;
}
