import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

interface UseDropdownParams {
  /** Number of currently selectable rows (used to clamp highlight movement). */
  optionCount: number;
  /** Invoked with the row index when the user commits a selection. */
  onSelectIndex: (index: number) => void;
}

interface UseDropdownResult {
  isOpen: boolean;
  highlightedIndex: number;
  /** Attach to the field wrapper for outside-click detection. */
  rootRef: React.RefObject<HTMLDivElement>;
  open: () => void;
  close: () => void;
  /** Set the active row (e.g. from onMouseEnter). Stable identity. */
  setHighlightedIndex: (index: number) => void;
  /** Spread directly onto the search <input>'s onKeyDown. */
  onInputKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

/**
 * Headless combobox behaviour: open/close, keyboard navigation, outside-click
 * dismissal, and highlight clamping. Holds no rendering concerns so it can be
 * paired with any markup (or unit-tested without a DOM tree).
 */
export function useDropdown({
  optionCount,
  onSelectIndex,
}: UseDropdownParams): UseDropdownResult {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Outside-click dismissal — bound only while open, removed on close, so we
  // never keep an idle global listener mounted for a closed dropdown.
  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isOpen]);

  const onInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setIsOpen(true);
          // functional update: no dependency on highlightedIndex
          setHighlightedIndex((index) =>
            optionCount === 0 ? 0 : Math.min(index + 1, optionCount - 1),
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setHighlightedIndex((index) => Math.max(index - 1, 0));
          break;
        case "Enter":
          if (isOpen && optionCount > 0) {
            event.preventDefault();
            onSelectIndex(highlightedIndex);
          }
          break;
        case "Escape":
          setIsOpen(false);
          break;
      }
    },
    [isOpen, optionCount, highlightedIndex, onSelectIndex],
  );

  return {
    isOpen,
    highlightedIndex,
    rootRef,
    open,
    close,
    setHighlightedIndex,
    onInputKeyDown,
  };
}
