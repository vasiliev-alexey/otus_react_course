import React from 'react';

import { Story } from '@storybook/react';

import Login from './Login';
import { AUTH_ROOT } from '@ui/storyStructure';
import { ProviderDecorator, RouterDecorator } from '@ui/utils/testUtils';

const storyTitle = 'Страница входа';
export default {
  component: Login,
  title: `${AUTH_ROOT}/${storyTitle}`,
  decorators: [RouterDecorator, ProviderDecorator],
};

export const LoginForm: Story = (args) => <Login {...args} />;
