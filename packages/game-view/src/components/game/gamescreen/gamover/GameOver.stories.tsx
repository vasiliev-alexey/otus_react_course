import { Story } from '@storybook/react';
import { GAME_ROOT } from '@ui/storyStructure';
import React from 'react';

import GameOver from './GameOver';

const storyTitle = 'Игра закончена';

export default {
  component: GameOver,
  title: `${GAME_ROOT}/Экран с игрой/${storyTitle}`,
};

export const GameOverScreenDemo: Story = (args) => (
  <div className="w300 center">
    <GameOver {...args} />
  </div>
);
