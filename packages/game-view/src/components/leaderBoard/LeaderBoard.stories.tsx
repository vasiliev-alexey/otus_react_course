import React from 'react';

import { Story } from '@storybook/react';

import LeaderBoard from './LeaderBoard';
import { SITE_ROOT } from '../storyStructure';
import { RouterDecorator } from '../utils/testUtils';
import configureStore from 'redux-mock-store';

import { Middleware, nanoid } from '@reduxjs/toolkit';
import { RootState } from '@store/store';
import { LeaderList } from '@store/leaderBoardSlice';
import { Provider } from 'react-redux';

const middlewares: Middleware[] = [];

const mockStore = configureStore(middlewares);

const storyTitle = 'LeaderBoard';
export default {
  component: LeaderBoard,
  title: `${SITE_ROOT}/${storyTitle}`,
  decorators: [RouterDecorator],
};

const rndGamers = Array.from({
  length: 5,
}).map((_, ind) => {
  return {
    userName: ind.toString(),
    uid: nanoid(),
    pictUrl: '',
    topScore: ind * 100,
  };
});

const leaderBoardState: LeaderList = {
  leaderList: rndGamers,
  isLoading: false,
};

const initialState: Partial<RootState> = {
  leaderBoard: leaderBoardState,
};

const store = mockStore(initialState);

export const ScoreBoardPage: Story = (args) => {
  return (
    <Provider store={store}>
      <LeaderBoard {...args} />
    </Provider>
  );
};
