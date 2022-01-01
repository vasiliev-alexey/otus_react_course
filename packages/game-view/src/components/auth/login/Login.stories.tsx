import React from 'react';
import '../../../../public/index.scss';

import { Story } from '@storybook/react';

import Login from './Login';
import { AUTH_ROOT } from '../../storyStructure';
import { ProviderDecorator, RouterDecorator } from '../../utils/testUtils';

const storyTitle = 'Страница входа';
export default {
  component: Login,
  title: `${AUTH_ROOT}/${storyTitle}`,
  decorators: [RouterDecorator, ProviderDecorator],
};

export const LoginForm: Story = (args) => <Login {...args} />;
