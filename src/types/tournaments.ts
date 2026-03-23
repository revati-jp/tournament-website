export interface Tournament {
  label: string;
  slug: string;
  type: TournamentType;
}

export type TournamentType = "community" | "tmp-cup";
