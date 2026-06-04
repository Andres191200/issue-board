/** A single issue/task on the board. Card visuals are designed separately —
 *  this shape only carries what the column needs to render and key a list. */
export interface Task {
  id: string;
  title: string;
}

/** One kanban column: a stable id, a display title, and its tasks. */
export interface BoardColumnData {
  id: string;
  title: string;
  tasks: Task[];
}
