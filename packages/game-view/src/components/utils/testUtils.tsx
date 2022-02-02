import { Story } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const dummyFunc = (): void => {};

export const RouterDecorator = (CustomStory: Story): JSX.Element => (
  <MemoryRouter>
    <CustomStory />
  </MemoryRouter>
);

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const expectFn = <F,>(fn: F) => {
  expect(fn).toBeInstanceOf(Function);
};
