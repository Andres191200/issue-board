import { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DOMPurify from "dompurify";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal/Modal";
import { useBoardStore } from "@/store/boardStore";
import { CURRENT_USER, USERS, USERS_BY_ID } from "@/data/users";
import { AssigneePicker } from "./AssigneePicker";
import { PRIORITY_VALUES, type Assignee, type Priority } from "./Board.types";
import { taskFormSchema, type TaskFormValues } from "./taskSchema";
import styles from "./NewTaskForm.module.css";

const PRIORITY_LABEL: Record<Priority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

// Per-priority class for the checked colour (green / amber / red).
const SEGMENT_CLASS: Record<Priority, string> = {
  low: styles.segmentLow,
  medium: styles.segmentMedium,
  high: styles.segmentHigh,
};

// Plain-language meaning shown below the priority buttons.
const PRIORITY_HELP: Record<Priority, string> = {
  low: "A minor issue that can be picked up whenever there's time.",
  medium: "An important issue to address soon, but it isn't blocking.",
  high: "A critical issue that must be resolved as soon as possible.",
};

const DEFAULT_VALUES: TaskFormValues = {
  title: "",
  description: "",
  priority: "medium",
  assigneeIds: [],
};

// Strip ALL markup — fields are plain text, so any tag/attribute is unwanted and
// a potential XSS vector if ever rendered as HTML.
function sanitizeText(value: string): string {
  return DOMPurify.sanitize(value, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  }).trim();
}

interface NewTaskFormProps {
  onClose: () => void;
}

/** "New Task" creation form, shown in a modal. Mount only while open so RHF
 *  state starts fresh each time. */
export function NewTaskForm({ onClose }: NewTaskFormProps) {
  const addCard = useBoardStore((state) => state.addCard);
  const titleId = useId();
  const descriptionId = useId();
  const assigneesLabelId = useId();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onTouched",
  });

  // Drives the helper text under the priority buttons.
  const selectedPriority = watch("priority");

  function onSubmit(values: TaskFormValues) {
    const assignees = values.assigneeIds
      .map((id) => USERS_BY_ID.get(id))
      .filter((user): user is Assignee => Boolean(user));

    addCard({
      title: sanitizeText(values.title),
      description: sanitizeText(values.description),
      creator: CURRENT_USER,
      priority: values.priority,
      assignees,
    });
    onClose();
  }

  return (
    <Modal labelledBy={titleId} onClose={onClose}>
      <header className={styles.header}>
        <h2 id={titleId} className={styles.title}>
          New Task
        </h2>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close dialog"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path
              d="M4 4l10 10M14 4L4 14"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </header>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.creator}>
          <span className={styles.creatorLabel}>Created by</span>
          <span className={styles.creatorUser}>
            <span className={styles.creatorAvatar} aria-hidden="true">
              TU
            </span>
            {CURRENT_USER}
          </span>
        </div>

        <Input
          label="Title"
          placeholder="Short summary of the issue"
          autoFocus
          autoComplete="off"
          error={errors.title?.message}
          {...register("title")}
        />

        <div className={styles.field}>
          <label className={styles.label} htmlFor={descriptionId}>
            Description
          </label>
          <textarea
            id={descriptionId}
            className={styles.textarea}
            placeholder="Add more detail (optional)"
            rows={4}
            aria-invalid={errors.description ? true : undefined}
            {...register("description")}
          />
          {errors.description ? (
            <span className={styles.error}>{errors.description.message}</span>
          ) : null}
        </div>

        <fieldset className={styles.fieldset}>
          <legend className={styles.label}>Priority</legend>
          <div className={styles.segment}>
            {PRIORITY_VALUES.map((priority) => (
              <label key={priority} className={styles.segmentOption}>
                <input
                  type="radio"
                  className={styles.segmentInput}
                  value={priority}
                  {...register("priority")}
                />
                <span
                  className={`${styles.segmentLabel} ${SEGMENT_CLASS[priority]}`}
                >
                  {PRIORITY_LABEL[priority]}
                </span>
              </label>
            ))}
          </div>
          <p className={styles.priorityHint} aria-live="polite">
            {PRIORITY_HELP[selectedPriority]}
          </p>
          {errors.priority ? (
            <span className={styles.error}>{errors.priority.message}</span>
          ) : null}
        </fieldset>

        <div className={styles.field}>
          <span className={styles.label} id={assigneesLabelId}>
            Assigned users
          </span>
          <Controller
            control={control}
            name="assigneeIds"
            render={({ field }) => (
              <AssigneePicker
                users={USERS}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                labelId={assigneesLabelId}
              />
            )}
          />
          {errors.assigneeIds ? (
            <span className={styles.error}>{errors.assigneeIds.message}</span>
          ) : null}
        </div>

        <div className={styles.footer}>
          <Button
            type="button"
            variant="secondary"
            fullWidth={false}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit" fullWidth={false} isLoading={isSubmitting}>
            Create Task
          </Button>
        </div>
      </form>
    </Modal>
  );
}
