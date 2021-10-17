import React from 'react';

import { Story } from '@storybook/react';
import RotationPanel from '../components/actionPanel/RotationPanel';
import GameScreen from '../components/gamescreen/GameScreen';
import GamePanel from '../components/actionPanel/GamePanel';

export default {
  component: GamePanel,
  title: 'Панель с управлением игровым симулятором',
};

export const GameControlPanel: Story = (args) => <GamePanel {...args} />;
