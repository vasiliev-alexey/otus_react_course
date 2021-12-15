import R, { concat, join, toPairsIn } from 'ramda';

export type QsObj = Record<string, string | number | boolean>;

export const createQs = (qsObj: QsObj): string => {
  const mapC = (objAttrPairs: Array<[string, string]>) =>
    objAttrPairs.map(([k, v]) => `${k}=${v}`);
  const compose = R.compose(concat('?'), join('&'), mapC, toPairsIn);
  return compose(qsObj);
};
