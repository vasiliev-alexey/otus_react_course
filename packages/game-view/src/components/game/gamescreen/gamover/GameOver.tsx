import React from 'react';

const GameOver: React.FC = () => {
  return (
    <div data-testid="Pause-Label" className="tetrisFont pauseLabel">
      <div>
        <span>G</span>
        <span>A</span>
        <span>M</span>
        <span>E</span>
      </div>
      <div>
        <span>O</span>
        <span>V</span>
        <span>E</span>
        <span>R</span>
      </div>
    </div>
  );
};

export default GameOver;
