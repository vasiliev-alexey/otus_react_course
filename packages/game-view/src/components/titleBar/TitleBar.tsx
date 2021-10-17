import React from 'react';

const TitleBar: React.FC = () => {
  return (
    <div className="titleBar">
      <p className="tetrisFont">
        <span style={{ color: 'blue' }}>T</span>
        <span style={{ color: 'red' }}>E</span>
        <span style={{ color: 'green' }}>T</span>
        <span style={{ color: 'white' }}>R</span>
        <span style={{ color: 'red' }}>I</span>
        <span style={{ color: 'yellow' }}>S</span>
      </p>
    </div>
  );
};

export default TitleBar;
