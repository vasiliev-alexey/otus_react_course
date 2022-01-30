// eslint-disable-next-line @typescript-eslint/no-empty-function
export const dummyFunc = (): void => {};

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const expectFn = <F,>(fn: F) => {
  expect(fn).toBeInstanceOf(Function);
};
export const expectObject = <F,>(fn: F) => {
  expect(fn).toBeInstanceOf(Object);
};
