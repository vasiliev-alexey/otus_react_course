import { store } from '@store/store';
import { Story } from '@storybook/react';
import React from 'react';

import { AUTH_ROOT } from '../../storyStructure';

const mockStore = configureStore([]);
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureStore from 'redux-mock-store';

import SignUp from './SignUp';

const storyTitle = 'Страница регистрации';

export default {
  component: SignUp,
  title: `${AUTH_ROOT}/${storyTitle}`,
};
const initialState = store.getState();
const mockStoreLocal = mockStore(initialState);
export const SignUpForm: Story = (args) => (
  <Provider store={mockStoreLocal}>
    <MemoryRouter>
      <SignUp {...args} />
    </MemoryRouter>
  </Provider>
);
