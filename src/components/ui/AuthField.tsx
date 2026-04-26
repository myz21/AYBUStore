import type { HTMLInputTypeAttribute } from "react";
import { Input } from "./Input";

export interface AuthFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (nextValue: string) => void;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  error?: string;
  touched?: boolean;
}

export const AuthField = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  touched,
}: AuthFieldProps) => {
  const showError = Boolean(touched && error);
  return (
    <label htmlFor={id} className="grid gap-1.5 text-sm text-slate-700">
      <span className="font-medium">{label}</span>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`transition-all duration-300 ease-out ${
          showError
            ? "border-rose-300 bg-rose-50/40 focus-visible:ring-rose-200"
            : "focus-visible:ring-amber-200"
        }`}
      />
      <span
        className={`min-h-[1rem] text-xs transition-all duration-300 ${
          showError ? "translate-y-0 text-rose-600 opacity-100" : "-translate-y-0.5 text-transparent opacity-0"
        }`}
      >
        {showError ? error : "."}
      </span>
    </label>
  );
};
