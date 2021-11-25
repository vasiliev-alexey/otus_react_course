import React from 'react';

import { Story } from '@storybook/react';

import Footer from './Footer';
import { SITE_ROOT } from '../storyStructure';

const storyTitle = 'Подвал сайта';
export default {
  component: Footer,
  title: `${SITE_ROOT}/${storyTitle}`,
};

export const SiteFooter: Story = (args) => <Footer {...args} />;
