import type { AuthBenefit } from "../../types";

export interface AuthHeroPanelProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  benefits: AuthBenefit[];
}

export const AuthHeroPanel = ({ imageUrl, title, subtitle, benefits }: AuthHeroPanelProps) => {
  return (
    <section className="relative h-full min-h-[360px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 md:min-h-[460px]">
      <img src={imageUrl} alt="" className="h-full w-full object-cover opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/65 via-slate-900/45 to-amber-500/25" />
      <div className="absolute inset-0 p-5 text-slate-100 md:p-6">
        <p className="text-xs uppercase tracking-[0.18em] text-amber-200/90">AYBÜ Store</p>
        <h2 className="mt-2 text-xl font-semibold leading-tight md:text-2xl">{title}</h2>
        <p className="mt-2 max-w-xl text-xs text-slate-200 md:text-sm">{subtitle}</p>
        <div className="mt-4 grid gap-2">
          {benefits.slice(0, 2).map((benefit) => (
            <div key={benefit.id} className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 backdrop-blur-sm">
              <p className="text-xs font-semibold text-amber-100 md:text-sm">{benefit.title}</p>
              <p className="text-[11px] text-slate-200 md:text-xs">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
