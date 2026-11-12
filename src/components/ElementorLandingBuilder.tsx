import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Eye, 
  Copy, 
  Save, 
  Check, 
  ExternalLink, 
  Layers, 
  Image as ImageIcon, 
  Video, 
  Clock, 
  Grid, 
  DollarSign, 
  Users, 
  FileText, 
  HelpCircle, 
  Smartphone, 
  Monitor, 
  Settings, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Zap, 
  Flame, 
  ArrowRight, 
  PhoneCall, 
  MessageSquare, 
  CheckCircle2, 
  X,
  Palette,
  ArrowUp,
  ArrowDown,
  Globe,
  Sliders,
  Maximize2,
  Play
} from 'lucide-react';
import { Product, ElementorLandingPage, LandingPageBlock, LandingBlockType } from '../types';
import { ZaloIcon } from './ZaloIcon';

interface ElementorLandingBuilderProps {
  products: Product[];
  landingPages: ElementorLandingPage[];
  onSaveLandingPages: (pages: ElementorLandingPage[]) => void;
  onPreviewLivePage: (page: ElementorLandingPage) => void;
  showToast: (msg: string) => void;
  primaryPhone?: string;
  zaloLink?: string;
}

// ----------------- DEFAULT TEMPLATES CHO ELEMENTOR -----------------
export const DEFAULT_ELEMENTOR_TEMPLATES: ElementorLandingPage[] = [
  {
    id: 'landing-pos-promo',
    slug: 'giai-phap-pos-ban-hang-2026',
    title: 'Trọn Bộ Máy Bán Hàng POS Cảm Ứng & Máy In Bill Giá Sốc 2026',
    metaDescription: 'Khuyến mãi đặc biệt trọn bộ máy bán hàng POS cảm ứng, tặng kèm phần mềm quản lý trọn đời, lắp đặt tận nơi miễn phí.',
    themeColor: '#CD1818',
    isPublished: true,
    createdAt: '2026-10-01',
    updatedAt: '2026-10-08',
    viewsCount: 1420,
    leadsCount: 86,
    blocks: [
      {
        id: 'block-hero-1',
        type: 'hero',
        badge: 'ƯU ĐÃI KHAI TRƯƠNG & XẢ KHO 2026',
        title: 'BỨT PHÁ DOANH THU VỚI TRỌN BỘ MÁY BÁN HÀNG POS CAO CẤP',
        subtitle: 'Giải pháp thanh toán siêu tốc 3 giây - Quản lý kho, doanh thu tự động từ xa trên điện thoại. Tặng phần mềm trọn đời!',
        buttonText: 'NHẬN BÁO GIÁ & ƯU ĐÃI NGAY',
        buttonLink: '#lead-form',
        secondaryButtonText: 'XEM VIDEO THỰC TẾ',
        secondaryButtonLink: '#video-demo',
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80',
        bgColor: 'from-slate-950 via-slate-900 to-red-950',
        isVisible: true
      },
      {
        id: 'block-countdown-1',
        type: 'countdown',
        title: '⚡ CHƯƠNG TRÌNH TRỢ GIÁ ĐẶC BIỆT KẾT THÚC SAU',
        subtitle: 'Chỉ còn 15 suất ưu đãi tặng máy in mã vạch cho khách hàng đăng ký sớm nhất trong hôm nay!',
        countdownHours: 36,
        bgColor: '#B91C1C',
        isVisible: true
      },
      {
        id: 'block-features-1',
        type: 'features',
        title: 'TẠI SAO HƠN 5.000+ CỬA HÀNG TIN CHỌN SOLUTION B A O?',
        subtitle: 'Trang thiết bị chuẩn công nghiệp - Hoạt động bền bỉ, mượt mà 24/7',
        items: [
          { title: 'Lắp Đặt Tận Nơi 2 Giờ', desc: 'Kỹ thuật viên đến trực tiếp khảo sát và hướng dẫn vận hành chi tiết.', icon: 'truck' },
          { title: 'Tặng Phần Mềm Trọn Đời', desc: 'Không phí duy trì hàng tháng, dùng trọn đời trên máy POS và Smartphone.', icon: 'award' },
          { title: 'Bảo Hành 1 Đổi 1', desc: 'Đổi máy mới ngay trong 12 tháng nếu phát sinh lỗi kỹ thuật của nhà sản xuất.', icon: 'shield' },
          { title: 'Hỗ Trợ Kỹ Thuật 24/7', desc: 'Kết nối qua UltraViewer xử lý mọi thắc mắc ngay trong 5 phút.', icon: 'headphones' }
        ],
        isVisible: true
      },
      {
        id: 'block-products-1',
        type: 'products',
        title: 'DANH SÁCH THIẾT BỊ GIẢM GIÁ ĐẾN 45%',
        subtitle: 'Bấm chọn thiết bị để nhận chiết khấu trực tiếp và quà tặng phụ kiện',
        productIds: [],
        isVisible: true
      },
      {
        id: 'block-pricing-1',
        type: 'pricing',
        title: 'BẢNG GIÁ CÁC GÓI COMBO KHUYÊN DÙNG',
        subtitle: 'Lựa chọn gói giải pháp phù hợp với quy mô kinh doanh của bạn',
        items: [
          {
            name: 'GÓI KHỞI NGHIỆP',
            price: '3.990.000đ',
            originalPrice: '5.500.000đ',
            popular: false,
            features: [
              'Máy in hóa đơn nhiệt K80 tự cắt giấy',
              'Két đựng tiền thu ngân 4 ngăn kẹp',
              'Tặng 10 cuộn giấy in K80 cao cấp',
              'Bảo hành 12 tháng chính hãng'
            ],
            buttonText: 'Đăng Ký Gói Khởi Nghiệp'
          },
          {
            name: 'GÓI CHUYÊN NGHIỆP',
            price: '8.490.000đ',
            originalPrice: '12.000.000đ',
            popular: true,
            features: [
              'Máy POS cảm ứng 15 inch mượt mà',
              'Máy in hóa đơn nhiệt K80 siêu tốc',
              'Két thu ngân cảm ứng đóng mở tự động',
              'Phần mềm bán hàng vĩnh viễn',
              'Miễn phí lắp đặt tận nơi'
            ],
            buttonText: 'Nhận Ưu Đãi Gói Này'
          },
          {
            name: 'GÓI DOANH NGHIỆP / CHUỖI',
            price: '14.990.000đ',
            originalPrice: '19.500.000đ',
            popular: false,
            features: [
              'Máy POS cảm ứng 2 màn hình phụ khách',
              'Máy in hóa đơn K80 LAN/Wifi',
              'Máy quét mã vạch 2D đa tia siêu nhạy',
              'Hệ thống quản lý chuỗi nhiều chi nhánh',
              'Hỗ trợ kỹ thuật ưu tiên VIP 24/7'
            ],
            buttonText: 'Tư Vấn Gói Chuỗi'
          }
        ],
        isVisible: true
      },
      {
        id: 'block-testimonials-1',
        type: 'testimonials',
        title: 'KHÁCH HÀNG NÓI GÌ VỀ CHÚNG TÔI?',
        subtitle: 'Hơn 5.000+ nhà hàng, siêu thị mini, shop thời trang đã triển khai thành công',
        items: [
          {
            name: 'Anh Trần Minh Trí',
            role: 'Chủ chuỗi trà sữa T-Tea',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            comment: 'Lắp 4 bộ POS cho 4 chi nhánh của mình. Máy cảm ứng rất nhạy, in bill nhanh, các bạn kỹ thuật hỗ trợ cài đặt Ultraviewer rất chu đáo!',
            rating: 5
          },
          {
            name: 'Chị Nguyễn Thanh Hương',
            role: 'Quản lý siêu thị Mini Mart',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
            comment: 'Máy quét mã vạch quét cả mã QR mờ rất nhạy. Phần mềm dễ dùng, nhân viên mới vào chỉ 10 phút là biết tính tiền trơn tru.',
            rating: 5
          }
        ],
        isVisible: true
      },
      {
        id: 'block-leadform-1',
        type: 'lead_form',
        title: 'ĐĂNG KÝ NHẬN TƯ VẤN & BÁO GIÁ CHIẾT KHẤU ĐẶC BIỆT',
        subtitle: 'Chuyên viên kỹ thuật sẽ gọi lại trong 5 phút để tư vấn giải pháp tối ưu chi phí nhất',
        buttonText: 'GỬI ĐĂNG KÝ - NHẬN NGAY VOUCHER 500K',
        isVisible: true
      },
      {
        id: 'block-faq-1',
        type: 'faq',
        title: 'CÂU HỎI THƯỜNG GẶP',
        subtitle: 'Giải đáp nhanh những băn khoăn của khách hàng trước khi đặt mua',
        items: [
          { q: 'Cửa hàng ở tỉnh xa có được hỗ trợ lắp đặt không?', a: 'Công ty hỗ trợ giao hàng tận nơi toàn quốc qua Viettel Post/GHTK, kiểm tra máy xong mới thanh toán và có kỹ thuật viên gọi video + UltraViewer hướng dẫn tận tình 1-1.' },
          { q: 'Phần mềm có mất phí duy trì hàng tháng không?', a: 'Hoàn toàn KHÔNG! Chúng tôi cung cấp phần mềm dùng trọn đời, không thu phí thuê bao tháng hay năm, giúp quý khách tiết kiệm chi phí tối đa.' },
          { q: 'Nếu máy gặp trục trặc thì bảo hành thế nào?', a: 'Sản phẩm được bảo hành chính hãng 12-24 tháng và áp dụng chính sách 1 đổi 1 trong 30 ngày đầu tiên nếu có lỗi kỹ thuật.' }
        ],
        isVisible: true
      }
    ]
  },
  {
    id: 'landing-cham-cong',
    slug: 'may-cham-cong-van-phong-gia-re',
    title: 'Giải Pháp Máy Chấm Công Vân Tay & Khuôn Mặt Cho Doanh Nghiệp',
    metaDescription: 'Máy chấm công chính hãng Ronald Jack, ZKTeco - Tặng phần mềm tính lương tự động xuất file Excel.',
    themeColor: '#2563EB',
    isPublished: true,
    createdAt: '2026-10-02',
    updatedAt: '2026-10-08',
    viewsCount: 890,
    leadsCount: 52,
    blocks: [
      {
        id: 'block-hero-2',
        type: 'hero',
        badge: 'GIẢI PHÁP NHÂN SỰ TOÀN DIỆN',
        title: 'KIỂM SOÁT VÀO RA CHÍNH XÁC - TÍNH LƯƠNG TỰ ĐỘNG CHỈ 1 CLICK',
        subtitle: 'Dòng máy chấm công vân tay & Face ID AI chống chấm công hộ. Tặng kèm trọn bộ phần mềm chấm công xuất Excel tiếng Việt.',
        buttonText: 'NHẬN TƯ VẤN MÁY PHÙ HỢP',
        buttonLink: '#lead-form',
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        bgColor: 'from-slate-950 via-blue-950 to-slate-900',
        isVisible: true
      },
      {
        id: 'block-features-2',
        type: 'features',
        title: 'ƯU ĐIỂM VƯỢT TRỘI CỦA THIẾT BỊ',
        subtitle: 'Chuẩn xác từng giây - Hoạt động ổn định cả khi mất điện',
        items: [
          { title: 'Nhận Diện AI 0.2 Giây', desc: 'Quét vân tay và khuôn mặt cực nhanh, không gây ùn tắc giờ cao điểm.', icon: 'zap' },
          { title: 'Pin Lưu Điện 4 - 8 Giờ', desc: 'Tích hợp pin dự phòng, không lo mất dữ liệu khi cúp điện đột ngột.', icon: 'battery' },
          { title: 'Báo Cáo Đi Trễ / Về Sớm', desc: 'Phần mềm tự động thống kê tăng ca, ngày nghỉ phép chuẩn xác.', icon: 'file' },
          { title: 'Quản Lý Nhiều Chi Nhánh', desc: 'Đồng bộ dữ liệu chấm công từ xa qua mạng Internet tập trung về trụ sở.', icon: 'cloud' }
        ],
        isVisible: true
      },
      {
        id: 'block-leadform-2',
        type: 'lead_form',
        title: 'ĐĂNG KÝ KHẢO SÁT & BÁO GIÁ LẮP ĐẶT MIỄN PHÍ',
        subtitle: 'Để lại thông tin nhân viên kỹ thuật sẽ tư vấn dòng máy có dung lượng phù hợp với số lượng nhân sự',
        buttonText: 'GỬI ĐĂNG KÝ TƯ VẤN',
        isVisible: true
      }
    ]
  },
  {
    id: 'landing-may-in-bill',
    slug: 'may-in-hoa-don-k80-chinh-hang',
    title: 'Máy In Hóa Đơn K80 Tự Cắt Giấy & Máy Quét Mã Vạch 2D',
    metaDescription: 'Máy in bill K80 kết nối LAN/Wifi/USB siêu bền, bảo hành 12 tháng, tặng kèm 10 cuộn giấy in nhiệt cao cấp.',
    themeColor: '#059669',
    isPublished: true,
    createdAt: '2026-10-04',
    updatedAt: '2026-10-08',
    viewsCount: 1120,
    leadsCount: 64,
    blocks: [
      {
        id: 'block-hero-3',
        type: 'hero',
        badge: 'BÁN CHẠY NHẤT 2026',
        title: 'MÁY IN HÓA ĐƠN K80 TỰ ĐỘNG CẮT GIẤY & QUÉT MÃ VẠCH SIÊU NHANH',
        subtitle: 'In hóa đơn siêu tốc 250mm/s, dao cắt thép Nhật Bản 1.5 triệu lần cắt. Kết nối cổng LAN/USB/Wifi in từ điện thoại cực tiện lợi.',
        buttonText: 'MUA NGAY - TẶNG 10 CUỘN GIẤY',
        buttonLink: '#lead-form',
        secondaryButtonText: 'XEM THÔNG SỐ',
        secondaryButtonLink: '#lead-form',
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80',
        bgColor: 'from-slate-950 via-emerald-950 to-slate-900',
        isVisible: true
      },
      {
        id: 'block-cta-3',
        type: 'cta_banner',
        badge: 'QUÀ TẶNG KÈM TRỊ GIÁ 300.000Đ',
        title: 'TẶNG NGAY 10 CUỘN GIẤY IN K80 BỌC BẠC CHỐNG ẨM',
        subtitle: 'Miễn phí giao hàng toàn quốc - Bảo hành đổi mới trong 30 ngày',
        buttonText: 'GỌI ĐẶT HÀNG NGAY',
        buttonLink: '#lead-form',
        bgColor: 'from-emerald-600 via-teal-600 to-cyan-600',
        isVisible: true
      },
      {
        id: 'block-leadform-3',
        type: 'lead_form',
        title: 'NHẬN BÁO GIÁ ĐẠI LÝ & GIAO HÀNG HÔM NAY',
        subtitle: 'Giao hàng hỏa tốc trong 2 giờ tại TP.HCM & Hà Nội',
        buttonText: 'GỬI ĐĂNG KÝ MUA HÀNG',
        isVisible: true
      }
    ]
  },
  {
    id: 'landing-flash-sale',
    slug: 'flash-sale-xa-kho-cuoi-tuan',
    title: 'Xả Kho Thiết Bị Thu Ngân - Giảm Giá Sốc Lên Đến 50%',
    metaDescription: 'Chương trình xả kho thiết bị POS, máy in, máy chấm công giá tốt nhất thị trường.',
    themeColor: '#EA580C',
    isPublished: true,
    createdAt: '2026-10-05',
    updatedAt: '2026-10-08',
    viewsCount: 2340,
    leadsCount: 142,
    blocks: [
      {
        id: 'block-hero-4',
        type: 'hero',
        badge: 'ĐẠI TIỆC XẢ KHO CUỐI TUẦN',
        title: 'GIẢM GIÁ ĐẾN 50% TOÀN BỘ THIẾT BỊ BÁN HÀNG & CHẤM CÔNG',
        subtitle: 'Chỉ diễn ra trong 3 ngày cuối tuần. Cơ hội vàng sở hữu trọn bộ thiết bị cửa hàng với chi phí rẻ nhất năm!',
        buttonText: 'CHỐT ĐƠN GIẢM 50% NGAY',
        buttonLink: '#lead-form',
        imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=80',
        bgColor: 'from-slate-950 via-orange-950 to-red-950',
        isVisible: true
      },
      {
        id: 'block-countdown-4',
        type: 'countdown',
        title: '⚡ CHỈ CÒN DUY NHẤT 20 SUẤT ƯU ĐÃI',
        subtitle: 'Hệ thống tự động đóng cổng nhận đơn khi hết thời gian đếm ngược',
        countdownHours: 24,
        bgColor: '#C2410C',
        isVisible: true
      },
      {
        id: 'block-leadform-4',
        type: 'lead_form',
        title: 'ĐẶT GIỮ CHỖ ƯU ĐÃI GIẢM 50% TRONG HÔM NAY',
        subtitle: 'Để lại SĐT để giữ giá khuyến mãi, kỹ thuật viên sẽ gọi xác nhận đơn hàng',
        buttonText: 'ĐẶT GIỮ GIÁ KHUYẾN MÃI',
        isVisible: true
      }
    ]
  }
];

