import '../../../public/index.scss';
import React from 'react';
import TitleBar from './titleBar/TitleBar';
import ErrorBoundary from '../utils/ErrorBoundary';
import GameScreen, { GameScreenProps } from './gamescreen/GameScreen';
import ActionPanel, { ActionPanelProps } from './actionPanel/ActionPanel';

export interface GameViewProps extends GameScreenProps, ActionPanelProps {
  isPause: boolean;
}

const GameView: React.FC<GameViewProps> = ({
  left,
  right,
  down,
  reset,
  togglePause,
  rotate,
  isPause,
  level,
  playfield,
  nextPiece,

  lines,
  score,
  isGameOver,
}) => {
  return (
    <div className="frame">
      <TitleBar />
      <ErrorBoundary>
        <GameScreen
          isPause={isPause}
          playfield={playfield}
          level={level}
          nextPiece={nextPiece}
          lines={lines}
          score={score}
          isGameOver={isGameOver}
        />
      </ErrorBoundary>
      <ActionPanel
        left={left}
        right={right}
        down={down}
        reset={reset}
        isPause={isPause}
        togglePause={togglePause}
        rotate={rotate}
      />
    </div>
  );
};

export default GameView;
