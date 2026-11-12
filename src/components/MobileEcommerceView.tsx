import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZaloIcon } from './ZaloIcon';
import { sanitizeUrl } from '../utils/security';
import {
  Search,
  Mic,
  ShoppingBag,
  Sparkles,
  Zap,
  ChevronRight,
  ChevronLeft,
  Star,
  Home,
  LayoutGrid,
  Bell,
  User,
  Fingerprint,
  Printer,
  Scan,
  Barcode,
  ShoppingBag as PosIcon,
  Calculator,
  FileText,
  ShieldCheck,
  Wrench,
  Truck,
  Tag,
  CreditCard,
  Flame,
  Percent,
  CheckCircle,
  X,
  PhoneCall,
  Phone,
  Mail,
  MessageSquare,
  Facebook,
  ExternalLink,
  Gift,
  Package,
  Clock,
  ArrowRight,
  ClipboardList,
  MapPin,
  ArrowLeft,
  Trash2,
  Eye
} from 'lucide-react';
import { Product, MainCategory, SubCategory, FeedPromoBanner, DEFAULT_FEED_BANNERS } from '../types';
import { LazyImage } from './LazyImage';
import { FeaturedCategoriesSection } from './FeaturedCategoriesSection';

interface MobileEcommerceViewProps {
  products: Product[];
  mainCategories?: MainCategory[];
  subCategories?: SubCategory[];
  activeTab: string;
  setActiveTab: (tab: any) => void;
  selectedProduct?: Product | null;
  setSelectedProduct?: (p: Product | null) => void;
  renderDedicatedProductPage?: (p: Product) => React.ReactNode;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  catalogCategory: string;
  setCatalogCategory: (cat: string) => void;
  handleViewProductDetails: (p: Product) => void;
  handleQuickAddToCart: (p: Product, e: React.MouseEvent) => void;
  totalQuantity: number;
  promoCountdown: { hours: number; minutes: number; seconds: number };
  startSpeechRecognition: () => void;
  isListening: boolean;
  webConfig: any;
  quoteItems?: any[];
  slides: any[];
  currentSlide: number;
  setCurrentSlide: (idx: number) => void;
  handleGoToHomeAndReset: () => void;
  handleUpdateQuantity?: (productId: string, delta: number, priceOptionLabel?: string) => void;
  handleRemoveFromQuote?: (productId: string, priceOptionLabel?: string) => void;
  viewedProductIds?: string[];
  handleClearViewedProducts?: () => void;
}

