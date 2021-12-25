import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { doLogOut } from '../../../store/authSlice';
import { RootState } from '../../../store/store';

const LogOut: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(doLogOut());
  };

  const submitExit = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    navigate('/');
  };

  const isAuth = useSelector<RootState>((state) => state.auth.isAuth);
  return (
    <>
      {!isAuth && <Navigate to="/" />}
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
              onClick={submitExit}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default LogOut;
