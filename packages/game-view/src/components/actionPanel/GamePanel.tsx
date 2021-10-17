import React from 'react';

const GamePanel: React.FC = () => {
  return (
    <div className="gamePanel">
      <button className="circleButton transparentBac smBtn">🟡 pause</button>
      <button className="circleButton transparentBac smBtn">🟡 music</button>
      <button className="circleButton transparentBac smBtn ">🟡 reset</button>
    </div>
  );
};

export default GamePanel;
