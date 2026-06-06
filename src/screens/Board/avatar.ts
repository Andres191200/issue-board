import type { Assignee } from "./Board.types";

/** Number of avatar colour tones available (see `.tone*` in IssueCard.module.css). */
export const AVATAR_TONE_COUNT = 4;

/** Two-letter initials from first + last name, e.g. "Ana Gomez" -> "AG". */
export function getInitials(assignee: Assignee): string {
  const first = assignee.firstName.charAt(0);
  const last = assignee.lastName.charAt(0);
  return (first + last).toUpperCase();
}

/** Stable, deterministic tone index for a name — same person always gets the
 *  same colour, with no Math.random (keeps renders consistent). */
export function getToneIndex(assignee: Assignee): number {
  const seed = assignee.id || assignee.firstName + assignee.lastName;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % AVATAR_TONE_COUNT;
}
