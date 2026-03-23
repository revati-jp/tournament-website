import type { Tournament, TournamentType } from "../types";

// より新しい大会が前に来るようにすること。
export const TOURNAMENTS: Tournament[] = [
  {
    label: 'REVATI Community CUP "Gateway"',
    slug: "gateway",
    type: "community",
    description: "gatewayのdescription",
  },
  {
    label: "Temporary-CUP Vol.1",
    slug: "vol1",
    type: "tmp-cup",
    description: "vol1のdescription",
  },
];

export function getLatestTournament(): Tournament {
  const latest = TOURNAMENTS[0];
  if (latest === undefined) throw new Error("Tournament not found");
  return latest;
}

export function getLatestTournamentByType(type: TournamentType): Tournament {
  const latest = TOURNAMENTS.find((t) => t.type === type);
  if (latest === undefined)
    throw new Error(`Tournament not found for type: ${type}`);
  return latest;
}

//TODO - 型安全にする?
export function getTournamentBySlug(slug: string): Tournament {
  const tournament = TOURNAMENTS.find((t) => t.slug === slug);
  if (tournament === undefined)
    throw new Error(`Tournament not found for slug: ${slug}`);
  return tournament;
}

export function getPathToTournament(tournament: Tournament) {
  return `/${tournament.type}/${tournament.slug}`;
}
