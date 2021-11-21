import React from 'react';
const storyTitle = 'Панель  управляющих элементов';
import { Story } from '@storybook/react';

import ActionPanel from './ActionPanel';
import { GAME_ROOT_ACTION_PANEL } from '../../storyStructure';

export default {
  component: ActionPanel,
  title: `${GAME_ROOT_ACTION_PANEL}/${storyTitle}`,
};

export const SimpleUse: Story = (args) => (
  <div style={{ width: '600px' }}>
    <ActionPanel togglePause={null} {...args} />
  </div>
);
