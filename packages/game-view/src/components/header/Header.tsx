import React, { useCallback, useMemo, useState } from 'react';
import gitHubLogin from '../../../../assets/images/login.png';
import tetris from '../../../../assets/images/tetris.png';
import musicOn from '../../../../assets/images/musical-notes.png';
import leaderBoard from '../../../../assets/images/leaderboard.png';
import musicOff from '../../../../assets/images/mute.png';
import avatar from '../../../../assets/images/avatar.png';
import audio from '../../../../assets/sounds/tetrisMain.mp3';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { AuthStateType } from '../../store/authSlice';

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
        <img alt="panda" className="octoCatLogo" src={String(leaderBoard)} />
        <img
          alt="panda"
          className="octoCatLogo"
          src={isAudioOn ? musicOn.toString() : musicOff.toString()}
          onClick={playAudio}
        />
        {!isAuth && (
          <img
            alt="octocat login"
            className="octoCatLogo"
            src={gitHubLogin.toString()}
            onClick={login}
          />
        )}
        {isAuth && (
          <span>
            <img
              alt="octocat login"
              className="octoCatLogo"
              src={userPict || avatar.toString()}
              onClick={showExit}
            />
            {showMenu && (
              <ul className="profileMenu">
                <li onClick={logout}>Выход</li>
              </ul>
            )}
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
