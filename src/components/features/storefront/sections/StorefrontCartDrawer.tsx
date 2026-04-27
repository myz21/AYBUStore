import { Button } from "../../../ui/Button";
import type { StorefrontCartDrawerProps } from "../types";

export const StorefrontCartDrawer = ({
  isCartRendered,
  isCartOpen,
  setIsCartOpen,
  drawerCartItems,
  cartSubtotal,
  formatTry,
}: StorefrontCartDrawerProps) => {
  if (!isCartRendered) return null;
  return (
    <div
      className={`fixed inset-0 z-50 p-3 transition-colors duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isCartOpen ? "bg-slate-900/55" : "bg-slate-900/0"
      }`}
      onClick={() => setIsCartOpen(false)}
    >
      <aside
        className={`ml-auto h-full w-full max-w-sm rounded-xl bg-white p-4 shadow-2xl transform-gpu transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isCartOpen ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
        }`}
        onClick={(event) => event.stopPropagation()}
        aria-label="Sepet paneli"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Sepetim</h2>
          <Button variant="ghost" size="sm" onClick={() => setIsCartOpen(false)}>
            ×
          </Button>
        </div>
        <div className="space-y-3">
          {drawerCartItems.map((item) => (
            <article key={item.id} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
              <img src={item.imageUrl} alt={item.imageAlt} className="h-14 w-14 rounded object-cover" />
              <div>
                <p className="text-sm font-semibold text-slate-700">{item.name}</p>
                <p className="text-xs text-slate-500">Adet: {item.quantity}</p>
                <p className="text-sm text-slate-700">{formatTry(item.unitPrice)}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-4 space-y-1 text-sm text-slate-600">
          <p>Ara Toplam: {formatTry(cartSubtotal)}</p>
          <p>Kargo: {formatTry(0)}</p>
          <p className="font-semibold text-slate-800">Toplam: {formatTry(cartSubtotal)}</p>
        </div>
        <div className="mt-4 grid gap-2">
          <Button fullWidth>Alışverişi Tamamla</Button>
          <Button fullWidth variant="secondary" onClick={() => setIsCartOpen(false)}>
            Alışverişe Devam Et
          </Button>
        </div>
      </aside>
    </div>
  );
};
