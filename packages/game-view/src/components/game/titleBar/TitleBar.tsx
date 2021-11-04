import React from 'react';

const TitleBar: React.FC = () => {
  return (
    <>
      <p className="sound-block">⚫⚫⚫⚫⚫</p>
      <div className="titleBar">
        <p className="tetrisFont">
          <span className="colorT1">T</span>
          <span className="colorE">E</span>
          <span className="colorT2">T</span>
          <span className="colorR">R</span>
          <span className="colorI">I</span>
          <span className="colorS">S</span>
        </p>
      </div>
    </>
  );
};

export default TitleBar;
