import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import Login from './Login';

describe('Login comp is function', () => {
  test('Login is function', () => {
    expect(Login).toBeInstanceOf(Object);
  });

  test('Login must be render in page', () => {
    render(<Login />);
    expect(screen.getByTestId('login-form-test-id')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  test('Login must have button submit and cancel', () => {
    render(<Login />);
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('Login must have button reset', () => {
    render(<Login />);
    const btn = screen.getByText('Cancel');
    expect(btn).toBeInTheDocument();
    const inputLogin = screen.getByPlaceholderText('Username');
    expect(inputLogin).toBeInTheDocument();
    userEvent.type(inputLogin, 'ddd');
    expect(screen.getByTestId('login-input-test-id')).toHaveValue('ddd');
    userEvent.click(btn);
    expect(screen.getByTestId('login-input-test-id')).toHaveValue('');
  });
});
