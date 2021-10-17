import React from 'react';
import '../../../public/index.scss';

import GameScreen from '../gamescreen/GameScreen';
import TitleBar from '../titleBar/TitleBar';
import ActionPanel from '../actionPanel/ActionPanel';

const Frame: React.FC = () => {
  return (
    <>
      <div className="frame">
        <TitleBar />
        <GameScreen />
        <ActionPanel />
      </div>
    </>
  );
};

export default Frame;
