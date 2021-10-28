import React from 'react';

import { Story } from '@storybook/react';
import ControlPanel from './ControlPanel';

export default {
  component: ControlPanel,
  title: 'Экран c управляющими элементами игры',
};

export const ControlPanelUse: Story = (args) => <ControlPanel {...args} />;
