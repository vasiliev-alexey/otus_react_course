import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import Login from './Login';
import { MemoryRouter } from 'react-router';
import {
  doSignInWithEmailAndPassword,
  githubSignin,
  signInWithGoogle,
} from '../../../api/auth';
import { act } from 'react-dom/test-utils';

//jest.mock('../../../api/auth');

jest.mock('../../../api/auth', () => ({
  doSignInWithEmailAndPassword: jest.fn(() => {
    return {
      user: {
        uud: 'a',
        email: '1',
      },
    };
  }),
  githubSignin: jest.fn(() => {
    return {
      user: {
        uud: 'a',
        email: '1',
      },
    };
  }),
  signInWithGoogle: jest.fn(() => {
    return {
      user: {
        uud: 'a',
        email: '1',
      },
    };
  }),
}));

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
    expect(screen.getByTestId('gitHubLoginId')).toBeInTheDocument();
    expect(screen.getByTestId('googleSignId')).toBeInTheDocument();
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

describe('login  behaviour', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  test('login call siginin', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const btn = screen.getByText('Войти');
    expect(btn).toBeInTheDocument();
    const inputLogin = screen.getByPlaceholderText('Username');
    expect(inputLogin).toBeInTheDocument();

    await act(async () => {
      userEvent.type(inputLogin, 'ddd');
    });

    expect(screen.getByTestId('login-input-test-id')).toHaveValue('ddd');
    await act(async () => {
      userEvent.click(btn);
    });

    expect(doSignInWithEmailAndPassword).nthCalledWith(1, 'ddd', '');
    // act(() => {});
  });

  test('login call siginin with GitHub', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const btn = screen.getByTestId('gitHubLoginId');
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);
    expect(githubSignin).nthCalledWith(1);
  });

  test('login call siginin with Google', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const btn = screen.getByTestId('googleSignId');
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);
    expect(signInWithGoogle).nthCalledWith(1);
  });
});
