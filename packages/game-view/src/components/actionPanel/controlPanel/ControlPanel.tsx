import React from 'react';

const ControlPanel: React.FC = () => {
  return (
    <div className="controlPanel">
      <button className="circleButton mdBtn redBack leftBtn">⬅</button>
      <button className="circleButton mdBtn redBack topBtn">⬆</button>
      <button className="circleButton mdBtn redBack downBtn">⬇</button>
      <button className="circleButton mdBtn redBack rightBtn">➡</button>
    </div>
  );
};

export default ControlPanel;
