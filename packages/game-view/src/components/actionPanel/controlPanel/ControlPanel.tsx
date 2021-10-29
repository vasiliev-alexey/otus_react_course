import React from 'react';

const ControlPanel: React.FC = () => {
  return (
    <div className="controlPanel">
      <button className="circleButton smBtn redBack leftBtn">⬅</button>
      <button className="circleButton smBtn redBack topBtn">⬆</button>
      <button className="circleButton smBtn redBack downBtn">⬇</button>
      <button className="circleButton smBtn redBack rightBtn">➡</button>
    </div>
  );
};

export default ControlPanel;
