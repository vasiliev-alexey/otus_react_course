import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

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

  test('Header component is a function', () => {
    expect(Header).toBeInstanceOf(Object);
  });

  test('Frame must be render in page', () => {
    render(<Header />);
    const greeting = screen.getByText('Чемпионат по Online Тетрису');
    expect(greeting).toBeInTheDocument();
  });
});
