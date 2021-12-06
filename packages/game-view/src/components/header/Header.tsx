import React, { memo, useCallback, useMemo, useState } from 'react';
import gitHubLogin from '../../../../assets/images/login.png';
import tetris from '../../../../assets/images/tetris.png';
import musicOn from '../../../../assets/images/musical-notes.png';
import leaderBoard from '../../../../assets/images/leaderboard.png';
import musicOff from '../../../../assets/images/mute.png';
import audio from '../../../../assets/sounds/tetrisMain.mp3';
import { useNavigate } from 'react-router';

const Header: React.FC = () => {
  const [isAudioOn, setIsAudioOn] = useState(false);

  const navigate = useNavigate();

  const audioMain = useMemo(() => {
    const audioWork = new Audio(audio);
    //github.com/oblador/loki/issues/250
    audioWork.preload = 'none';
    audioWork.addEventListener(
      'ended',
      function () {
        this.currentTime = 0;
      },
      false
    );
    return audioWork;
  }, []);

  const playAudio = useMemo(() => {
    return () => {
      if (isAudioOn) {
        audioMain.play();
        setIsAudioOn((p) => !p);
      } else {
        audioMain.pause();
        setIsAudioOn((p) => !p);
        return null;
      }
    };
  }, [isAudioOn]);

  const login = useCallback(() => navigate('/login'), []);
  const tetrisRoute = useCallback(() => navigate('/'), []);

  return (
    <header className="siteHeader">
      <img
        alt="game play"
        className="btn-go-to-game"
        src={tetris.toString()}
        onClick={tetrisRoute}
      />

      <div className="sign" data-testid="welcome-label">
        <span className="fast-flicker">online </span>
        <span className="flicker"> tetris </span>
        <span className="fast-flicker"> championship</span>
      </div>

      <div className="Footer-Toolbar">
        <img alt="panda" className="octoCatLogo" src={String(leaderBoard)} />{' '}
        <img
          alt="panda"
          className="octoCatLogo"
          src={isAudioOn ? musicOn.toString() : musicOff.toString()}
          onClick={playAudio}
        />
        {/*<img*/}
        {/*  alt="help"*/}
        {/*  className="octoCatLogo"*/}
        {/*  src={help.toString()}*/}
        {/*  onClick={havigateToHelp}*/}
        {/*/>*/}
        <img
          alt="octocat login"
          className="octoCatLogo"
          src={gitHubLogin.toString()}
          onClick={login}
        />
      </div>
    </header>
  );
};

export default memo(Header);