import React from 'react';

import { Story } from '@storybook/react';
import GameScreen from './GameScreen';
import { GAME_ROOT } from '../../storyStructure';

const storyTitle = 'Экран с фигурами и статистикой';

export default {
  component: GameScreen,
  title: `${GAME_ROOT}/Экран с игрой/${storyTitle}`,
};

export const GameScreenDemo: Story = () => (
  <div className="w300">
    <GameScreen
      isGameOver={false}
      isPause={false}
      playfield={[]}
      score={0}
      lines={0}
      nextPiece={[]}
    />
  </div>
);

export const GameScreenDemoWithPause: Story = () => (
  <div className="w300">
    <GameScreen
      isGameOver={false}
      level={0}
      isPause={true}
      playfield={[]}
      score={0}
      lines={0}
      nextPiece={[]}
    />
  </div>
);
