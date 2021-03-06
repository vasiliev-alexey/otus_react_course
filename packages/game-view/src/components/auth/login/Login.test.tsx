import '@testing-library/jest-dom';

import { Middleware } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import { createMemoryHistory } from 'history';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter, Router } from 'react-router';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Login from './Login';

const middlewares: Middleware[] = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../../api/auth', () => ({
  doSignInWithEmailAndPassword: jest.fn(() => {
    return {
      user: {
        uud: 'a',
        email: '1',
      },
    };
  }),
}));

const initialState = {
  auth: {
    userName: 'userName',
    isAuth: false,
  },
};

const store = mockStore(initialState);

const renderPage = (): void => {
  render(
    <MemoryRouter>
      <Provider store={store}>
        <Login />
      </Provider>
    </MemoryRouter>
  );
};

describe('login comp is function', () => {
  beforeEach(() => {
    renderPage();
  });

  test('login is function', () => {
    expect(Login).toBeInstanceOf(Object);
  });

  test('login must be render in page', () => {
    expect(screen.getByTestId('login-form-test-id')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByTestId('gitHubLoginId')).toBeInTheDocument();
    expect(screen.getByTestId('googleSignId')).toBeInTheDocument();
  });

  test('login must have button submit and cancel', () => {
    expect(screen.getByText('Войти')).toBeInTheDocument();
    expect(screen.getByText('Отмена')).toBeInTheDocument();
  });

  test('login must have button reset', () => {
    const btn = screen.getByText('Отмена');
    expect(btn).toBeInTheDocument();
    const inputLogin = screen.getByPlaceholderText('Username');
    expect(inputLogin).toBeInTheDocument();
    userEvent.type(inputLogin, 'ddd');
    expect(screen.getByTestId('login-input-test-id')).toHaveValue('ddd');
    userEvent.click(btn);
    expect(screen.getByTestId('login-input-test-id')).toHaveValue('');
  });
});

describe('login  behaviour', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    renderPage();
    store.clearActions();
  });

  test('login call siginin', async () => {
    const btn = screen.getByText('Войти');
    expect(btn).toBeInTheDocument();
    const inputLogin = screen.getByPlaceholderText('Username');
    expect(inputLogin).toBeInTheDocument();

    await act(async () => {
      userEvent.type(inputLogin, 'ddd');
    });

    expect(screen.getByTestId('login-input-test-id')).toHaveValue('ddd');
    await act(async () => {
      userEvent.click(btn);
    });

    const expectedActions = store.getActions();
    expect(expectedActions).toHaveLength(1);
    expect(expectedActions[0].type).toBe('auth/loginWithNameAndPass');
    expect(expectedActions[0].payload).toEqual({ login: 'ddd', password: '' });
  });

  test('login call siginin with GitHub', async () => {
    const btn = screen.getByTestId('gitHubLoginId');
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);
    const expectedActions = store.getActions();
    expect(expectedActions).toHaveLength(1);
    expect(expectedActions[0].type).toBe('auth/loginWithGitHubAuth');
  });

  test('login call siginin with Google', async () => {
    const btn = screen.getByTestId('googleSignId');
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);

    const expectedActions = store.getActions();
    expect(expectedActions).toHaveLength(1);
    expect(expectedActions[0].type).toBe('auth/google');
  });

  test('login call siginin with Name and pass', async () => {
    const inputPass = screen.getByTestId('pass-input-test-id');
    const inputLogin = screen.getByTestId('login-input-test-id');

    expect(inputPass).toBeInTheDocument();
    expect(inputLogin).toBeInTheDocument();

    const name = faker.name.lastName();
    const pass = faker.datatype.string(10);

    fireEvent.change(inputLogin, { target: { value: name } });
    fireEvent.change(inputPass, { target: { value: pass } });

    expect(screen.getByTestId('login-input-test-id')).toHaveValue(name);
    expect(screen.getByTestId('pass-input-test-id')).toHaveValue(pass);
  });
});

describe('test redirect to register', () => {
  test('login page have link to register', async () => {
    const history = createMemoryHistory({
      initialEntries: ['/aaa'],
      initialIndex: 0,
    });
    const pushRoute = jest.fn();
    history.push = pushRoute;

    render(
      <Router location={''} navigator={history}>
        <Provider store={store}>
          <Login />
        </Provider>
      </Router>
    );
    expect(history.location.pathname).toBe('/aaa');

    const btnRegister = screen.getByRole('button', {
      name: /Зарегистрироваться/i,
    });
    expect(btnRegister).toBeInTheDocument();
    userEvent.click(btnRegister);

    expect(pushRoute).nthCalledWith(
      1,
      { hash: '', pathname: '/signup', search: '' },
      undefined
    );
  });

  test('login page redirect to root if auth', async () => {
    const history = createMemoryHistory({
      initialEntries: ['/aaa'],
      initialIndex: 0,
    });
    const pushRoute = jest.fn();
    history.push = pushRoute;

    const initialState = {
      auth: {
        userName: 'userName',
        isAuth: true,
      },
    };

    const store = mockStore(initialState);

    expect(history.location.pathname).toBe('/aaa');

    render(
      <Router location={''} navigator={history}>
        <Provider store={store}>
          <Login />
        </Provider>
      </Router>
    );

    expect(pushRoute).nthCalledWith(
      1,
      { hash: '', pathname: '/', search: '' },
      undefined
    );
  });
});
