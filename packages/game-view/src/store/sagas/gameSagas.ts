import gamover from '@sounds/gameover.mp3';
import {
  gameReset,
  GameState,
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
  call,
  CallEffect,
  cancel,
  CancelEffect,
  delay,
  fork,
  ForkEffect,
  put,
  PutEffect,
  select,
  takeEvery,
  takeLeading,
} from 'redux-saga/effects';
const gameOver = new Audio(gamover);

import pause from '@sounds/pause.mp3';
const pauseSound = new Audio(pause);

import clearLineSound from '@sounds/clear.mp3';
const clearLineAudio = new Audio(clearLineSound);

import rotateSound from '@sounds/blockRotate.mp3';
import fall from '@sounds/fall.mp3';
const rotateAudio = new Audio(rotateSound);
const rotateError = new Audio(fall);

import {
  gameTick,
  moveDown,
  moveLeft,
  moveRight,
  reset,
  rotate,
} from '@api/game';
import { Action } from '@reduxjs/toolkit';
import { GameActions } from '@store/gameSlice';
import { setUserScore } from '@store/leaderBoardSlice';
import { SagaActionWorker, Watcher } from '@store/sagas/types';
import { lineCountSelector } from '@store/selectors/selectors';
import { Task } from 'redux-saga';

export function* movePieceWorker(
  act: Action
):
  | SagaActionWorker<() => GameState, typeof GameActions.syncGameView>
  | Generator<CallEffect> {
  let func;
  switch (act.type) {
    case rotatePiece.type:
      func = rotate;
      break;
    case movePieceDown.type:
      func = moveDown;
      break;
    case movePieceRight.type:
      func = moveRight;
      break;
    case movePieceLeft.type:
      func = moveLeft;
      break;
  }
  const gameData = (yield call(func)) as GameState;

  if (gameData.isRotateError) {
    yield put(soundRotateError());
  } else {
    yield put(soundRotate());
  }

  yield put(GameActions.syncGameView(gameData));
}

export function* gameSoundWorker(act: Action) {
  switch (act.type) {
    case soundLineClear.type:
      clearLineAudio.play();
      break;
    case soundPause.type:
      pauseSound.play();
      break;
    case soundRotate.type:
      rotateAudio.play();
      break;
    case soundRotateError.type:
      rotateError.play();
      break;
    case soundGameOver.type:
      gameOver.play();
      break;
  }
}

function* gameTickSaga() {
  let prevLinesCount: number = yield select(lineCountSelector);
  prevLinesCount = prevLinesCount | 0;
  while (true) {
    const gameData = (yield call(gameTick)) as GameState;

    if (prevLinesCount < gameData.lines) {
      yield put(soundLineClear());
      prevLinesCount = gameData.lines;
    }

    yield put(GameActions.syncGameView(gameData));
    if (gameData.isGameOver) {
      yield put(soundGameOver());
      yield put(setUserScore(gameData.score));
      break;
    }
    yield delay(1000);
  }
}
let tickTask: Task;
export function* togglePauseWorker(): Generator<
  | CallEffect<Awaited<ReturnType<typeof rotate | typeof delay>>>
  | PutEffect<ReturnType<typeof GameActions.syncGameView>>
  | ForkEffect
  | CancelEffect
> {
  yield put(soundPause());

  if (tickTask && tickTask.isRunning()) {
    tickTask.cancel();
    yield put(GameActions.gameSetPause());
  } else {
    yield put(GameActions.gameUnsetPause());
    tickTask = (yield fork(gameTickSaga)) as Task;
  }
}

export function* gameResetWorker(): Generator<
  | CallEffect<Awaited<ReturnType<typeof reset>>>
  | PutEffect<ReturnType<typeof GameActions.gameResetState>>
  | CancelEffect
> {
  if (tickTask && tickTask.isRunning()) {
    yield cancel(tickTask);
  }
  yield call(reset);
  yield put(GameActions.gameResetState());
}

export function* movePieceWatcher(): Watcher {
  yield takeLeading(
    [
      rotatePiece.type,
      movePieceDown.type,
      movePieceRight.type,
      movePieceLeft.type,
    ],
    movePieceWorker
  );
}

export function* togglePauseWatcher(): Watcher {
  yield takeEvery(togglePauseAction.type, togglePauseWorker);
}
export function* gameResetWatcher(): Watcher {
  yield takeEvery(gameReset.type, gameResetWorker);
}
export function* gameSoundWatcher(): Watcher {
  yield takeEvery(
    [
      soundLineClear.type,
      soundPause.type,
      soundRotateError.type,
      soundRotate.type,
      soundGameOver.type,
    ],
    gameSoundWorker
  );
}

export const gameSagas: Watcher[] = [
  togglePauseWatcher(),
  movePieceWatcher(),
  gameResetWatcher(),
  gameSoundWatcher(),
];
