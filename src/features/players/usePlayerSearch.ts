import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPlayers, type Player } from "./players.api";

export const playerKeys = {
  all: ["players"] as const,
  search: (query: string) => [...playerKeys.all, "search", query] as const,
};

/**
 * TanStack Query-backed player search. Deduplicates and caches per query string,
 * passes the abort signal through so stale requests cancel, and keeps the prior
 * results visible while the next query loads (no flicker between keystrokes).
 *
 * Debouncing the raw input is the caller's job — pass an already-debounced
 * query here so the query key stays stable.
 */
export function usePlayerSearch(query: string) {
  const trimmed = query.trim();

  return useQuery<Player[]>({
    queryKey: playerKeys.search(trimmed),
    queryFn: ({ signal }) => fetchPlayers(trimmed, signal),
    enabled: trimmed.length > 0,
    placeholderData: keepPreviousData,
  });
}
