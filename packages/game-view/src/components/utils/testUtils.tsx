// eslint-disable-next-line @typescript-eslint/no-empty-function
import { Story } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router';

export const dummyFunc = (): void => {};

export const RouterDecorator = (CustomStory: Story) => (
  <MemoryRouter>
    <CustomStory />
  </MemoryRouter>
);
