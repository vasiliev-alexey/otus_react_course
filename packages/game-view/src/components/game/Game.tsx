import GameView from '@gameUi/GameView';
import {
  gameReset,
  movePieceDown,
  movePieceLeft,
  movePieceRight,
  rotatePiece,
  togglePause,
} from '@store/gameSlice';
import { AppDispatch, RootState } from '@store/store';
import { PlayFieldType } from '@tetris/game-engine';
import React from 'react';
import { connect } from 'react-redux';

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
  ReturnType<typeof mapDispatchToProps>;

class Game extends React.Component<GameProps, GameState> {
  private handleKeyPress = (event: KeyboardEvent) => {
    if (
      (event.key !== 'Pause' && this.props.game.isPause) ||
      this.props.game.isGameOver
    ) {
      return;
    } else if (event.key === 'Enter') {
      this.props.down();
    } else if (event.key === 'ArrowRight') {
      this.props.right();
    } else if (event.key === 'ArrowLeft') {
      this.props.left();
    } else if (event.code === 'Space') {
      this.props.rotate();
    } else if (event.key === 'ArrowDown') {
      this.props.down();
    } else if (event.key === 'Pause') {
      this.props.togglePause();
    } else {
      return;
    }
  };

  componentDidMount(): void {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount = (): void => {
    window.removeEventListener('keydown', this.handleKeyPress);
    this.props.reset();
  };

  render(): JSX.Element {
    return (
      <GameView
        isPause={this.props.game.isPause}
        playfield={this.props.game.playfield}
        nextPiece={this.props.game.nextPiece}
        togglePause={this.props.togglePause}
        reset={this.props.reset}
        left={this.props.left}
        right={this.props.right}
        down={this.props.down}
        rotate={this.props.rotate}
        level={this.props.game.level}
        score={this.props.game.score}
        isGameOver={this.props.game.isGameOver}
        lines={this.props.game.lines}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    reset: () => dispatch(gameReset()),
    left: () => dispatch(movePieceLeft()),
    right: () => dispatch(movePieceRight()),
    down: () => dispatch(movePieceDown()),
    rotate: () => dispatch(rotatePiece()),
    togglePause: () => dispatch(togglePause()),
  };
};

const mapStateToProps = (state: RootState) => ({
  game: state.game,
});
export default connect(mapStateToProps, mapDispatchToProps)(Game);
