import { Story } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router';

import { SITE_ROOT } from '../storyStructure';
import Footer from './Footer';

const storyTitle = 'Подвал сайта';
export default {
  component: Footer,
  title: `${SITE_ROOT}/${storyTitle}`,
};

export const SiteFooter: Story = (args) => (
  <MemoryRouter>
    <Footer {...args} />
  </MemoryRouter>
);
