"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Button } from "../ui/Button";
import {
  getAuthBenefits,
  getAuthErrors,
  isAuthSubmittable,
  type AuthFormState,
  type AuthMode,
} from "./storefront/utils/auth";
import { formatTry } from "./storefront/utils/format";
import { useHeaderScrollVisibility } from "./storefront/hooks/useHeaderScrollVisibility";
import { useHomeSectionReveal } from "./storefront/hooks/useHomeSectionReveal";
import { useActiveNavTracking } from "./storefront/hooks/useActiveNavTracking";
import { usePageViewTransition } from "./storefront/hooks/usePageViewTransition";
import { useCartDrawerAnimation } from "./storefront/hooks/useCartDrawerAnimation";
import { useAuthForm } from "./storefront/hooks/useAuthForm";
import { StorefrontHeader } from "./storefront/sections/StorefrontHeader";
import { StorefrontHome } from "./storefront/sections/StorefrontHome";
import { StorefrontDepartments } from "./storefront/sections/StorefrontDepartments";
import { StorefrontAuth } from "./storefront/sections/StorefrontAuth";
import { StorefrontCartDrawer } from "./storefront/sections/StorefrontCartDrawer";
import { StorefrontDesignModal } from "./storefront/sections/StorefrontDesignModal";
import { StorefrontChat } from "./storefront/sections/StorefrontChat";
import { StorefrontFooter } from "./storefront/sections/StorefrontFooter";
import { useAuth } from "../../contexts/AuthContext";
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
  loginHeroContent,
  loginPageContent,
  mainNavItems,
  mobileTabItems,
  paymentMethods,
  registerHeroContent,
  registerPageContent,
  storeContactInfo,
  storeOpeningHours,
} from "../../lib/mockData";
import type { ChatMessageSeed, Product } from "../../types";

type PageView = "home" | "departments" | "login" | "register";
type HomeSectionKey = "hero" | "design" | "products" | "contact";
type ScrollTarget = "products" | "store";
type AuthSubmitStatus = "idle" | "loading" | "success";

export const MainStorefrontFeature = () => {
  const { user } = useAuth();
  const { pageView, setPageView, isPageTransitioning, navigateToView } = usePageViewTransition("home");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { isCartOpen, setIsCartOpen, isCartRendered, openCartDrawer } = useCartDrawerAnimation();
  const [isDesignOpen, setIsDesignOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState<boolean>(false);
  const [pendingScrollTarget, setPendingScrollTarget] = useState<ScrollTarget | null>(null);
  const [activeNavId, setActiveNavId] = useState<string>("home");
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
  const [designPreviewUrl, setDesignPreviewUrl] = useState<string>("/AYBUStore/images/logo2.png");
  const [designPreviewLabel, setDesignPreviewLabel] = useState<string>("Henüz dosya yüklenmedi");
  const {
    authForm,
    authTouched,
    authSubmitStatus,
    authErrorMessage,
    setAuthSubmitStatus,
    setAuthTouched,
    updateAuthField,
    handleAuthSubmit,
  } = useAuthForm();

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
    if (pageView !== "login" && pageView !== "register") return;
    setAuthSubmitStatus("idle");
    setAuthTouched({
      fullName: false,
      email: false,
      password: false,
      confirmPassword: false,
      acceptTerms: false,
    });
  }, [pageView]);

  useActiveNavTracking({ pageView, homeSectionRefs, setActiveNavId });

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

  useHeaderScrollVisibility({ setIsHeaderHidden });
  useHomeSectionReveal({ pageView, homeSectionRefs, setVisibleHomeSections });

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
    setDesignPreviewUrl("/AYBUStore/images/logo2.png");
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

  const renderHeader = () => (
    <StorefrontHeader
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
      isSearchOpen={isSearchOpen}
      setIsSearchOpen={setIsSearchOpen}
      isHeaderHidden={isHeaderHidden}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      activeNavId={activeNavId}
      navigateToView={navigateToView}
      handleNavAction={handleNavAction}
      openCartDrawer={openCartDrawer}
      isCartOpen={isCartOpen}
      mainNavItems={mainNavItems}
      userEmail={user?.email ?? null}
    />
  );

  const renderFooter = () => (
    <StorefrontFooter
      footerColumns={footerColumns}
      storeContactInfo={storeContactInfo}
      paymentMethods={paymentMethods}
      footerSocialLinks={footerSocialLinks}
    />
  );

  const renderCartDrawer = () => (
    <StorefrontCartDrawer
      isCartRendered={isCartRendered}
      isCartOpen={isCartOpen}
      setIsCartOpen={setIsCartOpen}
      drawerCartItems={drawerCartItems}
      cartSubtotal={cartSubtotal}
      formatTry={formatTry}
    />
  );

  const renderDesignModal = () => (
    <StorefrontDesignModal
      isDesignOpen={isDesignOpen}
      setIsDesignOpen={setIsDesignOpen}
      handleDesignSubmit={handleDesignSubmit}
      handleDesignFileChange={handleDesignFileChange}
      handleDesignReset={handleDesignReset}
      designPreviewUrl={designPreviewUrl}
      designPreviewLabel={designPreviewLabel}
      selectedProduct={selectedProduct}
      setSelectedProduct={setSelectedProduct}
      selectedPlacement={selectedPlacement}
      setSelectedPlacement={setSelectedPlacement}
      designScale={designScale}
      setDesignScale={setDesignScale}
      designRotation={designRotation}
      setDesignRotation={setDesignRotation}
      designNote={designNote}
      setDesignNote={setDesignNote}
      designProductOptions={designProductOptions}
      designPlacementOptions={designPlacementOptions}
    />
  );

  const renderChat = () => (
    <StorefrontChat
      isChatOpen={isChatOpen}
      setIsChatOpen={setIsChatOpen}
      chatMessages={chatMessages}
      chatInput={chatInput}
      setChatInput={setChatInput}
      handleChatSubmit={handleChatSubmit}
    />
  );

  const renderHome = () => (
    <StorefrontHome
      mobileTabItems={mobileTabItems}
      navigateToView={navigateToView}
      heroSlides={heroSlides}
      currentSlideIndex={currentSlideIndex}
      setCurrentSlideIndex={setCurrentSlideIndex}
      formatTry={formatTry}
      designLaunchContent={designLaunchContent}
      setIsDesignOpen={setIsDesignOpen}
      featuredProductsSection={featuredProductsSection}
      filteredProducts={filteredProducts}
      storeContactInfo={storeContactInfo}
      storeOpeningHours={storeOpeningHours}
      setHomeSectionRef={setHomeSectionRef}
      getRevealClasses={getRevealClasses}
    />
  );

  const renderDepartments = () => (
    <StorefrontDepartments
      departmentFilters={departmentFilters}
      departmentsPageContent={departmentsPageContent}
      departmentSortOptions={departmentSortOptions}
    />
  );

  const renderAuthPage = (mode: AuthMode) => (
    <StorefrontAuth
      mode={mode}
      loginPageContent={loginPageContent}
      registerPageContent={registerPageContent}
      loginHeroContent={loginHeroContent}
      registerHeroContent={registerHeroContent}
      authForm={authForm}
      authTouched={authTouched}
      authSubmitStatus={authSubmitStatus}
      authErrorMessage={authErrorMessage}
      updateAuthField={updateAuthField}
      handleAuthSubmit={(mode) => handleAuthSubmit(mode, () => navigateToView("home"))}
      getAuthBenefits={getAuthBenefits}
      getAuthErrors={getAuthErrors}
      navigateToView={navigateToView}
    />
  );

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
