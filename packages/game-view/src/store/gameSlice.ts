import {
  CaseReducer,
  createAction,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
const sliceName = 'tetris';

const initGameField = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export interface GameState {
  isPause?: boolean;
  isGameOver?: boolean;
  playfield: number[][];
  nextPiece: number[][];
  lines?: number;
  score?: number;
  level?: number;
  isRotateError?: boolean;
}

//  AC
export const movePieceLeft = createAction(`${sliceName}/movePieceLeft`);
export const movePieceRight = createAction(`${sliceName}/movePieceRight`);
export const movePieceDown = createAction(`${sliceName}/movePieceDown`);
export const rotatePiece = createAction(`${sliceName}/rotatePiece`);
export const togglePause = createAction(`${sliceName}/togglePause`);
export const gameReset = createAction(`${sliceName}/gameReset`);

export const soundLineClear = createAction(`${sliceName}/soundLineClear`);
export const soundPause = createAction(`${sliceName}/soundPause`);
export const soundRotateError = createAction(`${sliceName}/soundRotateError`);
export const soundRotate = createAction(`${sliceName}/soundRotate`);
export const soundGameOver = createAction(`${sliceName}/soundGameOver`);

// Reducers
export const gameResetState: CaseReducer = (state) => {
  state.playfield = initGameField;
  state.nextPiece = [];
  state.isPause = undefined;
  state.isGameOver = undefined;
  state.lines = undefined;
  state.score = undefined;
  state.level = undefined;
};

export const gameSetPause: CaseReducer<GameState> = (state) => {
  state.isPause = true;
};
export const gameUnsetPause: CaseReducer<GameState> = (state) => {
  state.isPause = false;
};

export const syncGameView: CaseReducer<GameState, PayloadAction<GameState>> = (
  state,
  action
) => {
  state.playfield = action.payload.playfield;
  state.lines = action.payload.lines;
  state.level = action.payload.level;
  state.score = action.payload.score;
  state.isGameOver = action.payload.isGameOver;
  // state.isPause = action.payload.isPause;

  state.nextPiece = action.payload.nextPiece.map((e) => e.map((v) => v));
};

const initialState: GameState = {
  playfield: initGameField,
  nextPiece: [],
  //isRotateError: false,
};

const gameSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    gameResetState,
    syncGameView,
    gameSetPause,
    gameUnsetPause,
  },
});

export const { reducer: GameReducer, actions: GameActions } = gameSlice;
