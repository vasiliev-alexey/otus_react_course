import React, { useState } from 'react';
import help from '../../../../../assets/images/iconmonstr-github-5.svg';
import google from '../../../../../assets/images/google.png';
import { useNavigate } from 'react-router';

const Login: React.FC = () => {
  const [inputField, setInputField] = useState({
    login: '',
    password: '',
  });
  const navigate = useNavigate();

  const inputLoginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputField({ ...inputField, login: e.target.value });
  };
  const inputPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputField({ ...inputField, password: e.target.value });
  };

  const submitHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const onSignUp = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    navigate('/signup');
  };

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
            onClick={submitHandler}
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
          <img alt="github" className="login-btn" src={help.toString()} />
          <img alt="google" className="login-btn" src={google.toString()} />
        </div>
      </form>
    </div>
  );
};

export default Login;
