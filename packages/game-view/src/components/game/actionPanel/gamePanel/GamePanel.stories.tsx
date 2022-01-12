import React from 'react';

import { Story } from '@storybook/react';
import GamePanel from './GamePanel';
import { GAME_ROOT_ACTION_PANEL } from '@ui/storyStructure';
const storyTitle = 'Панель';

const dummyAction = (): void => {
  return null;
};

export const GameControlPanel: Story = () => (
  <div style={{ maxWidth: '600px' }}>
    <GamePanel togglePause={dummyAction} reset={dummyAction} isPause={false} />
  </div>
);
export default {
  component: GamePanel,
  title: `${GAME_ROOT_ACTION_PANEL}/${storyTitle}`,
};
