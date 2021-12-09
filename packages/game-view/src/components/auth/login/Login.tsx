import React, { useCallback, useState } from 'react';
import help from '../../../../../assets/images/iconmonstr-github-5.svg';
import google from '../../../../../assets/images/google.png';
import { useNavigate } from 'react-router';
import { githubSignin, signInWithGoogle } from '../../../api/auth';
import { useAuthContext } from '../../../context';

const gitHubLoginId = 'gitHubLoginId';
const googleSignId = 'googleSignId';
type UnPromisify<T> = T extends Promise<infer U> ? U : T;

const Login: React.FC = () => {
  const [inputField, setInputField] = useState({
    login: '',
    password: '',
  });
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const inputLoginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputField({ ...inputField, login: e.target.value });
  };
  const inputPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputField({ ...inputField, password: e.target.value });
  };

  // const submitHandler = (e: React.MouseEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  // };

  const onSignUp = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    navigate('/signup');
  };

  const onAuthLogin = useCallback(async (d) => {
    let userData: UnPromisify<ReturnType<typeof githubSignin>>;
    if (d.target.id === gitHubLoginId) {
      userData = await githubSignin();
      dispatch({ type: 'SET_USER_NAME', payload: userData.displayName });
    } else if (d.target.id === googleSignId) {
      userData = await signInWithGoogle();
      dispatch({ type: 'SET_USER_NAME', payload: userData.displayName });
    } else {
      d.preventDefault();
    }
    if (userData?.uid) {
      navigate('/');
    }
  }, []);

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
            alt="github"
            className="login-btn"
            src={help.toString()}
            onClick={onAuthLogin}
          />
          <img
            alt="google"
            id={googleSignId}
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
