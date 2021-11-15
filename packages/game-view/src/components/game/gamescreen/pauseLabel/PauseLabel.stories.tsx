import React from 'react';

import { Story } from '@storybook/react';
import PauseLabel from './PauseLabel';
import { GAME_ROOT } from '../../../storyStructure';

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
