import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "danger";
export type ButtonSize = "md" | "sm";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  /** Visual treatment. Defaults to "primary" (filled pitch-green). */
  variant?: ButtonVariant;
  /** Control height. "md" = 48px (default), "sm" = 40px. */
  size?: ButtonSize;
  /** Stretch to the container width. Defaults to true (matches the Figma CTA). */
  fullWidth?: boolean;
  /** Show a spinner and block interaction without collapsing layout. */
  isLoading?: boolean;
  /** Icon rendered before the label. */
  startIcon?: ReactNode;
  /** Icon rendered after the label. */
  endIcon?: ReactNode;
  /** Escape hatch to compose extra class names. */
  className?: string;
}
