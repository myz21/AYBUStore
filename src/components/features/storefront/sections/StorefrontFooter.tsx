import type { StorefrontFooterProps } from "../types";

export const StorefrontFooter = ({
  footerColumns,
  storeContactInfo,
  paymentMethods,
  footerSocialLinks,
}: StorefrontFooterProps) => {
  return (
    <footer className="mt-10 border-t border-slate-200 bg-white/70 px-4 py-8">
      <div className="mx-auto grid w-[min(1200px,100%)] gap-6 md:grid-cols-3">
        {footerColumns.map((column) => (
          <section key={column.id}>
            <h3 className="mb-2 text-sm font-bold text-slate-800">{column.title}</h3>
            {column.description ? <p className="mb-2 text-sm text-slate-600">{column.description}</p> : null}
            <div className="space-y-1">
              {column.links?.map((link) => (
                <p key={`${column.id}-${link.label}`} className="text-sm text-slate-500">
                  {link.label}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
      <div className="mx-auto mt-6 flex w-[min(1200px,100%)] flex-wrap items-center gap-2 text-sm text-slate-500">
        <span>{storeContactInfo.phone}</span>
        <span>•</span>
        <span>{storeContactInfo.email}</span>
        <span>•</span>
        {paymentMethods.map((method) => (
          <span key={method.id} className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">
            {method.label}
          </span>
        ))}
      </div>
      <div className="mx-auto mt-4 flex w-[min(1200px,100%)] flex-wrap gap-3 text-sm text-slate-500">
        {footerSocialLinks.map((social) => (
          <span key={social.id}>{social.platform.toUpperCase()}</span>
        ))}
      </div>
    </footer>
  );
};
