import { getTopGamerList, saveUserResult } from '@api/db';
import { nanoid } from '@reduxjs/toolkit';
import {
  fetchData,
  LeaderBoardActions,
  setUserScore,
} from '@store/leaderBoardSlice';
import {
  fetchLeaderBoardData,
  leaderBoardFetchRequestedWatcherSaga,
  setUserScoreWatcherSaga,
  setUserScoreWorker,
} from '@store/sagas/leaderBoardSaga';
import { authSelector } from '@store/selectors/authSelector';
import faker from 'faker';
import { call } from 'redux-saga/effects';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';

describe('test fetchLeaderBoardData', () => {
  test('test fetchLeaderBoardData is a Function', () => {
    expect(fetchLeaderBoardData).toBeInstanceOf(Function);
  });

  test('exact order with redux-saga-test-plan', () => {
    const rndGamers = Array.from({
      length: 5,
    }).map((_, ind) => {
      return {
        userName: ind.toString(),
        uid: nanoid(),
        pictUrl: '',
        topScore: ind * 100,
      };
    });

    expect(
      testSaga(fetchLeaderBoardData)
        .next()
        .call(getTopGamerList, 10)
        .next(rndGamers)
        .put(LeaderBoardActions.leaderBoardData(rndGamers))
        .next()
        .isDone()
    ).toBeTruthy();
  });
  test('exact error flow with redux-saga-test-plan', async () => {
    await expectSaga(fetchLeaderBoardData)
      .provide([
        [
          call(getTopGamerList, 10),
          throwError(new Error("You're not authorized to do something")),
        ],
      ])
      .put(
        LeaderBoardActions.errorLeaderBoardData({
          errorMessage: "You're not authorized to do something",
        })
      )
      .run();
  });
});

describe('test setUserScoreWorker', () => {
  test('test setUserScoreWorker is a Function', () => {
    expect(setUserScoreWorker).toBeInstanceOf(Function);
  });

  test('exact order for setUserScoreWorker with redux-saga-test-plan', () => {
    const topScore = Math.floor(Math.random() * 100);
    const gamer = {
      userName: faker.name.firstName(),
      uid: faker.datatype.string(12),
      pictUrl: faker.image.imageUrl(),
    };

    const { userName, uid, pictUrl: userPict } = gamer;

    testSaga(setUserScoreWorker, setUserScore(topScore))
      .next()
      .select(authSelector)
      .next({ userName, uid, userPict, isAuth: true })
      .call(saveUserResult, { ...gamer, topScore })
      .next()
      .isDone();
  });
  test('exact error for setUserScoreWorker flow with redux-saga-test-plan', async () => {
    const topScore = Math.floor(Math.random() * 100);
    const error = faker.hacker.phrase();
    const gamer = {
      userName: faker.name.firstName(),
      uid: faker.datatype.string(12),
      pictUrl: faker.image.imageUrl(),
    };

    const { userName, uid, pictUrl: userPict } = gamer;

    await expectSaga(setUserScoreWorker, setUserScore(topScore))
      .provide([
        {
          select() {
            return { isAuth: true, userName, uid, userPict };
          },
        },

        [
          call(saveUserResult, { ...gamer, topScore }),
          throwError(new Error(error)),
        ],
      ])
      .select(authSelector)
      .put(
        LeaderBoardActions.errorLeaderBoardData({
          errorMessage: error,
        })
      )
      .run();
  });
});

describe('test leaderBoardFetchRequestedWatcherSaga', () => {
  test('test leaderBoardFetchRequestedWatcherSaga is a Function', () => {
    expect(leaderBoardFetchRequestedWatcherSaga).toBeInstanceOf(Function);
  });

  test(`Test fetchLeaderBoardData listen  ${fetchData.type}  effect`, () => {
    const saga = testSaga(leaderBoardFetchRequestedWatcherSaga);
    saga
      .next()
      .takeLeading(fetchData.type, fetchLeaderBoardData)
      .next()
      .isDone();
  });
});
describe('test setUserScoreWatcherSaga', () => {
  test('test setUserScoreWatcherSaga is a Function', () => {
    expect(setUserScoreWatcherSaga).toBeInstanceOf(Function);
  });

  test(`Test fetchLeaderBoardData listen  ${setUserScore.type}  effect`, () => {
    const saga = testSaga(setUserScoreWatcherSaga);
    saga
      .next()
      .takeLeading(setUserScore.type, setUserScoreWorker)
      .next()
      .isDone();
  });
});
