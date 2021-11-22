import { ExpectedTeam, OriginalTeam, originalTeamToExpectedTeam } from './task';

test('team to team', () => {
  const originalTeam: OriginalTeam = Object.freeze({
    size: 15,
    name: 'Tampa Bay Roosters',
    league: 'Minor',
  });

  const expectedTeam: ExpectedTeam = {
    name: 'New York Badgers',
    league: 'Minor',
    roster: 25,
  };

  expect(originalTeamToExpectedTeam(originalTeam)).toEqual(expectedTeam);
});
