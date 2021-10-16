import React from 'react';

import Frame from '../components/frame/frame';
import { Story } from '@storybook/react';

export default {
  component: Frame,
  title: 'Frame',
};
const Template: Story = (args) => <Frame {...args} />;

export const FrameComponent = Template.bind({});

//viewerComp.args = {};
