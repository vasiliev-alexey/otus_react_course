import rotateSound from '@sounds/blockRotate.mp3';
import fall from '@sounds/fall.mp3';
import { Game as GameEngine } from '@tetris/game-engine';
const gameEngine = new GameEngine();
const rotateAudio = new Audio(rotateSound);
const rotateError = new Audio(fall);
import clearLineSound from '@sounds/clear.mp3';

const clearLineAudio = new Audio(clearLineSound);

interface GameState {
  isPause?: boolean;
  isGameOver?: boolean;
  playfield: number[][];
  nextPiece: number[][];
  lines?: number;
  score?: number;
  level?: number;
}

const click = (action: () => void, movedAction = false): GameState => {
  const { lines: oldLineCount } = gameEngine.getState();
  action();
  if (movedAction) {
    const { isRotateError, lines } = gameEngine.getState();
    isRotateError ? rotateError.play() : rotateAudio.play();
    if (lines != 0 && lines > oldLineCount) {
      clearLineAudio.play();
    }
  }

  return gameEngine.getState();
};

// export const togglePause = (): GameState => {
//   return gameEngine.getState();
// };

export const moveLeft = () => click(gameEngine.movePieceLeft, true);
export const moveRight = () => click(gameEngine.movePieceRight, true);
export const moveDown = () => click(gameEngine.movePieceDown, true);
export const rotate = () => click(gameEngine.rotatePiece, true);
export const reset = () => click(gameEngine.reset);
export const gameTick = () => click(gameEngine.movePieceDown);
