import {
  getLatestTournament,
  getLatestTournamentByType,
  getPathToTournament,
  TOURNAMENTS,
} from "@constants/tournaments";
import type { TournamentType } from "@types";

const latest = getPathToTournament(getLatestTournament());

interface Env {
  ASSETS: Fetcher;
}

function redirect(location: string) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: location,
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}

function isTournamentType(type: string): type is TournamentType {
  return TOURNAMENTS.some((t) => t.type === type);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // `/` は最新の大会へリダイレクト
    if (url.pathname === "/") {
      return redirect(latest);
    }

    const segments = url.pathname.split("/").filter(Boolean);

    // `/<tournament-type>/` はそのtypeの最新の大会へリダイレクト
    if (segments.length === 1) {
      const tournamentType = segments[0];

      if (isTournamentType(tournamentType)) {
        const tournament = getLatestTournamentByType(tournamentType);
        return redirect(getPathToTournament(tournament));
      }
    }

    // それ以外はAstroの静的ファイルを返す
    return env.ASSETS.fetch(request);
  },
};
