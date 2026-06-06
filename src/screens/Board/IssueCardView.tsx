import { forwardRef, type HTMLAttributes } from "react";
import type { IssueCard } from "./Board.types";
import { PriorityBadge } from "./PriorityBadge";
import { AssigneeStack } from "./AssigneeStack";
import styles from "./IssueCard.module.css";

// Hoisted formatter — created once, reused for every card. UTC keeps the shown
// day identical to the stored ISO date regardless of the viewer's timezone.
const DATE_FMT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

interface IssueCardViewProps extends HTMLAttributes<HTMLElement> {
  card: IssueCard;
  /** Rendered inside the DragOverlay (the floating copy that follows the cursor). */
  isOverlay?: boolean;
  /** The source card while it is being dragged (faded in place). */
  isDragging?: boolean;
}

/**
 * Presentational issue card. Pure visuals — no drag wiring — so it can be reused
 * both in the column and inside the DragOverlay. Drag attributes/listeners are
 * spread in by the draggable wrapper via `...rest`.
 */
export const IssueCardView = forwardRef<HTMLElement, IssueCardViewProps>(
  function IssueCardView(
    { card, isOverlay = false, isDragging = false, className, ...rest },
    ref,
  ) {
    const classes = [
      styles.card,
      isOverlay && styles.overlay,
      isDragging && styles.dragging,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <article
        ref={ref}
        className={classes}
        aria-label={`Issue ${card.id}, ${card.priority} priority`}
        {...rest}
      >
        <header className={styles.cardHeader}>
          <span className={styles.issueId}>{card.id}</span>
          <PriorityBadge priority={card.priority} />
        </header>

        <footer className={styles.cardFooter}>
          <time className={styles.date} dateTime={card.createdAt}>
            {DATE_FMT.format(new Date(card.createdAt))}
          </time>
          <AssigneeStack assignees={card.assignees} />
        </footer>
      </article>
    );
  },
);
