import React from 'react';

import Frame from '../components/frame/Frame';
import { Story } from '@storybook/react';

export default {
  component: Frame,
  title: 'Тетрис',
};
const Template: Story = (args) => <Frame {...args} />;

export const TetrisDemoGameSimulator = Template.bind({});
