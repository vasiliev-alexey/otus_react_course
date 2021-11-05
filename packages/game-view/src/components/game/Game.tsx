import React from 'react';
import '../../../public/index.scss';
import { default as GameEngine } from '@tetris/game-engine/dist/src/GameEngine';
import GameScreen, { GameScreenProps } from './gamescreen/GameScreen';
import TitleBar from './titleBar/TitleBar';
import ActionPanel from './actionPanel/ActionPanel';

interface GameState extends GameScreenProps, GameScreenProps {
  isPause: boolean;
}

class Game extends React.Component<unknown, GameState> {
  #gameEngine: GameEngine;

  private intervalHolder: number;

  private handleEsc = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.#gameEngine.movePieceDown();
    } else if (event.key === 'ArrowRight') {
      this.#gameEngine.movePieceRight();
    } else if (event.key === 'ArrowLeft') {
      this.#gameEngine.movePieceLeft();
    } else if (event.code === 'Space') {
      this.#gameEngine.rotatePiece();
    } else if (event.key === 'ArrowDown') {
      this.#gameEngine.movePieceDown();
    } else {
      return;
    }

    this.setState({ playfield: this.#gameEngine.getState().playfield });
  };

  constructor(props: Readonly<unknown> | unknown) {
    super(props);

    this.state = {
      isPause: false,
      playfield: [],
      nextPiece: [],
    };
  }

  componentDidMount(): void {
    this.#gameEngine = new GameEngine();
    window.addEventListener('keydown', this.handleEsc);

    this.intervalHolder = window.setInterval(() => {
      this.#gameEngine.movePieceDown();

      const { playfield, nextPiece, lines, score, level } =
        this.#gameEngine.getState();

      this.setState({
        playfield,
        nextPiece: nextPiece.blocks,
        lines,
        score,
        level,
      });
    }, 1000);
  }

  componentWillUnmount(): void {
    super.componentWillUnmount();
    window.removeEventListener('keydown', this.handleEsc);

    if (this.intervalHolder) {
      window.clearInterval(this.intervalHolder);
    }
  }

  render(): JSX.Element {
    return (
      <>
        <div className="frame">
          <TitleBar />
          <GameScreen {...this.state} />

          <ActionPanel
            togglePause={() => {
              this.setState((state) =>
                this.setState({ isPause: !state.isPause })
              );
            }}
          />
        </div>
      </>
    );
  }
}

export default Game;
