import google from '@images/google.svg';
import help from '@images/iconmonstr-github-5.svg';
import {
  loginWithGitHubAuth,
  loginWithGoogleAuth,
  loginWithNameAndPass,
} from '@store/authSlice';
import { RootState } from '@store/store';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';

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

  const dispatch = useDispatch();

  //const [error, setError] = useState('');

  const inputLoginHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // setError('');
      setInputField({ ...inputField, login: e.target.value });
    },
    []
  );

  const inputPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //  setError('');
    setInputField({ ...inputField, password: e.target.value });
  };

  const onSignUp = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    navigate('/signup');
  };

  const onAuthLogin = useCallback(
    async (event) => {
      if (event.target.id === gitHubLoginId) {
        dispatch(loginWithGitHubAuth());
      } else if (event.target.id === googleSignId) {
        dispatch(loginWithGoogleAuth());
      } else {
        event.preventDefault();
        dispatch(
          loginWithNameAndPass({
            login: inputField.login,
            password: inputField.password,
          })
        );
      }
    },
    [inputField]
  );

  const isAuth = useSelector<RootState>((state) => {
    return state.auth.isAuth;
  });
  const authError = useSelector<RootState>((state) => {
    return state.auth.errorMessage;
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
            data-testid="pass-input-test-id"
            name="password"
            id="password-field"
            className="login-form-field"
            placeholder="Password"
            onChange={inputPasswordHandler}
          />
          {authError && <div className="login-form-error">{authError}</div>}
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
