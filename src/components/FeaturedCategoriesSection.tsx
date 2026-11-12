import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { MainCategory, Product } from '../types';
import { 
  ChevronLeft,
  ChevronRight, 
  Sparkles, 
  Zap, 
  Printer, 
  Scan, 
  Barcode, 
  Fingerprint, 
  Calculator, 
  FileText, 
  ShoppingBag, 
  Laptop, 
  Smartphone, 
  Tv, 
  ShieldCheck,
  Layers,
  Camera,
  Wifi,
  Coins,
  Radio,
  Pause,
  Play,
  RotateCw
} from 'lucide-react';

interface FeaturedCategoriesSectionProps {
  categories: MainCategory[];
  products?: Product[];
  onSelectCategory: (categoryId: string) => void;
  title?: string;
  className?: string;
  isCompact?: boolean;
  autoSlide?: boolean; // Tự động trượt (mặc định: false - khách tự trượt theo yêu cầu)
  slideIntervalSeconds?: number; // Thời gian tự trượt (mặc định: 20 giây nếu bật)
}

export const FeaturedCategoriesSection: React.FC<FeaturedCategoriesSectionProps> = ({
  categories,
  products = [],
  onSelectCategory,
  title = 'Danh mục nổi bật',
  className = '',
  isCompact = false,
  autoSlide = false,
  slideIntervalSeconds = 20
}) => {
  // 1. Lọc danh sách danh mục: Khi một sản phẩm được bấm chọn nổi bật thì danh mục đó mới được hiện ở đây
  const displayList = useMemo(() => {
    // Tìm các danh mục có sản phẩm được chọn nổi bật
    const catsWithFeaturedProds = categories.filter((cat) => {
      if (cat.isVisible === false) return false;
      const hasFeaturedProd = products.some(
        (p) =>
          (p.isPopular === true || p.isFeatured === true) &&
          (p.category === cat.id || p.category === cat.name || p.subCategoryId === cat.id)
      );
      return hasFeaturedProd || cat.isFeatured === true;
    });

    if (catsWithFeaturedProds.length > 0) {
      return catsWithFeaturedProds.sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99));
    }

    // Fallback nếu chưa có danh mục/sản phẩm nào tick nổi bật
    return categories
      .filter((cat) => cat.isVisible !== false)
      .sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99));
  }, [categories, products]);

  // 2. Responsive column calculation:
  // Thiết lập chuẩn theo yêu cầu:
  // - Máy tính (Desktop): 8 cột × 2 dòng = 16 danh mục / trang
  // - Điện thoại (<640px hoặc isCompact): 5 cột × 2 dòng = 10 danh mục / trang
  const [colsPerPage, setColsPerPage] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      if (isCompact || window.innerWidth < 640) return 5;
      return 8; // Desktop & Tablet: 8 cột x 2 dòng = 16 danh mục
    }
    return isCompact ? 5 : 8;
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (isCompact || width < 640) {
        setColsPerPage(5);
      } else {
        setColsPerPage(8); // Desktop: chuẩn 8 cột x 2 dòng = 16 danh mục
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isCompact]);

  // Luôn luôn là 2 dòng (trên & dưới): số phần tử trên 1 trang = colsPerPage * 2
  // Máy tính: 8 cột × 2 dòng = 16 danh mục / trang
  // Điện thoại: 5 cột × 2 dòng = 10 danh mục / trang
  const itemsPerPage = Math.max(2, colsPerPage * 2);
  const totalPages = Math.max(1, Math.ceil(displayList.length / itemsPerPage));

  // 3. State điều khiển slide
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  // Đảm bảo currentPage hợp lệ khi totalPages thay đổi
  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(0);
    }
  }, [totalPages, currentPage]);

  // 4. Timer 20 giây tự trượt qua trang tiếp theo (Chuẩn xác 20s tự trượt)
  const intervalMs = Math.max(3000, (slideIntervalSeconds || 20) * 1000);

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
    setProgressPercent(0);
  }, [totalPages]);

  const goToPrevPage = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    setProgressPercent(0);
  }, [totalPages]);

  const goToPage = useCallback((pageIndex: number) => {
    setCurrentPage(pageIndex);
    setProgressPercent(0);
  }, []);

  // Tự động trượt sau đúng 20s (Tạm dừng khi khách rê chuột vào danh mục theo yêu cầu)
  useEffect(() => {
    if (!autoSlide || totalPages <= 1 || isPaused) {
      return;
    }

    const timer = setInterval(() => {
      goToNextPage();
    }, intervalMs);

    return () => clearInterval(timer);
  }, [autoSlide, totalPages, isPaused, intervalMs, goToNextPage]);

  // Cập nhật thanh tiến trình chạy 20s mượt mà (Giữ nguyên tiến trình khi isPaused = true)
  useEffect(() => {
    if (!autoSlide || totalPages <= 1) {
      setProgressPercent(0);
      return;
    }

    if (isPaused) {
      return; // Khách đang rê chuột vào danh mục -> ngưng thanh tiến trình
    }

    const stepMs = 100;
    const increment = (stepMs / intervalMs) * 100;
    const pTimer = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 100) return 0;
        return prev + increment;
      });
    }, stepMs);

    return () => clearInterval(pTimer);
  }, [autoSlide, totalPages, isPaused, intervalMs, currentPage]);

  // 5. Hỗ trợ cảm ứng vuốt (Swipe) trên điện thoại và kéo chuột
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      const threshold = 40; // Ngưỡng vuốt tối thiểu 40px
      if (diff > threshold) {
        goToNextPage(); // Vuốt sang trái -> xem trang sau
      } else if (diff < -threshold) {
        goToPrevPage(); // Vuốt sang phải -> xem trang trước
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setIsPaused(false);
  };

  // 6. Phân trang dữ liệu thành 2 HÀNG (HÀNG TRÊN & HÀNG DƯỚI)
  // Máy tính: 8 cột / hàng (16 danh mục / trang: 8 trên + 8 dưới)
  // Điện thoại: 5 cột / hàng (10 danh mục / trang: 5 trên + 5 dưới)
  const pagesData = useMemo(() => {
    const pages = [];
    for (let p = 0; p < totalPages; p++) {
      const pageSlice = displayList.slice(p * itemsPerPage, (p + 1) * itemsPerPage);
      // Chia thành 2 hàng: Hàng 1 chứa tối đa colsPerPage (8 trên desktop, 5 trên mobile)
      const topRow = pageSlice.slice(0, colsPerPage);
      const bottomRow = pageSlice.slice(colsPerPage);
      pages.push({ topRow, bottomRow });
    }
    return pages;
  }, [displayList, itemsPerPage, totalPages, colsPerPage]);

  // 7. Lấy ảnh danh mục hoặc fallback
  const getCategoryImage = (cat: MainCategory): string | null => {
    if (cat.imageUrl && cat.imageUrl.trim().length > 0) {
      return cat.imageUrl;
    }
    const productWithImg = products.find(
      (p) => p.category === cat.id && (p.image || (p.images && p.images.length > 0))
    );
    if (productWithImg) {
      return productWithImg.image || (productWithImg.images && productWithImg.images[0]) || null;
    }
    return null;
  };

  // Helper render fallback icon khi chưa có ảnh
  const renderFallbackIcon = (catId: string, catName: string) => {
    const id = (catId || '').toLowerCase();
    const name = (catName || '').toLowerCase();
    const iconClass = "w-6 h-6 min-[380px]:w-7 min-[380px]:h-7 sm:w-8 sm:h-8";
    if (id.includes('attendance') || name.includes('chấm công')) return <Fingerprint className={`${iconClass} text-blue-600`} />;
    if (id.includes('printer') || name.includes('in')) return <Printer className={`${iconClass} text-emerald-600`} />;
    if (id.includes('scanner') || name.includes('quét')) return <Scan className={`${iconClass} text-purple-600`} />;
    if (id.includes('label') || name.includes('tem')) return <Barcode className={`${iconClass} text-teal-600`} />;
    if (id.includes('drawer') || name.includes('két') || name.includes('hộp')) return <Calculator className={`${iconClass} text-orange-600`} />;
    if (id.includes('consumable') || name.includes('giấy')) return <FileText className={`${iconClass} text-rose-600`} />;
    if (id.includes('pos') || name.includes('bán hàng')) return <ShoppingBag className={`${iconClass} text-amber-600`} />;
    if (id.includes('camera') || name.includes('an ninh')) return <Camera className={`${iconClass} text-indigo-600`} />;
    if (id.includes('network') || id.includes('wifi') || name.includes('mạng')) return <Wifi className={`${iconClass} text-cyan-600`} />;
    if (id.includes('counter') || name.includes('đếm tiền')) return <Coins className={`${iconClass} text-yellow-600`} />;
    if (id.includes('phone') || name.includes('thoại') || name.includes('bộ đàm')) return <Smartphone className={`${iconClass} text-blue-500`} />;
    if (id.includes('laptop') || name.includes('máy tính')) return <Laptop className={`${iconClass} text-indigo-600`} />;
    if (id.includes('tv') || name.includes('tivi')) return <Tv className={`${iconClass} text-red-500`} />;
    if (id.includes('software') || name.includes('phần mềm')) return <ShieldCheck className={`${iconClass} text-sky-600`} />;
    return <Layers className={`${iconClass} text-blue-600`} />;
  };

  // Render 1 nút danh mục đơn lẻ (Tạm dừng trượt khi rê chuột)
  const renderCategoryItem = (cat: MainCategory) => {
    const imgUrl = getCategoryImage(cat);
    const hasBadge = !!cat.badge && cat.badge.trim().length > 0;

    return (
      <button
        key={cat.id}
        type="button"
        onClick={() => onSelectCategory(cat.id)}
        onMouseEnter={() => setIsPaused(true)}
        className="group flex flex-col items-center text-center p-1 sm:p-1.5 md:p-2 rounded-xl sm:rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200/80 transition-all duration-200 cursor-pointer relative active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500/20 w-full"
        title={`Xem danh mục ${cat.name}`}
      >
        {/* Hộp chứa ảnh + huy hiệu */}
        <div className="relative w-11 h-11 min-[380px]:w-12 min-[380px]:h-12 sm:w-14 sm:h-14 md:w-15 md:h-15 lg:w-16 lg:h-16 flex items-center justify-center mb-1 sm:mb-1.5 shrink-0">
          {hasBadge && (
            <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-red-600 text-white font-black text-[7px] min-[380px]:text-[7.5px] sm:text-[8px] md:text-[8.5px] px-1 sm:px-1.5 py-0.2 rounded-full whitespace-nowrap shadow-xs z-20 uppercase tracking-tight flex items-center gap-0.5 border border-white">
              <Zap className="w-2 h-2 fill-white" />
              <span>{cat.badge}</span>
            </span>
          )}

          <div className="w-full h-full rounded-xl sm:rounded-2xl flex items-center justify-center p-1 overflow-hidden transition-transform duration-300 group-hover:scale-110">
            {imgUrl ? (
              <img
                src={imgUrl}
                alt={cat.name}
                className="w-full h-full object-contain filter group-hover:brightness-105 transition-all"
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    const fallbackBox = document.createElement('div');
                    fallbackBox.className = 'p-2 bg-slate-100 rounded-xl text-slate-400 font-bold text-xs';
                    fallbackBox.textContent = (cat.name || '').substring(0, 2).toUpperCase();
                    parent.replaceChildren(fallbackBox);
                  }
                }}
              />
            ) : (
              <div className="w-full h-full bg-slate-100 rounded-xl sm:rounded-2xl flex items-center justify-center">
                {renderFallbackIcon(cat.id, cat.name)}
              </div>
            )}
          </div>
        </div>

        {/* Tên danh mục (Hiện đầy đủ chữ chứ không có dấu ... theo yêu cầu người dùng) */}
        <span className="text-[10px] min-[380px]:text-[10.5px] sm:text-[11px] md:text-xs font-bold text-slate-800 group-hover:text-red-600 leading-snug transition-colors break-words w-full px-0.5 text-center">
          {cat.name}
        </span>
      </button>
    );
  };

  if (displayList.length === 0) {
    return null;
  }

  return (
    <section 
      aria-label="Danh mục sản phẩm nổi bật"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`bg-white rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 shadow-sm border border-slate-200/90 transition-all relative overflow-hidden ${className}`}
    >
      {/* 1. Header Bar: Tiêu đề + Nút điều khiển mũi tên (Gọn gàng, tinh tế) */}
      <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100 mb-3 sm:mb-4">
        {/* Tiêu đề bên trái */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shrink-0" />
          <h2 className="text-sm sm:text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-1.5 sm:gap-2">
            <span>{title}</span>
          </h2>
        </div>

        {/* Nhóm điều khiển bên phải: Nút mũi tên + Xem tất cả */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Nút mũi tên trượt trái / phải */}
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={goToPrevPage}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 flex items-center justify-center transition-colors cursor-pointer border border-slate-200/80 hover:border-red-300"
                title="Trượt sang trái"
                aria-label="Trượt sang trái"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={goToNextPage}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 flex items-center justify-center transition-colors cursor-pointer border border-slate-200/80 hover:border-red-300"
                title="Trượt sang phải"
                aria-label="Trượt sang phải"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Nút Xem tất cả */}
          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            className="text-[11px] sm:text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-0.5 group cursor-pointer transition-colors shrink-0"
            title="Xem tất cả danh mục sản phẩm"
          >
            <span>Tất cả</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* 2. KHỐI HIỂN THỊ CHÍNH: CHUẨN 10 CỘT X 2 DÒNG (MÁY TÍNH) & 5 CỘT X 2 DÒNG (ĐIỆN THOẠI) */}
      <div 
        className="relative w-full overflow-hidden select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Track trượt mượt mà bằng CSS Transform 700ms */}
        <div 
          className="flex w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {pagesData.map((page, pageIdx) => (
            <div 
              key={pageIdx} 
              className="w-full shrink-0 flex flex-col gap-2 sm:gap-3"
            >
              {/* DÒNG 1: HÀNG TRÊN (8 Cột trên Máy tính, 5 Cột trên Điện thoại) */}
              <div 
                className={`grid ${
                  isCompact 
                    ? 'grid-cols-5 gap-1 min-[380px]:gap-1.5' 
                    : 'grid-cols-5 sm:grid-cols-8 lg:grid-cols-8 gap-1 sm:gap-2 md:gap-2.5'
                } items-start`}
              >
                {page.topRow.map((cat) => renderCategoryItem(cat))}
              </div>

              {/* DÒNG 2: HÀNG DƯỚI */}
              {page.bottomRow.length > 0 && (
                <div 
                  className={`grid ${
                    isCompact 
                      ? 'grid-cols-5 gap-1 min-[380px]:gap-1.5' 
                      : 'grid-cols-5 sm:grid-cols-8 lg:grid-cols-8 gap-1 sm:gap-2 md:gap-2.5'
                  } items-start`}
                >
                  {page.bottomRow.map((cat) => renderCategoryItem(cat))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Footer Bar: Thanh tiến trình 10s + Dấu chấm phân trang (Pagination Dots) */}
      {totalPages > 1 && (
        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Thanh tiến trình thời gian tự động trượt (chỉ hiện khi bật autoSlide) */}
          {autoSlide ? (
            <div className="w-full sm:w-48 h-1 bg-slate-100 rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-gradient-to-r from-red-500 to-amber-500 transition-all duration-100 ease-linear rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          ) : (
            <div />
          )}

          {/* Dấu chấm chuyển trang (Dots) & Chỉ báo số trang */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToPage(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentPage === idx 
                    ? 'w-6 h-2 bg-red-600 shadow-xs' 
                    : 'w-2 h-2 bg-slate-200 hover:bg-slate-400'
                }`}
                title={`Chuyển đến trang danh mục ${idx + 1}`}
                aria-label={`Trang danh mục ${idx + 1}`}
              />
            ))}
            <span className="text-[10px] font-mono font-bold text-slate-400 ml-1.5">
              {currentPage + 1}/{totalPages}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
