import React, { useState } from 'react';
import { registerUser } from '../../../api/auth';
import { useAuthContext } from '../../../context';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [inputField, setInputField] = useState({
    login: '',
    password: '',
  });

  const [error, setError] = useState('');

  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const inputLoginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputField({ ...inputField, login: e.target.value });
  };
  const inputPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputField({ ...inputField, password: e.target.value });
  };

  const submitHandler = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const data = await registerUser(inputField.login, inputField.password);

      if (data.operationType === 'signIn') {
        dispatch({
          type: 'SET_USER_NAME',
          payload: {
            userName: data.user.email,
            userPictUrl: '',
            uid: data.user.uid,
          },
        });
      }
      navigate('/');
    } catch (e) {
      setError(e);
    }
  };

  return (
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
  );
};

export default SignUp;
