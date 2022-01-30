import avatar from '@images/avatar.svg';
import leaderBoard from '@images/leaderboard.svg';
import gitHubLogin from '@images/login.svg';
import musicOff from '@images/sound_off.svg';
import musicOn from '@images/sound_on.svg';
import tetris from '@images/tetris.svg';
import audio from '@sounds/tetrisMain.mp3';
import { AuthStateType } from '@store/authSlice';
import { RootState } from '@store/store';
import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
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

  const [showMenu, setShowMenu] = useState(false);

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
  const { isAuth, userPict, userName } = useSelector<RootState, AuthStateType>(
    (st) => st.auth
  );
  const login = useCallback(() => navigate('/login'), []);
  const leaderboard = useCallback(() => navigate('/leaderboard'), []);
  const showExit = useCallback(() => {
    setShowMenu((s) => !s);

    window.setTimeout(() => {
      if (showExit) {
        setShowMenu(false);
      }
    }, 10000);
  }, []);
  const logout = useCallback(() => {
    showExit();
    navigate('/logout');
  }, []);

  const tetrisRoute = useCallback(() => {
    navigate('/');
  }, []);

  return (
    <header className="siteHeader">
      <img
        alt="game play"
        className="btn-go-to-game"
        src={tetris.toString()}
        onClick={tetrisRoute}
        data-testid="btn-go-to-game"
      />

      <div className="sign" data-testid="welcome-label">
        <span className="fast-flicker">online </span>
        <span className="flicker"> tetris </span>
        <span className="fast-flicker"> championship</span>
      </div>

      {isAuth && <p className="user-name-label"> Player: {userName}</p>}

      <div className="Footer-Toolbar">
        <img
          alt="panda"
          className="octoCatLogo"
          src={String(leaderBoard)}
          onClick={leaderboard}
        />
        <img
          alt="panda"
          data-testid="btn-music-main"
          className="octoCatLogo"
          src={isAudioOn ? musicOn.toString() : musicOff.toString()}
          onClick={playAudio}
        />
        {!isAuth && (
          <img
            alt="octocat login"
            data-testid="btn-login-form"
            className="octoCatLogo"
            src={gitHubLogin.toString()}
            onClick={login}
          />
        )}
        {isAuth && (
          <span>
            <img
              alt="octocat login"
              data-testid="btn-logout-form"
              className="octoCatLogo"
              src={userPict || avatar.toString()}
              onClick={showExit}
            />
            {showMenu && (
              <ul className="profileMenu" data-testid="ul-exit-link">
                <li data-testid="li-exit-link" onClick={logout}>
                  Выход
                </li>
              </ul>
            )}
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
