import { Story } from '@storybook/react';
import React from 'react';

import { SITE_ROOT } from '../storyStructure';
import { RouterDecorator } from '../utils/testUtils';
import Help from './Help';

const storyTitle = 'Помощь';
export default {
  component: Help,
  title: `${SITE_ROOT}/${storyTitle}`,
  decorators: [RouterDecorator],
};

export const HelpPage: Story = (args) => <Help {...args} />;
