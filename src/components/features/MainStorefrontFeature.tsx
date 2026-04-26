"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import {
  chatSeedMessages,
  departmentFilters,
  departmentSortOptions,
  departmentsPageContent,
  designLaunchContent,
  designPlacementOptions,
  designProductOptions,
  drawerCartItems,
  featuredProductsSection,
  footerColumns,
  footerSocialLinks,
  heroSlides,
  loginPageContent,
  mainNavItems,
  mobileTabItems,
  paymentMethods,
  registerPageContent,
  storeContactInfo,
  storeOpeningHours,
} from "../../lib/mockData";
import type { ChatMessageSeed, Product } from "../../types";

type PageView = "home" | "departments" | "login" | "register";
type HomeSectionKey = "hero" | "design" | "products" | "contact";
type ScrollTarget = "products" | "store";

const formatTry = (value: number): string => {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
};

export const MainStorefrontFeature = () => {
  const [pageView, setPageView] = useState<PageView>("home");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isDesignOpen, setIsDesignOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState<boolean>(false);
  const [pendingScrollTarget, setPendingScrollTarget] = useState<ScrollTarget | null>(null);
  const [activeNavId, setActiveNavId] = useState<string>("home");
  const [isPageTransitioning, setIsPageTransitioning] = useState<boolean>(false);
  const [isCartRendered, setIsCartRendered] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [chatInput, setChatInput] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessageSeed[]>(chatSeedMessages);
  const [visibleHomeSections, setVisibleHomeSections] = useState<Record<HomeSectionKey, boolean>>({
    hero: false,
    design: false,
    products: false,
    contact: false,
  });
  const homeSectionRefs = useRef<Record<HomeSectionKey, HTMLElement | null>>({
    hero: null,
    design: null,
    products: null,
    contact: null,
  });

  const [selectedProduct, setSelectedProduct] = useState<string>(designProductOptions[0]?.label ?? "");
  const [selectedPlacement, setSelectedPlacement] = useState<string>(
    designPlacementOptions[0]?.label ?? "",
  );
  const [designScale, setDesignScale] = useState<number>(100);
  const [designRotation, setDesignRotation] = useState<number>(0);
  const [designNote, setDesignNote] = useState<string>("");
  const [designPreviewUrl, setDesignPreviewUrl] = useState<string>("/images/logo2.png");
  const [designPreviewLabel, setDesignPreviewLabel] = useState<string>("Henüz dosya yüklenmedi");

  const filteredProducts = useMemo<Product[]>(() => {
    if (!searchQuery.trim()) return featuredProductsSection.products;
    const q = searchQuery.toLocaleLowerCase("tr-TR");
    return featuredProductsSection.products.filter((product) =>
      product.name.toLocaleLowerCase("tr-TR").includes(q),
    );
  }, [searchQuery]);

  const cartSubtotal = useMemo<number>(() => {
    return drawerCartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  }, []);

  useEffect(() => {
    if (pageView !== "home") return;
    const timer = window.setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [pageView]);

  useEffect(() => {
    if (isCartOpen) return;
    const timer = window.setTimeout(() => {
      setIsCartRendered(false);
    }, 420);
    return () => window.clearTimeout(timer);
  }, [isCartOpen]);

  useEffect(() => {
    if (pageView === "departments") {
      setActiveNavId("departments");
      return;
    }
    if (pageView === "login" || pageView === "register") {
      setActiveNavId("home");
      return;
    }

    const sectionPairs: Array<{ id: "home" | "products" | "store"; key: HomeSectionKey }> = [
      { id: "home", key: "hero" },
      { id: "products", key: "products" },
      { id: "store", key: "contact" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionKey = entry.target.getAttribute("data-home-section") as HomeSectionKey | null;
          if (!sectionKey || !entry.isIntersecting) return;
          const pair = sectionPairs.find((item) => item.key === sectionKey);
          if (pair) setActiveNavId(pair.id);
        });
      },
      { threshold: 0.45, rootMargin: "-20% 0px -45% 0px" },
    );

    sectionPairs.forEach((pair) => {
      const element = homeSectionRefs.current[pair.key];
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pageView]);

  useEffect(() => {
    if (pageView !== "home" || !pendingScrollTarget) return;
    const targetKey = pendingScrollTarget === "products" ? "products" : "contact";
    const target = homeSectionRefs.current[targetKey];
    if (target) {
      window.requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
    setPendingScrollTarget(null);
  }, [pageView, pendingScrollTarget]);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let lastY = window.scrollY || 0;
    let ticking = false;
    const revealTop = 28;
    const collapseAfter = 70;
    const deltaThreshold = 6;

    const update = () => {
      ticking = false;
      const y = window.scrollY || 0;
      const delta = y - lastY;
      lastY = y;

      if (y < revealTop) {
        setIsHeaderHidden(false);
        return;
      }

      if (delta > deltaThreshold && y > collapseAfter) {
        setIsHeaderHidden(true);
      } else if (delta < -deltaThreshold) {
        setIsHeaderHidden(false);
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pageView !== "home") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const key = entry.target.getAttribute("data-home-section") as HomeSectionKey | null;
          if (!key) return;
          if (entry.isIntersecting) {
            setVisibleHomeSections((prev) => ({ ...prev, [key]: true }));
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );

    (Object.keys(homeSectionRefs.current) as HomeSectionKey[]).forEach((key) => {
      const element = homeSectionRefs.current[key];
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pageView]);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsMenuOpen(false);
      setIsCartOpen(false);
      setIsDesignOpen(false);
      setIsChatOpen(false);
      setIsSearchOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  const appendChatMessage = (text: string, sender: "bot" | "user") => {
    const message: ChatMessageSeed = {
      id: `${sender}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      sender,
      text,
      meta: sender === "user" ? "Siz • şimdi" : "AYBU Store • şimdi",
    };
    setChatMessages((prev) => [...prev, message]);
  };

  const handleChatSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = chatInput.trim();
    if (!trimmed) return;
    appendChatMessage(trimmed, "user");
    setChatInput("");
    window.setTimeout(() => {
      appendChatMessage("Teşekkürler! Mesajınız alındı, kısa süre içinde dönüş yapacağız.", "bot");
    }, 450);
  };

  const handleDesignFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const result = typeof loadEvent.target?.result === "string" ? loadEvent.target.result : "";
      if (!result) return;
      setDesignPreviewUrl(result);
      setDesignPreviewLabel(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleDesignReset = () => {
    setDesignPreviewUrl("/images/logo2.png");
    setDesignPreviewLabel("Henüz dosya yüklenmedi");
    setDesignScale(100);
    setDesignRotation(0);
    setDesignNote("");
    setSelectedProduct(designProductOptions[0]?.label ?? "");
    setSelectedPlacement(designPlacementOptions[0]?.label ?? "");
  };

  const handleDesignSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    appendChatMessage(
      `Tasarım isteği kaydedildi: ${selectedProduct}, ${selectedPlacement}${
        designNote.trim() ? `, not: ${designNote.trim()}` : ""
      }.`,
      "bot",
    );
    setIsDesignOpen(false);
  };

  const setHomeSectionRef = (key: HomeSectionKey) => (element: HTMLElement | null) => {
    homeSectionRefs.current[key] = element;
  };

  const getRevealClasses = (key: HomeSectionKey): string => {
    return visibleHomeSections[key]
      ? "translate-y-0 opacity-100 blur-0"
      : "translate-y-4 opacity-0 blur-[2px]";
  };

  const scrollToHomeTarget = (target: ScrollTarget) => {
    if (pageView !== "home") {
      navigateToView("home");
      setPendingScrollTarget(target);
      return;
    }
    const targetKey = target === "products" ? "products" : "contact";
    homeSectionRefs.current[targetKey]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNavAction = (navId: string) => {
    setActiveNavId(navId);
    if (navId === "home") {
      navigateToView("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (navId === "products") {
      scrollToHomeTarget("products");
      return;
    }
    if (navId === "departments") {
      navigateToView("departments");
      return;
    }
    if (navId === "store") {
      scrollToHomeTarget("store");
    }
  };

  const openCartDrawer = () => {
    if (isCartOpen) return;
    setIsCartRendered(true);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsCartOpen(true);
      });
    });
  };

  const navigateToView = (targetView: PageView) => {
    if (targetView === pageView) return;
    setIsPageTransitioning(true);
    window.setTimeout(() => {
      setPageView(targetView);
      window.requestAnimationFrame(() => {
        setIsPageTransitioning(false);
      });
    }, 180);
  };

  const renderHeader = () => (
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
            src="/images/logo2.png"
            alt="AYBU Store logosu"
            className="h-12 w-auto object-contain"
          />
        </button>

        <nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } gap-2 lg:flex`}
        >
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

  const renderFooter = () => (
    <footer className="mt-10 border-t border-slate-200 bg-white/70 px-4 py-8">
      <div className="mx-auto grid w-[min(1200px,100%)] gap-6 md:grid-cols-3">
        {footerColumns.map((column) => (
          <section key={column.id}>
            <h3 className="mb-2 text-sm font-bold text-slate-800">{column.title}</h3>
            {column.description ? (
              <p className="mb-2 text-sm text-slate-600">{column.description}</p>
            ) : null}
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

  const renderCartDrawer = () => {
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

  const renderDesignModal = () => {
    if (!isDesignOpen) return null;
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/50 p-4" onClick={() => setIsDesignOpen(false)}>
        <aside
          className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-5 shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Tasarım Stüdyosu</h2>
              <p className="text-sm text-slate-500">Kendi tasarımınızı canlı önizleme ile hazırlayın.</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsDesignOpen(false)}>
              ×
            </Button>
          </div>

          <form onSubmit={handleDesignSubmit} className="grid gap-4 md:grid-cols-2">
            <label className="rounded-xl border border-dashed border-slate-300 p-4 text-center text-sm text-slate-600">
              Görsel Yükle
              <input
                type="file"
                accept="image/png,image/jpeg,image/svg+xml,image/webp"
                className="mt-2 block w-full text-xs"
                onChange={handleDesignFileChange}
              />
            </label>

            <div className="rounded-xl border border-slate-200 p-3">
              <img
                src={designPreviewUrl}
                alt="Tasarım önizleme"
                className="mx-auto h-48 max-w-full object-contain"
                style={{
                  transform: `scale(${designScale / 100}) rotate(${designRotation}deg)`,
                }}
              />
              <p className="mt-2 text-xs text-slate-500">{designPreviewLabel}</p>
            </div>

            <label className="text-sm text-slate-600">
              Ürün
              <Select
                value={selectedProduct}
                onChange={(event) => setSelectedProduct(event.target.value)}
                className="mt-1"
                options={designProductOptions.map((option) => ({
                  value: option.label,
                  label: option.label,
                }))}
              />
            </label>

            <label className="text-sm text-slate-600">
              Konum
              <Select
                value={selectedPlacement}
                onChange={(event) => setSelectedPlacement(event.target.value)}
                className="mt-1"
                options={designPlacementOptions.map((option) => ({
                  value: option.label,
                  label: option.label,
                }))}
              />
            </label>

            <label className="text-sm text-slate-600">
              Boyut ({designScale}%)
              <input
                type="range"
                min={70}
                max={150}
                step={1}
                value={designScale}
                onChange={(event) => setDesignScale(Number(event.target.value))}
                className="mt-1 w-full"
              />
            </label>

            <label className="text-sm text-slate-600">
              Açı ({designRotation}°)
              <input
                type="range"
                min={-25}
                max={25}
                step={1}
                value={designRotation}
                onChange={(event) => setDesignRotation(Number(event.target.value))}
                className="mt-1 w-full"
              />
            </label>

            <label className="md:col-span-2 text-sm text-slate-600">
              Açıklama
              <Input
                type="text"
                value={designNote}
                onChange={(event) => setDesignNote(event.target.value)}
                className="mt-1"
                placeholder="Tasarımınız hakkında not ekleyin..."
              />
            </label>

            <div className="md:col-span-2 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={handleDesignReset}>
                Sıfırla
              </Button>
              <Button type="button" variant="secondary" onClick={() => setIsDesignOpen(false)}>
                İptal
              </Button>
              <Button type="submit">Tasarımı Gönder</Button>
            </div>
          </form>
        </aside>
      </div>
    );
  };

  const renderChat = () => {
    return (
      <>
        {isChatOpen ? (
          <aside className="fixed bottom-20 right-4 z-50 w-full max-w-sm rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <header className="flex items-center justify-between border-b border-slate-100 p-3">
              <div>
                <p className="font-semibold text-slate-800">Canlı Destek</p>
                <p className="text-xs text-slate-500">Genelde 1-2 dk içinde yanıt</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsChatOpen(false)}>
                ×
              </Button>
            </header>
            <div className="max-h-72 space-y-2 overflow-y-auto p-3">
              {chatMessages.map((message) => (
                <article key={message.id} className={message.sender === "user" ? "text-right" : "text-left"}>
                  <p
                    className={`inline-block rounded-xl px-3 py-2 text-sm ${
                      message.sender === "user"
                        ? "bg-slate-800 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {message.text}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">{message.meta}</p>
                </article>
              ))}
            </div>
            <form onSubmit={handleChatSubmit} className="flex gap-2 border-t border-slate-100 p-3">
              <Input
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                className="flex-1"
                placeholder="Mesajınızı yazın..."
              />
              <Button type="submit" size="sm">
                Gönder
              </Button>
            </form>
          </aside>
        ) : null}
        <Button
          className="fixed bottom-4 right-4 z-40 rounded-full px-4"
          onClick={() => setIsChatOpen((prev) => !prev)}
        >
          Destek
        </Button>
      </>
    );
  };

  const renderHome = () => (
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

  const renderDepartments = () => (
    <main className="mx-auto grid w-[min(1200px,100%)] gap-4 px-4 py-6 lg:grid-cols-[280px,1fr]">
      <aside className="rounded-2xl border border-slate-200 bg-white p-4">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-700">Filtreler</h2>
        <div className="space-y-2">
          {departmentFilters.map((filter) => (
            <Button key={filter.id} variant="secondary" size="sm" fullWidth className="justify-start">
              {filter.label}
            </Button>
          ))}
        </div>
      </aside>
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold text-slate-800">{departmentsPageContent.title}</h1>
          <Select
            fullWidth={false}
            className="text-slate-700"
            options={departmentSortOptions.map((option) => ({
              value: option.id,
              label: option.label,
            }))}
          />
        </div>
        <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          {departmentsPageContent.placeholderText}
        </p>
      </section>
    </main>
  );

  const renderAuthPage = (mode: "login" | "register") => {
    const hero = mode === "login" ? loginPageContent : registerPageContent;
    return (
      <main className="mx-auto grid w-[min(1200px,100%)] gap-4 px-4 py-6 lg:grid-cols-[1.1fr,1fr]">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900">
          <img src="/images/ürünler-banner.png" alt="" className="h-full w-full object-cover opacity-80" />
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h1 className="text-2xl font-semibold text-slate-800">{hero.panelTitle}</h1>
          <p className="mt-2 text-sm text-slate-600">{hero.panelDescription}</p>
          <form className="mt-4 grid gap-3">
            {mode === "register" ? (
              <Input placeholder="Ad Soyad" />
            ) : null}
            <Input placeholder="ornek@aybu.edu.tr" />
            <Input placeholder="••••••••" type="password" />
            <Button type="submit" fullWidth>
              {hero.submitLabel}
            </Button>
          </form>
        </section>
      </main>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {renderHeader()}

      <div
        className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          isPageTransitioning ? "translate-y-2 opacity-0 blur-[1px]" : "translate-y-0 opacity-100 blur-0"
        }`}
      >
        {pageView === "home" ? renderHome() : null}
        {pageView === "departments" ? renderDepartments() : null}
        {pageView === "login" ? renderAuthPage("login") : null}
        {pageView === "register" ? renderAuthPage("register") : null}
      </div>

      {renderFooter()}
      {renderCartDrawer()}
      {renderDesignModal()}
      {renderChat()}
    </div>
  );
};
