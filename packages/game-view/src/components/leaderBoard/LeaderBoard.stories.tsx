import React from 'react';

import { Story } from '@storybook/react';

import LeaderBoard from './LeaderBoard';
import { SITE_ROOT } from '../storyStructure';
import { RouterDecorator } from '../utils/testUtils';

const storyTitle = 'LeaderBoard';
export default {
  component: LeaderBoard,
  title: `${SITE_ROOT}/${storyTitle}`,
  decorators: [RouterDecorator],
};

export const ScoreBoardPage: Story = (args) => <LeaderBoard {...args} />;
