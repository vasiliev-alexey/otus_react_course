export const mul = (first: number, second: number): number => first * second;

export const div = (first: number, second: number): number => first / second;

export const add = (first: number, second: number): number => first + second;

export const minus = (first: number, second: number): number => first - second;

export const square = (n: number): number => Math.sqrt(n);

export const power = (base: number, exponent: number): number =>
  Math.pow(base, exponent);

export const factorial = (n: number): number => (n ? n * factorial(n - 1) : 1);

export const mathOperators: {
  [key: string]: (first: number, second?: number) => number;
} = {
  '*': mul,
  '/': div,
  '+': add,
  '-': minus,
  '**': square,
  '^': power,
  '!': factorial,
};

export const mathPriorities: number[] = [0, 1, 2];

const [UNARY, FIRST, SECOND] = mathPriorities;

export const mathOperatorsPriorities: { [key: string]: number } = {
  '**': UNARY,
  '!': UNARY,
  '*': FIRST,
  '/': FIRST,
  '^': FIRST,
  '+': SECOND,
  '-': SECOND,
};
