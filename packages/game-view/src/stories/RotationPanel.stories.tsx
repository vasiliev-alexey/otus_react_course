import React from 'react';

import { Story } from '@storybook/react';
import RotationPanel from '../components/actionPanel/RotationPanel';

export default {
  component: RotationPanel,
  title: 'Панель с кнопкой вращения фигурой',
};

export const GameControlPanel: Story = (args) => <RotationPanel {...args} />;
