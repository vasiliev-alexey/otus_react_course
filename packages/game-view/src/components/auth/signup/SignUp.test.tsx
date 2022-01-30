import '@testing-library/jest-dom';

import { Middleware } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import SignUp from './SignUp';

jest.mock('../../../api/auth', () => ({
  registerUser: jest.fn(() => {
    return {
      user: {
        uud: 'a',
        email: '1',
      },
    };
  }),
}));

const renderPage = (
  isAuth = false,
  history = createMemoryHistory({
    initialEntries: ['/aaa'],
    initialIndex: 0,
  })
): void => {
  const initialState = {
    auth: {
      userName: '',
      isAuth: isAuth,
    },
  };
  const middlewares: Middleware[] = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore(initialState);

  render(
    <Router location={'/aa'} navigator={history}>
      <Provider store={store}>
        <SignUp />
      </Provider>
    </Router>
  );
};
const renderPageWithError = (errMsg: string): void => {
  const history = createMemoryHistory({
    initialEntries: ['/aaa'],
    initialIndex: 0,
  });
  const initialState = {
    auth: {
      userName: '',
      isAuth: false,
      errorMessage: errMsg,
    },
  };
  const middlewares: Middleware[] = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore(initialState);

  render(
    <Router location={'/aa'} navigator={history}>
      <Provider store={store}>
        <SignUp />
      </Provider>
    </Router>
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

    const inputPass = screen.getByPlaceholderText('Пароль');
    expect(inputPass).toBeInTheDocument();
    userEvent.type(inputPass, 'ddd');
    expect(screen.getByTestId('login-pass-test-id')).toHaveValue('ddd');
    userEvent.click(btn);
    expect(screen.getByTestId('login-pass-test-id')).toHaveValue('');
  });

  test('SignUp register new user', () => {
    const btn = screen.getByText('Регистрация');
    expect(btn).toBeInTheDocument();
    const inputLogin = screen.getByPlaceholderText('Логин');
    expect(inputLogin).toBeInTheDocument();
    userEvent.type(inputLogin, 'ddd');
    expect(screen.getByTestId('login-input-test-id')).toHaveValue('ddd');
    const inputPass = screen.getByPlaceholderText('Пароль');
    expect(inputPass).toBeInTheDocument();
    userEvent.type(inputPass, 'ddd');
    expect(screen.getByTestId('login-pass-test-id')).toHaveValue('ddd');

    userEvent.click(btn);
  });
});

describe('test on expected state', () => {
  test('SignUp redirect if auth ', () => {
    const hist = createMemoryHistory({
      initialEntries: ['/aaa'],
      initialIndex: 0,
    });
    const pushRoute = jest.fn();
    hist.push = pushRoute;
    renderPage(true, hist);
    expect(pushRoute).nthCalledWith(
      1,
      {
        hash: '',
        pathname: '/',
        search: '',
      },
      undefined
    );
  });

  test('SignUp render eee ', () => {
    const errMsg = faker.hacker.phrase();
    renderPageWithError(errMsg);
    expect(screen.getByText(errMsg)).toBeInTheDocument();
  });
});
