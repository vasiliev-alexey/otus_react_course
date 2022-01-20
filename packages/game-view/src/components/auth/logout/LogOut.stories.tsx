import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '@store/store';
import { Story } from '@storybook/react';
import { AUTH_ROOT } from '@ui/storyStructure';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureStore from 'redux-mock-store';

import LogOut from './LogOut';

const middlewares: Middleware[] = [];

const mockStore = configureStore(middlewares);

const storyTitle = 'Страница выхода';
export default {
  component: LogOut,
  title: `${AUTH_ROOT}/${storyTitle}`,
};

const initialState: Partial<RootState> = {
  auth: {
    isAuth: true,
  },
};
const store = mockStore(initialState);
export const LogOutForm: Story = (args) => (
  <Provider store={store}>
    <MemoryRouter>
      <LogOut {...args} />
    </MemoryRouter>
  </Provider>
);
