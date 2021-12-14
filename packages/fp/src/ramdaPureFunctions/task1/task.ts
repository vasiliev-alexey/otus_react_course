import * as R from 'ramda';

export type Team = { name: string; score: number };

export const getTopName = (teams: Team[]): string => {
  const getTeamName = (team: Team) => team.name;
  const findSuperTeam = (teamList: typeof teams) =>
    R.reduce((p, c) => (c.score > p.score ? c : p), { score: 0 }, teamList);
  return R.compose(getTeamName, findSuperTeam)(teams);
};
