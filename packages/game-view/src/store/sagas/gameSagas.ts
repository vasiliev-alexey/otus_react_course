import gamover from '@sounds/gameover.mp3';
import {
  gameReset,
  GameState,
  movePieceDown,
  movePieceLeft,
  movePieceRight,
  rotatePiece,
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
  takeEvery,
  takeLeading,
} from 'redux-saga/effects';
const gameOver = new Audio(gamover);

import pause from '@sounds/pause.mp3';
const pauseSound = new Audio(pause);

import {
  gameTick,
  moveDown,
  moveLeft,
  moveRight,
  reset,
  rotate,
} from '@api/game';
import { AnyAction } from '@reduxjs/toolkit';
import { GameActions } from '@store/gameSlice';
import { setUserScore } from '@store/leaderBoardSlice';
import { SagaActionWorker, Watcher } from '@store/sagas/types';
import { Task } from 'redux-saga';

const switchController = (act: string): (() => GameState) => {
  switch (act) {
    case rotatePiece.type:
      return rotate;
    case movePieceDown.type:
      return moveDown;
    case movePieceRight.type:
      return moveRight;
    case movePieceLeft.type:
      return moveLeft;
  }
};

export function* movePieceWorker(
  act: AnyAction
): SagaActionWorker<() => GameState, typeof GameActions.syncGameView> {
  const func = switchController(act.type);
  const gameData = (yield call(func)) as GameState;
  yield put(GameActions.syncGameView(gameData));
}

function* gameTickSaga() {
  while (true) {
    const gameData = (yield call(gameTick)) as GameState;

    yield put(GameActions.syncGameView(gameData));
    if (gameData.isGameOver) {
      gameOver.play();
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
  pauseSound.play();
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

export const gameSagas: Watcher[] = [
  togglePauseWatcher(),
  movePieceWatcher(),
  gameResetWatcher(),
];
