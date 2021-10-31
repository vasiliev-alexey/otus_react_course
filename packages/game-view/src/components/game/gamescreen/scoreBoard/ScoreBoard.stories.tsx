import React from 'react';

import { Story } from '@storybook/react';
import ScoreBoard from './ScoreBoard';
import { GAME_ROOT } from '../../../storyStructure';

const storyTitle = 'Счет с игрой';

const initGameField = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

export default {
  component: ScoreBoard,
  title: `${GAME_ROOT}/Экран с игрой/${storyTitle}`,
};
export const ScoreBoardInitial: Story = (args) => (
  <ScoreBoard gamefield={initGameField} {...args} />
);
