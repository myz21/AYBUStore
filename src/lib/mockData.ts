import type {
  AuthHeroContent,
  CartItem,
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
  ProductSection,
  RegisterPageContent,
  SocialLink,
  SortOption,
  ChatMessageSeed,
} from "../types";

export const mainNavItems: NavItem[] = [
  { id: "home", label: "Ana Sayfa", href: "index.html", ariaCurrent: "page" },
  { id: "products", label: "Ürünler", href: "#products" },
  { id: "departments", label: "Bölümler", href: "bolumler.html" },
  { id: "store", label: "Mağaza", href: "#mapSection" },
];

export const mobileTabItems: NavItem[] = [
  { id: "mobile-home", label: "Mağaza Ana Sayfa", href: "index.html", ariaCurrent: "page" },
  { id: "mobile-all", label: "Tüm Ürünler", href: "#products" },
  { id: "mobile-clothing", label: "Giyim", href: "#products" },
  { id: "mobile-departments", label: "Bölümler", href: "bolumler.html" },
  { id: "mobile-accessories", label: "Aksesuar", href: "#products" },
];

export const heroSlides: HeroSlide[] = [
  { id: "hero-1", imageUrl: "/images/banner.png", ariaLabel: "Banner 1" },
  { id: "hero-2", imageUrl: "/images/aybu-kesfet-banner.png", ariaLabel: "Banner 2" },
  { id: "hero-3", imageUrl: "/images/kampusun-yeni-uyesi.png", ariaLabel: "Banner 3" },
  { id: "hero-4", imageUrl: "/images/takvim_banner.png", ariaLabel: "Banner 4" },
  { id: "hero-5", imageUrl: "/images/baharda-kampüs-banner.png", ariaLabel: "Banner 5" },
];

export const designLaunchContent: DesignLaunchContent = {
  kicker: "Kendi Tasarımın",
  title: "Kampüs ruhunu kendi çizginle ürüne taşı.",
  description:
    "Tişört, hoodie ve sweatshirt ürünlerine kendi görselini yerleştir. Dosyanı yükle, konum seç, önizle ve bize gönder.",
  ctaLabel: "Tasarım Ekle",
};

export const featuredProductsSection: ProductSection = {
  id: "featured-products",
  title: "Çok Satanlar",
  ctaLabel: "Tüm Ürünler",
  ctaHref: "#products",
  products: [
    {
      id: "product-1",
      name: "AYBÜ Lacivert Sweatshirt",
      price: 1190,
      currency: "TRY",
      imageUrl: "/images/blue_swearshirt.png",
      imageAlt: "AYBÜ Lacivert Sweatshirt",
    },
    {
      id: "product-2",
      name: "AYBÜ Turkuaz Baskılı Sweatshirt",
      price: 1150,
      currency: "TRY",
      imageUrl: "/images/aybu-turquoise-hoodie.png",
      imageAlt: "AYBÜ Turkuaz Baskılı Sweatshirt",
    },
    {
      id: "product-3",
      name: "AYBÜ Minimal Logolu Sweatshirt",
      price: 1090,
      currency: "TRY",
      imageUrl: "/images/red_sweatshirt.png",
      imageAlt: "AYBÜ Minimal Logolu Sweatshirt",
    },
    {
      id: "product-4",
      name: "AYBÜ Siyah Tişört",
      price: 690,
      currency: "TRY",
      imageUrl: "/images/black_tshirt.png",
      imageAlt: "AYBÜ Siyah Tişört",
    },
    {
      id: "product-5",
      name: "AYBÜ Cam Kupa",
      price: 280,
      currency: "TRY",
      imageUrl: "/images/glass.png",
      imageAlt: "AYBÜ Cam Kupa",
    },
    {
      id: "product-6",
      name: "AYBÜ Turkuaz Cam Bardak",
      price: 320,
      currency: "TRY",
      imageUrl: "/images/glass2.png",
      imageAlt: "AYBÜ Turkuaz Cam Bardak",
    },
    {
      id: "product-7",
      name: "AYBÜ Hoodie (Oversize)",
      price: 1390,
      currency: "TRY",
      emoji: "🧥",
      emojiLabel: "Hoodie",
    },
    {
      id: "product-8",
      name: "AYBÜ Kupa (Seramik)",
      price: 260,
      currency: "TRY",
      emoji: "☕",
      emojiLabel: "Kupa",
    },
    {
      id: "product-9",
      name: "AYBÜ Defter (Çizgili)",
      price: 140,
      currency: "TRY",
      imageUrl: "/images/aybu-defter.png",
      imageAlt: "AYBÜ Defter",
    },
    {
      id: "product-10",
      name: "AYBÜ Bez Çanta",
      price: 220,
      currency: "TRY",
      emoji: "👜",
      emojiLabel: "Bez çanta",
    },
    {
      id: "product-11",
      name: "AYBÜ Anahtarlık (Metal)",
      price: 90,
      currency: "TRY",
      imageUrl: "/images/aybu-anahtarlik.png",
      imageAlt: "AYBÜ Anahtarlık (Metal)",
    },
    {
      id: "product-12",
      name: "AYBÜ Şapka (Nakış)",
      price: 310,
      currency: "TRY",
      emoji: "🧢",
      emojiLabel: "Şapka",
    },
  ],
};

