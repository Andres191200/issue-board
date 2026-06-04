import { forwardRef, useId } from "react";
import type { InputProps } from "./Input.types";
import styles from "./Input.module.css";

/**
 * Surface text input. Fully presentational and uncontrolled-friendly: it
 * forwards its ref to the native <input> and spreads through `name`,
 * `onChange`, `onBlur`, `value`/`defaultValue`, so `{...register("field")}`
 * from React Hook Form just works.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, leading, trailing, className, id, disabled, ...rest },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;
  const hasError = Boolean(error);

  const fieldClass = [styles.field, className].filter(Boolean).join(" ");
  const controlClass = [styles.control, hasError && styles.error]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={fieldClass}>
      {label != null && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      )}

      <div className={controlClass}>
        {leading != null && <span className={styles.adornment}>{leading}</span>}

        <input
          ref={ref}
          id={inputId}
          className={styles.input}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={error || hint ? messageId : undefined}
          {...rest}
        />

        {trailing != null && (
          <span className={styles.adornment}>{trailing}</span>
        )}
      </div>

      {hasError ? (
        <span
          id={messageId}
          className={`${styles.message} ${styles.errorMessage}`}
        >
          {error}
        </span>
      ) : hint != null ? (
        <span
          id={messageId}
          className={`${styles.message} ${styles.hintMessage}`}
        >
          {hint}
        </span>
      ) : null}
    </div>
  );
});
