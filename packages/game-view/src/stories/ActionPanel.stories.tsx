import React from 'react';

import { Story } from '@storybook/react';

import ActionPanel from '../components/actionPanel/ActionPanel';

export default {
  component: ActionPanel,
  title: 'Панель  управляющих элементов',
};

export const SimpleUse: Story = (args) => <ActionPanel {...args} />;
