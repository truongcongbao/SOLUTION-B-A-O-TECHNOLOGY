export interface MainCategory {
  id: string; // VD: 'attendance', 'pos', 'printer' ...
  name: string; // VD: 'Máy Chấm Công', 'Máy bán hàng cảm ứng POS'
  description?: string; // Mô tả ngắn danh mục
  imageUrl?: string; // Ảnh đại diện danh mục
  seoKeywords?: string; // Từ khóa SEO danh mục
  isVisible?: boolean; // Ẩn / Hiện danh mục trên website (mặc định true)
  sortOrder?: number; // Thứ tự vị trí sắp xếp
  isFeatured?: boolean; // Tích chọn đưa lên mục Danh mục nổi bật dưới banner
  badge?: string; // Huy hiệu nổi bật (VD: '1 đổi 1', 'Hot', 'Bán chạy', 'Mới')
}

export interface SubCategory {
  id: string; // VD: 'sub-att-rj', 'sub-pos-ty'
  mainCategoryId: string; // Khóa ngoại liên kết danh mục lớn
  name: string; // VD: 'Hiệu Ronald Jack', 'Hiệu Tyso'
  description?: string; // Mô tả ngắn danh mục con
  imageUrl?: string; // Ảnh đại diện danh mục con
  brandBadge?: string; // Nhãn thương hiệu/Badge highlight (VD: 'RONALD JACK', 'ZEBRA', 'K80')
  seoKeywords?: string; // Từ khóa SEO danh mục con
  isVisible?: boolean; // Ẩn / Hiện trên website (mặc định true)
  sortOrder?: number; // Thứ tự vị trí sắp xếp
}

export interface PriceOption {
  id: string;
  name: string; // VD: "Mua giao tận nơi", "Mua kèm giấy in K80"
  price: number;
  originalPrice?: number;
}

