// eslint-disable-next-line @typescript-eslint/ban-types
export function compose(...funcs: Function[]): Function {
  if (funcs.length === 0) {
    return (arg: unknown) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  const last = funcs[funcs.length - 1];
  const rest = funcs.slice(0, -1);
  return (...args: unknown[]) =>
    rest.reduceRight((composed, f) => f(composed), last(...args));
}
