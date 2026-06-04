import type { Task } from "./Board.types";
import styles from "./Board.module.css";

interface BoardColumnProps {
  title: string;
  tasks: readonly Task[];
}

/**
 * A single kanban column. Renders its header (title + count) and body. When the
 * column has no tasks it shows a centered "No tasks here" empty state — the
 * current state for every column until task cards are designed.
 * Top-level component (not inlined in Board) to avoid remounting on each render.
 */
export function BoardColumn({ title, tasks }: BoardColumnProps) {
  const isEmpty = tasks.length === 0;

  return (
    <section className={styles.column} aria-label={title}>
      <header className={styles.columnHeader}>
        <h2 className={styles.columnTitle}>{title}</h2>
        <span className={styles.count}>{tasks.length}</span>
      </header>

      <div className={styles.columnBody}>
        {isEmpty ? (
          <p className={styles.empty}>No tasks here</p>
        ) : (
          // Task cards are intentionally not designed yet — placeholder keeps
          // the populated state structurally complete.
          tasks.map((task) => (
            <div key={task.id} className={styles.taskPlaceholder}>
              {task.title}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
