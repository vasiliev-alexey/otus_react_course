import { Story } from '@storybook/react';
import React from 'react';

import { GAME_ROOT } from '../storyStructure';
import { dummyFunc } from '../utils/testUtils';
import GameView from './GameView';

const storyTitle = 'Игра основной экран';
export default {
  component: GameView,
  title: `${GAME_ROOT}/${storyTitle}`,
};

const dummyField = Array.from(Array(20)).map(() =>
  Array.from(Array(10)).map(() => 0)
);

export const GameSimpleUse: Story = () => (
  <div className="w300 center">
    <GameView
      down={dummyFunc}
      isPause={false}
      left={dummyFunc}
      nextPiece={[]}
      playfield={dummyField}
      reset={dummyFunc}
      right={dummyFunc}
      togglePause={dummyFunc}
      rotate={dummyFunc}
    />
  </div>
);
