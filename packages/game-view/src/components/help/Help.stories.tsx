import { Story } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router';

import { SITE_ROOT } from '../storyStructure';
import Help from './Help';

const storyTitle = 'Помощь';
export default {
  component: Help,
  title: `${SITE_ROOT}/${storyTitle}`,
};

export const HelpPage: Story = (args) => (
  <MemoryRouter>
    <Help {...args} />
  </MemoryRouter>
);
