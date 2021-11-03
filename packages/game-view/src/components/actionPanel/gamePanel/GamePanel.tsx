import React from 'react';

export interface GamePanelProps {
  togglePause: () => void;
}

const GamePanel: React.FC<GamePanelProps> = ({ togglePause }) => {
  return (
    <div className="gamePanel">
      <button
        data-testid="GamePanel-pause-btb"
        className="circleButton transparentBac smBtn"
        onClick={togglePause}
      >
        pause🟡
      </button>
      <button className="circleButton transparentBac smBtn">music🟡</button>
      <button className="circleButton transparentBac smBtn ">reset🟡</button>
    </div>
  );
};

export default GamePanel;
