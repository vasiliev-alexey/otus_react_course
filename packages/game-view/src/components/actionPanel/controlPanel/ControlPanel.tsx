import React from 'react';

const ControlPanel: React.FC = () => {
  return (
    <div className="controlPanel">
      <button className="circleButton mdBtn btnBackColor leftBtn">⬅</button>
      <button className="circleButton mdBtn btnBackColor topBtn">⬆</button>
      <button className="circleButton mdBtn btnBackColor downBtn">⬇</button>
      <button className="circleButton mdBtn btnBackColor rightBtn">➡</button>
    </div>
  );
};

export default ControlPanel;
