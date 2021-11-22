import { originalArrayToExpectedArray } from './task';

test('array to array', () => {
  const originalArray = Object.freeze([1, 2, 3, 4]);

  const expectedArray = ['two', 3, 4, 5];

  expect(originalArrayToExpectedArray(originalArray)).toEqual(expectedArray);
});
