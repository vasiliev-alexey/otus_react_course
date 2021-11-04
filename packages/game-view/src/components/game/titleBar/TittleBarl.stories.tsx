import React from 'react';

import { Story } from '@storybook/react';
import TitleBar from './TitleBar';
import { GAME_ROOT } from '../../../../.storybook/storyStructure';

const storyTitle = 'Заголовок Tetris';
export default {
  component: TitleBar,

  title: `${GAME_ROOT}/Лейбл Тетрис/${storyTitle}`,
};

export const TitleBarStory: Story = (args) => (
  <div className="frame">
    <TitleBar {...args} />
  </div>
);
