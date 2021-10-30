import React, { useMemo, useState } from 'react';

import audio from '../../../../../assets/sounds/tetrisMain.mp3';

export interface GamePanelProps {
  togglePause: () => void;
}

const GamePanel: React.FC<GamePanelProps> = ({ togglePause }) => {
  const [isAudioOn, setIsAudioOn] = useState(true);

  const audioMain = useMemo(() => {
    const audioWork = new Audio(audio);
    audioWork.addEventListener(
      'ended',
      function () {
        this.currentTime = 0;
        this.play();
      },
      false
    );
    return audioWork;
  }, []);

  const playAudio = () => {
    if (isAudioOn) {
      console.log('play');
      audioMain.play();
      setIsAudioOn((p) => !p);
    } else {
      audioMain.pause();
      setIsAudioOn((p) => !p);
      console.log('paused');
    }
  };

  return (
    <div className="gamePanel">
      <button
        data-testid="GamePanel-pause-btb"
        className="circleButton transparentBac mdBtn"
        onClick={togglePause}
      >
        pause🟡
      </button>
      <button className="circleButton transparentBac smBtn" onClick={playAudio}>
        sound🟡
      </button>
      <button className="circleButton transparentBac mdBtn ">reset🟡</button>

      {/*<audio className="audio-element">*/}
      {/*  <source src="../../../../../assets/sounds/tetrisMain.mp3"></source>*/}
      {/*</audio>*/}
    </div>
  );
};

export default GamePanel;
