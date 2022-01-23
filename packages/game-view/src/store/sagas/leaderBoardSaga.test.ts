import {
  fetchLeaderBoardData,
  leaderBoardFetchRequestedWatcherSaga,
  setUserScoreWatcherSaga,
  setUserScoreWorker,
} from '@store/sagas/leaderBoardSaga';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import { getTopGamerList, saveUserResult } from '@api/db';
import { actions, fetchData, setUserScore } from '@store/leaderBoardSlice';
import { nanoid } from '@reduxjs/toolkit';
import { call } from 'redux-saga/effects';
import { throwError } from 'redux-saga-test-plan/providers';
import faker from 'faker';
import { expectFn } from '@ui/utils/testUtils';

describe('test fetchLeaderBoardData', () => {
  test('test fetchLeaderBoardData is a Function', () => {
    expectFn(fetchLeaderBoardData);
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
        .put(actions.leaderBoardData(rndGamers))
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
        actions.errorLeaderBoardData({
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
    const gamer = {
      userName: faker.name.firstName(),
      uid: faker.datatype.string(12),
      pictUrl: faker.image.imageUrl(),
      topScore: Math.floor(Math.random() * 100),
    };

    testSaga(setUserScoreWorker, setUserScore(gamer))
      .next()
      .call(saveUserResult, gamer)
      .next()
      .isDone();
  });
  test('exact error for setUserScoreWorker flow with redux-saga-test-plan', async () => {
    const gamer = {
      userName: faker.name.firstName(),
      uid: nanoid(),
      pictUrl: '',
      topScore: Math.floor(Math.random() * 100),
    };
    await expectSaga(setUserScoreWorker, setUserScore(gamer))
      .provide([
        [
          call(saveUserResult, gamer),
          throwError(new Error("You're not authorized to do something")),
        ],
      ])
      .put(
        actions.errorLeaderBoardData({
          errorMessage: "You're not authorized to do something",
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
