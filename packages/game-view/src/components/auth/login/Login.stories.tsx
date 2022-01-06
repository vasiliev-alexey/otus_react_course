import React from 'react';

import { Story } from '@storybook/react';

import Login from './Login';
import { AUTH_ROOT } from '@ui/storyStructure';
import { RouterDecorator } from '@ui/utils/testUtils';
import configureStore from 'redux-mock-store';
import { Middleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const middlewares: Middleware[] = [];

const mockStore = configureStore(middlewares);
const initialState = {
  auth: {
    isAuth: false,
    errorMessage: '',
  },
};

const initialStateError = {
  auth: {
    isAuth: false,
    errorMessage: 'shit happens',
  },
};

const storeWithOutError = mockStore(initialState);
const storeWithError = mockStore(initialStateError);

const storyTitle = 'Страница входа';
export default {
  component: Login,
  title: `${AUTH_ROOT}/${storyTitle}`,
  decorators: [RouterDecorator],
};

export const LoginForm: Story = (args) => (
  <Provider store={storeWithOutError}>
    <Login {...args} />
  </Provider>
);

export const LoginFormError: Story = (args) => (
  <Provider store={storeWithError}>
    <Login {...args} />
  </Provider>
);
