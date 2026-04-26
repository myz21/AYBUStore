import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    "bg-amber-500 text-slate-950 shadow-sm hover:bg-amber-400 focus-visible:ring-amber-300",
  secondary:
    "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 focus-visible:ring-slate-300",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100/80 focus-visible:ring-slate-300",
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
};

export const Button = ({
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  disabled,
  ...rest
}: ButtonProps) => {
  const widthClass = fullWidth ? "w-full" : "w-auto";

  const classes = [
    "inline-flex items-center justify-center rounded-xl font-semibold transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    VARIANT_STYLES[variant],
    SIZE_STYLES[size],
    widthClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <button type={type} className={classes} disabled={disabled} {...rest} />;
};
