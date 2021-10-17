import React from 'react';

import { Story } from '@storybook/react';
import RotationPanel from '../components/actionPanel/RotationPanel';
import GameScreen from '../components/gamescreen/GameScreen';

export default {
  component: GameScreen,
  title: 'Экран с фигурами и статистикой',
};

export const GameScreenDemo: Story = (args) => <GameScreen {...args} />;
