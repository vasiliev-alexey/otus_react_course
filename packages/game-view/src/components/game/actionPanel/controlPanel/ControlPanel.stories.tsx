import React from 'react';

import { Story } from '@storybook/react';
import ControlPanel from './ControlPanel';
import { dummyAction, GAME_ROOT_ACTION_PANEL } from '@ui/storyStructure';
const storyTitle = 'Экран c управляющими элементами игры';

export default {
  component: ControlPanel,
  title: `${GAME_ROOT_ACTION_PANEL}/${storyTitle}`,
};

export const ControlPanelUse: Story = () => (
  <div style={{ maxWidth: '300px' }}>
    <ControlPanel down={dummyAction} right={dummyAction} left={dummyAction} />
  </div>
);
