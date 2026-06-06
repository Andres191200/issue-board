import type { Priority } from "./Board.types";
import styles from "./IssueCard.module.css";

// Hoisted lookup maps — allocated once, no per-render objects.
const PRIORITY_CLASS: Record<Priority, string> = {
  low: styles.priorityLow,
  medium: styles.priorityMedium,
  high: styles.priorityHigh,
};

const PRIORITY_LABEL: Record<Priority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

interface PriorityBadgeProps {
  priority: Priority;
}

/** Priority pill. Level is conveyed by the text label as well as colour, so it
 *  never relies on colour alone. */
export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <span className={`${styles.priority} ${PRIORITY_CLASS[priority]}`}>
      <span className={styles.priorityDot} aria-hidden="true" />
      {PRIORITY_LABEL[priority]}
    </span>
  );
}
