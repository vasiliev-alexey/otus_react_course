import { Story } from '@storybook/react';
import { GAME_ROOT } from '@ui/storyStructure';
import React from 'react';

import PauseLabel from './PauseLabel';

const storyTitle = 'Игра на паузе';

export default {
  component: PauseLabel,
  title: `${GAME_ROOT}/Экран с игрой/${storyTitle}`,
};

export const GameOverScreenDemo: Story = (args) => (
  <div className="w300 center">
    <PauseLabel {...args} />
  </div>
);
