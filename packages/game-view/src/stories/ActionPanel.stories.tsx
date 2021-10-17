import React from 'react';

import { Story } from '@storybook/react';
import RotationPanel from '../components/actionPanel/RotationPanel';

export default {
  component: RotationPanel,
  title: 'панель  вращения',
};

export const SimpleUse: Story = (args) => <RotationPanel {...args} />;
