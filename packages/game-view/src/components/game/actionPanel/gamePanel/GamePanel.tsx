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
        className="circleButton smBtn btnBackColor btnMiddle"
        onClick={togglePause}
        data-testid="GamePanel-pause-btb"
      >
        {isPause != undefined && !isPause ? 'pause' : 'start'}
      </button>
      <button
        className="circleButton smBtn btnBackColor btnMiddle"
        data-testid="GamePanel-sound-btb"
      >
        sound
      </button>

      <button
        onClick={reset}
        className="circleButton smBtn btnBackColor btnMiddle"
        data-testid="GamePanel-reset-btb"
      >
        reset
      </button>
    </div>
  );
};

export default GamePanel;
