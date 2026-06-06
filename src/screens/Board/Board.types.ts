/** The four fixed columns of the board. */
export type ColumnId = "todo" | "doing" | "review" | "done";

/** Allowed priority values — single source of truth for the type and the
 *  zod schema / radio options. */
export const PRIORITY_VALUES = ["low", "medium", "high"] as const;

/** Issue priority levels. */
export type Priority = (typeof PRIORITY_VALUES)[number];

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
  /** Short summary of the issue. */
  title: string;
  /** Longer description (plain text — sanitized on creation). */
  description: string;
  /** Who created the issue (display name). */
  creator: string;
  /** ISO-8601 date the issue was created, e.g. "2026-05-21". */
  createdAt: string;
  /** Priority level — drives the badge colour. */
  priority: Priority;
  /** Everyone assigned to the issue (avatars overflow to "+N" past three). */
  assignees: Assignee[];
  /** Which column the card currently sits in. */
  columnId: ColumnId;
}

/** Payload for creating a new issue. The store fills in id, createdAt and the
 *  starting column. */
export interface NewIssueInput {
  title: string;
  description: string;
  creator: string;
  priority: Priority;
  assignees: Assignee[];
}

/** Static metadata for a board column. */
export interface BoardColumnMeta {
  id: ColumnId;
  title: string;
}
