import { Game, PlayFieldType } from './GameEngine';

let game: Game;

beforeEach(() => {
  game = new Game();
});

describe('Game Engine is a Class', () => {
  test('game engine is a class', () => {
    expect(Game).toBeInstanceOf(Function);
  });
  test('game engine have default constructor', () => {
    expect(new Game()).toBeInstanceOf(Object);
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const printField = (playfield: PlayFieldType): void => {
  // eslint-disable-next-line no-console
  console.table(
    playfield.map((row) => {
      return row
        .map((c) => {
          switch (c) {
            case 1:
              return '🟨';
            case 2:
              return '🟩';
            case 3:
              return '🟦';
            case 4:
              return '🟪';
            case 5:
              return '🟥';
            case 6:
              return '🟧';
            case 7:
              return '🟫';
            default:
              return '🎮';
          }
        })
        .join('');
    })
  );
};

describe('Down click test suit ', () => {
  test('300 clicks down expect  game finished', () => {
    expect(game.getState().isGameOver).toBeFalsy();
    for (let i = 0; i < 300; i++) {
      game.movePieceDown();
      if (game.getState().isGameOver) break;
    }
    expect(game.getState().isGameOver).toBeTruthy();
  });

  test.each(Array.from(Array(20).fill(1), (el, idx) => [el + idx]))(
    '20 clicks down expect piece in bottom test N %i',
    () => {
      let initialRows = game.getState().playfield.slice(0, 2);
      let sliceCnt = 0;

      if (initialRows[0][3] && initialRows[0][6]) {
        initialRows = initialRows.slice(0, 1);
        sliceCnt = 1;
      }

      for (let i = 0; i < 22; i++) {
        game.movePieceDown();
        if (game.getState().isGameOver) break;
      }

      expect(game.getState().playfield.slice(18 + sliceCnt, 20)).toEqual(
        initialRows
      );
    }
  );
});

describe('Down click test suit ', () => {
  test(' test reset action', () => {
    game.movePieceDown();
    game.movePieceLeft();
    game.movePieceDown();
    game.movePieceDown();
    const oldStateField = game.getState().playfield.slice(0, 20);
    game.reset();
    expect(game.getState().playfield).not.toEqual(oldStateField);
  });
});

describe('Test rotate piece', () => {
  test(' test rotatePiece action', () => {
    let p = game.getState().playfield;

    while (p[0][4] && p[0][5] && p[1][4] && p[1][5]) {
      game = new Game();
      p = game.getState().playfield;
    }

    game.movePieceDown();
    game.movePieceDown();

    const oldPosition = game.getState().playfield.slice(1, 5);

    game.rotatePiece();

    expect(game.getState().playfield.slice(1, 5)).not.toEqual(oldPosition);
  });
});
