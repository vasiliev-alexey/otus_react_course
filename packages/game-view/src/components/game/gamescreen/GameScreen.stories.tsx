import React from 'react';

import { Story } from '@storybook/react';
import GameScreen from './GameScreen';
import { GAME_ROOT } from '../../../../.storybook/storyStructure';

const storyTitle = 'Экран с фигурами и статистикой';

export default {
  component: GameScreen,
  title: `${GAME_ROOT}/Экран с игрой/${storyTitle}`,
};

export const GameScreenDemo: Story = (args) => (
  <GameScreen isPause={false} {...args} />
);

export const GameScreenDemoWithPause: Story = (args) => (
  <GameScreen isPause={true} {...args} />
);
