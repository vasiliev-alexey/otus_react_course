import React from 'react';
import PlayField from './playField/PlayField';
import ScoreBoard from './scoreBoard/ScoreBoard';
import GameOver from './gamover/GameOver';

export interface GameScreenProps {
  isPause: boolean;
  playfield: number[][];
  nextPiece: number[][];
  lines?: number;
  score?: number;
  level?: number;
}

const GameScreen: React.FC<GameScreenProps> = ({
  isPause,
  playfield,
  nextPiece,
  lines,
  score,
}) => {
  //const [nextPieces] = useState(initNextPieceFields);

  return (
    <div className="gameScreen">
      {isPause ? (
        <GameOver />
      ) : (
        <>
          <PlayField playField={playfield} />
          <ScoreBoard nextPieceBlock={nextPiece} lines={lines} score={score} />
        </>
      )}
    </div>
  );
};

export default GameScreen;
