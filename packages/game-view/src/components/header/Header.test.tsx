import '@testing-library/jest-dom';

import { Middleware } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Header from './Header';

const defaultHistory = createMemoryHistory({
  initialEntries: ['/aaa'],
  initialIndex: 0,
});

const renderPage = (history = defaultHistory, isAuth = false): void => {
  const initialState = {
    auth: {
      userName: isAuth ? 'admin' : '',
      isAuth,
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

describe('Test header component - click to game', () => {
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

describe('Test header button music play', () => {
  let playBackup: () => Promise<void>;
  let pauseBackup: () => void;

  const playElement = jest.fn();
  const pauseElement = jest.fn();

  beforeAll(() => {
    playBackup = window.HTMLMediaElement.prototype.play;
    pauseBackup = window.HTMLMediaElement.prototype.pause;

    window.HTMLMediaElement.prototype.play = playElement;
    window.HTMLMediaElement.prototype.pause = pauseElement;
  });
  afterAll(() => {
    window.HTMLMediaElement.prototype.play = playBackup;
    window.HTMLMediaElement.prototype.pause = pauseBackup;
  });

  const history = createMemoryHistory({
    initialEntries: ['/aaa'],
    initialIndex: 0,
  });
  const pushRoute = jest.fn();
  history.push = pushRoute;

  beforeEach(() => renderPage());

  test('Header  must have a button to on/off music', () => {
    const btnMusic = screen.getByTestId('btn-music-main');
    expect(btnMusic).toBeInTheDocument();
    userEvent.click(btnMusic);
    expect(pauseElement).toHaveBeenCalledTimes(1);
    expect(playElement).toHaveBeenCalledTimes(0);
    userEvent.click(btnMusic);
    expect(playElement).toHaveBeenCalledTimes(1);
  });
});

describe('Test header button login', () => {
  let playBackup: () => Promise<void>;
  let pauseBackup: () => void;

  const playElement = jest.fn();
  const pauseElement = jest.fn();

  beforeAll(() => {
    playBackup = window.HTMLMediaElement.prototype.play;
    pauseBackup = window.HTMLMediaElement.prototype.pause;

    window.HTMLMediaElement.prototype.play = playElement;
    window.HTMLMediaElement.prototype.pause = pauseElement;
  });
  afterAll(() => {
    window.HTMLMediaElement.prototype.play = playBackup;
    window.HTMLMediaElement.prototype.pause = pauseBackup;
  });

  const history = createMemoryHistory({
    initialEntries: ['/aaa'],
    initialIndex: 0,
  });
  const pushRoute = jest.fn();
  history.push = pushRoute;

  beforeEach(() => renderPage(history));

  test('Header  must have a button to login', () => {
    const btnLogin = screen.getByTestId('btn-login-form');
    expect(btnLogin).toBeInTheDocument();
    userEvent.click(btnLogin);
    expect(pushRoute).nthCalledWith(
      1,
      { hash: '', pathname: '/login', search: '' },
      undefined
    );
  });
});

describe('Test header button logout', () => {
  let playBackup: () => Promise<void>;
  let pauseBackup: () => void;

  const playElement = jest.fn();
  const pauseElement = jest.fn();

  beforeAll(() => {
    playBackup = window.HTMLMediaElement.prototype.play;
    pauseBackup = window.HTMLMediaElement.prototype.pause;

    window.HTMLMediaElement.prototype.play = playElement;
    window.HTMLMediaElement.prototype.pause = pauseElement;
  });
  afterAll(() => {
    window.HTMLMediaElement.prototype.play = playBackup;
    window.HTMLMediaElement.prototype.pause = pauseBackup;
  });

  const history = createMemoryHistory({
    initialEntries: ['/aaa'],
    initialIndex: 0,
  });
  const pushRoute = jest.fn();
  history.push = pushRoute;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    renderPage(history, true);
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  test('Header  must have a button to logout', () => {
    const btnLogout = screen.getByTestId('btn-logout-form');
    const ulExitLink = screen.queryAllByTestId('ul-exit-link');
    expect(btnLogout).toBeInTheDocument();
    expect(ulExitLink).toHaveLength(0);
    userEvent.click(btnLogout);

    const linkExit = screen.getByTestId('li-exit-link');
    userEvent.click(linkExit);

    expect(pushRoute).nthCalledWith(
      1,
      { hash: '', pathname: '/logout', search: '' },
      undefined
    );
  });

  test('Header  must have a button to logout - and close it after 10 sec', async () => {
    jest.setTimeout(13000);
    const btnLogout = screen.getByTestId('btn-logout-form');
    const ulExitLink = screen.queryAllByTestId('ul-exit-link');
    expect(btnLogout).toBeInTheDocument();
    expect(ulExitLink).toHaveLength(0);
    userEvent.click(btnLogout);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10000);
  });
});