export const storeContactInfo: ContactInfo = {
  campusAddressHtml: "AYBU Kampüsü, Etlik, Pursaklar Cad.<br>06760 Keçiören – Ankara",
  phone: "+90 312 000 00 00",
  email: "magaza@aybu.edu.tr",
  directionsUrl: "https://share.google/flxjU211WdA3UaArU",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3057.6825859808796!2d32.8159157124834!3d39.970848871395894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34c029ec9701b%3A0xfb0b0a3bf440a10a!2zQW5rYXJhIFnEsWxkxLFyxLFtIEJleWF6xLF0IMOcbml2ZXJzaXRlc2kgMTUgVGVtbXV6IMWeZWhpdGxlcmkgWWVybfFn2tlc2ki!5e0!3m2!1str!2str!4v1776981183560!5m2!1str!2str",
};

export const storeOpeningHours: OpeningHour[] = [
  { dayLabel: "Pazartesi–Cuma", value: "09:00–17:00" },
  { dayLabel: "Cumartesi", value: "10:00–14:00" },
  { dayLabel: "Pazar", value: "Kapalı" },
];

export const footerColumns: FooterColumn[] = [
  {
    id: "footer-store",
    title: "AYBU Store",
    description: "Ankara Yıldırım Beyazıt Üniversitesi resmi ürün mağazası.",
    links: [
      { label: "Hakkımızda", href: "#mapSection" },
      { label: "Sıkça Sorulan Sorular", href: "#products" },
      { label: "Kargo Bilgisi", href: "#products" },
      { label: "İade ve Değişim", href: "#products" },
      { label: "Gizlilik Politikası", href: "#products" },
    ],
  },
  {
    id: "footer-account",
    title: "Hesabım",
    links: [
      { label: "Oturum Aç", href: "login.html" },
      { label: "Kayıt Ol", href: "register.html" },
      { label: "Sipariş Geçmişi", href: "#products" },
      { label: "İstek Listem", href: "#products" },
    ],
  },
  {
    id: "footer-secure-shopping",
    title: "Güvenli Alışveriş",
    links: [
      { label: "SSL Güvenli Ödeme", href: "#products" },
      { label: "Mesafeli Satış Sözleşmesi", href: "#products" },
    ],
  },
];

export const footerSocialLinks: SocialLink[] = [
  {
    id: "social-linkedin",
    platform: "linkedin",
    href: "https://tr.linkedin.com/school/ybuankara/",
    ariaLabel: "AYBÜ LinkedIn sayfası",
  },
  {
    id: "social-instagram",
    platform: "instagram",
    href: "https://instagram.com/ybuankara",
    ariaLabel: "AYBÜ Instagram sayfası",
  },
];

export const paymentMethods: PaymentMethod[] = [
  { id: "payment-troy", label: "TROY" },
  { id: "payment-master", label: "MASTER" },
  { id: "payment-visa", label: "VISA" },
  { id: "payment-amex", label: "AMEX" },
];

export const drawerCartItems: CartItem[] = [
  {
    id: "drawer-item-black-tshirt",
    name: "AYBÜ Siyah Tişört",
    quantity: 1,
    unitPrice: 690,
    currency: "TRY",
    imageUrl: "/images/black_tshirt.png",
    imageAlt: "AYBÜ Siyah Tişört küçük görsel",
  },
];

export const loginHeroContent: AuthHeroContent = {
  brandLabel: "AYBÜ Store",
  title: "Hesabına Giriş Yap",
  imageUrl: "/images/ürünler-banner.png",
};

export const registerHeroContent: AuthHeroContent = {
  brandLabel: "AYBÜ Store",
  title: "Yeni Hesap Oluştur",
  imageUrl: "/images/ürünler-banner.png",
};

