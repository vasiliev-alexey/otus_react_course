import React from 'react';

type GamePanelPropsType = {
  togglePause: () => void;
};

const GamePanel: React.FC<GamePanelPropsType> = ({ togglePause }) => {
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
