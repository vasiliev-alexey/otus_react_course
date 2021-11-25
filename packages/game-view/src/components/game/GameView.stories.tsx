import React from 'react';

import { GAME_ROOT } from '../storyStructure';
import { Story } from '@storybook/react';
import GameView from './GameView';

const storyTitle = 'Главный';
export default {
  component: GameView,
  title: `${GAME_ROOT}/${storyTitle}`,
};

export const GameSimpleUse: Story = () => (
  <div className="w300 center">
    <GameView
      down={jest.fn}
      isPause={false}
      left={jest.fn}
      nextPiece={[]}
      playfield={[]}
      reset={jest.fn}
      right={jest.fn}
      togglePause={jest.fn}
      rotate={jest.fn}
    />
  </div>
);