export const ElementorLandingBuilder: React.FC<ElementorLandingBuilderProps> = ({
  products,
  landingPages,
  onSaveLandingPages,
  onPreviewLivePage,
  showToast,
  primaryPhone = '0901.234.567',
  zaloLink = 'https://zalo.me'
}) => {
  // Current editing page
  const [pages, setPages] = useState<ElementorLandingPage[]>(() => {
    if (landingPages && landingPages.length > 0) return landingPages;
    return DEFAULT_ELEMENTOR_TEMPLATES;
  });

  const [activePageId, setActivePageId] = useState<string>(() => {
    return pages[0]?.id || 'landing-pos-promo';
  });

  // Mode: 'list' (quản lý danh sách), 'editor' (chế độ thiết kế Elementor), 'preview' (xem trước)
  const [viewMode, setViewMode] = useState<'list' | 'editor' | 'preview'>('editor');
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);

  // New page modal state
  const [isCreatingNewPage, setIsCreatingNewPage] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string>('pos');

  // Leads CRM modal state
  const [showLeadsModal, setShowLeadsModal] = useState(false);

  // Load leads from localStorage
  const landingLeads = useMemo(() => {
    try {
      const saved = localStorage.getItem('solutionbao_consultations');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((c: any) => c.note && c.note.includes('[Landing Page:'));
        }
      }
    } catch {}
    return [];
  }, [showLeadsModal]);

  const handleCopyLandingLink = (slug?: string) => {
    const targetSlug = slug || currentPage?.slug;
    if (!targetSlug) return;
    const fullUrl = `${window.location.origin}/?landing=${targetSlug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl);
      showToast(`Đã sao chép link trang quảng cáo: ${fullUrl}`);
    } else {
      showToast(`Link quảng cáo: ${fullUrl}`);
    }
  };

  // Currently selected page
  const currentPage = useMemo(() => {
    return pages.find((p) => p.id === activePageId) || pages[0];
  }, [pages, activePageId]);

  // Persist helper
  const savePagesToStateAndStorage = (newPages: ElementorLandingPage[]) => {
    setPages(newPages);
    onSaveLandingPages(newPages);
    try {
      localStorage.setItem('nbt_elementor_landing_pages', JSON.stringify(newPages));
    } catch (e) {
      console.warn('Cannot save landing pages to localStorage', e);
    }
  };

  // Block management functions
  const handleUpdateBlock = (blockId: string, updatedFields: Partial<LandingPageBlock>) => {
    if (!currentPage) return;
    const updatedBlocks = currentPage.blocks.map((b) => (b.id === blockId ? { ...b, ...updatedFields } : b));
    const updatedPage = { ...currentPage, blocks: updatedBlocks, updatedAt: new Date().toISOString().split('T')[0] };
    const updatedPages = pages.map((p) => (p.id === currentPage.id ? updatedPage : p));
    savePagesToStateAndStorage(updatedPages);
  };

  const handleAddBlock = (type: LandingBlockType) => {
    if (!currentPage) return;
    const newBlock: LandingPageBlock = {
      id: `block-${type}-${Date.now()}`,
      type,
      title: type === 'hero' 
        ? 'TIÊU ĐỀ KHUYẾN MÃI MỚI' 
        : type === 'countdown' 
        ? '⚡ ƯU ĐÃI KẾT THÚC SAU' 
        : type === 'video'
        ? 'VIDEO TRẢI NGHIỆM THỰC TẾ'
        : type === 'gallery'
        ? 'DỰ ÁN & HÌNH ẢNH LẮP ĐẶT THỰC TẾ'
        : type === 'cta_banner'
        ? 'ƯU ĐÃI ĐẶC BIỆT CHỈ TRONG HÔM NAY!'
        : 'TIÊU ĐỀ KHỐI NỘI DUNG',
      subtitle: type === 'cta_banner'
        ? 'Gọi hotline ngay hoặc chat Zalo để nhận chiết khấu trực tiếp và gói quà tặng trị giá 500.000đ'
        : type === 'video'
        ? 'Xem cận cảnh độ nét và tốc độ vận hành thực tế của thiết bị'
        : 'Mô tả ngắn hấp dẫn thu hút khách hàng đọc tiếp...',
      badge: type === 'cta_banner' ? 'KHUYẾN MÃI GIỚI HẠN' : type === 'video' ? 'THỰC TẾ 100%' : undefined,
      buttonText: type === 'cta_banner' ? 'GỌI HOTLINE NGAY' : 'HÀNH ĐỘNG NGAY',
      buttonLink: '#lead-form',
      videoUrl: type === 'video' ? 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' : undefined,
      bgColor: type === 'cta_banner' ? 'from-red-600 via-rose-600 to-amber-600' : undefined,
      isVisible: true,
      items: type === 'features' ? [
        { title: 'Lắp Đặt Nhanh 2 Giờ', desc: 'Kỹ thuật viên giao tận nơi và hướng dẫn sử dụng chi tiết' },
        { title: 'Tặng Phần Mềm Trọn Đời', desc: 'Không thu phí duy trì hàng tháng, dùng trọn đời trên điện thoại & máy tính' },
        { title: 'Bảo Hành 1 Đổi 1', desc: 'Đổi mới thiết bị trong 12 tháng nếu có bất kỳ lỗi nào từ nhà sản xuất' }
      ] : type === 'faq' ? [
        { q: 'Cửa hàng ở tỉnh xa có được bảo hành tận nơi không?', a: 'Chúng tôi hỗ trợ kỹ thuật Ultraviewer từ xa 24/7 và giao hàng Viettel Post kiểm tra hàng trước khi thanh toán.' }
      ] : type === 'gallery' ? [
        { url: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80', caption: 'Lắp đặt chuỗi siêu thị' },
        { url: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=600&q=80', caption: 'Bộ máy POS nhà hàng' },
        { url: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=600&q=80', caption: 'Máy in bill quán cafe' },
        { url: 'https://images.unsplash.com/photo-1556742208-999815fca738?auto=format&fit=crop&w=600&q=80', caption: 'Két tiền và máy quét mã vạch' }
      ] : []
    };

    const updatedBlocks = [...currentPage.blocks, newBlock];
    const updatedPage = { ...currentPage, blocks: updatedBlocks, updatedAt: new Date().toISOString().split('T')[0] };
    const updatedPages = pages.map((p) => (p.id === currentPage.id ? updatedPage : p));
    savePagesToStateAndStorage(updatedPages);
    setEditingBlockId(newBlock.id);
    showToast(`Đã thêm khối "${type.toUpperCase()}" vào trang`);
  };

  const handleDeleteBlock = (blockId: string) => {
    if (!currentPage) return;
    const updatedBlocks = currentPage.blocks.filter((b) => b.id !== blockId);
    const updatedPage = { ...currentPage, blocks: updatedBlocks, updatedAt: new Date().toISOString().split('T')[0] };
    const updatedPages = pages.map((p) => (p.id === currentPage.id ? updatedPage : p));
    savePagesToStateAndStorage(updatedPages);
    if (editingBlockId === blockId) setEditingBlockId(null);
    showToast('Đã xóa khối nội dung');
  };

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    if (!currentPage) return;
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= currentPage.blocks.length) return;
    const updatedBlocks = [...currentPage.blocks];
    const temp = updatedBlocks[index];
    updatedBlocks[index] = updatedBlocks[newIndex];
    updatedBlocks[newIndex] = temp;

    const updatedPage = { ...currentPage, blocks: updatedBlocks, updatedAt: new Date().toISOString().split('T')[0] };
    const updatedPages = pages.map((p) => (p.id === currentPage.id ? updatedPage : p));
    savePagesToStateAndStorage(updatedPages);
  };

  const handleDuplicateBlock = (block: LandingPageBlock) => {
    if (!currentPage) return;
    const duplicated: LandingPageBlock = {
      ...block,
      id: `block-${block.type}-${Date.now()}`,
      title: `${block.title || ''} (Bản sao)`
    };
    const blockIdx = currentPage.blocks.findIndex((b) => b.id === block.id);
    const updatedBlocks = [...currentPage.blocks];
    updatedBlocks.splice(blockIdx + 1, 0, duplicated);

    const updatedPage = { ...currentPage, blocks: updatedBlocks, updatedAt: new Date().toISOString().split('T')[0] };
    const updatedPages = pages.map((p) => (p.id === currentPage.id ? updatedPage : p));
    savePagesToStateAndStorage(updatedPages);
    showToast('Đã nhân bản khối nội dung');
  };

  const handleCreateNewPage = () => {
    if (!newPageTitle.trim()) {
      showToast('Vui lòng nhập tiêu đề trang quảng cáo');
      return;
    }
    const cleanSlug = (newPageSlug.trim() || newPageTitle.trim())
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const baseTemplate = selectedTemplateKey === 'attendance'
      ? DEFAULT_ELEMENTOR_TEMPLATES[1]
      : selectedTemplateKey === 'printer'
      ? DEFAULT_ELEMENTOR_TEMPLATES[2]
      : selectedTemplateKey === 'flashsale'
      ? DEFAULT_ELEMENTOR_TEMPLATES[3]
      : DEFAULT_ELEMENTOR_TEMPLATES[0];

    const newPage: ElementorLandingPage = {
      id: `landing-${Date.now()}`,
      title: newPageTitle.trim(),
      slug: cleanSlug,
      metaDescription: `Trang quảng cáo ${newPageTitle.trim()}`,
      themeColor: '#CD1818',
      isPublished: true,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      viewsCount: 0,
      leadsCount: 0,
      blocks: JSON.parse(JSON.stringify(baseTemplate.blocks))
    };

    const updatedPages = [newPage, ...pages];
    savePagesToStateAndStorage(updatedPages);
    setActivePageId(newPage.id);
    setIsCreatingNewPage(false);
    setNewPageTitle('');
    setNewPageSlug('');
    setViewMode('editor');
    showToast(`Đã tạo thành công trang quảng cáo: ${newPage.title}`);
  };

  const handleDeletePage = (pageId: string) => {
    if (pages.length <= 1) {
      showToast('Không thể xóa trang cuối cùng');
      return;
    }
    const updatedPages = pages.filter((p) => p.id !== pageId);
    savePagesToStateAndStorage(updatedPages);
    setActivePageId(updatedPages[0].id);
    showToast('Đã xóa trang quảng cáo');
  };

  const handleTogglePublish = (pageId: string) => {
    const updatedPages = pages.map((p) => (p.id === pageId ? { ...p, isPublished: !p.isPublished } : p));
    savePagesToStateAndStorage(updatedPages);
    showToast('Đã cập nhật trạng thái xuất bản trang');
  };

  // Render individual block in visual preview
  const renderVisualBlock = (block: LandingPageBlock) => {
    if (block.isVisible === false) return null;

    switch (block.type) {
      case 'hero':
        return (
          <section className={`relative py-12 md:py-20 px-4 md:px-8 bg-gradient-to-br ${block.bgColor || 'from-slate-950 via-slate-900 to-red-950'} text-white overflow-hidden text-center md:text-left`}>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
              <div className="md:col-span-7 space-y-4">
                {block.badge && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/90 text-white font-black text-xs uppercase tracking-wider shadow-lg border border-red-400">
                    <Flame className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300 animate-pulse" />
                    <span>{block.badge}</span>
                  </span>
                )}
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight text-white drop-shadow-md">
                  {block.title}
                </h1>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-xl">
                  {block.subtitle}
                </p>
                <div className="pt-2 flex flex-wrap gap-3 justify-center md:justify-start">
                  {block.buttonText && (
                    <a
                      href={block.buttonLink || '#lead-form'}
                      className="px-6 py-3.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-black text-xs md:text-sm uppercase tracking-wider rounded-xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-amber-300/40"
                    >
                      <span>{block.buttonText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                  {block.secondaryButtonText && (
                    <a
                      href={block.secondaryButtonLink || `tel:${primaryPhone.replace(/[^0-9]/g, '')}`}
                      className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs md:text-sm uppercase tracking-wider rounded-xl border border-white/20 backdrop-blur-md transition-all flex items-center gap-2"
                    >
                      <PhoneCall className="w-4 h-4 text-emerald-400" />
                      <span>{block.secondaryButtonText}</span>
                    </a>
                  )}
                </div>
              </div>
              <div className="md:col-span-5 flex justify-center">
                {block.imageUrl ? (
                  <img
                    src={block.imageUrl}
                    alt={block.title}
                    className="rounded-3xl shadow-2xl border-4 border-white/10 max-h-80 w-full object-cover transform hover:scale-102 transition-transform"
                  />
                ) : (
                  <div className="w-full h-64 bg-slate-800 rounded-3xl flex items-center justify-center border-2 border-dashed border-slate-700 text-slate-400">
                    Khung hình ảnh Hero
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      case 'countdown':
        return (
          <section className="py-6 px-4 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white shadow-md">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
              <div>
                <h3 className="text-base md:text-lg font-black uppercase tracking-tight flex items-center justify-center md:justify-start gap-2">
                  <Zap className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                  <span>{block.title}</span>
                </h3>
                <p className="text-xs text-amber-100 font-medium">{block.subtitle}</p>
              </div>
              <div className="flex items-center gap-2 font-mono font-black text-slate-950">
                <div className="bg-white px-3 py-1.5 rounded-xl shadow text-center">
                  <div className="text-lg md:text-xl text-red-600 leading-none">01</div>
                  <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Ngày</div>
                </div>
                <span className="text-white text-xl font-bold">:</span>
                <div className="bg-white px-3 py-1.5 rounded-xl shadow text-center">
                  <div className="text-lg md:text-xl text-red-600 leading-none">12</div>
                  <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Giờ</div>
                </div>
                <span className="text-white text-xl font-bold">:</span>
                <div className="bg-white px-3 py-1.5 rounded-xl shadow text-center">
                  <div className="text-lg md:text-xl text-red-600 leading-none">45</div>
                  <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Phút</div>
                </div>
                <span className="text-white text-xl font-bold">:</span>
                <div className="bg-white px-3 py-1.5 rounded-xl shadow text-center">
                  <div className="text-lg md:text-xl text-red-600 leading-none animate-pulse">28</div>
                  <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Giây</div>
                </div>
              </div>
            </div>
          </section>
        );

      case 'features':
        return (
          <section className="py-12 px-4 md:px-8 bg-slate-50 text-slate-800">
            <div className="max-w-6xl mx-auto space-y-8 text-center">
              <div className="space-y-2 max-w-2xl mx-auto">
                <h2 className="text-xl md:text-3xl font-black uppercase text-slate-900 tracking-tight">
                  {block.title}
                </h2>
                <p className="text-xs md:text-sm text-slate-500">{block.subtitle}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {(block.items || []).map((item: any, i: number) => (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-left space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'products':
        return (
          <section className="py-12 px-4 md:px-8 bg-white text-slate-800">
            <div className="max-w-6xl mx-auto space-y-8 text-center">
              <div className="space-y-2 max-w-2xl mx-auto">
                <h2 className="text-xl md:text-3xl font-black uppercase text-slate-900 tracking-tight">
                  {block.title}
                </h2>
                <p className="text-xs md:text-sm text-slate-500">{block.subtitle}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
                {products.slice(0, 4).map((p) => (
                  <div key={p.id} className="bg-white border border-slate-200 rounded-2xl p-3 shadow-xs hover:shadow-lg hover:scale-[1.025] transition-all flex flex-col justify-between">
                    <div>
                      <div className="h-32 bg-slate-50 rounded-xl p-2 flex items-center justify-center mb-2 overflow-hidden">
                        {p.image ? (
                          <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                        ) : (
                          <div className="text-slate-300 font-bold text-sm">SP</div>
                        )}
                      </div>
                      <span className="text-[9px] font-black text-blue-600 uppercase tracking-wider">{p.categoryLabel}</span>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-2 h-8">{p.name}</h4>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-black text-red-600 font-mono">{p.price.toLocaleString('vi-VN')}đ</span>
                      <a href="#lead-form" className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white font-extrabold text-[9px] uppercase rounded-lg shadow-xs">
                        Đặt Mua
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'pricing':
        return (
          <section className="py-12 px-4 md:px-8 bg-slate-900 text-white">
            <div className="max-w-6xl mx-auto space-y-8 text-center">
              <div className="space-y-2 max-w-2xl mx-auto">
                <h2 className="text-xl md:text-3xl font-black uppercase text-white tracking-tight">
                  {block.title}
                </h2>
                <p className="text-xs md:text-sm text-slate-400">{block.subtitle}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {(block.items || []).map((tier: any, i: number) => (
                  <div
                    key={i}
                    className={`rounded-3xl p-6 transition-all relative flex flex-col justify-between ${
                      tier.popular
                        ? 'bg-gradient-to-b from-slate-800 to-slate-950 border-2 border-red-500 shadow-2xl scale-105'
                        : 'bg-slate-800/80 border border-slate-700'
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-red-600 text-white font-black text-[9px] uppercase tracking-wider shadow">
                        GÓI BÁN CHẠY NHẤT
                      </span>
                    )}
                    <div>
                      <h3 className="text-base font-black uppercase text-white tracking-wider">{tier.name}</h3>
                      <div className="my-3 flex items-baseline gap-2">
                        <span className="text-2xl md:text-3xl font-black text-red-400 font-mono">{tier.price}</span>
                        {tier.originalPrice && (
                          <span className="text-xs text-slate-500 line-through font-mono">{tier.originalPrice}</span>
                        )}
                      </div>
                      <div className="space-y-2 py-3 border-t border-slate-700/80">
                        {(tier.features || []).map((feat: string, fi: number) => (
                          <div key={fi} className="flex items-center gap-2 text-xs text-slate-300">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <a
                      href="#lead-form"
                      className={`mt-4 w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider text-center block transition-all shadow ${
                        tier.popular ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-slate-700 hover:bg-slate-600 text-white'
                      }`}
                    >
                      {tier.buttonText || 'Chọn Gói Này'}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'testimonials':
        return (
          <section className="py-12 px-4 md:px-8 bg-slate-50 text-slate-800">
            <div className="max-w-5xl mx-auto space-y-8 text-center">
              <div className="space-y-2 max-w-2xl mx-auto">
                <h2 className="text-xl md:text-3xl font-black uppercase text-slate-900 tracking-tight">
                  {block.title}
                </h2>
                <p className="text-xs md:text-sm text-slate-500">{block.subtitle}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {(block.items || []).map((item: any, i: number) => (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(item.rating || 5)].map((_, si) => (
                        <Star key={si} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs md:text-sm text-slate-600 italic leading-relaxed">
                      "{item.comment}"
                    </p>
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                      {item.avatar && (
                        <img src={item.avatar} alt={item.name} className="w-9 h-9 rounded-full object-cover" />
                      )}
                      <div>
                        <div className="font-bold text-xs text-slate-900">{item.name}</div>
                        <div className="text-[10px] text-slate-400 font-medium">{item.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'lead_form':
        return (
          <section className="py-12 px-4 md:px-8 bg-gradient-to-br from-red-600 via-rose-600 to-amber-600 text-white" id="lead-form">
            <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-2xl text-slate-900 space-y-5 text-center">
              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-black text-[10px] uppercase tracking-wider inline-block">
                  ƯU ĐÃI DÀNH RIÊNG CHO BẠN
                </span>
                <h3 className="text-lg md:text-2xl font-black uppercase text-slate-900 tracking-tight">
                  {block.title}
                </h3>
                <p className="text-xs text-slate-500">{block.subtitle}</p>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); showToast('Đã gửi thông tin! Chuyên viên sẽ liên hệ trong 5 phút'); }} className="space-y-3 text-left">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Họ và tên của bạn</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Nguyễn Văn Nam"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 text-xs text-slate-800"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Số điện thoại (Bắt buộc)</label>
                    <input
                      type="tel"
                      required
                      placeholder="VD: 0901.234.567"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 text-xs text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Tỉnh / Thành phố</label>
                    <input
                      type="text"
                      placeholder="VD: TP. Hồ Chí Minh, Hà Nội..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 text-xs text-slate-800"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Nhu cầu cụ thể</label>
                  <textarea
                    rows={2}
                    placeholder="VD: Cần lắp đặt 2 máy in bill K80 và 1 máy chấm công cho quán cafe..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 text-xs text-slate-800"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs md:text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl active:scale-98 transition-all cursor-pointer"
                >
                  {block.buttonText || 'GỬI ĐĂNG KÝ NGAY'}
                </button>
              </form>
            </div>
          </section>
        );

      case 'faq':
        return (
          <section className="py-12 px-4 md:px-8 bg-white text-slate-800">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-xl md:text-3xl font-black uppercase text-slate-900 tracking-tight">{block.title}</h2>
                <p className="text-xs md:text-sm text-slate-500">{block.subtitle}</p>
              </div>
              <div className="space-y-3">
                {(block.items || []).map((faq: any, i: number) => (
                  <div key={i} className="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 space-y-1.5 text-left">
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{faq.q}</span>
                    </h4>
                    <p className="text-xs text-slate-600 pl-6 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'video':
        return (
          <section className="py-12 px-4 md:px-8 bg-slate-950 text-white">
            <div className="max-w-4xl mx-auto space-y-6 text-center">
              <div className="space-y-2">
                {block.badge && (
                  <span className="px-3 py-1 rounded-full bg-red-600/90 text-white font-black text-xs uppercase tracking-wider inline-block">
                    {block.badge}
                  </span>
                )}
                <h2 className="text-xl md:text-3xl font-black uppercase text-white tracking-tight">{block.title || 'VIDEO TRẢI NGHIỆM THỰC TẾ'}</h2>
                <p className="text-xs md:text-sm text-slate-400 max-w-xl mx-auto">{block.subtitle || 'Xem cận cảnh quá trình vận hành, tốc độ in và độ sắc nét thực tế của thiết bị'}</p>
              </div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-800 bg-slate-900 aspect-video max-w-3xl mx-auto">
                {block.videoUrl && (block.videoUrl.includes('youtube.com') || block.videoUrl.includes('youtu.be')) ? (
                  <iframe
                    src={block.videoUrl.includes('watch?v=') 
                      ? block.videoUrl.replace('watch?v=', 'embed/') 
                      : block.videoUrl.includes('youtu.be/')
                      ? `https://www.youtube.com/embed/${block.videoUrl.split('youtu.be/')[1]}`
                      : block.videoUrl
                    }
                    title={block.title || 'Video quảng cáo'}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-slate-900 via-slate-800 to-red-950 p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg mb-3">
                      <Play className="w-8 h-8 fill-white ml-1" />
                    </div>
                    <h4 className="font-bold text-sm text-white">Video Thuyết Minh & Trải Nghiệm Thực Tế</h4>
                    <p className="text-xs text-slate-400 max-w-md mt-1">Được ghi hình trực tiếp tại trung tâm kỹ thuật Solution Bảo</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      case 'gallery':
        return (
          <section className="py-12 px-4 md:px-8 bg-slate-50 text-slate-800">
            <div className="max-w-6xl mx-auto space-y-8 text-center">
              <div className="space-y-2 max-w-2xl mx-auto">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-black text-xs uppercase tracking-wider inline-block">
                  HÌNH ẢNH THỰC TẾ
                </span>
                <h2 className="text-xl md:text-3xl font-black uppercase text-slate-900 tracking-tight">{block.title || 'DỰ ÁN & CỬA HÀNG ĐÃ LẮP ĐẶT'}</h2>
                <p className="text-xs md:text-sm text-slate-500">{block.subtitle || 'Một số hình ảnh bàn giao thiết bị thực tế tại các điểm kinh doanh trên toàn quốc'}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(block.items && block.items.length > 0 ? block.items : [
                  { url: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80', caption: 'Lắp đặt chuỗi siêu thị' },
                  { url: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=600&q=80', caption: 'Bộ máy POS nhà hàng' },
                  { url: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=600&q=80', caption: 'Máy in bill quán cafe' },
                  { url: 'https://images.unsplash.com/photo-1556742208-999815fca738?auto=format&fit=crop&w=600&q=80', caption: 'Két tiền và máy quét mã vạch' }
                ]).map((imgItem: any, idx: number) => (
                  <div key={idx} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all aspect-4/3 bg-slate-200">
                    <img 
                      src={typeof imgItem === 'string' ? imgItem : imgItem.url} 
                      alt={imgItem.caption || 'Thực tế lắp đặt'} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-white text-xs font-bold">{imgItem.caption || `Dự án thực tế #${idx + 1}`}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'cta_banner':
        return (
          <section className={`py-12 px-4 md:px-8 bg-gradient-to-r ${block.bgColor || 'from-red-600 via-rose-600 to-amber-600'} text-white`}>
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="space-y-2">
                {block.badge && (
                  <span className="px-3 py-0.5 rounded-full bg-white/20 text-white font-black text-xs uppercase tracking-wider inline-block">
                    {block.badge}
                  </span>
                )}
                <h3 className="text-xl md:text-3xl font-black uppercase tracking-tight">{block.title || 'ƯU ĐÃI CHỈ ÁP DỤNG TRONG HÔM NAY!'}</h3>
                <p className="text-xs md:text-sm text-white/90 max-w-xl">{block.subtitle || 'Liên hệ ngay để nhận chiết khấu trực tiếp và gói quà tặng giấy in trị giá 500.000đ'}</p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                <a
                  href={`tel:${primaryPhone.replace(/[^0-9]/g, '')}`}
                  className="px-5 py-3 rounded-2xl bg-white text-red-600 font-black text-xs uppercase tracking-wider shadow-lg hover:bg-slate-100 active:scale-95 transition-all flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-red-600 animate-bounce" />
                  <span>Gọi: {primaryPhone}</span>
                </a>
                <a
                  href={zaloLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-2xl bg-[#0068FF] text-white font-black text-xs uppercase tracking-wider shadow-lg hover:bg-[#0052cc] active:scale-95 transition-all flex items-center gap-2"
                >
                  <ZaloIcon className="w-4 h-4" />
                  <span>Chat Zalo Báo Giá</span>
                </a>
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      {/* 1. TOP HEADER BAR: TITLE + ACTIONS */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold border border-purple-100 shadow-xs">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                <span>Thiết Kế Trang Quảng Cáo Elementor</span>
                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-black rounded-full font-mono uppercase">
                  Elementor Pro
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Tạo và chỉnh sửa Landing Page quảng cáo đa năng, tỷ lệ chuyển đổi cao với các widget kéo thả trực quan.
              </p>
            </div>
          </div>
        </div>

        {/* View mode toggle & Action buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('editor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'editor' ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Thiết kế (Editor)
            </button>
            <button
              type="button"
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'preview' ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Xem trước (Preview)
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'list' ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Danh sách trang ({pages.length})
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowLeadsModal(true)}
            className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all border border-rose-200 flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-2xs"
            title="Xem danh sách khách hàng đã điền form quảng cáo"
          >
            <Users className="w-4 h-4 text-rose-600" />
            <span>Khách đăng ký ({landingLeads.length})</span>
          </button>

          <button
            type="button"
            onClick={() => handleCopyLandingLink()}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all border border-slate-300 flex items-center gap-1.5 cursor-pointer active:scale-95"
            title="Sao chép đường dẫn chạy Ads"
          >
            <Copy className="w-4 h-4 text-slate-600" />
            <span>Copy Link Ads</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCreatingNewPage(true)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo trang mới</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN WORKSPACE */}
      {viewMode === 'list' ? (
        /* LIST OF ALL LANDING PAGES */
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
              Danh sách các trang quảng cáo đang hoạt động ({pages.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pages.map((p) => (
              <div
                key={p.id}
                className="bg-slate-50/70 border border-slate-200/90 hover:border-purple-300 rounded-2xl p-4 flex flex-col justify-between transition-all space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-400">/{p.slug}</span>
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(p.id)}
                      className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                        p.isPublished ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {p.isPublished ? 'Đang xuất bản' : 'Bản nháp'}
                    </button>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 leading-snug">{p.title}</h4>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                    <span>👁️ {p.viewsCount} lượt xem</span>
                    <span>📥 {p.leadsCount} khách để lại thông tin</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActivePageId(p.id);
                      setViewMode('editor');
                    }}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Sửa Elementor</span>
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onPreviewLivePage(p)}
                      className="p-1.5 bg-white hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-200 transition-colors"
                      title="Xem trang thực tế"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeletePage(p.id)}
                      className="p-1.5 bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg border border-slate-200 transition-colors"
                      title="Xóa trang"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ELEMENTOR VISUAL BUILDER WORKSPACE */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* SIDEBAR WIDGETS DRAWER (Chỉ hiện khi ở chế độ Editor) */}
          {viewMode === 'editor' && (
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-5 sticky top-24 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-purple-600" />
                  <span className="font-black text-xs uppercase tracking-wider text-slate-900">
                    Kho Widget Elementor
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-bold">Bấm để thêm khối</span>
              </div>

              {/* Danh sách các Widget có sẵn */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleAddBlock('hero')}
                  className="p-3 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200/80 hover:border-purple-300 rounded-xl flex flex-col items-center gap-1.5 transition-all text-center cursor-pointer group"
                >
                  <Flame className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold">Hero Banner</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddBlock('countdown')}
                  className="p-3 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200/80 hover:border-purple-300 rounded-xl flex flex-col items-center gap-1.5 transition-all text-center cursor-pointer group"
                >
                  <Clock className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold">Đồng hồ đếm ngược</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddBlock('features')}
                  className="p-3 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200/80 hover:border-purple-300 rounded-xl flex flex-col items-center gap-1.5 transition-all text-center cursor-pointer group"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold">Khối tính năng</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddBlock('products')}
                  className="p-3 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200/80 hover:border-purple-300 rounded-xl flex flex-col items-center gap-1.5 transition-all text-center cursor-pointer group"
                >
                  <Grid className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold">Sản phẩm Sale</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddBlock('pricing')}
                  className="p-3 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200/80 hover:border-purple-300 rounded-xl flex flex-col items-center gap-1.5 transition-all text-center cursor-pointer group"
                >
                  <DollarSign className="w-5 h-5 text-teal-500 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold">Bảng giá Combo</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddBlock('testimonials')}
                  className="p-3 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200/80 hover:border-purple-300 rounded-xl flex flex-col items-center gap-1.5 transition-all text-center cursor-pointer group"
                >
                  <Users className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold">Đánh giá khách hàng</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddBlock('lead_form')}
                  className="p-3 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200/80 hover:border-purple-300 rounded-xl flex flex-col items-center gap-1.5 transition-all text-center cursor-pointer group"
                >
                  <FileText className="w-5 h-5 text-rose-500 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold">Form đăng ký</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddBlock('faq')}
                  className="p-3 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200/80 hover:border-purple-300 rounded-xl flex flex-col items-center gap-1.5 transition-all text-center cursor-pointer group"
                >
                  <HelpCircle className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold">Hỏi đáp FAQ</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddBlock('video')}
                  className="p-3 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200/80 hover:border-purple-300 rounded-xl flex flex-col items-center gap-1.5 transition-all text-center cursor-pointer group"
                >
                  <Video className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold">Video Demo</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddBlock('gallery')}
                  className="p-3 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200/80 hover:border-purple-300 rounded-xl flex flex-col items-center gap-1.5 transition-all text-center cursor-pointer group"
                >
                  <ImageIcon className="w-5 h-5 text-sky-500 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold">Thư viện ảnh</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddBlock('cta_banner')}
                  className="p-3 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200/80 hover:border-purple-300 rounded-xl flex flex-col items-center gap-1.5 transition-all text-center cursor-pointer group col-span-2"
                >
                  <PhoneCall className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold">Banner Kêu Gọi Khẩn Cấp (Hotline & Zalo)</span>
                </button>
              </div>

              {/* Danh sách các khối hiện tại & sắp xếp */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                  Cấu trúc trang ({currentPage?.blocks.length || 0} khối)
                </span>
                <div className="space-y-1.5">
                  {currentPage?.blocks.map((block, idx) => (
                    <div
                      key={block.id}
                      className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 transition-all ${
                        editingBlockId === block.id
                          ? 'bg-purple-50 border-purple-300 text-purple-900 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setEditingBlockId(editingBlockId === block.id ? null : block.id)}
                        className="text-left flex-1 min-w-0 truncate text-xs cursor-pointer"
                      >
                        <span className="uppercase font-mono text-[9px] text-slate-400 mr-1.5">[{block.type}]</span>
                        <span>{block.title || 'Khối không tên'}</span>
                      </button>

                      <div className="flex items-center gap-0.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleMoveBlock(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-20 cursor-pointer"
                          title="Lên trên"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveBlock(idx, 'down')}
                          disabled={idx === currentPage.blocks.length - 1}
                          className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-20 cursor-pointer"
                          title="Xuống dưới"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDuplicateBlock(block)}
                          className="p-1 text-slate-400 hover:text-blue-600 cursor-pointer"
                          title="Nhân bản khối"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteBlock(block.id)}
                          className="p-1 text-slate-400 hover:text-red-600 cursor-pointer"
                          title="Xóa khối"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Edit Block Properties Modal/Drawer if selected */}
              {editingBlockId && (() => {
                const b = currentPage?.blocks.find((x) => x.id === editingBlockId);
                if (!b) return null;
                return (
                  <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-2xl space-y-3 animate-fade-in text-left">
                    <div className="flex items-center justify-between pb-2 border-b border-purple-200">
                      <span className="text-xs font-black uppercase text-purple-900">
                        Chỉnh sửa khối: {b.type}
                      </span>
                      <button
                        type="button"
                        onClick={() => setEditingBlockId(null)}
                        className="text-slate-400 hover:text-slate-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Huy hiệu tag / Badge</label>
                      <input
                        type="text"
                        value={b.badge || ''}
                        placeholder="VD: ƯU ĐÃI ĐẶC BIỆT, XẢ KHO 2026..."
                        onChange={(e) => handleUpdateBlock(b.id, { badge: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Tiêu đề khối</label>
                      <input
                        type="text"
                        value={b.title || ''}
                        onChange={(e) => handleUpdateBlock(b.id, { title: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Mô tả phụ</label>
                      <textarea
                        rows={2}
                        value={b.subtitle || ''}
                        onChange={(e) => handleUpdateBlock(b.id, { subtitle: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs"
                      />
                    </div>

                    {b.type === 'hero' && (
                      <div>
                        <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Link Ảnh Hero Banner</label>
                        <input
                          type="text"
                          value={b.imageUrl || ''}
                          onChange={(e) => handleUpdateBlock(b.id, { imageUrl: e.target.value })}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs"
                        />
                      </div>
                    )}

                    {b.type === 'video' && (
                      <div>
                        <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Link Video YouTube / MP4</label>
                        <input
                          type="text"
                          value={b.videoUrl || ''}
                          onChange={(e) => handleUpdateBlock(b.id, { videoUrl: e.target.value })}
                          placeholder="https://www.youtube.com/watch?v=..."
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs"
                        />
                      </div>
                    )}

                    {b.type === 'countdown' && (
                      <div>
                        <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Số giờ đếm ngược (tiếng)</label>
                        <input
                          type="number"
                          value={b.countdownHours || 24}
                          onChange={(e) => handleUpdateBlock(b.id, { countdownHours: Number(e.target.value) })}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs"
                        />
                      </div>
                    )}

                    {(b.type === 'hero' || b.type === 'cta_banner') && (
                      <div>
                        <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Màu nền Gradient</label>
                        <select
                          value={b.bgColor || 'from-red-600 via-rose-600 to-amber-600'}
                          onChange={(e) => handleUpdateBlock(b.id, { bgColor: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs"
                        >
                          <option value="from-slate-950 via-slate-900 to-red-950">Đỏ Ruby Dạ Hội (Tối & Sang Trọng)</option>
                          <option value="from-red-600 via-rose-600 to-amber-600">Đỏ Cam Rực Rỡ (Năng Động)</option>
                          <option value="from-slate-950 via-blue-950 to-slate-900">Xanh Dương Công Nghệ</option>
                          <option value="from-slate-950 via-emerald-950 to-slate-900">Xanh Lục Bền Bỉ</option>
                          <option value="from-emerald-600 via-teal-600 to-cyan-600">Xanh Ngọc Tươi Mát</option>
                          <option value="from-slate-900 via-slate-800 to-zinc-950">Đen Kim Loại Tối Giản</option>
                        </select>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Nút bấm chính</label>
                        <input
                          type="text"
                          value={b.buttonText || ''}
                          onChange={(e) => handleUpdateBlock(b.id, { buttonText: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Link đích</label>
                        <input
                          type="text"
                          value={b.buttonLink || ''}
                          onChange={(e) => handleUpdateBlock(b.id, { buttonLink: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs"
                        />
                      </div>
                    </div>

                    {b.type === 'hero' && (
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Nút phụ 2</label>
                          <input
                            type="text"
                            value={b.secondaryButtonText || ''}
                            onChange={(e) => handleUpdateBlock(b.id, { secondaryButtonText: e.target.value })}
                            placeholder="VD: XEM VIDEO"
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">Link nút phụ 2</label>
                          <input
                            type="text"
                            value={b.secondaryButtonLink || ''}
                            onChange={(e) => handleUpdateBlock(b.id, { secondaryButtonLink: e.target.value })}
                            placeholder="#video-demo"
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* CANVAS PREVIEW / LIVE WORKSPACE */}
          <div className={`${viewMode === 'editor' ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-4`}>
            {/* Control bar for Canvas */}
            <div className="bg-white border border-slate-200 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Đang xem:</span>
                <span className="font-extrabold text-xs text-purple-700 font-mono">/{currentPage?.slug}</span>
                <span className="text-[10px] text-slate-400">({currentPage?.title})</span>
              </div>

              <div className="flex items-center gap-2">
                {/* Device preview toggle */}
                <div className="bg-slate-100 p-1 rounded-lg flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setDevicePreview('desktop')}
                    className={`p-1.5 rounded transition-colors ${devicePreview === 'desktop' ? 'bg-white shadow-2xs text-purple-700' : 'text-slate-400'}`}
                    title="Màn hình Desktop"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDevicePreview('mobile')}
                    className={`p-1.5 rounded transition-colors ${devicePreview === 'mobile' ? 'bg-white shadow-2xs text-purple-700' : 'text-slate-400'}`}
                    title="Màn hình Điện thoại"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (currentPage) onPreviewLivePage(currentPage);
                  }}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Mở Trang Toàn Màn Hình</span>
                </button>
              </div>
            </div>

            {/* Canvas Frame Container */}
            <div className={`mx-auto transition-all bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden ${
              devicePreview === 'mobile' ? 'max-w-[390px] border-8 border-slate-800 rounded-[40px]' : 'w-full'
            }`}>
              {/* Top mini banner for mobile mockup */}
              {devicePreview === 'mobile' && (
                <div className="bg-slate-800 py-1 flex justify-center">
                  <div className="w-20 h-3.5 bg-black rounded-full" />
                </div>
              )}

              {/* Render all blocks in order */}
              <div className="divide-y divide-slate-100/50">
                {currentPage?.blocks.map((block) => (
                  <div key={block.id} className="relative group/block">
                    {/* Hover indicator & quick edit tag in editor mode */}
                    {viewMode === 'editor' && (
                      <div className="absolute top-2 right-2 opacity-0 group-hover/block:opacity-100 z-30 transition-opacity flex items-center gap-1 bg-slate-900/90 text-white p-1 rounded-lg backdrop-blur-md">
                        <button
                          type="button"
                          onClick={() => setEditingBlockId(block.id)}
                          className="px-2 py-0.5 hover:bg-purple-600 rounded text-[10px] font-bold cursor-pointer"
                        >
                          Sửa khối
                        </button>
                      </div>
                    )}
                    {renderVisualBlock(block)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. MODAL TẠO TRANG QUẢNG CÁO MỚI */}
      <AnimatePresence>
        {isCreatingNewPage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-5 text-left"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-purple-600" />
                  <h3 className="font-black text-base uppercase text-slate-900 tracking-tight">
                    Tạo Trang Quảng Cáo Landing Page
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreatingNewPage(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                    Tiêu đề chiến dịch quảng cáo
                  </label>
                  <input
                    type="text"
                    value={newPageTitle}
                    onChange={(e) => setNewPageTitle(e.target.value)}
                    placeholder="VD: Xả Kho Cuối Năm - Máy In Bill & POS Bán Hàng"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase block mb-1">
                    Đường dẫn trang (URL Slug)
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">/landing/</span>
                    <input
                      type="text"
                      value={newPageSlug}
                      onChange={(e) => setNewPageSlug(e.target.value)}
                      placeholder="xa-kho-cuoi-nam"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-mono focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase block mb-2">
                    Chọn mẫu giao diện khởi tạo sẵn (Templates)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedTemplateKey('pos')}
                      className={`p-3.5 rounded-2xl border text-left space-y-1 transition-all cursor-pointer ${
                        selectedTemplateKey === 'pos'
                          ? 'border-purple-600 bg-purple-50/50 shadow-xs ring-2 ring-purple-100'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-extrabold text-xs text-slate-900">1. Combo Máy Bán Hàng POS</div>
                      <div className="text-[10px] text-slate-500">Bảng giá 3 gói combo, đồng hồ đếm ngược, form tư vấn chiết khấu.</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedTemplateKey('attendance')}
                      className={`p-3.5 rounded-2xl border text-left space-y-1 transition-all cursor-pointer ${
                        selectedTemplateKey === 'attendance'
                          ? 'border-purple-600 bg-purple-50/50 shadow-xs ring-2 ring-purple-100'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-extrabold text-xs text-slate-900">2. Máy Chấm Công & AI Face ID</div>
                      <div className="text-[10px] text-slate-500">B2B giải pháp nhân sự, tính năng AI nhận diện, báo cáo Excel tự động.</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedTemplateKey('printer')}
                      className={`p-3.5 rounded-2xl border text-left space-y-1 transition-all cursor-pointer ${
                        selectedTemplateKey === 'printer'
                          ? 'border-purple-600 bg-purple-50/50 shadow-xs ring-2 ring-purple-100'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-extrabold text-xs text-slate-900">3. Máy In Bill & Quét Mã Vạch</div>
                      <div className="text-[10px] text-slate-500">Tặng 10 cuộn giấy in, banner cam kết giao nhanh 2 giờ, giá đại lý.</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedTemplateKey('flashsale')}
                      className={`p-3.5 rounded-2xl border text-left space-y-1 transition-all cursor-pointer ${
                        selectedTemplateKey === 'flashsale'
                          ? 'border-purple-600 bg-purple-50/50 shadow-xs ring-2 ring-purple-100'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-extrabold text-xs text-slate-900">4. Flash Sale Xả Kho Giảm 50%</div>
                      <div className="text-[10px] text-slate-500">Đồng hồ đếm ngược khẩn cấp, giảm giá sốc cuối tuần, chốt đơn nhanh.</div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsCreatingNewPage(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="button"
                  onClick={handleCreateNewPage}
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Bắt đầu thiết kế
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. MODAL XEM DANH SÁCH KHÁCH HÀNG ĐĂNG KÝ (LEADS CRM) */}
      <AnimatePresence>
        {showLeadsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 space-y-4 text-left max-h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm uppercase text-slate-900 tracking-tight">
                      Khách Hàng Đăng Ký Từ Trang Quảng Cáo
                    </h3>
                    <p className="text-[11px] text-slate-400">Danh sách khách hàng tiềm năng đã để lại SĐT trên Landing Page</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowLeadsModal(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {landingLeads.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 space-y-2">
                    <Users className="w-10 h-10 mx-auto text-slate-300" />
                    <p className="text-xs font-medium">Chưa có khách hàng nào đăng ký từ trang quảng cáo này</p>
                    <p className="text-[10px] text-slate-400">Dữ liệu sẽ tự động xuất hiện ở đây khi khách hàng điền form trên Landing Page</p>
                  </div>
                ) : (
                  landingLeads.map((lead: any, i: number) => (
                    <div key={lead.id || i} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-purple-300 transition-all">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-xs text-slate-900">{lead.name}</span>
                          <span className="font-mono font-bold text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-100">{lead.phone}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 line-clamp-2">{lead.note}</p>
                        <span className="text-[9px] text-slate-400 font-mono block">{lead.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <a
                          href={`tel:${lead.phone.replace(/[^0-9]/g, '')}`}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-xs"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>Gọi ngay</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            if (navigator.clipboard) {
                              navigator.clipboard.writeText(lead.phone);
                              showToast(`Đã copy số điện thoại: ${lead.phone}`);
                            }
                          }}
                          className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 flex items-center gap-1 cursor-pointer"
                          title="Sao chép số điện thoại"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
