export type Team = {
  score: number;
  name: string;
};

export const getTopName = (teams: Team[]): string => {
  return teams.reduce((p, t) => (t.score > p.score ? t : p)).name;
};
