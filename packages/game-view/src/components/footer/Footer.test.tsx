import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Test Footer component', () => {
  test('Footer component is a function', () => {
    expect(Footer).toBeInstanceOf(Object);
  });

  test('Frame must be render in page', () => {
    render(<Footer />);
    'GAMETRIS'
      .split('')
      .forEach((l) =>
        expect(screen.getAllByText(l).length).toBeGreaterThanOrEqual(1)
      );
  });
});
