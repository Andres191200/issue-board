import type { Assignee } from "./Board.types";
import { getInitials, getToneIndex } from "./avatar";
import styles from "./IssueCard.module.css";

const MAX_VISIBLE = 3;

// Tone class per avatar index — hoisted, indexed by getToneIndex().
const TONE_CLASS = [styles.tone0, styles.tone1, styles.tone2, styles.tone3];

interface AssigneeStackProps {
  assignees: readonly Assignee[];
}

/**
 * Overlapping avatar circles with two-letter initials. Shows at most three; any
 * remaining assignees collapse into a "+N" chip (e.g. "+2", "+3").
 */
export function AssigneeStack({ assignees }: AssigneeStackProps) {
  const total = assignees.length;
  const visible =
    total > MAX_VISIBLE ? assignees.slice(0, MAX_VISIBLE) : assignees;
  const overflow = total - visible.length;

  return (
    <ul className={styles.assignees} aria-label={`${total} assignees`}>
      {visible.map((assignee) => {
        const fullName = `${assignee.firstName} ${assignee.lastName}`;
        return (
          <li
            key={assignee.id}
            className={`${styles.avatar} ${TONE_CLASS[getToneIndex(assignee)]}`}
            title={fullName}
            aria-label={fullName}
          >
            <span aria-hidden="true">{getInitials(assignee)}</span>
          </li>
        );
      })}
      {overflow > 0 ? (
        <li
          className={`${styles.avatar} ${styles.overflow}`}
          aria-label={`${overflow} more`}
        >
          <span aria-hidden="true">+{overflow}</span>
        </li>
      ) : null}
    </ul>
  );
}
