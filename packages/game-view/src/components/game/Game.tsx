import React from 'react';
import '../../../public/index.scss';
import { Game as GameEngine } from '@tetris/game-engine';
import GameScreen, { GameScreenProps } from './gamescreen/GameScreen';
import TitleBar from './titleBar/TitleBar';
import ActionPanel from './actionPanel/ActionPanel';
import ErrorBoundary from '../utils/ErrorBoundary';

interface GameState extends GameScreenProps, GameScreenProps {
  isPause: boolean;
}

class Game extends React.Component<unknown, GameState> {
  #gameEngine: GameEngine;

  private intervalHolder: number;

  private handleKeyPress = (event: KeyboardEvent) => {
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
    window.addEventListener('keydown', this.handleKeyPress);

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

  componentWillUnmount = (): void => {
    window.removeEventListener('keydown', this.handleKeyPress);

    if (this.intervalHolder) {
      window.clearInterval(this.intervalHolder);
    }
  };

  render(): JSX.Element {
    return (
      <>
        <div className="frame">
          <TitleBar />
          <ErrorBoundary>
            <GameScreen {...this.state} />
          </ErrorBoundary>
          <ActionPanel
            togglePause={() => {
              this.setState((state) => {
                return { ...state, isPause: !state.isPause };
              });
            }}
          />
        </div>
      </>
    );
  }
}

export default Game;
