import React from 'react';

import { Story } from '@storybook/react';
import GameOver from './GameOver';
import { GAME_ROOT } from '../../../../../.storybook/storyStructure';

const storyTitle = 'Игра закончена';

export default {
  component: GameOver,
  title: `${GAME_ROOT}/Экран с игрой/${storyTitle}`,
};

export const GameOverScreenDemo: Story = (args) => <GameOver {...args} />;
