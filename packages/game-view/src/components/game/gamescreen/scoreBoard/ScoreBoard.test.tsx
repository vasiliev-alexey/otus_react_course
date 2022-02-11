import '@testing-library/jest-dom';

import ScoreBoard from '@gameUi/gamescreen/scoreBoard/ScoreBoard';
import { render, screen } from '@testing-library/react';
import { expectFn } from '@ui/utils/testUtils';
import React from 'react';

describe('scoreboard test', () => {
  test('ScoreBoard is a  functin', () => {
    expectFn(ScoreBoard);
  });

  test('ScoreBoard render ', () => {
    const initTrs = [
      [0, 1, 0, 0],
      [0, 0, 2, 0],
      [4, 3, 5, 0],
      [0, 0, 0, 0],
    ];

    render(
      <ScoreBoard nextPieceBlock={initTrs} lines={1} score={2} level={3} />
    );

    //  screen.debug();

    expect(screen.getByText('score: 2')).toBeInTheDocument();
    expect(screen.getByText('level: 3')).toBeInTheDocument();
    expect(screen.getByText('lines: 1')).toBeInTheDocument();
  });
});
