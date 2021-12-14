import { compose } from './compose';

test('getTopName', () => {
  const fmDummy1 = jest.fn().mockReturnValueOnce(1);
  const fmDummy2 = jest.fn().mockReturnValueOnce(2);
  const fmDummy3 = jest.fn().mockReturnValueOnce(3);
  const fmDummy4 = jest.fn();

  const composedFunc = compose(fmDummy4, fmDummy3, fmDummy2, fmDummy1);
  composedFunc(1);
  expect(fmDummy1).toBeCalled();
  expect(fmDummy2).toBeCalledWith(1);
  expect(fmDummy3).toBeCalledWith(2);
  expect(fmDummy4).toBeCalledWith(3);
});
