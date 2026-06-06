import { create } from "zustand";
import type {
  ColumnId,
  IssueCard,
  NewIssueInput,
} from "@/screens/Board/Board.types";

/** Seed data. The `done` column is intentionally left empty to exercise the
 *  "No tasks here" empty state; two cards carry 5–6 assignees to show "+2"/"+3". */
const INITIAL_CARDS: IssueCard[] = [
  {
    id: "ISS-128",
    title: "Fix login redirect loop",
    description: "Users bounce between /login and /home after signing in.",
    creator: "Test User",
    createdAt: "2026-05-21",
    priority: "high",
    columnId: "todo",
    assignees: [
      { id: "u1", firstName: "Ana", lastName: "Gomez" },
      { id: "u2", firstName: "Luis", lastName: "Pena" },
    ],
  },
  {
    id: "ISS-131",
    title: "Tidy up empty states",
    description: "Add illustrations to the empty board columns.",
    creator: "Test User",
    createdAt: "2026-05-28",
    priority: "low",
    columnId: "todo",
    assignees: [{ id: "u3", firstName: "Marta", lastName: "Ruiz" }],
  },
  {
    id: "ISS-140",
    title: "Drag-and-drop polish",
    description: "Improve the drop affordance and keyboard support.",
    creator: "Test User",
    createdAt: "2026-06-01",
    priority: "medium",
    columnId: "doing",
    assignees: [
      { id: "u4", firstName: "Diego", lastName: "Sosa" },
      { id: "u5", firstName: "Sara", lastName: "Lopez" },
      { id: "u6", firstName: "Tomas", lastName: "Vera" },
      { id: "u7", firstName: "Nora", lastName: "Diaz" },
      { id: "u8", firstName: "Iván", lastName: "Mora" },
    ],
  },
  {
    id: "ISS-142",
    title: "Audit color contrast",
    description: "Check all text/background pairs against WCAG AA.",
    creator: "Test User",
    createdAt: "2026-06-03",
    priority: "high",
    columnId: "doing",
    assignees: [
      { id: "u9", firstName: "Pablo", lastName: "Cano" },
      { id: "u10", firstName: "Rosa", lastName: "Vega" },
    ],
  },
  {
    id: "ISS-118",
    title: "Review API error handling",
    description: "Standardize toast messages for failed requests.",
    creator: "Test User",
    createdAt: "2026-05-14",
    priority: "medium",
    columnId: "review",
    assignees: [
      { id: "u11", firstName: "Elena", lastName: "Bravo" },
      { id: "u12", firstName: "Hugo", lastName: "Ramos" },
      { id: "u13", firstName: "Cira", lastName: "Mata" },
      { id: "u14", firstName: "Beto", lastName: "Nieto" },
      { id: "u15", firstName: "Lara", lastName: "Solo" },
      { id: "u16", firstName: "Mateo", lastName: "Cruz" },
    ],
  },
  {
    id: "ISS-125",
    title: "Write onboarding docs",
    description: "Document the board store and component structure.",
    creator: "Test User",
    createdAt: "2026-05-19",
    priority: "low",
    columnId: "review",
    assignees: [{ id: "u17", firstName: "Vera", lastName: "Lima" }],
  },
];

/** Next numeric suffix for a generated "ISS-###" id, from the existing cards. */
function nextIssueId(cards: readonly IssueCard[]): string {
  let max = 0;
  for (const card of cards) {
    const n = Number.parseInt(card.id.replace(/^\D+/, ""), 10);
    if (Number.isFinite(n) && n > max) max = n;
  }
  return `ISS-${max + 1}`;
}

interface BoardState {
  cards: IssueCard[];
  /** Move a card to another column (no-op if it is already there). */
  moveCard: (cardId: string, toColumn: ColumnId) => void;
  /** Create a new issue in the "todo" column; returns the generated id. */
  addCard: (input: NewIssueInput) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  cards: INITIAL_CARDS,
  moveCard: (cardId, toColumn) =>
    set((state) => {
      const card = state.cards.find((c) => c.id === cardId);
      // Cheap guard before allocating a new array — skip identical moves.
      if (!card || card.columnId === toColumn) return state;
      return {
        cards: state.cards.map((c) =>
          c.id === cardId ? { ...c, columnId: toColumn } : c,
        ),
      };
    }),
  addCard: (input) =>
    set((state) => {
      const newCard: IssueCard = {
        ...input,
        id: nextIssueId(state.cards),
        createdAt: new Date().toISOString().slice(0, 10),
        columnId: "todo",
      };
      // Prepend so the newest issue appears at the top of "To Do".
      return { cards: [newCard, ...state.cards] };
    }),
}));
