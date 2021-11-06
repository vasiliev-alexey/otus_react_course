import { Game, PlayFieldType } from './GameEngine';

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
  let game: Game;

  beforeEach(() => {
    game = new Game();
  });

  test('300 clicks down expect  game finished', () => {
    expect(game.getState().isGameOver).toBeFalsy();
    for (let i = 0; i < 300; i++) {
      game.movePieceDown();
      if (game.getState().isGameOver) break;
    }
    expect(game.getState().isGameOver).toBeTruthy();
  });

  test('20 clicks down expect piece in bottom', () => {
    const initialRows = game.getState().playfield.slice(0, 2);
    printField(game.getState().playfield);
    for (let i = 0; i < 20; i++) {
      game.movePieceDown();
      if (game.getState().isGameOver) break;
    }
    printField(game.getState().playfield.slice(18, 20));
    printField(initialRows);
    expect(game.getState().playfield.slice(18, 20)).toEqual(initialRows);
  });
});

describe('Down click test suit ', () => {
  let game: Game;

  beforeEach(() => {
    game = new Game();
  });

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
  let game: Game;

  beforeEach(() => {
    game = new Game();
  });

  test(' test rotatePiece action', () => {
    let p = game.getState().playfield;

    while (p[0][4] && p[0][5] && p[1][4] && p[1][5]) {
      game = new Game();
      p = game.getState().playfield;
    }

    game.movePieceDown();
    game.movePieceDown();

    const oldPosition = game.getState().playfield.slice(1, 5);

    // printField(oldPosition);

    game.rotatePiece();
    // printField(game.getState().playfield.slice(1, 5));

    expect(game.getState().playfield.slice(1, 5)).not.toEqual(oldPosition);
  });
});
