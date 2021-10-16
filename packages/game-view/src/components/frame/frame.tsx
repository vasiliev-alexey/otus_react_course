import React from 'react';
import '../../../public/index.scss';
import Playfield from '../playfield/Playfield';

const Frame: React.FC = () => {
  return (
    <div className="frame">
      <Playfield />
    </div>
  );
};

export default Frame;
