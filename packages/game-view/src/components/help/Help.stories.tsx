import React from 'react';

import { Story } from '@storybook/react';

import { SITE_ROOT } from '../storyStructure';
import Help from './Help';
import { RouterDecorator } from '../utils/testUtils';

const storyTitle = 'Помощь';
export default {
  component: Help,
  title: `${SITE_ROOT}/${storyTitle}`,
  decorators: [RouterDecorator],
};

export const HelpPage: Story = (args) => <Help {...args} />;
