import '@testing-library/jest-dom';

import { Middleware, nanoid } from '@reduxjs/toolkit';
import { LeaderList } from '@store/leaderBoardSlice';
import { RootState } from '@store/store';
import { render, screen } from '@testing-library/react';
import faker from 'faker';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import LeaderBoard from './LeaderBoard';

const renderPage = (
  leaderBoardState: LeaderList = {
    leaderList: [],
    isLoading: true,
  }
): void => {
  const initialState: Partial<RootState> = {
    leaderBoard: leaderBoardState,
  };
  const middlewares: Middleware[] = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore(initialState);

  render(
    <Provider store={store}>
      <LeaderBoard />
    </Provider>
  );
};

describe('Test LeaderBoard component', () => {
  beforeEach(() => renderPage());

  it('LeaderBoard component is a function', () => {
    expect(LeaderBoard).toBeInstanceOf(Object);
  });

  it('Frame must be render spinner in  page if loadinf', () => {
    const leaderboardSpinner = screen.getByTestId('leaderboard-spinner');
    expect(leaderboardSpinner).toBeInTheDocument();
  });
});

describe('Test LeaderBoard component -list', () => {
  it('LeaderBoard component  render list ogf gammers', () => {
    const rndGamers = Array.from({
      length: 5,
    }).map(() => {
      return {
        userName: faker.name.firstName(),
        uid: nanoid(),
        pictUrl: '',
        topScore: faker.datatype.number(1000),
      };
    });

    renderPage({
      leaderList: rndGamers,
      isLoading: false,
    });

    const leaderboardContainer = screen.getByTestId('leaderboard-container');
    expect(leaderboardContainer).toBeInTheDocument();

    const rndUserRow = screen.getByTestId(`leaderboard-${rndGamers[1].uid}`);
    expect(rndUserRow).toBeInTheDocument();
    expect(screen.getByText(rndGamers[3].userName)).toBeInTheDocument();
  });
});
