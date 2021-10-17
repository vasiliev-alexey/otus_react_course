import React from 'react';

const ControlPanel: React.FC = () => {
  return (
    <div className="rotationPanel">
      <button className="circleButton smBtn redBack">⬅️</button>
      <button className="circleButton smBtn redBack">⬇</button>
      <button className="circleButton smBtn redBack">➡️</button>
    </div>
  );
};

export default ControlPanel;
