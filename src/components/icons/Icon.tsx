import type { SVGProps } from "react";

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "stroke"> {
  /** Square size in px applied to both width and height. Defaults to 24. */
  size?: number;
  /** Stroke width. Defaults to 2 (Tabler line style). */
  strokeWidth?: number;
}

/**
 * Base SVG wrapper for the Tabler-style line icon set referenced by the Figma
 * source. Monochrome, rounded caps, tint via `color` (currentColor by default).
 * Kept as a top-level component so consumers never remount it.
 */
export function Icon({
  size = 24,
  strokeWidth = 2,
  color = "currentColor",
  children,
  ...rest
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}
