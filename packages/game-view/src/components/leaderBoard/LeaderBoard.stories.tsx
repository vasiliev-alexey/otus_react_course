import { Middleware, nanoid } from '@reduxjs/toolkit';
import { LeaderList } from '@store/leaderBoardSlice';
import { RootState } from '@store/store';
import { Story } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureStore from 'redux-mock-store';

import { SITE_ROOT } from '../storyStructure';
import LeaderBoard from './LeaderBoard';

const middlewares: Middleware[] = [];

const mockStore = configureStore(middlewares);

const storyTitle = 'LeaderBoard';
export default {
  component: LeaderBoard,
  title: `${SITE_ROOT}/${storyTitle}`,
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
      <MemoryRouter>
        <LeaderBoard {...args} />
      </MemoryRouter>
    </Provider>
  );
};
