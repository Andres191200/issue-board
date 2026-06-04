import type { ReactNode } from "react";

export interface DropdownOption<TData = unknown> {
  /** Stable identity for the option. */
  value: string;
  /** Text shown in the row and written back to the input on select. */
  label: string;
  /** Optional secondary line (e.g. club / position). */
  description?: string;
  /** Arbitrary payload handed back to onChange. */
  data?: TData;
  /** Render the row non-selectable (e.g. a "suggestion" heading). */
  disabled?: boolean;
}

export interface DropdownProps<TData = unknown> {
  /** Field label rendered above the control. */
  label?: ReactNode;
  /** Options to display. Drive this from TanStack Query for async search. */
  options: DropdownOption<TData>[];
  /** Currently selected value (controlled). */
  value?: string | null;
  /** Fired when an option is chosen. */
  onChange?: (option: DropdownOption<TData>) => void;
  /** Search query (controlled) — wire to your query key for async search. */
  inputValue: string;
  /** Fired on every keystroke in the search box. */
  onInputChange: (query: string) => void;
  /** Called when the field loses focus (handy for RHF `onBlur`). */
  onBlur?: () => void;
  placeholder?: string;
  /** Show the spinner in the trailing slot while options load. */
  isLoading?: boolean;
  /** Message shown when the menu is open with no options and not loading. */
  emptyMessage?: ReactNode;
  /** Error message; switches the control to the destructive style. */
  error?: ReactNode;
  disabled?: boolean;
  /** Leading adornment. Defaults to a search icon. */
  leading?: ReactNode;
  /** Field name (forwarded for form integration). */
  name?: string;
  className?: string;
}
