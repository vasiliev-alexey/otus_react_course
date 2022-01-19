import { Story } from '@storybook/react';
import { AUTH_ROOT } from '../../storyStructure';
import { ProviderDecorator, RouterDecorator } from '../../utils/testUtils';
import React from 'react';

import SignUp from './SignUp';

const storyTitle = 'Страница регистрации';

export default {
  component: SignUp,
  title: `${AUTH_ROOT}/${storyTitle}`,
  decorators: [RouterDecorator, ProviderDecorator],
};

export const SignUpForm: Story = (args) => <SignUp {...args} />;
