import { useCallback, useState } from "react";

export interface PasswordToggle {
  /** The `type` to pass to the input: "text" when revealed, else "password". */
  inputType: "text" | "password";
  /** Whether the value is currently visible. */
  isVisible: boolean;
  /** Stable toggler — safe to pass straight to onClick without memo churn. */
  toggle: () => void;
}

/**
 * Isolated reveal/hide logic for password fields. Kept out of the presentational
 * Input so the visibility behaviour is testable and reusable on its own.
 * Uses a functional update for a stable, dependency-free toggle callback.
 */
export function usePasswordToggle(initialVisible = false): PasswordToggle {
  const [isVisible, setIsVisible] = useState(initialVisible);

  const toggle = useCallback(() => {
    setIsVisible((visible) => !visible);
  }, []);

  return {
    isVisible,
    inputType: isVisible ? "text" : "password",
    toggle,
  };
}
