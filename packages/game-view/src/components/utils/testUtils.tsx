import { Story } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';

import thunk from 'redux-thunk';
import { Middleware } from '@reduxjs/toolkit';
import { store } from '@store/store';

const middlewares: Middleware[] = [thunk];

const mockStore = configureStore(middlewares);

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const dummyFunc = (): void => {};

export const RouterDecorator = (CustomStory: Story): JSX.Element => (
  <MemoryRouter>
    <CustomStory />
  </MemoryRouter>
);
const initialState = store.getState();

export const ProviderDecorator = (CustomStory: Story): JSX.Element => {
  const store = mockStore(initialState);

  return (
    <Provider store={store}>
      <CustomStory />
    </Provider>
  );
};
