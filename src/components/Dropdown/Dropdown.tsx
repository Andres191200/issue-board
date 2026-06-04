import { useCallback, useId } from "react";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { SpinnerIcon } from "@/components/icons/SpinnerIcon";
import { DropdownItem } from "./DropdownItem";
import { useDropdown } from "./useDropdown";
import type { DropdownOption, DropdownProps } from "./Dropdown.types";
import styles from "./Dropdown.module.css";

/**
 * Searchable single-select combobox ("Buscá un jugador"). Presentational shell;
 * all interaction lives in useDropdown, each row is a memoized DropdownItem, and
 * option data is supplied by the caller (e.g. a TanStack Query result), keeping
 * fetching out of the component.
 */
export function Dropdown<TData = unknown>({
  label,
  options,
  value,
  onChange,
  inputValue,
  onInputChange,
  onBlur,
  placeholder = "Buscá un jugador",
  isLoading = false,
  emptyMessage = "Sin resultados",
  error,
  disabled,
  leading,
  name,
  className,
}: DropdownProps<TData>) {
  const listboxId = useId();

  const selectOption = useCallback(
    (option: DropdownOption<TData> | undefined) => {
      if (!option || option.disabled) return;
      onChange?.(option);
      onInputChange(option.label);
    },
    [onChange, onInputChange],
  );

  const selectByIndex = useCallback(
    (index: number) => selectOption(options[index]),
    [options, selectOption],
  );

  const {
    isOpen,
    highlightedIndex,
    rootRef,
    open,
    close,
    setHighlightedIndex,
    onInputKeyDown,
  } = useDropdown({ optionCount: options.length, onSelectIndex: selectByIndex });

  // Stable callbacks handed to every memoized row, so moving the highlight only
  // re-renders the two rows whose state actually changed.
  const handleCommit = useCallback(
    (option: DropdownOption<unknown>) => {
      selectOption(option as DropdownOption<TData>);
      close();
    },
    [selectOption, close],
  );

  // clamp the visual highlight during render rather than storing a corrected
  // value in state (derived-state, no syncing effect)
  const activeIndex = Math.min(highlightedIndex, Math.max(options.length - 1, 0));
  const showMenu =
    isOpen && (options.length > 0 || isLoading || inputValue.length > 0);

  const hasError = Boolean(error);
  const controlClass = [
    styles.control,
    isOpen && styles.open,
    hasError && styles.error,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={[styles.field, className].filter(Boolean).join(" ")}>
      {label != null && <span className={styles.label}>{label}</span>}

      <div className={styles.root} ref={rootRef}>
        <div className={controlClass}>
          <span className={styles.adornment}>
            {leading ?? (
              <SearchIcon
                size={16}
                color={isOpen ? "var(--green-500)" : undefined}
              />
            )}
          </span>

          <input
            className={styles.input}
            type="text"
            role="combobox"
            name={name}
            aria-expanded={showMenu}
            aria-controls={listboxId}
            aria-activedescendant={
              showMenu && options.length > 0
                ? `${listboxId}-opt-${activeIndex}`
                : undefined
            }
            autoComplete="off"
            placeholder={placeholder}
            value={inputValue}
            disabled={disabled}
            onChange={(event) => {
              onInputChange(event.target.value);
              setHighlightedIndex(0);
              open();
            }}
            onFocus={open}
            onBlur={onBlur}
            onKeyDown={onInputKeyDown}
          />

          {isLoading && (
            <span className={styles.spinner}>
              <SpinnerIcon size={16} />
            </span>
          )}
        </div>

        {showMenu && (
          <ul className={styles.menu} id={listboxId} role="listbox">
            {options.length === 0 && !isLoading ? (
              <li className={styles.empty}>{emptyMessage}</li>
            ) : (
              options.map((option, index) => (
                <DropdownItem
                  key={option.value}
                  option={option as DropdownOption<unknown>}
                  index={index}
                  domId={`${listboxId}-opt-${index}`}
                  isHighlighted={index === activeIndex}
                  isSelected={option.value === value}
                  onHighlight={setHighlightedIndex}
                  onCommit={handleCommit}
                />
              ))
            )}
          </ul>
        )}
      </div>

      {hasError && <span className={styles.message}>{error}</span>}
    </div>
  );
}
