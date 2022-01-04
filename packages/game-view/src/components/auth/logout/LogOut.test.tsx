import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import LogOut from './LogOut';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import thunk from 'redux-thunk';
import { Middleware, Store } from '@reduxjs/toolkit';

jest.mock('../../../api/auth', () => ({
  doSignOut: jest.fn(() => {
    return;
  }),
}));

const middlewares: Middleware[] = [thunk];
const mockStore = configureStore(middlewares);

describe('LogOut comp is function', () => {
  test('LogOut is function', () => {
    expect(LogOut).toBeInstanceOf(Object);
  });

  test('LogOut must be render in page', () => {
    const initialState = {
      auth: {
        userName: 'userName',
        isAuthenticated: true,
      },
    };
    const store = mockStore(initialState);
    const history = createMemoryHistory({
      initialEntries: ['/aaa'],
      initialIndex: 0,
    });
    render(
      <Provider store={store}>
        <Router location={''} navigator={history}>
          <LogOut />
        </Router>
      </Provider>
    );

    expect(screen.getByTestId('logout-form-test-id')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /выход/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /отмена/i })).toBeInTheDocument();
  });
});

describe('LogOut comp behaviour', () => {
  let store: Store;

  beforeEach(() => {
    const initialState = {
      auth: {
        userName: 'userName',
        isAuthenticated: true,
      },
    };
    store = mockStore(initialState);
  });

  const history = createMemoryHistory({
    initialEntries: ['/aaa'],
    initialIndex: 0,
  });
  const pushRoute = jest.fn();
  history.push = pushRoute;

  test('LogOut must have button submit and click goto /', () => {
    expect(history.location.pathname).toBe('/aaa');

    render(
      <Router location={''} navigator={history}>
        <Provider store={store}>
          <LogOut />
        </Provider>
      </Router>
    );
    expect(history.location.pathname).toBe('/aaa');
    const btnCancel = screen.getByRole('button', { name: /выход/i });
    expect(btnCancel).toBeInTheDocument();
    userEvent.click(btnCancel);

    expect(pushRoute).nthCalledWith(
      1,
      { hash: '', pathname: '/', search: '' },
      undefined
    );
  });

  test('LogOut must have button exit and click goto /', () => {
    expect(history.location.pathname).toBe('/aaa');
    render(
      <Router location={''} navigator={history}>
        <Provider store={store}>
          <LogOut />
        </Provider>
      </Router>
    );
    expect(history.location.pathname).toBe('/aaa');
    const btnCancel = screen.getByRole('button', { name: /отмена/i });
    expect(btnCancel).toBeInTheDocument();
    userEvent.click(btnCancel);

    expect(pushRoute).nthCalledWith(
      1,
      { hash: '', pathname: '/', search: '' },
      undefined
    );
  });
});
