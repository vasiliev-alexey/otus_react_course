import { compose, fromPairs, map, split, tail } from 'ramda';

export type QsObj = Record<string, string | number | boolean>;

export const parseQs = (qs: string): QsObj => {
  const removeFirsSymbol = (s: string) => tail(s);
  const objectFromPairs = (a: [k: string, v: string][]) => fromPairs(a);

  const parseQsCompose = compose(
    objectFromPairs,
    map(split('=')),
    split('&'),
    removeFirsSymbol
  );
  return parseQsCompose(qs);
};
