import { Story } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const dummyFunc = (): void => {};

export const RouterDecorator = (CustomStory: Story): JSX.Element => (
  <MemoryRouter>
    <CustomStory />
  </MemoryRouter>
);
