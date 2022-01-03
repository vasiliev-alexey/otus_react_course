import React from 'react';

import { Story } from '@storybook/react';

import SignUp from './SignUp';
import { AUTH_ROOT } from '@ui/storyStructure';
import { ProviderDecorator, RouterDecorator } from '@ui/utils/testUtils';

const storyTitle = 'Страница регистрации';

export default {
  component: SignUp,
  title: `${AUTH_ROOT}/${storyTitle}`,
  decorators: [RouterDecorator, ProviderDecorator],
};

export const SignUpForm: Story = (args) => <SignUp {...args} />;
