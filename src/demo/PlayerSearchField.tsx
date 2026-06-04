import { useMemo, useState } from "react";
import { Dropdown, type DropdownOption } from "@/components/Dropdown";
import { useDebouncedValue } from "@/lib/useDebouncedValue";
import { usePlayerSearch } from "@/features/players/usePlayerSearch";
import type { Player } from "@/features/players/players.api";

/**
 * Demo: the Dropdown combobox fed by a TanStack Query search.
 * - local `query` state drives the input
 * - the debounced query drives the query key (one request per pause)
 * - options are derived during render from the query result (no effect/sync)
 */
export function PlayerSearchField() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Player | null>(null);

  const debouncedQuery = useDebouncedValue(query, 250);
  const { data, isFetching, isError } = usePlayerSearch(debouncedQuery);

  const options = useMemo<DropdownOption<Player>[]>(
    () =>
      (data ?? []).map((player) => ({
        value: player.id,
        label: player.name,
        description: `${player.position} · ${player.club}`,
        data: player,
      })),
    [data],
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Dropdown<Player>
        label="Jugador"
        options={options}
        value={selected?.id ?? null}
        inputValue={query}
        onInputChange={setQuery}
        onChange={(option) => setSelected(option.data ?? null)}
        isLoading={isFetching}
        emptyMessage={
          debouncedQuery ? "Sin resultados" : "Escribí para buscar"
        }
        error={isError ? "No se pudo buscar. Intentá de nuevo." : undefined}
      />
      {selected && (
        <p style={{ margin: 0, fontSize: 12, color: "var(--fg-2)" }}>
          Seleccionado: <strong style={{ color: "var(--fg-1)" }}>{selected.name}</strong>{" "}
          ({selected.position})
        </p>
      )}
    </div>
  );
}
