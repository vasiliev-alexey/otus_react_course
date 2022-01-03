import React, { useCallback, useState } from 'react';
import help from '@images/iconmonstr-github-5.svg';
import google from '@images/google.svg';
import { Navigate, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginWithEmailAndPassword,
  loginWithGitHubAuth,
  loginWithGoogleAuth,
} from '@store/authSlice';
import { RootState } from '@store/store';

const gitHubLoginId = 'gitHubLoginId';
const googleSignId = 'googleSignId';

const Login: React.FC = () => {
  const [inputField, setInputField] = useState<{
    login: string;
    password: string;
  }>({
    login: '',
    password: '',
  });
  const navigate = useNavigate();

  const dispatchRedux = useDispatch();

  const [error, setError] = useState('');

  const inputLoginHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError('');
      setInputField({ ...inputField, login: e.target.value });
    },
    []
  );

  const inputPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setInputField({ ...inputField, password: e.target.value });
  };

  const onSignUp = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    navigate('/signup');
  };

  const onAuthLogin = useCallback(
    async (event) => {
      // let userData: UnPromisify<ReturnType<typeof signInWithGithub>>;
      try {
        if (event.target.id === gitHubLoginId) {
          dispatchRedux(loginWithGitHubAuth());
        } else if (event.target.id === googleSignId) {
          dispatchRedux(loginWithGoogleAuth());
        } else {
          event.preventDefault();
          dispatchRedux(
            loginWithEmailAndPassword({
              username: inputField.login,
              password: inputField.password,
            })
          );
        }
      } catch (e) {
        setError(e);
      }
    },
    [inputField]
  );

  const isAuth = useSelector<RootState>((state) => {
    return state.auth.isAuth;
  });

  return (
    <>
      {isAuth && <Navigate to="/" />}

      <div className="login-center" data-testid="login-form-test-id">
        <form id="login-form">
          <input
            onChange={inputLoginHandler}
            type="text"
            name="username"
            id="username-field"
            className="login-form-field"
            placeholder="Username"
            data-testid="login-input-test-id"
          />
          <input
            type="password"
            name="password"
            id="password-field"
            className="login-form-field"
            placeholder="Password"
            onChange={inputPasswordHandler}
          />
          {error && <div className="login-form-error"> {error.toString()}</div>}
          <div className="action-input">
            <input
              type="submit"
              value="Войти"
              className="login-form-button"
              onClick={onAuthLogin}
            />
            <input
              type="reset"
              value="Отмена"
              className="login-form-button"
              id="login-form-reset"
            />
          </div>

          <div className="login-enter-label">
            <input
              type="button"
              value="Зарегистрироваться"
              className="action-input  login-signup-button"
              onClick={onSignUp}
            />
          </div>
          <div className="action-input login-enter-label login-border">
            <p>Войти через:</p>
            <img
              id={gitHubLoginId}
              data-testid="gitHubLoginId"
              alt="github"
              className="login-btn"
              src={help.toString()}
              onClick={onAuthLogin}
            />
            <img
              alt="google"
              id={googleSignId}
              data-testid="googleSignId"
              className="login-btn"
              src={google.toString()}
              onClick={onAuthLogin}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
