import React, { useCallback, useState } from 'react';
import help from '../../../../../assets/images/iconmonstr-github-5.svg';
import google from '../../../../../assets/images/google.png';
import { useNavigate } from 'react-router';
import {
  doSignInWithEmailAndPassword,
  signInWithGithub,
  signInWithGoogle,
} from '../../../api/auth';
import { useAuthContext } from '../../../context';

const gitHubLoginId = 'gitHubLoginId';
const googleSignId = 'googleSignId';
type UnPromisify<T> = T extends Promise<infer U> ? U : T;

const Login: React.FC = () => {
  const [inputField, setInputField] = useState<{
    login: string;
    password: string;
  }>({
    login: '',
    password: '',
  });
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

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
      let userData: UnPromisify<ReturnType<typeof signInWithGithub>>;
      try {
        if (event.target.id === gitHubLoginId) {
          userData = await signInWithGithub();
        } else if (event.target.id === googleSignId) {
          userData = await signInWithGoogle();
        } else {
          event.preventDefault();
          const data = await doSignInWithEmailAndPassword(
            inputField.login,
            inputField.password
          );

          userData = {
            uid: data.user.uid,
            displayName: data.user.email,
            photoUrl: '',
          };
        }
      } catch (e) {
        setError(e);
      }

      if (userData) {
        dispatch({
          type: 'SET_USER_NAME',
          payload: {
            userName: userData.displayName,
            userPictUrl: userData.photoUrl,
            uid: userData.uid,
          },
        });
      }

      if (userData?.uid) {
        navigate('/');
      }
    },
    [inputField]
  );
  return (
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
  );
};

export default Login;
