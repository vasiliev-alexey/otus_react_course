import React from 'react';

import { Story } from '@storybook/react';
import TitleBar from './TitleBar';
import { GAME_ROOT } from '../../storyStructure';

const storyTitle = 'Заголовок Tetris';
export default {
  component: TitleBar,

  title: `${GAME_ROOT}/Лейбл Тетрис/${storyTitle}`,
};

export const TitleBarStory: Story = (args) => (
  <div
    style={{ width: '300px', minHeight: '150px', height: '150px' }}
    className="frame"
  >
    <TitleBar {...args} />
  </div>
);