export const loginPageContent: LoginPageContent = {
  panelTitle: "AYBÜ Hesabınıza Giriş Yapın",
  panelDescription:
    "Sepetinizi, siparişlerinizi ve favori ürünlerinizi yönetmek için giriş yapın.",
  submitLabel: "Giriş Yap",
  secondaryLabel: "Üye Ol",
  secondaryHref: "register.html",
  forgotPasswordLabel: "Şifremi Unuttum",
  registerPrompt: "Hesabın yok mu?",
  registerPromptLinkLabel: "Hemen Üye Ol",
  registerPromptLinkHref: "register.html",
  securityNote: "Hesap bilgileriniz güvenli altyapı ile korunur.",
  benefits: [
    {
      id: "login-benefit-orders",
      title: "Sipariş Takibi",
      description: "Siparişlerinizin güncel durumunu tek ekrandan takip edin.",
    },
    {
      id: "login-benefit-favorites",
      title: "Favoriler",
      description: "Beğendiğiniz ürünleri kaydedip hızlıca yeniden görüntüleyin.",
    },
  ],
};

export const registerPageContent: RegisterPageContent = {
  panelTitle: "Üye Ol",
  panelDescription: "AYBÜ Store deneyimine başlamak için hesap oluşturun.",
  submitLabel: "Üye Ol",
  loginPrompt: "Zaten hesabın var mı?",
  loginPromptLinkLabel: "Giriş Yap",
  loginPromptLinkHref: "login.html",
  securityNote: "Kayıt sonrası kampanya ve duyurulardan öncelikli haberdar olursunuz.",
  benefits: [
    {
      id: "register-benefit-fast-checkout",
      title: "Hızlı Ödeme",
      description: "Adres ve iletişim bilgilerinizi kaydederek hızlı sipariş verin.",
    },
    {
      id: "register-benefit-campus-perks",
      title: "Kampüs Avantajları",
      description: "Öğrenci odaklı kampanya ve sürpriz indirimleri kaçırmayın.",
    },
    {
      id: "register-benefit-history",
      title: "Sipariş Geçmişi",
      description: "Tüm satın alımlarınızı tek panelden düzenli şekilde yönetin.",
    },
  ],
};

export const departmentsPageContent: DepartmentsPageContent = {
  title: "Bolumler",
  placeholderText: "Bölümlerin kendilerine özgü içerikleri eklenecektir. Beklemede kalın :)",
};

export const departmentFilters: FilterGroup[] = [
  { id: "filter-department", label: "Göre filtrele: bölüm" },
  { id: "filter-size", label: "Göre Filtrele: Beden" },
  { id: "filter-fabric", label: "Göre Filtrele: Kumaş" },
  { id: "filter-volume", label: "Göre Filtrele: Hacim" },
  { id: "filter-gusset", label: "Göre Filtrele: Körük" },
  { id: "filter-model", label: "Göre Filtrele: Model" },
  { id: "filter-speed-options", label: "Göre Filtrele: Hız Seçenekleri" },
  { id: "filter-material", label: "Göre Filtrele: Materyal" },
  { id: "filter-pen-print-type", label: "Göre Filtrele: Kalem Baskı Türü" },
  { id: "filter-tshirt-size-1", label: "Göre Filtrele: 1. T-shirt Beden" },
  { id: "filter-tshirt-size-2", label: "Göre Filtrele: 2. T-shirt Beden" },
  { id: "filter-color", label: "Göre Filtrele: Renk" },
];

export const departmentSortOptions: SortOption[] = [
  { id: "sort-best-sellers", label: "En Çok Satanlar" },
  { id: "sort-newest", label: "Yeni Gelenler" },
  { id: "sort-price-asc", label: "Fiyat: Artan" },
  { id: "sort-price-desc", label: "Fiyat: Azalan" },
];

export const designProductOptions: DesignProductOption[] = [
  { id: "design-product-hoodie", label: "AYBU Hoodie" },
  { id: "design-product-tshirt", label: "AYBU Tişört" },
  { id: "design-product-sweatshirt", label: "AYBU Sweatshirt" },
  { id: "design-product-polo", label: "AYBU Polo" },
];

export const designPlacementOptions: DesignPlacementOption[] = [
  { id: "placement-chest-left", label: "Göğüs (Sol)" },
  { id: "placement-chest-center", label: "Göğüs (Orta)" },
  { id: "placement-back", label: "Sırt" },
  { id: "placement-sleeve", label: "Kol" },
];

export const chatSeedMessages: ChatMessageSeed[] = [
  {
    id: "chat-seed-1",
    sender: "bot",
    text: "Merhaba! Size nasıl yardımcı olabilirim?",
    meta: "AYBU Store • şimdi",
  },
];
