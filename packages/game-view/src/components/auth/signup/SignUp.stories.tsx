import React from 'react';

import { Story } from '@storybook/react';

import SignUp from './SignUp';
import { AUTH_ROOT } from '../../storyStructure';

const storyTitle = 'Страница входа';
export default {
  component: SignUp,

  title: `${AUTH_ROOT}/${storyTitle}`,
};

export const SignUpForm: Story = (args) => <SignUp {...args} />;
