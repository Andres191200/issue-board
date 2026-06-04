export interface Player {
  id: string;
  name: string;
  position: string;
  club: string;
}

// Stand-in dataset. Swap fetchPlayers for a real endpoint later — the query
// hook and Dropdown don't care where the data comes from.
const PLAYERS: Player[] = [
  { id: "messi", name: "Lionel Messi", position: "Delantero", club: "Inter Miami" },
  { id: "dimaria", name: "Ángel Di María", position: "Extremo", club: "Benfica" },
  { id: "alvarez", name: "Julián Álvarez", position: "Delantero", club: "Atlético" },
  { id: "martinez", name: "Lautaro Martínez", position: "Delantero", club: "Inter" },
  { id: "dybala", name: "Paulo Dybala", position: "Mediapunta", club: "Roma" },
  { id: "demartinez", name: "Emiliano Martínez", position: "Arquero", club: "Aston Villa" },
  { id: "deklaus", name: "Cristian Romero", position: "Defensor", club: "Tottenham" },
  { id: "mac", name: "Alexis Mac Allister", position: "Mediocampista", club: "Liverpool" },
  { id: "enzo", name: "Enzo Fernández", position: "Mediocampista", club: "Chelsea" },
  { id: "molina", name: "Nahuel Molina", position: "Lateral", club: "Atlético" },
];

/** Simulates a network search with latency. Throws so error states are demoable. */
export async function fetchPlayers(
  query: string,
  signal?: AbortSignal,
): Promise<Player[]> {
  await new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, 350);
    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });

  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];
  return PLAYERS.filter((player) =>
    player.name.toLowerCase().includes(normalized),
  );
}
