import React from 'react';

import { Game as GameEngine } from '@tetris/game-engine';

import pause from '@sounds/pause.mp3';
import rotate from '@sounds/blockRotate.mp3';
import gamover from '@sounds/gameover.mp3';
import fall from '@sounds/fall.mp3';
import GameView from '@gameUi/GameView';
import { PlayFieldType } from '@tetris/game-engine';
import { RootState } from '@store/store';
import { connect } from 'react-redux';
import { setUserScore } from '@store/leaderBoardSlice';
import { ThunkAction, Action } from '@reduxjs/toolkit';

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown, // or some ThunkExtraArgument interface
  Action<string>
>;

export type ThunkProps<
  T extends { [K in keyof T]: (...a: unknown[]) => AppThunk<void> }
> = {
  [K in keyof T]: (...args: Parameters<T[K]>) => void;
};

interface GameState {
  isPause?: boolean;
  isGameOver?: boolean;
  playfield: PlayFieldType;
  nextPiece: number[][];
  lines?: number;
  score?: number;
  level?: number;
}

type GameProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchThunkToProps;

class Game extends React.Component<GameProps, GameState> {
  #gameEngine: GameEngine = new GameEngine();
  #rotateAudio: HTMLAudioElement;
  #rotateError: HTMLAudioElement;
  #pause: HTMLAudioElement;
  #gamOver: HTMLAudioElement;

  private intervalHolder: number;

  private handleKeyPress = (event: KeyboardEvent) => {
    if (
      (event.key !== 'Pause' && this.state.isPause) ||
      this.state.isGameOver
    ) {
      return;
    } else if (event.key === 'Enter') {
      this.#down();
    } else if (event.key === 'ArrowRight') {
      this.#right();
    } else if (event.key === 'ArrowLeft') {
      this.#left();
    } else if (event.code === 'Space') {
      this.#rotate();
    } else if (event.key === 'ArrowDown') {
      this.#down();
    } else if (event.key === 'Pause') {
      this.#togglePause();
    } else {
      return;
    }
  };

  state: GameState = {
    playfield: [],
    nextPiece: [],
  };

  #syncEngineAndView = (isInit = false): void => {
    const { playfield, nextPiece, lines, score, level, isGameOver } =
      this.#gameEngine.getState(isInit);
    this.setState({
      playfield,
      nextPiece: nextPiece.blocks,
      lines,

      score,
      level,
      isGameOver,
    });
  };

  #gameTick = (): void => {
    this.#gameEngine.movePieceDown();
    this.#syncEngineAndView();
    if (this.state.isGameOver) {
      window.clearInterval(this.intervalHolder);
      this.#gamOver.play();

      if (this.props.auth.isAuth) {
        const { userName, uid, userPict: pictUrl } = this.props.auth;
        this.props.saveUserResult({
          uid,
          pictUrl: pictUrl || '',
          userName,
          topScore: this.state.score,
        });
      }
    }
  };

  componentDidMount(): void {
    this.#rotateAudio = new Audio(rotate);
    this.#pause = new Audio(pause);
    this.#gamOver = new Audio(gamover);
    this.#rotateError = new Audio(fall);

    this.#syncEngineAndView(true);
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount = (): void => {
    window.removeEventListener('keydown', this.handleKeyPress);
    if (this.intervalHolder) {
      window.clearInterval(this.intervalHolder);
    }
  };

  #reset = (): void => {
    this.#gameEngine.reset();
    this.setState({ isPause: false, isGameOver: false });
    this.#gameTick();
  };

  #togglePause = (): void => {
    if (this.state.isPause != undefined && !this.state.isPause) {
      window.clearInterval(this.intervalHolder);
      this.#pause.play();
      this.setState({ isPause: true });
    } else {
      this.setState({ isPause: false });
      this.#gameTick();
      this.intervalHolder = window.setInterval(() => {
        this.#gameTick();
      }, 1000);
    }
  };

  #click = (action: () => void): void => {
    if (
      this.state.isPause === undefined ||
      this.state.isPause ||
      this.state.isGameOver
    ) {
      return;
    }
    action();
    const { playfield, isRotateError } = this.#gameEngine.getState();
    this.setState({ playfield });
    isRotateError ? this.#rotateError.play() : this.#rotateAudio.play();
  };

  #left = (): void => this.#click(this.#gameEngine.movePieceLeft);
  #right = (): void => this.#click(this.#gameEngine.movePieceRight);
  #down = (): void => this.#click(this.#gameEngine.movePieceDown);
  #rotate = (): void => this.#click(this.#gameEngine.rotatePiece);

  render(): JSX.Element {
    return (
      <GameView
        isPause={this.state.isPause}
        playfield={this.state.playfield}
        nextPiece={this.state.nextPiece}
        togglePause={this.#togglePause}
        reset={this.#reset}
        left={this.#left}
        right={this.#right}
        down={this.#down}
        rotate={this.#rotate}
        level={this.state.level}
        score={this.state.score}
        isGameOver={this.state.isGameOver}
        lines={this.state.lines}
      />
    );
  }
}

// export default Game;

const mapDispatchThunkToProps = { saveUserResult: setUserScore };

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { ...mapDispatchThunkToProps })(Game);
