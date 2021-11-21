import React from 'react';

export interface GamePanelProps {
  togglePause: () => void;
}

const GamePanel: React.FC<GamePanelProps> = ({ togglePause }) => {
  return (
    <div className="gamePanel">
      <button
        data-testid="GamePanel-pause-btb"
        className="circleButton transparentBac mdBtn"
        onClick={togglePause}
      >
        start/pause🟡
      </button>
      <button className="circleButton transparentBac smBtn">sound🟡</button>
      <button className="circleButton transparentBac mdBtn ">reset🟡</button>
    </div>
  );
};

export default GamePanel;
