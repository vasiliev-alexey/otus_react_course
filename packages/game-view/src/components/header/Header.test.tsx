import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import { Router } from 'react-router';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Middleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const defaultHistory = createMemoryHistory({
  initialEntries: ['/aaa'],
  initialIndex: 0,
});

const renderPage = (history: MemoryHistory = defaultHistory): void => {
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
    <Router location={''} navigator={history}>
      <Provider store={store}>
        <Header />
      </Provider>
    </Router>
  );
};

describe('Test header component', () => {
  let playBackup: () => Promise<void>;
  let pauseBackup: () => void;

  beforeAll(() => {
    playBackup = window.HTMLMediaElement.prototype.play;
    pauseBackup = window.HTMLMediaElement.prototype.pause;

    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
  });
  afterAll(() => {
    window.HTMLMediaElement.prototype.play = playBackup;
    window.HTMLMediaElement.prototype.pause = pauseBackup;
  });

  beforeEach(() => renderPage());

  test('Header component is a function', () => {
    expect(Header).toBeInstanceOf(Object);
  });

  test('Frame must be render in page', () => {
    const greeting = screen.getByTestId('welcome-label');
    expect(greeting).toBeInTheDocument();
  });
});

describe('Test header component', () => {
  const history = createMemoryHistory({
    initialEntries: ['/aaa'],
    initialIndex: 0,
  });
  const pushRoute = jest.fn();
  history.push = pushRoute;

  beforeEach(() => renderPage(history));

  test('Header call game button - must redirect to /', () => {
    expect(history.location.pathname).toBe('/aaa');
    const btn2root = screen.getByTestId('btn-go-to-game');
    expect(btn2root).toBeInTheDocument();
    userEvent.click(btn2root);

    expect(pushRoute).nthCalledWith(
      1,
      { hash: '', pathname: '/', search: '' },
      undefined
    );
  });
});
