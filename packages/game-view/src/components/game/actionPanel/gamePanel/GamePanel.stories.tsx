import { Story } from '@storybook/react';
import { GAME_ROOT_ACTION_PANEL } from '@ui/storyStructure';
import React from 'react';

import GamePanel from './GamePanel';
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
