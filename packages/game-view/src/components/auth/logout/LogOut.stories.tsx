import React from 'react';
import { Story } from '@storybook/react';
import LogOut from './LogOut';
import { AUTH_ROOT } from '@ui/storyStructure';
import { ProviderDecorator, RouterDecorator } from '@ui/utils/testUtils';

import { Provider } from 'react-redux';
import { RootState } from '@store/store';

import { Middleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';

const middlewares: Middleware[] = [];

const mockStore = configureStore(middlewares);

const storyTitle = 'Страница выхода';
export default {
  component: LogOut,
  title: `${AUTH_ROOT}/${storyTitle}`,
  decorators: [RouterDecorator, ProviderDecorator],
};

const initialState: Partial<RootState> = {
  auth: {
    isAuth: true,
  },
};
const store = mockStore(initialState);
export const LogOutForm: Story = (args) => (
  <Provider store={store}>
    <LogOut {...args} />
  </Provider>
);
