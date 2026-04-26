import type { ReactNode } from "react";

export interface AuthShellProps {
  children: ReactNode;
}

export const AuthShell = ({ children }: AuthShellProps) => {
  return (
    <main className="mx-auto grid w-[min(1500px,100%)] grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] items-stretch gap-3 px-4 py-4">
      {children}
    </main>
  );
};
