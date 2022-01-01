import React from 'react';
import rotation from '../../../../../../assets/images/rotate-option-svgrepo-com.svg';
export interface RotationPanelProps {
  rotate: () => void;
}

const RotationPanel: React.FC<RotationPanelProps> = ({ rotate }) => {
  return (
    <div className="rotationPanel">
      <img
        style={{
          height: '60px',
          width: '60px',
          padding: '10px',
          filter:
            'invert(0%) yellow(60%) saturate(100%) hue-rotate(87deg) brightness(119%) contrast(119%)',
        }}
        sizes={'32px'}
        className="circleButton  yellowBackground lgBtn "
        onClick={rotate}
        src={rotation.toString()}
      ></img>
    </div>
  );
};

export default RotationPanel;
