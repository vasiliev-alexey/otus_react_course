import React from 'react';

import { Story } from '@storybook/react';
import ControlPanel from './ControlPanel';
import { GAME_ROOT_ACTION_PANEL } from '../../../storyStructure';
const storyTitle = 'Экран c управляющими элементами игры';
export default {
  component: ControlPanel,
  title: `${GAME_ROOT_ACTION_PANEL}/${storyTitle}`,
};

export const ControlPanelUse: Story = (args) => (
  <div style={{ maxWidth: '300px' }}>
    <ControlPanel {...args} />
  </div>
);
