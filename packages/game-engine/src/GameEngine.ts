const ROWS_COUNT = 20;
const COLUMNS_COUNT = 10;

export interface PieceType {
  blocks?: number[][];
  x: number;
  y: number;
}

export type PlayFieldType = number[][];

export interface GameState {
  level: number;
  lines: number;
  score: number;
  nextPiece: PlayFieldType;
  playfield: PlayFieldType;
  isGameOver: boolean;
  isRotateError: boolean;
}
const initPiece: PieceType = {
  x: 0,
  y: 0,
  blocks: [],
};

export class Game {
  #score = 0;
  #topOut = false;
  #lines = 0;

  // hiScore = 0;
  #nextPiece: PieceType;
  #activePiece: PieceType;
  #playfield: PlayFieldType;

  #isRotateError: boolean;

  static readonly points: Record<number, number> = {
    1: 40,
    2: 100,
    3: 300,
    4: 1200,
  };

  constructor() {
    // this.sound = sound;
    this.reset();
  }

  get #level(): number {
    return Math.floor(this.#lines * 0.1);
  }

  getState(init = false): GameState {
    const playfield = this.#createPlayfield();
    const { y: pieceY, x: pieceX, blocks } = this.#activePiece;
    if (!init) {
      for (let y = 0; y < this.#playfield.length; y += 1) {
        playfield[y] = [];

        for (let x = 0; x < this.#playfield[y].length; x += 1) {
          playfield[y][x] = this.#playfield[y][x];
        }
      }

      for (let y = 0; y < blocks.length; y += 1) {
        for (let x = 0; x < blocks[y].length; x += 1) {
          if (blocks[y][x]) {
            playfield[pieceY + y][pieceX + x] = blocks[y][x];
          }
        }
      }
    }
    return {
      level: this.#level,
      lines: this.#lines,
      score: this.#score,
      isRotateError: this.#isRotateError,
      nextPiece: init ? initPiece.blocks : this.#nextPiece.blocks,
      playfield,
      isGameOver: this.#topOut,
    };
  }

  reset = (): void => {
    this.#score = 0;
    this.#lines = 0;
    this.#topOut = false;
    this.#playfield = this.#createPlayfield();
    this.#activePiece = this.#createPiece();
    this.#nextPiece = this.#createPiece();
  };

  #createPlayfield(emptyBlock = 0): PlayFieldType {
    const playfield: PlayFieldType = [];

    for (let y = 0; y < ROWS_COUNT; y += 1) {
      playfield[y] = [];

      for (let x = 0; x < COLUMNS_COUNT; x += 1) {
        playfield[y][x] = emptyBlock;
      }
    }

