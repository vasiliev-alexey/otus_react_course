import '@testing-library/jest-dom';

import { Middleware } from '@reduxjs/toolkit';
import {
  movePieceDown,
  movePieceLeft,
  movePieceRight,
  rotatePiece,
  togglePause,
} from '@store/gameSlice';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Game from './Game';

const middlewares: Middleware[] = [thunk];

const mockStore = configureStore(middlewares);

describe('Test Frame component', () => {
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

  test('Frame component is a function', () => {
    expect(Game).toBeInstanceOf(Object);
  });

  test('Frame must be render in page', () => {
    const initialState = {
      auth: {
        userName: 'userName',
        isAuthenticated: true,
      },
      game: {
        isPause: true,
        playfield: [] as number[][],
        nextPiece: [] as number[][],
      },
    };

    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Game />
      </Provider>
    );

    const pauseBtn = screen.getByTestId('GamePanel-pause-btb');
    expect(pauseBtn).toBeInTheDocument();
    expect(screen.getByTestId('Pause-Label')).toBeInTheDocument();
  });

  test('Game must listen keyboard Events', () => {
    const initialState = {
      auth: {
        userName: 'userName',
        isAuthenticated: true,
      },
      game: {
        isPause: false,
        playfield: [] as number[][],
        nextPiece: [] as number[][],
      },
    };

    const store = mockStore(initialState);

    const container = render(
      <Provider store={store}>
        <Game />
      </Provider>
    );

    [
      'Enter',
      'ArrowRight',
      'ArrowLeft',
      'ArrowDown',
      'Space',
      'Pause',
      'x',
    ].map((e) => {
      fireEvent.keyDown(container.container, {
        key: e,
        code: e,
        keyCode: 27,
        charCode: 27,
      });
    });

    [
      movePieceDown,
      movePieceLeft,
      movePieceRight,
      rotatePiece,
      movePieceDown,
    ].map((el) => {
      expect(
        store.getActions().findIndex((e) => e.type === el.type)
      ).toBeGreaterThanOrEqual(0);
    });
  });

  test('Game must no  listen keyboard Events in pause mode', () => {
    const initialState = {
      auth: {
        userName: 'userName',
        isAuthenticated: true,
      },
      game: {
        isPause: true,
        playfield: [] as number[][],
        nextPiece: [] as number[][],
      },
    };

    const store = mockStore(initialState);

    const container = render(
      <Provider store={store}>
        <Game />
      </Provider>
    );

    [
      'Enter',
      'ArrowRight',
      'ArrowLeft',
      'ArrowDown',
      'Space',
      'Pause',
      'x',
    ].map((e) => {
      fireEvent.keyDown(container.container, {
        key: e,
        code: e,
        keyCode: 27,
        charCode: 27,
      });
    });

    expect(store.getActions()).toHaveLength(1);
    expect(
      store.getActions().findIndex((e) => e.type === togglePause.type)
    ).toBeGreaterThanOrEqual(0);
  });
});