const FeedPromoBannerCard: React.FC<{
  banners: FeedPromoBanner[];
  setActiveTab: (tab: any) => void;
}> = ({ banners, setActiveTab }) => {
  const visibleBanners = useMemo(() => {
    const filtered = (banners || []).filter(b => b.isVisible !== false);
    return filtered.length > 0 ? filtered : DEFAULT_FEED_BANNERS;
  }, [banners]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (visibleBanners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % visibleBanners.length);
    }, 8000); // Auto slide every 8 seconds
    return () => clearInterval(timer);
  }, [visibleBanners.length]);

  const banner = visibleBanners[currentIndex % visibleBanners.length] || visibleBanners[0];

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const action = banner.buttonAction || 'advisor';
    if (action === 'catalog') {
      setActiveTab('catalog');
    } else if (action === 'troubleshoot') {
      setActiveTab('troubleshoot');
    } else {
      setActiveTab('advisor');
    }
  };

  return (
    <div className={`bg-gradient-to-br ${banner.gradientBg || 'from-slate-900 via-indigo-950 to-slate-900'} text-white rounded-2xl p-3 flex flex-col justify-between shadow-sm border border-slate-800 relative overflow-hidden group min-h-[160px]`}>
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />

      {/* Slide Indicators if more than 1 banner */}
      {visibleBanners.length > 1 && (
        <div className="absolute top-2 right-2 flex items-center gap-1 z-20">
          {visibleBanners.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-1 rounded-full transition-all cursor-pointer ${
                idx === (currentIndex % visibleBanners.length)
                  ? 'w-3 bg-amber-400'
                  : 'w-1.5 bg-slate-600 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={banner.id || currentIndex}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.25 }}
          className="space-y-1.5 z-10 flex-1 flex flex-col justify-between"
        >
          <div className="space-y-1">
            <span className={`px-1.5 py-0.5 font-black text-[8px] uppercase tracking-wider rounded inline-block ${banner.badgeColor || 'bg-yellow-400 text-slate-950'}`}>
              {banner.badge || 'BÁN CHẠY NHẤT'}
            </span>
            <h4 className={`text-xs font-black uppercase leading-snug ${banner.titleColor || 'text-amber-300'}`}>
              {banner.title}
            </h4>
            <p className="text-[10px] text-slate-300 leading-relaxed font-medium line-clamp-3">
              {banner.description}
            </p>
          </div>

          <button
            type="button"
            onClick={handleButtonClick}
            className="mt-3 w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-[10px] uppercase py-1.5 rounded-xl shadow-xs text-center cursor-pointer active:scale-95 transition-transform"
          >
            {banner.buttonText || 'TƯ VẤN BÁO GIÁ'}
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export const MobileEcommerceView: React.FC<MobileEcommerceViewProps> = ({
  products,
  mainCategories = [],
  subCategories = [],
  activeTab,
  setActiveTab,
  selectedProduct,
  setSelectedProduct,
  renderDedicatedProductPage,
  searchQuery,
  setSearchQuery,
  catalogCategory,
  setCatalogCategory,
  handleViewProductDetails,
  handleQuickAddToCart,
  totalQuantity,
  promoCountdown,
  startSpeechRecognition,
  isListening,
  webConfig,
  quoteItems = [],
  slides,
  currentSlide,
  setCurrentSlide,
  handleGoToHomeAndReset,
  handleUpdateQuantity,
  handleRemoveFromQuote,
  viewedProductIds = [],
  handleClearViewedProducts
}) => {
  const [selectedBrandFilter, setSelectedBrandFilter] = useState<string>('all');
  const [selectedSubCat, setSelectedSubCat] = useState<string>('all');
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // Danh sách sản phẩm đã xem trên mobile
  const viewedProducts = useMemo(() => {
    if (!viewedProductIds || viewedProductIds.length === 0) return [];
    return viewedProductIds
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is Product => !!p);
  }, [viewedProductIds, products]);

  // Cart Local Selection State
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState<string>('1/7A đường số 4, Phường Thủ Đức, TP. Hồ Chí Minh');
  const [isEditingCart, setIsEditingCart] = useState(false);

  // Orders State
  const [orderStatusTab, setOrderStatusTab] = useState<'all' | 'pending' | 'processing' | 'delivered' | 'cancelled'>('all');
  const [orderSearchQuery, setOrderSearchQuery] = useState<string>('');


  // Banner Swipe Gesture Tracking
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const handleBannerTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleBannerTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleBannerTouchEnd = () => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const distance = touchStartXRef.current - touchEndXRef.current;
      const minSwipeDistance = 30;
      if (slides && slides.length > 0) {
        if (distance > minSwipeDistance) {
          // Swiped left -> Next slide
          setCurrentSlide((currentSlide + 1) % slides.length);
        } else if (distance < -minSwipeDistance) {
          // Swiped right -> Previous slide
          setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
        }
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const handleBannerMouseDown = (e: React.MouseEvent) => {
    touchStartXRef.current = e.clientX;
    touchEndXRef.current = e.clientX;
  };

  const handleBannerMouseMove = (e: React.MouseEvent) => {
    if (touchStartXRef.current !== null) {
      touchEndXRef.current = e.clientX;
    }
  };

  const handleBannerMouseUp = () => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const distance = touchStartXRef.current - touchEndXRef.current;
      const minSwipeDistance = 30;
      if (slides && slides.length > 0) {
        if (distance > minSwipeDistance) {
          setCurrentSlide((currentSlide + 1) % slides.length);
        } else if (distance < -minSwipeDistance) {
          setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
        }
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Format currency helper
  const formatVND = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Helper to dynamically select category icon
  const getCategoryIcon = (id: string, name: string = '') => {
    const normId = (id || '').toLowerCase();
    const normName = (name || '').toLowerCase();
    if (normId.includes('attendance') || normName.includes('chấm công')) return <Fingerprint className="w-5 h-5 text-blue-600" />;
    if (normId.includes('printer') || normName.includes('in hóa đơn') || normName.includes('in bill')) return <Printer className="w-5 h-5 text-emerald-600" />;
    if (normId.includes('scanner') || normName.includes('quét') || normName.includes('mã vạch')) return <Scan className="w-5 h-5 text-purple-600" />;
    if (normId.includes('label') || normName.includes('tem nhãn') || normName.includes('decal')) return <Barcode className="w-5 h-5 text-teal-600" />;
    if (normId.includes('pos') || normName.includes('bán hàng')) return <PosIcon className="w-5 h-5 text-amber-600" />;
    if (normId.includes('drawer') || normName.includes('hộp') || normName.includes('két')) return <Calculator className="w-5 h-5 text-orange-600" />;
    if (normId.includes('consumable') || normName.includes('giấy') || normName.includes('vật tư')) return <FileText className="w-5 h-5 text-pink-600" />;
    return <LayoutGrid className="w-5 h-5 text-indigo-600" />;
  };

  // Active Categories derived from props or default
  const defaultMainCategories: MainCategory[] = [
    { id: 'attendance', name: 'Máy Chấm Công' },
    { id: 'printer', name: 'Máy In Hóa Đơn, Máy In Bill' },
    { id: 'scanner', name: 'Máy Quét Mã Vạch, Scanner Barcode' },
    { id: 'label', name: 'Máy in mã vạch | In tem nhãn' },
    { id: 'consumable', name: 'Giấy In Bill - Giấy In Decal Dán' },
    { id: 'drawer', name: 'Hộp Đựng Tiền Cash' },
    { id: 'pos', name: 'Máy bán hàng cảm ứng POS' }
  ];

  const rawMainCategories = (mainCategories && mainCategories.length > 0) ? mainCategories : defaultMainCategories;
  const activeMainCategories = rawMainCategories
    .filter((c) => c.isVisible !== false)
    .sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99));
  const activeSubCategories = subCategories || [];

  // Main Categories for Catalog Sidebar
  const mainSidebarCategories = [
    ...activeMainCategories.map((c) => ({
      id: c.id,
      name: c.name,
      icon: getCategoryIcon(c.id, c.name)
    })),
    { id: 'all', name: 'Tất Cả Sản Phẩm', icon: <LayoutGrid className="w-5 h-5 text-indigo-600" /> }
  ];

  // Fallback static subcategories for catalog content view
  const subcategoryData: Record<string, { id: string; name: string; icon: React.ReactNode }[]> = {
    attendance: [
      { id: 'vantay', name: 'Vân Tay', icon: <Fingerprint className="w-5 h-5 text-blue-600" /> },
      { id: 'khuonmat', name: 'Khuôn Mặt AI', icon: <User className="w-5 h-5 text-purple-600" /> },
      { id: 'thecamung', name: 'Thẻ Cảm Ứng', icon: <CreditCard className="w-5 h-5 text-emerald-600" /> },
      { id: 'ronaldjack', name: 'Ronald Jack', icon: <Sparkles className="w-5 h-5 text-amber-600" /> },
      { id: 'zkteco', name: 'ZKTeco', icon: <ShieldCheck className="w-5 h-5 text-sky-600" /> },
      { id: 'kiemsoatcua', name: 'Kiểm Soát Cửa', icon: <Wrench className="w-5 h-5 text-rose-600" /> },
    ],
    printer: [
      { id: 'k80', name: 'In Nhiệt K80', icon: <Printer className="w-5 h-5 text-emerald-600" /> },
      { id: 'k57', name: 'In Bill K57', icon: <FileText className="w-5 h-5 text-blue-600" /> },
      { id: 'bluetooth', name: 'Bluetooth/Wifi', icon: <Zap className="w-5 h-5 text-amber-600" /> },
      { id: 'xprinter', name: 'Xprinter', icon: <Tag className="w-5 h-5 text-purple-600" /> },
      { id: 'sunmi', name: 'Sunmi POS', icon: <PosIcon className="w-5 h-5 text-rose-600" /> },
      { id: 'inbep', name: 'In Bếp & Bar', icon: <Flame className="w-5 h-5 text-red-600" /> },
    ],
    scanner: [
      { id: '1d', name: 'Quét 1D Mã Vạch', icon: <Barcode className="w-5 h-5 text-purple-600" /> },
      { id: '2d', name: 'Quét 2D / QR', icon: <Scan className="w-5 h-5 text-blue-600" /> },
      { id: 'khongday', name: 'Không Dây BT', icon: <Zap className="w-5 h-5 text-amber-600" /> },
      { id: 'datia', name: 'Đầu Đọc Đa Tia', icon: <Sparkles className="w-5 h-5 text-emerald-600" /> },
      { id: 'antech', name: 'Antech', icon: <Tag className="w-5 h-5 text-sky-600" /> },
      { id: 'zebra', name: 'Zebra/Honeywell', icon: <ShieldCheck className="w-5 h-5 text-indigo-600" /> },
    ],
    label: [
      { id: 'temmavach', name: 'In Tem Mã Vạch', icon: <Barcode className="w-5 h-5 text-teal-600" /> },
      { id: 'temtrasua', name: 'In Tem Trà Sữa', icon: <Tag className="w-5 h-5 text-pink-600" /> },
      { id: 'decal', name: 'Cuộn Decal Tem', icon: <FileText className="w-5 h-5 text-amber-600" /> },
      { id: 'ribbon', name: 'Mực In Ribbon', icon: <Printer className="w-5 h-5 text-slate-600" /> },
    ],
    pos: [
      { id: 'poscamung', name: 'POS Cảm Ứng', icon: <PosIcon className="w-5 h-5 text-amber-600" /> },
      { id: 'mankep', name: 'Màn Hình Kẹp', icon: <LayoutGrid className="w-5 h-5 text-blue-600" /> },
      { id: 'phanmem', name: 'Phần Mềm POS', icon: <Sparkles className="w-5 h-5 text-purple-600" /> },
      { id: 'tronbo', name: 'Trọn Bộ POS', icon: <ShoppingBag className="w-5 h-5 text-emerald-600" /> },
    ],
    drawer: [
      { id: 'ket4', name: 'Két Tiền 4 Ngăn', icon: <Calculator className="w-5 h-5 text-orange-600" /> },
      { id: 'ket5', name: 'Két Tiền 5 Ngăn', icon: <Calculator className="w-5 h-5 text-amber-600" /> },
      { id: 'ketauto', name: 'Két Mở Tự Động', icon: <Zap className="w-5 h-5 text-blue-600" /> },
    ],
    consumable: [
      { id: 'giayk80', name: 'Giấy Thermal K80', icon: <FileText className="w-5 h-5 text-pink-600" /> },
      { id: 'giayk57', name: 'Giấy In K57', icon: <FileText className="w-5 h-5 text-blue-600" /> },
      { id: 'decal3', name: 'Decal 3 Tem Dán', icon: <Tag className="w-5 h-5 text-amber-600" /> },
      { id: 'mucribbon', name: 'Mực In Mã Vạch', icon: <Printer className="w-5 h-5 text-purple-600" /> },
    ],
    all: [
      { id: 'banchay', name: 'Bán Chạy Nhất', icon: <Flame className="w-5 h-5 text-red-600" /> },
      { id: 'flashsale', name: 'Giảm Giá Sốc', icon: <Zap className="w-5 h-5 text-yellow-600" /> },
      { id: 'moi', name: 'Hàng Mới Về', icon: <Sparkles className="w-5 h-5 text-blue-600" /> },
    ]
  };

  const currentCategory = catalogCategory || activeMainCategories[0]?.id || 'attendance';

  // Subcategories array for active category
  const dynamicSubList = activeSubCategories.filter(s => s.mainCategoryId === currentCategory);
  const displaySubcategories = dynamicSubList.length > 0
    ? dynamicSubList.map(s => ({ id: s.id, name: s.name, icon: getCategoryIcon(s.id, s.name) }))
    : (subcategoryData[currentCategory] || subcategoryData['attendance'] || []);

  // Products filtered for the Catalog tab view
  const categoryProducts = products.filter((p) => {
    const matchesCategory = currentCategory === 'all' || p.category === currentCategory;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSub =
      selectedSubCat === 'all' ||
      p.subCategoryId === selectedSubCat ||
      p.name.toLowerCase().includes(selectedSubCat.toLowerCase()) ||
      p.brand?.toLowerCase().includes(selectedSubCat.toLowerCase()) ||
      p.description?.toLowerCase().includes(selectedSubCat.toLowerCase()) ||
      (p.features && p.features.some((f) => f.toLowerCase().includes(selectedSubCat.toLowerCase())));

    return matchesCategory && matchesSearch && matchesSub;
  });

  // Dynamic ecosystem pills matching main categories
  const ecosystemPills = Array.from(
    [
      { id: 'all', label: 'Tất cả' },
      ...activeMainCategories.map((c) => ({
        id: c.id,
        label: c.name.split(',')[0].split('|')[0].trim()
      }))
    ]
      .reduce((acc, item) => {
        if (!acc.has(item.id)) acc.set(item.id, item);
        return acc;
      }, new Map<string, { id: string; label: string }>())
      .values()
  );

  // Mobile 10 Category Grid items generated from activeMainCategories
  const bgColors = ['bg-blue-50', 'bg-emerald-50', 'bg-purple-50', 'bg-amber-50', 'bg-orange-50', 'bg-pink-50', 'bg-teal-50', 'bg-indigo-50', 'bg-rose-50', 'bg-sky-50'];


  // Quick Action Utilities Strip (Image 1)
  const utilityItems = [
    { label: 'Săn voucher', subLabel: 'Giảm đến 500k', icon: <Tag className="w-4 h-4 text-amber-500" /> },
    { label: 'MWG PayLater', subLabel: 'Trả góp 0%', icon: <CreditCard className="w-4 h-4 text-blue-500" /> },
    { label: 'Deal hời', subLabel: 'Giảm cực sâu', icon: <Flame className="w-4 h-4 text-red-500" /> },
    { label: 'Xu hướng', subLabel: 'Sản phẩm hot', icon: <Percent className="w-4 h-4 text-purple-500" /> },
    { label: 'Flash sale', subLabel: 'Mỗi ngày', icon: <Zap className="w-4 h-4 text-yellow-500" /> }
  ];

  // Filter products for feed
  const flashSaleProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 8);
  const feedProducts = products.filter(p => {
    if (selectedBrandFilter === 'all') return true;
    return p.brand?.toLowerCase().includes(selectedBrandFilter.toLowerCase()) ||
           p.name?.toLowerCase().includes(selectedBrandFilter.toLowerCase());
  });

  const getThemeColors = () => {
    const color = webConfig?.primaryColor || 'red';
    const colors: Record<string, any> = {
      blue: { headerBg: 'bg-blue-600' },
      red: { headerBg: 'bg-[#CD1818]' },
      indigo: { headerBg: 'bg-indigo-600' },
      teal: { headerBg: 'bg-teal-700' },
      emerald: { headerBg: 'bg-emerald-700' },
      orange: { headerBg: 'bg-orange-600' },
      purple: { headerBg: 'bg-purple-700' }
    };
    return colors[color] || colors.red;
  };
  const themeColors = getThemeColors();

  return (
    <div className="md:hidden flex flex-col min-h-screen bg-slate-100 pb-24 text-left font-sans">
      
      {/* 1. TOP MOBILE HEADER BAR (DYNAMIC COLOR WITH SEARCH & CART) */}
      <header className={`${themeColors.headerBg} text-white sticky top-0 z-40 shadow-md`}>
        <div className="p-2.5 pb-2 space-y-2">
          
          {/* Top row: Brand & Search Bar & Cart */}
          <div className="flex items-center justify-between gap-2">
            
            {/* Logo Icon Badge (Solution Bảo Technology) */}
            <button
              type="button"
              onClick={handleGoToHomeAndReset}
              className="flex items-center gap-1.5 shrink-0 px-2 py-1 bg-yellow-400 text-slate-950 rounded-lg font-black text-xs shadow-md active:scale-95 transition-all border border-yellow-300 tracking-tight whitespace-nowrap max-w-[130px] overflow-hidden"
              title={webConfig?.logoText || "Trang chủ Solution Bảo Technology"}
            >
              {webConfig?.logoImageUrl ? (
                <img src={webConfig.logoImageUrl} alt="Logo" className="h-4.5 w-auto object-contain shrink-0 rounded" />
              ) : null}
              <span className="truncate">{webConfig?.logoText || 'SOLUTION BẢO'}</span>
            </button>

            {/* Rounded Pill Search Bar */}
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Bạn tìm gì hôm nay? (Máy in, POS...)"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'catalog') setActiveTab('catalog');
                }}
                className="w-full bg-white text-slate-800 text-xs py-2 pl-8 pr-7 rounded-full focus:outline-none shadow-inner font-medium placeholder-slate-400"
              />
              <button
                type="button"
                onClick={startSpeechRecognition}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full transition-all ${
                  isListening ? 'bg-red-600 text-white animate-pulse' : 'text-slate-400 hover:text-red-600'
                }`}
                title="Tìm kiếm bằng giọng nói"
              >
                <Mic className="w-3 h-3" />
              </button>
            </div>

            {/* Shopping Bag Cart Button */}
            <button
              type="button"
              onClick={() => setActiveTab('quote')}
              className="relative p-2 bg-white/15 hover:bg-white/25 rounded-full border border-white/20 text-white shrink-0 active:scale-95 transition-all"
              title="Giỏ hàng"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-slate-950 font-black text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-red-600 shadow-xs">
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>

          {/* Quick Pill Categories Filter bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px] font-medium text-white/90">
            {ecosystemPills.map((pill) => (
              <button
                key={pill.id}
                type="button"
                onClick={() => {
                  if (pill.id === 'all') {
                    setSearchQuery('');
                  } else {
                    setSearchQuery(pill.label);
                  }
                  if (activeTab !== 'catalog') setActiveTab('catalog');
                }}
                className={`px-3 py-1 rounded-full whitespace-nowrap transition-all border shrink-0 ${
                  searchQuery.toLowerCase() === pill.label.toLowerCase() || (pill.id === 'all' && !searchQuery)
                    ? 'bg-yellow-400 text-slate-950 border-yellow-400 shadow-sm font-black'
                    : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* DEDICATED PRODUCT DETAILS PAGE OR TAB VIEWS WITH PAGE TRANSITION */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedProduct ? `product-${selectedProduct.id}` : `tab-${activeTab}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex-1"
        >
          {selectedProduct && renderDedicatedProductPage ? (
            <div className="p-2 sm:p-4">
              {renderDedicatedProductPage(selectedProduct)}
            </div>
          ) : (
            <>
              {/* 2. MOBILE HOME PAGE CONTENT FEED */}
              {activeTab === 'home' && (
        <div className="space-y-3 pt-2">

          {/* B. Main Promo Banner Carousel */}
          {slides && slides.length > 0 && (
            <section 
              onTouchStart={handleBannerTouchStart}
              onTouchMove={handleBannerTouchMove}
              onTouchEnd={handleBannerTouchEnd}
              onMouseDown={handleBannerMouseDown}
              onMouseMove={handleBannerMouseMove}
              onMouseUp={handleBannerMouseUp}
              onMouseLeave={handleBannerMouseUp}
              className="mx-2.5 rounded-2xl overflow-hidden shadow-sm relative border border-slate-200/80 bg-slate-900 min-h-[150px] select-none cursor-grab active:cursor-grabbing touch-pan-y group"
            >
              <div className={`absolute inset-0 ${slides[currentSlide]?.imageBg} transition-all duration-700`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

              <div className="relative z-10 p-4 space-y-1.5 text-white flex flex-col justify-end min-h-[150px] pointer-events-none">
                <span className="px-2 py-0.5 bg-amber-500 text-slate-950 text-[9px] font-black uppercase tracking-wider rounded w-fit">
                  KHUYẾN MÃI HOT
                </span>
                <h3 className="text-base font-black uppercase line-clamp-1 drop-shadow-sm">
                  {slides[currentSlide]?.title}
                </h3>
                <p className="text-slate-200 text-xs line-clamp-1 font-medium">
                  {slides[currentSlide]?.subtitle}
                </p>

                {/* Dots indicator */}
                <div className="flex gap-1.5 pt-1 pointer-events-auto">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentSlide(idx);
                      }}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        currentSlide === idx ? 'bg-amber-400 w-5' : 'bg-white/40 w-1.5'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* C. Utility Badges Strip (Matching Image 1) */}
          <section className="flex items-center gap-2 overflow-x-auto scrollbar-none px-2.5 py-1">
            {utilityItems.map((u, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setActiveTab('catalog');
                  setCatalogCategory('all');
                }}
                className="flex items-center gap-2 bg-white border border-slate-200/80 rounded-xl p-2 shrink-0 shadow-xs active:scale-95 transition-transform"
              >
                <div className="p-1.5 bg-slate-50 rounded-lg shrink-0">
                  {u.icon}
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-black text-slate-800 leading-tight whitespace-nowrap">
                    {u.label}
                  </div>
                  <div className="text-[9px] font-bold text-slate-400 whitespace-nowrap">
                    {u.subLabel}
                  </div>
                </div>
              </button>
            ))}
          </section>

          {/* C2. DANH MỤC SẢN PHẨM NỔI BẬT DƯỚI BANNER (MOBILE MATCHES SCREENSHOT) */}
          {webConfig?.showFeaturedCategories !== false && (
            <div className="px-2.5">
              <FeaturedCategoriesSection
                categories={rawMainCategories}
                products={products}
                title={webConfig?.featuredCategoriesTitle || 'Danh mục nổi bật'}
                isCompact={true}
                autoSlide={false}
                slideIntervalSeconds={webConfig?.featuredCategoriesSlideInterval || 20}
                onSelectCategory={(catId) => {
                  setActiveTab('catalog');
                  setCatalogCategory(catId);
                }}
              />
            </div>
          )}

          {/* C3. SẢN PHẨM ĐÃ XEM (DÀNH CHO KHÁCH HÀNG VỪA XEM RỒI THOÁT RA XEM SẢN PHẨM KHÁC) */}
          {viewedProducts.length > 0 && (
            <section className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-2xs mx-2.5 space-y-2.5 text-left">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-blue-50 flex items-center justify-center text-blue-600">
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-black uppercase text-slate-900 tracking-tight flex items-center gap-1.5">
                    <span>Sản phẩm đã xem</span>
                    <span className="px-1.5 py-0.2 bg-blue-100 text-blue-800 text-[9px] font-mono rounded-full">
                      {viewedProducts.length}
                    </span>
                  </span>
                </div>
                {handleClearViewedProducts && (
                  <button
                    type="button"
                    onClick={handleClearViewedProducts}
                    className="text-[10px] text-slate-400 hover:text-red-500 font-bold uppercase transition-colors"
                  >
                    Xóa lịch sử
                  </button>
                )}
              </div>

              <div className="flex gap-2.5 overflow-x-auto scrollbar-none pb-1">
                {viewedProducts.map((p) => {
                  const hasDisc = p.originalPrice > p.price;
                  return (
                    <div
                      key={p.id}
                      onClick={() => handleViewProductDetails(p)}
                      className="w-28 shrink-0 bg-slate-50/70 hover:bg-blue-50/30 rounded-xl p-2 border border-slate-200/80 flex flex-col justify-between active:scale-95 transition-all cursor-pointer relative"
                    >
                      <div>
                        <div className="w-full h-20 bg-white rounded-lg overflow-hidden p-1 flex items-center justify-center relative mb-1 border border-slate-100">
                          <span className="absolute top-0.5 left-0.5 bg-slate-800 text-white font-extrabold text-[6.5px] uppercase px-1 py-0.2 rounded shadow-2xs flex items-center gap-0.5">
                            <Eye className="w-2 h-2 text-blue-400" />
                            <span>Đã xem</span>
                          </span>
                          {p.image ? (
                            <LazyImage src={p.image} alt={p.name} className="w-full h-full object-contain" />
                          ) : (
                            <PosIcon className="w-5 h-5 text-slate-300" />
                          )}
                        </div>
                        <div className="text-[9.5px] font-bold text-slate-800 line-clamp-1 leading-tight">
                          {p.name}
                        </div>
                      </div>
                      <div className="mt-1">
                        <div className="text-[11px] font-black text-red-600 leading-tight font-mono">
                          {formatVND(p.price)}
                        </div>
                        {hasDisc && (
                          <div className="text-[8px] text-slate-400 line-through font-mono leading-none">
                            {formatVND(p.originalPrice)}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* D. FLASH SALE Section (Red Box with Live Countdown & Product Row - Image 1) */}
          <section className="bg-gradient-to-r from-red-600 via-rose-600 to-red-600 rounded-2xl p-3 text-white shadow-md mx-2.5 relative overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-white/20 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-base font-black italic tracking-tight text-yellow-300 flex items-center gap-1">
                  <Zap className="w-4 h-4 fill-yellow-300 text-yellow-300 animate-bounce" />
                  FLASH Sale
                </span>
                {/* Live Countdown Timer Pill */}
                <div className="flex items-center gap-1 bg-white text-red-600 px-2 py-0.5 rounded-lg shadow-xs text-[10px] font-mono font-black tracking-wider">
                  <span>{String(promoCountdown.hours).padStart(2, '0')}</span>
                  <span>:</span>
                  <span>{String(promoCountdown.minutes).padStart(2, '0')}</span>
                  <span>:</span>
                  <span>{String(promoCountdown.seconds).padStart(2, '0')}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('catalog');
                  setCatalogCategory('all');
                }}
                className="text-[10px] font-extrabold text-white/90 hover:text-yellow-300 flex items-center gap-0.5"
              >
                Xem tất cả <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Horizontal Scroll Product Cards */}
            <div className="flex gap-2.5 overflow-x-auto scrollbar-none pb-1">
              {flashSaleProducts.map((p) => {
                const discount = p.originalPrice
                  ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
                  : 0;

                return (
                  <div
                    key={p.id}
                    onClick={() => handleViewProductDetails(p)}
                    className="bg-white text-slate-800 rounded-xl p-2 w-28 shrink-0 border border-red-100 flex flex-col justify-between shadow-xs active:scale-95 transition-all cursor-pointer group"
                  >
                    <div>
                      {/* Product Image */}
                      <div className="w-full h-20 bg-slate-50 rounded-lg overflow-hidden p-1 flex items-center justify-center relative mb-1.5">
                        {p.image ? (
                          <LazyImage src={p.image} alt={p.name} className="w-full h-full object-contain" />
                        ) : (
                          <PosIcon className="w-6 h-6 text-slate-300" />
                        )}
                        {viewedProductIds?.includes(p.id) && (
                          <span className="absolute top-0.5 left-0.5 bg-slate-900/95 text-white font-extrabold text-[6.5px] uppercase px-1 py-0.2 rounded shadow-2xs flex items-center gap-0.5 z-10 border border-slate-700">
                            <Eye className="w-2 h-2 text-blue-400" />
                            <span>Đã xem</span>
                          </span>
                        )}
                        {discount > 0 && (
                          <span className="absolute top-0.5 right-0.5 bg-red-600 text-white font-black text-[8px] px-1 py-0.2 rounded-md">
                            -{discount}%
                          </span>
                        )}
                      </div>

                      {/* Product Title */}
                      <div className="text-[10px] font-bold text-slate-800 line-clamp-1 leading-tight group-hover:text-blue-600">
                        {p.name}
                      </div>
                    </div>

                    {/* Price & Buy Button */}
                    <div className="mt-1 space-y-1">
                      <div className="text-xs font-black text-red-600 leading-tight">
                        {formatVND(p.price)}
                      </div>
                      {p.originalPrice && (
                        <div className="text-[9px] text-slate-400 line-through leading-tight">
                          {formatVND(p.originalPrice)}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuickAddToCart(p, e);
                        }}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-black text-[9.5px] uppercase py-1 rounded-md text-center shadow-xs active:scale-95 transition-all"
                      >
                        Mua ngay
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* E. "DÀNH CHO BẠN" TAB FEED (2-COLUMN GRID MATCHING IMAGE 1 & 2) */}
          <section className="px-2.5 pt-2 space-y-3">
            
            {/* Tab Header & Brand Chips */}
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-slate-900 border-b-2 border-blue-600 pb-2 -mb-2">
                    👍 Dành cho bạn
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('catalog');
                    setCatalogCategory('all');
                  }}
                  className="text-[11px] font-extrabold text-blue-600 hover:underline flex items-center gap-0.5"
                >
                  Xem thêm <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Brand chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                {ecosystemPills.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelectedBrandFilter(b.id)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold whitespace-nowrap transition-all border shrink-0 ${
                      selectedBrandFilter === b.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2-Column Feed Product Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              
              {/* Mixed Vertical Banner Card in Feed */}
              <FeedPromoBannerCard
                banners={webConfig?.feedBanners || DEFAULT_FEED_BANNERS}
                setActiveTab={setActiveTab}
              />

              {/* Feed Products */}
              {feedProducts.map((p) => {
                const discount = p.originalPrice
                  ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
                  : 0;

                return (
                  <div
                    key={p.id}
                    onClick={() => handleViewProductDetails(p)}
                    className="bg-white rounded-2xl border border-slate-200/80 p-2.5 flex flex-col justify-between shadow-xs active:scale-98 transition-all cursor-pointer group relative overflow-hidden"
                  >
                    <div>
                      {/* Product Image Frame */}
                      <div className="w-full h-28 bg-slate-50 rounded-xl overflow-hidden p-1.5 flex items-center justify-center relative mb-2">
                        {p.image ? (
                          <LazyImage src={p.image} alt={p.name} className="w-full h-full object-contain" />
                        ) : (
                          <PosIcon className="w-8 h-8 text-slate-300" />
                        )}

                        {/* Badges */}
                        <div className="absolute top-1 left-1 flex flex-col gap-1 z-10">
                          {viewedProductIds?.includes(p.id) && (
                            <span className="bg-slate-900/95 text-white font-extrabold text-[7px] uppercase px-1.5 py-0.5 rounded shadow-xs flex items-center gap-0.5 border border-slate-700">
                              <Eye className="w-2 h-2 text-blue-400" />
                              <span>ĐÃ XEM</span>
                            </span>
                          )}
                          {(p.isPopular || p.isFeatured) && (
                            <span className="bg-orange-500 text-white font-extrabold text-[7.5px] uppercase px-1.5 py-0.5 rounded shadow-xs">
                              Hot
                            </span>
                          )}
                        </div>

                        {discount > 0 && (
                          <span className="absolute top-1 right-1 bg-red-600 text-white font-black text-[8px] px-1.5 py-0.5 rounded shadow-xs">
                            -{discount}%
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <span className="text-[9px] font-black text-blue-600 uppercase tracking-wider block">
                        {p.brand}
                      </span>
                      <h4 className="text-[11px] font-bold text-slate-800 line-clamp-2 leading-snug mt-0.5 group-hover:text-blue-600">
                        {p.name}
                      </h4>
                    </div>

                    {/* Price, Rating & Action */}
                    <div className="mt-2 space-y-1.5">
                      <div className="flex items-baseline justify-between gap-1">
                        <span className="text-xs font-black text-red-600">
                          {formatVND(p.price)}
                        </span>
                      </div>

                      {p.originalPrice && (
                        <div className="text-[9.5px] text-slate-400 line-through leading-tight">
                          {formatVND(p.originalPrice)}
                        </div>
                      )}

                      {/* Rating star */}
                      <div className="flex items-center gap-1 text-[9px] text-slate-500">
                        <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-slate-700">4.8</span>
                        <span>(302)</span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuickAddToCart(p, e);
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[10px] uppercase py-1.5 rounded-xl text-center shadow-xs active:scale-95 transition-all mt-1"
                      >
                        Thêm báo giá
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* F. HÌNH ẢNH LẮP ĐẶT THỰC TẾ & ĐÁNH GIÁ KHÁCH HÀNG (MOBILE) */}
          <section className="bg-gradient-to-tr from-blue-50/80 via-slate-50/90 to-indigo-50/80 rounded-2xl p-3.5 mx-2.5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="text-center space-y-1">
              <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest bg-blue-100/60 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-blue-600" />
                <span>Khách Hàng & Dự Án Thực Tế</span>
              </span>
              <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">
                Hình Ảnh Lắp Đặt Thực Tế & Đánh Giá
              </h3>
              <p className="text-[10px] text-slate-500 font-sans">
                Đã có hơn 10,000+ doanh nghiệp, nhà hàng, quán cafe & kho vận tin dùng.
              </p>
            </div>

            {/* Installation Images Horizontal Scroll / Grid */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { title: "Khu Công Nghiệp", location: "KCN Tân Bình", img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80", tag: "300+ NS" },
                { title: "Máy POS Thu Ngân", location: "Cafe Q1", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80", tag: "Chuẩn F&B" },
                { title: "In Tem Mã Vạch", location: "Kho GHN", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80", tag: "5,000 Tem/Ngày" },
                { title: "Chấm Công AI Face", location: "LandMark 81", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80", tag: "AI Face ID" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-2xs">
                  <div className="h-24 overflow-hidden relative">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <span className="absolute top-1 left-1 bg-slate-900/80 text-yellow-300 text-[8px] font-black px-1.5 py-0.2 rounded uppercase">
                      {item.tag}
                    </span>
                  </div>
                  <div className="p-2">
                    <div className="text-[10px] font-black text-slate-800 line-clamp-1">{item.title}</div>
                    <div className="text-[9px] text-slate-500 font-medium flex items-center gap-0.5 mt-0.5">
                      <Truck className="w-2.5 h-2.5 text-blue-600" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial Cards Carousel / Stack */}
            <div className="space-y-2">
              {[
                {
                  name: "Chị Nguyễn Thị Lan Anh",
                  role: "Chủ Highlands Coffee Q3",
                  comment: "Trang bị 5 máy in hóa đơn Xprinter và 2 máy chấm công Ronald Jack. Thiết bị chạy rất ổn định, phần mềm xuất Excel nhanh, hỗ trợ cài từ xa rất tận tình.",
                  rating: 5,
                  tag: "F&B"
                },
                {
                  name: "Anh Trần Hoàng Long",
                  role: "Giám đốc Kho GHN",
                  comment: "Đầu đọc mã vạch Zebra & máy in tem A6 giúp đóng gói tăng 40% hiệu suất. Giao hàng cực nhanh, hóa đơn chứng từ đầy đủ.",
                  rating: 5,
                  tag: "Logistics"
                }
              ].map((story, idx) => (
                <div key={idx} className="bg-white/90 border border-slate-200/80 rounded-xl p-2.5 shadow-2xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[8.5px] font-extrabold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100">
                      {story.tag}
                    </span>
                    <div className="flex gap-0.5">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-600 italic leading-relaxed">
                    "{story.comment}"
                  </p>
                  <div className="pt-1 border-t border-slate-100 flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center font-black text-[9px] text-white shrink-0">
                      {story.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-800 leading-tight">{story.name}</div>
                      <div className="text-[8.5px] text-slate-400 font-medium">{story.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      )}

      {/* 2. MOBILE CATALOG TAB CONTENT (EXACT MATCH TO USER SCREENSHOT) */}
      {activeTab === 'catalog' && (
        <div className="flex-1 flex overflow-hidden bg-slate-100 min-h-[calc(100vh-120px)]">
          
          {/* LEFT SIDEBAR: Main Category Selector Column */}
          <aside className="w-28 sm:w-32 bg-slate-200/60 border-r border-slate-200/80 overflow-y-auto shrink-0 py-1 space-y-1 select-none">
            {mainSidebarCategories.map((cat) => {
              const isActive = (catalogCategory || 'attendance') === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setCatalogCategory(cat.id);
                    setSelectedSubCat('all');
                  }}
                  className={`w-full flex flex-col items-center text-center p-2.5 transition-all text-[10.5px] leading-tight relative cursor-pointer ${
                    isActive
                      ? 'bg-white text-blue-600 font-black shadow-2xs rounded-l-2xl'
                      : 'text-slate-600 hover:text-slate-900 font-bold hover:bg-slate-200/40'
                  }`}
                >
                  {/* Left accent active pill */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-blue-600 rounded-r-full shadow-xs" />
                  )}
                  <div className={`p-2 rounded-2xl mb-1 transition-transform ${
                    isActive ? 'bg-blue-50 text-blue-600 scale-105' : 'bg-slate-100/80 text-slate-500'
                  }`}>
                    {cat.icon}
                  </div>
                  <span className="line-clamp-2 px-0.5">{cat.name}</span>
                </button>
              );
            })}
          </aside>

          {/* RIGHT CONTENT PANEL: Subcategories Grid + "Có thể bạn thích" Products */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4 bg-white">
            
            {/* Category Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div>
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                  {activeMainCategories.find((c) => c.id === currentCategory)?.name || 'Danh mục sản phẩm'}
                </h2>
                <p className="text-[10px] text-slate-400 font-bold">
                  {categoryProducts.length} sản phẩm chính hãng sẵn kho
                </p>
              </div>
              <span className="text-[9.5px] font-extrabold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-100 shadow-2xs">
                Chính hãng
              </span>
            </div>

            {/* Subcategories 3-Column Grid */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-slate-800 uppercase tracking-wider">
                  Phân Loại Thiết Bị
                </span>
                {selectedSubCat !== 'all' && (
                  <button
                    type="button"
                    onClick={() => setSelectedSubCat('all')}
                    className="text-[10px] font-bold text-blue-600 hover:underline"
                  >
                    Xem tất cả
                  </button>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {displaySubcategories.map((sub) => {
                  const isSubActive = selectedSubCat === sub.id;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => {
                        setSelectedSubCat(isSubActive ? 'all' : sub.id);
                      }}
                      className={`flex flex-col items-center text-center p-2 rounded-2xl transition-all border cursor-pointer active:scale-95 ${
                        isSubActive
                          ? 'bg-blue-50 border-blue-400 text-blue-700 font-black shadow-xs ring-2 ring-blue-500/20'
                          : 'bg-slate-50/80 border-slate-150 text-slate-700 hover:bg-slate-100 font-bold'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-xs mb-1 border border-slate-200/60">
                        {sub.icon}
                      </div>
                      <span className="text-[10px] leading-tight line-clamp-2">
                        {sub.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* "Có thể bạn thích" (You Might Like) Section - Exact Replica of Image 3 */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>Có thể bạn thích</span>
                </h3>
                <span className="text-[10px] font-bold text-slate-400">
                  Gợi ý tối ưu
                </span>
              </div>

              {/* 2-Column Product Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {categoryProducts.map((p) => {
                  const discount = p.originalPrice
                    ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
                    : 0;

                  return (
                    <div
                      key={p.id}
                      onClick={() => handleViewProductDetails(p)}
                      className="bg-white rounded-2xl border border-slate-200/90 p-2 flex flex-col justify-between shadow-xs hover:shadow-md hover:scale-[1.025] hover:border-blue-400 active:scale-98 transition-all duration-200 cursor-pointer group relative"
                    >
                      <div>
                        {/* Product Image Frame */}
                        <div className="w-full h-28 bg-slate-50 rounded-xl overflow-hidden p-1 flex items-center justify-center relative mb-2 border border-slate-100">
                          {p.image ? (
                            <LazyImage src={p.image} alt={p.name} className="w-full h-full object-contain" />
                          ) : (
                            <PosIcon className="w-8 h-8 text-slate-300" />
                          )}

                          {/* Badges top left */}
                          <div className="absolute top-1 left-1 flex flex-col gap-1 z-10">
                            {viewedProductIds?.includes(p.id) && (
                              <span className="bg-slate-900/95 text-white font-extrabold text-[7px] uppercase px-1.5 py-0.5 rounded shadow-xs flex items-center gap-0.5 border border-slate-700">
                                <Eye className="w-2 h-2 text-blue-400" />
                                <span>ĐÃ XEM</span>
                              </span>
                            )}
                          </div>

                          {/* Discount badge top right */}
                          {discount > 0 && (
                            <span className="absolute top-1 right-1 bg-red-600 text-white font-black text-[8px] px-1.5 py-0.2 rounded shadow-xs">
                              -{discount}%
                            </span>
                          )}

                          {/* Brand pill bottom left */}
                          <span className="absolute bottom-1 left-1 bg-white/90 backdrop-blur-xs text-slate-700 font-extrabold text-[7.5px] px-1 py-0.2 rounded border border-slate-200/80 uppercase">
                            {p.brand || 'Solution'}
                          </span>
                        </div>

                        {/* Product Title */}
                        <h4 className="text-[11px] font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-blue-600">
                          {p.name}
                        </h4>
                      </div>

                      {/* Price, Stars & Action */}
                      <div className="mt-2 space-y-1">
                        <div className="text-xs font-black text-red-600 leading-tight">
                          {formatVND(p.price)}
                        </div>

                        {p.originalPrice && (
                          <div className="text-[9.5px] text-slate-400 line-through leading-tight">
                            {formatVND(p.originalPrice)}
                          </div>
                        )}

                        {/* Rating & Sold Count */}
                        <div className="flex items-center gap-1 text-[8.5px] text-slate-500 pt-0.5">
                          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                          <span className="font-bold text-slate-700">4.8</span>
                          <span>(3)</span>
                          <span className="text-slate-300">•</span>
                          <span>Bán {Math.floor(Math.random() * 300) + 100}</span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuickAddToCart(p, e);
                          }}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[9.5px] uppercase py-1.5 rounded-xl text-center shadow-xs active:scale-95 transition-all mt-1"
                        >
                          Thêm báo giá
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 3. MOBILE CART / GIỎ HÀNG TAB CONTENT (EXACT MATCH TO USER SCREENSHOT IMAGE 2) */}
      {activeTab === 'quote' && (
        <div className="flex-1 bg-slate-100 min-h-[calc(100vh-65px)] pb-36 flex flex-col text-left font-sans">
          
          {/* Top Header Bar */}
          <div className="bg-white border-b border-slate-200 sticky top-0 z-30 px-3 py-2.5 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('catalog')}
                className="p-1 text-slate-700 hover:text-blue-600 transition-colors rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-base font-black text-slate-900 tracking-tight">
                Giỏ hàng ({totalQuantity})
              </h1>
            </div>
            <button
              type="button"
              onClick={() => setIsEditingCart(!isEditingCart)}
              className="text-xs font-bold text-slate-600 hover:text-blue-600 px-2 py-1 rounded-lg transition-colors"
            >
              {isEditingCart ? 'Xong' : 'Sửa'}
            </button>
          </div>

          {/* Delivery Location Bar */}
          <div className="bg-white px-3 py-2 border-b border-slate-100 flex items-center justify-between text-xs shadow-2xs">
            <div className="flex items-center gap-1.5 text-slate-700 truncate pr-2">
              <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="truncate font-medium text-[11px]">{deliveryAddress}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </div>
            <button
              type="button"
              onClick={() => {
                const addr = prompt('Nhập địa chỉ giao hàng mới:', deliveryAddress);
                if (addr) setDeliveryAddress(addr);
              }}
              className="text-[11px] font-bold text-slate-500 hover:text-blue-600 shrink-0"
            >
              Sửa
            </button>
          </div>

          {/* Promo Announcement Banner */}
          <div className="bg-sky-50 px-3 py-1.5 border-b border-sky-100 flex items-center justify-between text-[11px] text-sky-900 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>1 khuyến mãi khác áp dụng cho đơn hàng</span>
            </div>
            <button
              type="button"
              onClick={() => setIsNotifyOpen(true)}
              className="text-blue-600 font-bold text-[10px] flex items-center hover:underline"
            >
              xem chi tiết <ChevronRight className="w-3 h-3 ml-0.5 inline" />
            </button>
          </div>

          {/* Cart Items List */}
          {quoteItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white my-3 rounded-2xl mx-3 shadow-xs">
              <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h3 className="text-sm font-black text-slate-900 mb-1">Giỏ hàng của bạn đang trống</h3>
              <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                Hãy chọn các sản phẩm thiết bị văn phòng, máy chấm công phù hợp để thêm vào giỏ hàng.
              </p>
              <button
                type="button"
                onClick={() => setActiveTab('catalog')}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase rounded-xl shadow-md transition-all active:scale-95"
              >
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            <div className="p-3 space-y-3">
              {quoteItems.map((item, idx) => {
                const itemKey = `${item.product.id}-${item.priceOptionLabel || ''}`;
                const isChecked = selectedItemIds.length === 0 || selectedItemIds.includes(itemKey);
                const currentPrice = item.customPrice || item.product.price;
                const origPrice = item.product.originalPrice || Math.round(currentPrice * 1.25);

                const toggleCheck = () => {
                  if (selectedItemIds.length === 0) {
                    // Initialize with all except this one
                    const allKeys = quoteItems.map(i => `${i.product.id}-${i.priceOptionLabel || ''}`);
                    setSelectedItemIds(allKeys.filter(k => k !== itemKey));
                  } else if (isChecked) {
                    setSelectedItemIds(selectedItemIds.filter(k => k !== itemKey));
                  } else {
                    setSelectedItemIds([...selectedItemIds, itemKey]);
                  }
                };

                return (
                  <div
                    key={`${item.product.id}-${idx}`}
                    className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs space-y-2"
                  >
                    <div className="flex items-start gap-2.5">
                      {/* Selection Checkbox */}
                      <button
                        type="button"
                        onClick={toggleCheck}
                        className="mt-2.5 shrink-0"
                      >
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                          isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isChecked && <CheckCircle className="w-3.5 h-3.5" />}
                        </div>
                      </button>

                      {/* Product Thumbnail */}
                      <img
                        src={item.product.image || undefined}
                        alt={item.product.name}
                        className="w-20 h-20 object-contain rounded-xl border border-slate-100 bg-slate-50/50 p-1 shrink-0"
                      />

                      {/* Product Info */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="text-xs font-black text-slate-900 line-clamp-2 leading-snug">
                          {item.product.name}
                        </h4>

                        {/* Variant Pill Dropdown tag */}
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded-md text-[10px] text-slate-600 font-bold">
                          <span>{item.priceOptionLabel || item.product.brand || 'Tiêu chuẩn'}</span>
                          <ChevronRight className="w-3 h-3 text-slate-400 rotate-90" />
                        </div>

                        {/* Price & Quantity Stepper */}
                        <div className="flex items-end justify-between gap-1 pt-1">
                          <div>
                            <div className="text-xs font-black text-blue-600">
                              {currentPrice.toLocaleString('vi-VN')}đ
                            </div>
                            {origPrice > currentPrice && (
                              <div className="text-[10px] text-slate-400 line-through">
                                {origPrice.toLocaleString('vi-VN')}đ
                              </div>
                            )}
                          </div>

                          {/* Stepper Control */}
                          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                            <button
                              type="button"
                              onClick={() => {
                                if (handleUpdateQuantity) {
                                  if (item.quantity === 1 && handleRemoveFromQuote) {
                                    handleRemoveFromQuote(item.product.id, item.priceOptionLabel);
                                  } else {
                                    handleUpdateQuantity(item.product.id, -1, item.priceOptionLabel);
                                  }
                                }
                              }}
                              className="px-2 py-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
                            >
                              {item.quantity === 1 ? (
                                <Trash2 className="w-3.5 h-3.5 text-slate-400 hover:text-red-500" />
                              ) : (
                                <span className="font-bold text-xs">-</span>
                              )}
                            </button>
                            <span className="px-2.5 text-xs font-black text-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                if (handleUpdateQuantity) {
                                  handleUpdateQuantity(item.product.id, 1, item.priceOptionLabel);
                                }
                              }}
                              className="px-2 py-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors font-bold text-xs"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Attached Gift Section */}
                    <div className="pt-2 border-t border-slate-100 flex items-start gap-2">
                      <span className="text-xs shrink-0">🎁</span>
                      <div className="flex-1 text-[11px] text-slate-700 font-bold">
                        <span>Quà tặng kèm:</span>
                        <div className="mt-1 p-2 bg-sky-50/80 border border-sky-100 rounded-xl flex items-center justify-between text-[10px] text-blue-900">
                          <span className="font-medium truncate pr-1">
                            Phiếu mua hàng / Tặng cài đặt UltraViewer vĩnh viễn
                          </span>
                          <span className="bg-blue-600 text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded-md shrink-0">
                            Miễn phí x1
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Section: Sản phẩm đã xem */}
          <div className="mt-2 px-3 space-y-2">
            <h3 className="text-xs font-black text-slate-900 tracking-tight uppercase">
              Sản phẩm đã xem
            </h3>
            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 no-scrollbar">
              {products.slice(0, 8).map((p) => {
                const discount = p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 21;
                return (
                  <div
                    key={p.id}
                    onClick={() => handleViewProductDetails(p)}
                    className="w-36 shrink-0 bg-white rounded-2xl p-2.5 border border-slate-200/80 shadow-2xs flex flex-col justify-between cursor-pointer active:scale-95 transition-all"
                  >
                    <div className="relative mb-1.5">
                      <span className="absolute top-0 left-0 bg-red-600 text-white font-extrabold text-[8px] px-1 py-0.5 rounded-md z-10">
                        -{discount}%
                      </span>
                      <img
                        src={p.image || undefined}
                        alt={p.name}
                        className="w-full h-24 object-contain rounded-xl p-1 bg-slate-50/50"
                      />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black text-slate-800 line-clamp-2 leading-tight mb-1">
                        {p.name}
                      </h4>
                      <div className="text-xs font-black text-red-600">
                        {p.price.toLocaleString('vi-VN')}đ
                      </div>
                      {p.originalPrice && (
                        <div className="text-[9px] text-slate-400 line-through">
                          {p.originalPrice.toLocaleString('vi-VN')}đ
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickAddToCart(p);
                      }}
                      className="mt-2 w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[10px] rounded-xl flex items-center justify-center gap-1 shadow-2xs active:scale-95 transition-all"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Thêm</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sticky Bottom Cart Checkout Footer Bar */}
          {quoteItems.length > 0 && (() => {
            const selectedItems = quoteItems.filter(item => {
              const itemKey = `${item.product.id}-${item.priceOptionLabel || ''}`;
              return selectedItemIds.length === 0 || selectedItemIds.includes(itemKey);
            });
            const subtotal = selectedItems.reduce((acc, item) => {
              return acc + (item.customPrice || item.product.price) * item.quantity;
            }, 0);
            const totalOrig = selectedItems.reduce((acc, item) => {
              const orig = item.product.originalPrice || Math.round((item.customPrice || item.product.price) * 1.25);
              return acc + orig * item.quantity;
            }, 0);
            const totalSaved = Math.max(0, totalOrig - subtotal);
            const isAllSelected = selectedItemIds.length === 0 || selectedItemIds.length === quoteItems.length;

            const toggleSelectAll = () => {
              if (isAllSelected && selectedItemIds.length > 0) {
                setSelectedItemIds(['NONE_SELECTED']);
              } else {
                setSelectedItemIds([]);
              }
            };

            return (
              <div className="fixed bottom-[52px] left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-2xl">
                {/* Auto Voucher notice */}
                <div className="bg-sky-50 px-3 py-1 flex items-center gap-1.5 text-[10px] font-bold text-sky-900 border-b border-sky-100">
                  <Zap className="w-3 h-3 text-blue-600 fill-blue-600 shrink-0" />
                  <span>Voucher (nếu có) áp dụng tự động khi thanh toán</span>
                </div>

                {/* Main Action Bar */}
                <div className="px-3 py-2 flex items-center justify-between gap-2">
                  <label className="flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-slate-800">Tất cả</span>
                  </label>

                  <div className="text-right flex-1 pr-1">
                    <div className="text-sm font-black text-blue-600">
                      {subtotal.toLocaleString('vi-VN')}đ
                    </div>
                    {totalSaved > 0 && (
                      <div className="text-[10px] text-emerald-600 font-extrabold">
                        Tiết kiệm {totalSaved.toLocaleString('vi-VN')}đ
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleGoToHomeAndReset()}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer shrink-0"
                  >
                    Thanh toán ({selectedItems.length})
                  </button>
                </div>
              </div>
            );
          })()}

        </div>
      )}

      {/* 4. STANDALONE MOBILE ORDERS TAB CONTENT (EXACT MATCH TO USER SCREENSHOT IMAGE 4) */}
      {activeTab === 'order-lookup' && (
        <div className="flex-1 bg-slate-50 min-h-[calc(100vh-65px)] pb-24 flex flex-col text-left font-sans">
          
          {/* Header Bar */}
          <div className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 py-3 flex items-center justify-between shadow-2xs">
            <h1 className="text-base font-black text-slate-900 tracking-tight">
              Đơn hàng của tôi
            </h1>
            <button
              type="button"
              onClick={() => setActiveTab('quote')}
              className="relative p-2 text-slate-700 hover:text-blue-600 transition-colors"
              title="Xem giỏ hàng"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalQuantity > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white font-extrabold text-[8px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-2xs">
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>

          {/* Status Tabs Bar (Horizontal Scroll) */}
          <div className="bg-white border-b border-slate-200/80 overflow-x-auto no-scrollbar sticky top-[49px] z-20">
            <div className="flex items-center min-w-max px-2">
              {[
                { id: 'all', label: 'Tất cả' },
                { id: 'pending', label: 'Chờ thanh toán' },
                { id: 'processing', label: 'Đang xử lý' },
                { id: 'delivered', label: 'Đã giao' },
                { id: 'cancelled', label: 'Đã hủy' },
              ].map((tab) => {
                const isActive = orderStatusTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setOrderStatusTab(tab.id as any)}
                    className={`py-3 px-3.5 text-xs font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                      isActive ? 'text-blue-600 font-black' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Order Search Bar */}
          <div className="p-3 bg-white border-b border-slate-200/60 shadow-2xs">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={orderSearchQuery}
                onChange={(e) => setOrderSearchQuery(e.target.value)}
                placeholder="Tìm đơn hàng theo mã, tên SP hoặc SĐT..."
                className="w-full pl-9 pr-8 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              {orderSearchQuery && (
                <button
                  type="button"
                  onClick={() => setOrderSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Orders Content Area */}
          <div className="flex-1 flex flex-col justify-center items-center p-6 text-center">
            
            {/* Empty State Graphic matching Image 4 */}
            <div className="w-48 h-48 mb-4 relative flex items-center justify-center">
              {/* 3D Box Illustration Vector Replica */}
              <div className="relative w-40 h-40 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-sky-50 rounded-full blur-2xl opacity-60" />
                
                {/* Outer Box */}
                <div className="relative bg-white border-2 border-slate-300 rounded-2xl p-4 shadow-lg transform -rotate-6 w-32 h-32 flex flex-col items-center justify-center">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-1 text-blue-600">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div className="w-16 h-1.5 bg-slate-200 rounded-full mb-1" />
                  <div className="w-10 h-1.5 bg-slate-150 rounded-full" />
                </div>

                {/* Overlapping Front Box */}
                <div className="absolute -bottom-2 -right-2 bg-blue-600 border-2 border-blue-700 text-white rounded-2xl p-3.5 shadow-xl transform rotate-12 w-28 h-28 flex flex-col items-center justify-center">
                  <Package className="w-8 h-8 mb-1 opacity-90" />
                  <div className="w-12 h-1.5 bg-blue-400 rounded-full mb-1" />
                  <div className="w-8 h-1.5 bg-blue-300 rounded-full" />
                </div>
              </div>
            </div>

            {/* Empty State Text */}
            <h2 className="text-base font-black text-slate-900 mb-1.5 tracking-tight">
              {orderSearchQuery ? 'Không tìm thấy đơn hàng phù hợp' : 'Bạn chưa có đơn hàng nào'}
            </h2>
            <p className="text-xs text-slate-500 max-w-xs mb-6 leading-relaxed font-medium">
              {orderSearchQuery
                ? `Không có kết quả nào trùng khớp với từ khóa "${orderSearchQuery}"`
                : 'Khi bạn đặt mua sản phẩm, thông tin đơn hàng sẽ hiển thị tại đây.'}
            </p>

            {/* "Tiếp tục mua sắm" Primary Button */}
            <button
              type="button"
              onClick={() => setActiveTab('catalog')}
              className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider px-7 py-3 rounded-xl shadow-md transition-all cursor-pointer"
            >
              Tiếp tục mua sắm
            </button>

          </div>

        </div>
      )}
      </>
      )}

      {/* COMPREHENSIVE MOBILE FOOTER - Synchronized 100% with Desktop Footer */}
      <footer className="bg-slate-900 text-slate-300 text-xs border-t border-slate-800 mt-10 mb-6 mx-2 sm:mx-4 rounded-2xl p-5 space-y-6 shadow-xl">
        
        {/* Col 1: Corporate Profile */}
        <div className="space-y-3 pb-4 border-b border-slate-800 text-left">
          <div className="flex items-center gap-2.5">
            {webConfig.footerLogoImageUrl || webConfig.logoImageUrl ? (
              <img 
                src={webConfig.footerLogoImageUrl || webConfig.logoImageUrl} 
                alt="Footer Logo" 
                className="h-8 w-auto max-w-[130px] object-contain rounded bg-white p-1 shadow-xs shrink-0" 
              />
            ) : (
              <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center font-black text-xs text-white shrink-0 shadow-xs">
                {(webConfig.footerLogoText || webConfig.logoText || 'SB').substring(0, 3)}
              </span>
            )}
            <div className="text-white font-black text-sm uppercase leading-tight text-left">
              {webConfig.footerCompanyName || webConfig.companyName || 'Quản lý cửa hàng & doanh nghiệp'}
            </div>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed font-medium text-left">
            {webConfig.footerDescription || `Chuyên phân phối, lắp đặt các giải pháp quản lý bán hàng toàn diện, chính hãng hàng đầu tại Việt Nam. ${webConfig.footerCompanyName || webConfig.companyName || 'Quản lý cửa hàng & doanh nghiệp'} - Uy tín xây dựng niềm tin trọn vẹn.`}
          </p>
          <div className="text-[10.5px] text-slate-500 font-mono space-y-1 text-left">
            <div>MST: {webConfig.footerTaxCode || webConfig.taxCode || '0315357891'} do Sở KH&ĐT cấp</div>
            <div>{webConfig.footerCopyright || `Bản quyền © ${new Date().getFullYear()} ${webConfig.footerCompanyName || webConfig.companyName || 'Quản lý cửa hàng & doanh nghiệp'}.`}</div>
          </div>
        </div>

        {/* Col 2: Liên hệ văn phòng */}
        <div className="space-y-3 pb-4 border-b border-slate-800 text-left">
          <h4 className="text-white font-extrabold uppercase text-xs tracking-wider border-l-2 border-red-500 pl-2">
            Liên hệ văn phòng
          </h4>
          <div className="space-y-2.5 text-[11px]">
            <div className="flex items-start gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{webConfig.address}</span>
            </div>
            <div className="flex items-center justify-between bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
              <div>
                <span className="text-[9px] text-slate-400 font-bold uppercase block">Hotline Tư vấn 24/7</span>
                <a href={`tel:${webConfig.primaryPhone.replace(/[\s\.]/g, '')}`} className="text-blue-400 font-extrabold text-xs flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  <span>{webConfig.primaryPhone} (Zalo)</span>
                </a>
              </div>
              <a href={`tel:${webConfig.primaryPhone.replace(/[\s\.]/g, '')}`} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase rounded-lg shadow-xs flex items-center gap-1">
                <PhoneCall className="w-3 h-3" />
                <span>Gọi ngay</span>
              </a>
            </div>
            {webConfig.secondaryPhone && (
              <div className="flex items-center justify-between bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Hotline Kỹ thuật / Máy bàn</span>
                  <a href={`tel:${webConfig.secondaryPhone.replace(/[\s\.]/g, '')}`} className="text-teal-400 font-extrabold text-xs flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    <span>{webConfig.secondaryPhone}</span>
                  </a>
                </div>
                <a href={`tel:${webConfig.secondaryPhone.replace(/[\s\.]/g, '')}`} className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-[10px] uppercase rounded-lg shadow-xs flex items-center gap-1">
                  <PhoneCall className="w-3 h-3" />
                  <span>Gọi bàn</span>
                </a>
              </div>
            )}
            <div className="flex gap-2 pt-1">
              <a 
                href={sanitizeUrl(webConfig.zaloLink)} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-1 py-2 bg-teal-600/30 hover:bg-teal-600/50 border border-teal-500/40 rounded-xl text-teal-300 font-bold flex items-center justify-center gap-1.5 transition-all text-[11px]"
              >
                <ZaloIcon className="w-4 h-4 rounded-full overflow-hidden" />
                <span>Chat Zalo</span>
              </a>
              <a 
                href={sanitizeUrl(webConfig.facebookLink)} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-1 py-2 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 rounded-xl text-blue-300 font-bold flex items-center justify-center gap-1.5 transition-all text-[11px]"
              >
                <Facebook className="w-3.5 h-3.5 text-blue-400" />
                <span>Facebook</span>
              </a>
            </div>
            {webConfig.email && (
              <div className="flex items-center gap-2 pt-1.5 text-slate-300 border-t border-slate-800/60">
                <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <a href={`mailto:${webConfig.email}`} className="hover:text-white underline text-[11px]">{webConfig.email}</a>
              </div>
            )}
          </div>
        </div>

        {/* Col 3 & Col 4: Dynamic Footer Columns (Synchronized 100% with Admin & PC Footer) */}
        {(webConfig.footerColumns || [
          {
            id: "col1",
            title: "Chính sách chung",
            links: [
              { id: "l1", label: "Chính sách bảo hành đổi trả trong 30 ngày", url: "#policy" },
              { id: "l2", label: "Chính sách giao hàng hỏa tốc COD toàn quốc", url: "#policy" },
              { id: "l3", label: "Chính sách bảo mật thông tin khách hàng", url: "#policy" },
              { id: "l4", label: "Hướng dẫn thanh toán & xuất hóa đơn đỏ VAT", url: "#policy" }
            ]
          },
          {
            id: "col2",
            title: "Kênh tải phần mềm",
            links: [
              { id: "l5", label: "Phần mềm chấm công: Wise Eye On 39, Ronald Jack Pro, Mitaco tiếng Việt vĩnh viễn miễn phí", url: "#download" },
              { id: "l6", label: "Driver máy in: Driver Xprinter K80, driver máy in nhãn vận đơn A6 XP-420B", url: "#download" },
              { id: "l7", label: "Hỗ trợ UltraViewer: Tải UltraViewer để kỹ thuật viên kết nối cấu hình máy từ xa", url: "#download" }
            ]
          }
        ]).map((col: any, idx: number, arr: any[]) => (
          <div key={col.id} className={`space-y-3 text-left ${idx < arr.length - 1 ? 'pb-4 border-b border-slate-800' : ''}`}>
            <h4 className="text-white font-extrabold uppercase text-xs tracking-wider border-l-2 border-amber-500 pl-2">
              {col.title}
            </h4>
            <ul className="space-y-2 text-[11px] leading-relaxed text-slate-300">
              {(col.links || []).map((link: any) => (
                <li key={link.id}>
                  <a 
                    href={link.url || "#"} 
                    onClick={(e) => {
                      if (link.url && link.url.startsWith('#')) {
                        e.preventDefault();
                        if (link.url === '#download') {
                          setActiveTab('troubleshoot');
                        } else {
                          setActiveTab('catalog');
                        }
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="hover:text-white hover:underline transition-colors block text-slate-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Bottom Note */}
        <div className="pt-2 text-center text-[10px] text-slate-500 border-t border-slate-800/60">
          Thiết kế lấy cảm hứng và đồng bộ dữ liệu giao diện solutionbao.vn
        </div>

      </footer>
        </motion.div>
      </AnimatePresence>

      {/* 5. FIXED MOBILE BOTTOM NAVIGATION BAR (5 TABS MATCHING IMAGE 1, 2 & 4) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-2 py-1.5 flex items-center justify-around">
        
        {/* Tab 1: Trang chủ */}
        <button
          type="button"
          onClick={() => {
            if (setSelectedProduct) setSelectedProduct(null);
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all ${
            activeTab === 'home' && !selectedProduct ? 'text-blue-600 font-black' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'home' && !selectedProduct ? 'scale-110 text-blue-600' : ''}`} />
          <span className="text-[10px] font-bold">Trang chủ</span>
        </button>

        {/* Tab 2: Danh mục */}
        <button
          type="button"
          onClick={() => {
            if (setSelectedProduct) setSelectedProduct(null);
            setActiveTab('catalog');
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all ${
            activeTab === 'catalog' && !selectedProduct ? 'text-blue-600 font-black' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <LayoutGrid className={`w-5 h-5 ${activeTab === 'catalog' && !selectedProduct ? 'scale-110 text-blue-600' : ''}`} />
          <span className="text-[10px] font-bold">Danh mục</span>
        </button>

        {/* Tab 3: Đơn hàng */}
        <button
          type="button"
          onClick={() => {
            if (setSelectedProduct) setSelectedProduct(null);
            setActiveTab('order-lookup');
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all relative ${
            activeTab === 'order-lookup' ? 'text-blue-600 font-black' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <ClipboardList className={`w-5 h-5 ${activeTab === 'order-lookup' ? 'scale-110 text-blue-600' : ''}`} />
          <span className="text-[10px] font-bold">Đơn hàng</span>
        </button>

        {/* Tab 4: Thông báo */}
        <button
          type="button"
          onClick={() => setIsNotifyOpen(true)}
          className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all text-slate-500 hover:text-slate-800 relative"
        >
          <div className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </div>
          <span className="text-[10px] font-bold">Thông báo</span>
        </button>

        {/* Tab 5: Tôi (Tài khoản / Tư vấn) */}
        <button
          type="button"
          onClick={() => setIsAccountOpen(true)}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all ${
            isAccountOpen || activeTab === 'advisor' ? 'text-blue-600 font-black' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-bold">Tôi</span>
        </button>

      </nav>

      {/* MODAL 1: THÔNG BÁO POPUP */}
      <AnimatePresence>
        {isNotifyOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-md p-4 space-y-4 shadow-2xl max-h-[80vh] overflow-y-auto text-left"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">Thông Báo Khuyến Mãi & Hỗ Trợ</h3>
                    <p className="text-[10px] text-slate-400 font-bold">Cập nhật tin tức kỹ thuật mới nhất</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsNotifyOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2.5">
                <div className="bg-blue-50/80 p-3 rounded-xl border border-blue-100 space-y-1">
                  <div className="flex items-center gap-1.5 text-blue-700 text-xs font-black">
                    <Zap className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
                    <span>Tuần Lễ Vàng Khuyến Mãi Máy Chấm Công</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                    Giảm đến 45% cho toàn bộ các dòng máy chấm công Ronald Jack, ZKTeco khi đặt hàng hôm nay.
                  </p>
                </div>

                <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-100 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-black">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Tặng Phần Mềm Chấm Công Tiếng Việt</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                    Miễn phí phần mềm tính công Ronald Jack Pro / Wise Eye bản quyền vĩnh viễn + Hỗ trợ cài đặt UltraViewer.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsNotifyOpen(false);
                  setActiveTab('advisor');
                }}
                className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-sm text-center"
              >
                Nhận tư vấn ngay
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: TÔI / TÀI KHOẢN SHEET */}
      <AnimatePresence>
        {isAccountOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-md p-5 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto text-left"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center shadow-md">
                    {webConfig.logoText ? webConfig.logoText.charAt(0) : 'S'}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">{webConfig.logoText || 'Solution B A O'}</h3>
                    <p className="text-[10px] text-slate-500 font-bold">Hotline: {webConfig.primaryPhone}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAccountOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Action Links */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAccountOpen(false);
                    setActiveTab('order-lookup');
                  }}
                  className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-800 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-blue-600" />
                    <span>Tra cứu tiến độ đơn hàng</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsAccountOpen(false);
                    setActiveTab('troubleshoot');
                  }}
                  className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-800 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-orange-600" />
                    <span>Cẩm nang hướng dẫn kỹ thuật</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsAccountOpen(false);
                    setActiveTab('advisor');
                  }}
                  className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-800 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span>Tư vấn & Chốt đơn trực tuyến</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsAccountOpen(false);
                    setActiveTab('admin');
                  }}
                  className="w-full flex items-center justify-between p-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-amber-400" />
                    <span>Quản trị viên (Admin Panel)</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Direct Support Hotline */}
              <div className="bg-red-50 p-3 rounded-xl border border-red-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-black uppercase text-red-600">Tổng đài hỗ trợ 24/7</div>
                  <div className="text-xs font-extrabold text-slate-900">{webConfig.primaryPhone}</div>
                </div>
                <a
                  href={`tel:${webConfig.primaryPhone.replace(/[^0-9]/g, '')}`}
                  className="px-3 py-1.5 bg-red-600 text-white text-xs font-black rounded-lg shadow-xs flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Gọi ngay</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
