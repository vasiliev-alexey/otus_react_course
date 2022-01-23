import React from 'react';
import { render } from '@testing-library/react';
import ErrorBoundary from '@ui/utils/ErrorBoundary';

const renderProviders = (ui: React.ReactElement) => render(ui, {});

const Child = () => {
  throw new Error();
};

describe('Error Boundary', () => {
  const spy = jest.spyOn(console, 'error');
  afterEach(() => {
    spy.mockRestore();
  });

  it(`should render error boundary component when there is an error`, () => {
    const spy = jest.spyOn(console, 'error');
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    spy.mockImplementation(() => {});
    const { getByText } = renderProviders(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    );
    const errorMessage = getByText(
      'Что-то поло не так. Дройдики скоро починят :)'
    );
    expect(errorMessage).toBeDefined();
  });
});
