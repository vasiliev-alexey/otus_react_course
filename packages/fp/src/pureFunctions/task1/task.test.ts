import { getTopName, Team } from './task';

test('getTopName', () => {
  const teams: Team[] = [
    { name: 'Lions', score: 5 },
    { name: 'Tigers', score: 4 },
    { name: 'Bears', score: 6 },
    { name: 'Monkeys', score: 2 },
  ];
  expect(getTopName(teams)).toBe('Bears');
});
