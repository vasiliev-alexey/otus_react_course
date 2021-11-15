import React from 'react';

export interface ControlPanelProps {
  left: () => void;
  right: () => void;
  down: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ left, down, right }) => {
  return (
    <div className="controlPanel">
      <button
        className="circleButton mdBtn btnBackColor leftBtn"
        onClick={left}
      >
        ⬅
      </button>
      <button className="circleButton mdBtn btnBackColor topBtn">⬆</button>
      <button
        className="circleButton mdBtn btnBackColor downBtn"
        onClick={down}
      >
        ⬇
      </button>
      <button
        className="circleButton mdBtn btnBackColor rightBtn"
        onClick={right}
      >
        ➡
      </button>
    </div>
  );
};

export default ControlPanel;
