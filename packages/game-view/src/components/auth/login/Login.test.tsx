import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import Login from './Login';
import { MemoryRouter } from 'react-router';

describe('login comp is function', () => {
  test('login is function', () => {
    expect(Login).toBeInstanceOf(Object);
  });

  test('login must be render in page', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByTestId('login-form-test-id')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  test('login must have button submit and cancel', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText('Войти')).toBeInTheDocument();
    expect(screen.getByText('Отмена')).toBeInTheDocument();
  });

  test('login must have button reset', () => {
    render(
      <MemoryRouter>
        {' '}
        <Login />
      </MemoryRouter>
    );
    const btn = screen.getByText('Отмена');
    expect(btn).toBeInTheDocument();
    const inputLogin = screen.getByPlaceholderText('Username');
    expect(inputLogin).toBeInTheDocument();
    userEvent.type(inputLogin, 'ddd');
    expect(screen.getByTestId('login-input-test-id')).toHaveValue('ddd');
    userEvent.click(btn);
    expect(screen.getByTestId('login-input-test-id')).toHaveValue('');
  });
});
