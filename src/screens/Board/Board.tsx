import { BoardColumn } from "./BoardColumn";
import { TopBar } from "./TopBar";
import type { BoardColumnData } from "./Board.types";
import styles from "./Board.module.css";

// Hoisted once at module level — the board's fixed column layout. Task lists are
// empty for now; cards will be designed later.
const COLUMNS: readonly BoardColumnData[] = [
  { id: "todo", title: "To Do", tasks: [] },
  { id: "doing", title: "Doing", tasks: [] },
  { id: "review", title: "Review", tasks: [] },
  { id: "done", title: "Done", tasks: [] },
];

/** Root screen (route "/") — a four-column kanban board. */
export default function Board() {
  return (
    <div className={styles.page}>
      <TopBar />
      <main className={styles.board}>
        {COLUMNS.map((column) => (
          <BoardColumn
            key={column.id}
            title={column.title}
            tasks={column.tasks}
          />
        ))}
      </main>
    </div>
  );
}
