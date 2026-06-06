import { z } from "zod";
import { PRIORITY_VALUES } from "./Board.types";

/**
 * Validation schema for the New Task form. Wired into React Hook Form via
 * `zodResolver`, so these messages surface as field errors.
 */
export const taskFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(80, "Title must be 80 characters or fewer"),
  description: z
    .string()
    .trim()
    .max(500, "Description must be 500 characters or fewer"),
  priority: z.enum(PRIORITY_VALUES),
  assigneeIds: z.array(z.string()).min(1, "Assign at least one user"),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;
