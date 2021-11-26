import React from 'react';

const GameOver: React.FC = () => {
  return (
    <div data-testid="game-over-label" className="tetrisFont gameOverLabel">
      <div className="GameOver-top">
        <span>G</span>
        <span>A</span>
        <span>M</span>
        <span>E</span>
      </div>
      <div className="GameOver-bottom">
        <span>O</span>
        <span>V</span>
        <span>E</span>
        <span>R</span>
      </div>
    </div>
  );
};

export default GameOver;
