import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

// Elements that can receive focus — used for the focus trap and initial focus.
const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ModalProps {
  /** id of the heading that titles the dialog (for aria-labelledby). */
  labelledBy: string;
  onClose: () => void;
  children: ReactNode;
}

/**
 * Accessible modal rendered through a React portal on document.body.
 * Handles Escape to close, click-outside to close, body scroll lock, a Tab
 * focus trap, and restoring focus to the trigger on unmount. Mount it only while
 * open so its content (e.g. a form) starts fresh each time.
 */
export function Modal({ labelledBy, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  // Keep the latest onClose without re-running the focus/scroll effect.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Lock background scroll for the modal's lifetime.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Move focus into the dialog on open, restore it to the trigger on close.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    // Respect a child that already grabbed focus (e.g. autoFocus on a field).
    if (!dialog.contains(document.activeElement)) {
      const first = dialog.querySelector<HTMLElement>(FOCUSABLE);
      (first ?? dialog).focus();
    }
    return () => previouslyFocused?.focus?.();
  }, []);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.stopPropagation();
      onCloseRef.current();
      return;
    }
    if (event.key !== "Tab") return;

    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusable = dialog.querySelectorAll<HTMLElement>(FOCUSABLE);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return createPortal(
    <div
      className={styles.backdrop}
      onMouseDown={(event) => {
        // Close only when the backdrop itself is pressed, not on inner clicks.
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
