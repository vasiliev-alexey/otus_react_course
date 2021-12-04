import { originalTeamToExpectedTeam } from './task';

test('team to team deep', () => {
  const originalTeam = Object.freeze({
    name: 'Tampa Bay Roosters',
    captain: {
      name: 'Bryan Downey',
      age: 27,
    },
  });

  const expectedTeam = {
    name: 'Tampa Bay Roosters',
    captain: {
      name: 'Bryan Downey',
      age: 28,
    },
  };

  expect(originalTeamToExpectedTeam(originalTeam)).toEqual(expectedTeam);
});
