import React from 'react';

import { Story } from '@storybook/react';
import GamePanel from './GamePanel';

export default {
  component: GamePanel,
  title: 'Панель с управлением игровым симулятором',
};

export const GameControlPanel: Story = (args) => (
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  <GamePanel togglePause={() => {}} {...args} />
);
