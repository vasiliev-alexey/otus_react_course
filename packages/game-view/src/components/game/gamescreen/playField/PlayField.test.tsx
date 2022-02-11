import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { expectObject } from '@ui/utils/testUtils';
import React from 'react';

import PlayField from './PlayField';

describe('Test PlayField component', () => {
  test('PlayField component is a Object', () => {
    expectObject(PlayField);
  });

  const dummyField = Array.from(Array(20)).map(() =>
    Array.from(Array(10)).map(() => 0)
  );

  test('PlayField must be render in page', () => {
    render(<PlayField playField={dummyField} />);

    for (const ind in dummyField) {
      expect(screen.getByTestId(`play-row-${ind}`)).toBeInTheDocument();
    }
  });
});
