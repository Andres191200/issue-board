import type { Assignee } from "@/screens/Board/Board.types";

/** Hardcoded creator for every new task (no auth yet). */
export const CURRENT_USER = "Test User";

/** Hardcoded directory of users that can be assigned to a task. */
export const USERS: readonly Assignee[] = [
  { id: "u1", firstName: "Ana", lastName: "Gomez" },
  { id: "u2", firstName: "Luis", lastName: "Pena" },
  { id: "u3", firstName: "Marta", lastName: "Ruiz" },
  { id: "u4", firstName: "Diego", lastName: "Sosa" },
  { id: "u5", firstName: "Sara", lastName: "Lopez" },
  { id: "u6", firstName: "Tomas", lastName: "Vera" },
  { id: "u9", firstName: "Pablo", lastName: "Cano" },
  { id: "u10", firstName: "Rosa", lastName: "Vega" },
  { id: "u11", firstName: "Elena", lastName: "Bravo" },
  { id: "u12", firstName: "Hugo", lastName: "Ramos" },
];

/** Lookup by id for resolving selected ids back to full users. */
export const USERS_BY_ID: ReadonlyMap<string, Assignee> = new Map(
  USERS.map((user) => [user.id, user]),
);
