import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

//ToDo
window.HTMLMediaElement.prototype.play = () => {
  /* do nothing */
  return Promise.resolve();
};
window.HTMLMediaElement.prototype.pause = () => {
  /* do nothing */
};

describe('Test header component', () => {
  test('Header component is a function', () => {
    expect(Header).toBeInstanceOf(Object);
  });

  test('Frame must be render in page', () => {
    render(<Header />);
    const greeting = screen.getByText('Чемпионат по Online Тетрису');
    expect(greeting).toBeInTheDocument();
  });
});
