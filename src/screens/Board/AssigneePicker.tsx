import type { Assignee } from "./Board.types";
import { getInitials, getToneIndex } from "./avatar";
import styles from "./NewTaskForm.module.css";

const TONE_CLASS = [styles.tone0, styles.tone1, styles.tone2, styles.tone3];

interface AssigneePickerProps {
  users: readonly Assignee[];
  /** Selected user ids. */
  value: readonly string[];
  onChange: (ids: string[]) => void;
  onBlur?: () => void;
  /** id of the label that titles the group (for aria-labelledby). */
  labelId?: string;
}

/**
 * Manage which users are assigned to the task. Each row is a real toggle button
 * (`aria-pressed`) so selection works with mouse and keyboard alike.
 */
export function AssigneePicker({
  users,
  value,
  onChange,
  onBlur,
  labelId,
}: AssigneePickerProps) {
  const selected = new Set(value);

  function toggle(id: string) {
    const next = new Set(selected);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    onChange([...next]);
  }

  return (
    <div className={styles.picker} role="group" aria-labelledby={labelId}>
      {users.map((user) => {
        const isSelected = selected.has(user.id);
        const fullName = `${user.firstName} ${user.lastName}`;
        const rowClass = isSelected
          ? `${styles.userRow} ${styles.userRowSelected}`
          : styles.userRow;

        return (
          <button
            key={user.id}
            type="button"
            className={rowClass}
            aria-pressed={isSelected}
            onClick={() => toggle(user.id)}
            onBlur={onBlur}
          >
            <span
              className={`${styles.pickerAvatar} ${TONE_CLASS[getToneIndex(user)]}`}
              aria-hidden="true"
            >
              {getInitials(user)}
            </span>
            <span className={styles.userName}>{fullName}</span>
            <span className={styles.check} aria-hidden="true">
              {isSelected ? "✓" : ""}
            </span>
          </button>
        );
      })}
    </div>
  );
}
