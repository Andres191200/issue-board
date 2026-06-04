import { forwardRef } from "react";
import { SpinnerIcon } from "@/components/icons/SpinnerIcon";
import type { ButtonProps } from "./Button.types";
import styles from "./Button.module.css";

const VARIANT_CLASS = {
  primary: styles.primary,
  secondary: styles.secondary,
  danger: styles.danger,
} as const;

/**
 * Pitch-green CTA button. Purely presentational — all behaviour (form submit,
 * navigation, async state) lives with the caller, which keeps it trivially
 * reusable inside React Hook Form, links, dialogs, etc.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      fullWidth = true,
      isLoading = false,
      disabled,
      startIcon,
      endIcon,
      children,
      className,
      type = "button",
      ...rest
    },
    ref,
  ) {
    const classes = [
      styles.button,
      VARIANT_CLASS[variant],
      size === "sm" && styles.sm,
      fullWidth && styles.fullWidth,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        {...rest}
      >
        {isLoading && (
          <span className={styles.spinner}>
            <SpinnerIcon size={size === "sm" ? 18 : 22} />
          </span>
        )}
        {startIcon}
        <span className={isLoading ? styles.loadingLabel : undefined}>
          {children}
        </span>
        {endIcon}
      </button>
    );
  },
);
