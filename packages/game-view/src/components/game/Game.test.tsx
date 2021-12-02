import React from 'react';
import Game from './Game';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

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
    render(<Game />);

    const pauseBtn = screen.getByTestId('GamePanel-pause-btb');
    const pauseLbl = screen.queryAllByTestId('Pause-Label');
    expect(pauseLbl.length).toEqual(0);
    expect(pauseBtn).toBeInTheDocument();
    fireEvent.click(pauseBtn);
    fireEvent.click(pauseBtn);
    expect(screen.getByTestId('Pause-Label')).toBeInTheDocument();
  });
});
