import { Button } from "../../../ui/Button";
import { Input } from "../../../ui/Input";
import type { StorefrontHeaderProps } from "../types";

export const StorefrontHeader = ({
  isMenuOpen,
  setIsMenuOpen,
  isSearchOpen,
  setIsSearchOpen,
  isHeaderHidden,
  searchQuery,
  setSearchQuery,
  activeNavId,
  navigateToView,
  handleNavAction,
  openCartDrawer,
  isCartOpen,
  mainNavItems,
}: StorefrontHeaderProps) => {
  return (
    <header
      className={`sticky top-2 z-40 mx-auto w-[min(1200px,calc(100%-1rem))] rounded-2xl border border-amber-200/30 bg-slate-900/90 px-4 py-2 text-slate-100 shadow-xl backdrop-blur transform-gpu will-change-transform motion-reduce:transition-none ${
        isHeaderHidden
          ? "scale-[0.985] opacity-0 pointer-events-none"
          : "scale-100 opacity-100"
      } transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`}
      style={{
        transform: isHeaderHidden ? "translate3d(0, -120%, 0)" : "translate3d(0, 0, 0)",
      }}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="shrink-0 rounded-md border border-slate-600 px-2 py-1 text-sm lg:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-label="Menüyü aç veya kapat"
        >
          ☰
        </button>

        <button
          type="button"
          className="text-left"
          onClick={() => navigateToView("home")}
          aria-label="Ana sayfaya dön"
        >
          <img
            src="/AYBUStore/images/logo2.png"
            alt="AYBU Store logosu"
            className="h-12 w-auto object-contain"
          />
        </button>

        <nav className={`${isMenuOpen ? "flex" : "hidden"} gap-2 lg:flex`}>
          {mainNavItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`relative rounded-xl px-3 py-2 text-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                activeNavId === item.id
                  ? "bg-white/10 text-amber-100 shadow-[0_0_0_1px_rgba(251,191,36,0.22),0_8px_22px_-14px_rgba(251,191,36,0.75)] backdrop-blur-sm"
                  : "text-slate-100 hover:bg-white/5"
              }`}
              onClick={() => {
                handleNavAction(item.id);
                setIsMenuOpen(false);
              }}
            >
              <span
                className={`absolute inset-0 rounded-xl bg-gradient-to-r from-amber-300/0 via-amber-200/20 to-amber-300/0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  activeNavId === item.id ? "opacity-100" : "opacity-0"
                }`}
              />
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative flex items-center">
            <div
              className={`flex items-center gap-2 overflow-hidden rounded-xl bg-slate-800/90 transition-all duration-300 ease-out ${
                isSearchOpen
                  ? "pointer-events-auto mr-2 max-w-[340px] px-2 py-1 opacity-100"
                  : "pointer-events-none mr-0 max-w-0 px-0 py-0 opacity-0"
              }`}
              aria-hidden={!isSearchOpen}
            >
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Ürün ara..."
                className="h-9 min-w-[170px] border-slate-600 bg-slate-800 text-slate-100 placeholder:text-slate-400"
                aria-label="Ürün ara"
              />
            </div>
            <button
              type="button"
              onClick={() => setIsSearchOpen((prev) => !prev)}
              className={`grid h-9 w-9 place-items-center rounded-xl border transition ${
                isSearchOpen
                  ? "border-slate-200 bg-white text-slate-800"
                  : "border-slate-600 bg-slate-800 text-slate-100 hover:bg-slate-700"
              }`}
              aria-expanded={isSearchOpen}
              aria-label="Ürün arama kutusunu aç veya kapat"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                <path d="M10 18a8 8 0 1 1 5.293-14.001A8 8 0 0 1 10 18Zm11.707 2.293-5.1-5.1a10 10 0 1 0-1.414 1.414l5.1 5.1a1 1 0 0 0 1.414-1.414Z" />
              </svg>
            </button>
          </div>
          <Button variant="secondary" size="sm" onClick={() => navigateToView("register")}>
            Üyelik
          </Button>
          <Button
            size="sm"
            onClick={openCartDrawer}
            className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isCartOpen ? "scale-[1.02] shadow-[0_10px_28px_-18px_rgba(251,191,36,0.9)]" : ""
            }`}
          >
            Sepetim
          </Button>
        </div>
      </div>
    </header>
  );
};