    return playfield;
  }

  #createPiece = (): PieceType => {
    const index = Math.floor(Math.random() * 7);
    const types = 'IJLOSTZ';
    const type = types[index];
    const piece: PieceType = { x: 0, y: 0 };

    switch (type) {
      case 'I':
        piece.blocks = [
          [0, 0, 0, 0],
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ];
        break;
      case 'J':
        piece.blocks = [
          [0, 0, 0],
          [2, 2, 2],
          [0, 0, 2],
        ];
        break;
      case 'L':
        piece.blocks = [
          [0, 0, 0],
          [3, 3, 3],
          [3, 0, 0],
        ];
        break;
      case 'O':
        piece.blocks = [
          [0, 0, 0, 0],
          [0, 4, 4, 0],
          [0, 4, 4, 0],
          [0, 0, 0, 0],
        ];
        break;
      case 'S':
        piece.blocks = [
          [0, 0, 0],
          [0, 5, 5],
          [5, 5, 0],
        ];
        break;
      case 'T':
        piece.blocks = [
          [0, 0, 0],
          [6, 6, 6],
          [0, 6, 0],
        ];
        break;
      case 'Z':
        piece.blocks = [
          [0, 0, 0],
          [7, 7, 0],
          [0, 7, 7],
        ];
        break;
      default:
        throw new Error(`Unknown type of piece: ${type}`);
    }

    piece.x = Math.floor((COLUMNS_COUNT - piece.blocks[0].length) / 2);
    piece.y = -1;

    return piece;
  };

  movePieceLeft = (): void => {
    this.#activePiece.x -= 1;
    if (this.#hasCollision()) {
      this.#activePiece.x += 1;
    }
  };

  movePieceRight = (): void => {
    this.#activePiece.x += 1;
    if (this.#hasCollision()) {
      this.#activePiece.x -= 1;
    }
  };

  movePieceDown = (): void => {
    if (this.#topOut) {
      return;
    }

    this.#activePiece.y += 1;
    if (this.#hasCollision()) {
      this.#activePiece.y -= 1;
      this.#lockPiece();
      const numOfClearedLines = this.#clearLines();
      this.#updateScore(numOfClearedLines);
      this.#updatePieces();
    }

    if (this.#hasCollision()) {
      this.#topOut = true;
    }
  };

  rotatePiece = (): void => {
    this.#rotateBlocks();
    if (this.#hasCollision()) {
      this.#rotateBlocks(false);
    }
  };

  #rotateBlocks = (clockwise = true): void => {
    const blocks = this.#activePiece.blocks;
    const length = blocks.length;
    const x = Math.floor(length / 2);
    const y = length - 1;

    for (let i = 0; i < x; i += 1) {
      for (let j = i; j < y - i; j += 1) {
        const temp = blocks[i][j];

        if (clockwise) {
          blocks[i][j] = blocks[y - j][i];
          blocks[y - j][i] = blocks[y - i][y - j];
          blocks[y - i][y - j] = blocks[j][y - i];
          blocks[j][y - i] = temp;
        } else {
          blocks[i][j] = blocks[j][y - i];
          blocks[j][y - i] = blocks[y - i][y - j];
          blocks[y - i][y - j] = blocks[y - j][i];
          blocks[y - j][i] = temp;
        }
      }
    }
  };

  #hasCollision = (): boolean => {
    this.#isRotateError = false;
    const { y: pieceY, x: pieceX, blocks } = this.#activePiece;

    for (let y = 0; y < blocks.length; y += 1) {
      for (let x = 0; x < blocks[y].length; x += 1) {
        if (
          blocks[y][x] &&
          (this.#playfield[pieceY + y] === undefined ||
            this.#playfield[pieceY + y][pieceX + x] === undefined ||
            this.#playfield[pieceY + y][pieceX + x])
        ) {
          this.#isRotateError = true;
          return true;
        }
      }
    }
    return false;
  };

  #lockPiece(): void {
    const { y: pieceY, x: pieceX, blocks } = this.#activePiece;

    for (let y = 0; y < blocks.length; y += 1) {
      for (let x = 0; x < blocks[y].length; x += 1) {
        if (blocks[y][x]) {
          this.#playfield[pieceY + y][pieceX + x] = blocks[y][x];
        }
      }
    }
  }

  #clearLines(): number {
    const lines: number[] = [];
    for (let y = ROWS_COUNT - 1; y >= 0; y -= 1) {
      let numberOfBlocks = 0;

      for (let x = 0; x < COLUMNS_COUNT; x += 1) {
        if (this.#playfield[y][x]) {
          numberOfBlocks += 1;
        }
      }
      if (numberOfBlocks === 0) {
        break;
      } else if (numberOfBlocks < COLUMNS_COUNT) {
        continue;
      } else if (numberOfBlocks === COLUMNS_COUNT) {
        lines.unshift(y);
      }
    }

    for (const line of lines) {
      this.#playfield.splice(line, 1);
      this.#playfield.unshift(new Array(COLUMNS_COUNT).fill(0));
    }

    return lines.length;
  }

  #updateScore(clearedLines: number): void {
    if (clearedLines > 0) {
      this.#score += Game.points[clearedLines] * (this.#level + 1);
      this.#lines += clearedLines;
    }
  }

  #updatePieces(): void {
    this.#activePiece = this.#nextPiece;
    this.#nextPiece = this.#createPiece();
  }
}
