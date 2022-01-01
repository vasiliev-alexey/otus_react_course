import React from 'react';

import { Story } from '@storybook/react';

import Login from './Login';
import { AUTH_ROOT } from '../../storyStructure';
import { RouterDecorator } from '../../utils/testUtils';

const storyTitle = 'Страница входа';
export default {
  component: Login,
  title: `${AUTH_ROOT}/${storyTitle}`,
  decorators: [RouterDecorator],
};

export const LoginForm: Story = (args) => <Login {...args} />;
