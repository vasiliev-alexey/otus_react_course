import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ControlPanel from './ControlPanel';
import userEvent from '@testing-library/user-event';

describe('Test ControlPanel component', () => {
  test('ControlPanel component is a function', () => {
    expect(ControlPanel).toBeInstanceOf(Object);
  });

  test('ControlPanel must be render in page', () => {
    const left = jest.fn();
    const right = jest.fn();
    const down = jest.fn();

    render(<ControlPanel left={left} right={right} down={down} />);

    expect(screen.getByTestId('btn-right')).toBeInTheDocument();
    expect(screen.getByTestId('btn-left')).toBeInTheDocument();
    expect(screen.getByTestId('btn-top')).toBeInTheDocument();
    expect(screen.getByTestId('btn-down')).toBeInTheDocument();
  });

  test('ControlPanel must have a bihavioor ', () => {
    const left = jest.fn();
    const right = jest.fn();
    const down = jest.fn();

    render(<ControlPanel left={left} right={right} down={down} />);

    const rightBtn = screen.getByTestId('btn-right');
    const leftBtn = screen.getByTestId('btn-left');
    const downBtn = screen.getByTestId('btn-down');

    userEvent.click(rightBtn);
    userEvent.click(leftBtn);
    userEvent.click(downBtn);

    expect(right).toBeCalledTimes(1);
    expect(left).toBeCalledTimes(1);
    expect(down).toBeCalledTimes(1);
  });
});
