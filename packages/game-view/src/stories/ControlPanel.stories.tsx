import React from 'react';

import { Story } from '@storybook/react';
import RotationPanel from '../components/actionPanel/RotationPanel';
import GameScreen from '../components/gamescreen/GameScreen';
import ControlPanel from '../components/actionPanel/ControlPanel';

export default {
  component: ControlPanel,
  title: 'Экран c управляющими элементами игры',
};

export const ControlPanelUse: Story = (args) => <ControlPanel {...args} />;
