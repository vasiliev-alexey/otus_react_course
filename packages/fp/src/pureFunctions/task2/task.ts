export type QsObj = Record<string, string | number | boolean>;

export const createQs = (qsObj: QsObj): string => {
  return (
    '?' +
    Object.entries(qsObj)
      .map(([k, v]) => `${k}=${v}`)
      .join('&')
  );
};
