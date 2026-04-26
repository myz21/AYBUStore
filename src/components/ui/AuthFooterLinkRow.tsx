import { Button } from "./Button";

export interface AuthFooterLinkRowProps {
  prompt: string;
  actionLabel: string;
  onActionClick: () => void;
}

export const AuthFooterLinkRow = ({ prompt, actionLabel, onActionClick }: AuthFooterLinkRowProps) => {
  return (
    <div className="mt-4 flex items-center justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2">
      <p className="text-xs text-slate-600">{prompt}</p>
      <Button variant="ghost" size="sm" onClick={onActionClick}>
        {actionLabel}
      </Button>
    </div>
  );
};
