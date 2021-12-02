import React from 'react';

import { Story } from '@storybook/react';
import RotationPanel from './RotationPanel';
import { GAME_ROOT_ACTION_PANEL } from '../../../storyStructure';

const storyTitle = 'Панель с кнопкой вращения фигурой';
export default {
  component: RotationPanel,
  title: `${GAME_ROOT_ACTION_PANEL}/${storyTitle}`,
};

// eslint-disable-next-line  @typescript-eslint/no-empty-function
const rotate = () => {};

export const GameControlPanel: Story = (args) => (
  <RotationPanel rotate={rotate} {...args} />
);
