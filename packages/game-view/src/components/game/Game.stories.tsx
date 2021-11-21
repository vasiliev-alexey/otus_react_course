import React from 'react';

import Game from './Game';
import { GAME_ROOT } from '../storyStructure';
import { Story } from '@storybook/react';

const storyTitle = 'Главный';
export default {
  component: Game,
  title: `${GAME_ROOT}/${storyTitle}`,
};
export const GameSimpleUse: Story = (args) => <Game {...args} />;
