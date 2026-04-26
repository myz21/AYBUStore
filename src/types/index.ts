export type CurrencyCode = "TRY";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  ariaCurrent?: "page";
}

export interface HeroSlide {
  id: string;
  imageUrl: string;
  ariaLabel: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  currency: CurrencyCode;
  imageUrl?: string;
  imageAlt?: string;
  emoji?: string;
  emojiLabel?: string;
}

export interface ProductSection {
  id: string;
  title: string;
  ctaLabel: string;
  ctaHref: string;
  products: Product[];
}

export interface DesignLaunchContent {
  kicker: string;
  title: string;
  description: string;
  ctaLabel: string;
}

export interface ContactInfo {
  campusAddressHtml: string;
  phone: string;
  email: string;
  directionsUrl: string;
  mapEmbedUrl: string;
}

export interface OpeningHour {
  dayLabel: string;
  value: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  id: string;
  title: string;
  description?: string;
  links?: FooterLink[];
}

export interface SocialLink {
  id: string;
  platform: "linkedin" | "instagram" | "x";
  href: string;
  ariaLabel: string;
}

export interface PaymentMethod {
  id: string;
  label: "TROY" | "MASTER" | "VISA" | "AMEX";
}

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  currency: CurrencyCode;
  imageUrl: string;
  imageAlt: string;
}

export interface AuthHeroContent {
  brandLabel: string;
  title: string;
  imageUrl: string;
}

export interface AuthBenefit {
  id: string;
  title: string;
  description: string;
}

export interface LoginPageContent {
  panelTitle: string;
  panelDescription: string;
  submitLabel: string;
  secondaryLabel: string;
  secondaryHref: string;
  forgotPasswordLabel: string;
  registerPrompt: string;
  registerPromptLinkLabel: string;
  registerPromptLinkHref: string;
  securityNote?: string;
  benefits?: AuthBenefit[];
}

export interface RegisterPageContent {
  panelTitle: string;
  panelDescription: string;
  submitLabel: string;
  loginPrompt: string;
  loginPromptLinkLabel: string;
  loginPromptLinkHref: string;
  securityNote?: string;
  benefits?: AuthBenefit[];
}

export interface FilterGroup {
  id: string;
  label: string;
}

export interface SortOption {
  id: string;
  label: string;
}

export interface DepartmentsPageContent {
  title: string;
  placeholderText: string;
}

export interface DesignProductOption {
  id: string;
  label: string;
}

export interface DesignPlacementOption {
  id: string;
  label: string;
}

export interface ChatMessageSeed {
  id: string;
  sender: "bot" | "user";
  text: string;
  meta: string;
}
