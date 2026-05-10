import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import type {
  AuthBenefit,
  AuthHeroContent,
  CartItem,
  ChatMessageSeed,
  ContactInfo,
  DepartmentsPageContent,
  DesignLaunchContent,
  DesignPlacementOption,
  DesignProductOption,
  FilterGroup,
  FooterColumn,
  HeroSlide,
  LoginPageContent,
  NavItem,
  OpeningHour,
  PaymentMethod,
  Product,
  ProductSection,
  RegisterPageContent,
  SocialLink,
  SortOption,
} from "../../../types";

export type PageView = "home" | "departments" | "login" | "register";
export type HomeSectionKey = "hero" | "design" | "products" | "contact";
export type ScrollTarget = "products" | "store";
export type AuthMode = "login" | "register";
export type AuthSubmitStatus = "idle" | "loading" | "success" | "otp";


export interface AuthFormState {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export type AuthTouchedState = Record<keyof AuthFormState, boolean>;
export type AuthErrorState = Partial<Record<keyof AuthFormState, string>>;
export type HomeSectionVisibilityState = Record<HomeSectionKey, boolean>;
export type HomeSectionRefs = Record<HomeSectionKey, HTMLElement | null>;

export type FormatTry = (value: number) => string;
export type SetHomeSectionRef = (key: HomeSectionKey) => (element: HTMLElement | null) => void;
export type GetRevealClasses = (key: HomeSectionKey) => string;
export type ScrollToHomeTarget = (target: ScrollTarget) => void;
export type HandleNavAction = (navId: string) => void;
export type NavigateToView = (targetView: PageView) => void;

export type GetAuthBenefits = (
  mode: AuthMode,
  loginPageContent: LoginPageContent,
  registerPageContent: RegisterPageContent,
) => AuthBenefit[];

export type GetAuthErrors = (mode: AuthMode, authForm: AuthFormState) => AuthErrorState;
export type IsAuthSubmittable = (mode: AuthMode, authForm: AuthFormState) => boolean;

export type UpdateAuthField = <K extends keyof AuthFormState>(
  field: K,
  value: AuthFormState[K],
) => void;

export type HandleAuthSubmit = (
  mode: AuthMode,
) => (event: FormEvent<HTMLFormElement>) => void;

export interface StorefrontHeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  isSearchOpen: boolean;
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
  isHeaderHidden: boolean;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  activeNavId: string;
  navigateToView: NavigateToView;
  handleNavAction: HandleNavAction;
  openCartDrawer: () => void;
  isCartOpen: boolean;
  mainNavItems: NavItem[];
  userEmail: string | null;
}

export interface StorefrontHomeProps {
  mobileTabItems: NavItem[];
  navigateToView: NavigateToView;
  heroSlides: HeroSlide[];
  currentSlideIndex: number;
  setCurrentSlideIndex: Dispatch<SetStateAction<number>>;
  formatTry: FormatTry;
  designLaunchContent: DesignLaunchContent;
  setIsDesignOpen: Dispatch<SetStateAction<boolean>>;
  featuredProductsSection: ProductSection;
  filteredProducts: Product[];
  storeContactInfo: ContactInfo;
  storeOpeningHours: OpeningHour[];
  setHomeSectionRef: SetHomeSectionRef;
  getRevealClasses: GetRevealClasses;
}

export interface StorefrontDepartmentsProps {
  departmentFilters: FilterGroup[];
  departmentsPageContent: DepartmentsPageContent;
  departmentSortOptions: SortOption[];
}

export interface StorefrontAuthProps {
  mode: AuthMode;
  loginPageContent: LoginPageContent;
  registerPageContent: RegisterPageContent;
  loginHeroContent: AuthHeroContent;
  registerHeroContent: AuthHeroContent;
  authForm: AuthFormState;
  authTouched: AuthTouchedState;
  authSubmitStatus: AuthSubmitStatus;
  authErrorMessage: string | null;
  updateAuthField: UpdateAuthField;
  handleAuthSubmit: HandleAuthSubmit;
  getAuthBenefits: GetAuthBenefits;
  getAuthErrors: GetAuthErrors;
  navigateToView: NavigateToView;
  setAuthSubmitStatus: (value: AuthSubmitStatus) => void;
}

export interface StorefrontFooterProps {
  footerColumns: FooterColumn[];
  storeContactInfo: ContactInfo;
  paymentMethods: PaymentMethod[];
  footerSocialLinks: SocialLink[];
}

export interface StorefrontCartDrawerProps {
  isCartRendered: boolean;
  isCartOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
  drawerCartItems: CartItem[];
  cartSubtotal: number;
  formatTry: FormatTry;
}

export interface StorefrontDesignModalProps {
  isDesignOpen: boolean;
  setIsDesignOpen: Dispatch<SetStateAction<boolean>>;
  handleDesignSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleDesignFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleDesignReset: () => void;
  designPreviewUrl: string;
  designPreviewLabel: string;
  selectedProduct: string;
  setSelectedProduct: Dispatch<SetStateAction<string>>;
  selectedPlacement: string;
  setSelectedPlacement: Dispatch<SetStateAction<string>>;
  designScale: number;
  setDesignScale: Dispatch<SetStateAction<number>>;
  designRotation: number;
  setDesignRotation: Dispatch<SetStateAction<number>>;
  designNote: string;
  setDesignNote: Dispatch<SetStateAction<string>>;
  designProductOptions: DesignProductOption[];
  designPlacementOptions: DesignPlacementOption[];
}

export interface StorefrontChatProps {
  isChatOpen: boolean;
  setIsChatOpen: Dispatch<SetStateAction<boolean>>;
  chatMessages: ChatMessageSeed[];
  chatInput: string;
  setChatInput: Dispatch<SetStateAction<string>>;
  handleChatSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export interface UseHeaderScrollVisibilityParams {
  setIsHeaderHidden: Dispatch<SetStateAction<boolean>>;
}

export interface UseHomeSectionRevealParams {
  pageView: PageView;
  homeSectionRefs: HomeSectionRefs;
  setVisibleHomeSections: Dispatch<SetStateAction<HomeSectionVisibilityState>>;
}

export interface UseActiveNavTrackingParams {
  pageView: PageView;
  homeSectionRefs: HomeSectionRefs;
  setActiveNavId: Dispatch<SetStateAction<string>>;
}

export interface UseCartDrawerAnimationParams {
  isCartOpen: boolean;
  setIsCartRendered: Dispatch<SetStateAction<boolean>>;
}

export interface UsePageViewTransitionParams {
  pageView: PageView;
  setPageView: Dispatch<SetStateAction<PageView>>;
  setIsPageTransitioning: Dispatch<SetStateAction<boolean>>;
}
