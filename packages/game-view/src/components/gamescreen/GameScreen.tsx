import React from 'react';
import PlayField from './PlayField';
import ScoreBoard from './ScoreBoard';

const GameScreen: React.FC = () => {
  return (
    <div className="gameScreen">
      <PlayField />
      <ScoreBoard />
    </div>
  );
};

export default GameScreen;
