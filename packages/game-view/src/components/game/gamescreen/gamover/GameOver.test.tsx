import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';

import GameOver from './GameOver';

describe('Test GameOver component', () => {
  test('GameOver component is a function', () => {
    expect(GameOver).toBeInstanceOf(Object);
  });

  test('GamePanel must be render in page', () => {
    render(<GameOver />);
    expect(screen.getByTestId('game-over-label')).toBeInTheDocument();
    expect(screen.getByText('G')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('M')).toBeInTheDocument();
    expect(screen.getAllByText('E')).toHaveLength(2);
    expect(screen.getByText('O')).toBeInTheDocument();
    expect(screen.getByText('V')).toBeInTheDocument();
    expect(screen.getByText('R')).toBeInTheDocument();
  });
});
