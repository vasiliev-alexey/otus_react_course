import { gameTick, moveDown, moveLeft, moveRight, rotate } from '@api/game';
import {
  GameActions,
  GameReducer,
  movePieceDown,
  movePieceLeft,
  movePieceRight,
  rotatePiece,
  soundGameOver,
  soundLineClear,
  soundPause,
  soundRotate,
  soundRotateError,
  togglePause as togglePauseAction,
} from '@store/gameSlice';
import {
  gameSoundWorker,
  movePieceWorker,
  togglePauseWorker,
} from '@store/sagas/gameSagas';
import { lineCountSelector } from '@store/selectors/selectors';
import { Game } from '@tetris/game-engine';
import { call, select } from 'redux-saga/effects';
import { expectSaga, testSaga } from 'redux-saga-test-plan';

describe('test movePieceWorker', () => {
  test('test movePieceWorker is a Function', () => {
    expect(movePieceWorker).toBeInstanceOf(Function);
  });

  test.each([
    [movePieceLeft.name, movePieceLeft, moveLeft],
    [movePieceRight.name, movePieceRight, moveRight],
    [rotatePiece.name, rotatePiece, rotate],
    [movePieceDown.name, movePieceDown, moveDown],
  ])('test consume action   for %s', (funcName: string, funcAc, funcMove) => {
    const gameEngine = new Game();
    const state = gameEngine.getState();

    expect(
      testSaga(movePieceWorker, funcAc())
        .next()
        .call(funcMove)
        .next(state)
        .put(soundRotate())
        .next()
        .put(GameActions.syncGameView(state))
        .next()
        .isDone()
    ).toBeTruthy();
  });

  test.each([
    [movePieceLeft.name, movePieceLeft, moveLeft],
    [movePieceRight.name, movePieceRight, moveRight],
    [rotatePiece.name, rotatePiece, rotate],
    [movePieceDown.name, movePieceDown, moveDown],
  ])(
    'test consume action  for error rotation  for %s',
    (funcName: string, funcAc, funcMove) => {
      const gameEngine = new Game();
      const state = gameEngine.getState();
      state.isRotateError = true;

      expect(
        testSaga(movePieceWorker, funcAc())
          .next()
          .call(funcMove)
          .next(state)
          .put(soundRotateError())
          .next()
          .put(GameActions.syncGameView(state))
          .next()
          .isDone()
      ).toBeTruthy();
    }
  );
});

describe('Test gameSoundWorker', () => {
  let playBackup: () => Promise<void>;
  let pauseBackup: () => void;

  beforeAll(() => {
    playBackup = window.HTMLMediaElement.prototype.play;
    pauseBackup = window.HTMLMediaElement.prototype.pause;

    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
  });
  afterAll(() => {
    window.HTMLMediaElement.prototype.play = playBackup;
    window.HTMLMediaElement.prototype.pause = pauseBackup;
  });

  test.each([
    ['soundLineClear', soundLineClear],
    ['soundPause', soundPause],
    ['soundRotateError', soundRotateError],
    ['soundRotate', soundRotate],
    ['soundGameOver', soundGameOver],
  ])(
    'test consume action  for error rotation  for %s',
    (funcName: string, funcAc) => {
      expect(testSaga(gameSoundWorker, funcAc()).next().isDone()).toBeTruthy();
    }
  );
});

describe('test togglePauseWorker', () => {
  test('test togglePauseWorker is a Function', () => {
    expect(togglePauseWorker).toBeInstanceOf(Function);
  });
  test('integr test togglePauseWorker', async () => {
    const gameEngine = new Game();
    const state = gameEngine.getState();
    state.isRotateError = false;

    const state2 = gameEngine.getState();

    delete state2.isRotateError;

    const init = {
      lines: 0,
      playfield: [] as number[][],
      nextPiece: [] as number[][],
    };
    await expectSaga(togglePauseWorker)
      .withReducer(GameReducer, init)
      .provide([
        [select(lineCountSelector), 42],
        [call(gameTick), state],
      ])
      .dispatch(togglePauseAction())
      .put(soundPause())
      .put(GameActions.gameUnsetPause())
      .hasFinalState({ ...state2, isPause: false })
      .run({ silenceTimeout: true });
  });
});

//gameSagas.ts                                 |   85.71 |       65 |   88.88 |   85.71 | 116-117,122-124,139-140,152-156
