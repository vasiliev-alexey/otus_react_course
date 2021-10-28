import React from 'react';

import { Story } from '@storybook/react';

import ActionPanel from './ActionPanel';

export default {
  component: ActionPanel,
  title: 'Панель  управляющих элементов',
};

export const SimpleUse: Story = (args) => (
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  <ActionPanel togglePause={() => {}} {...args} />
);
