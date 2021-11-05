import React from 'react';

import { Story } from '@storybook/react';
import GameScreen from './GameScreen';
import { GAME_ROOT } from '../../storyStructure';

const storyTitle = 'Экран с фигурами и статистикой';

export default {
  component: GameScreen,
  title: `${GAME_ROOT}/Экран с игрой/${storyTitle}`,
};

export const GameScreenDemo: Story = (args) => (
  <div className="w300">
    <GameScreen
      isPause={false}
      playfield={[]}
      score={0}
      lines={0}
      nextPiece={[]}
      {...args}
    />
  </div>
);

export const GameScreenDemoWithPause: Story = (args) => (
  <div className="w300">
    <GameScreen
      isPause={true}
      playfield={null}
      score={0}
      lines={0}
      nextPiece={[]}
      {...args}
    />
  </div>
);
