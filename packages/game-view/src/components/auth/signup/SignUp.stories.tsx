import React from 'react';

import { Story } from '@storybook/react';

import SignUp from './SignUp';
import { AUTH_ROOT } from '../../storyStructure';
import { RouterDecorator } from '../../utils/testUtils';

const storyTitle = 'Страница регистрации';

export default {
  component: SignUp,
  title: `${AUTH_ROOT}/${storyTitle}`,
  decorators: [RouterDecorator],
};

export const SignUpForm: Story = (args) => <SignUp {...args} />;
