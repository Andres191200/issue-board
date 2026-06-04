import { memo } from "react";
import type { DropdownOption } from "./Dropdown.types";
import styles from "./Dropdown.module.css";

interface DropdownItemProps {
  option: DropdownOption<unknown>;
  index: number;
  domId: string;
  isHighlighted: boolean;
  isSelected: boolean;
  /** Stable: sets the highlighted row index. */
  onHighlight: (index: number) => void;
  /** Stable: commits the selection (select + close). */
  onCommit: (option: DropdownOption<unknown>) => void;
}

/**
 * A single combobox row, memoized. Because every prop is a primitive or a
 * stable callback, moving the highlight only re-renders the two rows whose
 * `isHighlighted` actually flips — not the entire list on each keystroke
 * (rerender-memo). Handlers take the row's identity as an argument instead of
 * being recreated per row per render.
 */
function DropdownItemImpl({
  option,
  index,
  domId,
  isHighlighted,
  isSelected,
  onHighlight,
  onCommit,
}: DropdownItemProps) {
  const className = [
    styles.option,
    isHighlighted && styles.highlighted,
    isSelected && styles.selected,
    option.disabled && styles.disabled,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li
      id={domId}
      role="option"
      aria-selected={isSelected}
      aria-disabled={option.disabled || undefined}
      className={className}
      onMouseEnter={() => onHighlight(index)}
      // onMouseDown (not onClick) so selection wins the race with the input's
      // onBlur, which would otherwise close the menu before the click lands.
      onMouseDown={(event) => {
        event.preventDefault();
        onCommit(option);
      }}
    >
      <span>{option.label}</span>
      {option.description && (
        <span className={styles.optionDescription}>{option.description}</span>
      )}
    </li>
  );
}

export const DropdownItem = memo(DropdownItemImpl);
