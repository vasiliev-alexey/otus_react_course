import React from 'react';

import { Story } from '@storybook/react';
import Playfield from '../components/playfield/Playfield';

export default {
  component: Playfield,
  title: 'Playfield table',
};
const Template: Story = (args) => <Playfield {...args} />;

export const PlayfieldComponent = Template.bind({});
