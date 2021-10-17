import React from 'react';

import { Story } from '@storybook/react';
import PlayField from '../components/gamescreen/PlayField';

export default {
  component: PlayField,
  title: 'Playfield table',
};
const Template: Story = (args) => <PlayField {...args} />;

export const PlayfieldComponent = Template.bind({});
