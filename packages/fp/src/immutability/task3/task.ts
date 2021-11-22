export interface Team {
  name: string;
  captain: {
    name: string;
    age: number;
  };
}

export const originalTeamToExpectedTeam = (team: Readonly<Team>): Team => {
  return { ...team, captain: { ...team.captain, age: team.captain.age + 1 } };
};
