/** The four fixed columns of the board. */
export type ColumnId = "todo" | "doing" | "review" | "done";

/** Issue priority levels. */
export type Priority = "low" | "medium" | "high";

/** A person an issue is assigned to. Initials + avatar colour are derived from
 *  the name, so only the name and a stable id are stored. */
export interface Assignee {
  id: string;
  firstName: string;
  lastName: string;
}

/**
 * A single issue card on the board.
 * Carries exactly the data shown on the card, plus the column it lives in so the
 * store can place it and drag-and-drop can move it.
 */
export interface IssueCard {
  /** Human-facing issue identifier, e.g. "ISS-128". */
  id: string;
  /** ISO-8601 date the issue was created, e.g. "2026-05-21". */
  createdAt: string;
  /** Priority level — drives the badge colour. */
  priority: Priority;
  /** Everyone assigned to the issue (avatars overflow to "+N" past three). */
  assignees: Assignee[];
  /** Which column the card currently sits in. */
  columnId: ColumnId;
}

/** Static metadata for a board column. */
export interface BoardColumnMeta {
  id: ColumnId;
  title: string;
}
