import React from 'react';

import { Story } from '@storybook/react';
import GamePanel from '../components/actionPanel/GamePanel';

export default {
  component: GamePanel,
  title: 'Панель с управлением игровым симулятором',
};

export const GameControlPanel: Story = (args) => <GamePanel {...args} />;
