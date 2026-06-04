import { Icon, type IconProps } from "./Icon";

/** Loading spinner. Animate with CSS (e.g. `animation: spin 0.7s linear infinite`). */
export function SpinnerIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3a9 9 0 1 0 9 9" />
    </Icon>
  );
}
