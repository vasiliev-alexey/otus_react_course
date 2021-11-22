export const originalArrayToExpectedArray = (
  originalArray: Readonly<number[]>
): (number | string)[] => {
  return ['two', ...originalArray.slice(2), 5];
};
