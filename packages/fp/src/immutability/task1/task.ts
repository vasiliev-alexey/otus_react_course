// Задание 1

// Используя чистые функции массивов map/reduce, объектов Objeсt.keys, строк string.split и т.д. получить нужный результат
// Лучшая команда (наибольшее кол-во очков), выводим имя

export type OriginalTeam = {
  size: number;
  name: string;
  league: string;
};

export type ExpectedTeam = {
  name: string;
  league: string;
  roster: number;
};

function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const copy = {} as Pick<T, K>;
  keys.forEach((key) => (copy[key] = obj[key]));
  return copy;
}

export const originalTeamToExpectedTeam = (
  originalTeam: OriginalTeam
): ExpectedTeam => {
  const copy = pick(originalTeam, 'name', 'league');

  return { ...copy, name: 'New York Badgers', roster: 25 };
};
