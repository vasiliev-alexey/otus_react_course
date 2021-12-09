import React from 'react';

import { Story } from '@storybook/react';

import LogOut from './LogOut';
import { AUTH_ROOT } from '../../storyStructure';

const storyTitle = 'Страница выхода';
export default {
  component: LogOut,
  title: `${AUTH_ROOT}/${storyTitle}`,
};

export const LogOutForm: Story = (args) => <LogOut {...args} />;
