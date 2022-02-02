import { Game as GameEngine } from '@tetris/game-engine';
const gameEngine = new GameEngine();

interface GameState {
  isPause?: boolean;
  isGameOver?: boolean;
  playfield: number[][];
  nextPiece: number[][];
  lines?: number;
  score?: number;
  level?: number;
  isRotateError: boolean;
}
const click = (action: () => void): GameState => {
  action();
  return gameEngine.getState();
};

export const moveLeft = () => click(gameEngine.movePieceLeft);
export const moveRight = () => click(gameEngine.movePieceRight);
export const moveDown = () => click(gameEngine.movePieceDown);
export const rotate = () => click(gameEngine.rotatePiece);
export const reset = () => click(gameEngine.reset);
export const gameTick = () => click(gameEngine.movePieceDown);
