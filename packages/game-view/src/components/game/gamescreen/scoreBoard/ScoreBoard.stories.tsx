import { Story } from '@storybook/react';
import { GAME_ROOT } from '@ui/storyStructure';
import React from 'react';

import ScoreBoard from './ScoreBoard';

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
  <div className="w300">
    <ScoreBoard
      nextPieceBlock={initGameField}
      lines={0}
      score={0}
      level={0}
      {...args}
    />
  </div>
);
