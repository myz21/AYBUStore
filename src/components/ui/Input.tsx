import type { InputHTMLAttributes } from "react";

type InputSize = "sm" | "md" | "lg";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: InputSize;
  fullWidth?: boolean;
}

const SIZE_STYLES: Record<InputSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-3 text-sm",
  lg: "h-11 px-4 text-base",
};

export const Input = ({
  inputSize = "md",
  fullWidth = true,
  className = "",
  disabled,
  ...rest
}: InputProps) => {
  const widthClass = fullWidth ? "w-full" : "w-auto";

  const classes = [
    "rounded-xl border border-slate-200 bg-white text-slate-800",
    "placeholder:text-slate-400",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300",
    "disabled:cursor-not-allowed disabled:opacity-50",
    SIZE_STYLES[inputSize],
    widthClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <input className={classes} disabled={disabled} {...rest} />;
};
