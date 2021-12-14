export type QsObj = Record<string, string | number | boolean>;

export const parseQs = (qs: string): QsObj => {
  return qs
    .slice(1)
    .split('&')
    .map((v) => v.split('='))
    .reduce((a, [k, v]) => ({ ...a, [k]: v }), {});
};
