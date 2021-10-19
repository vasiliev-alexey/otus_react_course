import React from 'react';
import Frame from './Frame';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Test Frame component', () => {
  test('Frame component is a function', () => {
    expect(Frame).toBeInstanceOf(Object);
  });

  test('Frame must be render in page', () => {
    render(<Frame />);

    const pauseBtn = screen.getByTestId('GamePanel-pause-btb');
    const pauseLbl = screen.queryAllByTestId('Pause-Label');
    expect(pauseLbl.length).toEqual(0);
    expect(pauseBtn).toBeInTheDocument();

    fireEvent.click(pauseBtn);
    expect(screen.getByTestId('Pause-Label')).toBeInTheDocument();
  });
});
