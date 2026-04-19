import type { Tournament, TournamentType } from "@types";

// より新しい大会が前に来るようにすること。
export const TOURNAMENTS = [
  {
    label: 'REVATI Community CUP "Gateway"',
    slug: "gateway",
    type: "community",
    description: "gatewayのdescription",
  },
] as const satisfies Tournament[];

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

type GetTournamentsByType<T extends TournamentType> = Extract<
  (typeof TOURNAMENTS)[number],
  { type: T }
>;

export function getTournament<T extends TournamentType>(
  type: T,
  slug: GetTournamentsByType<T>["slug"],
): Tournament {
  const tournament = TOURNAMENTS.find(
    (t) => t.type === type && t.slug === slug,
  );
  if (tournament === undefined)
    throw new Error(`Tournament not found for slug: ${slug}`);
  return tournament;
}

export function getPathToTournament(tournament: Tournament) {
  return `/${tournament.type}/${tournament.slug}`;
}
