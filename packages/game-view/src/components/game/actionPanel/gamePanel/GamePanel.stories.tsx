import React from 'react';

import { Story } from '@storybook/react';
import GamePanel from './GamePanel';
import { GAME_ROOT_ACTION_PANEL } from '../../../storyStructure';
const storyTitle = 'Панель';

export const GameControlPanel: Story = (args) => (
  <div style={{ maxWidth: '600px' }}>
    <GamePanel togglePause={null} {...args} />
  </div>
);
export default {
  component: GamePanel,
  title: `${GAME_ROOT_ACTION_PANEL}/${storyTitle}`,
};
