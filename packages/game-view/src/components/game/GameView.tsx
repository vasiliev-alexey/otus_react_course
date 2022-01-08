import '@css/index.scss';

import TitleBar from '@ui/game/titleBar/TitleBar';
import React from 'react';

import ErrorBoundary from '../utils/ErrorBoundary';
import ActionPanel, { ActionPanelProps } from './actionPanel/ActionPanel';
import GameScreen, { GameScreenProps } from './gamescreen/GameScreen';

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
