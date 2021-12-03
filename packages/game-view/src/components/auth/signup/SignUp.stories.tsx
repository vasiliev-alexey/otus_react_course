import React from 'react';

import { Story } from '@storybook/react';

import Login from './Login';
import { AUTH_ROOT } from '../../storyStructure';

const storyTitle = 'Страница входа';
export default {
  component: Login,

  title: `${AUTH_ROOT}/${storyTitle}`,
};

export const LoginForm: Story = (args) => <Login {...args} />;
