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
    <main className="mx-auto w-[min(1200px,100%)] px-4 py-6">
      <nav className="mb-4 flex gap-2 overflow-x-auto lg:hidden">
        {mobileTabItems.map((item) => (
          <Button
            key={item.id}
            variant="secondary"
            size="sm"
            onClick={() => navigateToView(item.id.includes("departments") ? "departments" : "home")}
          >
            {item.label}
          </Button>
        ))}
      </nav>

      <section
        ref={setHomeSectionRef("hero")}
        data-home-section="hero"
        className={`relative mx-auto w-full max-w-[1204px] overflow-hidden rounded-2xl bg-slate-200 transition-all duration-700 ease-out ${getRevealClasses("hero")}`}
      >
        <div className="relative h-[460px] w-full">
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
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
        </div>
        <div className="absolute bottom-3 right-3 flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              setCurrentSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
            }
          >
            ‹
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length)}
          >
            ›
          </Button>
        </div>
      </section>

      <section
        ref={setHomeSectionRef("design")}
        data-home-section="design"
        className={`mt-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-700 ease-out ${getRevealClasses("design")}`}
      >
        <p className="text-xs uppercase tracking-wide text-slate-500">{designLaunchContent.kicker}</p>
        <h2 className="mt-1 text-xl font-semibold text-slate-800">{designLaunchContent.title}</h2>
        <p className="mt-2 text-sm text-slate-600">{designLaunchContent.description}</p>
        <div className="mt-4">
          <Button onClick={() => setIsDesignOpen(true)}>{designLaunchContent.ctaLabel}</Button>
        </div>
      </section>

      <section
        ref={setHomeSectionRef("products")}
        data-home-section="products"
        className={`mt-6 transition-all duration-700 ease-out ${getRevealClasses("products")}`}
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-slate-800">{featuredProductsSection.title}</h2>
          <Button variant="secondary" size="sm">
            {featuredProductsSection.ctaLabel}
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <article key={product.id} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="mb-3 flex h-40 items-center justify-center rounded-xl bg-slate-100">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.imageAlt ?? product.name} className="h-full w-full rounded-xl object-cover" />
                ) : (
                  <span className="text-5xl" role="img" aria-label={product.emojiLabel ?? product.name}>
                    {product.emoji}
                  </span>
                )}
              </div>
              <h3 className="text-sm font-semibold text-slate-800">{product.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{formatTry(product.price)}</p>
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
