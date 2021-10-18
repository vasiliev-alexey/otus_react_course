import React from 'react';

import { Story } from '@storybook/react';
import GameScreen from '../components/gamescreen/GameScreen';

export default {
  component: GameScreen,
  title: 'Экран с фигурами и статистикой',
};

export const GameScreenDemo: Story = (args) => (
  <GameScreen isPause={false} {...args} />
);

export const GameScreenDemoWithPause: Story = (args) => (
  <GameScreen isPause={true} {...args} />
);
