import React from 'react';

import { Story } from '@storybook/react';

import Header from './Header';
import { SITE_ROOT } from '../storyStructure';
import { ProviderDecorator, RouterDecorator } from '../utils/testUtils';

const storyTitle = 'Заголовок сайта';
export default {
  component: Header,
  title: `${SITE_ROOT}/${storyTitle}`,
  decorators: [RouterDecorator, ProviderDecorator],
};

export const SiteHeader: Story = (args) => (
  <div style={{ margin: 0, padding: 0 }}>
    <Header {...args} />
  </div>
);
