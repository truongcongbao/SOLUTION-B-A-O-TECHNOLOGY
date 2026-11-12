import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Check, 
  Plus, 
  ArrowRight, 
  ShoppingBag, 
  ShieldCheck, 
  Gift, 
  Percent, 
  Layers, 
  CheckCircle2, 
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Store,
  Coffee,
  UtensilsCrossed,
  Package,
  Clock,
  PhoneCall,
  X,
  Tag,
  Pause,
  Play,
  Eye,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { ComboBundle, Product, ComboShowcaseConfig, DEFAULT_COMBO_SHOWCASE_CONFIG } from '../types';

interface ComboBundlesSectionProps {
  bundles: ComboBundle[];
  products: Product[];
  onAddBundleToQuote: (bundle: ComboBundle) => void;
  onOpenProductModal?: (productId: string) => void;
  onConsultBundle?: (bundle: ComboBundle) => void;
  formatVND: (value: number) => string;
  showcaseConfig?: ComboShowcaseConfig;
}

export const ComboBundlesSection: React.FC<ComboBundlesSectionProps> = ({
  bundles,
  products,
  onAddBundleToQuote,
  onOpenProductModal,
  onConsultBundle,
  formatVND,
  showcaseConfig = DEFAULT_COMBO_SHOWCASE_CONFIG
}) => {
  // Visible bundles sorted by order
  const visibleBundles = bundles
    .filter((b) => b.isVisible !== false)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

  // Responsive mobile detection
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // UNIFIED STATE: 1. Slide index of top banners & 2. Active bundle ID
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [selectedBundleId, setSelectedBundleId] = useState<string>(visibleBundles[0]?.id || '');
  const [isCarouselHovered, setIsCarouselHovered] = useState<boolean>(false);
  const [addedBundleId, setAddedBundleId] = useState<string | null>(null);

  // Swipe / Drag refs
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const mouseStartXRef = useRef<number | null>(null);
  const isMouseDownRef = useRef<boolean>(false);

  // Tabs scroll container ref
  const tabsScrollRef = useRef<HTMLDivElement>(null);

  const totalCount = visibleBundles.length;
  // Step: 1 on mobile, 2 on desktop
  const step = isMobile ? 1 : 2;
  const maxSlideIndex = isMobile ? Math.max(0, totalCount - 1) : Math.max(0, totalCount - 2);

  // Make sure selected bundle is valid
  useEffect(() => {
    if (visibleBundles.length > 0 && (!selectedBundleId || !visibleBundles.find((b) => b.id === selectedBundleId))) {
      setSelectedBundleId(visibleBundles[0].id);
    }
  }, [visibleBundles, selectedBundleId]);

  const activeBundle = visibleBundles.find((b) => b.id === selectedBundleId) || visibleBundles[0];
  const activeBundleIndex = visibleBundles.findIndex((b) => b.id === (activeBundle?.id || ''));

  // Keep slideIndex clamped
  useEffect(() => {
    if (slideIndex > maxSlideIndex) {
      setSlideIndex(maxSlideIndex);
    }
  }, [maxSlideIndex, slideIndex]);

  // Synchronize tabs scroll inside container ONLY — DO NOT use scrollIntoView to prevent page jump
  useEffect(() => {
    if (tabsScrollRef.current && selectedBundleId) {
      const container = tabsScrollRef.current;
      const activeBtn = container.querySelector(`[data-bundle-id="${selectedBundleId}"]`) as HTMLElement;
      if (activeBtn) {
        const targetScrollLeft = activeBtn.offsetLeft - (container.clientWidth / 2) + (activeBtn.clientWidth / 2);
        container.scrollTo({
          left: Math.max(0, targetScrollLeft),
          behavior: 'smooth'
        });
      }
    }
  }, [selectedBundleId]);

  // TWO-WAY SYNC FUNCTION: Selecting a bundle slides the top banners and sets active bundle WITHOUT jumping/scrolling page
  const syncSelectBundle = (bundleId: string) => {
    setSelectedBundleId(bundleId);
    const bIndex = visibleBundles.findIndex((b) => b.id === bundleId);
    if (bIndex >= 0) {
      const targetSlide = isMobile ? bIndex : Math.floor(bIndex / 2) * 2;
      setSlideIndex(Math.min(targetSlide, maxSlideIndex));
    }
  };

  // TWO-WAY SYNC FUNCTION: Sliding top banners updates slideIndex AND synchronizes the active bundle
  const handlePrevSlide = () => {
    setSlideIndex((prev) => {
      let next = prev - step;
      if (next < 0) {
        next = isMobile ? maxSlideIndex : (maxSlideIndex % 2 === 0 ? maxSlideIndex : Math.max(0, maxSlideIndex - 1));
      }
      // Đồng bộ: chọn ngay gói combo của banner mới trượt đến
      if (visibleBundles[next]) {
        setSelectedBundleId(visibleBundles[next].id);
      }
      return next;
    });
  };

  const handleNextSlide = () => {
    setSlideIndex((prev) => {
      let next = prev + step;
      if (next > maxSlideIndex) {
        next = 0;
      }
      // Đồng bộ: chọn ngay gói combo của banner mới trượt đến
      if (visibleBundles[next]) {
        setSelectedBundleId(visibleBundles[next].id);
      }
      return next;
    });
  };


  // Touch Swipe Handlers for mobile & tablets
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsCarouselHovered(true);
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsCarouselHovered(false);
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchEndX - touchStartXRef.current;
    const diffY = touchEndY - (touchStartYRef.current || 0);

    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        handleNextSlide();
      } else {
        handlePrevSlide();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Mouse Drag Handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    isMouseDownRef.current = true;
    mouseStartXRef.current = e.clientX;
  };

  const handleMouseMove = (_e: React.MouseEvent) => {};

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isMouseDownRef.current || mouseStartXRef.current === null) return;
    const diffX = e.clientX - mouseStartXRef.current;
    if (Math.abs(diffX) > 50) {
      if (diffX < 0) {
        handleNextSlide();
      } else {
        handlePrevSlide();
      }
    }
    isMouseDownRef.current = false;
    mouseStartXRef.current = null;
  };

  const handleMouseLeave = () => {
    setIsCarouselHovered(false);
    isMouseDownRef.current = false;
    mouseStartXRef.current = null;
  };

  const handleAdd = (bundle: ComboBundle, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onAddBundleToQuote(bundle);
    setAddedBundleId(bundle.id);
    setTimeout(() => {
      setAddedBundleId(null);
    }, 2200);
  };

  const handleScrollTabs = (direction: 'left' | 'right') => {
    if (tabsScrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      tabsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleNextCombo = () => {
    if (visibleBundles.length === 0) return;
    const nextIdx = (activeBundleIndex + 1) % visibleBundles.length;
    syncSelectBundle(visibleBundles[nextIdx].id);
  };

  const handlePrevCombo = () => {
    if (visibleBundles.length === 0) return;
    const prevIdx = (activeBundleIndex - 1 + visibleBundles.length) % visibleBundles.length;
    syncSelectBundle(visibleBundles[prevIdx].id);
  };

  const getBundleIcon = (id: string) => {
    if (id.includes('cafe') || id.includes('trasua')) return <Coffee className="w-5 h-5" />;
    if (id.includes('banle') || id.includes('taphoa') || id.includes('sieu-thi')) return <Store className="w-5 h-5" />;
    if (id.includes('nha-hang') || id.includes('quan-an')) return <UtensilsCrossed className="w-5 h-5" />;
    return <Package className="w-5 h-5" />;
  };

  if (!visibleBundles || visibleBundles.length === 0) return null;

  const totalPages = isMobile ? totalCount : Math.ceil(totalCount / 2);
  const currentPage = isMobile ? slideIndex : Math.floor(slideIndex / 2);

  const transformStyle = isMobile
    ? `translateX(-${slideIndex * 100}%)`
    : `translateX(-${slideIndex * 50}%)`;

  return (
    <section 
      className="space-y-4 text-left rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-slate-900/5 via-transparent to-transparent border border-slate-200/80 shadow-xs" 
      id="combo-bundles-section"
    >
      {/* ========================================================================= */}
      {/* 1. BANNER DÀI TIÊU ĐỀ GIẢI PHÁP: ĐỨNG LÊN TRÊN 2 BANNER NGẮN */}
      {/* ========================================================================= */}
      {showcaseConfig.showcaseVisible !== false && (
        <div className="bg-gradient-to-r from-[#0d1435] via-[#141d4b] to-[#101840] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-indigo-900/40" id="combo-interactive-showcase">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>{showcaseConfig.badge || 'COMBO TRỌN BỘ • GIẢI PHÁP TIẾT KIỆM (BUNDLE & SAVE)'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white uppercase leading-snug">
                MUA TRỌN BỘ THIẾT BỊ BÁN HÀNG — <span className="text-amber-400">{showcaseConfig.highlightText || 'TIẾT KIỆM ĐẾN 20%'}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {showcaseConfig.description || (
                  <>
                    Dành riêng cho <strong className="text-white">quán cafe, nhà hàng, siêu thị mini, shop thời trang & kho TMĐT</strong>. Trọn gói đồng bộ gồm Máy POS + Máy In Hóa Đơn + Ngăn Kéo Thu Ngân + Máy Quét Mã Vạch. Cắm điện là bán ngay, không mất công chọn lẻ từng món!
                  </>
                )}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 shrink-0">
              <div className="bg-[#1b2452]/90 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-white/15 flex items-center gap-3 shadow-md">
                <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 font-black text-lg">
                  <Percent className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">ƯU ĐÃI TRỌN BỘ</div>
                  <div className="text-sm font-black text-amber-300 tracking-tight">{showcaseConfig.discountCallout || 'Giảm thêm 1.5 - 3 Triệu / Bộ'}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{showcaseConfig.warrantyCallout || 'Bảo hành chính hãng 12 Tháng tận nơi'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. CAROUSEL: 2 BANNER NGẮN TRƯỢT NGANG (ẨN MŨI TÊN, VẪN TRƯỢT VUỐT/KÉO CHUỘT/TỰ ĐỘNG BÌNH THƯỜNG) */}
      {/* ========================================================================= */}
      <div 
        className="space-y-2.5 relative group/combo-carousel select-none"
        onMouseEnter={() => setIsCarouselHovered(true)}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Main Slider Window */}
        <div className="overflow-hidden rounded-3xl relative shadow-md border-2 border-slate-900/10 bg-slate-950">
          <div 
            className="flex transition-transform duration-700 ease-out -mx-2"
            style={{ transform: transformStyle }}
          >
            {visibleBundles.map((bundle, bIdx) => {
              const bgImage = bundle.bannerImage || 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80';
              const isSelected = selectedBundleId === bundle.id;

              return (
                <div 
                  key={bundle.id || bIdx}
                  className="w-full md:w-1/2 shrink-0 px-2 flex"
                >
                  <div 
                    onClick={() => syncSelectBundle(bundle.id)}
                    className={`group/card relative w-full min-h-[220px] sm:min-h-[245px] md:min-h-[265px] rounded-2xl md:rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 flex flex-col justify-between p-5 sm:p-6 select-none bg-slate-900 ${
                      isSelected 
                        ? 'border-amber-400 ring-4 ring-amber-400/30 shadow-amber-500/20' 
                        : 'border-slate-800/80 hover:border-blue-400/70'
                    }`}
                  >
                    {/* Background Banner Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover/card:scale-105"
                      style={{ backgroundImage: `url(${bgImage})` }}
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40 pointer-events-none transition-opacity duration-300 group-hover/card:via-slate-950/70" />

                    {/* Top row: Badges & Selected Indicator */}
                    <div className="relative z-10 flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase text-white tracking-wider shadow-sm bg-gradient-to-r ${bundle.badgeColor || 'from-amber-500 to-orange-600'}`}>
                          {bundle.badge || 'COMBO TIẾT KIỆM'}
                        </span>

                        {bundle.popular && (
                          <span className="bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs animate-pulse">
                            HOT DEAL
                          </span>
                        )}

                        {/* Visual Badge when this banner is currently selected below */}
                        {isSelected && (
                          <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1 animate-pulse">
                            <Eye className="w-3 h-3 stroke-[3]" />
                            <span>ĐANG XEM CHI TIẾT</span>
                          </span>
                        )}
                      </div>

                      <div className="bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black text-xs sm:text-sm px-2.5 py-1 rounded-xl shadow-md shrink-0 flex items-center gap-1">
                        <Percent className="w-3.5 h-3.5 stroke-[3]" />
                        <span>GIẢM {bundle.discountPercent}%</span>
                      </div>
                    </div>

                    {/* Bottom row: Title, pills, pricing */}
                    <div className="relative z-10 space-y-2 mt-auto pt-4">
                      <div>
                        <h4 className={`text-base sm:text-lg md:text-xl font-black transition-colors tracking-tight line-clamp-1 leading-snug ${
                          isSelected ? 'text-amber-300' : 'text-white group-hover/card:text-amber-200'
                        }`}>
                          {bundle.title}
                        </h4>
                        {bundle.tagline && (
                          <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                            {bundle.tagline}
                          </p>
                        )}
                      </div>

                      {/* Equipment tags pills */}
                      {bundle.items && bundle.items.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {bundle.items.slice(0, 4).map((it, itIdx) => (
                            <span 
                              key={itIdx}
                              className="bg-white/15 backdrop-blur-xs text-slate-200 border border-white/20 text-[10px] font-bold px-2 py-0.5 rounded-lg whitespace-nowrap"
                            >
                              {it.categoryLabel || it.name.split(' ')[0]}
                            </span>
                          ))}
                          {bundle.items.length > 4 && (
                            <span className="bg-white/10 text-slate-300 text-[10px] font-bold px-1.5 py-0.5 rounded-lg">
                              +{bundle.items.length - 4} thiết bị
                            </span>
                          )}
                        </div>
                      )}

                      {/* Pricing & CTA */}
                      <div className="pt-2 border-t border-white/15 flex items-center justify-between gap-3">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg sm:text-xl md:text-2xl font-black font-mono text-amber-300">
                              {formatVND(bundle.bundlePrice)}
                            </span>
                            <span className="text-[11px] text-slate-400 line-through font-mono">
                              {formatVND(bundle.originalPrice)}
                            </span>
                          </div>
                          <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>Tiết kiệm {formatVND(bundle.savingAmount)}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              syncSelectBundle(bundle.id);
                            }}
                            className={`px-3.5 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 shadow-xs hover:scale-105 active:scale-95 ${
                              isSelected
                                ? 'bg-amber-400 text-slate-950 font-black ring-2 ring-amber-300'
                                : 'text-white bg-white/20 hover:bg-white/30 backdrop-blur-xs'
                            }`}
                          >
                            <span>{isSelected ? 'Đang Xem Dưới' : 'Xem Trọn Bộ'}</span>
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FLOATING NAVIGATION ARROWS: CHỈ HIỆN KHI RÊ CHUỘT VÀO BANNER CAROUSEL */}
          {totalCount > (isMobile ? 1 : 2) && (
            <>
              {/* Prev Button (Trượt Trái) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevSlide();
                }}
                className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-slate-900 shadow-2xl border-2 border-slate-200/90 transition-all flex items-center justify-center hover:scale-110 active:scale-90 cursor-pointer z-30 backdrop-blur-md ${
                  isCarouselHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                } group-hover/combo-carousel:opacity-100 group-hover/combo-carousel:pointer-events-auto group duration-300`}
                title="Trượt sang trái xem banner trước (Đồng bộ chi tiết bên dưới)"
                aria-label="Trượt banner trước"
              >
                <ChevronLeft className="w-6 h-6 stroke-[3] text-slate-800 group-hover:text-blue-600 transition-colors" />
              </button>

              {/* Next Button (Trượt Phải) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextSlide();
                }}
                className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-slate-900 shadow-2xl border-2 border-slate-200/90 transition-all flex items-center justify-center hover:scale-110 active:scale-90 cursor-pointer z-30 backdrop-blur-md ${
                  isCarouselHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                } group-hover/combo-carousel:opacity-100 group-hover/combo-carousel:pointer-events-auto group duration-300`}
                title="Trượt sang phải xem banner tiếp theo (Đồng bộ chi tiết bên dưới)"
                aria-label="Trượt banner tiếp theo"
              >
                <ChevronRight className="w-6 h-6 stroke-[3] text-slate-800 group-hover:text-blue-600 transition-colors" />
              </button>
            </>
          )}

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. KHỐI CHI TIẾT ĐỒNG BỘ: TABS CHỌN NGÀNH NGHỀ & CHI TIẾT 4 THIẾT BỊ TRỌN GÓI */}
      {/* ========================================================================= */}
      {showcaseConfig.showcaseVisible !== false && (
        <div className="space-y-4 pt-1">
          {/* QUICK BUNDLE TABS SELECTOR (CÁC NÚT TAB CHUYỂN GÓI COMBO - ĐỒNG BỘ HAI CHIỀU) */}
          <div className="relative group/tabs">
            {/* Scroll Left Button for Tabs */}
            <button
              type="button"
              onClick={() => handleScrollTabs('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-7 h-7 rounded-full bg-white text-slate-800 shadow-md border border-slate-200 flex items-center justify-center z-10 hover:bg-slate-50 cursor-pointer active:scale-95 transition-all opacity-0 group-hover/tabs:opacity-100 pointer-events-none group-hover/tabs:pointer-events-auto duration-200"
              title="Trượt tab sang trái"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div 
              ref={tabsScrollRef}
              className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none -mx-2 px-6 sm:mx-0 sm:px-6 scroll-smooth"
            >
              {visibleBundles.map((bundle) => {
                const isSelected = selectedBundleId === bundle.id;
                return (
                  <button
                    key={bundle.id}
                    data-bundle-id={bundle.id}
                    type="button"
                    onClick={() => syncSelectBundle(bundle.id)}
                    className={`px-4 py-3 rounded-2xl text-left border transition-all cursor-pointer shrink-0 flex items-center gap-3 ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/25 scale-[1.02] ring-2 ring-blue-400/30'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {getBundleIcon(bundle.id)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black tracking-tight">{bundle.title.split('(')[0]}</span>
                        {bundle.popular && (
                          <span className={`text-[9px] font-black px-1.5 py-0.2 rounded uppercase ${
                            isSelected ? 'bg-amber-400 text-slate-950 font-black' : 'bg-amber-100 text-amber-800'
                          }`}>
                            HOT
                          </span>
                        )}
                      </div>
                      <div className={`text-[10px] font-mono font-bold mt-0.5 ${
                        isSelected ? 'text-blue-100' : 'text-slate-500'
                      }`}>
                        {formatVND(bundle.bundlePrice)} • Tiết kiệm {bundle.discountPercent}%
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Scroll Right Button for Tabs */}
            <button
              type="button"
              onClick={() => handleScrollTabs('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-7 h-7 rounded-full bg-white text-slate-800 shadow-md border border-slate-200 flex items-center justify-center z-10 hover:bg-slate-50 cursor-pointer active:scale-95 transition-all opacity-0 group-hover/tabs:opacity-100 pointer-events-none group-hover/tabs:pointer-events-auto duration-200"
              title="Trượt tab sang phải"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* ACTIVE BUNDLE SHOWCASE CARD (CHI TIẾT 4 SẢN PHẨM & QUÀ TẶNG KÈM CỦA GÓI ĐANG CHỌN) */}
          {activeBundle && (
            <div className="bg-white rounded-3xl border-2 border-indigo-100 shadow-lg p-5 sm:p-7 text-left space-y-6 relative overflow-hidden transition-all">
              {/* Top Banner Tag & Pricing Box */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase text-white bg-gradient-to-r ${activeBundle.badgeColor || 'from-amber-500 to-orange-600'}`}>
                      {activeBundle.badge}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                      <Store className="w-3.5 h-3.5 text-blue-600" />
                      <span>Phù hợp: <strong className="text-slate-800">{activeBundle.targetAudience}</strong></span>
                    </span>

                    {/* Quick switch combo buttons (also syncs top banners) */}
                    {visibleBundles.length > 1 && (
                      <div className="flex items-center gap-1 ml-auto sm:ml-2">
                        <button
                          type="button"
                          onClick={handlePrevCombo}
                          className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-0.5 cursor-pointer active:scale-95 transition-colors"
                          title="Xem gói combo trước (Đồng bộ banner trên)"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span className="text-[10px]">Gói trước</span>
                        </button>
                        <span className="text-[10px] text-slate-500 font-bold px-1.5 bg-slate-100 py-1 rounded-md">
                          {activeBundleIndex + 1}/{visibleBundles.length}
                        </span>
                        <button
                          type="button"
                          onClick={handleNextCombo}
                          className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-0.5 cursor-pointer active:scale-95 transition-colors"
                          title="Xem gói combo tiếp theo (Đồng bộ banner trên)"
                        >
                          <span className="text-[10px]">Gói tiếp</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                    {activeBundle.title}
                  </h3>
                  <p className="text-xs text-slate-600">
                    {activeBundle.description}
                  </p>
                </div>

                {/* Price Box */}
                <div className="sm:text-right shrink-0 bg-gradient-to-br from-indigo-50/80 to-blue-50/50 p-4 rounded-2xl border border-indigo-100/80">
                  <div className="text-[10px] uppercase font-bold text-slate-400 line-through">
                    GIÁ MUA LẺ: {formatVND(activeBundle.originalPrice)}
                  </div>
                  <div className="text-xl sm:text-2xl font-black font-mono text-red-600 tracking-tight flex items-baseline gap-1 sm:justify-end">
                    <span>{formatVND(activeBundle.bundlePrice)}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 mt-1 bg-emerald-100 text-emerald-800 rounded-md text-[10px] font-black">
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>Tiết kiệm ngay {formatVND(activeBundle.savingAmount)} ({activeBundle.discountPercent}%)</span>
                  </div>
                </div>
              </div>

              {/* LIST OF INCLUDED PRODUCTS IN COMBO */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-600" />
                    <span>TRỌN BỘ {activeBundle.items.length} THIẾT BỊ ĐÃ BAO GỒM TRONG COMBO:</span>
                  </h4>
                  <span className="text-[10px] text-slate-400 font-bold">100% Hàng Mới Nguyên Hộp</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {activeBundle.items.map((item, idx) => {
                    const matchedProd = products.find((p) => p.id === item.productId)
                      || products.find((p) => p.name.toLowerCase().includes(item.name.toLowerCase().slice(0, 15)))
                      || products.find((p) => item.categoryLabel && p.categoryLabel?.toLowerCase().includes(item.categoryLabel.toLowerCase()));
                    const displayImg = item.image || matchedProd?.image || 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=400&q=80';

                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          if (matchedProd && onOpenProductModal) {
                            onOpenProductModal(matchedProd.id);
                          }
                        }}
                        className={`group bg-slate-50/80 hover:bg-white rounded-2xl p-3.5 border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between relative ${matchedProd && onOpenProductModal ? 'cursor-pointer' : ''}`}
                      >
                        {/* Item Order Index */}
                        <div className="absolute top-2.5 left-2.5 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-[11px] font-black flex items-center justify-center border border-blue-200">
                          {idx + 1}
                        </div>

                        <div className="space-y-2.5 pt-1">
                          <div className="w-full h-32 rounded-xl bg-white border border-slate-150 overflow-hidden flex items-center justify-center p-2 relative">
                            <img
                              src={displayImg}
                              alt={item.name}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=400&q=80';
                              }}
                              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                            {item.categoryLabel && (
                              <span className="absolute bottom-1.5 left-1.5 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                                {item.categoryLabel}
                              </span>
                            )}
                          </div>

                          <div>
                            <h5 className="text-xs font-extrabold text-slate-800 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                              {item.name}
                            </h5>
                            {item.specsSummary && (
                              <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                                {item.specsSummary}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="pt-2.5 mt-2 border-t border-slate-200/60 flex items-center justify-between">
                          <div>
                            <div className="text-[9px] text-slate-400">Giá bán lẻ:</div>
                            <div className="text-xs font-bold font-mono text-slate-700">
                              {formatVND(item.price)}
                            </div>
                          </div>

                          {matchedProd && onOpenProductModal && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenProductModal(matchedProd.id);
                              }}
                              className="text-[11px] font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-0.5 cursor-pointer py-1 px-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                              <span>Chi tiết</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* BONUS GIFTS & COMMITMENT */}
              {activeBundle.bonusGifts && activeBundle.bonusGifts.length > 0 && (
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-amber-600" />
                    <h5 className="text-xs font-black uppercase text-amber-900 tracking-wider">
                      QUÀ TẶNG KÈM ĐỘC QUYỀN KHI MUA COMBO HÔM NAY:
                    </h5>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-amber-950 font-medium">
                    {activeBundle.bonusGifts.map((gift, gIdx) => (
                      <div key={gIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{gift}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ACTION BUTTONS & DELIVERY COMMITTMENT */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{showcaseConfig.deliveryCallout || 'Giao hàng & Lắp đặt trong 2 Giờ tại nội thành'}</span>
                </div>

                <div className="flex items-center gap-3">
                  {onConsultBundle && (
                    <button
                      type="button"
                      onClick={() => onConsultBundle(activeBundle)}
                      className="px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 font-extrabold text-xs sm:text-sm rounded-xl border border-slate-300 hover:border-slate-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs active:scale-95"
                    >
                      <PhoneCall className="w-4 h-4 text-blue-600" />
                      <span>{showcaseConfig.consultButtonText || 'Tư Vấn Tùy Biến Thêm/Bớt'}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={(e) => handleAdd(activeBundle, e)}
                    className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-md active:scale-95 ${
                      addedBundleId === activeBundle.id
                        ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                        : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-red-500/25'
                    }`}
                  >
                    {addedBundleId === activeBundle.id ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Đã Thêm Trọn Bộ Vào Giỏ Báo Giá!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>{showcaseConfig.buyButtonPrefix || 'Đặt Mua Trọn Gói'} (Tiết kiệm {formatVND(activeBundle.savingAmount)})</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