export interface Product {
  id: string;
  name: string;
  category: string; // Lưu ID danh mục lớn (mainCategoryId) để tương thích ngược tốt nhất
  categoryLabel: string; // Nhãn danh mục lớn
  subCategoryId?: string; // ID danh mục con (mới)
  subCategoryLabel?: string; // Nhãn danh mục con (mới)
  brand: string;
  price: number;
  originalPrice: number;
  highlights: string[];
  specs: { [key: string]: string };
  isPopular?: boolean;
  isFeatured?: boolean; // Tích chọn sản phẩm nổi bật
  featuredAt?: number; // Thời gian kích hoạt nổi bật (dùng để FIFO 10 sản phẩm nổi bật mỗi danh mục)
  image?: string;
  images?: string[];
  imageBack?: string; // Hình ảnh mặt sau & cổng
  imageInside?: string; // Hình ảnh khoang chứa trong
  imageAccessory?: string; // Hình ảnh hộp phụ kiện đi kèm
  description?: string; // Mô tả ngắn sản phẩm
  articleContent?: string;
  videoUrl?: string; // URL video sản phẩm (Youtube...)
  sourceUrl?: string; // Đường dẫn nguồn sản phẩm dán vào hoặc bóc tách từ Web
  seoTitle?: string; // Tiêu đề tối ưu SEO Google
  seoDescription?: string; // Mô tả tối ưu SEO Google
  seoKeywords?: string; // Từ khóa SEO Google cách nhau bằng dấu phẩy
  customStorePrice?: number;
  customStoreOriginalPrice?: number;
  customDeliveryPrice?: number;
  customDeliveryOriginalPrice?: number;
  customSetupPrice?: number;
  customSetupOriginalPrice?: number;
  deliverySurcharge?: number;
  installationSurcharge?: number;
  priceOptions?: PriceOption[]; // Các tuỳ chọn mức giá linh hoạt tự tạo thêm
  inventoryStatus?: 'in_stock' | 'out_of_stock' | 'pre_order';
  customPromotions?: string; // Khuyến mãi & quà tặng tự chọn riêng biệt
  customPolicies?: string; // Chính sách chất lượng & đồng hành tự chọn riêng biệt
  slug?: string; // Đường dẫn sản phẩm tùy chỉnh (Slug / URL custom)
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface TroubleshootingGuide {
  category: string;
  categoryLabel: string;
  problem: string;
  steps: string[];
}

export interface ProductReview {
  id: string;
  productId: string;
  author: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  reply?: string; // Phản hồi từ quản trị viên
  replyDate?: string; // Ngày phản hồi từ quản trị viên
  images?: string[]; // Hình ảnh đính kèm từ khách hàng
}

export interface HeaderConfigItem {
  id: string;
  label: string;
  visible: boolean;
  url?: string;
}

export const DEFAULT_HEADER_ITEMS: HeaderConfigItem[] = [
  { id: 'home', label: 'Trang Chủ', visible: false },
  { id: 'catalog', label: 'Sản Phẩm', visible: true },
  { id: 'advisor', label: 'Tư Vấn & Báo Giá', visible: true },
  { id: 'quote', label: 'Yêu Cầu Báo Giá & Đặt Hàng', visible: false },
  { id: 'troubleshoot', label: 'Cẩm Nang Tự Sửa Lỗi', visible: true },
  { id: 'news', label: 'Tin Tức & Cẩm Nang', visible: true },
  { id: 'order-lookup', label: 'Tra Cứu Đơn Hàng', visible: true }
];

export interface SolutionBanner {
  id: string;
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  actionType: 'open_ai' | 'view_catalog' | 'view_quote' | 'custom_url';
  targetCategory?: string;
  aiPrompt?: string;
  customUrl?: string;
  bgGradient: string;
  badgeBg: string;
  buttonBg: string;
  iconType: 'fingerprint' | 'shopping-bag' | 'shield' | 'zap' | 'sparkles' | 'printer' | 'none';
  isVisible: boolean;
  // Custom background & color options
  bgType?: 'gradient' | 'color' | 'image';
  customBgColor?: string;
  imageUrl?: string;
  overlayOpacity?: number;
  textColor?: string;
  badgeTextColor?: string;
  buttonTextColor?: string;
}

export const DEFAULT_SOLUTION_BANNERS: SolutionBanner[] = [
  {
    id: 'solution-1',
    badge: 'DÀNH CHO KHỐI VĂN PHÒNG & NHÀ XƯỞNG',
    title: 'GIẢI PHÁP MÁY CHẤM CÔNG VÂN TAY / FACEID AI',
    description: 'Đồng bộ chấm công tự động qua Wifi, trích xuất báo cáo đi muộn về sớm qua Excel. SOLUTION B A O hỗ trợ cấu hình ca hành chính, ca kíp phức tạp trọn gói, bảo hành thiết bị tận nơi.',
    buttonText: 'HỎI TRỢ LÝ AI GIẢI PHÁP CỤ THỂ',
    actionType: 'open_ai',
    aiPrompt: 'Tôi cần tìm giải pháp chấm công vân tay và khuôn mặt cho nhà xưởng 50 người, phân ca kíp hành chính và đêm.',
    bgGradient: 'from-blue-600 via-blue-700 to-indigo-800 text-white',
    badgeBg: 'bg-orange-400 text-slate-950',
    buttonBg: 'bg-yellow-400 text-slate-950 hover:bg-yellow-300',
    iconType: 'fingerprint',
    isVisible: true
  },
  {
    id: 'solution-2',
    badge: 'DÀNH CHO CAFE, TRÀ SỮA & SIÊU THỊ',
    title: 'GIẢI PHÁP TRỌN BỘ QUẦY THU NGÂN POS HÓA ĐƠN',
    description: 'Kết hợp máy in bill Xprinter kết nối cổng LAN/Wifi nhà bếp, máy quét mã vạch Honeywell siêu tốc và két tiền tự động bung khóa. Hỗ trợ lắp đặt thiết bị miễn phí nội thành TP.HCM.',
    buttonText: 'XEM BÁO GIÁ TRỌN BỘ NGAY',
    actionType: 'open_ai',
    aiPrompt: 'Tư vấn trọn bộ thiết bị bán hàng gồm máy in bill, két tiền, máy quét cho siêu thị mini hoặc quán cafe.',
    bgGradient: 'from-slate-900 via-slate-800 to-slate-950 text-white border border-slate-800',
    badgeBg: 'bg-amber-500 text-slate-950',
    buttonBg: 'bg-amber-500 text-slate-950 hover:bg-amber-400',
    iconType: 'shopping-bag',
    isVisible: true
  },
  {
    id: 'solution-3',
    badge: 'DÀNH CHO DOANH NGHIỆP',
    title: 'GIẢI PHÁP THIẾT BỊ CÔNG NGHỆ CHUYÊN NGHIỆP',
    description: 'Tư vấn giải pháp và cấu hình hệ thống phù hợp nhất cho mô hình kinh doanh của bạn.',
    buttonText: 'TƯ VẤN NGAY CÙNG AI',
    actionType: 'open_ai',
    aiPrompt: 'Tôi muốn tư vấn giải pháp thiết bị công nghệ phù hợp với cửa hàng và doanh nghiệp của tôi.',
    bgGradient: 'from-blue-500 via-sky-600 to-indigo-700 text-white',
    badgeBg: 'bg-orange-500 text-slate-950',
    buttonBg: 'bg-yellow-400 text-slate-950 hover:bg-yellow-300',
    iconType: 'sparkles',
    isVisible: true
  }
];

export interface HeroSideBanner {
  id: string;
  badge: string;
  badgeColor?: string;
  badgeBg?: string;
  title: string;
  titleColor?: string;
  description: string;
  descColor?: string;
  buttonText: string;
  buttonColor?: string;
  actionTab?: string;
  bgType?: 'gradient' | 'color' | 'image';
  bgGradient?: string;
  customBgColor?: string;
  imageUrl?: string;
  overlayOpacity?: number;
  iconType?: 'cpu' | 'truck' | 'shield' | 'zap' | 'wrench' | 'headphones' | 'none';
  isVisible?: boolean;
}

export const DEFAULT_HERO_SIDE_BANNERS: HeroSideBanner[] = [
  {
    id: 'hero-side-1',
    badge: 'DỊCH VỤ KỸ THUẬT SOLUTION BẢO',
    badgeColor: '#fde047',
    badgeBg: '',
    title: 'CÀI ĐẶT TỪ XA CHUYÊN NGHIỆP',
    titleColor: '#ffffff',
    description: 'Hỗ trợ cấu hình phân ca, phần mềm chấm công UltraViewer miễn phí.',
    descColor: '#f1f5f9',
    buttonText: 'Xem chi tiết →',
    buttonColor: '#fde047',
    actionTab: 'troubleshoot',
    bgType: 'gradient',
    bgGradient: 'from-[#CD1818] to-[#900E12]',
    iconType: 'cpu',
    isVisible: true
  },
  {
    id: 'hero-side-2',
    badge: 'GIAO HÀNG HỎA TỐC',
    badgeColor: '#2563eb',
    badgeBg: '',
    title: 'VẬN CHUYỂN COD TOÀN QUỐC',
    titleColor: '#0f172a',
    description: 'Giao hàng COD toàn quốc 24h. Kiểm tra máy móc trước khi thanh toán.',
    descColor: '#64748b',
    buttonText: 'Xem chi tiết →',
    buttonColor: '#2563eb',
    actionTab: 'advisor',
    bgType: 'color',
    customBgColor: '#ffffff',
    iconType: 'truck',
    isVisible: true
  }
];

export interface HeroQuickTag {
  id: string;
  title: string;
  desc: string;
  slideIndex?: number;
  isVisible?: boolean;
}

export const DEFAULT_HERO_QUICK_TAGS: HeroQuickTag[] = [
  { id: 'tag-1', title: 'In tem XP-420B', desc: 'Giảm 20% + Giấy', slideIndex: 0, isVisible: true },
  { id: 'tag-2', title: 'Chấm công RJ1200', desc: 'Tặng phần mềm', slideIndex: 1, isVisible: true },
  { id: 'tag-3', title: 'Máy POS Bán hàng', desc: 'Trả góp 0% LS', slideIndex: 2, isVisible: true },
  { id: 'tag-4', title: 'Quét mã vạch 2D', desc: 'Bảo hành 24T', slideIndex: 0, isVisible: true }
];

export interface ServiceBadgeItem {
  id: string;
  icon: 'truck' | 'shield' | 'credit-card' | 'wrench' | 'headphones' | 'zap' | 'check-circle' | 'phone';
  title: string;
  desc: string;
  isVisible?: boolean;
}

export const DEFAULT_SERVICE_BADGES: ServiceBadgeItem[] = [
  { id: 'badge-1', icon: 'truck', title: 'Mẫu mã đa dạng', desc: 'Hàng chính hãng 100%', isVisible: true },
  { id: 'badge-2', icon: 'shield', title: 'Giao hàng 1h', desc: 'Nội thành TP.HCM & HN', isVisible: true },
  { id: 'badge-3', icon: 'credit-card', title: 'Trả góp 0% LS', desc: 'Xét duyệt hồ sơ 5 phút', isVisible: true },
  { id: 'badge-4', icon: 'wrench', title: 'Hỗ trợ 24/7', desc: 'Cài đặt & Bảo hành tận nơi', isVisible: true }
];

export interface FeedPromoBanner {
  id: string;
  badge: string;
  badgeColor?: string;
  title: string;
  titleColor?: string;
  description: string;
  buttonText: string;
  buttonAction?: string; // 'advisor' | 'catalog' | 'troubleshoot' | custom URL
  gradientBg?: string;
  imageUrl?: string;
  isVisible?: boolean;
}

export const DEFAULT_FEED_BANNERS: FeedPromoBanner[] = [
  {
    id: 'feed-banner-1',
    badge: 'BÁN CHẠY NHẤT',
    badgeColor: 'bg-yellow-400 text-slate-950',
    title: 'THIẾT BỊ BÁN HÀNG & MÁY CHẤM CÔNG THÔNG MINH',
    titleColor: 'text-amber-300',
    description: 'Tặng kèm phần mềm quản lý trọn đời + Hỗ trợ lắp đặt tận nơi.',
    buttonText: 'TƯ VẤN BÁO GIÁ',
    buttonAction: 'advisor',
    gradientBg: 'from-slate-900 via-indigo-950 to-slate-900',
    imageUrl: '',
    isVisible: true
  },
  {
    id: 'feed-banner-2',
    badge: 'ƯU ĐÃI LỚN',
    badgeColor: 'bg-red-500 text-white',
    title: 'MÁY IN HÓA ĐƠN & GIẤY IN K80 CHÍNH HÃNG',
    titleColor: 'text-rose-300',
    description: 'In siêu tốc Wifi/LAN từ điện thoại, bảo hành 12 tháng 1 đổi 1.',
    buttonText: 'XEM SẢN PHẨM',
    buttonAction: 'catalog',
    gradientBg: 'from-rose-950 via-red-950 to-slate-900',
    imageUrl: '',
    isVisible: true
  },
  {
    id: 'feed-banner-3',
    badge: 'GIẢI PHÁP TRỌN BỘ',
    badgeColor: 'bg-emerald-400 text-slate-950',
    title: 'HỘP ĐỰNG TIỀN & MÁY QUÉT MÃ VẠCH ĐA TIA 2D',
    titleColor: 'text-teal-300',
    description: 'Tương thích mượt mà mọi phần mềm KiotViet, Sapo, Pos365, CukCuk.',
    buttonText: 'NHẬN TƯ VẤN NGAY',
    buttonAction: 'advisor',
    gradientBg: 'from-slate-950 via-teal-950 to-slate-900',
    imageUrl: '',
    isVisible: true
  }
];

export interface WebConfig {
  primaryPhone?: string;
  secondaryPhone?: string;
  supportName?: string;
  zaloPhone?: string;
  zaloLink?: string;
  address?: string;
  companyName?: string;
  taxCode?: string;
  email?: string;
  facebookLink?: string;
  logoText?: string;
  logoSubtext?: string;
  logoImageUrl?: string;
  footerCompanyName?: string;
  footerLogoText?: string;
  footerLogoImageUrl?: string;
  footerDescription?: string;
  footerTaxCode?: string;
  footerCopyright?: string;
  showTopHeaderBar?: boolean;
  showHeaderBar?: boolean;
  showHeaderLogo?: boolean;
  showHeaderSearch?: boolean;
  showHeaderHotline?: boolean;
  showHeaderCart?: boolean;
  showNavBar?: boolean;
  showNavCategories?: boolean;
  showThemeToggle?: boolean;
  themeMode?: 'light' | 'dark';
  primaryColor?: string;
  flashSaleActive?: boolean;
  flashSaleEndTime?: string;
  flashSaleTitle?: string;
  flashSaleSubtitle?: string;
  partners?: string[];
  headerItems?: HeaderConfigItem[];
  heroSideBanners?: HeroSideBanner[];
  heroQuickTags?: HeroQuickTag[];
  serviceBadges?: ServiceBadgeItem[];
  feedBanners?: FeedPromoBanner[];
  slides?: any[];
  // Featured categories below banner config
  showFeaturedCategories?: boolean; // Bật / Tắt khối Danh mục nổi bật dưới banner
  featuredCategoriesTitle?: string; // Tiêu đề danh mục nổi bật (mặc định: 'Danh mục nổi bật')
  featuredCategoriesAutoSlide?: boolean; // Tự động trượt danh mục nổi bật (mặc định: true)
  featuredCategoriesSlideInterval?: number; // Thời gian tự trượt (giây, mặc định: 20)
  // Google Search Console & Google Analytics
  googleSiteVerification?: string; // Mã xác minh Google Search Console (Meta content hoặc thẻ meta)
  googleAnalyticsId?: string; // Mã đo lường Google Analytics GA4 ID (G-XXXXXXXXXX)
  googleTagManagerId?: string; // Mã Google Tag Manager GTM (GTM-XXXXXXX)
}

// ---------------- ELEMENTOR ADVERTISING LANDING PAGE TYPES ----------------
export type LandingBlockType = 
  | 'hero' 
  | 'countdown' 
  | 'features' 
  | 'products' 
  | 'pricing' 
  | 'video' 
  | 'gallery' 
  | 'testimonials' 
  | 'lead_form' 
  | 'faq' 
  | 'cta_banner';

export interface LandingPageBlock {
  id: string;
  type: LandingBlockType;
  title?: string;
  subtitle?: string;
  content?: string;
  badge?: string;
  buttonText?: string;
  buttonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  imageUrl?: string;
  videoUrl?: string;
  bgColor?: string;
  textColor?: string;
  items?: any[];
  productIds?: string[];
  countdownHours?: number;
  countdownDate?: string;
  formFields?: { name: string; label: string; placeholder: string; required?: boolean }[];
  isVisible?: boolean;
}

export interface ElementorLandingPage {
  id: string;
  slug: string; // VD: 'khuyen-mai-pos', 'cham-cong-gia-soc'
  title: string;
  metaDescription?: string;
  themeColor?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  viewsCount: number;
  leadsCount: number;
  blocks: LandingPageBlock[];
}

export interface ComboBundleItem {
  productId?: string;
  name: string;
  categoryLabel?: string;
  price: number;
  originalPrice?: number;
  image?: string;
  specsSummary?: string;
}

export interface ComboBundle {
  id: string;
  title: string; // VD: 'Bộ Trọn Gói Quán Cafe - Trà Sữa'
  tagline: string; // VD: 'Tiết kiệm 15% - Cắm điện là bán'
  badge: string; // VD: 'BÁN CHẠY NHẤT', 'HOT COMBO', 'TIẾT KIỆM 15%'
  badgeColor?: string;
  targetAudience: string; // VD: 'Quán cafe, trà sữa, quán ăn, trà chanh'
  description: string;
  items: ComboBundleItem[];
  bundlePrice: number; // Giá sau ưu đãi
  originalPrice: number; // Tổng giá gốc cộng lại
  discountPercent: number; // % Tiết kiệm
  savingAmount: number; // Số tiền tiết kiệm được
  bonusGifts?: string[]; // Quà tặng kèm
  popular?: boolean;
  warrantyMonths?: number;
  bannerImage?: string; // Ảnh banner thiết kế cho gói combo
  isVisible?: boolean; // Trạng thái hiển thị (mặc định true)
  order?: number; // Thứ tự hiển thị
  linkUrl?: string; // Link tùy chỉnh khi click banner (mặc định mở popup chi tiết combo)
}

export interface ComboShowcaseConfig {
  showcaseVisible?: boolean;
  badge?: string;
  title?: string;
  highlightText?: string;
  description?: string;
  discountCallout?: string;
  warrantyCallout?: string;
  deliveryCallout?: string;
  consultButtonText?: string;
  buyButtonPrefix?: string;
}

export const DEFAULT_COMBO_SHOWCASE_CONFIG: ComboShowcaseConfig = {
  showcaseVisible: true,
  badge: 'COMBO TRỌN BỘ • GIẢI PHÁP TIẾT KIỆM (BUNDLE & SAVE)',
  title: 'MUA TRỌN BỘ THIẾT BỊ BÁN HÀNG — TIẾT KIỆM ĐẾN 20%',
  highlightText: 'TIẾT KIỆM ĐẾN 20%',
  description: 'Dành riêng cho quán cafe, nhà hàng, siêu thị mini, shop thời trang & kho TMĐT. Trọn gói đồng bộ gồm Máy POS + Máy In Hóa Đơn + Ngăn Kéo Thu Ngân + Máy Quét Mã Vạch. Cắm điện là bán ngay, không mất công chọn lẻ từng món!',
  discountCallout: 'Giảm thêm 1.5 - 3 Triệu / Bộ',
  warrantyCallout: 'Bảo hành chính hãng 12 Tháng tận nơi',
  deliveryCallout: 'Giao hàng & Lắp đặt trong 2 Giờ tại nội thành',
  consultButtonText: 'Tư Vấn Tùy Biến Thêm/Bớt',
  buyButtonPrefix: 'Đặt Mua Trọn Gói'
};
