// import React from 'react';
// import { Story } from '@storybook/react';
// import Header from './Header';
// import { SITE_ROOT } from '../../../.storybook/storyStructure';
//
// const storyTitle = 'Шапка сайта';
// export default {
//   component: Header,
//   title: `${SITE_ROOT}/${storyTitle}`,
// };
// export const SiteHeader: Story = (args) => <Header {...args} />;

import React from 'react';

import { Story } from '@storybook/react';

import Header from './Header';
import { SITE_ROOT } from '../../../.storybook/storyStructure';

const storyTitle = 'Подвал сайта';
export default {
  component: Header,

  title: `${SITE_ROOT}/${storyTitle}=xxx`,
};

export const SiteFooter22: Story = (args) => <Header {...args} />;
