import { registerUserWithNameAndPass } from '@store/authSlice';
import { RootState } from '@store/store';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const SignUp: React.FC = () => {
  const [inputField, setInputField] = useState({
    login: '',
    password: '',
  });

  const dispatch = useDispatch();
  const inputLoginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputField({ ...inputField, login: e.target.value });
  };
  const inputPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputField({ ...inputField, password: e.target.value });
  };

  const submitHandler = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(
      registerUserWithNameAndPass({
        login: inputField.login,
        password: inputField.password,
      })
    );
  };

  const isAuth = useSelector<RootState>((state) => {
    return state.auth.isAuth;
  });

  const error = useSelector<RootState>((state) => {
    return state.auth.errorMessage;
  });

  return (
    <>
      {isAuth && <Navigate to="/" />}

      <div className="login-center" data-testid="signup-form-test-id">
        <form id="login-form">
          <input
            onChange={inputLoginHandler}
            type="text"
            name="username"
            id="username-field"
            className="login-form-field"
            placeholder="Логин"
            data-testid="login-input-test-id"
          />
          <input
            type="password"
            name="password"
            id="password-field"
            className="login-form-field"
            placeholder="Пароль"
            onChange={inputPasswordHandler}
          />
          {error && <div className="login-form-error"> {error.toString()}</div>}
          <div className="action-input">
            <input
              type="submit"
              value="Регистрация"
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
        </form>
      </div>
    </>
  );
};

export default SignUp;
