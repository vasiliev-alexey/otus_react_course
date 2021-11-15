import React from 'react';

export interface RotationPanelProps {
  rotate: () => void;
}

const RotationPanel: React.FC<RotationPanelProps> = ({ rotate }) => {
  return (
    <div className="rotationPanel">
      <button className="circleButton btnBackColor lgBtn" onClick={rotate}>
        ↩
      </button>
    </div>
  );
};

export default RotationPanel;
