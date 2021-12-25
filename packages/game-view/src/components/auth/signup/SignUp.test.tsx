import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import SignUp from './SignUp';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import thunk from 'redux-thunk';
import { Middleware } from '@reduxjs/toolkit';

const renderPage = (): void => {
  const initialState = {
    auth: {
      userName: '',
      isAuthenticated: false,
    },
  };
  const middlewares: Middleware[] = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore(initialState);

  render(
    <MemoryRouter>
      <Provider store={store}>
        <SignUp />
      </Provider>
    </MemoryRouter>
  );
};

describe('SignUp comp is function', () => {
  beforeEach(() => {
    renderPage();
  });

  test('SignUp is function', () => {
    expect(SignUp).toBeInstanceOf(Object);
  });

  test('SignUp must be render in page', () => {
    expect(screen.getByTestId('signup-form-test-id')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Логин')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Пароль')).toBeInTheDocument();
  });

  test('SignUp must have button submit and cancel', () => {
    expect(screen.getByText('Регистрация')).toBeInTheDocument();
    expect(screen.getByText('Отмена')).toBeInTheDocument();
  });

  test('SignUp must have button reset', () => {
    const btn = screen.getByText('Отмена');
    expect(btn).toBeInTheDocument();
    const inputLogin = screen.getByPlaceholderText('Логин');
    expect(inputLogin).toBeInTheDocument();
    userEvent.type(inputLogin, 'ddd');
    expect(screen.getByTestId('login-input-test-id')).toHaveValue('ddd');
    userEvent.click(btn);
    expect(screen.getByTestId('login-input-test-id')).toHaveValue('');
  });
});
