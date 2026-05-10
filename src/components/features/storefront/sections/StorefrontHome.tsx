import { Button } from "../../../ui/Button";
import type { StorefrontHomeProps } from "../types";

export const StorefrontHome = ({
  mobileTabItems,
  navigateToView,
  heroSlides,
  currentSlideIndex,
  setCurrentSlideIndex,
  formatTry,
  designLaunchContent,
  setIsDesignOpen,
  featuredProductsSection,
  filteredProducts,
  storeContactInfo,
  storeOpeningHours,
  setHomeSectionRef,
  getRevealClasses,
}: StorefrontHomeProps) => {
  return (
    <main className="mx-auto w-[min(1200px,100%)] px-0 sm:px-4 py-4 sm:py-6">
      <nav className="mb-6 flex gap-3 overflow-x-auto lg:hidden px-4 no-scrollbar">
        {mobileTabItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigateToView(item.id.includes("departments") ? "departments" : "home")}
            className="whitespace-nowrap px-5 py-2.5 rounded-full bg-white border border-slate-200 text-[13px] font-semibold text-slate-700 shadow-sm transition-all active:scale-95"
          >
            {item.label}
          </button>
        ))}
      </nav>

      <section
        ref={setHomeSectionRef("hero")}
        data-home-section="hero"
        className={`relative mx-0 sm:mx-auto w-full max-w-[1204px] overflow-hidden sm:rounded-2xl bg-slate-200 transition-all duration-700 ease-out ${getRevealClasses("hero")}`}
      >
        <div className="relative h-[280px] sm:h-[460px] w-full">
          {heroSlides.map((slide, index) => {
            const isActive = index === currentSlideIndex;
            return (
              <img
                key={slide.id}
                src={slide.imageUrl}
                alt={slide.ariaLabel}
                className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ease-out ${
                  isActive ? "scale-100 opacity-100" : "scale-105 opacity-0"
                }`}
              />
            );
          })}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
        </div>
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="h-10 w-10 p-0 rounded-full bg-white/90 backdrop-blur-sm"
            onClick={() =>
              setCurrentSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
            }
          >
            ‹
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-10 w-10 p-0 rounded-full bg-white/90 backdrop-blur-sm"
            onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length)}
          >
            ›
          </Button>
        </div>
      </section>

      <section
        ref={setHomeSectionRef("design")}
        data-home-section="design"
        className={`mt-4 mx-4 sm:mx-0 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 transition-all duration-700 ease-out ${getRevealClasses("design")}`}
      >
        <div className="max-w-2xl">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold text-amber-600">{designLaunchContent.kicker}</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 leading-tight">{designLaunchContent.title}</h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">{designLaunchContent.description}</p>
          <div className="mt-6">
            <Button size="lg" className="rounded-full px-8 shadow-xl shadow-amber-500/20" onClick={() => setIsDesignOpen(true)}>
              {designLaunchContent.ctaLabel}
            </Button>
          </div>
        </div>
      </section>

      <section
        ref={setHomeSectionRef("products")}
        data-home-section="products"
        className={`mt-8 px-4 sm:px-0 transition-all duration-700 ease-out ${getRevealClasses("products")}`}
      >
        <div className="mb-6 flex items-center justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{featuredProductsSection.title}</h2>
          <Button variant="secondary" size="sm" className="rounded-full">
            {featuredProductsSection.ctaLabel}
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <article key={product.id} className="group rounded-3xl border border-slate-100 bg-white p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="mb-4 flex h-52 items-center justify-center rounded-2xl bg-slate-50 overflow-hidden">
                {product.imageUrl ? (
                  <img 
                    src={product.imageUrl} 
                    alt={product.imageAlt ?? product.name} 
                    className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110" 
                  />
                ) : (
                  <span className="text-6xl" role="img" aria-label={product.emojiLabel ?? product.name}>
                    {product.emoji}
                  </span>
                )}
              </div>
              <h3 className="text-[15px] font-bold text-slate-800 leading-snug">{product.name}</h3>
              <p className="mt-2 text-sm font-medium text-slate-500">{formatTry(product.price)}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        ref={setHomeSectionRef("contact")}
        data-home-section="contact"
        className={`mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-700 ease-out md:grid-cols-2 ${getRevealClasses("contact")}`}
      >
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Mağazamız</h3>
          <p
            className="mt-2 text-sm text-slate-600"
            dangerouslySetInnerHTML={{ __html: storeContactInfo.campusAddressHtml }}
          />
          <div className="mt-3 space-y-1 text-sm text-slate-600">
            {storeOpeningHours.map((hour) => (
              <p key={hour.dayLabel}>
                <span className="font-medium text-slate-700">{hour.dayLabel}:</span> {hour.value}
              </p>
            ))}
          </div>
          <p className="mt-3 text-sm text-slate-600">{storeContactInfo.phone}</p>
          <p className="text-sm text-slate-600">{storeContactInfo.email}</p>
          <div className="mt-3">
            <Button
              variant="secondary"
              onClick={() => window.open(storeContactInfo.directionsUrl, "_blank", "noopener,noreferrer")}
            >
              Yol Tarifi Al
            </Button>
          </div>
        </div>
        <iframe
          src={storeContactInfo.mapEmbedUrl}
          title="AYBÜ harita"
          loading="lazy"
          className="h-72 w-full rounded-xl border border-slate-200"
        />
      </section>
    </main>
  );
};
