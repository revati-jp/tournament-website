export interface Tournament {
  label: string;
  slug: string;
  type: TournamentType;
  description: string;
}

export type TournamentType = "community" | "tmp-cup";
