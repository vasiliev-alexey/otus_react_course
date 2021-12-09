import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context';

const LogOut: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const submitHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <div className="login-center" data-testid="logout-form-test-id">
      <form id="login-form">
        <p>Выйти из учетной записи</p>
        <div className="action-input">
          <input
            data-testid="logout-btn"
            type="submit"
            value="Выход"
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

export default LogOut;
