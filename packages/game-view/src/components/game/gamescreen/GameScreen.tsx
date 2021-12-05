import React from 'react';
import PlayField from './playField/PlayField';
import ScoreBoard from './scoreBoard/ScoreBoard';
import GameOver from './gamover/GameOver';
import PauseLabel from './pauseLabel/PauseLabel';

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
  return (
    <div className="gameScreen">
      <>
        <PlayField playField={playfield} />
        <ScoreBoard
          nextPieceBlock={nextPiece}
          lines={lines}
          score={score}
          level={level}
        />
      </>
      {isGameOver && <GameOver />}
      {!isGameOver && isPause && <PauseLabel />}
    </div>
  );
};

export default GameScreen;
