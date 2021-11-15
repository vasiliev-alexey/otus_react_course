import React from 'react';

export interface GamePanelProps {
  togglePause: () => void;
  reset: () => void;
  isPause: boolean;
}

const GamePanel: React.FC<GamePanelProps> = ({
  togglePause,
  reset,
  isPause,
}) => {
  return (
    <div className="gamePanel">
      <button
        data-testid="GamePanel-pause-btb"
        className="circleButton transparentBac mdBtn"
        onClick={togglePause}
      >
        {(isPause != undefined && !isPause ? 'pause' : 'start') + '🟡'}
      </button>
      <button className="circleButton transparentBac smBtn">sound🟡</button>
      <button onClick={reset} className="circleButton transparentBac mdBtn ">
        reset🟡
      </button>
    </div>
  );
};

export default GamePanel;
