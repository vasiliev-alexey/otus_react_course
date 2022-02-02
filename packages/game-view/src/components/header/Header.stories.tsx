import { Story } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';

import { SITE_ROOT } from '../storyStructure';
const mockStore = configureStore([]);
import { store } from '@store/store';
import { MemoryRouter } from 'react-router';
import configureStore from 'redux-mock-store';

import Header from './Header';

const storyTitle = 'Заголовок сайта';
export default {
  component: Header,
  title: `${SITE_ROOT}/${storyTitle}`,
};
const initialState = store.getState();
const mockStoreLocal = mockStore(initialState);
export const SiteHeader: Story = (args) => (
  <div style={{ margin: 0, padding: 0 }}>
    <Provider store={mockStoreLocal}>
      <MemoryRouter>
        <Header {...args} />
      </MemoryRouter>
    </Provider>
  </div>
);
