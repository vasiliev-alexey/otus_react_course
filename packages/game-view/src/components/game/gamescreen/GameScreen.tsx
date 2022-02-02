import React, { useMemo } from 'react';

import GameOver from './gamover/GameOver';
import PauseLabel from './pauseLabel/PauseLabel';
import PlayField from './playField/PlayField';
import ScoreBoard from './scoreBoard/ScoreBoard';

export interface GameScreenProps {
  isPause?: boolean;
  playfield: number[][];
  nextPiece: number[][];
  lines?: number;
  score?: number;
  level?: number;
  isGameOver?: boolean;
}

const GameScreen: React.FC<GameScreenProps> = ({
  isPause,
  playfield,
  nextPiece,
  lines,
  score,
  isGameOver,
  level,
}) => {
  const isBlur = useMemo(() => isGameOver || isPause, [isGameOver, isPause]);

  return (
    <div className="gameScreen">
      <>
        <PlayField playField={playfield} isBlur={isBlur} />
        <ScoreBoard
          nextPieceBlock={nextPiece}
          lines={lines}
          score={score}
          level={level}
          isBlur={isBlur}
        />
      </>
      {isGameOver && <GameOver />}
      {!isGameOver && isPause && <PauseLabel />}
    </div>
  );
};

export default GameScreen;
