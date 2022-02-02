import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import GamePanel from './GamePanel';

describe('Test GamePanel component', () => {
  test('GamePanel component is a function', () => {
    expect(GamePanel).toBeInstanceOf(Object);
  });

  test('GamePanel must be render in page', () => {
    const togglePause = jest.fn();
    const reset = jest.fn();

    render(
      <GamePanel togglePause={togglePause} isPause={null} reset={reset} />
    );

    expect(screen.getByTestId('GamePanel-pause-btb')).toBeInTheDocument();
    expect(screen.getByTestId('GamePanel-sound-btb')).toBeInTheDocument();
    expect(screen.getByTestId('GamePanel-reset-btb')).toBeInTheDocument();
  });

  test('ControlPanel must have a bihavioor ', () => {
    const togglePause = jest.fn();
    const reset = jest.fn();

    render(
      <GamePanel togglePause={togglePause} isPause={null} reset={reset} />
    );

    const pauseBtn = screen.getByTestId('GamePanel-pause-btb');

    userEvent.click(pauseBtn);
    expect(togglePause).toBeCalledTimes(1);

    const resetBtn = screen.getByTestId('GamePanel-reset-btb');

    userEvent.click(resetBtn);
    expect(reset).toBeCalledTimes(1);
  });
});
