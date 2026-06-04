import type { InputHTMLAttributes, ReactNode } from "react";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  /** Field label rendered above the control (white, Inter 12). */
  label?: ReactNode;
  /** Error message. When set, the control shows the destructive border + text. */
  error?: ReactNode;
  /** Helper/hint text shown below when there is no error. */
  hint?: ReactNode;
  /** Element rendered at the start of the control (icon). */
  leading?: ReactNode;
  /** Element rendered at the end of the control (icon or action button). */
  trailing?: ReactNode;
  /** Escape hatch for the outer field wrapper. */
  className?: string;
}
