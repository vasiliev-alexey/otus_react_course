import React from 'react';

import audio from '../../../../../assets/sounds/tetrisMain.mp3';

export interface GamePanelProps {
  togglePause: () => void;
}

const GamePanel: React.FC<GamePanelProps> = ({ togglePause }) => {
  const playAudio = () => {
    const audioMain = new Audio(audio);

    audioMain.addEventListener(
      'ended',
      function () {
        this.currentTime = 0;
        this.play();
      },
      false
    );

    audioMain.play();
  };

  return (
    <div className="gamePanel">
      <button
        data-testid="GamePanel-pause-btb"
        className="circleButton transparentBac smBtn"
        onClick={togglePause}
      >
        pause🟡
      </button>
      <button className="circleButton transparentBac smBtn" onClick={playAudio}>
        music🟡
      </button>
      <button className="circleButton transparentBac smBtn ">reset🟡</button>

      {/*<audio className="audio-element">*/}
      {/*  <source src="../../../../../assets/sounds/tetrisMain.mp3"></source>*/}
      {/*</audio>*/}
    </div>
  );
};

export default GamePanel;
