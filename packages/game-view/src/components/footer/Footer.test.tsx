import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';
import { MemoryRouter, Router } from 'react-router';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

describe('Test Footer component', () => {
  const history = createMemoryHistory({
    initialEntries: ['/aaa'],
    initialIndex: 0,
  });
  const pushRoute = jest.fn();
  history.push = pushRoute;

  test('Footer component is a function', () => {
    expect(Footer).toBeInstanceOf(Object);
  });

  test('Footer must be render in page', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    'GAMETRIS'
      .split('')
      .forEach((l) =>
        expect(screen.getAllByText(l).length).toBeGreaterThanOrEqual(1)
      );
  });

  test('Footer call help button - must redirect to /help', () => {
    expect(history.location.pathname).toBe('/aaa');
    render(
      <Router location={''} navigator={history}>
        <Footer />
      </Router>
    );
    expect(history.location.pathname).toBe('/aaa');
    const btnHelp = screen.getByTestId('havigateToHelp');
    expect(btnHelp).toBeInTheDocument();
    userEvent.click(btnHelp);

    expect(pushRoute).nthCalledWith(
      1,
      { hash: '', pathname: '/help', search: '' },
      undefined
    );
  });
});
