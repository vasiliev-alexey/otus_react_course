import React from 'react';

import { Story } from '@storybook/react';
import RotationPanel from './RotationPanel';
import { GAME_ROOT_ACTION_PANEL } from '../../../storyStructure';
import { dummyFunc } from '../../../utils/testUtils';

const storyTitle = 'Панель с кнопкой вращения фигурой';
export default {
  component: RotationPanel,
  title: `${GAME_ROOT_ACTION_PANEL}/${storyTitle}`,
};

export const GameControlPanel: Story = (args) => (
  <RotationPanel rotate={dummyFunc} {...args} />
);
