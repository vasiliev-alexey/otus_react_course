import React, { useEffect } from 'react';

export interface ControlPanelProps {
  left: () => void;
  right: () => void;
  down: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ left, down, right }) => {
  return (
    <div className="controlPanel">
      <button
        data-testid="btn-left"
        className="circleButton mdBtn btnBackColor leftBtn"
        onClick={left}
      >
        ⬅
      </button>
      <button
        className="circleButton mdBtn btnBackColor topBtn"
        data-testid="btn-top"
      >
        ⬆
      </button>
      <button
        className="circleButton mdBtn btnBackColor downBtn"
        onClick={down}
        data-testid="btn-down"
      >
        ⬇
      </button>
      <button
        className="circleButton mdBtn btnBackColor rightBtn"
        onClick={right}
        data-testid="btn-right"
      >
        ➡
      </button>
    </div>
  );
};

export default ControlPanel;
