import { useDroppable } from "@dnd-kit/core";
import type { ColumnId, IssueCard } from "./Board.types";
import { DraggableIssueCard } from "./DraggableIssueCard";
import styles from "./Board.module.css";

interface BoardColumnProps {
  id: ColumnId;
  title: string;
  cards: readonly IssueCard[];
}

/**
 * A kanban column and drop target. Shows its cards, or a centered
 * "No tasks here" empty state. The body highlights while a card is dragged over.
 * Top-level component (not inlined in Board) to avoid remounting on each render.
 */
export function BoardColumn({ id, title, cards }: BoardColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const isEmpty = cards.length === 0;

  const bodyClass = isOver
    ? `${styles.columnBody} ${styles.columnBodyOver}`
    : styles.columnBody;

  return (
    <section className={styles.column} aria-label={title}>
      <header className={styles.columnHeader}>
        <h2 className={styles.columnTitle}>{title}</h2>
        <span className={styles.count}>{cards.length}</span>
      </header>

      <div ref={setNodeRef} className={bodyClass}>
        {isEmpty ? (
          <p className={styles.empty}>No tasks here</p>
        ) : (
          cards.map((card) => <DraggableIssueCard key={card.id} card={card} />)
        )}
      </div>
    </section>
  );
}
