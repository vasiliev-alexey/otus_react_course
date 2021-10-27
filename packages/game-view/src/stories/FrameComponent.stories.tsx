import React from 'react';

import Frame from '../components/frame/Frame';
import { Story } from '@storybook/react';

export default {
  component: Frame,
  title: 'Тетрис',
};
export const FrameUse: Story = (args) => <Frame {...args} />;
