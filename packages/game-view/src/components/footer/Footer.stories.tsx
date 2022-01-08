import { Story } from '@storybook/react';
import React from 'react';

import { SITE_ROOT } from '../storyStructure';
import { RouterDecorator } from '../utils/testUtils';
import Footer from './Footer';

const storyTitle = 'Подвал сайта';
export default {
  component: Footer,
  title: `${SITE_ROOT}/${storyTitle}`,
  decorators: [RouterDecorator],
};

export const SiteFooter: Story = (args) => <Footer {...args} />;
