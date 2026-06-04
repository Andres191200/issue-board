# Arma tu 11 — UI Kit

Base component library (**Button**, **Input**, **Dropdown**) built on the
_Arma tu 11_ design system — a dark-mode, Argentine-Spanish football team
builder. Stack: **React + Vite + TypeScript**, **React Hook Form**, **TanStack
Query**, styled with **CSS Modules** over the design-system tokens.

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:5173 — showcase page
pnpm build      # tsc -b + vite build
pnpm typecheck
```

## Design source

Implemented from the Claude Design handoff bundle (`design-system-arma-tu-11`).
All tokens live in [src/styles/tokens.css](src/styles/tokens.css), ported
verbatim from the bundle's `colors_and_type.css`: pitch-green `#239414` brand,
near-black surfaces, **Anton** display font for CTAs, **Inter** for chrome,
**Manrope** for input values. Button/Input/Dropdown specs come from the bundle's
`preview/*.html` and `Primitives.jsx`.

## Architecture — components vs. logic

Following the `vercel-react-best-practices` skill, presentation is split from
behaviour:

| Concern | Lives in |
| --- | --- |
| Pure, props-driven UI | `Button.tsx`, `Input.tsx`, `Dropdown.tsx` |
| Reusable behaviour (headless hooks) | `usePasswordToggle.ts`, `useDropdown.ts` |
| Data fetching | `features/players/usePlayerSearch.ts` (TanStack Query) |
| Form state | `demo/LoginForm.tsx` (React Hook Form) |

Specific rules applied:

- **No components defined inside components** — `Section`, icons, and demos are
  all top-level (prevents remount-on-render).
- **Headless logic hooks** — combobox keyboard nav, outside-click, and password
  reveal are extracted so they're testable and reusable independent of markup.
- **Functional `setState`** — toggles/highlight updates use the updater form for
  stable, dependency-free callbacks.
- **Derived state, no syncing effects** — the dropdown highlight is clamped
  during render and option lists are derived with `useMemo`, never mirrored into
  state via `useEffect`.
- **Scoped event listeners** — the outside-click listener is bound only while
  the menu is open and cleaned up on close.
- **Form-native components** — `Input`/`PasswordInput` forward refs and spread
  native props, so `{...register("field")}` from RHF works with no wrappers.
- **TanStack Query** — `usePlayerSearch` dedupes/caches per query, cancels stale
  requests via the abort signal, and keeps previous results during refetch
  (`keepPreviousData`). The raw input is debounced before it hits the query key.

## Layout

```
src/
  components/
    Button/      Button.tsx · Button.module.css · Button.types.ts
    Input/       Input.tsx · PasswordInput.tsx · usePasswordToggle.ts · *.module.css
    Dropdown/    Dropdown.tsx · useDropdown.ts · Dropdown.types.ts · *.module.css
    icons/       one file per glyph + base Icon.tsx (direct-import friendly)
  features/players/  players.api.ts · usePlayerSearch.ts
  demo/          LoginForm.tsx · PlayerSearchField.tsx
  lib/           queryClient.ts · useDebouncedValue.ts
  styles/        tokens.css · global.css
```

## Components

- **`<Button>`** — variants `primary | secondary | danger`, sizes `md | sm`,
  `isLoading`, `startIcon`/`endIcon`, `fullWidth`. Forwards ref.
- **`<Input>`** — label, leading/trailing adornments, `error`/`hint` with
  `aria-invalid` + `aria-describedby`. `<PasswordInput>` adds the reveal toggle.
- **`<Dropdown>`** — generic searchable single-select combobox with keyboard
  navigation, loading/empty/error states, and `aria-` combobox semantics. Feed
  `options` from any source (the demo uses TanStack Query).
