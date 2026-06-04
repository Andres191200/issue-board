import { forwardRef } from "react";
import { EyeIcon } from "@/components/icons/EyeIcon";
import { EyeOffIcon } from "@/components/icons/EyeOffIcon";
import { LockIcon } from "@/components/icons/LockIcon";
import { Input } from "./Input";
import type { InputProps } from "./Input.types";
import { usePasswordToggle } from "./usePasswordToggle";
import styles from "./Input.module.css";

export interface PasswordInputProps extends Omit<InputProps, "type" | "trailing"> {
  /** Accessible label for the reveal toggle button. */
  toggleLabel?: { show: string; hide: string };
}

/**
 * Password field = presentational <Input> + the usePasswordToggle logic hook.
 * Composes the two rather than baking visibility state into Input itself.
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    { leading = <LockIcon size={18} />, toggleLabel, ...rest },
    ref,
  ) {
    const { inputType, isVisible, toggle } = usePasswordToggle();
    const labels = toggleLabel ?? {
      show: "Mostrar contraseña",
      hide: "Ocultar contraseña",
    };

    return (
      <Input
        ref={ref}
        type={inputType}
        leading={leading}
        trailing={
          <button
            type="button"
            className={styles.actionButton}
            onClick={toggle}
            aria-label={isVisible ? labels.hide : labels.show}
            aria-pressed={isVisible}
            // keep focus on the input so reveal doesn't break form flow
            tabIndex={-1}
          >
            {isVisible ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
          </button>
        }
        {...rest}
      />
    );
  },
);
