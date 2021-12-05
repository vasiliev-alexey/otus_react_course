import React from 'react';

//up-arrow

import upArrow from '../../../../../../assets/images/move-up-svgrepo-com.svg';

export interface ControlPanelProps {
  left: () => void;
  right: () => void;
  down: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ left, down, right }) => {
  return (
    <div className="controlPanel">
      <img
        data-testid="btn-left"
        className="circleButton mdBtn btnBackColor leftBtn"
        onClick={left}
        src={upArrow.toString()}
      />

      <img
        className="circleButton mdBtn btnBackColor topBtn"
        data-testid="btn-top"
        src={upArrow.toString()}
      />
      <img
        className="circleButton mdBtn btnBackColor downBtn"
        onClick={down}
        data-testid="btn-down"
        src={upArrow.toString()}
      />
      <img
        className="circleButton mdBtn btnBackColor rightBtn"
        onClick={right}
        data-testid="btn-right"
        src={upArrow.toString()}
      />
    </div>
  );
};

export default ControlPanel;
