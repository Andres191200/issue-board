import { useMemo, useState } from "react";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useBoardStore } from "@/store/boardStore";
import { BoardColumn } from "./BoardColumn";
import { IssueCardView } from "./IssueCardView";
import { TopBar } from "./TopBar";
import type { BoardColumnMeta, ColumnId, IssueCard } from "./Board.types";
import styles from "./Board.module.css";

// Hoisted once — the board's fixed columns and a fast id lookup for drop checks.
const COLUMNS: readonly BoardColumnMeta[] = [
  { id: "todo", title: "To Do" },
  { id: "doing", title: "Doing" },
  { id: "review", title: "Review" },
  { id: "done", title: "Done" },
];
const COLUMN_IDS = new Set<string>(COLUMNS.map((column) => column.id));

/** Group cards by column in a single pass for O(1) per-column lookup. */
function groupByColumn(cards: readonly IssueCard[]): Record<ColumnId, IssueCard[]> {
  const groups: Record<ColumnId, IssueCard[]> = {
    todo: [],
    doing: [],
    review: [],
    done: [],
  };
  for (const card of cards) groups[card.columnId].push(card);
  return groups;
}

/** Root screen (route "/") — a four-column kanban board with draggable cards. */
export default function Board() {
  const cards = useBoardStore((state) => state.cards);
  const moveCard = useBoardStore((state) => state.moveCard);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Recompute grouping only when the card set changes.
  const grouped = useMemo(() => groupByColumn(cards), [cards]);
  const activeCard = activeId
    ? cards.find((card) => card.id === activeId) ?? null
    : null;

  // A small activation distance lets clicks through; KeyboardSensor enables
  // dragging via keyboard (Space to pick up, arrows to move, Space to drop).
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor),
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const overId = event.over ? String(event.over.id) : null;
    if (!overId || !COLUMN_IDS.has(overId)) return;
    moveCard(String(event.active.id), overId as ColumnId);
  }

  return (
    <div className={styles.page}>
      <TopBar />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveId(null)}
      >
        <main className={styles.board}>
          {COLUMNS.map((column) => (
            <BoardColumn
              key={column.id}
              id={column.id}
              title={column.title}
              cards={grouped[column.id]}
            />
          ))}
        </main>
        <DragOverlay>
          {activeCard ? <IssueCardView card={activeCard} isOverlay /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
