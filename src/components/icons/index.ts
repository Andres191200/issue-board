// Local barrel for ergonomics. These are first-party single-component modules,
// so this re-export carries none of the cost the bundle-barrel-imports rule
// warns about (which targets large third-party packages like lucide-react).
// Performance-sensitive call sites can still import the file directly, e.g.
// `import { SearchIcon } from "@/components/icons/SearchIcon"`.
export { Icon, type IconProps } from "./Icon";
export { UserIcon } from "./UserIcon";
export { LockIcon } from "./LockIcon";
export { EyeIcon } from "./EyeIcon";
export { EyeOffIcon } from "./EyeOffIcon";
export { SearchIcon } from "./SearchIcon";
export { ChevronDownIcon } from "./ChevronDownIcon";
export { SpinnerIcon } from "./SpinnerIcon";
