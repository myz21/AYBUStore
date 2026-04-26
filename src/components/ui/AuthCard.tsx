import type { ReactNode } from "react";

export interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export const AuthCard = ({ title, description, children }: AuthCardProps) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_34px_-30px_rgba(15,23,42,0.45)]">
      <h1 className="text-xl font-semibold text-slate-800 md:text-2xl">{title}</h1>
      <p className="mt-1.5 text-sm text-slate-600">{description}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
};
