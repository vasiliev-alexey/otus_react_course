import React from 'react';

import { Story } from '@storybook/react';
import TitleBar from './TitleBar';

export default {
  component: TitleBar,
  title: 'Заголовок Tetris',
};

export const TitleBarStory: Story = (args) => <TitleBar {...args} />;
