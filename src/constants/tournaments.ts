import type { Tournament, TournamentType } from "../types";

// より新しい大会が前に来るようにすること。
export const TOURNAMENTS: Tournament[] = [
  {
    label: 'REVATI Community CUP "Gateway"',
    slug: "gateway",
    type: "community",
  },
  {
    label: "Temporary-CUP Vol.1",
    slug: "vol1",
    type: "tmp-cup",
  },
];

export function getLatestTournament(): Tournament {
  return TOURNAMENTS[0];
}

export function getLatestTournamentByType(type: TournamentType): Tournament {
  const latest = TOURNAMENTS.find((t) => t.type === type);
  if (latest === undefined)
    throw new Error(`Tournament not found for type: ${type}`);
  return latest;
}

export function getPathToTournament(tournament: Tournament): string {
  return `/${tournament.type}/${tournament.slug}`;
}
