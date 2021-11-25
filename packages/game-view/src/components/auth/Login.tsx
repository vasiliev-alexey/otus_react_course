import React, { useState } from 'react';

const Login: React.FC = () => {
  const [inputField, setInputField] = useState({
    login: '',
    password: '',
  });

  const inputLoginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputField({ ...inputField, login: e.target.value });
  };
  const inputPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputField({ ...inputField, password: e.target.value });
  };

  const submitHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
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
            value="Login"
            className="login-form-button"
            onClick={submitHandler}
          />
          <input
            type="reset"
            value="Cancel"
            className="login-form-button"
            id="login-form-reset"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;