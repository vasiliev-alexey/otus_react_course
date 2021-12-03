import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import SignUp from './SignUp';

describe('login comp is function', () => {
  test('login is function', () => {
    expect(SignUp).toBeInstanceOf(Object);
  });

  test('SignUp must be render in page', () => {
    render(<SignUp />);
    expect(screen.getByTestId('signup-form-test-id')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Логин')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Пароль')).toBeInTheDocument();
  });

  test('SignUp must have button submit and cancel', () => {
    render(<SignUp />);
    expect(screen.getByText('Регистрация')).toBeInTheDocument();
    expect(screen.getByText('Отмена')).toBeInTheDocument();
  });

  test('SignUp must have button reset', () => {
    render(<SignUp />);
    const btn = screen.getByText('Отмена');
    expect(btn).toBeInTheDocument();
    const inputLogin = screen.getByPlaceholderText('Логин');
    expect(inputLogin).toBeInTheDocument();
    userEvent.type(inputLogin, 'ddd');
    expect(screen.getByTestId('login-input-test-id')).toHaveValue('ddd');
    userEvent.click(btn);
    expect(screen.getByTestId('login-input-test-id')).toHaveValue('');
  });
});
