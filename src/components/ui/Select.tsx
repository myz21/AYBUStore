import type { SelectHTMLAttributes } from "react";

type SelectSize = "sm" | "md" | "lg";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  selectSize?: SelectSize;
  fullWidth?: boolean;
}

const SIZE_STYLES: Record<SelectSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-3 text-sm",
  lg: "h-11 px-4 text-base",
};

export const Select = ({
  options,
  selectSize = "md",
  fullWidth = true,
  className = "",
  disabled,
  ...rest
}: SelectProps) => {
  const widthClass = fullWidth ? "w-full" : "w-auto";

  const classes = [
    "rounded-xl border border-slate-200 bg-white text-slate-800",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300",
    "disabled:cursor-not-allowed disabled:opacity-50",
    SIZE_STYLES[selectSize],
    widthClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <select className={classes} disabled={disabled} {...rest}>
      {options.map((option) => (
        <option key={`${option.value}-${option.label}`} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
