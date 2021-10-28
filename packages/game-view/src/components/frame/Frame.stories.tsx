import React from 'react';

import Frame from './Frame';
import { Story } from '@storybook/react';

export default {
  component: Frame,
  title: 'Тетрис',
};
export const FrameUse: Story = (args) => <Frame {...args} />;
