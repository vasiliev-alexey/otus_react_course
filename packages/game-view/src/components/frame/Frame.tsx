import React, { useEffect, useState } from 'react';
import '../../../public/index.scss';

import GameScreen from '../gamescreen/GameScreen';
import TitleBar from '../titleBar/TitleBar';
import ActionPanel from '../actionPanel/ActionPanel';

const handleKeyPress: React.KeyboardEventHandler = (event) => {
  console.log('enter press here! ');
  if (event.key === 'Enter') {
    console.log('enter press here! ');
  }
};

const Frame: React.FC = () => {
  const [isPause, setPause] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        console.log('Enter/pause');
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <>
      <div className="frame" onKeyPress={handleKeyPress}>
        <TitleBar />
        <GameScreen isPause={isPause} />
        <ActionPanel
          togglePause={() => {
            setPause((val) => {
              return !val;
            });
          }}
        />
      </div>
    </>
  );
};

export default Frame;
