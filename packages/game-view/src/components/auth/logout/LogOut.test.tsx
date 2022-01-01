import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import LogOut from './LogOut';

import { MemoryRouter } from 'react-router-dom';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('LogOut comp is function', () => {
  test('LogOut is function', () => {
    expect(LogOut).toBeInstanceOf(Object);
  });

  test('LogOut must be render in page', () => {
    render(
      <MemoryRouter>
        <LogOut />
      </MemoryRouter>
    );

    expect(screen.getByTestId('logout-form-test-id')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /выход/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /отмена/i })).toBeInTheDocument();
  });
});

describe('LogOut comp behaviour', () => {
  const history = createMemoryHistory({
    initialEntries: ['/aaa'],
    initialIndex: 0,
  });
  const pushRoute = jest.fn();
  history.push = pushRoute;

  test('LogOut must have button submit and click goto /', () => {
    expect(history.location.pathname).toBe('/aaa');
    render(
      <Router location={''} navigator={history}>
        <LogOut />
      </Router>
    );
    expect(history.location.pathname).toBe('/aaa');
    const btnCancel = screen.getByRole('button', { name: /выход/i });
    expect(btnCancel).toBeInTheDocument();
    userEvent.click(btnCancel);

    expect(pushRoute).nthCalledWith(
      1,
      { hash: '', pathname: '/', search: '' },
      undefined
    );
  });

  test('LogOut must have button exit and click goto /', () => {
    expect(history.location.pathname).toBe('/aaa');
    render(
      <Router location={''} navigator={history}>
        <LogOut />
      </Router>
    );
    expect(history.location.pathname).toBe('/aaa');
    const btnCancel = screen.getByRole('button', { name: /отмена/i });
    expect(btnCancel).toBeInTheDocument();
    userEvent.click(btnCancel);

    expect(pushRoute).nthCalledWith(
      1,
      { hash: '', pathname: '/', search: '' },
      undefined
    );
  });
});
