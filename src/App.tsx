import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Bot,
  Headphones,
  MessageSquare,
  Sparkles,
  Printer,
  Scan,
  Fingerprint,
  Barcode,
  ShoppingBag,
  Cpu,
  Trash2,
  FileText,
  Phone,
  PhoneCall,
  Facebook,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  Wrench,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  Plus,
  Minus,
  Check,
  Package,
  ExternalLink,
  Loader2,
  Users,
  Award,
  Zap,
  RotateCcw,
  Calculator,
  Mail,
  HelpCircle,
  AlertCircle,
  Menu,
  ChevronDown,
  Eye,
  Truck,
  CreditCard,
  X,
  CheckCircle,
  FileSpreadsheet,
  Settings,
  HelpCircle as InfoIcon,
  Star,
  Bell,
  Lock,
  Edit2,
  BarChart3,
  RefreshCw,
  LogOut,
  Activity,
  Volume2,
  VolumeX,
  Newspaper,
  Calendar,
  User,
  Share2,
  Sliders,
  Maximize2,
  Minimize2,
  ArrowLeft,
  ArrowUp,
  ArrowRight,
  Laptop,
  Store,
  Sun,
  Moon,
  Camera,
  Image,
  Video,
  Copy,
  Home,
  Mic,
  Globe,
  Layers,
  ZoomIn,
  ZoomOut,
  Play
} from 'lucide-react';
import { Product, ChatMessage, MainCategory, SubCategory, ProductReview, DEFAULT_HEADER_ITEMS, SolutionBanner, DEFAULT_SOLUTION_BANNERS, HeroSideBanner, DEFAULT_HERO_SIDE_BANNERS, HeroQuickTag, DEFAULT_HERO_QUICK_TAGS, ServiceBadgeItem, DEFAULT_SERVICE_BADGES, FeedPromoBanner, DEFAULT_FEED_BANNERS, ElementorLandingPage, ComboBundle, ComboShowcaseConfig, DEFAULT_COMBO_SHOWCASE_CONFIG } from './types';
import { PRODUCTS_DATA, TROUBLESHOOTING_GUIDE } from './data';
import { DEFAULT_COMBO_BUNDLES } from './comboBundlesData';
import { parseOrderDetailsFromText, extractPhoneNumbers } from './utils/orderParser';
import { sanitizeHtml, sanitizeUrl, safeJsonLd } from './utils/security';
import { NEWS_ARTICLES, NewsArticle } from './newsData';
import { INITIAL_PRODUCT_REVIEWS } from './productReviews';
import AdminPanel from './components/AdminPanel';
import { LazyImage } from './components/LazyImage';
import { MobileEcommerceView } from './components/MobileEcommerceView';
import { FeaturedCategoriesSection } from './components/FeaturedCategoriesSection';
import { ComboBundlesSection } from './components/ComboBundlesSection';
import { AiChatbotBox } from './components/AiChatbotBox';
import { ZaloIcon } from './components/ZaloIcon';
import { PublicLandingPageView } from './components/PublicLandingPageView';
import { DEFAULT_ELEMENTOR_TEMPLATES } from './components/ElementorLandingBuilder';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const megaMenuCategories = [
  {
    id: 'deal',
    label: 'Deal - Khuyến Mãi Hôm Nay',
    isDeal: true,
    subItems: [
      { name: 'Xprinter XP-Q200 Giảm 20%', logoText: 'HOT DEAL', logoColor: 'text-red-600', searchKey: 'XP-Q200' },
      { name: 'Ronald Jack RJ1200 Tặng Phần Mềm', logoText: 'QUÀ TẶNG', logoColor: 'text-orange-500', searchKey: 'RJ1200' },
      { name: 'Xprinter XP-420B Giá Sốc', logoText: 'A6 PRO', logoColor: 'text-blue-600', searchKey: 'XP-420B' },
      { name: 'ZKTeco K14 Bản Mới Nhất', logoText: 'ZKTeco', logoColor: 'text-green-600', searchKey: 'K14' },
      { name: 'Combo Máy In Bill + Két Tiền', logoText: 'COMBO', logoColor: 'text-indigo-600', searchKey: 'Xprinter' },
      { name: 'Thùng Giấy In Oji Giá Sỉ', logoText: 'SIÊU RẺ', logoColor: 'text-teal-600', searchKey: 'Oji' }
    ],
    featuredProductIds: ['prn-q200', 'att-rj1200', 'lbl-420b']
  },
  {
    id: 'label',
    label: 'Máy in mã vạch | In tem nhãn',
    subItems: [
      { name: 'Máy in tem Xprinter 350B', logoText: 'XP-350B', logoColor: 'text-red-500', searchKey: 'XP-350B' },
      { name: 'Máy in vận đơn A6 XP-420B', logoText: 'XP-420B', logoColor: 'text-blue-500', searchKey: 'XP-420B' },
      { name: 'Máy in tem mã vạch GoDEX G500', logoText: 'GODEX', logoColor: 'text-green-600', searchKey: 'G500' },
      { name: 'Máy in ruy băng TSC TE200', logoText: 'TSC', logoColor: 'text-indigo-600', searchKey: 'TE200' },
      { name: 'In decal dán ly trà sữa', logoText: 'TRÀ SỮA', logoColor: 'text-rose-500', searchKey: 'trà sữa' },
      { name: 'Máy in tem nhãn Zebra Mỹ', logoText: 'ZEBRA', logoColor: 'text-slate-800', searchKey: 'Zebra' }
    ],
    featuredProductIds: ['lbl-350b', 'lbl-420b', 'lbl-g500']
  },
  {
    id: 'pos',
    label: 'Máy bán hàng cảm ứng POS',
    subItems: [
      { name: 'Máy POS 1 màn hình cảm ứng', logoText: 'POS-1M', logoColor: 'text-blue-600', searchKey: 'POS' },
      { name: 'Máy POS 2 màn hình kép', logoText: 'POS-2M', logoColor: 'text-indigo-600', searchKey: 'POS' },
      { name: 'Máy POS cầm tay tiện lợi', logoText: 'MINI-POS', logoColor: 'text-orange-500', searchKey: 'POS' },
      { name: 'Két đựng tiền thu ngân tự động', logoText: 'KÉT TIỀN', logoColor: 'text-emerald-600', searchKey: 'tiền' }
    ],
    featuredProductIds: ['prn-a160m', 'scan-orbit']
  },
  {
    id: 'kiosk',
    label: 'Máy Kiosk | POS bán hàng Kiosk',
    subItems: [
      { name: 'Kiosk tra cứu thông tin dịch vụ', logoText: 'KIOSK-INFO', logoColor: 'text-slate-700', searchKey: 'Kiosk' },
      { name: 'Kiosk tự gọi món Self-Order', logoText: 'ORDER-KIOSK', logoColor: 'text-blue-600', searchKey: 'Kiosk' },
      { name: 'Kiosk lấy số thứ tự tự động', logoText: 'QUEUE', logoColor: 'text-emerald-600', searchKey: 'Kiosk' }
    ],
    featuredProductIds: ['scan-orbit', 'prn-c300h']
  },
  {
    id: 'cashier',
    label: 'Máy Tính Tiền - Nhà Hàng, Siêu Thị',
    subItems: [
      { name: 'Máy tính tiền Casio chính hãng', logoText: 'CASIO', logoColor: 'text-red-600', searchKey: 'Casio' },
      { name: 'Trọn bộ máy tính tiền quán cafe', logoText: 'COMBO-CAFE', logoColor: 'text-amber-700', searchKey: 'bill' },
      { name: 'Ngăn kéo đựng tiền thu ngân K80', logoText: 'CASH', logoColor: 'text-blue-600', searchKey: 'tiền' }
    ],
    featuredProductIds: ['prn-q200', 'con-k80']
  },
  {
    id: 'printer',
    label: 'Máy In Hóa Đơn, Máy In Bill',
    subItems: [
      { name: 'Máy in hóa đơn Xprinter Q200', logoText: 'XP-Q200', logoColor: 'text-red-500', searchKey: 'XP-Q200' },
      { name: 'Máy in bill tính tiền cổng LAN', logoText: 'LAN/WIFI', logoColor: 'text-blue-600', searchKey: 'LAN' },
      { name: 'Máy in bếp chống ẩm C300H', logoText: 'BẾP CHUÔNG', logoColor: 'text-orange-600', searchKey: 'C300H' },
      { name: 'Máy in mini giá rẻ XP-58IIH', logoText: 'K57', logoColor: 'text-slate-600', searchKey: '58IIH' },
      { name: 'Máy in hóa đơn Epson TM-T82', logoText: 'EPSON', logoColor: 'text-emerald-700', searchKey: 'Epson' }
    ],
    featuredProductIds: ['prn-q200', 'prn-a160m', 'prn-ep-t82']
  },
  {
    id: 'thermal',
    label: 'Máy in nhiệt - In Đơn TMDT COD',
    subItems: [
      { name: 'Máy in vận đơn Shopee XP-420B', logoText: 'XP-420B', logoColor: 'text-blue-600', searchKey: 'XP-420B' },
      { name: 'Máy in đơn hàng Tik Tok Shop', logoText: 'TIKTOK', logoColor: 'text-slate-900', searchKey: 'XP-420B' },
      { name: 'Giấy in nhiệt tự dính A6', logoText: 'TEM A6', logoColor: 'text-amber-600', searchKey: 'giấy' }
    ],
    featuredProductIds: ['lbl-420b', 'lbl-350b']
  },
  {
    id: 'scanner',
    label: 'Máy Quét Mã Vạch, Scanner Barcode',
    subItems: [
      { name: 'Máy quét đa tia Honeywell Orbit', logoText: 'HONEYWELL', logoColor: 'text-red-600', searchKey: 'Orbit' },
      { name: 'Máy quét không dây Bluetooth 2D', logoText: 'WIRELESS', logoColor: 'text-blue-600', searchKey: '2101G' },
      { name: 'Máy quét mã vạch Zebra LI2208', logoText: 'ZEBRA', logoColor: 'text-slate-800', searchKey: 'LI2208' },
      { name: 'Máy quét Datalogic QW2100', logoText: 'ITALY', logoColor: 'text-emerald-600', searchKey: 'QW2100' }
    ],
    featuredProductIds: ['scan-orbit', 'scan-2101g', 'scan-li2208']
  },
  {
    id: 'attendance',
    label: 'Máy Chấm Công | Vân Tay | Khuôn Mặt',
    subItems: [
      { name: 'Máy chấm công Ronald Jack', logoText: 'RONALD JACK', logoColor: 'text-red-600', searchKey: 'Ronald Jack' },
      { name: 'Máy chấm công Gigata', logoText: 'GIGATA', logoColor: 'text-blue-600', searchKey: 'Gigata' },
      { name: 'Máy chấm công Granding', logoText: 'GRANDING', logoColor: 'text-emerald-600', searchKey: 'Granding' },
      { name: 'Máy chấm công Mita', logoText: 'MITA', logoColor: 'text-blue-800', searchKey: 'Mita' },
      { name: 'Máy chấm công Zkteco', logoText: 'ZKTeco', logoColor: 'text-green-600', searchKey: 'ZKTeco' },
      { name: 'Máy chấm công Sunbeam', logoText: 'SUNBEAM', logoColor: 'text-orange-500', searchKey: 'Sunbeam' },
      { name: 'Máy chấm công Hikvision', logoText: 'HIKVISION', logoColor: 'text-red-500', searchKey: 'Hikvision' },
      { name: 'Máy chấm công Aikyo', logoText: 'AIKYO', logoColor: 'text-rose-500', searchKey: 'Aikyo' },
      { name: 'Máy chấm công Wise EYE', logoText: 'Wise EYE', logoColor: 'text-indigo-600', searchKey: 'Wise Eye' },
      { name: 'Nhận diện khuôn mặt FaceID', logoText: 'FACEID', logoColor: 'text-teal-600', searchKey: 'FaceID' },
      { name: 'Kiểm soát cửa ra vào', logoText: 'ACCESS', logoColor: 'text-slate-700', searchKey: 'kiểm soát' },
      { name: 'Máy chấm công vân tay', logoText: 'FINGERPRINT', logoColor: 'text-blue-700', searchKey: 'vân tay' },
      { name: 'Máy chấm công thẻ giấy', logoText: 'THẺ GIẤY', logoColor: 'text-amber-600', searchKey: 'thẻ' },
      { name: 'Máy chấm công Wifi/LAN', logoText: 'WIFI/LAN', logoColor: 'text-indigo-700', searchKey: 'TCP/IP' },
      { name: 'Chấm công bằng mã QR Code', logoText: 'QR CODE', logoColor: 'text-rose-600', searchKey: 'thẻ' }
    ],
    featuredProductIds: ['att-rj1200', 'att-4000tid', 'att-fa113']
  },
  {
    id: 'consumable',
    label: 'Giấy In Bill - Giấy In Decal Dán',
    subItems: [
      { name: 'Giấy in nhiệt K80x45 bọc bạc', logoText: 'OJI JAPAN', logoColor: 'text-red-600', searchKey: 'K80' },
      { name: 'Giấy in nhiệt K57x45 giá rẻ', logoText: 'K57 COIL', logoColor: 'text-blue-600', searchKey: 'K57' },
      { name: 'Decal trà sữa 50x30mm', logoText: 'DECAL 50x30', logoColor: 'text-rose-500', searchKey: 'giấy' },
      { name: 'Decal siêu thị 35x22mm 3 tem', logoText: '35x22x3', logoColor: 'text-green-600', searchKey: 'giấy' },
      { name: 'Decal vận đơn Shopee 100x150', logoText: '100x150', logoColor: 'text-slate-800', searchKey: 'giấy' },
      { name: 'Ruy băng mực in Wax Resin', logoText: 'RIBBON', logoColor: 'text-purple-600', searchKey: 'mực' }
    ],
    featuredProductIds: ['con-k80', 'con-k57']
  },
  {
    id: 'radio',
    label: 'Máy Bộ Đàm',
    subItems: [
      { name: 'Máy bộ đàm Motorola', logoText: 'MOTOROLA', logoColor: 'text-red-600', searchKey: 'đàm' },
      { name: 'Máy bộ đàm Kenwood', logoText: 'KENWOOD', logoColor: 'text-blue-600', searchKey: 'đàm' },
      { name: 'Máy bộ đàm mini giá rẻ', logoText: 'MINI-WALKIE', logoColor: 'text-emerald-600', searchKey: 'đàm' }
    ],
    featuredProductIds: ['scan-orbit', 'prn-q200']
  },
  {
    id: 'office',
    label: 'Máy Siêu Thị - Văn Phòng',
    subItems: [
      { name: 'Máy đếm tiền kiểm giả Polymer', logoText: 'SL-MONEY', logoColor: 'text-orange-600', searchKey: 'đếm tiền' },
      { name: 'Máy hủy tài liệu văn phòng siêu tốc', logoText: 'SHREDDER', logoColor: 'text-slate-800', searchKey: 'hủy tài liệu' },
      { name: 'Máy ép plastic khổ A4/A3', logoText: 'PLASTIC', logoColor: 'text-blue-600', searchKey: 'ép plastic' }
    ],
    featuredProductIds: ['scan-orbit', 'lbl-350b']
  },
  {
    id: 'office_printer',
    label: 'Máy In Văn Phòng | Laser | In Màu',
    subItems: [
      { name: 'Máy in Canon LBP 2900', logoText: 'CANON', logoColor: 'text-red-600', searchKey: 'Canon' },
      { name: 'Máy in HP LaserJet Pro', logoText: 'HP', logoColor: 'text-blue-700', searchKey: 'HP' },
      { name: 'Máy in phun màu Epson L3210', logoText: 'EPSON', logoColor: 'text-indigo-600', searchKey: 'Epson' }
    ],
    featuredProductIds: ['prn-ep-t82', 'lbl-g500']
  }
];

const getCategoryIcon = (id: string) => {
  switch (id) {
    case 'deal': return <Zap className="w-4 h-4 text-orange-500 shrink-0" />;
    case 'label': return <Barcode className="w-4 h-4 text-blue-500 shrink-0" />;
    case 'pos': return <Cpu className="w-4 h-4 text-indigo-500 shrink-0" />;
    case 'kiosk': return <Scan className="w-4 h-4 text-slate-500 shrink-0" />;
    case 'cashier': return <Calculator className="w-4 h-4 text-green-500 shrink-0" />;
    case 'printer': return <Printer className="w-4 h-4 text-purple-500 shrink-0" />;
    case 'thermal': return <FileText className="w-4 h-4 text-amber-500 shrink-0" />;
    case 'scanner': return <Scan className="w-4 h-4 text-teal-500 shrink-0" />;
    case 'attendance': return <Fingerprint className="w-4 h-4 text-blue-600 shrink-0" />;
    case 'consumable': return <FileSpreadsheet className="w-4 h-4 text-orange-500 shrink-0" />;
    case 'radio': return <Phone className="w-4 h-4 text-indigo-500 shrink-0 rotate-90" />;
    case 'office': return <Wrench className="w-4 h-4 text-slate-500 shrink-0" />;
    case 'office_printer': return <Printer className="w-4 h-4 text-emerald-500 shrink-0" />;
    default: return <Settings className="w-4 h-4 text-slate-500 shrink-0" />;
  }
};

export default function App() {
  // Navigation & Tabs state
  const [activeTab, setActiveTab] = useState<'home' | 'catalog' | 'quote' | 'advisor' | 'troubleshoot' | 'admin' | 'news' | 'order-lookup'>('home');

  // Page Transition Loading Progress State
  const [topPageProgress, setTopPageProgress] = useState<number>(0);
  const [isPageTransitioning, setIsPageTransitioning] = useState<boolean>(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [hoveredMegaCategory, setHoveredMegaCategory] = useState<string>('attendance');
  const [showQuickStats, setShowQuickStats] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoFading, setIsLogoFading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);

  // Category Auto-scroll Ref and State
  const categoryContainerRef = useRef<HTMLDivElement>(null);
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);

  const bestsellerContainerRef = useRef<HTMLDivElement>(null);
  const [isBestsellerHovered, setIsBestsellerHovered] = useState(false);

  // Flash Sale Auto-scroll Ref and State
  const flashSaleContainerRef = useRef<HTMLDivElement>(null);
  const [isFlashSaleHovered, setIsFlashSaleHovered] = useState(false);

  // Helper functions for dynamic bestseller categories
  const getCategoryIcon = (id: string, name: string = '') => {
    const normalizedId = id.toLowerCase();
    const normalizedName = name.toLowerCase();
    if (normalizedId.includes('featured')) return <Sparkles className="w-5 h-5" />;
    if (normalizedId.includes('attendance') || normalizedName.includes('chấm công')) return <Fingerprint className="w-5 h-5" />;
    if (normalizedId.includes('printer') || normalizedName.includes('máy in hóa đơn') || normalizedName.includes('máy in bill')) return <Printer className="w-5 h-5" />;
    if (normalizedId.includes('scanner') || normalizedName.includes('quét') || normalizedName.includes('đầu đọc')) return <Scan className="w-5 h-5" />;
    if (normalizedId.includes('label') || normalizedName.includes('tem nhãn')) return <Barcode className="w-5 h-5" />;
    if (normalizedId.includes('consumable') || normalizedName.includes('giấy') || normalizedName.includes('phụ kiện')) return <FileText className="w-5 h-5" />;
    if (normalizedId.includes('drawer') || normalizedName.includes('két') || normalizedName.includes('hộp đựng tiền')) return <Calculator className="w-5 h-5" />;
    if (normalizedId.includes('pos') || normalizedName.includes('bán hàng')) return <ShoppingBag className="w-5 h-5" />;
    return <Package className="w-5 h-5" />;
  };

  const getCategoryBg = (index: number) => {
    const activeBgs = [
      'from-amber-500 to-orange-500 text-white',
      'from-blue-500 to-indigo-600 text-white',
      'from-purple-500 to-fuchsia-600 text-white',
      'from-teal-500 to-emerald-600 text-white',
      'from-sky-500 to-blue-600 text-white',
      'from-amber-500 to-yellow-600 text-white',
      'from-rose-500 to-pink-600 text-white',
      'from-violet-500 to-purple-600 text-white',
      'from-cyan-500 to-blue-600 text-white',
    ];
    return activeBgs[index % activeBgs.length];
  };

  useEffect(() => {
    if (isCategoryHovered) return;

    const interval = setInterval(() => {
      const container = categoryContainerRef.current;
      if (container) {
        const currentScroll = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        if (currentScroll >= maxScroll - 5) {
          // Reset to start smoothly
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll next portion
          container.scrollBy({ left: 180, behavior: 'smooth' });
        }
      }
    }, 10000); // 10 giây trượt một lần

    return () => clearInterval(interval);
  }, [isCategoryHovered]);

  // Flash Sale Auto-scroll (10s slide interval)
  useEffect(() => {
    if (isFlashSaleHovered) return;

    const interval = setInterval(() => {
      const container = flashSaleContainerRef.current;
      if (container) {
        const currentScroll = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        if (currentScroll >= maxScroll - 15) {
          // Reset to start smoothly
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll next portion (normally 1 or 2 card widths)
          const cardWidth = container.clientWidth > 640 ? 240 : (container.clientWidth / 2);
          container.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }
    }, 10000); // 10 giây trượt một lần

    return () => clearInterval(interval);
  }, [isFlashSaleHovered]);

  // Home Page custom bestseller selection state
  const [homeTab, setHomeTab] = useState<string>('featured');

  // Product Reviews Submission states
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewAuthor, setReviewAuthor] = useState<string>('');
  const [reviewComment, setReviewComment] = useState<string>('');
  const [reviewImages, setReviewImages] = useState<string[]>([]);

  // News & Blog states
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [newsSearchQuery, setNewsSearchQuery] = useState('');
  const [newsCategoryFilter, setNewsCategoryFilter] = useState<'all' | 'technical' | 'reviews' | 'news' | 'promo'>('all');
  const [newsComments, setNewsComments] = useState<Record<string, { author: string; content: string; date: string }[]>>(() => {
    return {
      'news-driver-setup': [
        { author: 'Trần Văn Hưng', content: 'Cài đặt theo đúng các bước hướng dẫn là nhận driver ngay, cám ơn SOLUTION B A O nhiều nhé!', date: '16/06/2026' },
        { author: 'Phạm Minh Tuyển', content: 'Máy Mac M2 cài driver này có nhận chuẩn khổ 100x150mm không ạ? Kỹ thuật có hỗ trợ qua UltraViewer không?', date: '18/06/2026' }
      ],
      'news-rj1200-vs-k14': [
        { author: 'Nguyễn Diệp', content: 'Công ty mình dùng RJ1200 thấy rất bền bỉ, dùng 3 năm rồi chưa hề lỗi lầm gì.', date: '30/05/2026' }
      ],
      'news-printer-troubleshooting': [
        { author: 'Thế Anh (Cafe Mộc)', content: 'Lỗi kẹt dao xoay đúng bánh răng trắng là xong. Hú hồn suýt mang đi tiệm sửa!', date: '12/05/2026' }
      ]
    };
  });
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [pulseSpeed, setPulseSpeed] = useState<'slow' | 'fast' | 'off'>(() => {
    return (localStorage.getItem('admin_pulse_speed') as 'slow' | 'fast' | 'off') || 'slow';
  });

  // Warm up Web Speech Synthesis voices for Vietnamese TTS
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.getVoices();
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.getVoices();
        };
      } catch (e) {
        console.warn('Speech synthesis warmup failed:', e);
      }
    }
  }, []);

  const [systemStatus, setSystemStatus] = useState<'green' | 'yellow' | 'red'>('green');
  const [serverLoad, setServerLoad] = useState(12);
  const [latency, setLatency] = useState(18);

  const [audioEnabled, setAudioEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('admin_audio_enabled');
    return saved !== 'false';
  });

  const toggleAudio = () => {
    const nextVal = !audioEnabled;
    setAudioEnabled(nextVal);
    localStorage.setItem('admin_audio_enabled', String(nextVal));
    showToast(nextVal ? 'Đã bật âm thanh cảnh báo!' : 'Đã tắt âm thanh cảnh báo!');
  };

  const playAlertSound = (status: 'yellow' | 'red') => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      if (status === 'red') {
        const osc1 = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(880, ctx.currentTime);
        osc1.frequency.setValueAtTime(440, ctx.currentTime + 0.15);
        
        gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        
        osc1.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc1.start();
        osc1.stop(ctx.currentTime + 0.35);
      } else if (status === 'yellow') {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.06, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      }
    } catch (e) {
      console.warn('Audio play failed:', e);
    }
  };

  const playChimeSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;
      
      const playTone = (freq: number, start: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        gainNode.gain.setValueAtTime(0.15, start);
        gainNode.gain.exponentialRampToValueAtTime(0.001, start + duration);
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + duration);
      };
      
      // Sweet classic double-chime "ding-dong" (C5 followed by E5)
      playTone(523.25, now, 0.4); 
      playTone(659.25, now + 0.12, 0.5); 
    } catch (e) {
      console.warn('Audio play failed:', e);
    }
  };

  const prevStatusRef = useRef<'green' | 'yellow' | 'red'>('green');

  useEffect(() => {
    if (systemStatus !== prevStatusRef.current) {
      if ((systemStatus === 'yellow' || systemStatus === 'red') && audioEnabled) {
        playAlertSound(systemStatus);
      }
      prevStatusRef.current = systemStatus;
    }
  }, [systemStatus, audioEnabled]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate load and latency
      setServerLoad(prev => {
        const delta = Math.floor(Math.random() * 7) - 3; // -3 to +3
        const next = Math.max(4, Math.min(92, prev + delta));
        return next;
      });
      setLatency(prev => {
        const delta = Math.floor(Math.random() * 9) - 4; // -4 to +4
        const next = Math.max(8, Math.min(145, prev + delta));
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!navigator.onLine) {
      setSystemStatus('red');
    } else if (serverLoad > 80 || latency > 110) {
      setSystemStatus('red');
    } else if (serverLoad > 45 || latency > 55) {
      setSystemStatus('yellow');
    } else {
      setSystemStatus('green');
    }
  }, [serverLoad, latency]);

  const handleSetPulseSpeed = (speed: 'slow' | 'fast' | 'off') => {
    setPulseSpeed(speed);
    localStorage.setItem('admin_pulse_speed', speed);
    const speedLabels = {
      slow: 'Chậm (10 giây)',
      fast: 'Nhanh (2 giây)',
      off: 'Tắt hiệu ứng'
    };
    showToast(`Đã đổi tần số nhấp nháy: ${speedLabels[speed]}`);
  };
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  useEffect(() => {
    const handleGlobalClick = () => {
      setContextMenu(null);
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleClearCache = () => {
    localStorage.removeItem('solutionbao_products_catalog');
    localStorage.removeItem('solutionbao_troubleshoots');
    localStorage.removeItem('solutionbao_quote_items');
    localStorage.removeItem('solutionbao_price_alerts');
    setProducts(PRODUCTS_DATA);
    setTroubleshoots(TROUBLESHOOTING_GUIDE);
    setQuoteItems([]);
    setPriceAlerts([]);
    showToast('Đã xóa bộ nhớ đệm và khôi phục dữ liệu mặc định!');
  };

  const handleRefreshInventory = () => {
    const saved = localStorage.getItem('solutionbao_products_catalog');
    const currentProducts = saved ? JSON.parse(saved) : PRODUCTS_DATA;
    setProducts([...currentProducts]);
    showToast('Đã đồng bộ và làm mới danh sách thiết bị!');
  };

  const handleLogout = () => {
    localStorage.removeItem('solutionbao_active_admin');
    localStorage.removeItem('solutionbao_admin_mode');
    setIsAdminMode(false);
    setAdminUser(null);
    setActiveTab('catalog');
    setShowQuickStats(false);
    showToast('Đã thoát khỏi Chế độ Quản trị viên!');
  };

  const [catalogCategory, setCatalogCategory] = useState<string>('all');
  const [catalogSubCategory, setCatalogSubCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'popular' | 'priceAsc' | 'priceDesc'>('popular');
  const [filterPriceRange, setFilterPriceRange] = useState<string>('all');
  const [filterBrand, setFilterBrand] = useState<string>('all');
  const [filterStockStatus, setFilterStockStatus] = useState<string>('all');
  const [filterTag, setFilterTag] = useState<string>('all');
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState<boolean>(false);

  // Auto page transition indicator & smooth scroll top on tab/product/category change
  useEffect(() => {
    setIsPageTransitioning(true);
    setTopPageProgress(30);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const t1 = setTimeout(() => {
      setTopPageProgress(75);
    }, 120);

    const t2 = setTimeout(() => {
      setTopPageProgress(100);
    }, 280);

    const t3 = setTimeout(() => {
      setIsPageTransitioning(false);
      setTopPageProgress(0);
    }, 450);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [activeTab, catalogCategory]);

  // Product Comparison States
  const [comparedProductIds, setComparedProductIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [activeServiceBadgeModal, setActiveServiceBadgeModal] = useState<ServiceBadgeItem | null>(null);

  const handleToggleCompare = (productId: string) => {
    setComparedProductIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= 3) {
        showToast("Bạn chỉ có thể so sánh tối đa 3 sản phẩm cùng lúc!");
        return prev;
      }
      const updated = [...prev, productId];
      showToast(`Đã chọn so sánh: ${updated.length}/3 sản phẩm`);
      return updated;
    });
  };

  // Dynamic Categories States
  const [mainCategories, setMainCategories] = useState<MainCategory[]>(() => {
    const defaultCats: MainCategory[] = [
      {
        id: 'attendance',
        name: 'Máy Chấm Công',
        description: 'Chuyên cung cấp máy chấm công vân tay, khuôn mặt, thẻ cảm ứng chính hãng Ronald Jack, ZKTeco, Wise Eye...',
        imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'máy chấm công, máy chấm công vân tay, máy chấm công khuôn mặt, ronald jack, zkteco',
        isVisible: true,
        sortOrder: 1,
        isFeatured: true,
        badge: '1 đổi 1'
      },
      {
        id: 'printer',
        name: 'Máy In Hóa Đơn, Máy In Bill',
        description: 'Máy in bill hóa đơn tính tiền nhiệt K80, K57 cổng USB, LAN, Wifi cho shop, siêu thị, quán cafe...',
        imageUrl: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'máy in hóa đơn, máy in bill, máy in k80, xprinter, epson',
        isVisible: true,
        sortOrder: 2,
        isFeatured: true,
        badge: 'Bán chạy'
      },
      {
        id: 'scanner',
        name: 'Máy Quét Mã Vạch, Scanner Barcode',
        description: 'Đầu đọc mã vạch 1D, 2D QR Code đơn tia, đa tia, cầm tay không dây bluetooth chính hãng...',
        imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'máy quét mã vạch, đầu đọc mã vạch, máy quét qr code, zebra, honeywell',
        isVisible: true,
        sortOrder: 3,
        isFeatured: true,
        badge: '1 đổi 1'
      },
      {
        id: 'label',
        name: 'Máy in mã vạch | In tem nhãn',
        description: 'Máy in tem mã vạch decal, tem trà sữa, tem trang sức, tem siêu thị độ nét cao 203dpi, 300dpi...',
        imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'máy in tem nhãn, máy in mã vạch, in decal, godex, xprinter label',
        isVisible: true,
        sortOrder: 4,
        isFeatured: true,
        badge: 'Hot'
      },
      {
        id: 'consumable',
        name: 'Giấy In Bill - Giấy In Decal Dán',
        description: 'Cuộn giấy in nhiệt K80, K57 bọc bạc, decal dán nhiệt 1 tem, 2 tem, 3 tem bọc nilon bảo quản cao cấp...',
        imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'giấy in bill, giấy in k80, decal in tem nhãn, giấy in nhiệt',
        isVisible: true,
        sortOrder: 5,
        isFeatured: true,
        badge: '1 đổi 1'
      },
      {
        id: 'drawer',
        name: 'Hộp Đựng Tiền Cash',
        description: 'Két thu ngân đựng tiền 4 ngăn, 5 ngăn, 8 ngăn tự động mở khi in bill kết nối máy in hóa đơn...',
        imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'két đựng tiền, hộp đựng tiền thu ngân, cash drawer',
        isVisible: true,
        sortOrder: 6,
        isFeatured: true
      },
      {
        id: 'pos',
        name: 'Máy bán hàng cảm ứng POS',
        description: 'Trọn bộ máy tính bán hàng cảm ứng 1 màn hình, 2 màn hình, máy POS cầm tay Android Sunmi, Tyso...',
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0a670f4a45a7?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'máy bán hàng pos, máy tính cảm ứng bán hàng, sunmi, tyso pos',
        isVisible: true,
        sortOrder: 7,
        isFeatured: true,
        badge: '1 đổi 1'
      },
      {
        id: 'software',
        name: 'Phần Mềm & Giải Pháp SEO',
        description: 'Giải pháp phần mềm Leo Top Google tăng traffic khủng, phần mềm bán hàng POS, phần mềm chấm công...',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'leo top google, phan mem tang traffic, phan mem seo, phan mem ban hang',
        isVisible: true,
        sortOrder: 8,
        isFeatured: true,
        badge: 'Bản quyền'
      },
      {
        id: 'camera',
        name: 'Camera Giám Sát & An Ninh',
        description: 'Camera IP, Wifi không dây, đầu ghi hình 4K, camera quan sát cửa hàng và văn phòng...',
        imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'camera quan sát, camera giám sát, camera ip, camera wifi',
        isVisible: true,
        sortOrder: 9,
        isFeatured: true,
        badge: 'Full HD'
      },
      {
        id: 'laptop',
        name: 'Laptop & Máy Tính Văn Phòng',
        description: 'Laptop làm việc, máy tính để bàn PC thu ngân, cấu hình mượt mà, bảo hành chính hãng 24 tháng...',
        imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'laptop van phong, may tinh thu ngan, pc van phong',
        isVisible: true,
        sortOrder: 10,
        isFeatured: true,
        badge: 'Chính hãng'
      },
      {
        id: 'network',
        name: 'Thiết Bị Mạng & Wifi Router',
        description: 'Bộ phát wifi chuyên dụng chịu tải cao, switch chia mạng gigabit cho văn phòng và nhà hàng...',
        imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'thiet bi mang, wifi router, switch gigabit',
        isVisible: true,
        sortOrder: 11,
        isFeatured: true,
        badge: 'Tốc độ cao'
      },
      {
        id: 'counter',
        name: 'Máy Đếm Tiền Tự Động',
        description: 'Máy đếm tiền phát hiện tiền giả siêu chuẩn, kiểm tra polime cao cấp Silicon, Xiudun, Modul...',
        imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'may dem tien, may phat hien tien gia',
        isVisible: true,
        sortOrder: 12,
        isFeatured: true,
        badge: 'Phát hiện giả'
      },
      {
        id: 'phone',
        name: 'Bộ Đàm & Điện Thoại Bàn',
        description: 'Bộ đàm cầm tay liên lạc tầm xa cho bảo vệ, nhà hàng, khách sạn và điện thoại bàn IP Panasonic...',
        imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'bo dam, dien thoai ban, bo dam nha hang',
        isVisible: true,
        sortOrder: 13,
        isFeatured: true,
        badge: 'Hot'
      },
      {
        id: 'accessories',
        name: 'Phụ Kiện Bán Hàng & Dây Cáp',
        description: 'Dây cáp máy in USB, cáp mạng đúc sẵn, adapter nguồn 12V 24V, chân đế máy quét mã vạch...',
        imageUrl: 'https://images.unsplash.com/photo-1618761714958-0651abb19631?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'phu kien ban hang, cap may in, chan de may quet',
        isVisible: true,
        sortOrder: 14,
        isFeatured: true,
        badge: 'Giảm 20%'
      }
    ];
    const saved = localStorage.getItem('solutionbao_main_categories');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const map = new Map<string, MainCategory>();
          parsed.forEach((c: any) => {
            if (c && c.id && !map.has(c.id)) {
              if (c.isFeatured === undefined) {
                c.isFeatured = true;
              }
              map.set(c.id, c);
            }
          });
          defaultCats.forEach((c) => {
            if (!map.has(c.id)) {
              map.set(c.id, c);
            }
          });
          const merged = Array.from(map.values());
          localStorage.setItem('solutionbao_main_categories', JSON.stringify(merged));
          return merged;
        }
      } catch (e) {
        console.error('Error parsing mainCategories:', e);
      }
    }
    return defaultCats;
  });

  // Filtered & Sorted Active Visible Categories for Display
  const visibleMainCategories = useMemo(() => {
    const map = new Map<string, MainCategory>();
    mainCategories
      .filter((c) => c.isVisible !== false)
      .sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99))
      .forEach((c) => {
        if (!map.has(c.id)) {
          map.set(c.id, c);
        }
      });
    return Array.from(map.values());
  }, [mainCategories]);

  const [subCategories, setSubCategories] = useState<SubCategory[]>(() => {
    const defaultSubs: SubCategory[] = [
      // Máy chấm công
      {
        id: 'sub-att-rj',
        mainCategoryId: 'attendance',
        name: 'Máy Chấm Công Ronald Jack',
        brandBadge: 'RONALD JACK',
        description: 'Chuyên các dòng máy chấm công vân tay, khuôn mặt Ronald Jack RJ1200, DG600, RJ3900...',
        imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'máy chấm công ronald jack, rj1200, dg600',
        isVisible: true,
        sortOrder: 1
      },
      {
        id: 'sub-att-zk',
        mainCategoryId: 'attendance',
        name: 'Máy Chấm Công ZKTeco',
        brandBadge: 'ZKTECO',
        description: 'Máy chấm công ZKTeco K14, MB20, FaceID công nghệ sinh trắc học hiện đại...',
        imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'máy chấm công zkteco, zkteco k14, mb20',
        isVisible: true,
        sortOrder: 2
      },
      {
        id: 'sub-att-gg',
        mainCategoryId: 'attendance',
        name: 'Máy Chấm Công Gigata',
        brandBadge: 'GIGATA',
        description: 'Dòng máy chấm công Gigata dung lượng bộ nhớ cao phù hợp văn phòng, nhà xưởng...',
        imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'máy chấm công gigata, gigata t8',
        isVisible: true,
        sortOrder: 3
      },
      {
        id: 'sub-att-we',
        mainCategoryId: 'attendance',
        name: 'Máy Chấm Công Wise Eye',
        brandBadge: 'WISE EYE',
        description: 'Máy chấm công Wise Eye kèm phần mềm chấm công tiếng Việt chuyên nghiệp...',
        imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'máy chấm công wise eye, phần mềm wise eye',
        isVisible: true,
        sortOrder: 4
      },

      // Máy in hóa đơn
      {
        id: 'sub-prn-xp',
        mainCategoryId: 'printer',
        name: 'Máy In Bill Xprinter',
        brandBadge: 'XPRINTER',
        description: 'Máy in bill hóa đơn nhiệt K80 Xprinter XP-Q200, A160M, C300H tốc độ in nhanh 200mm/s...',
        imageUrl: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'máy in bill xprinter, xprinter q200, xprinter a160m',
        isVisible: true,
        sortOrder: 1
      },
      {
        id: 'sub-prn-ep',
        mainCategoryId: 'printer',
        name: 'Máy In Bill Epson',
        brandBadge: 'EPSON',
        description: 'Máy in hóa đơn siêu bền Epson TM-T82, TM-T88 cao cấp dành cho nhà hàng, chuỗi cửa hàng...',
        imageUrl: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'máy in hóa đơn epson, epson tm-t82',
        isVisible: true,
        sortOrder: 2
      },

      // Đầu đọc mã vạch
      {
        id: 'sub-scn-xp',
        mainCategoryId: 'scanner',
        name: 'Máy Quét Mã Vạch Xprinter',
        brandBadge: 'XPRINTER',
        description: 'Đầu đọc mã vạch cầm tay 1D 2D không dây bluetooth Xprinter XP-2101G...',
        imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'máy quét mã vạch xprinter, xp-2101g',
        isVisible: true,
        sortOrder: 1
      },
      {
        id: 'sub-scn-hw',
        mainCategoryId: 'scanner',
        name: 'Máy Quét Đa Tia Honeywell Orbit',
        brandBadge: 'HONEYWELL',
        description: 'Máy quét mã vạch đa tia Honeywell Orbit MS7120 để bàn tốc độ cao quét 20 tia...',
        imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'honeywell orbit, ms7120, máy quét đa tia',
        isVisible: true,
        sortOrder: 2
      },
      {
        id: 'sub-scn-zb',
        mainCategoryId: 'scanner',
        name: 'Máy Quét Mã Vạch Zebra',
        brandBadge: 'ZEBRA',
        description: 'Đầu đọc mã vạch Zebra LI2208, DS2208 siêu nhạy thương hiệu Mỹ chính hãng...',
        imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'máy quét zebra, zebra li2208',
        isVisible: true,
        sortOrder: 3
      },

      // Máy in tem nhãn
      {
        id: 'sub-lbl-xp',
        mainCategoryId: 'label',
        name: 'Máy In Tem Nhãn Xprinter',
        brandBadge: 'XP-LABEL',
        description: 'Máy in tem mã vạch decal nhiệt Xprinter XP-350B, XP-420B in vận đơn Shopee, TikTok...',
        imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'máy in tem xprinter, xp-350b, xp-420b',
        isVisible: true,
        sortOrder: 1
      },
      {
        id: 'sub-lbl-gd',
        mainCategoryId: 'label',
        name: 'Máy In Tem Mã Vạch GoDEX',
        brandBadge: 'GODEX',
        description: 'Máy in tem nhãn GoDEX G500, EZ1100 Plus sử dụng ruy băng mực độ bền cao...',
        imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'máy in godex g500, godex ez1100',
        isVisible: true,
        sortOrder: 2
      },

      // Giấy in & vật tư
      {
        id: 'sub-con-bill',
        mainCategoryId: 'consumable',
        name: 'Giấy In Bill K80 / K57',
        brandBadge: 'OJI JAPAN',
        description: 'Cuộn giấy in nhiệt K80x45, K80x80, K57 bọc bạc chống ẩm thương hiệu Oji Nhật Bản...',
        imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'giấy in bill k80, giấy in nhiệt k57',
        isVisible: true,
        sortOrder: 1
      },
      {
        id: 'sub-con-decal',
        mainCategoryId: 'consumable',
        name: 'Giấy Decal Tem Nhãn',
        brandBadge: 'DECAL TEM',
        description: 'Decal dán nhiệt 1 tem 50x30, 2 tem 35x22, decal A6 in vận đơn tự dính...',
        imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'decal tem nhãn, decal a6, decal 50x30',
        isVisible: true,
        sortOrder: 2
      },

      // Máy POS & Két tiền
      {
        id: 'sub-pos-tyso',
        mainCategoryId: 'pos',
        name: 'Máy POS Cảm Ứng Tyso',
        brandBadge: 'TYSO POS',
        description: 'Trọn bộ máy tính bán hàng POS Tyso 1 màn hình, 2 màn hình kép màn full HD...',
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0a670f4a45a7?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'máy pos tyso, tyso cảm ứng',
        isVisible: true,
        sortOrder: 1
      },
      {
        id: 'sub-pos-sunmi',
        mainCategoryId: 'pos',
        name: 'Máy POS Bán Hàng Sunmi',
        brandBadge: 'SUNMI',
        description: 'Máy POS cầm tay Sunmi V2, V2 Pro tích hợp máy in bill nhiệt tiện lợi...',
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0a670f4a45a7?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'máy pos sunmi, sunmi v2',
        isVisible: true,
        sortOrder: 2
      },
      {
        id: 'sub-pos-other',
        mainCategoryId: 'drawer',
        name: 'Hộp Đựng Tiền Thu Ngân Cash',
        brandBadge: 'CASH DRAWER',
        description: 'Két thu ngân 4 ngăn, 5 ngăn kẹp giấy tờ kết nối tự động mở khi in bill...',
        imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'hộp đựng tiền thu ngân, két thu ngân cash',
        isVisible: true,
        sortOrder: 1
      },
      {
        id: 'sub-sw-seo',
        mainCategoryId: 'software',
        name: 'Phần Mềm SEO & Traffic Google',
        brandBadge: 'LEO TOP GOOGLE',
        description: 'Công cụ tăng traffic tự nhiên, đẩy thứ hạng website lên top Google an toàn',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
        seoKeywords: 'leo top google, tang traffic, seo website',
        isVisible: true,
        sortOrder: 1
      }
    ];
    const saved = localStorage.getItem('solutionbao_sub_categories');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const map = new Map<string, SubCategory>();
          parsed.forEach((s: any) => {
            if (s && s.id && !map.has(s.id)) {
              map.set(s.id, s);
            }
          });
          defaultSubs.forEach((s) => {
            if (!map.has(s.id)) {
              map.set(s.id, s);
            }
          });
          const merged = Array.from(map.values());
          localStorage.setItem('solutionbao_sub_categories', JSON.stringify(merged));
          return merged;
        }
      } catch (e) {
        console.error('Error parsing subCategories:', e);
      }
    }
    return defaultSubs;
  });

  const visibleSubCategories = useMemo(() => {
    const map = new Map<string, SubCategory>();
    subCategories
      .filter((s) => s.isVisible !== false)
      .sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99))
      .forEach((s) => {
        if (!map.has(s.id)) {
          map.set(s.id, s);
        }
      });
    return Array.from(map.values());
  }, [subCategories]);

  // Dynamic mega menu category list built directly from admin managed main categories
  const dynamicMegaMenuCategories = useMemo(() => {
    const dealCat = {
      id: 'deal',
      label: 'Deal - Khuyến Mãi Hôm Nay',
      description: 'Hàng chính hãng Bảo Technology bảo hành 12-24 tháng',
      isDeal: true,
    };
    const mainList = visibleMainCategories.map((mc) => ({
      id: mc.id,
      label: mc.name,
      description: mc.description || 'Hàng chính hãng Bảo Technology bảo hành 12-24 tháng',
      isDeal: false,
    }));
    return [dealCat, ...mainList];
  }, [visibleMainCategories]);

  useEffect(() => {
    localStorage.setItem('solutionbao_main_categories', JSON.stringify(mainCategories));
  }, [mainCategories]);

  useEffect(() => {
    localStorage.setItem('solutionbao_sub_categories', JSON.stringify(subCategories));
  }, [subCategories]);

  // Solution Banners state with local storage persistence
  const [solutionBanners, setSolutionBanners] = useState<SolutionBanner[]>(() => {
    try {
      const saved = localStorage.getItem('solutionbao_solution_banners');
      if (saved) {
        const parsed: SolutionBanner[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const map = new Map<string, SolutionBanner>();
          parsed.forEach((b) => { if (b && b.id) map.set(b.id, b); });
          DEFAULT_SOLUTION_BANNERS.forEach((def) => {
            if (!map.has(def.id)) {
              map.set(def.id, def);
            }
          });
          return Array.from(map.values());
        }
      }
    } catch (e) {
      console.error('Error parsing solution banners:', e);
    }
    return DEFAULT_SOLUTION_BANNERS;
  });

  useEffect(() => {
    localStorage.setItem('solutionbao_solution_banners', JSON.stringify(solutionBanners));
  }, [solutionBanners]);

  const handleSolutionBannerClick = (banner: SolutionBanner) => {
    if (banner.actionType === 'open_ai') {
      setActiveTab('advisor');
      if (banner.aiPrompt) {
        handleSendAiMessage(banner.aiPrompt);
      }
    } else if (banner.actionType === 'view_catalog') {
      if (banner.targetCategory) {
        setCatalogCategory(banner.targetCategory);
        setCatalogSubCategory('all');
      } else {
        setCatalogCategory('all');
        setCatalogSubCategory('all');
      }
      setActiveTab('catalog');
    } else if (banner.actionType === 'view_quote') {
      setActiveTab('quote');
    } else if (banner.actionType === 'custom_url') {
      if (banner.customUrl) {
        if (banner.customUrl.startsWith('http')) {
          window.open(banner.customUrl, '_blank');
        } else {
          window.location.href = banner.customUrl;
        }
      }
    }
  };

  // Helper: Giới hạn tối đa 10 sản phẩm nổi bật cho mỗi danh mục (sản phẩm nào nổi bật sau thì đẩy sản phẩm nổi bật cũ tắt đi)
  const enforceMaxFeaturedPerCategory = (prods: Product[], maxLimit: number = 10): Product[] => {
    // Nhóm sản phẩm nổi bật theo danh mục
    const catMap = new Map<string, Product[]>();
    prods.forEach((p) => {
      const isFeat = p.isPopular === true || p.isFeatured === true;
      if (isFeat) {
        const catKey = p.category || 'other';
        if (!catMap.has(catKey)) catMap.set(catKey, []);
        catMap.get(catKey)!.push(p);
      }
    });

    // Xác định ID các sản phẩm cần giữ nổi bật (tối đa 10 sản phẩm mới nhất / ưu tiên cho mỗi danh mục)
    const allowedFeaturedIds = new Set<string>();
    catMap.forEach((catProds) => {
      if (catProds.length <= maxLimit) {
        catProds.forEach((p) => allowedFeaturedIds.add(p.id));
      } else {
        // Sắp xếp: ưu tiên sản phẩm có featuredAt mới hơn, hoặc nếu bằng nhau/chưa có thì lấy các sản phẩm ở cuối danh sách (được thêm/bật sau)
        const sorted = [...catProds].sort((a, b) => {
          const timeA = a.featuredAt || 0;
          const timeB = b.featuredAt || 0;
          if (timeB !== timeA) return timeB - timeA;
          return catProds.indexOf(b) - catProds.indexOf(a);
        });
        sorted.slice(0, maxLimit).forEach((p) => allowedFeaturedIds.add(p.id));
      }
    });

    return prods.map((p) => {
      const wasFeat = p.isPopular === true || p.isFeatured === true;
      if (wasFeat && !allowedFeaturedIds.has(p.id)) {
        return {
          ...p,
          isPopular: false,
          isFeatured: false
        };
      }
      return p;
    });
  };

  // Dynamic Products and Troubleshoot Guides States (Persisted in LocalStorage)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('solutionbao_products_catalog');
    if (saved) {
      try {
        const parsed: Product[] = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const map = new Map<string, Product>();
          parsed.forEach((p) => {
            if (p && p.id && !map.has(p.id)) {
              map.set(p.id, p);
            }
          });
          PRODUCTS_DATA.forEach((p) => {
            if (!map.has(p.id)) {
              map.set(p.id, p);
            }
          });
          const merged = enforceMaxFeaturedPerCategory(Array.from(map.values()), 10);
          localStorage.setItem('solutionbao_products_catalog', JSON.stringify(merged));
          return merged;
        }
      } catch (e) {
        console.error('Error parsing saved products:', e);
      }
    }
    return enforceMaxFeaturedPerCategory(PRODUCTS_DATA, 10);
  });

  const [troubleshoots, setTroubleshoots] = useState<any[]>(() => {
    const saved = localStorage.getItem('solutionbao_troubleshoots');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved troubleshoots:', e);
      }
    }
    return TROUBLESHOOTING_GUIDE;
  });

  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(() => {
    const saved = localStorage.getItem('solutionbao_news_articles');
    if (saved) {
      try {
        const parsed: NewsArticle[] = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const map = new Map<string, NewsArticle>();
          parsed.forEach((a) => {
            if (a && a.id && !map.has(a.id)) {
              map.set(a.id, a);
            }
          });
          NEWS_ARTICLES.forEach((a) => {
            if (!map.has(a.id)) {
              map.set(a.id, a);
            }
          });
          const merged = Array.from(map.values());
          localStorage.setItem('solutionbao_news_articles', JSON.stringify(merged));
          return merged;
        }
      } catch (e) {
        console.error('Error parsing saved news articles:', e);
      }
    }
    return NEWS_ARTICLES;
  });

  const [webConfig, setWebConfig] = useState(() => {
    const saved = localStorage.getItem('solutionbao_web_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return {
            primaryPhone: "0908.555.547",
            secondaryPhone: "028.6681.4847",
            supportName: "Mr. Bảo Bảo",
            zaloPhone: "0908555547",
            zaloLink: "https://zalo.me/0908555547",
            address: "Số 355/4E Sư Vạn Hạnh, Phường 12, Quận 10, TP. Hồ Chí Minh",
            companyName: "SOLUTION B A O TECHNOLOGY",
            taxCode: "0315357891",
            email: "info@solutionbao.vn",
            facebookLink: "https://facebook.com",
            logoText: "SOLUTION B A O",
            logoSubtext: "TECH",
            logoImageUrl: "",
            footerCompanyName: "Quản lý cửa hàng & doanh nghiệp",
            footerLogoText: "SB",
            footerLogoImageUrl: "",
            footerDescription: "Chuyên phân phối, lắp đặt các giải pháp quản lý bán hàng toàn diện, chính hãng hàng đầu tại Việt Nam. Quản lý cửa hàng & doanh nghiệp - Uy tín xây dựng niềm tin trọn vẹn.",
            footerTaxCode: "0315357891",
            footerCopyright: `Bản quyền © ${new Date().getFullYear()} Quản lý cửa hàng & doanh nghiệp.`,
            showTopHeaderBar: true,
            showHeaderBar: true,
            showHeaderLogo: true,
            showHeaderSearch: true,
            showHeaderHotline: true,
            showHeaderCart: true,
            showNavBar: true,
            showNavCategories: true,
            showThemeToggle: true,
            themeMode: "light",
            primaryColor: "red",
            flashSaleActive: true,
            flashSaleEndTime: "",
            flashSaleTitle: "⚡ GIỜ VÀNG FLASH SALE GIÁ SỐC",
            flashSaleSubtitle: "Khuyến mãi kết thúc sau:",
            partners: ['ZKTeco', 'Ronald Jack', 'Xprinter', 'Epson', 'Honeywell', 'Zebra', 'MB Bank'],
            headerItems: DEFAULT_HEADER_ITEMS,
            heroSideBanners: DEFAULT_HERO_SIDE_BANNERS,
            heroQuickTags: DEFAULT_HERO_QUICK_TAGS,
            serviceBadges: DEFAULT_SERVICE_BADGES,
            feedBanners: DEFAULT_FEED_BANNERS,
            googleSiteVerification: localStorage.getItem('solutionbao_gsc_verification') || "",
            googleAnalyticsId: localStorage.getItem('solutionbao_ga4_id') || "",
            slides: [
              {
                title: "💥 TUẦN LỄ VÀNG SOLUTION B A O - GIẢM GIÁ ĐẾN 45% - TẶNG KÈM PHẦN MỀM CHẤM CÔNG CHUYÊN NGHIỆP TRỌN ĐỜI",
                subtitle: "Áp dụng khi mua các dòng Ronald Jack, Gigata, Wise Eye. Hỗ trợ cài đặt UltraViewer từ xa 100% miễn phí.",
                imageBg: "bg-gradient-to-r from-red-800 via-rose-900 to-red-950"
              },
              {
                title: "MÁY IN HÓA ĐƠN XPRINTER CHÍNH HÃNG - BẢO HÀNH 12 THÁNG",
                subtitle: "Giải pháp in ấn hóa đơn không dây từ điện thoại, máy tính bảng qua mạng Wifi/LAN siêu tốc cực ổn định.",
                imageBg: "bg-gradient-to-r from-rose-800 via-red-900 to-slate-950"
              },
              {
                title: "MÁY IN TEM VẬN ĐƠN SHOPEE/TIKTOK SHOP GIÁ CỰC TỐT",
                subtitle: "In siêu tốc khổ A6 100x150mm. Tương thích mượt mà mọi dòng máy tính Windows và macOS.",
                imageBg: "bg-gradient-to-r from-red-700 via-rose-800 to-amber-900"
              }
            ],
            ...parsed,
            ...(parsed.slides ? {
              slides: parsed.slides.map((s: any) => 
                s.title === "TẶNG PHẦN MỀM CHẤM CÔNG TIẾNG VIỆT TRỌN ĐỜI" 
                  ? { ...s, title: "💥 TUẦN LỄ VÀNG SOLUTION B A O - GIẢM GIÁ ĐẾN 45% - TẶNG KÈM PHẦN MỀM CHẤM CÔNG CHUYÊN NGHIỆP TRỌN ĐỜI" } 
                  : s
              )
            } : {})
          };
        }
      } catch (e) {
        console.error('Error parsing web config:', e);
      }
    }
    return {
      primaryPhone: "0908.555.547",
      secondaryPhone: "028.6681.4847",
      supportName: "Mr. Bảo Bảo",
      zaloPhone: "0908555547",
      zaloLink: "https://zalo.me/0908555547",
      address: "Số 355/4E Sư Vạn Hạnh, Phường 12, Quận 10, TP. Hồ Chí Minh",
      companyName: "SOLUTION B A O TECHNOLOGY",
      taxCode: "0315357891",
      email: "info@solutionbao.vn",
      facebookLink: "https://facebook.com",
      logoText: "SOLUTION B A O",
      logoSubtext: "TECH",
      logoImageUrl: "",
      footerCompanyName: "Quản lý cửa hàng & doanh nghiệp",
      footerLogoText: "SB",
      footerLogoImageUrl: "",
      footerDescription: "Chuyên phân phối, lắp đặt các giải pháp quản lý bán hàng toàn diện, chính hãng hàng đầu tại Việt Nam. Quản lý cửa hàng & doanh nghiệp - Uy tín xây dựng niềm tin trọn vẹn.",
      footerTaxCode: "0315357891",
      footerCopyright: `Bản quyền © ${new Date().getFullYear()} Quản lý cửa hàng & doanh nghiệp.`,
      showTopHeaderBar: true,
      showHeaderBar: true,
      showHeaderLogo: true,
      showHeaderSearch: true,
      showHeaderHotline: true,
      showHeaderCart: true,
      showNavBar: true,
      showNavCategories: true,
      showThemeToggle: true,
      themeMode: "light",
      primaryColor: "red",
      flashSaleActive: true,
      flashSaleEndTime: "",
      flashSaleTitle: "⚡ GIỜ VÀNG FLASH SALE GIÁ SỐC",
      flashSaleSubtitle: "Khuyến mãi kết thúc sau:",
      partners: ['ZKTeco', 'Ronald Jack', 'Xprinter', 'Epson', 'Honeywell', 'Zebra', 'MB Bank'],
      headerItems: DEFAULT_HEADER_ITEMS,
      googleSiteVerification: localStorage.getItem('solutionbao_gsc_verification') || "",
      googleAnalyticsId: localStorage.getItem('solutionbao_ga4_id') || "",
      slides: [
        {
          title: "💥 TUẦN LỄ VÀNG SOLUTION B A O - GIẢM GIÁ ĐẾN 45% - TẶNG KÈM PHẦN MỀM CHẤM CÔNG CHUYÊN NGHIỆP TRỌN ĐỜI",
          subtitle: "Áp dụng khi mua các dòng Ronald Jack, Gigata, Wise Eye. Hỗ trợ cài đặt UltraViewer từ xa 100% miễn phí.",
          imageBg: "bg-gradient-to-r from-red-800 via-rose-900 to-red-950"
        },
        {
          title: "MÁY IN HÓA ĐƠN XPRINTER CHÍNH HÃNG - BẢO HÀNH 12 THÁNG",
          subtitle: "Giải pháp in ấn hóa đơn không dây từ điện thoại, máy tính bảng qua mạng Wifi/LAN siêu tốc cực ổn định.",
          imageBg: "bg-gradient-to-r from-rose-800 via-red-900 to-slate-950"
        },
        {
          title: "MÁY IN TEM VẬN ĐƠN SHOPEE/TIKTOK SHOP GIÁ CỰC TỐT",
          subtitle: "In siêu tốc khổ A6 100x150mm. Tương thích mượt mà mọi dòng máy tính Windows và macOS.",
          imageBg: "bg-gradient-to-r from-red-700 via-rose-800 to-amber-900"
        }
      ]
    };
  });

  const saveWebConfig = (newConfig: any) => {
    setWebConfig(newConfig);
    localStorage.setItem('solutionbao_web_config', JSON.stringify(newConfig));
    if (newConfig?.googleSiteVerification !== undefined) {
      localStorage.setItem('solutionbao_gsc_verification', newConfig.googleSiteVerification);
    }
    if (newConfig?.googleAnalyticsId !== undefined) {
      localStorage.setItem('solutionbao_ga4_id', newConfig.googleAnalyticsId);
    }
  };

  const [productReviews, setProductReviews] = useState<ProductReview[]>(() => {
    const saved = localStorage.getItem('solutionbao_product_reviews');
    let loaded = INITIAL_PRODUCT_REVIEWS;
    if (saved) {
      try {
        loaded = JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing product reviews:', e);
      }
    }
    // Đảm bảo tất cả đánh giá đều có ID duy nhất để quản trị viên có thể xóa được
    let changed = false;
    const verified = loaded.map((r, idx) => {
      if (!r.id) {
        changed = true;
        return { ...r, id: `rev-${r.productId || 'legacy'}-${idx}-${Date.now()}` };
      }
      return r;
    });
    if (changed) {
      localStorage.setItem('solutionbao_product_reviews', JSON.stringify(verified));
    }
    return verified;
  });

  const saveProductReviews = (updatedReviews: ProductReview[]) => {
    setProductReviews(updatedReviews);
    localStorage.setItem('solutionbao_product_reviews', JSON.stringify(updatedReviews));
  };

  // All products included in Bestsellers across all categories (Chỉ lấy sản phẩm được bấm chọn nổi bật)
  const allBestsellersList = useMemo(() => {
    // Lọc tất cả sản phẩm được bấm chọn nổi bật (isPopular hoặc isFeatured)
    const featuredProds = products.filter((p) => p.isPopular === true || p.isFeatured === true);
    if (featuredProds.length > 0) {
      return featuredProds;
    }
    // Fallback nếu chưa có sản phẩm nào được bấm chọn nổi bật
    return products.slice(0, 10);
  }, [products]);

  // Dynamic bestseller categories: Khi một sản phẩm được bấm chọn nổi bật thì danh mục đó mới được hiện ở đây
  const bestsellerCategories = useMemo(() => {
    // Lọc danh mục chứa ít nhất 1 sản phẩm được bấm chọn nổi bật
    const categoriesWithFeatured = visibleMainCategories.filter((mc) => {
      return products.some(
        (p) =>
          (p.isPopular === true || p.isFeatured === true) &&
          (p.category === mc.id || p.category === mc.name || p.subCategoryId === mc.id)
      );
    });

    // Nếu có danh mục chứa sản phẩm nổi bật, chỉ hiện các danh mục đó
    // Nếu chưa có sản phẩm nào tick nổi bật, fallback hiển thị visibleMainCategories
    const targetCategories = categoriesWithFeatured.length > 0 
      ? categoriesWithFeatured 
      : visibleMainCategories;

    return [
      {
        id: 'featured',
        label: 'Tất cả nổi bật',
        icon: <Sparkles className="w-5 h-5" />,
        count: `${allBestsellersList.length} SP`,
        bg: 'from-amber-500 to-orange-500 text-white'
      },
      ...targetCategories.map((mc, idx) => {
        const catPopular = products.filter(
          (p) =>
            (p.isPopular === true || p.isFeatured === true) &&
            (p.category === mc.id || p.category === mc.name || p.subCategoryId === mc.id)
        );
        const catList = catPopular.length > 0 
          ? catPopular 
          : products.filter((p) => p.category === mc.id || p.category === mc.name);
        return {
          id: mc.id,
          label: mc.name,
          icon: getCategoryIcon(mc.id, mc.name),
          count: `${catList.length} SP`,
          bg: getCategoryBg(idx + 1)
        };
      })
    ];
  }, [visibleMainCategories, products, allBestsellersList]);

  // State xem thêm cho tab Tất cả nổi bật: mặc định chỉ hiện 10 sản phẩm
  const [showAllFeatured, setShowAllFeatured] = useState<boolean>(false);

  // Tự động reset về mặc định 10 sản phẩm khi chuyển tab
  useEffect(() => {
    setShowAllFeatured(false);
  }, [homeTab]);

  // Khi danh mục hiện tại không còn nằm trong danh sách danh mục nổi bật, tự động quay về 'featured'
  useEffect(() => {
    if (homeTab !== 'featured' && !bestsellerCategories.some((c) => c.id === homeTab)) {
      setHomeTab('featured');
    }
  }, [bestsellerCategories, homeTab]);

  // Combo Trọn Bộ / Giải pháp tiết kiệm (Bundle & Save) States
  const [comboBundles, setComboBundles] = useState<ComboBundle[]>(() => {
    const saved = localStorage.getItem('solutionbao_combo_bundles');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Error parsing combo bundles:', e);
      }
    }
    return DEFAULT_COMBO_BUNDLES;
  });

  const saveComboBundles = (updatedBundles: ComboBundle[]) => {
    setComboBundles(updatedBundles);
    localStorage.setItem('solutionbao_combo_bundles', JSON.stringify(updatedBundles));
  };

  // Cấu hình khối giới thiệu Combo Trọn Bộ (Bundle & Save) phía dưới
  const [comboShowcaseConfig, setComboShowcaseConfig] = useState<ComboShowcaseConfig>(() => {
    const saved = localStorage.getItem('solutionbao_combo_showcase_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return { ...DEFAULT_COMBO_SHOWCASE_CONFIG, ...parsed };
      } catch (e) {
        console.error('Error parsing combo showcase config:', e);
      }
    }
    return DEFAULT_COMBO_SHOWCASE_CONFIG;
  });

  const saveComboShowcaseConfig = (updated: ComboShowcaseConfig) => {
    setComboShowcaseConfig(updated);
    localStorage.setItem('solutionbao_combo_showcase_config', JSON.stringify(updated));
  };

  // State trượt ngang hiển thị 2 ảnh banner giải pháp, trượt 20s một lần hoặc bấm chuyển
  const [solutionBannerSlideIndex, setSolutionBannerSlideIndex] = useState<number>(0);
  const [isSolutionBannerHovered, setIsSolutionBannerHovered] = useState<boolean>(false);

  // Auto-slide 20s một lần khi không bị rê chuột hover: trượt 1 lần 2 ảnh
  useEffect(() => {
    const visibleCount = solutionBanners.filter(b => b.isVisible).length;
    if (visibleCount <= 2 || isSolutionBannerHovered) return;

    const maxSlide = Math.max(0, visibleCount - 2);
    const interval = setInterval(() => {
      setSolutionBannerSlideIndex((prev) => {
        // Trượt 1 lần 2 ảnh: tăng thêm 2
        const next = prev + 2;
        return next > maxSlide ? 0 : next;
      });
    }, 20000); // 20s trượt 1 lần theo yêu cầu

    return () => clearInterval(interval);
  }, [solutionBanners, isSolutionBannerHovered]);

  const getProductReviews = (productId: string) => {
    return productReviews.filter((r) => r.productId === productId);
  };

  const getAverageRating = (productId: string) => {
    const reviews = getProductReviews(productId);
    if (reviews.length === 0) {
      let hash = 0;
      for (let i = 0; i < productId.length; i++) {
        hash = productId.charCodeAt(i) + ((hash << 5) - hash);
      }
      const diff = (Math.abs(hash) % 3) / 10;
      return (4.7 + diff).toFixed(1);
    }
    const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const getProductReviewsCount = (productId: string) => {
    const reviews = getProductReviews(productId);
    if (reviews.length === 0) {
      let hash = 0;
      for (let i = 0; i < productId.length; i++) {
        hash = productId.charCodeAt(i) + ((hash << 5) - hash);
      }
      return (Math.abs(hash) % 8) + 5;
    }
    return reviews.length;
  };

  const saveProducts = (updatedProducts: Product[]) => {
    const sanitized = enforceMaxFeaturedPerCategory(updatedProducts, 10);
    setProducts(sanitized);
    localStorage.setItem('solutionbao_products_catalog', JSON.stringify(sanitized));
  };

  const saveTroubleshoots = (updatedGuides: any[]) => {
    setTroubleshoots(updatedGuides);
    localStorage.setItem('solutionbao_troubleshoots', JSON.stringify(updatedGuides));
  };

  const saveNewsArticles = (updatedArticles: NewsArticle[]) => {
    setNewsArticles(updatedArticles);
    localStorage.setItem('solutionbao_news_articles', JSON.stringify(updatedArticles));
  };

  const generateXMLSitemap = (prodList: Product[], articleList: NewsArticle[]): string => {
    const productsSafe = prodList || [];
    const articlesSafe = articleList || [];
    
    // Fallback sitemap if empty or not fully loaded
    if (productsSafe.length === 0 && articlesSafe.length === 0) {
      return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <!-- Trạng thái chờ tải dữ liệu hoặc danh sách rỗng -->\n  <url>\n    <loc>https://solutionbao.vn/</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>`;
    }

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    // 1. Homepage
    xml += `  <url>\n`;
    xml += `    <loc>https://solutionbao.vn/</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>1.0</priority>\n`;
    xml += `  </url>\n`;

    // 2. All Products
    productsSafe.forEach((p) => {
      xml += `  <url>\n`;
      xml += `    <loc>https://solutionbao.vn/thiet-bi/${p.id}</loc>\n`;
      xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    });

    // 3. All Articles
    articlesSafe.forEach((art) => {
      xml += `  <url>\n`;
      xml += `    <loc>https://solutionbao.vn/tin-tuc/${art.id}</loc>\n`;
      xml += `    <lastmod>${art.date || new Date().toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;
    return xml;
  };

  // Active Admin Session State
  const [adminUser, setAdminUser] = useState<any>(() => {
    try {
      const saved = localStorage.getItem('solutionbao_active_admin');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Admin Direct Edit / Add Mode (Only enabled when admin user is actively logged in)
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    const savedAdmin = localStorage.getItem('solutionbao_active_admin');
    if (!savedAdmin) return false;
    return localStorage.getItem('solutionbao_admin_mode') === 'true';
  });

  useEffect(() => {
    const checkSession = () => {
      try {
        const saved = localStorage.getItem('solutionbao_active_admin');
        const parsed = saved ? JSON.parse(saved) : null;
        setAdminUser(parsed);
        if (!parsed) {
          setIsAdminMode(false);
          localStorage.removeItem('solutionbao_admin_mode');
        }
      } catch (e) {
        setAdminUser(null);
        setIsAdminMode(false);
        localStorage.removeItem('solutionbao_admin_mode');
      }
    };
    checkSession();
    window.addEventListener('storage', checkSession);
    window.addEventListener('solutionbao_admin_logout', checkSession);
    const interval = setInterval(checkSession, 1000);
    return () => {
      window.removeEventListener('storage', checkSession);
      window.removeEventListener('solutionbao_admin_logout', checkSession);
      clearInterval(interval);
    };
  }, [activeTab]);

  // System Notifications state (orders and consultations)
  const [notifications, setNotifications] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('solutionbao_system_notifications');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [showNotifDropdown, setShowNotifDropdown] = useState<boolean>(false);

  const saveNotifications = (newNotifs: any[]) => {
    setNotifications(newNotifs);
    localStorage.setItem('solutionbao_system_notifications', JSON.stringify(newNotifs));
    window.dispatchEvent(new CustomEvent('solutionbao_new_notif'));
  };

  const addSystemNotification = (title: string, message: string, type: 'order' | 'consultation', targetId: string) => {
    const newNotif = {
      id: `notif-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
      title,
      message,
      type,
      targetId,
      createdAt: new Date().toISOString(),
      date: `${new Date().toLocaleDateString('vi-VN')} ${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`,
      read: false
    };
    
    // Read current notifications from localStorage first to avoid stale state in closure
    let currentNotifs = [];
    try {
      const saved = localStorage.getItem('solutionbao_system_notifications');
      if (saved) currentNotifs = JSON.parse(saved);
    } catch (e) {
      currentNotifs = [];
    }
    if (!Array.isArray(currentNotifs)) currentNotifs = [];

    const updated = [newNotif, ...currentNotifs];
    saveNotifications(updated);
    
    // Play sound!
    playChimeSound();

    // Play Voice TTS announcement (Vietnamese Speech Synthesis)
    try {
      const isVoiceEnabled = false;
      if (isVoiceEnabled) {
        // Track already announced IDs globally to avoid duplicate audio triggers across tabs/components
        if (!(window as any)._solutionbao_announced_ids) {
          (window as any)._solutionbao_announced_ids = [];
        }
        if (!(window as any)._solutionbao_announced_ids.includes(targetId)) {
          (window as any)._solutionbao_announced_ids.push(targetId);
        }

        let speechText = '';
        if (type === 'order') {
          const nameMatch = message.match(/Khách hàng\s+([^()]+)/i);
          const amountMatch = message.match(/trị giá\s+([0-9.,]+)\s*đ/i);
          const customerName = nameMatch ? nameMatch[1].trim() : '';
          const amount = amountMatch ? amountMatch[1].trim() : '';
          
          if (customerName && amount) {
            speechText = `Có đơn hàng mới từ khách hàng ${customerName}, trị giá ${amount} đồng.`;
          } else if (customerName) {
            speechText = `Có đơn hàng mới từ khách hàng ${customerName}.`;
          } else {
            speechText = `Có đơn hàng mới.`;
          }
        } else {
          const nameMatch = message.match(/Khách hàng\s+([^()]+)/i);
          const customerName = nameMatch ? nameMatch[1].trim() : '';
          
          if (customerName) {
            speechText = `Có yêu cầu tư vấn mới từ khách hàng ${customerName}.`;
          } else {
            speechText = `Có yêu cầu tư vấn mới.`;
          }
        }

        // Clean up text case & spaces for natural pronunciation flow
        speechText = speechText.replace(/\s+/g, ' ').trim();

        const now = Date.now();
        const lastSpoken = (window as any)._solutionbao_last_speak_time || 0;
        const lastSpokenText = (window as any)._solutionbao_last_speak_text || '';
        if (now - lastSpoken > 2500 || lastSpokenText !== speechText) {
          (window as any)._solutionbao_last_speak_time = now;
          (window as any)._solutionbao_last_speak_text = speechText;

          const savedEngine = localStorage.getItem('solutionbao_voice_engine') || 'google';

          if (savedEngine === 'google') {
            // Play Google TTS Vietnamese voice online
            const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(speechText)}`;
            const audio = new Audio(audioUrl);
            audio.play().catch(e => {
              console.warn('Google TTS play failed:', e);
            });
          } else if ('speechSynthesis' in window) {
            const getSelectedVoice = (): SpeechSynthesisVoice | null => {
              try {
                const voices = window.speechSynthesis.getVoices();
                if (!voices || voices.length === 0) return null;
                
                const savedVoiceName = localStorage.getItem('solutionbao_voice_name') || '';
                if (savedVoiceName) {
                  const found = voices.find(v => v.name === savedVoiceName);
                  if (found) return found;
                }
                
                let voice = voices.find(v => {
                  const lang = v.lang.toLowerCase().replace('_', '-');
                  return lang === 'vi-vn';
                });
                
                if (!voice) {
                  voice = voices.find(v => v.lang.toLowerCase().startsWith('vi'));
                }
                
                if (!voice) {
                  voice = voices.find(v => {
                    const name = v.name.toLowerCase();
                    const lang = v.lang.toLowerCase();
                    return name.includes('viet') || name.includes('tiếng việt') || lang.includes('vi');
                  });
                }
                return voice || null;
              } catch (e) {
                return null;
              }
            };

            const speak = () => {
              window.speechSynthesis.cancel();
              const utterance = new SpeechSynthesisUtterance(speechText);
              utterance.lang = 'vi-VN';
              
              const savedRate = localStorage.getItem('solutionbao_voice_rate') ? parseFloat(localStorage.getItem('solutionbao_voice_rate')!) : 0.95;
              const savedPitch = localStorage.getItem('solutionbao_voice_pitch') ? parseFloat(localStorage.getItem('solutionbao_voice_pitch')!) : 1.0;
              
              utterance.rate = savedRate;
              utterance.pitch = savedPitch;
              
              const viVoice = getSelectedVoice();
              if (viVoice) {
                utterance.voice = viVoice;
              } else {
                console.warn('No native Vietnamese voice found in speechSynthesis. Using default browser TTS for vi-VN.');
              }
              window.speechSynthesis.speak(utterance);
            };

            // Wait briefly if voices list is empty on first trigger
            const voices = window.speechSynthesis.getVoices();
            if (!voices || voices.length === 0) {
              setTimeout(speak, 150);
            } else {
              speak();
            }
          }
        }
      }
    } catch (err) {
      console.warn('Voice notification TTS failed:', err);
    }
    
    // Also dispatch a custom event to notify any mounted AdminPanel instance to reload its lists in real-time!
    window.dispatchEvent(new CustomEvent('solutionbao_new_notif', { detail: newNotif }));
  };

  useEffect(() => {
    const syncNotifs = () => {
      try {
        const saved = localStorage.getItem('solutionbao_system_notifications');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) setNotifications(parsed);
        }
      } catch (err) {
        console.error('Error syncing notifications:', err);
      }
    };
    window.addEventListener('storage', syncNotifs);
    window.addEventListener('solutionbao_new_notif', syncNotifs);
    window.addEventListener('focus', syncNotifs);
    return () => {
      window.removeEventListener('storage', syncNotifs);
      window.removeEventListener('solutionbao_new_notif', syncNotifs);
      window.removeEventListener('focus', syncNotifs);
    };
  }, []);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNewProduct, setIsAddingNewProduct] = useState<boolean>(false);
  const [isModalMaximized, setIsModalMaximized] = useState<boolean>(false);

  // Countdown timer for sales/promotions (resets at midnight daily)
  const [promoCountdown, setPromoCountdown] = useState({ hours: 12, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      let target: Date;

      if (webConfig.flashSaleEndTime) {
        const customTarget = new Date(webConfig.flashSaleEndTime);
        if (!isNaN(customTarget.getTime()) && customTarget.getTime() > now.getTime()) {
          target = customTarget;
        } else {
          // Fallback if custom target is in the past: count down to end of today
          target = new Date();
          target.setHours(23, 59, 59, 999);
        }
      } else {
        // Fallback to end of today
        target = new Date();
        target.setHours(23, 59, 59, 999);
      }
      
      const difference = target.getTime() - now.getTime();
      if (difference <= 0) {
        return { hours: 0, minutes: 0, seconds: 0 };
      }
      
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      return { hours, minutes, seconds };
    };

    setPromoCountdown(calculateTimeLeft());
    const interval = setInterval(() => {
      setPromoCountdown(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [webConfig.flashSaleEndTime]);

  // Form states for adding/editing products directly
  const [formId, setFormId] = useState('');
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<'attendance' | 'printer' | 'scanner' | 'label' | 'consumable' | 'drawer'>('attendance');
  const [formBrand, setFormBrand] = useState('');
  const [formPrice, setFormPrice] = useState<number>(0);
  const [formOriginalPrice, setFormOriginalPrice] = useState<number>(0);
  const [formHighlights, setFormHighlights] = useState('');
  const [formSpecs, setFormSpecs] = useState('');
  const [formIsPopular, setFormIsPopular] = useState(false);
  const [formImage, setFormImage] = useState('');

  const handleOpenEditModal = (p: Product) => {
    setEditingProduct(p);
    setIsAddingNewProduct(false);
    setIsModalMaximized(false);
    setFormId(p.id);
    setFormName(p.name);
    setFormCategory(p.category);
    setFormBrand(p.brand);
    setFormPrice(p.price);
    setFormOriginalPrice(p.originalPrice || p.price);
    setFormHighlights(p.highlights.join('\n'));
    setFormSpecs(Object.entries(p.specs).map(([k, v]) => `${k}: ${v}`).join('\n'));
    setFormIsPopular(!!p.isPopular);
    setFormImage(p.image || '');
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsAddingNewProduct(true);
    setIsModalMaximized(false);
    setFormId(`VN-${Math.floor(1000 + Math.random() * 9000)}`);
    setFormName('');
    setFormCategory('attendance');
    setFormBrand('');
    setFormPrice(0);
    setFormOriginalPrice(0);
    setFormHighlights('');
    setFormSpecs('');
    setFormIsPopular(false);
    setFormImage('');
  };

  const handleSaveQuickProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formId.trim() || !formName.trim() || !formBrand.trim()) {
      showToast('Vui lòng điền đầy đủ Mã, Tên và Thương hiệu thiết bị!');
      return;
    }

    const hls = formHighlights
      .split('\n')
      .map((h) => h.trim())
      .filter((h) => h.length > 0);

    const specsObj: Record<string, string> = {};
    formSpecs.split('\n').forEach((line) => {
      const idx = line.indexOf(':');
      if (idx !== -1) {
        const k = line.slice(0, idx).trim();
        const v = line.slice(idx + 1).trim();
        if (k && v) specsObj[k] = v;
      }
    });

    const newProduct: Product = {
      id: formId.trim(),
      name: formName.trim(),
      category: formCategory,
      categoryLabel: 
        formCategory === 'attendance' ? 'Máy Chấm Công' :
        formCategory === 'printer' ? 'Máy In Hóa Đơn' :
        formCategory === 'scanner' ? 'Đầu Đọc Mã Vạch' :
        formCategory === 'label' ? 'Máy In Tem Nhãn' :
        formCategory === 'consumable' ? 'Giấy In & Vật Tư' :
        'Hộp Đựng Tiền Cash',
      brand: formBrand.trim(),
      price: Number(formPrice) || 0,
      originalPrice: Number(formOriginalPrice) || Number(formPrice) || 0,
      highlights: hls,
      specs: specsObj,
      isPopular: formIsPopular,
      image: formImage.trim() || undefined
    };

    let updated: Product[];
    if (editingProduct) {
      updated = products.map((p) => (p.id === editingProduct.id ? newProduct : p));
      setEditingProduct(null);
      showToast('Đã cập nhật sản phẩm thành công!');
    } else {
      if (products.some((p) => p.id === newProduct.id)) {
        showToast(`Mã thiết bị "${newProduct.id}" đã tồn tại! Vui lòng dùng mã khác.`);
        return;
      }
      updated = [...products, newProduct];
      setIsAddingNewProduct(false);
      showToast('Đã thêm sản phẩm mới thành công!');
    }

    saveProducts(updated);
  };

  const handleDeleteQuickProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
    showToast('Đã xóa sản phẩm khỏi hệ thống thành công!');
  };

  // Interactive Product Modal / Spec Explorer
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailQty, setDetailQty] = useState<number>(1);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [activeMediaType, setActiveMediaType] = useState<'image' | 'video'>('image');

  // Recently viewed products history (Lưu lịch sử sản phẩm đã xem)
  const [viewedProductIds, setViewedProductIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nbt_viewed_product_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const markProductAsViewed = useCallback((productId: string) => {
    if (!productId) return;
    setViewedProductIds((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      const next = [productId, ...filtered].slice(0, 50); // Lưu tối đa 50 sản phẩm xem gần nhất
      try {
        localStorage.setItem('nbt_viewed_product_ids', JSON.stringify(next));
      } catch (e) {
        console.warn('Cannot write viewed product IDs to localStorage', e);
      }
      return next;
    });
  }, []);

  const handleClearViewedProducts = useCallback(() => {
    setViewedProductIds([]);
    try {
      localStorage.removeItem('nbt_viewed_product_ids');
    } catch {}
    showToast('Đã xóa toàn bộ lịch sử sản phẩm đã xem');
  }, [showToast]);

  const handleRemoveViewedProduct = useCallback((productId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setViewedProductIds((prev) => {
      const next = prev.filter((id) => id !== productId);
      try {
        localStorage.setItem('nbt_viewed_product_ids', JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  // Tự động đánh dấu đã xem khi mở bất kỳ sản phẩm nào
  useEffect(() => {
    if (selectedProduct?.id) {
      markProductAsViewed(selectedProduct.id);
    }
  }, [selectedProduct?.id, markProductAsViewed]);

  const viewedProducts = useMemo(() => {
    return viewedProductIds
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is Product => !!p);
  }, [viewedProductIds, products]);

  // Elementor Landing Pages (Trang quảng cáo đa năng)
  const [landingPages, setLandingPages] = useState<ElementorLandingPage[]>(() => {
    try {
      const saved = localStorage.getItem('nbt_elementor_landing_pages');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_ELEMENTOR_TEMPLATES;
  });
  const [activeLandingSlug, setActiveLandingSlug] = useState<string | null>(null);

  const handleSaveLandingPages = useCallback((newPages: ElementorLandingPage[]) => {
    setLandingPages(newPages);
    try {
      localStorage.setItem('nbt_elementor_landing_pages', JSON.stringify(newPages));
    } catch {}
  }, []);

  const handlePreviewLiveLandingPage = useCallback((page: ElementorLandingPage) => {
    setActiveLandingSlug(page.slug);
    setActiveTab('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Đang mở trang quảng cáo: ${page.title}`);
  }, [showToast]);

  const handleSubmitLandingLead = useCallback((data: { name: string; phone: string; address?: string; note?: string; campaign: string }) => {
    setLandingPages((prev) => {
      const next = prev.map((p) => (p.title === data.campaign ? { ...p, leadsCount: (p.leadsCount || 0) + 1 } : p));
      try {
        localStorage.setItem('nbt_elementor_landing_pages', JSON.stringify(next));
      } catch {}
      return next;
    });

    try {
      const savedConsultations = localStorage.getItem('solutionbao_consultations');
      const list = savedConsultations ? JSON.parse(savedConsultations) : [];
      list.unshift({
        id: `lead-${Date.now()}`,
        name: data.name,
        phone: data.phone,
        note: `[Landing Page: ${data.campaign}] ${data.note || ''} (Địa chỉ: ${data.address || 'Chưa cung cấp'})`,
        date: new Date().toLocaleString('vi-VN'),
        status: 'Chờ xử lý'
      });
      localStorage.setItem('solutionbao_consultations', JSON.stringify(list));
    } catch {}

    showToast('Đã gửi thông tin đăng ký thành công! Chuyên viên sẽ liên hệ trong 5 phút');
  }, [showToast]);

  // Fullscreen Lightbox & Image Zoom/Slide modal states
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [lightboxTitle, setLightboxTitle] = useState<string>('');
  const [lightboxZoom, setLightboxZoom] = useState<number>(1);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const [priceOption, setPriceOption] = useState<string>('store');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isArticleExpanded, setIsArticleExpanded] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);

  // Quote cart state
  const [quoteItems, setQuoteItems] = useState<{ product: Product; quantity: number; customPrice?: number; priceOptionLabel?: string }[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [quoteNotes, setQuoteNotes] = useState('');
  const [isQuoteSaved, setIsQuoteSaved] = useState(false);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [voucherCode, setVoucherCode] = useState<string>('');
  const [appliedVoucher, setAppliedVoucher] = useState<any | null>(null);
  const [voucherError, setVoucherError] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank_transfer'>('cod');
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

  // Order Lookup state & logic
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupResult, setLookupResult] = useState<any[] | null>(null);
  const [hasSearchedOrder, setHasSearchedOrder] = useState(false);
  const [lastCreatedOrderId, setLastCreatedOrderId] = useState<string>('');
  const [showOrderSuccessModal, setShowOrderSuccessModal] = useState(false);

  // Direct Homepage & Product Consultation States
  const [homeConsultName, setHomeConsultName] = useState('');
  const [homeConsultPhone, setHomeConsultPhone] = useState('');
  const [homeConsultContent, setHomeConsultContent] = useState('');
  const [homeConsultSuccess, setHomeConsultSuccess] = useState<string | null>(null);

  const [productConsultName, setProductConsultName] = useState('');
  const [productConsultPhone, setProductConsultPhone] = useState('');
  const [productConsultNote, setProductConsultNote] = useState('');
  const [productConsultSuccess, setProductConsultSuccess] = useState<string | null>(null);
  const [showProductConsultForm, setShowProductConsultForm] = useState(false);

  // Form validation errors
  const [quoteFormError, setQuoteFormError] = useState<string | null>(null);
  const [homeConsultError, setHomeConsultError] = useState<string | null>(null);
  const [productConsultError, setProductConsultError] = useState<string | null>(null);

  // Search Suggestions state & logic
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.brand.toLowerCase().includes(q) || 
      p.categoryLabel.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q))
    ).slice(0, 5);
  }, [searchQuery, products]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Consumables Calculator state
  const [calcBillsPerDay, setCalcBillsPerDay] = useState<number>(100);
  const [calcReceiptLength, setCalcReceiptLength] = useState<number>(15); // average length in cm
  const [calcPaperType, setCalcPaperType] = useState<'K80' | 'K57'>('K80');

  // Promotional Banner Slide index
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = webConfig.slides;

  // Banner Swipe & Drag Event Handlers
  const bannerTouchStartRef = useRef<number | null>(null);
  const bannerTouchEndRef = useRef<number | null>(null);

  const handleBannerTouchStart = (e: React.TouchEvent) => {
    bannerTouchStartRef.current = e.touches[0].clientX;
    bannerTouchEndRef.current = e.touches[0].clientX;
  };

  const handleBannerTouchMove = (e: React.TouchEvent) => {
    bannerTouchEndRef.current = e.touches[0].clientX;
  };

  const handleBannerTouchEnd = () => {
    if (bannerTouchStartRef.current !== null && bannerTouchEndRef.current !== null) {
      const distance = bannerTouchStartRef.current - bannerTouchEndRef.current;
      const minSwipeDistance = 30;
      if (slides && slides.length > 0) {
        if (distance > minSwipeDistance) {
          setCurrentSlide((prev) => (prev + 1) % slides.length);
        } else if (distance < -minSwipeDistance) {
          setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        }
      }
    }
    bannerTouchStartRef.current = null;
    bannerTouchEndRef.current = null;
  };

  const handleBannerMouseDown = (e: React.MouseEvent) => {
    bannerTouchStartRef.current = e.clientX;
    bannerTouchEndRef.current = e.clientX;
  };

  const handleBannerMouseMove = (e: React.MouseEvent) => {
    if (bannerTouchStartRef.current !== null) {
      bannerTouchEndRef.current = e.clientX;
    }
  };

  const handleBannerMouseUp = () => {
    if (bannerTouchStartRef.current !== null && bannerTouchEndRef.current !== null) {
      const distance = bannerTouchStartRef.current - bannerTouchEndRef.current;
      const minSwipeDistance = 30;
      if (slides && slides.length > 0) {
        if (distance > minSwipeDistance) {
          setCurrentSlide((prev) => (prev + 1) % slides.length);
        } else if (distance < -minSwipeDistance) {
          setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        }
      }
    }
    bannerTouchStartRef.current = null;
    bannerTouchEndRef.current = null;
  };

  // Auto rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      if (slides && slides.length > 0) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  const getThemeColors = () => {
    const color = webConfig.primaryColor || 'red';
    const colors: Record<string, any> = {
      blue: {
        headerBg: 'bg-blue-600',
        headerBorder: 'border-blue-700',
        navBg: 'bg-blue-800',
        megaTriggerBg: 'bg-blue-900',
        primary: 'bg-blue-600',
        primaryHover: 'hover:bg-blue-700',
        primaryActive: 'active:bg-blue-800',
        primaryText: 'text-blue-600',
        primaryTextHover: 'hover:text-blue-800',
        lightBg: 'bg-blue-50',
        lightBorder: 'border-blue-100',
        darkBg: 'bg-blue-800',
        darkHover: 'hover:bg-blue-900',
        border: 'border-blue-600',
        accentText: 'text-blue-500',
        accentBg: 'bg-blue-50/60',
        accentBorder: 'border-blue-200',
        accentHoverBg: 'hover:bg-blue-100',
        ring: 'focus:ring-blue-600',
        focusBorder: 'focus:border-blue-600',
        shadow: 'shadow-[0_4px_12px_rgba(37,99,235,0.4)]',
        hoverShadow: 'hover:shadow-[0_6px_18px_rgba(37,99,235,0.6)]'
      },
      red: {
        headerBg: 'bg-[#CD1818]',
        headerBorder: 'border-red-700',
        navBg: 'bg-[#B31217]',
        megaTriggerBg: 'bg-[#900E12]',
        primary: 'bg-red-600',
        primaryHover: 'hover:bg-red-700',
        primaryActive: 'active:bg-red-800',
        primaryText: 'text-red-600',
        primaryTextHover: 'hover:text-red-800',
        lightBg: 'bg-red-50',
        lightBorder: 'border-red-100',
        darkBg: 'bg-red-800',
        darkHover: 'hover:bg-red-900',
        border: 'border-red-600',
        accentText: 'text-red-500',
        accentBg: 'bg-red-50/60',
        accentBorder: 'border-red-200',
        accentHoverBg: 'hover:bg-red-100',
        ring: 'focus:ring-red-600',
        focusBorder: 'focus:border-red-600',
        shadow: 'shadow-[0_4px_12px_rgba(220,38,38,0.4)]',
        hoverShadow: 'hover:shadow-[0_6px_18px_rgba(220,38,38,0.6)]'
      },
      indigo: {
        headerBg: 'bg-indigo-600',
        headerBorder: 'border-indigo-700',
        navBg: 'bg-indigo-800',
        megaTriggerBg: 'bg-indigo-900',
        primary: 'bg-indigo-600',
        primaryHover: 'hover:bg-indigo-700',
        primaryActive: 'active:bg-indigo-800',
        primaryText: 'text-indigo-600',
        primaryTextHover: 'hover:text-indigo-800',
        lightBg: 'bg-indigo-50',
        lightBorder: 'border-indigo-100',
        darkBg: 'bg-indigo-800',
        darkHover: 'hover:bg-indigo-900',
        border: 'border-indigo-600',
        accentText: 'text-indigo-500',
        accentBg: 'bg-indigo-50/60',
        accentBorder: 'border-indigo-200',
        accentHoverBg: 'hover:bg-indigo-100',
        ring: 'focus:ring-indigo-600',
        focusBorder: 'focus:border-indigo-600',
        shadow: 'shadow-[0_4px_12px_rgba(79,70,229,0.4)]',
        hoverShadow: 'hover:shadow-[0_6px_18px_rgba(79,70,229,0.6)]'
      },
      teal: {
        headerBg: 'bg-teal-700',
        headerBorder: 'border-teal-800',
        navBg: 'bg-teal-800',
        megaTriggerBg: 'bg-teal-900',
        primary: 'bg-teal-600',
        primaryHover: 'hover:bg-teal-700',
        primaryActive: 'active:bg-teal-800',
        primaryText: 'text-teal-600',
        primaryTextHover: 'hover:text-teal-800',
        lightBg: 'bg-teal-50',
        lightBorder: 'border-teal-100',
        darkBg: 'bg-teal-800',
        darkHover: 'hover:bg-teal-900',
        border: 'border-teal-600',
        accentText: 'text-teal-500',
        accentBg: 'bg-teal-50/60',
        accentBorder: 'border-teal-200',
        accentHoverBg: 'hover:bg-teal-100',
        ring: 'focus:ring-teal-600',
        focusBorder: 'focus:border-teal-600',
        shadow: 'shadow-[0_4px_12px_rgba(13,148,136,0.4)]',
        hoverShadow: 'hover:shadow-[0_6px_18px_rgba(13,148,136,0.6)]'
      },
      emerald: {
        headerBg: 'bg-emerald-700',
        headerBorder: 'border-emerald-800',
        navBg: 'bg-emerald-800',
        megaTriggerBg: 'bg-emerald-900',
        primary: 'bg-emerald-600',
        primaryHover: 'hover:bg-emerald-700',
        primaryActive: 'active:bg-emerald-800',
        primaryText: 'text-emerald-600',
        primaryTextHover: 'hover:text-emerald-800',
        lightBg: 'bg-emerald-50',
        lightBorder: 'border-emerald-100',
        darkBg: 'bg-emerald-800',
        darkHover: 'hover:bg-emerald-900',
        border: 'border-emerald-600',
        accentText: 'text-emerald-500',
        accentBg: 'bg-emerald-50/60',
        accentBorder: 'border-emerald-200',
        accentHoverBg: 'hover:bg-emerald-100',
        ring: 'focus:ring-emerald-600',
        focusBorder: 'focus:border-emerald-600',
        shadow: 'shadow-[0_4px_12px_rgba(16,185,129,0.4)]',
        hoverShadow: 'hover:shadow-[0_6px_18px_rgba(16,185,129,0.6)]'
      },
      orange: {
        headerBg: 'bg-orange-600',
        headerBorder: 'border-orange-700',
        navBg: 'bg-orange-700',
        megaTriggerBg: 'bg-orange-800',
        primary: 'bg-orange-600',
        primaryHover: 'hover:bg-orange-700',
        primaryActive: 'active:bg-orange-800',
        primaryText: 'text-orange-600',
        primaryTextHover: 'hover:text-orange-800',
        lightBg: 'bg-orange-50',
        lightBorder: 'border-orange-100',
        darkBg: 'bg-orange-800',
        darkHover: 'hover:bg-orange-900',
        border: 'border-orange-600',
        accentText: 'text-orange-500',
        accentBg: 'bg-orange-50/60',
        accentBorder: 'border-orange-200',
        accentHoverBg: 'hover:bg-orange-100',
        ring: 'focus:ring-orange-600',
        focusBorder: 'focus:border-orange-600',
        shadow: 'shadow-[0_4px_12px_rgba(249,115,22,0.4)]',
        hoverShadow: 'hover:shadow-[0_6px_18px_rgba(249,115,22,0.6)]'
      },
      purple: {
        headerBg: 'bg-purple-700',
        headerBorder: 'border-purple-800',
        navBg: 'bg-purple-800',
        megaTriggerBg: 'bg-purple-900',
        primary: 'bg-purple-600',
        primaryHover: 'hover:bg-purple-700',
        primaryActive: 'active:bg-purple-800',
        primaryText: 'text-purple-600',
        primaryTextHover: 'hover:text-purple-800',
        lightBg: 'bg-purple-50',
        lightBorder: 'border-purple-100',
        darkBg: 'bg-purple-800',
        darkHover: 'hover:bg-purple-900',
        border: 'border-purple-600',
        accentText: 'text-purple-500',
        accentBg: 'bg-purple-50/60',
        accentBorder: 'border-purple-200',
        accentHoverBg: 'hover:bg-purple-100',
        ring: 'focus:ring-purple-600',
        focusBorder: 'focus:border-purple-600',
        shadow: 'shadow-[0_4px_12px_rgba(147,51,234,0.4)]',
        hoverShadow: 'hover:shadow-[0_6px_18px_rgba(147,51,234,0.6)]'
      }
    };
    return colors[color] || colors.red;
  };

  const theme = getThemeColors();

  // Chat advisor state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Dạ em chào Anh/Chị! Em là Hoàng Anh - chuyên viên tư vấn bán hàng của SOLUTION B A O (Hotline/Zalo: 0908.555.547).\n\nEm đang trực chat hỗ trợ báo giá và tư vấn các dòng máy chấm công, máy in bill, máy in đơn Shopee/TikTok, máy quét mã vạch và két thu ngân.\n\nAnh/Chị đang cần tư vấn thiết bị cho cửa hàng, quán cafe hay kho bãi ạ? Nhắn nhu cầu em báo giá chính xác và hỗ trợ giao hỏa tốc liền nhé!'
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isOpenFloatingChat, setIsOpenFloatingChat] = useState(false);
  
  // Floating contact widget (Zalo, Hotline, Facebook, AI Chat) collapse/expand state
  // Mặc định luôn là THU GỌN dạng nút tròn tai nghe (collapsed = false) trên cả desktop và mobile
  const [isContactWidgetExpanded, setIsContactWidgetExpanded] = useState<boolean>(() => {
    try {
      const stored = sessionStorage.getItem('nbt_contact_widget_expanded_v3');
      if (stored !== null) return stored === 'true';
      return false; // Mặc định luôn là false (nút tròn gọn gàng)
    } catch {
      return false;
    }
  });

  // Mobile contact bottom sheet modal state
  const [isMobileContactSheetOpen, setIsMobileContactSheetOpen] = useState(false);

  const toggleContactWidget = () => {
    setIsContactWidgetExpanded(prev => {
      const next = !prev;
      try {
        sessionStorage.setItem('nbt_contact_widget_expanded_v3', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Troubleshooting interactive selection
  const [selectedTroubleshoot, setSelectedTroubleshoot] = useState<number | null>(null);
  const [troubleSearch, setTroubleSearch] = useState('');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [faqCategory, setFaqCategory] = useState<string>('all');

  // Price drop alerts state
  const [priceAlerts, setPriceAlerts] = useState<{ productId: string; productName: string; email: string; date: string }[]>([]);
  const [activeAlertProductId, setActiveAlertProductId] = useState<string | null>(null);
  const [alertEmail, setAlertEmail] = useState('');
  const [alertSuccessProductId, setAlertSuccessProductId] = useState<string | null>(null);

  // Warranty check state
  const [warrantySerial, setWarrantySerial] = useState('');
  const [warrantyResult, setWarrantyResult] = useState<{
    serial: string;
    productName: string;
    purchaseDate: string;
    expireDate: string;
    isUnderWarranty: boolean;
    daysLeftOrExpired: number;
    model: string;
  } | null>(null);
  const [warrantyChecked, setWarrantyChecked] = useState(false);
  const [warrantyError, setWarrantyError] = useState('');

  // Reset all application states to the default home screen values
  const handleGoToHomeAndReset = () => {
    setActiveTab('home');
    setCatalogCategory('all');
    setCatalogSubCategory('all');
    setSearchQuery('');
    setSelectedProduct(null);
    setExpandedProduct(null);
    setSelectedArticle(null);
    setSelectedTroubleshoot(null);
    setExpandedFaqIndex(null);
    setFaqCategory('all');
    setLookupQuery('');
    setLookupResult(null);
    setHasSearchedOrder(false);
    setHomeTab('featured');
    setNewsSearchQuery('');
    setNewsCategoryFilter('all');
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckWarranty = (e?: React.FormEvent, presetSerial?: string) => {
    if (e) e.preventDefault();
    const sn = (presetSerial || warrantySerial).trim().toUpperCase();
    if (!sn) {
      setWarrantyError('Vui lòng nhập số Serial Number (S/N) thiết bị.');
      setWarrantyResult(null);
      setWarrantyChecked(false);
      return;
    }
    if (sn.length < 4) {
      setWarrantyError('Số S/N hợp lệ cần chứa ít nhất 4 ký tự.');
      setWarrantyResult(null);
      setWarrantyChecked(false);
      return;
    }

    setWarrantyError('');
    
    // Preset S/Ns for realistic demonstration
    const presets: Record<string, { productName: string; purchaseDate: string; model: string }> = {
      'VN-RJ-8686': {
        productName: 'Máy Chấm Công Vân Tay Ronald Jack K14 Pro',
        purchaseDate: '2025-10-15',
        model: 'RJ-K14PRO'
      },
      'VN-XP-350B': {
        productName: 'Máy In Tem Nhãn Mã Vạch Xprinter XP-350B',
        purchaseDate: '2024-05-12',
        model: 'XP-350B'
      },
      'VN-ZE-9999': {
        productName: 'Đầu Đọc Mã Vạch Zebra LS2208 Cao Cấp',
        purchaseDate: '2026-01-20',
        model: 'ZEB-LS2208'
      }
    };

    let result;
    if (presets[sn]) {
      result = presets[sn];
    } else {
      // Generate dynamic yet deterministic result based on S/N hash
      let hash = 0;
      for (let i = 0; i < sn.length; i++) {
        hash = sn.charCodeAt(i) + ((hash << 5) - hash);
      }
      hash = Math.abs(hash);

      const prd = (products.length > 0 ? products : PRODUCTS_DATA)[hash % (products.length > 0 ? products.length : PRODUCTS_DATA.length)];
      const isEven = hash % 2 === 0;
      const daysAgo = isEven 
        ? 30 + (hash % 250) // within 12 months
        : 380 + (hash % 250); // expired

      const purchase = new Date('2026-06-30T09:42:28-07:00');
      purchase.setDate(purchase.getDate() - daysAgo);

      const yyyy = purchase.getFullYear();
      const mm = String(purchase.getMonth() + 1).padStart(2, '0');
      const dd = String(purchase.getDate()).padStart(2, '0');

      result = {
        productName: prd.name,
        purchaseDate: `${yyyy}-${mm}-${dd}`,
        model: prd.id.toUpperCase()
      };
    }

    const purchaseDateObj = new Date(result.purchaseDate);
    const expireDateObj = new Date(purchaseDateObj);
    expireDateObj.setFullYear(expireDateObj.getFullYear() + 1);

    const currentDateObj = new Date('2026-06-30T09:42:28-07:00');
    const isUnderWarranty = expireDateObj.getTime() > currentDateObj.getTime();
    
    const diffTime = Math.abs(expireDateObj.getTime() - currentDateObj.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setWarrantyResult({
      serial: sn,
      productName: result.productName,
      purchaseDate: result.purchaseDate,
      expireDate: expireDateObj.toISOString().split('T')[0],
      isUnderWarranty,
      daysLeftOrExpired: diffDays,
      model: result.model
    });
    setWarrantyChecked(true);
    if (presetSerial) {
      setWarrantySerial(presetSerial);
    }
  };

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isAiLoading]);

  // Scroll progress state for matching brand blue indicator
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }

      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load quote and price alerts on mount, and handle orderId sharing
  useEffect(() => {
    const saved = localStorage.getItem('solutionbao_quote_items');
    if (saved) {
      try {
        setQuoteItems(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading saved quote:', e);
      }
    }

    const savedAlerts = localStorage.getItem('solutionbao_price_alerts');
    if (savedAlerts) {
      try {
        setPriceAlerts(JSON.parse(savedAlerts));
      } catch (e) {
        console.error('Error loading saved price alerts:', e);
      }
    }

    // Auto-load order lookup if orderId is in URL query parameters
    try {
      const params = new URLSearchParams(window.location.search);
      const sharedOrderId = params.get('orderId');
      if (sharedOrderId) {
        setLookupQuery(sharedOrderId);
        setActiveTab('order-lookup');
        const savedOrders = localStorage.getItem('solutionbao_orders');
        if (savedOrders) {
          const allOrders: any[] = JSON.parse(savedOrders);
          const q = sharedOrderId.trim().toLowerCase();
          const results = allOrders.filter(order => 
            (order.id && order.id.toLowerCase().includes(q)) ||
            (order.customerPhone && order.customerPhone.toLowerCase().includes(q)) ||
            (order.customerName && order.customerName.toLowerCase().includes(q))
          );
          setLookupResult(results);
          setHasSearchedOrder(true);
        }
      }
    } catch (e) {
      console.error('Error loading shared order from URL query params:', e);
    }
  }, []);

  // Reset currentPage to 1 when any product catalog filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [catalogCategory, catalogSubCategory, searchQuery, sortBy, filterPriceRange, filterBrand, filterStockStatus, filterTag]);

  // Dynamic Google SEO & Indexing (Title, Meta description, Keywords, JSON-LD Schema.org Microdata)
  useEffect(() => {
    let seoTitle = 'SOLUTION B A O Technology - Thiết Bị Quản Lý Bán Hàng';
    let seoDesc = 'Chuyên cung cấp máy chấm công, máy in hóa đơn, máy in bill K80, máy in tem mã vạch, máy quét mã vạch và giấy in nhiệt chính hãng tại TP.HCM. Bảo hành 12 tháng, hỗ trợ trọn đời.';
    let seoKeywords = 'SOLUTION B A O technology, solutionbao.vn, máy chấm công, máy in bill, máy in hóa đơn, máy quét mã vạch, máy in tem nhãn, giấy in nhiệt, thiết bị bán hàng hcm';
    let schemaData: any = null;

    const activeProduct = expandedProduct 
      ? (products.find((p) => p.id === expandedProduct) || PRODUCTS_DATA.find((p) => p.id === expandedProduct))
      : null;

    if (activeProduct) {
      // 1. PRODUCT PAGE SEO
      seoTitle = activeProduct.seoTitle || `${activeProduct.name} - Giá Tốt Chính Hãng | SOLUTION B A O Technology`;
      seoDesc = activeProduct.seoDescription || `Mua ngay ${activeProduct.name} (${activeProduct.brand}) chính hãng, chất lượng cao tại SOLUTION B A O Technology. Giá cực tốt, giao hàng nhanh, bảo hành 12 tháng.`;
      seoKeywords = activeProduct.seoKeywords || `${activeProduct.name}, ${activeProduct.brand}, máy chấm công ${activeProduct.name}, mua ${activeProduct.name}, giá ${activeProduct.name}`;
      
      schemaData = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": activeProduct.name,
        "image": activeProduct.image || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
        "description": seoDesc,
        "sku": activeProduct.id,
        "brand": {
          "@type": "Brand",
          "name": activeProduct.brand
        },
        "offers": {
          "@type": "Offer",
          "url": window.location.href,
          "priceCurrency": "VND",
          "price": activeProduct.price,
          "priceValidUntil": "2027-12-31",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "SOLUTION B A O Technology"
          }
        }
      };
    } else {
      // 2. CATEGORY OR GENERAL VIEWS SEO
      if (activeTab === 'news') {
        seoTitle = 'Tin tức & Cẩm nang công nghệ | SOLUTION B A O Technology';
        seoDesc = 'Cập nhật tin tức, kinh nghiệm chọn mua và hướng dẫn cài đặt sử dụng máy chấm công, máy in hóa đơn, máy in mã vạch từ các chuyên gia hàng đầu.';
        seoKeywords = 'tin tức công nghệ, hướng dẫn máy chấm công, cẩm nang máy in hóa đơn, kinh nghiệm mua máy quét mã vạch';
      } else if (activeTab === 'troubleshoot') {
        seoTitle = 'Khắc phục lỗi thiết bị bán hàng nhanh chóng | SOLUTION B A O Technology';
        seoDesc = 'Tổng hợp các lỗi thường gặp ở máy chấm công Ronald Jack, máy in hóa đơn Xprinter, lỗi driver và hướng dẫn sửa lỗi nhanh chóng qua UltraViewer.';
        seoKeywords = 'sửa máy chấm công, lỗi máy in bill xprinter, sửa máy in hóa đơn, ultraviewer hỗ trợ lỗi';
      } else if (activeTab === 'advisor') {
        seoTitle = 'Tư vấn & báo giá thiết bị bán hàng hỏa tốc | SOLUTION B A O Technology';
        seoDesc = 'Nhận tư vấn giải pháp máy chấm công vân tay, máy in bill nhà hàng, máy in mã vạch kho bãi từ Chuyên viên tư vấn SOLUTION B A O Technology.';
        seoKeywords = 'tư vấn máy chấm công, báo giá máy in bill, tư vấn giải pháp bán hàng SOLUTION B A O';
      } else if (activeTab === 'quote') {
        seoTitle = 'Xuất bảng báo giá thiết bị bán hàng PDF | SOLUTION B A O Technology';
        seoDesc = 'Tự tạo và xuất bảng báo giá thiết bị bán hàng chính hãng PDF chuyên nghiệp, đầy đủ VAT, chiết khấu và chi phí cài đặt giao hàng.';
        seoKeywords = 'báo giá máy chấm công, xuất báo giá pdf, báo giá thiết bị bán hàng';
      } else if (catalogCategory && catalogCategory !== 'home') {
        const catLabels: any = {
          attendance: 'Máy Chấm Công',
          printer: 'Máy In Hóa Đơn',
          scanner: 'Máy Quét Mã Vạch',
          label: 'Máy In Tem Nhãn',
          consumable: 'Giấy In Nhiệt',
          drawer: 'Két Sắt Đựng Tiền'
        };
        const label = catLabels[catalogCategory] || 'Thiết Bị';
        seoTitle = `${label} Giá Tốt Chính Hãng - SOLUTION B A O Technology`;
        seoDesc = `Các dòng ${label.toLowerCase()} bán chạy nhất từ Ronald Jack, Xprinter, Zebra, Honeywell chính hãng tại SOLUTION B A O Technology. Miễn phí cài đặt phần mềm & bảo hành 12 tháng.`;
        seoKeywords = `${label.toLowerCase()} giá rẻ, mua ${label.toLowerCase()}, ${label.toLowerCase()} chính hãng, SOLUTION B A O technology`;
      }

      schemaData = {
        "@context": "https://schema.org",
        "@type": "Store",
        "name": "SOLUTION B A O Technology - Thiết Bị Quản Lý Bán Hàng",
        "image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
        "@id": "https://solutionbao.vn",
        "url": "https://solutionbao.vn",
        "telephone": "0908555547",
        "email": "info@solutionbao.vn",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "355/4E Sư Vạn Hạnh, Phường 12, Quận 10",
          "addressLocality": "TP.HCM",
          "addressCountry": "VN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 10.7765,
          "longitude": 106.6672
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "08:00",
          "closes": "17:30"
        }
      };
    }

    document.title = seoTitle;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', seoDesc);

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', seoKeywords);

    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    try {
      const existingScript = document.getElementById('seo-jsonld-schema');
      if (existingScript) {
        existingScript.remove();
      }
      const script = document.createElement('script');
      script.id = 'seo-jsonld-schema';
      script.type = 'application/ld+json';
      script.textContent = safeJsonLd(schemaData);
      document.head.appendChild(script);
    } catch (e) {
      console.warn('Error applying schema data JSON:', e);
    }

    // Dynamic Google Search Console Verification Meta Tag
    try {
      const gscRaw = (webConfig?.googleSiteVerification || localStorage.getItem('solutionbao_gsc_verification') || '').trim();
      if (gscRaw) {
        let gscToken = gscRaw;
        if (gscRaw.includes('content=')) {
          const match = gscRaw.match(/content=["']([^"']+)["']/i);
          if (match && match[1]) gscToken = match[1].trim();
        } else {
          gscToken = gscRaw.replace(/<[^>]+>/g, '').trim();
        }
        // Sanitize token to avoid attribute breakout
        gscToken = gscToken.replace(/["'<>]/g, '');
        let metaGsc = document.querySelector('meta[name="google-site-verification"]');
        if (!metaGsc) {
          metaGsc = document.createElement('meta');
          metaGsc.setAttribute('name', 'google-site-verification');
          document.head.appendChild(metaGsc);
        }
        metaGsc.setAttribute('content', gscToken);
      }
    } catch (e) {
      console.warn('Error applying Google Search Console meta verification:', e);
    }

    // Dynamic Google Analytics 4 (GA4 ID) Injection & Pageview Tracking
    try {
      const gaId = (webConfig?.googleAnalyticsId || localStorage.getItem('solutionbao_ga4_id') || '').trim();
      if (gaId && /^(G|GTM)-[A-Za-z0-9_\-]+$/i.test(gaId)) {
        let gaScript = document.getElementById('ga4-gtag-script') as HTMLScriptElement;
        if (!gaScript || !gaScript.src.includes(gaId)) {
          if (gaScript) gaScript.remove();
          gaScript = document.createElement('script');
          gaScript.id = 'ga4-gtag-script';
          gaScript.async = true;
          gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
          document.head.appendChild(gaScript);

          (window as any).dataLayer = (window as any).dataLayer || [];
          function gtag(...args: any[]) {
            (window as any).dataLayer.push(args);
          }
          (window as any).gtag = gtag;
          gtag('js', new Date());
          gtag('config', gaId, {
            send_page_view: true,
            page_title: seoTitle,
            page_location: window.location.href,
            page_path: window.location.pathname + window.location.search
          });
        } else if (typeof (window as any).gtag === 'function') {
          (window as any).gtag('event', 'page_view', {
            page_title: seoTitle,
            page_location: window.location.href,
            page_path: window.location.pathname + window.location.search
          });
        }
      }
    } catch (e) {
      console.warn('Error applying Google Analytics GA4 tracking:', e);
    }
  }, [activeTab, catalogCategory, expandedProduct, products, webConfig?.googleSiteVerification, webConfig?.googleAnalyticsId]);

  const safeJsonStringify = (obj: any): string => {
    try {
      const seen = new WeakSet();
      return JSON.stringify(obj, (key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) {
            return undefined;
          }
          seen.add(value);
        }
        return value;
      });
    } catch (err) {
      console.warn('safeJsonStringify fallback:', err);
      return '[]';
    }
  };

  const saveQuoteItems = (items: { product: Product; quantity: number; customPrice?: number; priceOptionLabel?: string }[]) => {
    setQuoteItems(items);
    try {
      const cleanItems = (items || []).map(item => ({
        product: {
          id: String(item.product?.id || ''),
          name: String(item.product?.name || ''),
          price: Number(item.product?.price || 0),
          originalPrice: Number(item.product?.originalPrice || 0),
          image: String(item.product?.image || ''),
          category: String(item.product?.category || ''),
          categoryLabel: String(item.product?.categoryLabel || ''),
          brand: String(item.product?.brand || ''),
          priceOptions: Array.isArray(item.product?.priceOptions) ? item.product.priceOptions : [],
          highlights: Array.isArray(item.product?.highlights) ? item.product.highlights : [],
          specs: item.product?.specs || {}
        },
        quantity: Number(item.quantity) || 1,
        customPrice: item.customPrice ? Number(item.customPrice) : undefined,
        priceOptionLabel: item.priceOptionLabel ? String(item.priceOptionLabel) : undefined
      }));
      localStorage.setItem('solutionbao_quote_items', safeJsonStringify(cleanItems));
    } catch (err) {
      console.error('Failed to save quote items:', err);
    }
  };

  const savePriceAlerts = (alerts: { productId: string; productName: string; email: string; date: string }[]) => {
    setPriceAlerts(alerts);
    localStorage.setItem('solutionbao_price_alerts', JSON.stringify(alerts));
  };

  const handleAddPriceAlert = (productId: string, productName: string, email: string) => {
    if (!email || !email.includes('@')) return false;
    const formattedEmail = email.trim().toLowerCase();
    
    // Check if subscription already exists
    const exists = priceAlerts.some(
      (alert) => alert.productId === productId && alert.email === formattedEmail
    );
    if (exists) return true;

    const newAlert = {
      productId,
      productName,
      email: formattedEmail,
      date: new Date().toISOString().split('T')[0]
    };

    const updatedAlerts = [...priceAlerts, newAlert];
    savePriceAlerts(updatedAlerts);
    return true;
  };

  const handleRemovePriceAlert = (productId: string, email: string) => {
    const updatedAlerts = priceAlerts.filter(
      (alert) => !(alert.productId === productId && alert.email === email)
    );
    savePriceAlerts(updatedAlerts);
  };

  const handleAddToQuote = (product: Product, customQty: number = 1, customPrice?: number, priceOptionLabel?: string) => {
    const existingIndex = quoteItems.findIndex((item) => item.product.id === product.id && item.priceOptionLabel === priceOptionLabel);
    if (existingIndex > -1) {
      const newItems = [...quoteItems];
      newItems[existingIndex].quantity += customQty;
      saveQuoteItems(newItems);
    } else {
      saveQuoteItems([...quoteItems, { product, quantity: customQty, customPrice, priceOptionLabel }]);
    }
    setIsQuoteSaved(false);
  };

  const handleAddBundleToQuote = (bundle: ComboBundle) => {
    // Thêm các món trong bundle vào giỏ hàng báo giá theo giá combo ưu đãi
    let current = [...quoteItems];
    bundle.items.forEach((item) => {
      // Tìm sản phẩm gốc trong hệ thống nếu có
      let prod = products.find((p) => p.id === item.productId);
      if (!prod) {
        prod = {
          id: item.productId || `bundle-item-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          name: item.name,
          category: 'pos',
          categoryLabel: item.categoryLabel || 'Thiết Bị Bán Hàng',
          brand: 'SOLUTION B A O',
          price: item.price,
          originalPrice: item.originalPrice || item.price,
          highlights: [item.specsSummary || 'Sản phẩm trong gói Combo trọn bộ ưu đãi'],
          specs: { 'Gói Combo': bundle.title },
          image: item.image
        };
      }
      
      const comboLabel = `[${bundle.badge || 'Combo'}] ${bundle.title}`;
      const existingIdx = current.findIndex(
        (q) => q.product.id === prod!.id && q.priceOptionLabel === comboLabel
      );
      if (existingIdx > -1) {
        current[existingIdx].quantity += 1;
      } else {
        current.push({
          product: prod,
          quantity: 1,
          customPrice: item.price,
          priceOptionLabel: comboLabel
        });
      }
    });

    saveQuoteItems(current);
    setIsQuoteSaved(false);
    showToast(`Đã thêm trọn bộ "${bundle.title}" vào Báo Giá & Đơn Hàng (Tiết kiệm ${formatVND(bundle.savingAmount)})!`);
  };

  const handleConsultBundle = (bundle: ComboBundle) => {
    setActiveTab('advisor');
    const prompt = `Chào bạn, tôi đang quan tâm đến gói "${bundle.title}" (Giá trọn bộ ưu đãi ${formatVND(bundle.bundlePrice)}, tiết kiệm ${bundle.discountPercent}%). Bạn có thể tư vấn chi tiết cấu hình các thiết bị trong gói, quà tặng đi kèm và phương thức thanh toán/lắp đặt được không?`;
    handleSendAiMessage(prompt);
  };

  const handleUpdateQuantity = (productId: string, delta: number, priceOptionLabel?: string) => {
    const newItems = quoteItems
      .map((item) => {
        if (item.product.id === productId && item.priceOptionLabel === priceOptionLabel) {
          return { ...item, quantity: Math.max(1, item.quantity + delta) };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    saveQuoteItems(newItems);
  };

  const handleRemoveFromQuote = (productId: string, priceOptionLabel?: string) => {
    const newItems = quoteItems.filter(
      (item) => !(item.product.id === productId && item.priceOptionLabel === priceOptionLabel)
    );
    saveQuoteItems(newItems);
  };

  const handleClearQuote = () => {
    saveQuoteItems([]);
    setIsQuoteSaved(false);
  };

  const openImageLightbox = (images: string[], index: number = 0, title: string = '') => {
    if (!images || images.length === 0) return;
    setLightboxImages(images);
    setLightboxIndex(Math.max(0, Math.min(index, images.length - 1)));
    setLightboxTitle(title);
    setLightboxZoom(1);
    setIsLightboxOpen(true);
  };

  const handleLightboxIndexChange = (newIdx: number) => {
    setLightboxIndex(newIdx);
    setActiveImageIdx(newIdx);
    setLightboxZoom(1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent, onSwipeLeft: () => void, onSwipeRight: () => void) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartXRef.current;
    const deltaY = touchEndY - touchStartYRef.current;
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
      if (deltaX < 0) {
        onSwipeLeft();
      } else {
        onSwipeRight();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Keyboard navigation & zoom for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
        setLightboxZoom(1);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => {
          const next = prev > 0 ? prev - 1 : lightboxImages.length - 1;
          setActiveImageIdx(next);
          return next;
        });
        setLightboxZoom(1);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => {
          const next = prev < lightboxImages.length - 1 ? prev + 1 : 0;
          setActiveImageIdx(next);
          return next;
        });
        setLightboxZoom(1);
      } else if (e.key === '+' || e.key === '=') {
        setLightboxZoom((z) => Math.min(3, Math.round((z + 0.5) * 10) / 10));
      } else if (e.key === '-') {
        setLightboxZoom((z) => Math.max(1, Math.round((z - 0.5) * 10) / 10));
      } else if (e.key === '0') {
        setLightboxZoom(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, lightboxImages.length]);

  const handleViewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    markProductAsViewed(product.id);
    setDetailQty(1);
    setActiveImageIdx(0);
    setActiveMediaType('image');
    setIsArticleExpanded(false);
    if (product.priceOptions && product.priceOptions.length > 0) {
      setPriceOption(product.priceOptions[0].id);
    } else {
      setPriceOption('main');
    }
    setActiveTab('catalog');
    showToast(`Đang chuyển sang xem chi tiết: ${product.name}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startSpeechRecognition = async () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast('Trình duyệt của bạn không hỗ trợ tìm kiếm bằng giọng nói. Vui lòng dùng Google Chrome hoặc Microsoft Edge!');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.error('Error stopping speech recognition:', e);
        }
      }
      setIsListening(false);
      return;
    }

    // Request micro permission if mediaDevices available to handle iframe blocks early
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((track) => track.stop());
      } catch (micErr: any) {
        console.warn('Microphone permission check warning:', micErr);
        if (micErr.name === 'NotAllowedError' || micErr.name === 'PermissionDeniedError') {
          showToast('Microphone bị từ chối truy cập. Vui lòng cho phép ứng dụng dùng Micro hoặc nhấn biểu tượng Mở Tab Mới trên góc phải!');
          return;
        }
      }
    }

    try {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'vi-VN';

      rec.onstart = () => {
        setIsListening(true);
        showToast('🎙️ Đang nghe giọng nói... Hãy nói tên sản phẩm bạn muốn tìm (VD: máy in hóa đơn, máy quét)');
      };

      rec.onerror = (event: any) => {
        console.error('Speech recognition error event:', event.error, event);
        setIsListening(false);
        const errType = event.error;
        if (errType === 'not-allowed' || errType === 'service-not-allowed') {
          showToast('Quyền Microphone bị chặn hoặc chưa cấp phép trong iFrame. Vui lòng mở ứng dụng ở Tab mới để sử dụng Micro!');
        } else if (errType === 'no-speech') {
          showToast('Không nghe thấy âm thanh. Vui lòng bấm Micro và thử nói lại!');
        } else if (errType === 'audio-capture') {
          showToast('Không phát hiện micro trên thiết bị của bạn!');
        } else if (errType === 'network') {
          showToast('Lỗi kết nối mạng khi xử lý giọng nói. Vui lòng kiểm tra kết nối!');
        } else if (errType === 'aborted') {
          // User or browser aborted cleanly
        } else {
          showToast(`Lỗi nhận diện giọng nói (${errType || 'không xác định'}). Vui lòng thử lại!`);
        }
      };

      rec.onend = () => {
        setIsListening(false);
      };

      rec.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          const cleanText = transcript.trim();
          setSearchQuery(cleanText);
          showToast(`🎙️ Đã tìm: "${cleanText}"`);
          if (activeTab !== 'catalog') {
            setActiveTab('catalog');
          }
          setSelectedProduct(null);
          setShowSuggestions(true);
        }
      };

      recognitionRef.current = rec;
      rec.start();
    } catch (err: any) {
      console.error('Speech recognition exception:', err);
      setIsListening(false);
      showToast('Không thể kích hoạt Microphone. Vui lòng cấp quyền Micro hoặc mở ứng dụng ở Tab mới!');
    }
  };

  // Extract unique brand names dynamically
  const uniqueBrands = useMemo(() => {
    const brandsSet = new Set(products.map((p) => p.brand.trim()));
    return Array.from(brandsSet).filter(Boolean).sort();
  }, [products]);

  // Extract unique feature tags dynamically from product highlights & tags
  const uniqueFeatureTags = useMemo(() => {
    const presetTags = [
      'In qua điện thoại',
      'Vân tay',
      'Bảo mật cao',
      'Khuôn mặt',
      'In nhiệt K80',
      'Cổng LAN/WiFi',
      'In đơn A6 Shopee',
      'Tự động cắt giấy',
      'Trả góp 0%'
    ];
    const tagsSet = new Set<string>(presetTags);
    products.forEach((p) => {
      if (p.highlights && Array.isArray(p.highlights)) {
        p.highlights.forEach((h) => {
          if (h && h.trim().length <= 35) {
            tagsSet.add(h.trim());
          }
        });
      }
      if ((p as any).tags && Array.isArray((p as any).tags)) {
        (p as any).tags.forEach((t: string) => {
          if (t && t.trim().length <= 35) {
            tagsSet.add(t.trim());
          }
        });
      }
    });
    return Array.from(tagsSet).filter(Boolean);
  }, [products]);

  // Filtered and sorted products
  const processedProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (catalogCategory === 'home') {
      // For "home" (homepage view), show only promotional or featured/popular products when no search is active
      if (searchQuery.trim() === '' && filterPriceRange === 'all' && filterBrand === 'all' && filterStockStatus === 'all' && filterTag === 'all') {
        list = list.filter((p) => p.isPopular || (p.originalPrice > p.price));
      }
    } else if (catalogCategory !== 'all') {
      list = list.filter((p) => p.category === catalogCategory);
    }

    // Subcategory filter
    if (catalogSubCategory && catalogSubCategory !== 'all') {
      list = list.filter((p) => p.subCategoryId === catalogSubCategory || (p as any).subCategory === catalogSubCategory);
    }

    // Search query filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.categoryLabel.toLowerCase().includes(query) ||
          p.highlights.some((h) => h.toLowerCase().includes(query))
      );
    }

    // Advanced Price Range Filter
    if (filterPriceRange !== 'all') {
      if (filterPriceRange === 'under_1.5m') {
        list = list.filter((p) => p.price < 1500000);
      } else if (filterPriceRange === '1.5m_3m') {
        list = list.filter((p) => p.price >= 1500000 && p.price <= 3000000);
      } else if (filterPriceRange === '3m_5m') {
        list = list.filter((p) => p.price >= 3000000 && p.price <= 5000000);
      } else if (filterPriceRange === 'over_5m') {
        list = list.filter((p) => p.price > 5000000);
      }
    }

    // Advanced Brand Filter
    if (filterBrand !== 'all') {
      list = list.filter((p) => p.brand.toLowerCase() === filterBrand.toLowerCase());
    }

    // Advanced Stock Status Filter
    if (filterStockStatus !== 'all') {
      list = list.filter((p) => {
        const status = p.inventoryStatus || 'in_stock';
        return status === filterStockStatus;
      });
    }

    // Feature Tag Filter (Lọc theo đặc tính nổi bật)
    if (filterTag !== 'all') {
      const tagLower = filterTag.toLowerCase();
      list = list.filter((p) => {
        const matchHighlight = p.highlights?.some((h) => h.toLowerCase().includes(tagLower));
        const matchTags = (p as any).tags?.some((t: string) => t.toLowerCase().includes(tagLower));
        const matchName = p.name.toLowerCase().includes(tagLower);
        const matchDesc = p.description?.toLowerCase().includes(tagLower);
        const matchSpecs = Object.values(p.specs || {}).some((val) => String(val || '').toLowerCase().includes(tagLower));
        const matchCategory = p.categoryLabel?.toLowerCase().includes(tagLower) || p.subCategoryLabel?.toLowerCase().includes(tagLower);
        return matchHighlight || matchTags || matchName || matchDesc || matchSpecs || matchCategory;
      });
    }

    // Sorting
    if (sortBy === 'priceAsc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceDesc') {
      list.sort((a, b) => b.price - a.price);
    } else {
      // popular sorting
      list.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    }

    return list;
  }, [catalogCategory, catalogSubCategory, searchQuery, sortBy, products, filterPriceRange, filterBrand, filterStockStatus, filterTag]);

  const ITEMS_PER_PAGE = 25;
  const totalPages = Math.max(1, Math.ceil(processedProducts.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const paginatedProducts = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return processedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [processedProducts, safeCurrentPage]);

  // Get top 10 promotional products sorted by discount percentage
  const promoProducts = useMemo(() => {
    return products
      .filter((p) => p.originalPrice > p.price)
      .sort((a, b) => {
        const discA = ((a.originalPrice - a.price) / a.originalPrice);
        const discB = ((b.originalPrice - b.price) / b.originalPrice);
        return discB - discA;
      })
      .slice(0, 10);
  }, [products]);

  // Get all featured (popular) products
  const featuredProducts = useMemo(() => {
    return products.filter((p) => p.isPopular);
  }, [products]);

  // Quote totals
  const { quoteSubtotal, quoteVAT, quoteDiscount, quoteTotal, totalQuantity } = useMemo(() => {
    const sub = quoteItems.reduce((acc, item) => {
      const priceToUse = item.customPrice !== undefined ? item.customPrice : item.product.price;
      return acc + priceToUse * item.quantity;
    }, 0);
    
    let disc = 0;
    if (appliedVoucher) {
      const clean = appliedVoucher.discount.trim().toLowerCase();
      if (clean.endsWith('%')) {
        const val = parseFloat(clean.replace('%', ''));
        if (!isNaN(val)) {
          disc = Math.round((sub * val) / 100);
        }
      } else {
        const digitsOnly = clean.replace(/[^0-9]/g, '');
        const val = parseFloat(digitsOnly);
        if (!isNaN(val)) {
          disc = val;
        }
      }
    }
    disc = Math.min(disc, sub);

    const afterDisc = sub - disc;
    const vat = 0; // Omit VAT calculation (bỏ VAT theo yêu cầu)
    const tot = afterDisc;
    const qty = quoteItems.reduce((acc, item) => acc + item.quantity, 0);
    return { quoteSubtotal: sub, quoteVAT: vat, quoteDiscount: disc, quoteTotal: tot, totalQuantity: qty };
  }, [quoteItems, appliedVoucher]);

  // Consumables Calculator Logic
  const calculatedPaperStats = useMemo(() => {
    const metersPerDay = (calcBillsPerDay * calcReceiptLength) / 100;
    const metersPerYear = metersPerDay * 365;
    const rollsNeededPerYear = Math.ceil(metersPerYear / 22);
    
    let matchingProduct: Product | undefined;
    let boxesNeeded = 1;
    let costEstimate = 0;

    if (calcPaperType === 'K80') {
      matchingProduct = products.find(p => p.id === 'con-k80');
      boxesNeeded = Math.ceil(rollsNeededPerYear / 50);
      costEstimate = boxesNeeded * (matchingProduct?.price || 350000);
    } else {
      matchingProduct = products.find(p => p.id === 'con-k57');
      boxesNeeded = Math.ceil(rollsNeededPerYear / 100);
      costEstimate = boxesNeeded * (matchingProduct?.price || 550000);
    }

    return {
      metersPerDay: metersPerDay.toFixed(1),
      metersPerYear: Math.round(metersPerYear),
      rollsPerYear: rollsNeededPerYear,
      boxesNeeded: boxesNeeded,
      costEstimate: costEstimate,
      matchingProduct: matchingProduct
    };
  }, [calcBillsPerDay, calcReceiptLength, calcPaperType, products]);

  const getYoutubeEmbedUrl = (url?: string | null): string | null => {
    if (!url || typeof url !== 'string') return null;
    const cleanUrl = url.trim();
    if (!cleanUrl) return null;
    
    // Direct embed URL
    if (cleanUrl.includes('youtube.com/embed/')) {
      const idMatch = cleanUrl.match(/embed\/([\w-]{11})/);
      const vid = idMatch ? idMatch[1] : '';
      return vid ? `https://www.youtube.com/embed/${vid}?autoplay=0&rel=0` : cleanUrl;
    }
    
    // Support youtube.com/watch?v=..., youtu.be/..., youtube.com/shorts/..., youtube.com/live/...
    const regExp = /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))([\w-]{11})/;
    const match = cleanUrl.match(regExp);
    if (match && match[1] && match[1].length === 11) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=0&rel=0`;
    }
    
    // Fallback for query param ?v=xxx or /xxx if length 11
    const fallbackMatch = cleanUrl.match(/[?&]v=([\w-]{11})/);
    if (fallbackMatch && fallbackMatch[1]) {
      return `https://www.youtube.com/embed/${fallbackMatch[1]}?autoplay=0&rel=0`;
    }

    return null;
  };

  const formatVND = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const highlightText = (text: string, query: string) => {
    if (!text) return '';
    if (!query || !query.trim()) return <>{text}</>;
    const trimmedQuery = query.trim();
    const escapedQuery = trimmedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark
              key={i}
              className="bg-yellow-200 text-slate-950 font-extrabold rounded-sm px-0.5 py-px mx-px shadow-[0_1px_2px_rgba(234,179,8,0.15)]"
            >
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  // AI Chat API handler
  const handleSendAiMessage = async (textToSend?: string) => {
    const messageText = textToSend || userInput;
    if (!messageText.trim() || isAiLoading) return;

    const newUserMessage: ChatMessage = { role: 'user', content: messageText };
    setChatMessages((prev) => [...prev, newUserMessage]);
    setUserInput('');
    setIsAiLoading(true);

    const historyText = chatMessages.slice(-8).map(m => m.content).join('\n');

    // Auto capture consultation lead if customer provides phone or asks for advice
    try {
      const combinedChatText = `${historyText}\n${messageText}`;
      const matchedPhones = extractPhoneNumbers(combinedChatText);
      const detectedPhone = matchedPhones.length > 0 ? matchedPhones[matchedPhones.length - 1] : '';
      const isConsultationIntent = Boolean(detectedPhone) || /tư vấn|báo giá|liên hệ|sđt|sdt|gọi lại|hỏi/i.test(combinedChatText);

      if (isConsultationIntent) {
        const leadId = `lead-${Date.now().toString().slice(-6)}`;
        const dateStr = new Date().toLocaleDateString('vi-VN');
        const timeStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

        const savedConsults = localStorage.getItem('solutionbao_consultations');
        let currentConsults = [];
        if (savedConsults) {
          try { currentConsults = JSON.parse(savedConsults); } catch (e) {}
        }
        if (!Array.isArray(currentConsults)) currentConsults = [];

        const parsedOrder = parseOrderDetailsFromText(messageText, products, historyText);

        // Check if lead already exists:
        // 1. By exact phone number if detectedPhone exists
        // 2. OR by "Chờ bổ sung SĐT" / unsupplied phone if customer previously chatted without phone
        // 3. OR by matching content
        const existingLeadIndex = currentConsults.findIndex((c: any) => 
          (detectedPhone && c.phone === detectedPhone && c.phone !== 'Chờ bổ sung SĐT') ||
          (detectedPhone && (c.phone === 'Chờ bổ sung SĐT' || !c.phone || String(c.phone).includes('Chờ bổ sung'))) ||
          (!detectedPhone && c.content && c.content.includes(parsedOrder.productName))
        );

        let isPhoneNewlyAttached = false;

        if (existingLeadIndex !== -1) {
          const existingLead = currentConsults[existingLeadIndex];
          const hadNoPhone = !existingLead.phone || existingLead.phone === 'Chờ bổ sung SĐT' || String(existingLead.phone).includes('Chờ bổ sung');

          if (detectedPhone && hadNoPhone) {
            isPhoneNewlyAttached = true;
          }

          currentConsults[existingLeadIndex] = {
            ...existingLead,
            phone: detectedPhone || existingLead.phone || 'Chờ bổ sung SĐT',
            email: detectedPhone ? `${detectedPhone}@khachhang.solutionbao.vn` : existingLead.email,
            content: detectedPhone 
              ? `[💬 YÊU CẦU TƯ VẤN] Khách gửi SĐT (${detectedPhone}) quan tâm: "${parsedOrder.productName}" | Nội dung: ${messageText}`
              : existingLead.content,
            status: detectedPhone ? 'Chưa liên hệ' : existingLead.status,
            date: `${dateStr} ${timeStr}`
          };
          localStorage.setItem('solutionbao_consultations', JSON.stringify(currentConsults));
          window.dispatchEvent(new Event('storage'));
        } else {
          // New consultation lead
          const autoLead = {
            id: leadId,
            name: parsedOrder.customerName || 'Khách Chát Trực Tuyến',
            phone: detectedPhone || 'Chờ bổ sung SĐT',
            email: detectedPhone ? `${detectedPhone}@khachhang.solutionbao.vn` : 'chat@khachhang.solutionbao.vn',
            address: parsedOrder.customerAddress || 'Tư vấn trực tiếp qua Khung Chat',
            content: detectedPhone 
              ? `[💬 YÊU CẦU TƯ VẤN] Khách gửi SĐT (${detectedPhone}) quan tâm: "${parsedOrder.productName}" | Nội dung: ${messageText}`
              : `[💬 YÊU CẦU TƯ VẤN] Khách quan tâm: "${parsedOrder.productName}" | Nội dung: ${messageText}`,
            status: detectedPhone ? 'Chưa liên hệ' : 'Chờ bổ sung SĐT',
            date: `${dateStr} ${timeStr}`,
            source: '💬 Tư Vấn Trực Tuyến'
          };
          currentConsults.unshift(autoLead);
          localStorage.setItem('solutionbao_consultations', JSON.stringify(currentConsults));
          window.dispatchEvent(new Event('storage'));
          if (detectedPhone) {
            isPhoneNewlyAttached = true;
          }
        }

        // Send real-time CONSULTATION notification to Admin when phone number is attached or new lead!
        if (detectedPhone && (isPhoneNewlyAttached || existingLeadIndex === -1)) {
          const savedNotifs = localStorage.getItem('solutionbao_system_notifications');
          let currentNotifs = [];
          if (savedNotifs) {
            try { currentNotifs = JSON.parse(savedNotifs); } catch (e) {}
          }
          if (!Array.isArray(currentNotifs)) currentNotifs = [];

          const alreadyNotified = currentNotifs.some((n: any) => 
            n.type === 'consultation' && n.message && n.message.includes(detectedPhone)
          );

          if (!alreadyNotified) {
            currentNotifs.unshift({
              id: `notif-consult-${Date.now()}`,
              title: '📞 YÊU CẦU TƯ VẤN MỚI TỪ SĐT KHÁCH HÀNG!',
              message: `Khách vừa gửi SĐT (${detectedPhone}) yêu cầu tư vấn sản phẩm "${parsedOrder.productName}".`,
              type: 'consultation',
              read: false,
              date: `${dateStr} ${timeStr}`
            });
            localStorage.setItem('solutionbao_system_notifications', JSON.stringify(currentNotifs));
            window.dispatchEvent(new CustomEvent('solutionbao_new_notif'));
          }
        }
      }
    } catch (err) {
      console.error('Error auto-capturing consultation lead:', err);
    }

    try {
      const recentHistory = chatMessages.slice(-6);
      const response = await fetch('/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          history: recentHistory
        })
      });

      const data = await response.json();
      if (response.ok && data.text) {
        const aiResponseText = data.text;
        setChatMessages((prev) => [...prev, { role: 'assistant', content: aiResponseText }]);

        // CRITICAL: ONLY auto-create order in localStorage WHEN BOTH CONDITIONS ARE MET:
        // 1. Customer has provided a VALID Phone Number (SĐT)
        // 2. The order is explicitly CLOSED / CONFIRMED by customer or AI
        const combinedChatText = `${historyText}\n${messageText}\n${aiResponseText}`;
        const matchedPhones = extractPhoneNumbers(combinedChatText);
        const detectedPhone = matchedPhones.length > 0 ? matchedPhones[matchedPhones.length - 1] : '';

        const isAiConfirmingOrder = /BẢNG BÁO GIÁ|CHỐT ĐƠN|Đơn hàng đã được|lên phiếu xuất kho|tự động khởi tạo|TỔNG THANH TOÁN:|xác nhận đơn|đã ghi nhận thông tin|lên đơn thành công/i.test(aiResponseText);
        const userHasOrderIntent = /\b(chốt|chốt đơn|đặt mua|mua ngay|mua|lên đơn|lấy 1|lấy luôn|chốt máy|chốt bộ|giao về|giao tới)\b/i.test(messageText) ||
                                   /\b(chốt|chốt đơn|đặt mua|mua ngay|lên đơn)\b/i.test(historyText);

        const hasClosedOrder = isAiConfirmingOrder || (userHasOrderIntent && /BẢNG BÁO GIÁ|TỔNG THANH TOÁN|đã ghi nhận|xuất kho|thành công/i.test(aiResponseText));

        // ONLY save order if customer PROVIDED PHONE NUMBER AND CLOSED ORDER!
        if (Boolean(detectedPhone) && hasClosedOrder) {
          try {
            const orderId = `ĐH-${Date.now().toString().slice(-6)}`;
            const dateStr = new Date().toLocaleDateString('vi-VN');
            const timeStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

            // Parse order / product details from user input + AI response quotation
            const parsedOrder = parseOrderDetailsFromText(messageText, products, historyText + '\n' + aiResponseText);

            const autoOrder = {
              id: orderId,
              customerName: parsedOrder.customerName || 'Khách Chát Trực Tuyến',
              customerPhone: detectedPhone,
              customerEmail: `${detectedPhone}@khachhang.solutionbao.vn`,
              customerAddress: parsedOrder.customerAddress || 'Tư vấn trực tiếp qua Khung Chat',
              productName: parsedOrder.productName,
              totalAmount: parsedOrder.totalAmount,
              status: 'Chờ xử lý',
              date: `${dateStr} ${timeStr}`,
              notes: `AI xác nhận chốt đơn: "${messageText}"`,
              paymentMethod: 'COD - Thanh toán khi nhận hàng'
            };

            const savedOrders = localStorage.getItem('solutionbao_orders');
            let currentOrders = [];
            if (savedOrders) {
              try { currentOrders = JSON.parse(savedOrders); } catch (e) {}
            }
            if (!Array.isArray(currentOrders)) currentOrders = [];

            const existsRecentOrder = currentOrders.some((o: any) => 
              o.notes === autoOrder.notes || (o.customerPhone === autoOrder.customerPhone && o.productName === autoOrder.productName && Math.abs(Date.now() - new Date(o.date).getTime()) < 120000)
            );

            if (!existsRecentOrder) {
              currentOrders.unshift(autoOrder);
              localStorage.setItem('solutionbao_orders', JSON.stringify(currentOrders));

              // Send real-time ORDER notification to Admin
              const savedNotifs = localStorage.getItem('solutionbao_system_notifications');
              let currentNotifs = [];
              if (savedNotifs) {
                try { currentNotifs = JSON.parse(savedNotifs); } catch (e) {}
              }
              currentNotifs.unshift({
                id: `notif-chat-${Date.now()}`,
                title: '🛒 ĐƠN HÀNG MỚI ĐÃ ĐƯỢC AI XÁC NHẬN CHỐT ĐƠN!',
                message: `AI vừa xác nhận chốt đơn thành công với ${autoOrder.customerName} (SĐT: ${detectedPhone}): "${parsedOrder.productName}" - Giá: ${parsedOrder.totalAmount.toLocaleString('vi-VN')}đ.`,
                type: 'order',
                read: false,
                date: `${dateStr} ${timeStr}`
              });
              localStorage.setItem('solutionbao_system_notifications', JSON.stringify(currentNotifs));

              window.dispatchEvent(new Event('storage'));
              window.dispatchEvent(new CustomEvent('solutionbao_new_notif'));
            }
          } catch (err) {
            console.error('Error auto-creating order after AI confirmation:', err);
          }
        }
      } else {
        setChatMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'Xin lỗi, tôi đã gặp khó khăn khi kết nối với hệ thống tư vấn. Quý khách có thể hỏi lại hoặc liên hệ trực tiếp hotline 0908555547 để được kỹ thuật viên hỗ trợ ngay lập tức!'
          }
        ]);
      }
    } catch (e) {
      console.error('Error connecting to advisor API:', e);
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Không thể kết nối đến máy chủ AI. Vui lòng kiểm tra lại kết nối mạng hoặc gọi hotline 0908.555.547 của SOLUTION B A O Technology.'
        }
      ]);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Helper validation functions for checking blank or junk inputs
  const validateNameInput = (name: string, fieldLabel: string = 'Họ và Tên'): { isValid: boolean; message: string } => {
    const trimmed = name.trim();
    if (!trimmed) {
      return { isValid: false, message: `⚠️ BẠN CHƯA NHẬP ${fieldLabel.toUpperCase()}!\nVui lòng điền đầy đủ ${fieldLabel} của bạn để bộ phận CSKH có thể liên hệ và xưng hô chính xác.` };
    }
    if (trimmed.length < 2) {
      return { isValid: false, message: `⚠️ ${fieldLabel.toUpperCase()} QUÁ NGẮN!\n${fieldLabel} hợp lệ phải có độ dài từ 2 ký tự trở lên. Vui lòng kiểm tra lại.` };
    }
    if (trimmed.length > 50) {
      return { isValid: false, message: `⚠️ ${fieldLabel.toUpperCase()} QUÁ DÀI!\n${fieldLabel} hợp lệ không nên vượt quá 50 ký tự.` };
    }
    // Check if contains only numbers or special symbols
    const validLettersRegex = /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ\s'.‘’-]+$/;
    if (!validLettersRegex.test(trimmed)) {
      return { isValid: false, message: `⚠️ ${fieldLabel.toUpperCase()} CHỨA KÝ TỰ LẠ / SỐ!\n${fieldLabel} hợp lệ chỉ được chứa chữ cái tiếng Việt, dấu cách, dấu chấm, dấu nháy đơn hoặc dấu gạch nối. Không chứa chữ số hay ký tự đặc biệt.` };
    }
    // Check for keyboard mashing or junk patterns
    const junkPatterns = /^(test|demo|asdf|abc|xyz|qwer|zxcv|123|admin|user|none|null|undefined|blank|something|nhap|nhập|abcde|asdfgh|aaaa|bbbb|cccc|dddd)$/i;
    if (junkPatterns.test(trimmed)) {
      return { isValid: false, message: `⚠️ ${fieldLabel.toUpperCase()} CHỨA DỮ LIỆU THỬ NGHIỆM / RÁC!\nVui lòng nhập đúng ${fieldLabel} thực tế của bạn (Ví dụ: Nguyễn Văn A), tránh nhập các từ vô nghĩa như "test", "demo", "asdf" hay "abc".` };
    }
    // Check for repeating characters (e.g., "aaaaa")
    if (/^(.)\1{3,}$/i.test(trimmed.replace(/\s+/g, ''))) {
      return { isValid: false, message: `⚠️ ${fieldLabel.toUpperCase()} KHÔNG HỢP LỆ!\n${fieldLabel} chứa quá nhiều ký tự lặp đi lặp lại vô nghĩa. Vui lòng nhập đúng tên thật.` };
    }
    return { isValid: true, message: '' };
  };

  const validateAddressInput = (address: string): { isValid: boolean; message: string } => {
    const trimmed = address.trim();
    if (!trimmed) {
      return { isValid: false, message: '⚠️ ĐỊA CHỈ GIAO HÀNG BỊ TRỐNG!\nĐịa chỉ nhận hàng là bắt buộc để chúng tôi giao thiết bị và tự động liên kết đẩy đơn vận chuyển trực tiếp sang đối tác giao vận.' };
    }
    if (trimmed.length < 8) {
      return { isValid: false, message: '⚠️ ĐỊA CHỈ QUÁ SƠ SÀI / THIẾU THÔNG TIN!\nĐịa chỉ nhận hàng của bạn quá ngắn (dưới 8 ký tự). Vui lòng cung cấp chi tiết: Số nhà, tên đường/thôn, phường/xã, quận/huyện để đảm bảo hàng hóa được giao chính xác.' };
    }
    const junkPatterns = /^(test|demo|asdf|abc|xyz|qwer|zxcv|12345|none|null|undefined|blank|something|nhap|nhập|vietnam|việt nam|hà nội|hồ chí minh|saigon|sài gòn|ha noi|ho chi minh|aaaaaa|bbbbbb)$/i;
    if (junkPatterns.test(trimmed)) {
      return { isValid: false, message: '⚠️ ĐỊA CHỈ CHỨA THÔNG TIN THỬ NGHIỆM / RÁC!\nVui lòng nhập địa chỉ giao hàng thực tế của bạn (gồm Số nhà, tên đường/thôn, phường/xã, quận/huyện, tỉnh/thành phố), tránh nhập các từ vô nghĩa như "test", "demo", "asdf" hoặc ghi chung chung tên tỉnh/thành phố.' };
    }
    if (/^(.)\1{5,}$/i.test(trimmed.replace(/\s+/g, ''))) {
      return { isValid: false, message: '⚠️ ĐỊA CHỈ KHÔNG HỢP LỆ!\nĐịa chỉ chứa quá nhiều ký tự lặp lại vô nghĩa (Ví dụ: "aaaaaa"). Vui lòng điền đúng địa chỉ nhận hàng của bạn.' };
    }
    return { isValid: true, message: '' };
  };

  const validateContentInput = (content: string): { isValid: boolean; message: string } => {
    const trimmed = content.trim();
    if (!trimmed) {
      return { isValid: false, message: '⚠️ NỘI DUNG CẦN TƯ VẤN BỊ TRỐNG!\nVui lòng viết một vài mô tả ngắn về yêu cầu hoặc thiết bị bạn đang quan tâm để chúng tôi chuẩn bị giải pháp tối ưu nhất.' };
    }
    if (trimmed.length < 5) {
      return { isValid: false, message: '⚠️ NỘI DUNG TƯ VẤN QUÁ NGẮN!\nVui lòng nhập nội dung rõ ràng hơn (ít nhất 5 ký tự) để chúng tôi hiểu nhu cầu của bạn.' };
    }
    const junkPatterns = /^(test|demo|asdf|abc|xyz|qwer|zxcv|123|none|null|undefined|blank|something|nhap|nhập|aaaaaa|bbbbbb)$/i;
    if (junkPatterns.test(trimmed)) {
      return { isValid: false, message: '⚠️ NỘI DUNG CẦN TƯ VẤN CHỨA DỮ LIỆU THỬ NGHIỆM / RÁC!\nVui lòng mô tả thực tế nhu cầu cần tư vấn của bạn (Ví dụ: "Tư vấn máy chấm công cho 30 người"), tránh nhập các từ vô nghĩa như "test", "demo", "asdf".' };
    }
    if (/^(.)\1{5,}$/i.test(trimmed.replace(/\s+/g, ''))) {
      return { isValid: false, message: '⚠️ NỘI DUNG TƯ VẤN KHÔNG HỢP LỆ!\nNội dung chứa quá nhiều ký tự lặp lại vô nghĩa. Vui lòng nhập nội dung thực tế.' };
    }
    return { isValid: true, message: '' };
  };

  const handleSubmitQuoteRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteFormError(null);
    if (quoteItems.length === 0) {
      const msg = '⚠️ GIỎ HÀNG TRỐNG / BẢN BÁO GIÁ CHƯA CÓ THIẾT BỊ!\nVui lòng chọn ít nhất một sản phẩm vào bảng báo giá trước khi tiến hành gửi thông tin nhận tư vấn và giải pháp.';
      setQuoteFormError(msg);
      return;
    }
    
    // Name validation
    const nameValidation = validateNameInput(customerName, 'Họ tên khách hàng');
    if (!nameValidation.isValid) {
      setQuoteFormError(nameValidation.message);
      return;
    }

    const cleanPhone = customerPhone.trim();
    const digits = cleanPhone.replace(/\D/g, '');
    if (!cleanPhone) {
      const msg = '⚠️ BẠN CHƯA NHẬP SỐ ĐIỆN THOẠI!\nVui lòng cung cấp Số điện thoại di động chính xác để bộ phận hỗ trợ kỹ thuật liên hệ bàn giao và lắp đặt thiết bị.';
      setQuoteFormError(msg);
      return;
    }
    if (digits.length < 10) {
      const msg = `⚠️ SỐ ĐIỆN THOẠI THIẾU CHỮ SỐ!\nSố điện thoại bạn nhập hiện mới có ${digits.length} chữ số. Số điện thoại di động Việt Nam chuẩn phải có ĐẦY ĐỦ 10 CHỮ SỐ (Ví dụ: 0901234567). Vui lòng kiểm tra và điền thêm cho đúng!`;
      setQuoteFormError(msg);
      return;
    }
    if (digits.length > 11) {
      const msg = `⚠️ SỐ ĐIỆN THOẠI QUÁ DÀI!\nSố điện thoại bạn nhập có tới ${digits.length} chữ số (nhiều hơn quy chuẩn 10 chữ số). Vui lòng kiểm tra lại để tránh nhập nhầm số!`;
      setQuoteFormError(msg);
      return;
    }
    const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
    if (!phoneRegex.test(cleanPhone)) {
      const msg = '⚠️ SỐ ĐIỆN THOẠI KHÔNG ĐÚNG ĐỊNH DẠNG!\nSố điện thoại di động Việt Nam hợp lệ phải bắt đầu bằng số 0 (hoặc +84), tiếp theo là đầu số di động hợp lệ (3, 5, 7, 8, 9) và có đầy đủ 10 chữ số. Ví dụ: 0901234567.';
      setQuoteFormError(msg);
      return;
    }

    // Address validation
    const addressValidation = validateAddressInput(customerAddress);
    if (!addressValidation.isValid) {
      setQuoteFormError(addressValidation.message);
      return;
    }

    setIsQuoteSaved(true);
    
    // Format product line summary for order management
    const productsString = quoteItems
      .map((item) => {
        const optText = item.priceOptionLabel ? ` [${item.priceOptionLabel}]` : '';
        return `${item.quantity}x ${item.product.name}${optText}`;
      })
      .join(', ');

    // Generate a random high-quality invoice order ID
    const orderId = `ĐH-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderId,
      customerName: customerName,
      customerPhone: customerPhone,
      customerEmail: customerEmail || 'Chưa cung cấp',
      customerAddress: customerAddress || 'Chưa cung cấp',
      productName: productsString || 'Bộ thiết bị tư vấn giải pháp',
      totalAmount: quoteTotal,
      status: 'Chờ xử lý',
      paymentMethod: paymentMethod === 'cod' ? 'Giao hàng COD' : 'Chuyển khoản ngân hàng',
      date: `${new Date().toLocaleDateString('vi-VN')} ${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`,
      createdAt: new Date().toISOString(),
      items: quoteItems.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        brand: item.product.brand,
        quantity: item.quantity,
        price: item.customPrice || item.product.price,
        priceOptionLabel: item.priceOptionLabel || ''
      })),
      appliedVoucher: appliedVoucher ? {
        code: appliedVoucher.code,
        discount: appliedVoucher.discount,
        desc: appliedVoucher.desc
      } : null
    };

    // Synchronize to persistent localStorage
    try {
      const savedOrders = localStorage.getItem('solutionbao_orders');
      let currentOrders = [];
      if (savedOrders) {
        currentOrders = JSON.parse(savedOrders);
      }
      if (!Array.isArray(currentOrders)) {
        currentOrders = [];
      }
      currentOrders.unshift(newOrder);
      localStorage.setItem('solutionbao_orders', JSON.stringify(currentOrders));
    } catch (err) {
      console.error('Error synchronizing quote with orders:', err);
    }

    setLastCreatedOrderId(orderId);
    setShowOrderSuccessModal(true);
    addSystemNotification(
      '🎉 ĐƠN HÀNG MỚI!',
      `Khách hàng ${customerName} (SĐT: ${customerPhone}) vừa đặt đơn hàng mới ${orderId} thành công trị giá ${quoteTotal.toLocaleString('vi-VN')}đ.`,
      'order',
      orderId
    );
    // Clear localStorage cart items immediately so reloading the page won't restore the items after placing order successfully
    localStorage.setItem('solutionbao_quote_items', '[]');
  };

  // Apply and Remove Voucher handlers
  const handleApplyVoucher = (code: string) => {
    if (!code.trim()) {
      setVoucherError('Vui lòng nhập mã giảm giá!');
      setAppliedVoucher(null);
      return;
    }
    try {
      const saved = localStorage.getItem('solutionbao_coupons');
      let couponsList = [];
      if (saved) {
        couponsList = JSON.parse(saved);
      } else {
        couponsList = [
          { id: 'KM10', desc: 'Giảm giá 10% tổng đơn hàng', discount: '10%', code: 'KM10', status: 'Hoạt động' },
          { id: 'SOLUTIONBAO50', desc: 'Giảm giá 50.000đ cho đơn hàng đầu tiên', discount: '50.000đ', code: 'SOLUTIONBAO50', status: 'Hoạt động' },
          { id: 'GIAMGIA20', desc: 'Giảm giá 20% cho dòng sản phẩm POS', discount: '20%', code: 'GIAMGIA20', status: 'Hết hạn' }
        ];
      }
      
      const found = couponsList.find((c: any) => c.code.trim().toUpperCase() === code.trim().toUpperCase());
      if (!found) {
        setVoucherError('Mã giảm giá không tồn tại!');
        setAppliedVoucher(null);
      } else if (found.status !== 'Hoạt động') {
        setVoucherError('Mã giảm giá này đã hết hạn hoặc tạm dừng áp dụng!');
        setAppliedVoucher(null);
      } else {
        setAppliedVoucher(found);
        setVoucherError('');
        showToast(`Áp dụng thành công mã giảm giá ${found.code}: ${found.desc}!`);
      }
    } catch (err) {
      console.error('Error applying voucher:', err);
      setVoucherError('Lỗi kiểm tra mã giảm giá!');
    }
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
    setVoucherCode('');
    setVoucherError('');
    showToast('Đã hủy áp dụng mã giảm giá.');
  };

  // Homepage Consultation Request handler
  const handleHomeConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHomeConsultError(null);
    
    // Name validation
    const nameValidation = validateNameInput(homeConsultName, 'Họ và Tên');
    if (!nameValidation.isValid) {
      setHomeConsultError(nameValidation.message);
      return;
    }

    const cleanPhone = homeConsultPhone.trim();
    const digits = cleanPhone.replace(/\D/g, '');
    if (!cleanPhone) {
      const msg = '⚠️ BẠN CHƯA NHẬP SỐ ĐIỆN THOẠI!\nVui lòng cung cấp Số điện thoại để chúng tôi liên hệ tư vấn lắp đặt.';
      setHomeConsultError(msg);
      return;
    }
    if (digits.length < 10) {
      const msg = `⚠️ SỐ ĐIỆN THOẠI THIẾU CHỮ SỐ!\nSố điện thoại bạn nhập hiện chỉ có ${digits.length} chữ số. Vui lòng nhập đúng và đầy đủ 10 chữ số (Ví dụ: 0901234567) để được hỗ trợ.`;
      setHomeConsultError(msg);
      return;
    }
    if (digits.length > 11) {
      const msg = `⚠️ SỐ ĐIỆN THOẠI QUÁ DÀI!\nSố điện thoại bạn nhập có tới ${digits.length} chữ số. Vui lòng kiểm tra lại!`;
      setHomeConsultError(msg);
      return;
    }
    const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
    if (!phoneRegex.test(cleanPhone)) {
      const msg = '⚠️ SỐ ĐIỆN THOẠI KHÔNG ĐÚNG ĐỊNH DẠNG!\nVui lòng nhập số điện thoại di động Việt Nam hợp lệ (10 chữ số, ví dụ: 0901234567).';
      setHomeConsultError(msg);
      return;
    }

    // Content validation
    const contentValidation = validateContentInput(homeConsultContent);
    if (!contentValidation.isValid) {
      setHomeConsultError(contentValidation.message);
      return;
    }

    const consultId = `TV-${Math.floor(1000 + Math.random() * 9000)}`;

    // Sync with solutionbao_consultations so it shows up in Admin Panel under Yêu cầu tư vấn
    try {
      const savedConsults = localStorage.getItem('solutionbao_consultations');
      let currentConsults = [];
      if (savedConsults) {
        currentConsults = JSON.parse(savedConsults);
      } else {
        currentConsults = [
          { id: 'tv-1', name: 'Phạm Đức Duy', phone: '0912345678', email: 'duydp@gmail.com', content: 'Cần tư vấn trọn bộ máy POS bán hàng cho quán cafe 2 tầng', status: 'Chưa liên hệ', date: '02/07/2026' },
          { id: 'tv-2', name: 'Ngoại Ngữ Quốc Tế', phone: '0988776655', email: 'info@globaledu.com', content: 'Cần khảo sát lắp đặt 3 máy chấm công khuôn mặt tại chi nhánh Q1', status: 'Đã tư vấn', date: '01/07/2026' },
          { id: 'tv-3', name: 'Shop quần áo Bloom', phone: '0905123456', email: 'bloom.btk@gmail.com', content: 'Cần mua thêm 5 cuộn giấy decal in tem nhãn', status: 'Đã tư vấn', date: '30/06/2026' }
        ];
      }
      if (!Array.isArray(currentConsults)) {
        currentConsults = [];
      }
      const newConsult = {
        id: consultId,
        name: homeConsultName,
        phone: homeConsultPhone,
        email: 'Đăng ký ngoài trang chủ',
        content: `Khách cần tư vấn: ${homeConsultContent}`,
        status: 'Chưa liên hệ',
        date: `${new Date().toLocaleDateString('vi-VN')} ${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`
      };
      currentConsults.unshift(newConsult);
      localStorage.setItem('solutionbao_consultations', JSON.stringify(currentConsults));
    } catch (err) {
      console.error('Error synchronizing homepage consultation with admin section:', err);
    }

    setHomeConsultSuccess(consultId);
    showToast(`Đăng ký tư vấn thành công! Mã yêu cầu của bạn là ${consultId}`);
    addSystemNotification(
      '📞 YÊU CẦU TƯ VẤN MỚI!',
      `Khách hàng ${homeConsultName} (SĐT: ${homeConsultPhone}) vừa đăng ký tư vấn trực tiếp ngoài trang chủ với nội dung: "${homeConsultContent}".`,
      'consultation',
      consultId
    );
  };

  // Product Specific Consultation Request handler
  const handleProductConsultationSubmit = (e: React.FormEvent, product: Product) => {
    e.preventDefault();
    setProductConsultError(null);
    
    // Name validation
    const nameValidation = validateNameInput(productConsultName, 'Họ và Tên');
    if (!nameValidation.isValid) {
      setProductConsultError(nameValidation.message);
      return;
    }

    const cleanPhone = productConsultPhone.trim();
    const digits = cleanPhone.replace(/\D/g, '');
    if (!cleanPhone) {
      const msg = '⚠️ BẠN CHƯA NHẬP SỐ ĐIỆN THOẠI!\nVui lòng cung cấp Số điện thoại để chúng tôi liên hệ tư vấn và lắp đặt sản phẩm.';
      setProductConsultError(msg);
      return;
    }
    if (digits.length < 10) {
      const msg = `⚠️ SỐ ĐIỆN THOẠI THIẾU CHỮ SỐ!\nSố điện thoại bạn nhập hiện chỉ có ${digits.length} chữ số. Vui lòng nhập đúng và đầy đủ 10 chữ số (Ví dụ: 0901234567).`;
      setProductConsultError(msg);
      return;
    }
    if (digits.length > 11) {
      const msg = `⚠️ SỐ ĐIỆN THOẠI QUÁ DÀI!\nSố điện thoại bạn nhập có tới ${digits.length} chữ số. Vui lòng kiểm tra lại!`;
      setProductConsultError(msg);
      return;
    }
    const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
    if (!phoneRegex.test(cleanPhone)) {
      const msg = '⚠️ SỐ ĐIỆN THOẠI KHÔNG ĐÚNG ĐỊNH DẠNG!\nVui lòng nhập số điện thoại di động Việt Nam hợp lệ (10 chữ số, ví dụ: 0901234567).';
      setProductConsultError(msg);
      return;
    }

    const consultId = `TV-${Math.floor(1000 + Math.random() * 9000)}`;
    const noteText = productConsultNote.trim() ? `: ${productConsultNote}` : '';

    // Sync with solutionbao_consultations so it shows up in Admin Panel under Yêu cầu tư vấn
    try {
      const savedConsults = localStorage.getItem('solutionbao_consultations');
      let currentConsults = [];
      if (savedConsults) {
        currentConsults = JSON.parse(savedConsults);
      } else {
        currentConsults = [
          { id: 'tv-1', name: 'Phạm Đức Duy', phone: '0912345678', email: 'duydp@gmail.com', content: 'Cần tư vấn trọn bộ máy POS bán hàng cho quán cafe 2 tầng', status: 'Chưa liên hệ', date: '02/07/2026' },
          { id: 'tv-2', name: 'Ngoại Ngữ Quốc Tế', phone: '0988776655', email: 'info@globaledu.com', content: 'Cần khảo sát lắp đặt 3 máy chấm công khuôn mặt tại chi nhánh Q1', status: 'Đã tư vấn', date: '01/07/2026' },
          { id: 'tv-3', name: 'Shop quần áo Bloom', phone: '0905123456', email: 'bloom.btk@gmail.com', content: 'Cần mua thêm 5 cuộn giấy decal in tem nhãn', status: 'Đã tư vấn', date: '30/06/2026' }
        ];
      }
      if (!Array.isArray(currentConsults)) {
        currentConsults = [];
      }
      const newConsult = {
        id: consultId,
        name: productConsultName,
        phone: productConsultPhone,
        email: 'Yêu cầu tư vấn sản phẩm',
        content: `Khách muốn được tư vấn dòng máy: ${product.name} (${product.brand})${noteText}`,
        status: 'Chưa liên hệ',
        date: `${new Date().toLocaleDateString('vi-VN')} ${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`
      };
      currentConsults.unshift(newConsult);
      localStorage.setItem('solutionbao_consultations', JSON.stringify(currentConsults));
    } catch (err) {
      console.error('Error synchronizing product consultation with admin section:', err);
    }

    setProductConsultSuccess(consultId);
    showToast(`Gửi yêu cầu tư vấn sản phẩm ${product.name} thành công! Mã yêu cầu: ${consultId}`);
    addSystemNotification(
      '🛍️ YÊU CẦU TƯ VẤN SẢN PHẨM!',
      `Khách hàng ${productConsultName} (SĐT: ${productConsultPhone}) yêu cầu tư vấn sản phẩm "${product.name}" (${product.brand})${noteText}.`,
      'consultation',
      consultId
    );
  };

  // Order Lookup handler
  const handleLookupOrder = (explicitQuery?: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const queryToUse = explicitQuery !== undefined ? explicitQuery : lookupQuery;
    if (!queryToUse.trim()) {
      setLookupResult([]);
      setHasSearchedOrder(true);
      return;
    }
    try {
      const q = queryToUse.trim().toLowerCase();
      let matchedOrders: any[] = [];

      const savedOrders = localStorage.getItem('solutionbao_orders');
      if (savedOrders) {
        const allOrders = JSON.parse(savedOrders);
        if (Array.isArray(allOrders)) {
          matchedOrders = allOrders.filter(order => 
            (order.id && order.id.toLowerCase().includes(q)) ||
            (order.customerPhone && order.customerPhone.toLowerCase().includes(q)) ||
            (order.customerName && order.customerName.toLowerCase().includes(q))
          );
        }
      }

      // Also search in consultations
      const savedConsults = localStorage.getItem('solutionbao_consultations');
      if (savedConsults) {
        const allConsults = JSON.parse(savedConsults);
        if (Array.isArray(allConsults)) {
          const matchedConsults = allConsults.filter(consult => 
            (consult.id && consult.id.toLowerCase().includes(q)) ||
            (consult.phone && consult.phone.toLowerCase().includes(q)) ||
            (consult.name && consult.name.toLowerCase().includes(q))
          );

          // Map matched consultations into pseudo-orders for visual consistency in lookup results
          const mappedConsults = matchedConsults.map(consult => ({
            id: consult.id,
            customerName: consult.name,
            customerPhone: consult.phone,
            customerEmail: consult.email || 'Liên hệ tư vấn',
            customerAddress: 'Yêu cầu tư vấn trực tiếp',
            productName: consult.content,
            totalAmount: 0,
            status: consult.status === 'Chưa liên hệ' ? 'Chờ xử lý' : 'Đã hoàn thành',
            paymentMethod: 'Đăng ký tư vấn trực tiếp',
            date: consult.date
          }));

          mappedConsults.forEach(mapped => {
            if (!matchedOrders.some(order => order.id.toLowerCase() === mapped.id.toLowerCase())) {
              matchedOrders.push(mapped);
            }
          });
        }
      }

      setLookupResult(matchedOrders);
    } catch (err) {
      console.error(err);
      setLookupResult([]);
    }
    setHasSearchedOrder(true);
  };



  // Filtering troubleshooting guides based on search query
  const filteredTroubleshoots = useMemo(() => {
    const list = troubleshoots.length > 0 ? troubleshoots : TROUBLESHOOTING_GUIDE;
    if (!troubleSearch.trim()) return list;
    const query = troubleSearch.toLowerCase();
    return list.filter(
      (item) =>
        item.problem.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query) ||
        item.steps.some((s: string) => s.toLowerCase().includes(query))
    );
  }, [troubleSearch, troubleshoots]);

  // Filtering FAQs based on selected category and troubleSearch
  const filteredFaqs = useMemo(() => {
    const data = [
      {
        category: "attendance",
        q: "Phần mềm chấm công Wise Eye và Ronald Jack Pro có hỗ trợ xuất báo biểu ca xoay, ca đêm không?",
        a: "Có, các phần mềm chấm công tiếng Việt như Wise Eye và Ronald Jack Pro đều hỗ trợ khai báo ca kíp linh hoạt, ca gãy, ca hành chính và đặc biệt là ca đêm qua ngày (vượt mốc 00:00). Hệ thống tự động tính toán tổng giờ làm việc, phân loại tăng ca đêm và gộp công chuẩn xác cho các mô hình nhà hàng, khách sạn, quán cafe hoặc nhà xưởng hoạt động 24/7."
      },
      {
        category: "attendance",
        q: "Làm thế nào để kết nối máy chấm công Ronald Jack tại chi nhánh về văn phòng trung tâm từ xa?",
        a: "Để quản lý dữ liệu từ xa, bạn cần thực hiện mở Port (thường là Port 4370) trên modem Internet tại chi nhánh hướng về địa chỉ IP tĩnh nội bộ của máy chấm công. Sau đó trên phần mềm Wise Eye ở máy chủ trung tâm, quý khách chỉ cần nhập Tên miền động (DNS) hoặc địa chỉ IP WAN của chi nhánh kèm theo Port đã mở là có thể đồng bộ dữ liệu nhân viên và tải giờ công từ xa cực kỳ nhanh chóng."
      },
      {
        category: "printer",
        q: "Các dòng máy in hóa đơn Xprinter do SOLUTION B A O cung cấp có tương thích với hệ điều hành macOS (MacBook) không?",
        a: "Hầu hết các dòng máy in hóa đơn Xprinter của chúng tôi sử dụng giao thức ESC/POS tiêu chuẩn và có thể cài đặt driver CUPS trên macOS để in hóa đơn bình thường qua cổng USB hoặc mạng LAN. Tuy nhiên, một số tính năng phần mềm quản lý bán hàng chuyên sâu hiện nay vẫn tối ưu và đầy đủ driver trực tiếp nhất trên hệ điều hành Windows. Đội ngũ kỹ thuật SOLUTION B A O sẽ hỗ trợ cài đặt cấu hình tối đa cho máy Mac của bạn."
      },
      {
        category: "printer",
        q: "Giấy in nhiệt K80 và K57 do SOLUTION B A O phân phối có dùng được cho máy in của các thương hiệu khác không?",
        a: "Hoàn toàn tương thích! Giấy in nhiệt cao cấp thương hiệu SOLUTION B A O (nhập khẩu nguyên cuộn từ Oji Nhật Bản) sử dụng công nghệ in nhiệt trực tiếp không dùng mực. Sản phẩm đạt chuẩn kích thước khổ K80 (80mm) và K57 (57mm), tương thích hoàn hảo 100% với toàn bộ các dòng máy in hóa đơn nhiệt của Xprinter, Epson, Bixolon, Sewoo, Star Micronics trên thị trường hiện nay."
      },
      {
        category: "label",
        q: "Máy in tem nhãn XP-350B và XP-420B kết nối cổng USB có in được vận đơn, mã vạch từ điện thoại di động không?",
        a: "Phiên bản mặc định của XP-350B và XP-420B sử dụng kết nối dây USB truyền thống, do đó chỉ hỗ trợ in ấn trực tiếp từ máy tính (Windows hoặc macOS). Nếu quý khách có nhu cầu in vận đơn từ các ứng dụng giao hàng (GHTK, GHN, Viettel Post...) hoặc in tem nhãn từ điện thoại di động, vui lòng liên hệ tư vấn chọn dòng máy in có tích hợp cổng kết nối LAN (Ethernet/Wi-Fi) hoặc kết nối Bluetooth để sử dụng linh hoạt nhất."
      },
      {
        category: "general",
        q: "Các thiết bị của SOLUTION B A O (như máy in hóa đơn K80, máy quét mã vạch) có tương thích tốt với các phần mềm bán hàng KiotViet, Sapo, Haravan, POS365, Loyverse không?",
        a: "Hoàn toàn tương thích! Tất cả dòng máy in hóa đơn (K80, K57) và máy quét mã vạch do chúng tôi cung cấp đều tuân theo chuẩn lệnh ESC/POS và các chuẩn kết nối công nghiệp tiêu chuẩn (USB, LAN, Bluetooth). Chúng được thiết kế để nhận diện tự động hoặc cấu hình nhanh chóng trên các phần mềm quản lý bán hàng phổ biến như Sapo, KiotViet, Haravan, POS365, Loyverse cả trên máy tính (Windows/Mac) lẫn ứng dụng di động (Android/iOS)."
      },
      {
        category: "printer",
        q: "Làm thế nào để cấu hình và thay đổi địa chỉ IP của máy in hóa đơn cổng LAN (Ethernet) cho trùng khớp với lớp mạng modem tại cửa hàng?",
        a: "Để đổi địa chỉ IP máy in cổng LAN, quý khách sử dụng công cụ cấu hình IP chuyên dụng (như NetTool hoặc Xprinter IP Utility). Các bước thực hiện:\n1. Kết nối máy in với máy tính bằng cáp USB hoặc cắm dây LAN trực tiếp vào máy tính.\n2. Mở phần mềm cấu hình lên, nhập địa chỉ IP mới trùng dải mạng với Router Wi-Fi của bạn (ví dụ: Router là 192.168.1.1 thì đặt IP máy in là 192.168.1.250 để tránh trùng lặp).\n3. Nhấn 'Set IP' hoặc 'Write' và khởi động lại máy in.\nNếu gặp khó khăn, đội ngũ kỹ thuật SOLUTION B A O luôn sẵn sàng hỗ trợ bạn qua UltraViewer chỉ trong 2 phút."
      },
      {
        category: "attendance",
        q: "Phần mềm chấm công Ronald Jack Pro, Wise Eye On 39 hay Mitaco có hoạt động ổn định trên hệ điều hành Windows 11 64-bit mới nhất không?",
        a: "Có, các phiên bản phần mềm chấm công tiếng Việt mới nhất hiện tại đều hoạt động hoàn toàn ổn định trên Windows 11 (cả phiên bản Home và Pro). Trong trường hợp hệ thống gặp lỗi kết nối cơ sở dữ liệu Access Database (lỗi nhà cung cấp Microsoft.Jet.OLEDB), bạn chỉ cần khởi chạy phần mềm bằng quyền quản trị viên ('Run as Administrator') hoặc cài đặt thêm gói bổ sung 'Microsoft Access Database Engine' phiên bản tương ứng là có thể khắc nhập dữ liệu bình thường."
      },
      {
        category: "attendance",
        q: "Làm thế nào khi máy chấm công bị khóa quyền Admin (do nhân viên cũ nghỉ không bàn giao tài khoản) khiến quản lý mới không nhấn được nút M/OK?",
        a: "Quý khách có thể tự giải phóng quyền Admin thông qua phần mềm chấm công đang kết nối với máy đó:\n1. Trên phần mềm chấm công ở máy tính (như Ronald Jack Pro / Wise Eye), kết nối trực tiếp đến máy chấm công.\n2. Vào mục 'Thông tin thiết bị' hoặc 'Quản lý thiết bị'.\n3. Click chọn chức năng 'Xóa nhân viên quản trị' (Clear Admin Privilege). Máy chấm công sẽ lập tức được mở khóa.\nNếu máy chấm công chưa từng kết nối phần mềm, hãy liên hệ Hotline kỹ thuật 0908.555.547 để nhận mã mở khóa tạm thời (Super Password) được tính dựa theo giờ thực tế hiển thị trên màn hình máy chấm công."
      }
    ];

    return data.filter(faq => {
      const matchCategory = faqCategory === 'all' || faq.category === faqCategory;
      const matchSearch = !troubleSearch || 
        faq.q.toLowerCase().includes(troubleSearch.toLowerCase()) || 
        faq.a.toLowerCase().includes(troubleSearch.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [faqCategory, troubleSearch]);

  // Dedicated Product Detail Page
  const renderDedicatedProductPage = (p: Product) => {
    const itemInQuote = quoteItems.find((item) => item.product.id === p.id);
    const hasDiscount = p.originalPrice > p.price;
    const discountPercent = hasDiscount ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;

    // Find if there is a related news article
    const relatedArticle = newsArticles.find(
      (art) => art.relatedProductIds && art.relatedProductIds.includes(p.id)
    );

    // Gallery definitions for interactive previews
    const productImages: string[] = [];
    if (p.image) productImages.push(p.image);
    if (p.images && p.images.length > 0) {
      p.images.forEach((img) => {
        if (img && !productImages.includes(img)) {
          productImages.push(img);
        }
      });
    } else {
      if (p.imageBack) productImages.push(p.imageBack);
      if (p.imageInside) productImages.push(p.imageInside);
      if (p.imageAccessory) productImages.push(p.imageAccessory);
    }

    const productVideoEmbedUrl = p.videoUrl ? getYoutubeEmbedUrl(p.videoUrl) : null;

    // Enriched specs based on category
    const getEnrichedSpecs = (product: Product) => {
      const baseSpecs = { ...product.specs };
      if (product.category === 'printer') {
        if (!baseSpecs['Tuổi thọ đầu in']) baseSpecs['Tuổi thọ đầu in'] = '100 km - 150 km liên tục';
        if (!baseSpecs['Hệ điều hành hỗ trợ']) baseSpecs['Hệ điều hành hỗ trợ'] = 'Windows 7/8/10/11, Linux, macOS';
        if (!baseSpecs['Đường kính cuộn giấy tối đa']) baseSpecs['Đường kính cuộn giấy tối đa'] = '45mm - 80mm';
        if (!baseSpecs['Nguồn điện hoạt động']) baseSpecs['Nguồn điện hoạt động'] = 'AC 100-240V, Output DC 24V/2.5A';
      } else if (product.category === 'label') {
        if (!baseSpecs['Độ phân giải']) baseSpecs['Độ phân giải'] = '203 DPI (8 dots/mm) tiêu chuẩn sắc nét';
        if (!baseSpecs['Chiều rộng khổ tem tối đa']) baseSpecs['Chiều rộng khổ tem tối đa'] = '108 mm (Hỗ trợ nhãn A6 vận đơn)';
        if (!baseSpecs['Tuổi thọ đầu in nhiệt']) baseSpecs['Tuổi thọ đầu in nhiệt'] = '50 km - 80 km giấy liên tục';
        if (!baseSpecs['Hệ điều hành hỗ trợ']) baseSpecs['Hệ điều hành hỗ trợ'] = 'Windows 10/11, macOS, Linux';
      } else if (product.category === 'attendance') {
        if (!baseSpecs['Thời gian nhận dạng']) baseSpecs['Thời gian nhận dạng'] = '< 0.5 giây / lượt chấm công';
        if (!baseSpecs['Nguồn cấp điện']) baseSpecs['Nguồn cấp điện'] = 'DC 5V - 12V ổn định dòng';
        if (!baseSpecs['Cổng kết nối truyền dữ liệu']) baseSpecs['Cổng kết nối truyền dữ liệu'] = 'TCP/IP RJ45 LAN + USB host';
        if (!baseSpecs['Phần mềm tương thích']) baseSpecs['Phần mềm tương thích'] = 'Ronald Jack Software, FTA, Mitaco, Wise Eye';
      } else if (product.category === 'scanner') {
        if (!baseSpecs['Tốc độ giải mã']) baseSpecs['Tốc độ giải mã'] = '200 - 500 quét / giây cực nhạy';
        if (!baseSpecs['Độ bền va đập vật lý']) baseSpecs['Độ bền va đập vật lý'] = 'Chịu rơi rớt tốt từ độ cao 1.5m xuống sàn bê tông';
        if (!baseSpecs['Khả năng đọc mã vạch']) baseSpecs['Khả năng đọc mã vạch'] = 'Quét mượt mà mã vạch 1D & 2D (QR Code) mờ, xước hoặc trên màn hình điện thoại';
        if (!baseSpecs['Chiều dài cáp kết nối']) baseSpecs['Chiều dài cáp kết nối'] = 'Dài 1.8m siêu dẻo dai (không cần driver)';
      } else if (product.category === 'drawer') {
        if (!baseSpecs['Số ngăn chứa']) baseSpecs['Số ngăn chứa'] = '5 ngăn đựng tiền giấy có kẹp sắt + 4 ngăn tiền xu/tiền giấy nhỏ';
        if (!baseSpecs['Cổng kích mở tự động']) baseSpecs['Cổng kích mở tự động'] = 'RJ11 (nối vào máy in hóa đơn 24V)';
        if (!baseSpecs['Độ bền cơ học']) baseSpecs['Độ bền cơ học'] = 'Trên 1.000.000 lần đóng mở nhẹ nhàng';
        if (!baseSpecs['Vật liệu chế tạo']) baseSpecs['Vật liệu chế tạo'] = 'Khung vỏ thép mạ kim dày, sơn tĩnh điện';
      }
      return baseSpecs;
    };

    // Find matches from our real products list for cross-sales
    const getCompanionProducts = (product: Product) => {
      const list: Product[] = [];
      if (product.category === 'printer') {
        const paper = products.find(x => x.id === 'con-k80') || products.find(x => x.category === 'consumable');
        const drawer = products.find(x => x.id === 'draw-rt405') || products.find(x => x.category === 'drawer');
        if (paper) list.push(paper);
        if (drawer) list.push(drawer);
      } else if (product.category === 'label') {
        const decal = products.find(x => x.id === 'con-tem3') || products.find(x => x.category === 'consumable');
        const scanner = products.find(x => x.category === 'scanner');
        if (decal) list.push(decal);
        if (scanner) list.push(scanner);
      } else if (product.category === 'attendance') {
        const card = products.find(x => x.category === 'consumable' && x.id !== 'con-k80');
        const secondaryAtt = products.find(x => x.category === 'attendance' && x.id !== product.id);
        if (card) list.push(card);
        if (secondaryAtt) list.push(secondaryAtt);
      } else if (product.category === 'scanner') {
        const prn = products.find(x => x.category === 'printer');
        const drawer = products.find(x => x.id === 'draw-rt405') || products.find(x => x.category === 'drawer');
        if (prn) list.push(prn);
        if (drawer) list.push(drawer);
      } else if (product.category === 'drawer') {
        const prn = products.find(x => x.category === 'printer');
        const paper = products.find(x => x.id === 'con-k80') || products.find(x => x.category === 'consumable');
        if (prn) list.push(prn);
        if (paper) list.push(paper);
      } else {
        const prn = products.find(x => x.category === 'printer');
        const paper = products.find(x => x.id === 'con-k80');
        if (prn) list.push(prn);
        if (paper) list.push(paper);
      }
      return list.slice(0, 2);
    };

    const companions = getCompanionProducts(p);
    const enrichedSpecs = getEnrichedSpecs(p);

    const getRelatedProducts = (currentProduct: Product) => {
      return products
        .filter((other) => other.category === currentProduct.category && other.id !== currentProduct.id)
        .sort((a, b) => Math.abs(a.price - currentProduct.price) - Math.abs(b.price - currentProduct.price))
        .slice(0, 4);
    };
    const relatedProducts = getRelatedProducts(p);

    const priceOptions = p.priceOptions && p.priceOptions.length > 0
      ? p.priceOptions.map((opt, oIdx) => ({
          id: opt.id,
          title: opt.name,
          subtitle: `Mức giá tự chọn #${oIdx + 1}`,
          price: opt.price,
          originalPrice: opt.originalPrice || opt.price,
          icon: <Zap className="w-4 h-4" />,
          desc: `Giá ưu đãi áp dụng trực tiếp khi chọn phương thức mua hàng: ${opt.name}.`
        }))
      : [
          {
            id: 'main',
            title: 'Giá bán chính hãng',
            subtitle: 'Giá tốt chính thức',
            price: p.price,
            originalPrice: p.originalPrice,
            icon: <Zap className="w-4 h-4" />,
            desc: 'Giá bán chính thức và cam kết dịch vụ kỹ thuật uy tín tại SOLUTION B A O.'
          }
        ];

    const activeOpt = priceOptions.find(opt => opt.id === priceOption) || priceOptions[0];

    // Compute star ratings & reviews for structured data
    const averageRating = getAverageRating(p.id);
    const reviewCount = getProductReviewsCount(p.id);
    const reviewsList = getProductReviews(p.id);

    // Build Schema.org structured data (JSON-LD) for SEO
    const schemaMarkup = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": p.name,
      "image": productImages,
      "description": p.description || `${p.name} chính hãng chất lượng cao tại SOLUTION B A O.`,
      "sku": p.id,
      "mpn": p.id,
      "brand": {
        "@type": "Brand",
        "name": p.brand || "SOLUTION B A O"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": averageRating,
        "reviewCount": String(reviewCount)
      },
      ...(reviewsList.length > 0 ? {
        "review": reviewsList.map(r => ({
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": r.author || "Khách hàng"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": String(r.rating),
            "bestRating": "5"
          },
          "reviewBody": r.comment
        }))
      } : {
        "review": {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Khách hàng"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": averageRating,
            "bestRating": "5"
          },
          "reviewBody": "Sản phẩm hoạt động rất tốt, cài đặt nhanh chóng và hỗ trợ tận tình."
        }
      }),
      "offers": p.priceOptions && p.priceOptions.length > 1 ? {
        "@type": "AggregateOffer",
        "priceCurrency": "VND",
        "lowPrice": String(Math.min(...p.priceOptions.map(opt => opt.price))),
        "highPrice": String(Math.max(...p.priceOptions.map(opt => opt.price))),
        "offerCount": String(p.priceOptions.length),
        "availability": p.inventoryStatus === 'out_of_stock' ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
        "offers": p.priceOptions.map(opt => ({
          "@type": "Offer",
          "name": opt.name,
          "price": String(opt.price),
          "priceCurrency": "VND",
          "availability": p.inventoryStatus === 'out_of_stock' ? "https://schema.org/OutOfStock" : "https://schema.org/InStock"
        }))
      } : {
        "@type": "Offer",
        "url": `https://solutionbao.vn/thiet-bi/${p.id}`,
        "priceCurrency": "VND",
        "price": String(p.price),
        "priceValidUntil": "2027-12-31",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": p.inventoryStatus === 'out_of_stock' ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "SOLUTION B A O"
        }
      }
    };

    return (
      <div className="space-y-8 animate-fade-in" id={`dedicated-product-page-${p.id}`}>
        {/* Schema.org Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
        {/* Breadcrumbs and Back button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm">
          <button
            onClick={() => setSelectedProduct(null)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-extrabold text-xs sm:text-sm cursor-pointer hover:underline transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Trở lại danh sách thiết bị</span>
          </button>
          
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-400 font-semibold">
            <span className="hover:text-blue-600 cursor-pointer" onClick={handleGoToHomeAndReset}>Trang chủ</span>
            <span>/</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => { setSelectedProduct(null); setCatalogCategory(p.category); }}>{p.categoryLabel}</span>
            <span>/</span>
            <span className="text-slate-600 font-bold truncate max-w-[180px] sm:max-w-none">{p.name}</span>
          </div>
        </div>

        {/* Product Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Product Showcase Image & Features & Thumbnail Gallery */}
          <div className="lg:col-span-5 space-y-6">
            <div 
              className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group min-h-[350px]"
              onTouchStart={handleTouchStart}
              onTouchEnd={(e) => {
                if (activeMediaType === 'image' && productImages.length > 1) {
                  handleTouchEnd(
                    e,
                    () => setActiveImageIdx((prev) => (prev < productImages.length - 1 ? prev + 1 : 0)),
                    () => setActiveImageIdx((prev) => (prev > 0 ? prev - 1 : productImages.length - 1))
                  );
                }
              }}
            >
              {/* Glowing Background Glows */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-orange-50 rounded-full blur-3xl pointer-events-none" />

              {/* Discount Tag */}
              {hasDiscount && (
                <div className={`absolute top-4 left-4 ${theme.primary} text-white font-black text-[10px] sm:text-xs uppercase px-2.5 py-1 rounded-lg shadow animate-pulse z-20`}>
                  GIẢM {discountPercent}%
                </div>
              )}

              {/* Popular Tag */}
              {p.isPopular && (
                <div className="absolute top-4 right-4 bg-blue-600 text-white font-black text-[10px] sm:text-xs uppercase px-2.5 py-1 rounded-lg shadow flex items-center gap-1 z-20">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin-slow" />
                  <span>BÁN CHẠY</span>
                </div>
              )}

              {/* If Video Mode is active in the top card */}
              {activeMediaType === 'video' && p.videoUrl ? (
                <div className="w-full aspect-[16/9] sm:h-64 rounded-2xl overflow-hidden bg-black relative z-10 shadow-md">
                  {productVideoEmbedUrl ? (
                    <iframe
                      src={productVideoEmbedUrl}
                      title={`Video giới thiệu ${p.name}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  ) : (
                    <video
                      src={p.videoUrl}
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setActiveMediaType('image')}
                    className="absolute top-2 right-2 px-2.5 py-1 bg-black/75 hover:bg-black text-white text-[10px] font-bold rounded-lg backdrop-blur-sm transition-all cursor-pointer z-30 flex items-center gap-1 shadow"
                  >
                    <Image className="w-3 h-3 text-blue-400" />
                    <span>Xem lại ảnh</span>
                  </button>
                </div>
              ) : (
                /* Image View with Zoom on click & Slide Navigation */
                <div 
                  className="w-full h-52 sm:h-64 flex items-center justify-center relative z-10 transition-transform duration-300 ease-out cursor-zoom-in group/img"
                  onClick={() => {
                    if (productImages.length > 0) {
                      openImageLightbox(productImages, activeImageIdx, p.name);
                    }
                  }}
                  title="Nhấp vào ảnh để phóng to và xem chế độ trượt ảnh"
                >
                  {productImages.length > 0 ? (
                    <>
                      <img
                        src={productImages[activeImageIdx < productImages.length ? activeImageIdx : 0] || undefined}
                        alt={`${p.name} - Ảnh ${activeImageIdx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain rounded-2xl select-none transition-transform duration-300 group-hover/img:scale-105"
                      />
                      
                      {/* Floating Zoom Action Badge */}
                      <div className="absolute bottom-2 right-2 bg-slate-900/80 hover:bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-xl backdrop-blur-sm flex items-center gap-1.5 shadow-md transition-all opacity-85 group-hover/img:opacity-100 group-hover/img:scale-105 pointer-events-none">
                        <ZoomIn className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                        <span>Phóng to & Lướt ảnh</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-3">
                      {p.category === 'attendance' && <Fingerprint className="w-24 h-24 sm:w-28 sm:h-28 text-blue-600 stroke-[1.2] drop-shadow" />}
                      {p.category === 'printer' && <Printer className="w-24 h-24 sm:w-28 sm:h-28 text-indigo-600 stroke-[1.2] drop-shadow" />}
                      {p.category === 'scanner' && <Scan className="w-24 h-24 sm:w-28 sm:h-28 text-cyan-600 stroke-[1.2] drop-shadow" />}
                      {p.category === 'label' && <Barcode className="w-24 h-24 sm:w-28 sm:h-28 text-teal-600 stroke-[1.2] drop-shadow" />}
                      {p.category === 'consumable' && <FileText className="w-24 h-24 sm:w-28 sm:h-28 text-amber-600 stroke-[1.2] drop-shadow" />}
                      {p.category === 'drawer' && <Calculator className="w-24 h-24 sm:w-28 sm:h-28 text-rose-600 stroke-[1.2] drop-shadow" />}
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Hình dáng mô phỏng</span>
                    </div>
                  )}

                  {/* Left Slide Button on hover/touch */}
                  {productImages.length > 1 && activeMediaType === 'image' && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIdx((prev) => (prev > 0 ? prev - 1 : productImages.length - 1));
                      }}
                      className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white backdrop-blur-sm flex items-center justify-center transition-all cursor-pointer shadow-md z-20 group-hover:scale-105 active:scale-95 border border-white/20"
                      title="Xem ảnh trước (◄)"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  )}

                  {/* Right Slide Button on hover/touch */}
                  {productImages.length > 1 && activeMediaType === 'image' && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIdx((prev) => (prev < productImages.length - 1 ? prev + 1 : 0));
                      }}
                      className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white backdrop-blur-sm flex items-center justify-center transition-all cursor-pointer shadow-md z-20 group-hover:scale-105 active:scale-95 border border-white/20"
                      title="Xem ảnh kế tiếp (►)"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Interactive Thumbnail Row (Images & Video Tab) */}
            {(productImages.length > 1 || p.videoUrl) && (
              <div className="space-y-2">
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {productImages.map((imgUrl, idx) => {
                    const isActive = activeMediaType === 'image' && activeImageIdx === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setActiveMediaType('image');
                          setActiveImageIdx(idx);
                        }}
                        className={`relative flex items-center justify-center p-1 rounded-xl border aspect-square transition-all cursor-pointer bg-white group ${
                          isActive
                            ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600/30 shadow-sm'
                            : 'border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                        title={`Xem ảnh #${idx + 1}`}
                      >
                        <img
                          src={imgUrl || undefined}
                          alt={`${p.name} - ${idx + 1}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain rounded-lg"
                        />
                        <span className="absolute bottom-1 right-1 bg-slate-900/70 text-white font-black text-[8px] px-1 rounded">
                          #{idx + 1}
                        </span>
                      </button>
                    );
                  })}

                  {/* Video Thumbnail Button if product has videoUrl */}
                  {p.videoUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveMediaType('video');
                      }}
                      className={`relative flex flex-col items-center justify-center p-1 rounded-xl border aspect-square transition-all cursor-pointer ${
                        activeMediaType === 'video'
                          ? 'border-red-600 bg-red-50 ring-2 ring-red-600/30 text-red-600 shadow-sm'
                          : 'border-red-200 bg-white hover:bg-red-50/60 text-red-600'
                      }`}
                      title="Xem video thực tế sản phẩm"
                    >
                      <div className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center shadow-sm">
                        <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                      </div>
                      <span className="text-[8px] font-black uppercase tracking-tight mt-1 text-red-700">Video</span>
                      <span className="absolute top-1 right-1 bg-red-600 text-white font-black text-[7px] px-1 rounded">
                        HD
                      </span>
                    </button>
                  )}
                </div>

                {/* Direct quick button to full video section */}
                {p.videoUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('product-youtube-video-section');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="w-full py-2 px-3 bg-red-50 hover:bg-red-100 border border-red-200/80 text-red-700 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-[0.99]"
                  >
                    <Play className="w-3.5 h-3.5 fill-red-600 text-red-600 animate-pulse" />
                    <span>Xem Video Review & Thực Tế ({productVideoEmbedUrl ? 'YouTube' : 'Video'})</span>
                  </button>
                )}
              </div>
            )}

            {/* Direct Guarantees Panel */}
            {((p.customPolicies !== undefined && p.customPolicies.trim() !== "") || p.customPolicies === undefined) && (
              <div className="bg-slate-900 border border-slate-800 text-slate-100 p-6 rounded-3xl space-y-4 shadow-lg">
                <h4 className="text-xs font-black uppercase tracking-wider text-orange-400 border-b border-slate-800 pb-2 text-left">
                  🔒 CHÍNH SÁCH CHẤT LƯỢNG & ĐỒNG HÀNH
                </h4>
                <ul className="space-y-3 text-xs font-medium leading-relaxed text-left">
                  {p.customPolicies !== undefined ? (
                    p.customPolicies.split('\n').filter(line => line.trim() !== '').map((line, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{line}</span>
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="flex items-start gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>Cam kết chính hãng 100%:</strong> Đền gấp 10 lần nếu phát hiện hàng nhái, hàng dựng không đạt chuẩn.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span><strong>Bảo hành chính hãng 12 tháng:</strong> Lỗi kỹ thuật đổi mới trong 30 ngày đầu, bảo dưỡng phần mềm trọn đời.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Laptop className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span><strong>Cài đặt UltraViewer miễn phí:</strong> Hỗ trợ thiết lập phần mềm chấm công, nạp nhân viên, xuất báo cáo giờ làm qua mạng LAN từ xa.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Truck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <span><strong>Giao hàng COD toàn quốc:</strong> Kiểm tra thiết bị cắm điện chạy thử ok mới thanh toán nhận hàng.</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Right Side: Product Details & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
              
              {/* Category & Brand labels */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                  {p.categoryLabel}
                </span>
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider font-mono border border-slate-200 px-2 py-0.5 rounded-md">
                  Thương hiệu: {p.brand}
                </span>
              </div>

              {/* Product Main Title */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-800 tracking-tight leading-tight uppercase text-left">
                {p.name}
              </h1>

              {/* Product Short Description */}
              {p.description && (
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed border-l-2 border-slate-200 pl-3.5 text-left">
                  {p.description}
                </p>
              )}

              {/* Pricing section with Options Selector */}
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/60 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 text-left">
                    <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider flex items-center gap-1">
                      {p.priceOptions && p.priceOptions.length > 0 ? (
                        <>
                          <span>Giá áp dụng cho lựa chọn:</span>
                          <strong className="text-blue-600 font-black">{activeOpt.title}</strong>
                        </>
                      ) : (
                        <span>Giá bán chính thức:</span>
                      )}
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className={`text-2xl sm:text-3xl font-black ${theme.primaryText} font-mono`}>
                        {formatVND(activeOpt.price)}
                      </span>
                      {activeOpt.originalPrice > activeOpt.price && (
                        <span className="text-sm sm:text-base text-slate-400 line-through font-mono">
                          {formatVND(activeOpt.originalPrice)}
                        </span>
                      )}
                    </div>
                    {activeOpt.originalPrice > activeOpt.price && (
                      <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                        <span>✓ Tiết kiệm ngay:</span>
                        <strong className="font-mono font-black">{formatVND(activeOpt.originalPrice - activeOpt.price)}</strong>
                      </div>
                    )}
                  </div>
                  
                  <div className="px-4 py-2 bg-red-100/40 text-red-700 border border-red-200/50 rounded-xl text-center text-xs font-black uppercase tracking-wider shrink-0 animate-pulse">
                    🔥 Đang có sẵn hàng tại kho
                  </div>
                </div>

                {/* Multiple Pricing Tiers Selector Panel */}
                {p.priceOptions && p.priceOptions.length > 0 && (
                  <div className="space-y-2 text-left">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">
                      🛠️ CHỌN HÌNH THỨC MUA HÀNG & DỊCH VỤ ĐI KÈM:
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {priceOptions.map((opt) => {
                        const isSelected = priceOption === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setPriceOption(opt.id)}
                            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-full space-y-2 relative overflow-hidden ${
                              isSelected
                                ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-600/20'
                                : 'border-slate-200 bg-white hover:bg-slate-50/75'
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                {opt.icon}
                              </div>
                              {isSelected && (
                                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600" />
                              )}
                            </div>
                            
                            <div>
                              <div className="text-xs font-black text-slate-800 tracking-tight">{opt.title}</div>
                              <div className="text-[9px] text-slate-400 font-bold uppercase">{opt.subtitle}</div>
                            </div>

                            <div className="pt-1.5 border-t border-slate-100 w-full flex items-baseline justify-between gap-1">
                              <span className={`text-xs font-bold ${theme.primaryText} font-mono`}>
                                {formatVND(opt.price)}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Active selection helper guide description */}
                    <div className="bg-slate-50/80 border border-slate-100 p-3 rounded-xl text-slate-600 text-[11px] leading-relaxed flex items-start gap-1.5 mt-2">
                      <span className="text-blue-500">ℹ</span>
                      <p>
                        <strong>{activeOpt.title}:</strong> {activeOpt.desc}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Bảng Quà tặng Ưu đãi đi kèm */}
              {((p.customPromotions !== undefined && p.customPromotions.trim() !== "") || p.customPromotions === undefined) && (
                <div className="border border-orange-200 bg-orange-50/40 rounded-2xl p-4 space-y-3 shadow-inner text-left">
                  <div className="flex items-center gap-1.5 text-xs font-black text-orange-800 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-orange-500 animate-bounce" />
                    <span>🎁 KHUYẾN MÃI & QUÀ TẶNG KÈM THEO</span>
                  </div>
                  <div className="space-y-2 text-xs font-semibold text-slate-700 leading-relaxed">
                    {p.customPromotions !== undefined ? (
                      p.customPromotions.split('\n').filter(line => line.trim() !== '').map((line, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-600 font-extrabold">★</span>
                          <span>{line}</span>
                        </div>
                      ))
                    ) : (
                      <>
                        {p.category === 'printer' && (
                          <>
                            <div className="flex items-start gap-2">
                              <span className="text-emerald-600 font-extrabold">★</span>
                              <span>Tặng ngay <strong>01 cuộn giấy in hóa đơn nhiệt K80/K57</strong> Oji cao cấp để chạy thử nghiệm tại cửa hàng.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-emerald-600 font-extrabold">★</span>
                              <span>Miễn phí phần mềm thiết lập hóa đơn tính tiền cơ bản & hỗ trợ cài đặt Driver trọn đời.</span>
                            </div>
                          </>
                        )}
                        {p.category === 'label' && (
                          <>
                            <div className="flex items-start gap-2">
                              <span className="text-emerald-600 font-extrabold">★</span>
                              <span>Tặng ngay <strong>01 cuộn tem nhãn decal cảm nhiệt</strong> chất lượng cao chống nhòe để test bản in.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-emerald-600 font-extrabold">★</span>
                              <span>Cung cấp tài khoản download & hướng dẫn sử dụng phần mềm thiết kế mã vạch Bartender UltraLite.</span>
                            </div>
                          </>
                        )}
                        {p.category === 'attendance' && (
                          <>
                            <div className="flex items-start gap-2">
                              <span className="text-emerald-600 font-extrabold">★</span>
                              <span>Tặng kèm bản quyền <strong>Phần mềm chấm công chuyên nghiệp (FTA / Ronald Jack Pro)</strong> tiếng Việt mới nhất.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-emerald-600 font-extrabold">★</span>
                              <span>Hỗ trợ đăng ký từ xa qua UltraViewer, hướng dẫn xuất Excel báo cáo công, đi trễ về sớm.</span>
                            </div>
                          </>
                        )}
                        {p.category === 'scanner' && (
                          <>
                            <div className="flex items-start gap-2">
                              <span className="text-emerald-600 font-extrabold">★</span>
                              <span>Tặng kèm <strong>chân đế đặt bàn</strong> thông minh giúp rảnh tay quét tự động (với dòng máy hỗ trợ).</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-emerald-600 font-extrabold">★</span>
                              <span>Bảo hành đổi mới cáp tín hiệu USB siêu tốc trong 6 tháng đầu nếu xảy ra lỗi.</span>
                            </div>
                          </>
                        )}
                        {p.category === 'drawer' && (
                          <>
                            <div className="flex items-start gap-2">
                              <span className="text-emerald-600 font-extrabold">★</span>
                              <span>Tặng ngay <strong>01 bút thử tiền thật/giả siêu tốc</strong> chuyên dùng cho quầy thu ngân.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-emerald-600 font-extrabold">★</span>
                              <span>Hỗ trợ đấu nối dây mở khóa két tự động khi in hóa đơn với máy in hóa đơn K80 chính hãng.</span>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}

              <div className="border-t border-slate-100 pt-6 space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  {/* Quantity Counter */}
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden self-start sm:self-auto shrink-0 bg-slate-50">
                    <button
                      onClick={() => setDetailQty(Math.max(1, detailQty - 1))}
                      className="px-4 py-3 bg-white hover:bg-slate-100 text-slate-500 font-extrabold text-sm transition-colors cursor-pointer border-r border-slate-200"
                    >
                      -
                    </button>
                    <span className="px-5 text-xs font-black text-slate-800 font-mono w-14 text-center">
                      {detailQty}
                    </span>
                    <button
                      onClick={() => setDetailQty(detailQty + 1)}
                      className="px-4 py-3 bg-white hover:bg-slate-100 text-slate-500 font-extrabold text-sm transition-colors cursor-pointer border-l border-slate-200"
                    >
                      +
                    </button>
                  </div>

                  {/* HIGH PROMINENCE ACTION BUTTON (Mua ngay / Thêm báo giá) */}
                  <button
                    onClick={() => {
                      const selectedOptionObj = priceOptions.find(opt => opt.id === priceOption);
                      const finalPrice = selectedOptionObj ? selectedOptionObj.price : p.price;
                      const optionLabel = selectedOptionObj ? selectedOptionObj.title : undefined;
                      handleAddToQuote(p, detailQty, finalPrice, optionLabel);
                      showToast(`Đã thêm ${detailQty} chiếc ${p.name} (${optionLabel || 'Mua tại cửa hàng'}) vào danh sách báo giá!`);
                    }}
                    className={`flex-1 px-6 py-4 bg-gradient-to-r ${theme.gradientFrom || 'from-[#CD1818]'} via-orange-500 ${theme.gradientTo || 'to-[#900E12]'} text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5`}
                  >
                    <Plus className="w-4 h-4 sm:w-5 h-5 text-white animate-pulse" />
                    <span>Thêm vào danh sách báo giá</span>
                  </button>
                </div>

                {/* Sub-action panel with Outline style hierarchy */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {/* OUTLINE BUTTON: Yêu cầu tư vấn */}
                  <button
                    onClick={() => {
                      setProductConsultSuccess(null);
                      setShowProductConsultForm(!showProductConsultForm);
                      if (activeAlertProductId === p.id) {
                        setActiveAlertProductId(null);
                      }
                    }}
                    className={`px-4 py-3 border-2 font-extrabold text-xs uppercase tracking-wider text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 rounded-xl shadow-sm ${
                      showProductConsultForm 
                        ? 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700'
                        : 'bg-white border-blue-600 text-blue-600 hover:bg-blue-50/70'
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Yêu cầu tư vấn ngay</span>
                  </button>

                  {/* LIGHT OPTIONAL BADGE: Nhận báo giảm giá */}
                  <button
                    onClick={() => {
                      if (activeAlertProductId === p.id) {
                        setActiveAlertProductId(null);
                      } else {
                        setActiveAlertProductId(p.id);
                        setAlertEmail('');
                        setAlertSuccessProductId(null);
                        setShowProductConsultForm(false);
                      }
                    }}
                    className={`px-4 py-3 border rounded-xl font-extrabold text-xs uppercase tracking-wider text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      priceAlerts.some((alert) => alert.productId === p.id)
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Bell className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      {priceAlerts.some((alert) => alert.productId === p.id)
                        ? 'Đã đăng ký nhận tin'
                        : 'Nhận báo giảm giá'}
                    </span>
                  </button>
                </div>

                {/* Product consultation expandable panel */}
                {showProductConsultForm && (
                  <div className="p-4 bg-blue-50/50 border border-blue-200/60 rounded-2xl space-y-3 animate-slide-down text-left">
                    {productConsultSuccess ? (
                      <div className="space-y-2 text-center py-3">
                        <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                          <CheckCircle className="w-5 h-5 animate-bounce" />
                        </div>
                        <h5 className="text-xs font-black text-slate-800">Đã Gửi Yêu Cầu Tư Vấn!</h5>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          Yêu cầu tư vấn cho dòng máy <strong>{p.name}</strong> đã được ghi nhận thành công với mã tra cứu: <strong className="text-blue-600 font-mono">{productConsultSuccess}</strong>.
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Chuyên viên kỹ thuật SOLUTION B A O sẽ liên hệ hỏa tốc tới số điện thoại <strong className="text-slate-600">{productConsultPhone}</strong> trong vòng 10-15 phút.
                        </p>
                        <div className="flex gap-2 justify-center pt-1.5">
                          <button
                            onClick={() => {
                              setProductConsultName('');
                              setProductConsultPhone('');
                              setProductConsultNote('');
                              setProductConsultSuccess(null);
                              setShowProductConsultForm(false);
                            }}
                            className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-black uppercase rounded-lg transition-all cursor-pointer"
                          >
                            Đóng
                          </button>
                          <button
                            onClick={() => {
                              const autoPrompt = `Chào SOLUTION B A O, tôi là ${productConsultName} (SĐT: ${productConsultPhone}). Tôi vừa đăng ký yêu cầu gọi lại tư vấn giải pháp cho máy "${p.name}". Tôi muốn hỏi thêm về: ${productConsultNote || 'Lắp đặt, hướng dẫn cài đặt phần mềm và hỗ trợ kỹ thuật qua UltraViewer'}`;
                              setActiveTab('advisor');
                              handleSendAiMessage(autoPrompt);
                              setSelectedProduct(null); // Close detail modal
                            }}
                            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase rounded-lg transition-all shadow cursor-pointer flex items-center gap-1"
                          >
                            <Sparkles className="w-3 h-3 text-orange-300" />
                            <span>Hỏi thêm AI</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={(e) => handleProductConsultationSubmit(e, p)} className="space-y-3">
                        <div className="text-[11px] font-black text-blue-700 flex items-center gap-1">
                          <Sliders className="w-4 h-4 text-blue-600" />
                          <span>ĐĂNG KÝ TƯ VẤN SẢN PHẨM MIỄN PHÍ</span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed">
                          Vui lòng để lại tên và số điện thoại, chuyên viên của chúng tôi sẽ liên hệ gọi lại tư vấn trực tiếp và gửi kèm báo giá chiết khấu cho riêng sản phẩm <strong>{p.name}</strong> này.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase text-slate-500 block">Họ và Tên <span className="text-red-500">*</span></label>
                            <input
                              type="text"
                              placeholder="Nhập họ tên của bạn..."
                              value={productConsultName}
                              onChange={(e) => { setProductConsultName(e.target.value); setProductConsultError(null); }}
                              className="w-full bg-white border border-slate-250 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 placeholder-slate-400 font-medium text-slate-800"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase text-slate-500 block">Số điện thoại <span className="text-red-500">*</span></label>
                            <input
                              type="tel"
                              placeholder="Nhập số điện thoại..."
                              value={productConsultPhone}
                              onChange={(e) => { setProductConsultPhone(e.target.value); setProductConsultError(null); }}
                              className="w-full bg-white border border-slate-250 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 placeholder-slate-400 font-medium text-slate-800"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-black uppercase text-slate-500 block">Ghi chú yêu cầu (Tùy chọn)</label>
                          <input
                            type="text"
                            placeholder="Ví dụ: Cần báo giá lắp đặt 2 máy tại văn phòng Quận 10..."
                            value={productConsultNote}
                            onChange={(e) => { setProductConsultNote(e.target.value); setProductConsultError(null); }}
                            className="w-full bg-white border border-slate-250 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 placeholder-slate-400 font-medium text-slate-800"
                          />
                        </div>

                        {productConsultError && (
                          <div className="p-2.5 bg-red-50 border border-red-150 rounded-xl flex items-start gap-1.5 text-[10px] text-red-700 animate-fade-in font-medium">
                            <span className="flex-shrink-0">⚠️</span>
                            <div className="whitespace-pre-line">{productConsultError}</div>
                          </div>
                        )}

                        <div className="flex gap-2 justify-end pt-1">
                          <button
                            type="button"
                            onClick={() => setShowProductConsultForm(false)}
                            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-extrabold text-[10px] uppercase rounded-xl transition-all cursor-pointer"
                          >
                            Hủy bỏ
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase rounded-xl transition-all shadow cursor-pointer"
                          >
                            Gửi yêu cầu gọi lại
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}

                {/* Subscription expandable panel */}
                {activeAlertProductId === p.id && (
                  <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-3 animate-slide-down text-left">
                    {priceAlerts.some((alert) => alert.productId === p.id) ? (
                      <div className="space-y-2">
                        <div className="text-[11px] font-black text-emerald-600 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          <span>Hệ thống đã ghi nhận email đăng ký của bạn!</span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed">
                          Chúng tôi sẽ gửi mail hỏa tốc ngay khi dòng thiết bị <strong>{p.name}</strong> giảm sâu hoặc được tặng kèm gói hỗ trợ phần mềm/phụ kiện mới.
                        </p>
                        <button
                          onClick={() => {
                            const emailToCancel = priceAlerts.find(a => a.productId === p.id)?.email || '';
                            handleRemovePriceAlert(p.id, emailToCancel);
                          }}
                          className="text-[9px] font-extrabold text-red-600 hover:underline cursor-pointer"
                        >
                          Hủy đăng ký nhận tin giảm giá
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        <div className="text-[11px] font-black text-slate-700">
                          Nhận báo giá chiết khấu đặc biệt & Khuyến mãi sốc cho {p.brand}:
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="email"
                            placeholder="Nhập email của bạn..."
                            value={alertEmail}
                            onChange={(e) => setAlertEmail(e.target.value)}
                            className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-orange-500 placeholder-slate-400"
                          />
                          <button
                            onClick={() => {
                              if (!alertEmail.trim()) {
                                showToast('Vui lòng nhập địa chỉ email hợp lệ!');
                                  return;
                              }
                              handleAddPriceAlert(p.id, p.name, alertEmail);
                            }}
                            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-black text-[10px] uppercase rounded-xl transition-all shadow cursor-pointer"
                          >
                            Đăng ký
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* YOUTUBE / VIDEO THỰC TẾ SẢN PHẨM */}
        {p.videoUrl && (
          <div id="product-youtube-video-section" className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-5 text-left relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-50/50 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-50/50 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 shadow-inner border border-red-200">
                  <Video className="w-6 h-6 text-red-600 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-red-600 text-white font-black text-[9px] uppercase tracking-wider rounded-md shadow-sm">
                      {productVideoEmbedUrl ? 'YOUTUBE REVIEW' : 'VIDEO THỰC TẾ'}
                    </span>
                    <span className="text-[11px] font-extrabold text-slate-400">Trải nghiệm vận hành 100% thực tế</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-slate-800 uppercase tracking-tight mt-0.5">
                    Video Trực Quan & Giới Thiệu Thiết Bị: {p.name}
                  </h3>
                </div>
              </div>

              {productVideoEmbedUrl && (
                <a
                  href={p.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-black rounded-xl transition-all self-start sm:self-auto cursor-pointer shadow-sm active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-red-600" />
                  <span>Mở trên YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5 text-red-500" />
                </a>
              )}
            </div>

            {/* Video Player Display Container */}
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 shadow-lg bg-black relative aspect-[16/9] max-w-4xl mx-auto ring-1 ring-slate-900/10 z-10">
              {productVideoEmbedUrl ? (
                <iframe
                  src={productVideoEmbedUrl}
                  title={`Video thực tế ${p.name}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <video
                  src={p.videoUrl}
                  controls
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 font-medium relative z-10">
              <div className="flex items-center gap-2">
                <span className="text-base">💡</span>
                <span>Video review thực tế, test tốc độ in, nhận diện vân tay & hướng dẫn đấu nối từ kỹ thuật viên <strong>SOLUTION B A O</strong>.</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setProductConsultNote(`Tư vấn thêm về tính năng và cài đặt trong video của máy "${p.name}"`);
                  setShowProductConsultForm(true);
                  window.scrollTo({ top: 350, behavior: 'smooth' });
                }}
                className="shrink-0 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs transition-all cursor-pointer shadow-sm active:scale-95 flex items-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Cần tư vấn thiết bị này</span>
              </button>
            </div>
          </div>
        )}

        {/* 1. DETAILED PRODUCT DESCRIPTION ARTICLE SECTION */}
        {(() => {
          const content = p.articleContent || '';
          
          return (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 text-left relative overflow-hidden">
              <div className="border-b border-slate-200 pb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h2 className="text-base font-black uppercase tracking-tight text-slate-800">
                  Bài viết giới thiệu & Mô tả chi tiết sản phẩm
                </h2>
              </div>
              
              <div className="relative">
                <div className={`transition-all duration-500 overflow-hidden ${!isArticleExpanded ? 'max-h-[320px] relative' : 'max-h-none'}`}>
                  {content ? (
                    <div className="bg-gradient-to-b from-slate-50/50 to-transparent p-5 sm:p-6 rounded-2xl border border-slate-200/50 text-xs text-slate-700 leading-relaxed font-sans space-y-4 max-w-none">
                      {/<[a-z][\s\S]*>/i.test(content) || content.includes('<p>') || content.includes('<div>') ? (
                        <div 
                          className="rich-text-content space-y-4 font-sans text-xs sm:text-sm text-slate-700 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
                        />
                      ) : (
                        content.split('\n\n').map((paragraph, pIdx) => {
                          const trimmed = paragraph.trim();
                          if (!trimmed) return null;
                          if (trimmed.startsWith('###')) {
                            return (
                              <h5 key={pIdx} className="text-sm font-black text-slate-800 uppercase tracking-wide mt-4 mb-2 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                                {trimmed.replace('###', '').trim()}
                              </h5>
                            );
                          }
                          if (trimmed.startsWith('##')) {
                            return (
                              <h4 key={pIdx} className="text-base font-black text-blue-700 uppercase tracking-wide mt-5 mb-3">
                                {trimmed.replace('##', '').trim()}
                              </h4>
                            );
                          }
                          if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
                            return (
                              <ul key={pIdx} className="list-disc pl-5 space-y-1.5 my-2">
                                {trimmed.split('\n').map((item, iIdx) => (
                                  <li key={iIdx} className="text-[11px] sm:text-xs text-slate-600 font-medium font-sans">
                                    {item.replace(/^[-*]\s*/, '').trim()}
                                  </li>
                                ))}
                              </ul>
                            );
                          }
                          return (
                            <p key={pIdx} className="text-slate-600 text-xs sm:text-sm font-medium font-sans">
                              {trimmed}
                            </p>
                          );
                        })
                      )}
                    </div>
                  ) : (
                    <div className="bg-slate-50 border border-slate-150 rounded-2xl p-6 text-slate-600 space-y-4 font-sans">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                          <Sparkles className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wide">
                            Thông tin tổng quan về {p.name}
                          </h4>
                          <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                            Thiết bị {p.name} thuộc thương hiệu danh tiếng <strong>{p.brand}</strong>, được nhập khẩu chính hãng và phân phối trực tiếp tại hệ thống SOLUTION B A O Technology với đầy đủ giấy tờ CO/CQ và chế độ bảo hành 12 tháng chu đáo nhất.
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="space-y-2">
                          <h5 className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Ưu thế vượt trội</h5>
                          <ul className="space-y-1.5 text-xs">
                            {p.highlights.map((hl, hIdx) => (
                              <li key={hIdx} className="flex items-start gap-1.5 text-slate-600 font-medium">
                                <span className="text-emerald-500 shrink-0">✓</span>
                                <span>{hl}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="space-y-2">
                          <h5 className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Cam kết từ SOLUTION B A O</h5>
                          <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
                            <li className="flex items-start gap-1.5">
                              <span className="text-blue-500 shrink-0">•</span>
                              <span>Bảo hành chính hãng 12 tháng tận tình.</span>
                            </li>
                            <li className="flex items-start gap-1.5">
                              <span className="text-blue-500 shrink-0">•</span>
                              <span>Hỗ trợ cài đặt phần mềm và driver miễn phí qua UltraViewer.</span>
                            </li>
                            <li className="flex items-start gap-1.5">
                              <span className="text-blue-500 shrink-0">•</span>
                              <span>Đội ngũ kỹ thuật hỗ trợ chuyên nghiệp trọn đời sản phẩm.</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {!isArticleExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
                  )}
                </div>

                <div className="pt-4 flex justify-center border-t border-slate-100 mt-4">
                  <button
                    onClick={() => {
                      setIsArticleExpanded(!isArticleExpanded);
                      if (isArticleExpanded) {
                        const el = document.getElementById(`dedicated-product-page-${p.id}`);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }}
                    className="px-6 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm border border-blue-200/50"
                  >
                    {isArticleExpanded ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        <span>Thu gọn giới thiệu</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        <span>Xem thêm giới thiệu chi tiết</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* 2. DETAILED SPECIFICATIONS & RELATED GUIDE SECTION */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-3 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-blue-600 animate-pulse" />
            <h2 className="text-base font-black uppercase tracking-tight text-slate-800">
              Thông số kỹ thuật & Chi tiết thiết bị
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* Specs Table */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5 text-left">
                <ChevronRight className="w-4 h-4 text-slate-400" />
                <span>Bảng thông số cấu hình chính xác</span>
              </h3>
              <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-inner">
                <table className="w-full text-xs font-medium text-slate-700">
                  <tbody>
                    {Object.entries(enrichedSpecs).map(([key, val], idx) => (
                      <tr 
                        key={idx} 
                        className={idx % 2 === 0 ? 'bg-slate-50/55' : 'bg-white'}
                      >
                        <td className="px-4 py-3 font-bold text-slate-500 border-r border-slate-100 w-1/3 text-left">
                          {key}
                        </td>
                        <td className="px-4 py-3 text-slate-800 text-left">
                          {val}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RELATED ARTICLE EMBEDDED DIRECTLY! */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5 text-left">
                <Newspaper className="w-4 h-4 text-slate-400" />
                <span>Cẩm nang kỹ thuật & Hướng dẫn sử dụng liên quan</span>
              </h3>
              
              {relatedArticle ? (
                <div className="border border-slate-100 bg-gradient-to-br from-slate-50 via-white to-slate-50/40 rounded-2xl p-5 shadow-inner space-y-4 relative overflow-hidden text-left">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/30 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-blue-50 border border-blue-100 rounded text-blue-600 font-extrabold text-[9px] uppercase tracking-wider">
                      {relatedArticle.categoryLabel}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold font-mono">
                      Cập nhật: {relatedArticle.date}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 hover:text-blue-600 transition-colors leading-snug">
                    {relatedArticle.title}
                  </h4>

                  <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                    {relatedArticle.summary}
                  </p>

                  <button
                    onClick={() => {
                      setSelectedArticle(relatedArticle);
                      setActiveTab('news');
                      showToast(`Đang chuyển sang đọc bài viết: "${relatedArticle.title}"`);
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }}
                    className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200/50 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>Xem toàn bộ hướng dẫn</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="border border-dashed border-slate-200 rounded-2xl p-6 text-center text-slate-400 space-y-3 flex flex-col items-center justify-center min-h-[160px]">
                  <Wrench className="w-8 h-8 text-slate-300 stroke-[1.3] animate-pulse" />
                  <div className="text-xs font-bold">SOLUTION B A O hỗ trợ kỹ thuật trọn đời</div>
                  <p className="text-[10px] text-slate-400 leading-relaxed max-w-xs">
                    Để được tư vấn cách lắp đặt mạng LAN, đấu nối dây tín hiệu, cấu hình chấm công hay cài đặt máy in hóa đơn cho dòng máy này, quý khách vui lòng liên hệ hotline kỹ thuật <strong>0908.555.547</strong> hoặc gửi yêu cầu hỗ trợ ở mục Tư vấn.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* 3. KHÁCH HÀNG ĐÁNH GIÁ SẢN PHẨM */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 text-left">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500 animate-pulse" />
              <h2 className="text-base font-black uppercase tracking-tight text-slate-800">
                Khách hàng đánh giá & Nhận xét ({getProductReviewsCount(p.id)})
              </h2>
            </div>
            <div className="flex items-center gap-1.5 bg-amber-50/60 border border-amber-200 px-3 py-1 rounded-xl text-xs font-bold text-amber-700">
              <span className="text-sm font-black">{getAverageRating(p.id)}</span>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3.5 h-3.5 ${i < Math.round(parseFloat(getAverageRating(p.id))) ? 'fill-amber-500 text-amber-500' : 'text-slate-200'}`} 
                  />
                ))}
              </div>
              <span className="text-[10px] text-slate-400 font-medium">| {getProductReviewsCount(p.id)} đánh giá thực tế</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Col: Reviews List */}
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
                {getProductReviews(p.id).length === 0 ? (
                  <div className="py-12 text-center text-slate-400 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                    <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-2 stroke-[1.2]" />
                    <div className="text-xs font-bold">Chưa có đánh giá nào của khách hàng</div>
                    <p className="text-[10px] text-slate-400 mt-1 max-w-xs mx-auto">Hãy là người đầu tiên chia sẻ trải nghiệm thực tế khi sử dụng thiết bị này!</p>
                  </div>
                ) : (
                  getProductReviews(p.id).map((rev) => (
                    <div key={rev.id} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-black text-[10px] uppercase">
                            {rev.author.substring(0, 1)}
                          </div>
                          <div className="text-left">
                            <strong className="text-slate-800 font-extrabold">{rev.author}</strong>
                            <div className="flex text-amber-500 gap-0.5 mt-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-3 h-3 ${i < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-slate-200'}`} 
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-100">{rev.date}</span>
                      </div>
                      <p className="text-slate-600 text-xs leading-relaxed font-sans font-medium text-left">
                        "{rev.comment}"
                      </p>

                      {/* Display attached images if any */}
                      {rev.images && rev.images.length > 0 && (
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {rev.images.map((imgUrl, imgIdx) => (
                            <img
                              key={imgIdx}
                              src={imgUrl || undefined}
                              alt={`Hình ảnh đánh giá ${imgIdx + 1}`}
                              referrerPolicy="no-referrer"
                              className="w-16 h-16 rounded-xl object-cover border border-slate-200 shadow-sm cursor-zoom-in hover:scale-105 transition-all"
                              onClick={() => {
                                const safeImg = sanitizeUrl(imgUrl, '');
                                if (!safeImg) return;
                                const win = window.open();
                                if (win && win.document) {
                                  win.document.title = 'Xem hình ảnh đánh giá';
                                  const img = win.document.createElement('img');
                                  img.src = safeImg;
                                  img.style.maxWidth = '100%';
                                  img.style.maxHeight = '100vh';
                                  img.style.display = 'block';
                                  img.style.margin = 'auto';
                                  img.referrerPolicy = 'no-referrer';
                                  win.document.body.style.margin = '0';
                                  win.document.body.style.backgroundColor = '#0f172a';
                                  win.document.body.style.display = 'flex';
                                  win.document.body.style.minHeight = '100vh';
                                  win.document.body.appendChild(img);
                                }
                              }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Display admin's response if any */}
                      {rev.reply && (
                        <div className="bg-blue-50/50 border-l-4 border-blue-500 p-3 rounded-r-xl mt-3 space-y-1 text-left">
                          <div className="flex items-center justify-between text-[10px] font-bold text-blue-700">
                            <div className="flex items-center gap-1.5">
                              <span className="bg-blue-100 px-1.5 py-0.5 rounded text-[9px] uppercase font-black">Phản hồi từ Quản trị viên</span>
                              <span>{webConfig.supportName || "Mr. Bảo Bảo"}</span>
                            </div>
                            <span className="text-slate-400 font-mono font-bold">{rev.replyDate || rev.date}</span>
                          </div>
                          <p className="text-slate-700 text-xs font-medium leading-relaxed font-sans">
                            {rev.reply}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Col: Write Review Form */}
            <div className="lg:col-span-5 bg-slate-50/60 border border-slate-200 p-5 rounded-2xl space-y-4 text-left">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>GỬI ĐÁNH GIÁ CỦA BẠN</span>
              </h3>
              
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Chọn số sao đánh giá:</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="text-2xl transition-transform hover:scale-110 cursor-pointer"
                      title={`${star} sao`}
                    >
                      <Star 
                        className={`w-6 h-6 transition-colors ${
                          star <= reviewRating ? 'fill-amber-500 text-amber-500' : 'text-slate-300'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="rev-author" className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Họ và tên của bạn:</label>
                <input
                  id="rev-author"
                  type="text"
                  placeholder="Ví dụ: Anh Hoàng, Chị Mai..."
                  value={reviewAuthor}
                  onChange={(e) => setReviewAuthor(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600 font-sans"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="rev-comment" className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Nội dung nhận xét:</label>
                <textarea
                  id="rev-comment"
                  rows={3}
                  placeholder="Nhận xét của bạn về chất lượng máy, độ nhạy, dịch vụ cấu hình kỹ thuật..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600 font-sans resize-none"
                />
              </div>

              {/* Customer Review Image Upload */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Đính kèm hình ảnh thực tế:</label>
                <div className="flex flex-wrap gap-2 items-center">
                  <label className="h-14 px-3 border border-dashed border-slate-300 rounded-xl bg-white hover:bg-slate-100 transition-all cursor-pointer flex flex-col items-center justify-center text-[10px] text-slate-500 font-bold shrink-0">
                    <Camera className="w-4 h-4 text-slate-400 mb-0.5" />
                    <span>Tải ảnh thực tế</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files) {
                          Array.from(files).forEach((file) => {
                            const f = file as File;
                            if (f.size > 800 * 1024) {
                              showToast('Ảnh vượt quá 800KB! Vui lòng chọn ảnh dung lượng thấp hơn để hệ thống hoạt động ổn định.');
                              return;
                            }
                            const r = new FileReader();
                            r.onload = () => {
                              if (typeof r.result === 'string') {
                                setReviewImages((prev) => [...prev, r.result as string]);
                              }
                            };
                            r.readAsDataURL(f);
                          });
                        }
                      }}
                    />
                  </label>
                  
                  {reviewImages.map((img, idx) => (
                    <div key={idx} className="relative w-14 h-14 rounded-xl overflow-hidden border border-slate-200 group">
                      <img src={img || undefined} alt="review attachment" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          setReviewImages((prev) => prev.filter((_, i) => i !== idx));
                        }}
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity cursor-pointer"
                        title="Xóa hình ảnh này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-[9px] text-slate-400 font-medium">Hỗ trợ tải lên nhiều hình ảnh thực tế (tối đa 800KB/ảnh).</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!reviewAuthor.trim() || !reviewComment.trim()) {
                    showToast('Vui lòng điền đầy đủ họ tên và nội dung đánh giá!');
                    return;
                  }
                  const newReview: ProductReview = {
                    id: `rev-${p.id}-${Date.now()}`,
                    productId: p.id,
                    author: reviewAuthor.trim(),
                    rating: reviewRating,
                    comment: reviewComment.trim(),
                    date: new Date().toLocaleDateString('vi-VN'),
                    images: reviewImages.length > 0 ? reviewImages : undefined
                  };
                  const updated = [...productReviews, newReview];
                  saveProductReviews(updated);
                  setReviewAuthor('');
                  setReviewComment('');
                  setReviewRating(5);
                  setReviewImages([]);
                  showToast('Cảm ơn bạn đã gửi đánh giá thực tế cho sản phẩm này!');
                }}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Gửi đánh giá ngay</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4. RELATED PRODUCTS SECTION (OPTIMIZED HORIZONTAL SCROLL CAROUSEL) */}
        {relatedProducts.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-xl">
                  <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-slate-800">
                    Sản phẩm tương đương & Có thể bạn quan tâm
                  </h3>
                  <p className="text-[10px] text-slate-400 font-semibold tracking-wider mt-0.5">
                    Lướt ngang để xem các sản phẩm cùng danh mục & phân khúc giá
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-blue-600 font-extrabold uppercase bg-blue-50 border border-blue-150 px-2.5 py-0.5 rounded-lg self-start sm:self-auto">
                Cùng danh mục: {p.categoryLabel}
              </span>
            </div>

            <div className="flex overflow-x-auto gap-3 pb-2 snap-x scrollbar-thin scrollbar-thumb-slate-200">
              {relatedProducts.map((item) => {
                const hasDiscount = item.originalPrice > item.price;
                const discountPercent = hasDiscount ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : 0;
                return (
                  <div 
                    key={item.id}
                    className="w-48 sm:w-56 shrink-0 snap-start border border-slate-150 hover:border-blue-400 rounded-2xl p-3 bg-slate-50/40 hover:bg-white transition-all duration-300 hover:shadow-md group/rel flex flex-col justify-between"
                  >
                    <div>
                      {/* Thumbnail Container */}
                      <div className="w-full h-28 bg-white rounded-xl flex items-center justify-center p-2 border border-slate-100 relative overflow-hidden shrink-0">
                        {hasDiscount && (
                          <span className={`absolute top-1.5 left-1.5 ${theme.primary} text-white text-[8px] font-black px-1.5 py-0.5 rounded-md z-10`}>
                            -{discountPercent}%
                          </span>
                        )}
                        {item.image ? (
                          <LazyImage
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain transition-transform duration-500 group-hover/rel:scale-105"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center">
                            {item.category === 'attendance' && <Fingerprint className="w-8 h-8 text-blue-600/75 stroke-[1.2]" />}
                            {item.category === 'printer' && <Printer className="w-8 h-8 text-indigo-600/75 stroke-[1.2]" />}
                            {item.category === 'scanner' && <Scan className="w-8 h-8 text-cyan-600/75 stroke-[1.2]" />}
                            {item.category === 'label' && <Barcode className="w-8 h-8 text-teal-600/75 stroke-[1.2]" />}
                            {item.category === 'consumable' && <FileText className="w-8 h-8 text-amber-600/75 stroke-[1.2]" />}
                            {item.category === 'drawer' && <Calculator className="w-8 h-8 text-rose-600/75 stroke-[1.2]" />}
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="mt-2.5 space-y-1">
                        <div className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">{item.brand}</div>
                        <h4 
                          onClick={() => {
                            handleViewProductDetails(item);
                            const el = document.getElementById(`dedicated-product-page-${item.id}`);
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth' });
                            } else {
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                          }}
                          className="text-xs font-black text-slate-800 line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors leading-tight uppercase hover:underline h-7"
                          title={item.name}
                        >
                          {item.name}
                        </h4>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-1.5">
                      <div className="text-left">
                        <div className={`text-[11px] font-black ${theme.primaryText} font-mono`}>
                          {formatVND(item.price)}
                        </div>
                        {hasDiscount && (
                          <div className="text-[9px] text-slate-400 line-through font-mono">
                            {formatVND(item.originalPrice)}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          handleViewProductDetails(item);
                          const el = document.getElementById(`dedicated-product-page-${item.id}`);
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth' });
                          } else {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                        className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[9px] uppercase tracking-wider rounded-lg transition-all shadow-sm cursor-pointer"
                      >
                        Xem
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 5. FREQUENTLY BOUGHT TOGETHER SECTION (OPTIMIZED HORIZONTAL SCROLL CAROUSEL) */}
        {companions.length > 0 && (
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-800 text-white rounded-3xl p-5 shadow-xl space-y-3 text-left">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400 animate-spin-slow" />
                <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-100">
                  🛒 GỢI Ý MUA CÈM ĐỒNG BỘ - GIẢM THÊM CHIẾT KHẤU
                </h3>
              </div>
              <span className="text-[9px] text-yellow-400 font-extrabold uppercase bg-yellow-500/10 border border-yellow-500/30 px-2 py-0.5 rounded-lg">
                Mua kèm giá sốc
              </span>
            </div>

            <div className="flex overflow-x-auto gap-3 pb-2 snap-x scrollbar-thin">
              {companions.map((comp) => {
                return (
                  <div 
                    key={comp.id}
                    className="w-64 sm:w-72 shrink-0 snap-start bg-slate-950 border border-slate-800/80 rounded-2xl p-3 flex gap-3 items-center justify-between hover:border-blue-500/50 transition-all group"
                  >
                    <div className="flex gap-2.5 items-center min-w-0">
                      {/* Image Thumbnail */}
                      <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shrink-0 border border-slate-800 p-1">
                        {comp.image ? (
                          <img
                            src={comp.image}
                            alt={comp.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain rounded-lg"
                          />
                        ) : (
                          <>
                            {comp.category === 'consumable' && <FileText className="w-6 h-6 text-amber-500 stroke-[1.2]" />}
                            {comp.category === 'drawer' && <Calculator className="w-6 h-6 text-rose-500 stroke-[1.2]" />}
                            {comp.category === 'printer' && <Printer className="w-6 h-6 text-indigo-500 stroke-[1.2]" />}
                            {comp.category === 'scanner' && <Scan className="w-6 h-6 text-cyan-500 stroke-[1.2]" />}
                          </>
                        )}
                      </div>

                      {/* Title & Price */}
                      <div className="min-w-0 text-left">
                        <span className="text-[8px] font-black uppercase tracking-wider text-blue-400 bg-blue-950 px-1.5 py-0.5 rounded border border-blue-900/40">
                          {comp.categoryLabel}
                        </span>
                        <h4 
                          onClick={() => handleViewProductDetails(comp)}
                          className="text-xs font-bold text-slate-100 group-hover:text-blue-400 transition-colors mt-0.5 cursor-pointer hover:underline truncate"
                        >
                          {comp.name}
                        </h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-xs font-bold text-red-400 font-mono">
                            {formatVND(comp.price)}
                          </span>
                          {comp.originalPrice > comp.price && (
                            <span className="text-[9px] text-slate-500 line-through font-mono">
                              {formatVND(comp.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quick Companion actions */}
                    <div className="flex flex-col gap-1 shrink-0">
                      <button
                        onClick={() => {
                          handleAddToQuote(comp, 1);
                          showToast(`Đã thêm ${comp.name} vào danh sách báo giá!`);
                        }}
                        className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[9px] uppercase tracking-wider rounded-lg transition-all shadow flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Thêm</span>
                      </button>
                      <button
                        onClick={() => handleViewProductDetails(comp)}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold text-[9px] uppercase tracking-wider rounded-lg transition-all cursor-pointer text-center"
                      >
                        Xem
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 6. SẢN PHẨM BẠN VỪA XEM TRƯỚC ĐÓ (KHI XEM SẢN PHẨM KHÁC VẪN BIẾT ĐÃ XEM GÌ) */}
        {viewedProducts.filter((item) => item.id !== p.id).length > 0 && (
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-sm space-y-3 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900">
                  👁️ SẢN PHẨM BẠN VỪA XEM TRƯỚC ĐÓ
                </h3>
                <span className="px-1.5 py-0.2 bg-blue-100 text-blue-700 font-mono text-[9px] font-extrabold rounded-full">
                  {viewedProducts.filter((item) => item.id !== p.id).length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedProduct(null);
                  setActiveTab('home');
                  setTimeout(() => {
                    const el = document.getElementById('viewed-products-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <span>Xem tất cả lịch sử</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-thin">
              {viewedProducts
                .filter((item) => item.id !== p.id)
                .slice(0, 10)
                .map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      handleViewProductDetails(item);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-40 sm:w-44 shrink-0 bg-slate-50 hover:bg-blue-50/40 rounded-2xl border border-slate-200/80 hover:border-blue-300 p-2.5 flex flex-col justify-between cursor-pointer group transition-all text-left"
                  >
                    <div>
                      <div className="w-full h-24 bg-white rounded-xl overflow-hidden p-1.5 flex items-center justify-center relative mb-1.5 border border-slate-100">
                        <span className="absolute top-1 left-1 px-1 py-0.2 bg-slate-800 text-white text-[6.5px] font-black uppercase rounded flex items-center gap-0.5">
                          <Eye className="w-2 h-2 text-blue-400" />
                          <span>Đã xem</span>
                        </span>
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        ) : (
                          <Package className="w-6 h-6 text-slate-300" />
                        )}
                      </div>
                      <span className="text-[7.5px] font-black text-blue-600 uppercase block">{item.categoryLabel}</span>
                      <h5 className="text-[11px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 h-7 leading-tight">
                        {item.name}
                      </h5>
                    </div>
                    <div className="mt-2 pt-1.5 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-[11px] font-black text-red-600 font-mono">{formatVND(item.price)}</span>
                      <span className="text-[8.5px] font-black text-blue-600 group-hover:underline">Xem lại</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

      </div>
    );
  };

  const renderProductCard = (p: Product, isPromoEffect = false) => {
    const itemInQuote = quoteItems.find((item) => item.product.id === p.id);
    const hasDiscount = p.originalPrice > p.price;
    const discountPercent = hasDiscount ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;
    const isViewed = viewedProductIds.includes(p.id);

    return (
      <motion.div
        key={p.id}
        variants={{
          hidden: { opacity: 0, y: 30 },
          show: { 
            opacity: 1, 
            y: 0,
            transition: {
              type: "spring",
              stiffness: 260,
              damping: 24
            }
          }
        }}
        whileHover={{
          y: -6,
          scale: 1.035,
          zIndex: 20,
          borderColor: isPromoEffect ? "#ef4444" : "#2563eb",
          boxShadow: isPromoEffect 
            ? "0 20px 35px -5px rgba(239, 68, 68, 0.25), 0 10px 15px -5px rgba(239, 68, 68, 0.15)" 
            : "0 20px 35px -5px rgba(37, 99, 235, 0.22), 0 10px 15px -5px rgba(37, 99, 235, 0.12)"
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 22
        }}
        className={`bg-white border rounded-2xl p-2.5 sm:p-4 transition-all duration-300 flex flex-col justify-between group relative h-full w-full hover:shadow-xl ${
          isPromoEffect 
            ? 'border-red-200/90 bg-gradient-to-b from-white to-red-50/15' 
            : 'border-slate-200/90 shadow-xs hover:border-blue-500'
        }`}
      >
        {/* Header product info */}
        <div>
          {/* Top Badges Row - Clean and Non-overlapping flex with proper spacing */}
          <div className="flex items-center justify-between gap-1 mb-2 min-h-[22px] w-full px-0.5 pt-0.5">
            <div className="flex flex-wrap items-center gap-1">
              {/* Huy hiệu ĐÃ XEM nổi bật để phân biệt sản phẩm đã xem và chưa xem */}
              {isViewed && (
                <span 
                  className="px-1.5 py-0.5 bg-slate-900 text-white text-[7.5px] sm:text-[8px] font-black uppercase tracking-wider rounded flex items-center gap-1 shadow-2xs border border-slate-700"
                  title="Bạn đã xem sản phẩm này trước đó"
                >
                  <Eye className="w-2.5 h-2.5 text-blue-400 shrink-0" />
                  <span>ĐÃ XEM</span>
                </span>
              )}
              {(p.isPopular || p.isFeatured) && (
                <span className="px-1.5 py-0.5 bg-blue-600 text-white text-[7.5px] sm:text-[8px] font-black uppercase tracking-wider rounded flex items-center gap-0.5 shadow-2xs">
                  <Sparkles className="w-2 h-2 shrink-0 text-yellow-300 animate-pulse" />
                  <span>NỔI BẬT</span>
                </span>
              )}
              {hasDiscount && (
                <span className="px-1.5 py-0.5 bg-red-600 text-white text-[7.5px] sm:text-[8px] font-black uppercase tracking-wider rounded shadow-2xs">
                  GIẢM {discountPercent}%
                </span>
              )}
              {isPromoEffect && (
                <span className="px-1.5 py-0.5 bg-amber-500 text-white text-[7.5px] sm:text-[8px] font-black uppercase tracking-wider rounded shadow-2xs">
                  GIÁ SỐC
                </span>
              )}
            </div>

            {/* Product comparison toggle with sleek animated badge pill */}
            <label
              onClick={(e) => e.stopPropagation()}
              className={`inline-flex items-center gap-1 cursor-pointer select-none shrink-0 py-0.5 px-2 rounded-full transition-all duration-300 border font-sans ${
                comparedProductIds.includes(p.id)
                  ? 'bg-blue-600 border-blue-500 text-white shadow-sm shadow-blue-500/25 scale-105'
                  : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700 hover:border-slate-300'
              }`}
              title="Chọn so sánh chi tiết sản phẩm"
            >
              <input
                type="checkbox"
                checked={comparedProductIds.includes(p.id)}
                onChange={() => handleToggleCompare(p.id)}
                className="sr-only" // Hidden for a custom beautiful custom indicator
              />
              <Sliders className={`w-2.5 h-2.5 transition-transform duration-300 ${
                comparedProductIds.includes(p.id) ? 'rotate-180 scale-110' : 'group-hover:rotate-12'
              }`} />
              <span className="text-[7.5px] sm:text-[8.5px] font-extrabold uppercase tracking-widest">
                {comparedProductIds.includes(p.id) ? 'Đang chọn' : 'So sánh'}
              </span>
            </label>
          </div>

          {/* Device schematic representation */}
          <div 
            onClick={() => handleViewProductDetails(p)}
            className={`my-1.5 h-24 sm:h-28 rounded-xl flex flex-col items-center justify-center border relative overflow-hidden group/img transition-all cursor-pointer ${
              isPromoEffect 
                ? 'bg-red-50/30 border-red-100 group-hover:bg-red-50/60' 
                : 'bg-slate-50/80 border-slate-200/80 group-hover:bg-blue-50/45'
            }`}
          >
            <div className="absolute top-1.5 right-1.5 text-[8px] text-slate-500 font-bold uppercase tracking-wider font-mono bg-white/80 backdrop-blur-xs px-1.5 py-0.5 rounded shadow-2xs z-10 hidden sm:block">
              {highlightText(p.brand, searchQuery)}
            </div>

            {p.image ? (
              <LazyImage
                src={p.image}
                alt={p.name}
                className="w-full h-full object-contain p-2.5 transition-all duration-500 ease-out group-hover/img:scale-110 transform-gpu"
              />
            ) : (
              <>
                {p.category === 'attendance' && <Fingerprint className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 stroke-[1.2] drop-shadow-sm transition-transform duration-500 ease-out group-hover:scale-112 transform-gpu" />}
                {p.category === 'printer' && <Printer className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-600 stroke-[1.2] drop-shadow-sm transition-transform duration-500 ease-out group-hover:scale-112 transform-gpu" />}
                {p.category === 'scanner' && <Scan className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-600 stroke-[1.2] drop-shadow-sm transition-transform duration-500 ease-out group-hover:scale-112 transform-gpu" />}
                {p.category === 'label' && <Barcode className="w-10 h-10 sm:w-12 sm:h-12 text-teal-600 stroke-[1.2] drop-shadow-sm transition-transform duration-500 ease-out group-hover:scale-112 transform-gpu" />}
                {p.category === 'consumable' && <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-amber-600 stroke-[1.2] drop-shadow-sm transition-transform duration-500 ease-out group-hover:scale-112 transform-gpu" />}
                {p.category === 'drawer' && <Calculator className="w-10 h-10 sm:w-12 sm:h-12 text-rose-600 stroke-[1.2] drop-shadow-sm transition-transform duration-500 ease-out group-hover:scale-112 transform-gpu" />}
              </>
            )}

            {/* Quick View & Add to Cart Hover Overlay */}
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 flex flex-col gap-2 items-center justify-center transition-all duration-300 z-10 p-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewProductDetails(p);
                }}
                className="w-32 py-2 bg-white hover:bg-slate-100 text-slate-800 font-black text-[9px] uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 shadow-md transition-all duration-200 cursor-pointer transform translate-y-2 group-hover/img:translate-y-0"
              >
                <Eye className="w-3.5 h-3.5 text-blue-600" />
                <span>Xem chi tiết</span>
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToQuote(p);
                }}
                className="w-32 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-[9px] uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 shadow-md transition-all duration-200 cursor-pointer transform translate-y-2 group-hover/img:translate-y-0"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Thêm vào giỏ</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-1 my-1.5 flex-wrap">
            <span className="text-[8px] sm:text-[9px] font-extrabold tracking-wider text-blue-700 uppercase bg-blue-50/90 px-1.5 py-0.5 rounded border border-blue-100">
              {highlightText(p.categoryLabel, searchQuery)}
            </span>
            <div className="flex items-center gap-1 text-[8.5px] sm:text-[9.5px] text-amber-500 font-extrabold bg-amber-50/80 px-1.5 py-0.5 rounded border border-amber-100/60" title={`${getAverageRating(p.id)}/5 sao từ ${getProductReviewsCount(p.id)} đánh giá`}>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className={`w-2.5 h-2.5 ${idx < Math.round(Number(getAverageRating(p.id))) ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
                ))}
              </div>
              <span className="text-slate-700 font-black">{getAverageRating(p.id)}</span>
              <span className="text-slate-400">({getProductReviewsCount(p.id)})</span>
            </div>
          </div>

          <h3 
            onClick={() => handleViewProductDetails(p)}
            title="Nhấp vào để xem chi tiết sản phẩm"
            className="text-[11px] sm:text-[13px] font-bold text-slate-800 tracking-tight mb-1 hover:text-blue-600 transition-colors leading-snug line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] cursor-pointer hover:underline"
          >
            {highlightText(p.name, searchQuery)}
          </h3>

          {/* Specs and alerts triggers */}
          <div className="border-t border-slate-100 pt-1 mt-1 sm:pt-1.5 sm:mt-1.5 flex justify-between items-center gap-1">
            <div className="flex items-center shrink-0">
              {(() => {
                const status = p.inventoryStatus || 'in_stock';
                if (status === 'in_stock') {
                  return (
                    <span className="text-[8px] sm:text-[9px] font-extrabold text-emerald-600 bg-emerald-50 px-1 sm:px-1.5 py-0.5 rounded flex items-center gap-0.5" title="Thiết bị đang có sẵn trong kho">
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>Còn hàng</span>
                    </span>
                  );
                } else if (status === 'out_of_stock') {
                  return (
                    <span className="text-[8px] sm:text-[9px] font-extrabold text-rose-600 bg-rose-50 px-1 sm:px-1.5 py-0.5 rounded flex items-center gap-0.5" title="Thiết bị tạm thời hết hàng">
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-rose-500 shrink-0" />
                      <span>Hết hàng</span>
                    </span>
                  );
                } else {
                  return (
                    <span className="text-[8px] sm:text-[9px] font-extrabold text-amber-600 bg-amber-50 px-1 sm:px-1.5 py-0.5 rounded flex items-center gap-0.5" title="Thiết bị nhận đặt hàng trước">
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-amber-500 shrink-0" />
                      <span>Đặt trước</span>
                    </span>
                  );
                }
              })()}
            </div>

            <button
              onClick={() => {
                if (activeAlertProductId === p.id) {
                  setActiveAlertProductId(null);
                } else {
                  setActiveAlertProductId(p.id);
                  setAlertEmail('');
                  setAlertSuccessProductId(null);
                }
              }}
              title={
                priceAlerts.some((alert) => alert.productId === p.id)
                  ? 'Đã đăng ký báo giá'
                  : 'Nhận báo giảm giá'
              }
              className={`hidden sm:flex text-[8px] sm:text-[10px] font-bold items-center gap-0.5 transition-colors cursor-pointer p-0.5 sm:p-1 rounded hover:bg-slate-50 shrink-0 ${
                priceAlerts.some((alert) => alert.productId === p.id)
                  ? 'text-emerald-600 hover:text-emerald-700'
                  : 'text-slate-400 hover:text-orange-600'
              }`}
            >
              <Bell className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>Báo giá</span>
            </button>
          </div>

          {/* Price drop subscription expandable form */}
          {activeAlertProductId === p.id && (
            <div className="mt-2 p-2 bg-slate-50 border border-slate-200/60 rounded-xl space-y-2 animate-slide-down">
              {priceAlerts.some((alert) => alert.productId === p.id) ? (
                <div className="space-y-1.5">
                  <div className="text-[9px] text-slate-500 font-medium leading-relaxed font-sans">
                    Đã đăng ký báo giá cho email:
                    <div className="font-mono font-bold text-slate-800 text-[10px] truncate">
                      {priceAlerts.find((alert) => alert.productId === p.id)?.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const matchingAlert = priceAlerts.find((alert) => alert.productId === p.id);
                      if (matchingAlert) {
                        handleRemovePriceAlert(p.id, matchingAlert.email);
                      }
                    }}
                    className={`text-[8px] ${theme.primaryText} ${theme.primaryTextHover} font-bold uppercase hover:underline flex items-center gap-1 cursor-pointer`}
                  >
                    <Trash2 className="w-2.5 h-2.5" />
                    <span>Hủy đăng ký</span>
                  </button>
                </div>
              ) : alertSuccessProductId === p.id ? (
                <div className="text-[9px] text-emerald-700 font-bold flex items-center gap-1 leading-normal font-sans">
                  <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>Đăng ký thành công!</span>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider font-sans">
                    Email nhận tin:
                  </div>
                  <div className="flex flex-col gap-1">
                    <input
                      type="email"
                      placeholder="email@cua-ban.com"
                      value={alertEmail}
                      onChange={(e) => setAlertEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded px-1.5 py-1 text-[10px] text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all font-sans"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (handleAddPriceAlert(p.id, p.name, alertEmail)) {
                            setAlertSuccessProductId(p.id);
                            setAlertEmail('');
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (handleAddPriceAlert(p.id, p.name, alertEmail)) {
                          setAlertSuccessProductId(p.id);
                          setAlertEmail('');
                        }
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-[9px] py-1 rounded transition-all cursor-pointer uppercase"
                    >
                      Đăng ký
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Pricing row & Action buttons */}
        <div className="mt-2 sm:mt-3 border-t border-slate-100 pt-2 space-y-1.5 sm:space-y-2">
          {/* Mobile layout: horizontal row with price and compact cart button */}
          <div className="flex sm:hidden items-center justify-between gap-1 w-full mt-1">
            <div className="flex flex-col text-left">
              {p.originalPrice > p.price && (
                <span className="text-[9px] text-slate-400 line-through font-mono leading-none">
                  {formatVND(p.originalPrice)}
                </span>
              )}
              <span className={`text-[11px] font-black ${theme.primaryText} font-mono leading-none mt-0.5`}>
                {formatVND(p.price)}
              </span>
            </div>
            
            <div className="flex gap-1 items-center shrink-0">
              {adminUser && isAdminMode && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenEditModal(p);
                  }}
                  className="p-1 bg-blue-50 text-blue-700 rounded border border-blue-100 h-7 w-7 flex items-center justify-center shrink-0"
                  title="Sửa sản phẩm"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToQuote(p);
                }}
                className={`p-1.5 rounded-lg flex items-center justify-center h-7 w-7 border transition-all shrink-0 ${
                  itemInQuote
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                    : 'bg-blue-600 text-white border-transparent shadow-sm'
                }`}
                title={itemInQuote ? "Đã chọn" : "Thêm vào giỏ"}
              >
                {itemInQuote ? <CheckCircle className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Desktop layout: separate row for price, and big full-width button */}
          <div className="hidden sm:block">
            <div className="flex items-baseline justify-between gap-1 flex-wrap mb-2">
              <span className="text-[10px] text-slate-400 line-through font-mono">
                {formatVND(p.originalPrice)}
              </span>
              <span className={`text-xs sm:text-sm font-bold ${theme.primaryText} font-mono`}>
                {formatVND(p.price)}
              </span>
            </div>

            <div className="flex gap-1.5 items-center w-full">
              {adminUser && isAdminMode && (
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenEditModal(p);
                    }}
                    className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg border border-blue-200 cursor-pointer h-8 w-8 flex items-center justify-center shrink-0"
                    title="Sửa sản phẩm"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteQuickProduct(p.id);
                    }}
                    className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg border border-red-200 cursor-pointer h-8 w-8 flex items-center justify-center shrink-0"
                    title="Xóa sản phẩm"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
              <button
                onClick={() => handleAddToQuote(p)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer min-h-[34px] ${
                  itemInQuote
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{itemInQuote ? `Đã chọn` : 'Mua'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Fancy promotional effect if enabled */}
        {isPromoEffect && (
          <div className="absolute top-1.5 right-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-[8px] font-black uppercase text-white px-2 py-0.5 rounded-full shadow-md tracking-wider flex items-center gap-1 z-10 animate-pulse">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            <span>MUA NGAY</span>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className={`font-sans flex flex-col transition-colors duration-300 ${
      activeTab === 'admin' ? 'h-screen overflow-hidden' : 'min-h-screen'
    } ${
      webConfig.themeMode === 'dark' 
        ? 'bg-slate-950 text-slate-100 selection:bg-orange-500 selection:text-white' 
        : 'bg-slate-50 text-slate-800 selection:bg-blue-600 selection:text-white'
    }`}>
      
      {/* PAGE TRANSITION / LOAD TRANG TOP PROGRESS BAR */}
      <AnimatePresence>
        {topPageProgress > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-[999999] pointer-events-none"
          >
            <div
              className="h-1 bg-gradient-to-r from-red-600 via-amber-400 to-blue-600 transition-all duration-300 ease-out shadow-[0_0_12px_rgba(239,68,68,0.8),0_0_6px_rgba(245,158,11,0.8)]"
              style={{ width: `${topPageProgress}%` }}
            />
            {isPageTransitioning && (
              <div className="absolute top-2.5 right-4 md:right-8 flex items-center gap-2 bg-slate-900/90 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xl border border-slate-700/80 backdrop-blur-md animate-pulse">
                <Loader2 className="w-3.5 h-3.5 text-yellow-400 animate-spin" />
                <span className="tracking-wide">Đang chuyển trang...</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Indicator Bar */}
      <div 
        className={`fixed top-0 left-0 h-1.5 ${theme.primary} z-50 transition-all duration-100 ease-out origin-left shadow-[0_1px_6px_rgba(37,99,235,0.4)]`}
        style={{ width: `${scrollProgress}%` }}
      />

      {/* 0. DEDICATED TOP-LEVEL ADMIN TASKBAR - "Tách thanh taskbar quản trị viên ra riêng" */}
      {adminUser && (
        <div className="bg-slate-900 text-white border-b border-slate-800 shadow-lg relative z-50 text-[11px] font-sans shrink-0">
          <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between gap-3 overflow-x-auto whitespace-nowrap scrollbar-none">
            {/* Left section: Identity */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="px-1.5 py-0.5 bg-amber-500 text-slate-950 font-black uppercase rounded text-[8px] tracking-wider">
                ADMIN
              </span>
              <span className="text-slate-300 font-medium">
                <strong className="text-white font-extrabold uppercase font-mono">{adminUser.name}</strong>
              </span>
            </div>

            {/* Middle section: Action Toggles */}
            <div className="flex items-center gap-2 shrink-0">
              {activeTab === 'admin' ? (
                <button
                  onClick={() => {
                    handleGoToHomeAndReset();
                    showToast('Đang hiển thị Trang chủ Website');
                  }}
                  className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white border border-blue-500 rounded-md font-bold flex items-center gap-1 cursor-pointer transition-all text-[10px]"
                >
                  <Store className="w-3 h-3" />
                  <span>Trang Chủ Website</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setActiveTab('admin');
                    showToast('Đã vào Trang Quản trị Hệ thống');
                  }}
                  className="px-2.5 py-1 bg-orange-500 hover:bg-orange-600 text-white border border-orange-400 rounded-md font-bold flex items-center gap-1 cursor-pointer transition-all text-[10px]"
                >
                  <Settings className="w-3 h-3" />
                  <span>Quản Trị</span>
                </button>
              )}

              <label className="flex items-center gap-1 cursor-pointer bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2.5 py-1 rounded-md text-slate-300 hover:text-white transition-all select-none font-bold text-[10px]">
                <input
                  type="checkbox"
                  checked={isAdminMode}
                  onChange={(e) => {
                    const val = e.target.checked;
                    setIsAdminMode(val);
                    localStorage.setItem('solutionbao_admin_mode', val ? 'true' : 'false');
                    showToast(val ? 'Đã bật Chế độ Sửa nhanh thiết bị!' : 'Đã tắt Chế độ Sửa nhanh.');
                  }}
                  className="rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-0 cursor-pointer h-3 w-3"
                />
                <span>Sửa nhanh</span>
              </label>

              <button
                onClick={() => {
                  setIsAddingNewProduct(true);
                  showToast('Đang thêm sản phẩm mới...');
                }}
                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500 rounded-md font-bold flex items-center gap-1 cursor-pointer transition-all text-[10px]"
              >
                <Plus className="w-3 h-3" />
                <span>Thêm Thiết Bị</span>
              </button>
            </div>

            {/* Right section: System Utilities */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Notification Bell with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                  className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-md border border-slate-700 transition-all cursor-pointer relative flex items-center justify-center"
                  title="Thông báo hệ thống"
                >
                  <Bell className="w-3.5 h-3.5" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-orange-500 text-[8px] font-extrabold text-white animate-pulse">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>

                {showNotifDropdown && (
                  <>
                    {/* Backdrop to close dropdown */}
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotifDropdown(false)} />
                    
                    <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-lg shadow-2xl z-50 text-slate-200 py-2 origin-top-right transition-all">
                      <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between">
                        <span className="font-extrabold text-[12px] text-slate-100 flex items-center gap-1.5">
                          <Bell className="w-3.5 h-3.5 text-amber-500" />
                          <span>Thông báo ({notifications.length})</span>
                        </span>
                        <div className="flex gap-2">
                          {notifications.length > 0 && (
                            <button
                              onClick={() => {
                                const updated = notifications.map(n => ({ ...n, read: true }));
                                saveNotifications(updated);
                              }}
                              className="text-[10px] text-blue-400 hover:text-blue-300 cursor-pointer font-semibold"
                            >
                              Đọc tất cả
                            </button>
                          )}
                          {notifications.length > 0 && (
                            <button
                              onClick={() => {
                                saveNotifications([]);
                              }}
                              className="text-[10px] text-red-400 hover:text-red-300 cursor-pointer font-semibold"
                            >
                              Xóa hết
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="max-h-72 overflow-y-auto scrollbar-thin">
                        {notifications.length === 0 ? (
                          <div className="p-6 text-center text-slate-500 text-[11px]">
                            Không có thông báo mới nào
                          </div>
                        ) : (
                          notifications.map((notif) => (
                            <div
                              key={notif.id}
                              onClick={() => {
                                // Mark as read
                                const updated = notifications.map(n => n.id === notif.id ? { ...n, read: true } : n);
                                saveNotifications(updated);
                                
                                // Save redirect target details in localStorage for reliable handling on mount/login
                                const targetSection = notif.type === 'order' ? 'orders' : 'consultations';
                                const redirectData = {
                                  section: targetSection,
                                  id: notif.targetId,
                                  time: Date.now()
                                };
                                localStorage.setItem('solutionbao_pending_admin_redirect', JSON.stringify(redirectData));
                                
                                // Switch to admin tab
                                setActiveTab('admin');
                                
                                // Dispatch custom event to switch inner AdminPanel section in real-time
                                window.dispatchEvent(new CustomEvent('solutionbao_admin_sec_change', { 
                                  detail: redirectData 
                                }));
                                
                                setShowNotifDropdown(false);
                              }}
                              className={`p-3 border-b border-slate-800/60 hover:bg-slate-800/80 cursor-pointer transition-all flex gap-2.5 relative ${
                                !notif.read ? 'bg-slate-800/40 border-l-2 border-l-orange-500' : ''
                              }`}
                            >
                              <div className="mt-0.5 shrink-0">
                                {notif.type === 'order' ? (
                                  <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded">
                                    <ShoppingBag className="w-3.5 h-3.5" />
                                  </div>
                                ) : (
                                  <div className="p-1.5 bg-blue-500/10 text-blue-400 rounded">
                                    <Phone className="w-3.5 h-3.5" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-extrabold text-[11px] text-slate-100 truncate">
                                  {notif.title}
                                </p>
                                <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2 leading-relaxed whitespace-normal">
                                  {notif.message}
                                </p>
                                <p className="text-[8px] text-slate-500 mt-1 font-mono">
                                  {notif.date}
                                </p>
                              </div>
                              {!notif.read && (
                                <span className="h-1.5 w-1.5 rounded-full bg-orange-500 absolute top-3.5 right-3" />
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={handleRefreshInventory}
                className="p-1 bg-slate-850 hover:bg-slate-700 text-slate-300 hover:text-white rounded-md border border-slate-700 transition-all cursor-pointer"
                title="Đồng bộ & Làm mới"
              >
                <RefreshCw className="w-3 h-3" />
              </button>

              <button
                onClick={handleClearCache}
                className="p-1 bg-slate-850 hover:bg-slate-700 text-slate-300 hover:text-orange-400 rounded-md border border-slate-700 transition-all cursor-pointer"
                title="Xóa bộ nhớ đệm và khôi phục mặc định"
              >
                <Trash2 className="w-3 h-3" />
              </button>

              <div className="h-3 w-[1px] bg-slate-700 mx-0.5" />

              <button
                onClick={handleLogout}
                className="px-2 py-1 bg-red-600/30 hover:bg-red-600 text-red-200 hover:text-white border border-red-500/20 rounded-md font-bold flex items-center gap-1 cursor-pointer transition-all text-[10px]"
              >
                <LogOut className="w-3 h-3" />
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. TOP MINI HEADER BAR - Exact Vietnam Corporate Standard */}
      {activeTab !== 'admin' && activeTab !== 'landing' && (
        <>
          {/* MOBILE VIEW (E-COMMERCE STYLE MATCHING USER SCREENSHOTS) */}
          <MobileEcommerceView
            products={products}
            mainCategories={mainCategories}
            subCategories={subCategories}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            renderDedicatedProductPage={renderDedicatedProductPage}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            catalogCategory={catalogCategory}
            setCatalogCategory={setCatalogCategory}
            handleViewProductDetails={handleViewProductDetails}
            handleQuickAddToCart={handleAddToQuote}
            totalQuantity={totalQuantity}
            promoCountdown={promoCountdown}
            startSpeechRecognition={startSpeechRecognition}
            isListening={isListening}
            webConfig={webConfig}
            quoteItems={quoteItems}
            slides={slides}
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
            handleGoToHomeAndReset={handleGoToHomeAndReset}
            handleUpdateQuantity={handleUpdateQuantity}
            handleRemoveFromQuote={handleRemoveFromQuote}
            viewedProductIds={viewedProductIds}
            handleClearViewedProducts={handleClearViewedProducts}
          />

          {/* DESKTOP TOP MINI BAR */}
          {(webConfig.showTopHeaderBar !== false) && (
            <div className="hidden md:block bg-slate-900 text-slate-300 text-[11px] py-1.5 border-b border-slate-800 overflow-x-auto select-none shrink-0">
              <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex flex-row justify-between items-center gap-4 whitespace-nowrap">
                <div className="flex items-center gap-3 text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>{webConfig.address}</span>
                  </span>
                  <span className="text-slate-700">|</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>T2 - T7: 8:00 - 18:00</span>
                  </span>
                </div>
                <div className="flex items-center gap-3.5 font-bold text-[10px]">
                  <span className="text-orange-400 flex items-center gap-1 bg-orange-950/40 px-2 py-0.5 rounded border border-orange-500/20">
                    <Truck className="w-3.5 h-3.5 shrink-0" /> Giao COD Toàn Quốc
                  </span>
                  <span className="text-blue-400 flex items-center gap-1 bg-blue-950/40 px-2 py-0.5 rounded border border-blue-500/20 hidden md:flex">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" /> Wise Eye & Driver Miễn Phí
                  </span>
                  <span className="text-slate-700 hidden md:inline">|</span>
                  <a href={`mailto:${webConfig.email}`} className="hover:text-white flex items-center gap-1 transition-colors text-xs font-normal text-slate-400">
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    <span className="hidden sm:inline">{webConfig.email}</span>
                  </a>
                  <span className="text-slate-700">|</span>
                  <a href={sanitizeUrl(webConfig.facebookLink)} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 flex items-center gap-1 transition-colors text-slate-400">
                    <Facebook className="w-3.5 h-3.5 text-blue-500" />
                    <span>Facebook</span>
                  </a>
                  <span className="text-slate-700">|</span>
                  <a href={sanitizeUrl(webConfig.zaloLink)} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 flex items-center gap-1 transition-colors text-slate-400">
                    <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
                    <span>Zalo</span>
                  </a>
                  <span className="text-slate-700">|</span>
                  <button
                    onClick={() => {
                      setActiveTab('admin');
                      showToast('Chuyển đến trang Đăng nhập Quản trị');
                    }}
                    className="hover:text-amber-400 flex items-center gap-1 transition-colors text-amber-400 font-extrabold cursor-pointer px-2 py-0.5 bg-amber-500/10 hover:bg-amber-500/20 rounded border border-amber-500/30"
                    title="Mở màn hình Đăng nhập Quản trị viên"
                  >
                    <Settings className="w-3.5 h-3.5 text-amber-400" />
                    <span>Quản Trị Web</span>
                  </button>
                </div>
              </div>
            </div>
          )}

      {/* 2. MAIN HEADER - Dynamic Theme Header */}
      {((webConfig.showHeaderBar !== false) && (
        (webConfig.showHeaderLogo !== false) ||
        (webConfig.showHeaderSearch !== false) ||
        (webConfig.showHeaderHotline !== false) ||
        (webConfig.showHeaderCart !== false)
      )) && (
        <header className={`hidden md:block sticky top-0 z-40 transition-colors duration-300 shadow-md ${
          webConfig.themeMode === 'dark' 
            ? 'bg-slate-900 border-b border-slate-800 text-white' 
            : `${theme.headerBg || 'bg-[#CD1818]'} text-white border-b ${theme.headerBorder || 'border-red-700'}`
        }`}>
          <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex flex-col lg:flex-row justify-between items-center gap-4 py-3">
            
            {/* Brand Logo Group - Clickable back to Homepage */}
            {(webConfig.showHeaderLogo !== false) && (
              <div className="flex items-center justify-between w-full lg:w-auto">
                <div 
                  onClick={handleGoToHomeAndReset}
                  className={`relative overflow-hidden flex items-center gap-3 cursor-pointer active:scale-[0.98] p-2 pr-7 rounded-2xl transition-all duration-200 hover:opacity-100 ${
                    webConfig.themeMode === 'dark'
                      ? 'bg-slate-950/60 border border-slate-800'
                      : 'bg-white/10 hover:bg-white/15 border border-white/20'
                  }`}
                  id="logo-brand-container"
                >
                  {/* Subtle glass reflection overlay on top half */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-10" />
                  
                  {/* Discreet 'Visit Official Website' external link */}
                  <a 
                    href="https://solutionbao.vn" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-1.5 right-1.5 p-1 rounded-md transition-all duration-200 z-20 group/weblink flex items-center gap-1 shadow-sm bg-black/20 hover:bg-black/40 text-white"
                    title="Ghé thăm Website chính thức solutionbao.vn"
                  >
                    <span className="text-[8px] font-black uppercase tracking-wider transition-colors hidden md:inline-block max-w-0 overflow-hidden group-hover/weblink:max-w-xs duration-300 ease-out text-yellow-300">
                      solutionbao.vn
                    </span>
                    <ExternalLink className="w-3 h-3 text-yellow-300" />
                  </a>
                  
                  <div className="flex items-center gap-2.5">
                    {webConfig.logoImageUrl ? (
                      <img 
                        src={webConfig.logoImageUrl} 
                        alt={webConfig.logoText || 'Logo'} 
                        referrerPolicy="no-referrer"
                        className="h-10 w-auto max-w-[160px] object-contain shrink-0 rounded-lg bg-white p-1 shadow-sm" 
                      />
                    ) : (
                      <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center font-black text-xl text-slate-950 shadow-md shrink-0">
                        {(webConfig.logoText || 'SOLUTION B A O').split(' ').map((w: string) => w[0]).join('').substring(0, 2)}
                      </div>
                    )}
                    
                    <div className="flex flex-col justify-center min-w-0 shrink-0 text-left pr-1">
                      <div className="text-lg md:text-xl font-black tracking-tight flex items-center gap-1.5 leading-tight whitespace-nowrap text-white">
                        {webConfig.logoText || 'SOLUTION B A O'}
                        {webConfig.logoSubtext && (
                          <span className="text-slate-950 font-black text-[9px] px-1.5 py-0.5 bg-yellow-400 rounded-md shrink-0 uppercase tracking-wider">
                            {webConfig.logoSubtext}
                          </span>
                        )}
                      </div>
                      <div className="text-[9px] uppercase tracking-wider text-white/80 font-bold line-clamp-1 max-w-[280px]">
                        {webConfig.companyName || 'SOLUTION B A O TECHNOLOGY - THIẾT BỊ BÁN HÀNG & CHẤM CÔNG'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick toggle cart button on mobile */}
                <button
                  onClick={() => setActiveTab('quote')}
                  className="lg:hidden relative p-2.5 rounded-xl bg-white/15 text-white"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-1 -right-1.5 bg-yellow-400 text-slate-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-red-600">
                      {totalQuantity}
                    </span>
                  )}
                </button>
              </div>
            )}

            {/* Global Search Bar */}
            {(webConfig.showHeaderSearch !== false) && (
              <div className="w-full lg:max-w-2xl flex flex-col gap-1.5 relative z-30" ref={searchRef}>
                <div className="flex items-center w-full shadow-md rounded-xl overflow-visible">
                  
                  {/* Category Dropdown Trigger attached directly to the left of Search Input */}
                  {(webConfig.showNavCategories !== false) && (
                    <div 
                      className="relative shrink-0"
                      onMouseEnter={() => setIsMegaMenuOpen(true)}
                      onMouseLeave={() => setIsMegaMenuOpen(false)}
                    >
                      <button
                        type="button"
                        onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                        className="h-[42px] bg-slate-950 hover:bg-black text-yellow-300 font-black text-xs uppercase px-3.5 sm:px-4 rounded-l-xl transition-all flex items-center gap-1.5 border-y border-l border-slate-950 shrink-0 cursor-pointer shadow-inner"
                        title="Danh mục thiết bị"
                      >
                        <Menu className="w-4 h-4 text-yellow-300" />
                        <span className="hidden xl:inline">Danh Mục</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Mega Menu Dropdown Popover with Subcategories - Constrained viewport & clean layout */}
                      <AnimatePresence>
                        {isMegaMenuOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.99 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.99 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 sm:-left-2 md:-left-8 lg:-left-12 mt-1.5 w-[calc(100vw-32px)] sm:w-[700px] md:w-[840px] lg:w-[980px] xl:w-[1080px] max-w-[calc(100vw-32px)] bg-white border border-slate-200/90 rounded-2xl shadow-2xl z-50 overflow-hidden text-left grid grid-cols-12 max-h-[82vh]"
                          >
                            {/* Left Panel: Main Categories List */}
                            <div className="col-span-12 md:col-span-5 lg:col-span-4 bg-white py-2 border-r border-slate-200/80 overflow-y-auto max-h-[520px] scrollbar-thin">
                              <div className="py-1">
                                {dynamicMegaMenuCategories.map((cat) => {
                                  const isHovered = hoveredMegaCategory === cat.id;
                                  return (
                                    <button
                                      key={cat.id}
                                      type="button"
                                      onMouseEnter={() => setHoveredMegaCategory(cat.id)}
                                      onClick={() => {
                                        setCatalogCategory(cat.id === 'deal' ? 'all' : cat.id);
                                        setCatalogSubCategory('all');
                                        setActiveTab('catalog');
                                        setIsMegaMenuOpen(false);
                                      }}
                                      className={`w-full px-3 py-2 flex items-center justify-between text-left transition-all cursor-pointer group ${
                                        isHovered
                                          ? `${theme.lightBg} ${theme.primaryText} font-extrabold shadow-2xs border-l-4 ${theme.border} pl-2`
                                          : 'hover:bg-slate-50 text-slate-800 font-bold'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2 min-w-0 flex-1 pr-1">
                                        <div className={`p-1.5 rounded-md shrink-0 ${isHovered ? `${theme.lightBg} ${theme.primaryText}` : 'bg-slate-100 text-slate-500'}`}>
                                          {getCategoryIcon(cat.id)}
                                        </div>
                                        <span className="text-[11px] lg:text-[11.5px] whitespace-normal leading-snug">
                                          {cat.label}
                                        </span>
                                      </div>
                                      <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isHovered ? `${theme.primaryText} translate-x-0.5` : 'text-slate-300'}`} />
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Right Panel: Subcategories Grid & Best Seller Row */}
                            <div className="col-span-12 md:col-span-7 lg:col-span-8 p-3.5 lg:p-4 bg-[#f0f4f8] overflow-y-auto max-h-[520px] flex flex-col justify-between gap-3.5">
                              {(() => {
                                const currentCat = dynamicMegaMenuCategories.find(c => c.id === hoveredMegaCategory) || dynamicMegaMenuCategories[0];
                                return (
                                  <>
                                    {/* Top: Header Info */}
                                    <div>
                                      <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-200/80">
                                        <div className="flex items-center gap-2">
                                          <div className={`p-1.5 ${theme.primary} text-white rounded-lg shadow-2xs`}>
                                            {getCategoryIcon(currentCat.id)}
                                          </div>
                                          <div>
                                            <h5 className="text-xs font-black text-slate-900 uppercase tracking-tight">{currentCat.label}</h5>
                                            <p className="text-[10px] text-slate-500 font-medium">{currentCat.description}</p>
                                          </div>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setCatalogCategory(currentCat.id === 'deal' ? 'all' : currentCat.id);
                                            setCatalogSubCategory('all');
                                            setActiveTab('catalog');
                                            setIsMegaMenuOpen(false);
                                          }}
                                          className={`text-[10.5px] font-black ${theme.primaryText} ${theme.primaryTextHover} flex items-center gap-0.5 uppercase cursor-pointer hover:underline`}
                                        >
                                          <span>Xem tất cả</span>
                                          <ChevronRight className="w-3.5 h-3.5" />
                                        </button>
                                      </div>

                                      {/* Subcategory Grid OR Direct Display for Categories without Subcategories */}
                                      {(() => {
                                        const catSubs = currentCat.id === 'deal'
                                          ? []
                                          : visibleSubCategories.filter((s) => s.mainCategoryId === currentCat.id);

                                        if (catSubs.length > 0) {
                                          return (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                                              {catSubs.map((sub) => (
                                                <button
                                                  key={sub.id}
                                                  type="button"
                                                  onClick={() => {
                                                    setCatalogCategory(currentCat.id);
                                                    setCatalogSubCategory(sub.id);
                                                    setActiveTab('catalog');
                                                    setIsMegaMenuOpen(false);
                                                  }}
                                                  title={sub.description || sub.name}
                                                  className={`p-2.5 bg-white hover:bg-slate-50 rounded-xl border border-slate-200/80 ${theme.borderHover || 'hover:border-slate-300'} hover:shadow-md transition-all text-left flex items-center gap-2.5 group cursor-pointer shadow-2xs overflow-hidden`}
                                                >
                                                  {sub.imageUrl ? (
                                                    <img
                                                      src={sub.imageUrl}
                                                      alt={sub.name}
                                                      className="w-8 h-8 object-cover rounded-lg border border-slate-200 shrink-0 group-hover:scale-105 transition-transform"
                                                    />
                                                  ) : (
                                                    <span className={`text-[9.5px] font-black px-1.5 py-0.5 rounded-md bg-slate-900 text-amber-300 font-mono shrink-0 border border-slate-900 group-hover:scale-105 transition-transform uppercase tracking-wider`}>
                                                      {sub.brandBadge || sub.id.substring(0, 3).toUpperCase()}
                                                    </span>
                                                  )}
                                                  <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-1.5 flex-wrap">
                                                      {sub.brandBadge && !sub.imageUrl && (
                                                        <span className="text-[8.5px] font-mono font-bold text-slate-500 uppercase">
                                                          {sub.brandBadge}
                                                        </span>
                                                      )}
                                                      <span className="text-[11px] font-bold text-slate-800 group-hover:text-slate-900 leading-snug whitespace-normal break-words transition-colors line-clamp-2">
                                                        {sub.name}
                                                      </span>
                                                    </div>
                                                    {sub.description && (
                                                      <p className="text-[9.5px] text-slate-500 line-clamp-1 font-medium mt-0.5">
                                                        {sub.description}
                                                      </p>
                                                    )}
                                                  </div>
                                                </button>
                                              ))}
                                            </div>
                                          );
                                        }

                                        return (
                                          <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                              <div className={`p-3 ${theme.lightBg} ${theme.primaryText} rounded-xl border ${theme.lightBorder} shrink-0`}>
                                                {getCategoryIcon(currentCat.id)}
                                              </div>
                                              <div>
                                                <div className="text-xs font-black text-slate-900 uppercase flex items-center gap-1.5">
                                                  <span>{currentCat.label}</span>
                                                </div>
                                                <p className="text-[11px] text-slate-500 font-medium mt-0.5">Khám phá danh sách thiết bị đầy đủ với giá ưu đãi</p>
                                              </div>
                                            </div>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                setCatalogCategory(currentCat.id === 'deal' ? 'all' : currentCat.id);
                                                setCatalogSubCategory('all');
                                                setActiveTab('catalog');
                                                setIsMegaMenuOpen(false);
                                              }}
                                              className={`px-3.5 py-2 ${theme.primary} ${theme.primaryHover} text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md transition-all cursor-pointer shrink-0`}
                                            >
                                              <Search className="w-3.5 h-3.5" />
                                              <span>Xem sản phẩm</span>
                                            </button>
                                          </div>
                                        );
                                      })()}
                                    </div>

                                    {/* Bottom: Best Sellers Section */}
                                    <div className="pt-2.5 border-t border-slate-200/80">
                                      <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-1.5 text-[11px] font-black uppercase text-slate-900 tracking-wider">
                                          <Zap className={`w-3.5 h-3.5 ${theme.primaryText} fill-current animate-pulse`} />
                                          <span>Bán chạy nhất</span>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setCatalogCategory(currentCat.id === 'deal' ? 'all' : currentCat.id);
                                            setCatalogSubCategory('all');
                                            setActiveTab('catalog');
                                            setIsMegaMenuOpen(false);
                                          }}
                                          className={`text-[10.5px] font-black ${theme.primaryText} hover:underline flex items-center gap-0.5 cursor-pointer`}
                                        >
                                          <span>Xem tất cả</span>
                                          <ChevronRight className="w-3.5 h-3.5" />
                                        </button>
                                      </div>

                                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                        {(() => {
                                          const catProducts = products.filter(p => currentCat.id === 'deal' ? p.isPopular || (p.originalPrice > p.price) : p.category === currentCat.id);
                                          const displayProducts = (catProducts.length > 0 ? catProducts : products).slice(0, 3);
                                          return displayProducts.map((p) => {
                                            const discountPercent = p.originalPrice > p.price ? Math.floor(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;
                                            return (
                                              <div
                                                key={p.id}
                                                onClick={() => {
                                                  handleViewProductDetails(p);
                                                  setIsMegaMenuOpen(false);
                                                }}
                                                className={`p-2 bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md ${theme.borderHover || 'hover:border-slate-300'} flex items-center gap-2 cursor-pointer transition-all relative overflow-hidden group`}
                                              >
                                                {discountPercent > 0 && (
                                                  <div className={`absolute top-1 left-1 ${theme.primary} text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow-2xs z-10`}>
                                                    -{discountPercent}%
                                                  </div>
                                                )}
                                                <div className="w-10 h-10 bg-white rounded-lg p-0.5 border border-slate-100 shrink-0 overflow-hidden flex items-center justify-center">
                                                  {p.image ? (
                                                    <img src={p.image} alt={p.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                                                  ) : (
                                                    <Package className="w-4 h-4 text-slate-400" />
                                                  )}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                  <div className="text-[10.5px] font-black text-slate-800 line-clamp-2 leading-tight group-hover:opacity-80 transition-colors">{p.name}</div>
                                                  <div className="flex items-baseline gap-1.5 mt-0.5">
                                                    <span className={`text-[10.5px] ${theme.primaryText} font-mono font-black`}>{formatVND(p.price)}</span>
                                                    {p.originalPrice > p.price && (
                                                      <span className="text-[9px] text-slate-400 line-through font-mono">{formatVND(p.originalPrice)}</span>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            );
                                          });
                                        })()}
                                      </div>
                                    </div>
                                  </>
                                );
                              })()}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Main Search Input */}
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          if (searchQuery.trim()) {
                            setActiveTab('catalog');
                          }
                          setIsSearchFocused(false);
                        } else if (e.key === 'Escape') {
                          setIsSearchFocused(false);
                        }
                      }}
                      placeholder="Nhập tên sản phẩm, thương hiệu (VD: Ronald Jack X628, Xprinter)..."
                      className={`w-full h-[42px] bg-white text-slate-900 placeholder-slate-400 text-xs px-4 pr-10 border-y border-slate-200 focus:outline-none font-medium shadow-inner ${
                        webConfig.showNavCategories === false ? 'rounded-l-xl border-l' : ''
                      }`}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Voice Search Microphone Button */}
                  <button
                    type="button"
                    onClick={startSpeechRecognition}
                    className={`h-[42px] px-3 bg-white text-slate-500 ${theme.primaryTextHover} border-y border-slate-200 flex items-center justify-center transition-colors cursor-pointer ${
                      isListening ? `${theme.lightBg} ${theme.primaryText} animate-pulse` : ''
                    }`}
                    title="Tìm kiếm bằng giọng nói"
                  >
                    <Mic className="w-4 h-4" />
                  </button>

                  {/* Compact Icon-Only Search Action Submit Button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (searchQuery.trim()) {
                        setActiveTab('catalog');
                        setIsSearchFocused(false);
                      }
                    }}
                    className="h-[42px] w-[46px] bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black rounded-r-xl transition-all flex items-center justify-center cursor-pointer shrink-0 shadow-md border-l border-yellow-300"
                    title="Tìm kiếm"
                  >
                    <Search className="w-4.5 h-4.5 text-slate-950 stroke-[2.5]" />
                  </button>
                </div>

                {/* Live Search Suggestions Popover */}
                {isSearchFocused && (
                  <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200/90 rounded-2xl shadow-2xl z-50 overflow-hidden text-left divide-y divide-slate-100 max-h-96 overflow-y-auto text-slate-800 animate-fade-in">
                    {searchQuery.trim().length === 0 ? (
                      /* When search input is empty, show trending keywords & popular products */
                      <div className="p-3.5 space-y-3">
                        <div>
                          <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            <span>Từ Khóa Tìm Kiếm Hot Hôm Nay</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {['XP-420B', 'Ronald Jack RJ1200', 'Máy POS 2 màn hình', 'Máy in bill K80', 'Máy quét 2D', 'Két đựng tiền', 'Xprinter N160II'].map((keyword, i) => (
                              <button
                                key={i}
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                  setSearchQuery(keyword);
                                  setActiveTab('catalog');
                                  setIsSearchFocused(false);
                                }}
                                className="px-2.5 py-1 bg-slate-100 hover:bg-red-50 hover:text-[#CD1818] hover:border-red-200 border border-slate-200/80 rounded-lg text-xs font-bold text-slate-700 transition-all cursor-pointer flex items-center gap-1"
                              >
                                <Search className="w-3 h-3 text-slate-400" />
                                <span>{keyword}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-100">
                          <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
                            <span>Sản Phẩm Đang Đợt Giảm Giá Sốc</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {products.filter(p => p.isPopular).slice(0, 4).map((p) => (
                              <button
                                key={p.id}
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                  handleViewProductDetails(p);
                                  setIsSearchFocused(false);
                                }}
                                className="p-2 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/60 transition-all flex items-center gap-2.5 text-left cursor-pointer group"
                              >
                                <div className="w-9 h-9 bg-white rounded-lg p-1 border border-slate-200 shrink-0 overflow-hidden flex items-center justify-center">
                                  {p.image ? (
                                    <img src={p.image} alt={p.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                                  ) : (
                                    <Package className="w-4 h-4 text-slate-400" />
                                  )}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-xs font-bold text-slate-800 truncate group-hover:text-blue-600">{p.name}</div>
                                  <div className="text-[10.5px] font-mono font-black text-red-600">{formatVND(p.price)}</div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Live Auto-complete search results */
                      <>
                        <div className="px-3.5 py-2 bg-slate-50 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                          <span>Kết quả tìm kiếm phù hợp ({products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()) || (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase()))).length})</span>
                          <span className="text-blue-600 text-[10px]">Bấm Enter để xem tất cả</span>
                        </div>
                        {products
                          .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()) || (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase())))
                          .slice(0, 6)
                          .map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => {
                                handleViewProductDetails(item);
                                setIsSearchFocused(false);
                              }}
                              className={`w-full px-3.5 py-2.5 hover:bg-blue-50/50 flex items-center gap-3 transition-colors text-left cursor-pointer group`}
                            >
                              <div className="w-10 h-10 shrink-0 bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center p-1 border border-slate-200 group-hover:border-blue-300">
                                {item.image ? (
                                  <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
                                ) : (
                                  <Package className="w-5 h-5 text-slate-400" />
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-xs font-black text-slate-800 truncate group-hover:text-blue-600">{item.name}</div>
                                <div className="text-[10px] text-slate-500 font-bold flex items-center gap-2 mt-0.5">
                                  <span className="bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded text-[9px] uppercase font-black">{item.brand || 'Bảo Tech'}</span>
                                  <span className="text-red-600 font-mono font-black text-xs">{formatVND(item.price)}</span>
                                  {item.originalPrice > item.price && (
                                    <span className="text-slate-400 line-through font-mono text-[10px]">{formatVND(item.originalPrice)}</span>
                                  )}
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                            </button>
                          ))}
                        
                        {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()) || (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase()))).length === 0 && (
                          <div className="p-6 text-center space-y-2">
                            <Search className="w-8 h-8 text-slate-300 mx-auto" />
                            <div className="text-xs font-bold text-slate-600">Không tìm thấy thiết bị phù hợp với "{searchQuery}"</div>
                            <button
                              type="button"
                              onClick={() => {
                                setActiveTab('advisor');
                                handleSendAiMessage(`Tìm thiết bị phù hợp với từ khóa: ${searchQuery}`);
                                setIsSearchFocused(false);
                              }}
                              className="px-3.5 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                            >
                              Hỏi Tư Vấn Viên Tìm Giúp
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Right Action Items: Orders, Hotline & Cart */}
            {((webConfig.showHeaderHotline !== false) || (webConfig.showHeaderCart !== false)) && (
              <div className="hidden lg:flex items-center gap-3 shrink-0">
                {/* Recently Viewed Products Quick Button */}
                {viewedProducts.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProduct(null);
                      setActiveTab('home');
                      setTimeout(() => {
                        const el = document.getElementById('viewed-products-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all text-white cursor-pointer"
                    title="Xem danh sách sản phẩm bạn vừa xem"
                  >
                    <Eye className="w-4 h-4 text-blue-300" />
                    <div className="text-left leading-tight">
                      <div className="text-[9px] uppercase font-bold text-white/80">Đã xem</div>
                      <div className="text-[11px] font-black text-blue-200">{viewedProducts.length} sản phẩm</div>
                    </div>
                  </button>
                )}

                {/* Order Lookup */}
                <button
                  onClick={() => setActiveTab('order-lookup')}
                  className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all text-white cursor-pointer"
                >
                  <Search className="w-4 h-4 text-yellow-300" />
                  <div className="text-left leading-tight">
                    <div className="text-[9px] uppercase font-bold text-white/80">Tra cứu</div>
                    <div className="text-[11px] font-black">Đơn hàng</div>
                  </div>
                </button>

                {/* Hotline Call */}
                <a
                  href={`tel:${webConfig.primaryPhone.replace(/[^0-9]/g, '')}`}
                  className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all text-white cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-yellow-300 animate-pulse" />
                  <div className="text-left leading-tight">
                    <div className="text-[9px] uppercase font-bold text-white/80">Tư vấn 24/7</div>
                    <div className="text-[11px] font-black text-yellow-300 font-mono">{webConfig.primaryPhone}</div>
                  </div>
                </a>

                {/* Shopping Cart Button */}
                {(webConfig.showHeaderCart !== false) && (
                  <div 
                    className="relative"
                    onMouseEnter={() => setIsMiniCartOpen(true)}
                    onMouseLeave={() => setIsMiniCartOpen(false)}
                  >
                    <button
                      onClick={() => setActiveTab('quote')}
                      className="flex items-center gap-2.5 px-3.5 py-2 bg-yellow-400 hover:bg-yellow-300 text-slate-950 rounded-xl transition-all relative cursor-pointer shrink-0 font-black shadow-md border border-yellow-300"
                    >
                <ShoppingBag className="w-4 h-4 text-slate-950" />
                <div className="text-left leading-tight">
                  <div className="text-[9px] text-slate-800 font-extrabold uppercase tracking-wider">Giỏ Báo Giá</div>
                  <div className="text-[11px] font-black text-slate-950">
                    {totalQuantity > 0 ? `${totalQuantity} sản phẩm` : '0 sản phẩm'}
                  </div>
                </div>
                {totalQuantity > 0 && (
                  <span className={`absolute -top-1.5 -right-1.5 ${theme.primary} text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce shadow-md`}>
                    {totalQuantity}
                  </span>
                )}
              </button>

              {/* Mini Cart Popover Panel */}
              <AnimatePresence>
                {isMiniCartOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden text-left"
                  >
                    <div className="p-3.5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                      <div className="flex items-center gap-1.5">
                        <ShoppingBag className={`w-4 h-4 ${theme.primaryText}`} />
                        <span className="text-xs font-black text-slate-800 uppercase tracking-wide">GIỎ HÀNG MINI ({totalQuantity})</span>
                      </div>
                      {quoteItems.length > 0 && (
                        <button
                          onClick={handleClearQuote}
                          className={`text-[10px] text-slate-400 ${theme.primaryTextHover} font-bold uppercase transition-colors cursor-pointer`}
                        >
                          Xóa hết
                        </button>
                      )}
                    </div>

                    <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 p-2 space-y-1">
                      {quoteItems.length > 0 ? (
                        quoteItems.map((item) => {
                          const finalPrice = item.customPrice !== undefined ? item.customPrice : item.product.price;
                          return (
                            <div key={`${item.product.id}-${item.priceOptionLabel || 'store'}`} className="flex gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                              <div 
                                className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-md shrink-0 overflow-hidden flex items-center justify-center p-0.5 cursor-pointer hover:border-blue-300 transition-colors"
                                title="Xem chi tiết sản phẩm"
                                onClick={() => {
                                  setSelectedProduct(item.product);
                                  setActiveTab('catalog');
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                  showToast(`Đang xem chi tiết sản phẩm: ${item.product.name}`);
                                }}
                              >
                                {item.product.image ? (
                                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                                ) : (
                                  <Package className="w-6 h-6 text-slate-400" />
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div 
                                  className="text-[11px] font-bold text-slate-800 truncate cursor-pointer hover:text-blue-600 transition-colors" 
                                  title={`Xem chi tiết: ${item.product.name}`}
                                  onClick={() => {
                                    setSelectedProduct(item.product);
                                    setActiveTab('catalog');
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                    showToast(`Đang xem chi tiết sản phẩm: ${item.product.name}`);
                                  }}
                                >
                                  {item.product.name}
                                </div>
                                <div className="text-[10px] text-slate-400 mt-0.5 flex justify-between items-center">
                                  <span>{item.quantity} x <span className="font-mono text-red-500 font-bold">{formatVND(finalPrice)}</span></span>
                                  <button
                                    onClick={() => handleRemoveFromQuote(item.product.id, item.priceOptionLabel)}
                                    className="text-slate-400 hover:text-red-500 p-0.5 cursor-pointer"
                                    title="Xóa thiết bị"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="py-8 text-center text-[11px] text-slate-400 font-bold">
                          Chưa chọn thiết bị nào.
                        </div>
                      )}
                    </div>

                    {quoteItems.length > 0 && (
                      <div className="p-3.5 border-t border-slate-100 bg-slate-50 space-y-2.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500 font-bold">Tạm tính:</span>
                          <span className="font-mono font-black text-slate-800 text-sm">{formatVND(quoteSubtotal)}</span>
                        </div>
                        <button
                          onClick={() => {
                            setActiveTab('quote');
                            setIsMiniCartOpen(false);
                          }}
                          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Thanh toán / Báo giá ngay</span>
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}
    </div>
  </header>
)}

      {/* 3. PRIMARY MENU & NAVIGATION BAR - Dynamic Theme */}
      {((webConfig.showNavBar !== false) && (
        ((webConfig.headerItems || DEFAULT_HEADER_ITEMS).filter((item: any) => item.id !== 'quote' && item.visible !== false).length > 0) ||
        (webConfig.showNavCategories !== false) ||
        (webConfig.showThemeToggle !== false)
      )) && (
        <nav className={`hidden md:block relative shadow-md z-20 ${
          webConfig.themeMode === 'dark' ? 'bg-slate-950 text-white border-b border-slate-800' : `${theme.navBg || 'bg-[#B31217]'} text-white`
        }`}>
          <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex flex-col md:flex-row md:items-center md:justify-between py-1">
            
            {/* Navigation Header: Mobile Hamburger Toggle */}
            <div className="flex items-center justify-between w-full md:w-auto">
              {/* Collapsible Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden px-4.5 py-2.5 bg-red-900 hover:bg-red-800 hover:scale-105 active:scale-95 border border-red-950/40 hover:border-red-700 text-white rounded-xl flex items-center gap-2 font-black text-xs uppercase transition-all duration-200 ease-in-out shadow-inner hover:shadow-md cursor-pointer"
                style={{ transition: 'all 0.2s ease-in-out' }}
                id="mobile-menu-toggle-btn"
              >
                <Sliders className={`w-4 h-4 text-yellow-300 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} />
                <span>{isMobileMenuOpen ? 'Đóng Menu' : 'Mở Menu'}</span>
              </button>
            </div>

            {/* Menu Items Link Group: responsive dropdown toggle list */}
            <div className={`${isMobileMenuOpen ? 'flex' : 'hidden md:flex'} flex-col md:flex-row md:items-center gap-1 w-full md:w-auto mt-2 md:mt-0 transition-all duration-300`}>
              {(webConfig.headerItems || DEFAULT_HEADER_ITEMS)
                .filter((item: any) => item.id !== 'quote' && item.visible !== false)
                .map((item: any) => {
                  let icon = null;
                  let onClickAction = () => {};
                  
                  const isCustom = !['home', 'catalog', 'advisor', 'quote', 'troubleshoot', 'news', 'order-lookup'].includes(item.id);
                  
                  if (isCustom) {
                    icon = <Globe className="w-3.5 h-3.5 text-blue-400" />;
                    onClickAction = () => {
                      if (item.url) {
                        if (item.url.startsWith('#')) {
                          const targetId = item.url.substring(1);
                          const element = document.getElementById(targetId);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        } else {
                          window.open(item.url, '_blank');
                        }
                      } else {
                        showToast(`Menu "${item.label}" chưa có đường dẫn cấu hình.`);
                      }
                      setIsMobileMenuOpen(false);
                    };
                  } else {
                    switch (item.id) {
                      case 'home':
                        icon = <Home className="w-3.5 h-3.5 text-orange-400" />;
                        onClickAction = handleGoToHomeAndReset;
                        break;
                      case 'catalog':
                        icon = <ShoppingBag className="w-3.5 h-3.5 text-blue-300" />;
                        onClickAction = () => {
                          setActiveTab('catalog');
                          setCatalogCategory('all');
                          setSelectedProduct(null);
                          setExpandedProduct(null);
                          setIsMobileMenuOpen(false);
                        };
                        break;
                      case 'advisor':
                        icon = <Sparkles className="w-3.5 h-3.5 text-orange-400 animate-pulse" />;
                        onClickAction = () => {
                          setActiveTab('advisor');
                          setIsMobileMenuOpen(false);
                        };
                        break;
                      case 'quote':
                        icon = <FileText className="w-3.5 h-3.5 text-blue-300" />;
                        onClickAction = () => {
                          setActiveTab('quote');
                          setIsMobileMenuOpen(false);
                        };
                        break;
                      case 'troubleshoot':
                        icon = <Wrench className="w-3.5 h-3.5 text-orange-400" />;
                        onClickAction = () => {
                          setActiveTab('troubleshoot');
                          setSelectedArticle(null);
                          setIsMobileMenuOpen(false);
                        };
                        break;
                      case 'news':
                        icon = <Newspaper className="w-3.5 h-3.5 text-blue-300" />;
                        onClickAction = () => {
                          setActiveTab('news');
                          setSelectedArticle(null);
                          setIsMobileMenuOpen(false);
                        };
                        break;
                      case 'order-lookup':
                        icon = <Search className="w-3.5 h-3.5 text-orange-400" />;
                        onClickAction = () => {
                          setActiveTab('order-lookup');
                          setIsMobileMenuOpen(false);
                        };
                        break;
                    }
                  }
                  
                  return (
                    <button
                      key={item.id}
                      id={`nav-${item.id}`}
                      onClick={onClickAction}
                      className={`px-4 py-3.5 text-xs font-extrabold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer border-b-2 text-left md:text-center ${
                        activeTab === item.id
                          ? 'border-orange-400 bg-blue-800 text-white'
                          : 'border-transparent hover:bg-blue-800 hover:text-white'
                      }`}
                    >
                      {icon}
                      <span>{item.label}</span>
                    </button>
                  );
                })}

              {/* Dark Mode Animated Toggle Switch */}
              {(webConfig.showThemeToggle !== false) && (
                <div className="px-4 py-3 flex items-center md:py-0 md:pl-4 border-t border-blue-600/30 md:border-t-0 md:border-l md:border-blue-600/30 self-stretch shrink-0 justify-between md:justify-center">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-100 md:hidden">Giao diện tối</span>
                  <button
                    type="button"
                    onClick={() => {
                      const newMode = webConfig.themeMode === 'dark' ? 'light' : 'dark';
                      saveWebConfig({ ...webConfig, themeMode: newMode });
                      showToast(newMode === 'dark' ? 'Đã bật chế độ Tối (Dark Mode)' : 'Đã bật chế độ Sáng (Light Mode)');
                    }}
                    className={`relative flex items-center justify-between w-16 h-8 p-1 rounded-full cursor-pointer transition-colors duration-300 shadow-inner overflow-hidden border ${
                      webConfig.themeMode === 'dark'
                        ? 'bg-slate-900 border-slate-800'
                        : 'bg-blue-600/80 border-blue-500/30'
                    }`}
                    title={webConfig.themeMode === 'dark' ? 'Chuyển sang Giao diện Sáng' : 'Chuyển sang Giao diện Tối'}
                  >
                    {/* Background icons (Stars and clouds layout) */}
                    <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none select-none opacity-80">
                      <span className="text-[10px]">🌙</span>
                      <span className="text-[10px]">☀️</span>
                    </div>

                    {/* Sliding knob using motion for beautiful physical slide animation */}
                    <motion.div
                      className="z-10 flex items-center justify-center w-6 h-6 rounded-full bg-white shadow-md text-blue-700 font-bold"
                      animate={{
                        x: webConfig.themeMode === 'dark' ? 30 : 0,
                        rotate: webConfig.themeMode === 'dark' ? 360 : 0,
                        scale: [1, 0.95, 1.05, 1]
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                        scale: { duration: 0.2 }
                      }}
                    >
                      {webConfig.themeMode === 'dark' ? (
                        <Moon className="w-3.5 h-3.5 text-slate-950 shrink-0" />
                      ) : (
                        <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      )}
                    </motion.div>
                  </button>
                </div>
              )}

            </div>
          </div>
        </nav>
      )}
        </>
      )}

      {/* 4. MAIN BANNER CAROUSEL & PROMO GRID - FPT Shop Style */}
      {activeTab === 'home' && !selectedProduct && (
        <section className="hidden md:block bg-slate-100 py-6">
          <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Promo Slider on the Left */}
              <div className="lg:col-span-8 flex flex-col gap-2">
                <div 
                  onTouchStart={handleBannerTouchStart}
                  onTouchMove={handleBannerTouchMove}
                  onTouchEnd={handleBannerTouchEnd}
                  onMouseDown={handleBannerMouseDown}
                  onMouseMove={handleBannerMouseMove}
                  onMouseUp={handleBannerMouseUp}
                  onMouseLeave={handleBannerMouseUp}
                  className="relative rounded-2xl overflow-hidden shadow-md flex flex-col justify-between min-h-[280px] md:min-h-[320px] select-none cursor-grab active:cursor-grabbing touch-pan-y group"
                >
                  <div className={`absolute inset-0 ${slides[currentSlide].imageBg} transition-all duration-1000 ease-in-out`}></div>
                  
                  {/* Slider content overlays */}
                  <div className="absolute inset-0 bg-black/35 pointer-events-none"></div>
                  
                  <div className="relative z-10 p-8 md:p-10 space-y-3 max-w-2xl text-white pointer-events-none">
                    <span className={`px-3 py-1 ${theme.primary} text-white text-[10px] font-black uppercase tracking-wider rounded-md shadow-sm`}>
                      🔥 ƯU ĐÃI SOLUTION B A O TECHNOLOGY
                    </span>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight uppercase drop-shadow-md">
                      {slides[currentSlide].title}
                    </h2>
                    <p className="text-slate-100/95 text-xs md:text-sm leading-relaxed font-medium">
                      {slides[currentSlide].subtitle}
                    </p>
                  </div>

                  {/* Slider footer navigation dots */}
                  <div className="relative z-10 p-4 px-6 flex justify-between items-center bg-black/30 backdrop-blur-xs">
                    <div className="flex gap-2 pointer-events-auto">
                      {slides.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentSlide(idx);
                          }}
                          className={`h-2.5 rounded-full transition-all cursor-pointer ${
                            currentSlide === idx ? 'bg-yellow-400 w-7' : 'bg-white/40 w-2.5'
                          }`}
                        ></button>
                      ))}
                    </div>
                    <button
                      onClick={() => setActiveTab('advisor')}
                      className={`px-4 py-1.5 ${theme.primary} ${theme.primaryHover} text-white font-extrabold text-[11px] uppercase tracking-wider rounded-lg transition-all shadow flex items-center gap-1 cursor-pointer pointer-events-auto`}
                    >
                      Nhận báo giá ngay <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* FPT Shop Style Interactive Thumbnail Banner Tabs */}
                {(() => {
                  const visibleQuickTags = (webConfig.heroQuickTags || DEFAULT_HERO_QUICK_TAGS)
                    .filter((t: HeroQuickTag) => t.isVisible !== false);

                  if (visibleQuickTags.length === 0) return null;

                  return (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      {visibleQuickTags.map((tab: HeroQuickTag, idx: number) => {
                        const targetSlideIndex = (tab.slideIndex !== undefined && tab.slideIndex >= 0)
                          ? tab.slideIndex % slides.length
                          : idx % slides.length;
                        return (
                          <button
                            key={tab.id || idx}
                            onClick={() => setCurrentSlide(targetSlideIndex)}
                            className={`p-2.5 text-left rounded-xl transition-all border cursor-pointer ${
                              currentSlide === targetSlideIndex
                                ? `bg-white ${theme.border} shadow-md ring-2 ring-slate-400/20`
                                : 'bg-white/70 hover:bg-white border-slate-200 opacity-80'
                            }`}
                          >
                            <div className={`text-xs font-black truncate ${currentSlide === targetSlideIndex ? theme.primaryText : 'text-slate-800'}`}>
                              {tab.title}
                            </div>
                            <div className="text-[10px] text-slate-500 font-bold truncate">
                              {tab.desc}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              {/* Dynamic Promo Banners on the Right (2 Hero Side Banners) */}
              <div className="lg:col-span-4 flex flex-col gap-3">
                {(() => {
                  const sideBannersToRender = (webConfig.heroSideBanners && webConfig.heroSideBanners.length > 0)
                    ? webConfig.heroSideBanners.filter((b: HeroSideBanner) => b.isVisible !== false)
                    : DEFAULT_HERO_SIDE_BANNERS;

                  const renderHeroSideIcon = (iconType?: string) => {
                    switch (iconType) {
                      case 'cpu': return <Cpu className="w-32 h-32" />;
                      case 'truck': return <Truck className={`w-32 h-32 ${theme.primaryText}`} />;
                      case 'shield': return <ShieldCheck className="w-32 h-32" />;
                      case 'zap': return <Zap className="w-32 h-32" />;
                      case 'wrench': return <Wrench className="w-32 h-32" />;
                      case 'headphones': return <Headphones className="w-32 h-32" />;
                      default: return null;
                    }
                  };

                  return sideBannersToRender.map((banner: HeroSideBanner, index: number) => {
                    const isImageBg = banner.bgType === 'image' || (banner.imageUrl && banner.imageUrl.length > 0);
                    const isColorBg = banner.bgType === 'color' && banner.customBgColor;

                    const containerStyle: React.CSSProperties = {};
                    if (isImageBg && banner.imageUrl) {
                      containerStyle.backgroundImage = `url(${banner.imageUrl})`;
                      containerStyle.backgroundSize = 'cover';
                      containerStyle.backgroundPosition = 'center';
                    } else if (isColorBg && banner.customBgColor) {
                      containerStyle.backgroundColor = banner.customBgColor;
                    }

                    const badgeStyle: React.CSSProperties = banner.badgeColor ? { color: banner.badgeColor } : {};
                    const titleStyle: React.CSSProperties = banner.titleColor ? { color: banner.titleColor } : {};
                    const descStyle: React.CSSProperties = banner.descColor ? { color: banner.descColor } : {};
                    const buttonStyle: React.CSSProperties = banner.buttonColor ? { color: banner.buttonColor } : {};

                    return (
                      <div
                        key={banner.id || index}
                        style={containerStyle}
                        className={`p-5 rounded-2xl shadow-md flex flex-col justify-between h-[170px] relative overflow-hidden group border border-slate-200/50 ${
                          !isImageBg && !isColorBg
                            ? `bg-gradient-to-br ${banner.bgGradient || (index === 0 ? 'from-[#CD1818] to-[#900E12]' : 'from-blue-600 to-indigo-800')} text-white`
                            : 'bg-white'
                        }`}
                      >
                        {isImageBg && (
                          <div
                            className="absolute inset-0 bg-black pointer-events-none z-0"
                            style={{ opacity: (banner.overlayOpacity ?? 40) / 100 }}
                          />
                        )}

                        {banner.iconType !== 'none' && (
                          <div className="absolute -right-8 -bottom-8 opacity-20 transition-transform group-hover:scale-110 duration-500 pointer-events-none z-0">
                            {renderHeroSideIcon(banner.iconType)}
                          </div>
                        )}

                        <div className="space-y-1 z-10">
                          <div
                            style={badgeStyle}
                            className={`text-[10px] font-black uppercase tracking-wider ${!banner.badgeColor ? (banner.bgType === 'color' && banner.customBgColor === '#ffffff' ? theme.primaryText : 'text-yellow-300') : ''}`}
                          >
                            {banner.badge}
                          </div>
                          <h3
                            style={titleStyle}
                            className={`text-base font-black uppercase line-clamp-1 ${!banner.titleColor ? (banner.bgType === 'color' && banner.customBgColor === '#ffffff' ? 'text-slate-900' : 'text-white') : ''}`}
                          >
                            {banner.title}
                          </h3>
                          <p
                            style={descStyle}
                            className={`text-[11px] leading-snug line-clamp-2 ${!banner.descColor ? (banner.bgType === 'color' && banner.customBgColor === '#ffffff' ? 'text-slate-500' : 'text-slate-100') : ''}`}
                          >
                            {banner.description}
                          </p>
                        </div>

                        <button
                          onClick={() => setActiveTab(banner.actionTab || 'troubleshoot')}
                          style={buttonStyle}
                          className={`text-xs font-black flex items-center gap-1 z-10 transition-colors mt-2 text-left cursor-pointer ${!banner.buttonColor ? (banner.bgType === 'color' && banner.customBgColor === '#ffffff' ? `${theme.primaryText} ${theme.primaryTextHover}` : 'text-yellow-300 hover:text-white') : ''}`}
                        >
                          <span>{banner.buttonText}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            {/* FPT Shop Style Service Commitments Bar */}
            {(() => {
              const visibleBadges = (webConfig.serviceBadges || DEFAULT_SERVICE_BADGES)
                .filter((b: ServiceBadgeItem) => b.isVisible !== false);

              if (visibleBadges.length === 0) return null;

              const renderBadgeIcon = (iconName: string) => {
                switch (iconName) {
                  case 'truck': return <Truck className={`w-6 h-6 ${theme.primaryText}`} />;
                  case 'shield': return <ShieldCheck className={`w-6 h-6 ${theme.primaryText}`} />;
                  case 'credit-card': return <CreditCard className={`w-6 h-6 ${theme.primaryText}`} />;
                  case 'wrench': return <Wrench className={`w-6 h-6 ${theme.primaryText}`} />;
                  case 'headphones': return <Headphones className={`w-6 h-6 ${theme.primaryText}`} />;
                  case 'zap': return <Zap className={`w-6 h-6 ${theme.primaryText}`} />;
                  case 'phone': return <Phone className={`w-6 h-6 ${theme.primaryText}`} />;
                  case 'check-circle': return <CheckCircle className={`w-6 h-6 ${theme.primaryText}`} />;
                  default: return <Truck className={`w-6 h-6 ${theme.primaryText}`} />;
                }
              };

              return (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-sm text-slate-800">
                  {visibleBadges.map((item: ServiceBadgeItem, i: number) => (
                    <button
                      key={item.id || i}
                      type="button"
                      onClick={() => setActiveServiceBadgeModal(item)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-blue-100 transition-all cursor-pointer text-left group"
                      title="Bấm để xem chi tiết cam kết dịch vụ"
                    >
                      <div className={`p-2.5 ${theme.lightBg} rounded-xl shrink-0 group-hover:scale-110 group-hover:bg-blue-100 transition-all`}>
                        {renderBadgeIcon(item.icon)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-black text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                          <span>{item.title}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                        </div>
                        <div className="text-[10px] text-slate-500 font-bold truncate">{item.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              );
            })()}

            {/* DANH MỤC NỔI BẬT DƯỚI BANNER (MATCHES USER SCREENSHOT) */}
            {webConfig.showFeaturedCategories !== false && (
              <FeaturedCategoriesSection
                categories={mainCategories}
                products={products}
                title={webConfig.featuredCategoriesTitle || 'Danh mục nổi bật'}
                autoSlide={false}
                slideIntervalSeconds={webConfig.featuredCategoriesSlideInterval || 20}
                onSelectCategory={(catId) => {
                  setActiveTab('catalog');
                  setCatalogCategory(catId);
                  window.scrollTo({ top: 380, behavior: 'smooth' });
                }}
              />
            )}
          </div>
        </section>
      )}

      {/* 5. MAIN CONTENT FRAMEWORK (Classic Layout with Category Sidebar + Product Grid) */}
      <main className={`flex-1 w-full z-10 flex flex-col min-h-0 ${
        activeTab === 'admin'
          ? 'max-w-none px-0 py-0 h-auto md:h-[calc(100vh-110px)] min-h-[calc(100vh-140px)] md:min-h-0 overflow-y-auto md:overflow-hidden'
          : activeTab === 'landing'
          ? 'max-w-none px-0 py-0 w-full min-h-screen flex'
          : 'hidden md:flex max-w-7xl mx-auto px-4 md:px-8 py-8 gap-8'
      }`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedProduct ? `prod-${selectedProduct.id}` : `tab-${activeTab}-${catalogCategory}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full flex-1 ${activeTab === 'admin' ? 'h-full min-h-0 flex flex-col' : ''}`}
          >
            {selectedProduct ? (
              renderDedicatedProductPage(selectedProduct)
            ) : (
              <>
        
        
        {/* -------------------- TAB VIEW 0: HOME PAGE (TRANG CHỦ SOLUTION B A O TECHNOLOGY) -------------------- */}
        {activeTab === 'home' && (
          <div className="hidden md:block space-y-12 animate-fade-in text-left">
            
            {/* 1. HOT CAMPAIGN SLOW MARQUEE / ALERT BAR */}
            {webConfig.promoBarActive !== false && (
              <div className={`bg-gradient-to-r ${webConfig.promoBarBgGradient || 'from-[#CD1818] via-amber-500 to-[#900E12]'} text-white rounded-2xl p-3 md:p-4 shadow-lg flex flex-col md:flex-row items-center justify-between gap-3 overflow-hidden relative border border-amber-400/40`}>
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.15)_50%,transparent_75%)] bg-[length:250px_250px] animate-[shimmer_3s_infinite_linear]" style={{ backgroundSize: '1000px 100%' }}></div>
                <div className="flex items-center gap-3 relative z-10">
                  <span className="px-2.5 py-1 bg-yellow-400 text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-lg animate-pulse shrink-0 shadow">
                    {webConfig.promoBarBadge || "SIÊU KHUYẾN MÃI"}
                  </span>
                  <p className="text-xs md:text-sm font-black uppercase tracking-tight text-center md:text-left leading-relaxed text-white drop-shadow">
                    {webConfig.promoBarText || "💥 TUẦN LỄ VÀNG: GIẢM ĐẾN 45% + TẶNG PHẦN MỀM CHẤM CÔNG TRỌN ĐỜI"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('advisor');
                    handleSendAiMessage(webConfig.promoBarActionPrompt || "Tư vấn cho tôi các dòng máy chấm công và máy in bill đang được giảm giá cực sốc trong tuần lễ vàng.");
                  }}
                  className="px-4.5 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-[11px] uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0 relative z-10 cursor-pointer border border-yellow-300"
                >
                  {webConfig.promoBarBtnText || "Nhận tư vấn ngay"}
                </button>
              </div>
            )}

            {/* 3. DYNAMIC GIỜ VÀNG FLASH SALE (FPT SHOP RED SIGNATURE COUNTDOWN BOX) */}
            {webConfig.flashSaleActive !== false && (
              <div className="bg-gradient-to-r from-[#B31217] via-[#CD1818] to-[#900E12] rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden border-2 border-yellow-400/40 group/flashsale">
                <div className="absolute -top-10 -right-10 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-red-400/30 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/20 mb-6 relative z-10">
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 bg-yellow-400 text-slate-950 rounded-2xl shadow-xl animate-bounce">
                      <Zap className="w-7 h-7 text-slate-950 fill-slate-950 animate-pulse" />
                    </div>
                    <div className="text-left space-y-1">
                      <h4 className="text-2xl md:text-3xl font-black text-yellow-300 uppercase tracking-tight flex items-center gap-2 drop-shadow-md">
                        {webConfig.flashSaleTitle || "⚡ GIỜ VÀNG FLASH SALE GIÁ SỐC"}
                      </h4>
                      <p className="text-xs md:text-sm text-amber-100 font-extrabold uppercase tracking-wider">
                        {webConfig.flashSaleSubtitle || "Khuyến mãi kết thúc sau:"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 font-mono font-black text-lg md:text-xl text-yellow-300 bg-black/30 p-2 rounded-2xl border border-yellow-400/30 shadow-inner">
                    <span className="bg-slate-950 px-3 py-1.5 rounded-xl border border-yellow-400/40 text-yellow-300 shadow font-mono text-xl">{String(promoCountdown.hours).padStart(2, '0')}</span>
                    <span className="text-yellow-400 animate-pulse font-sans">:</span>
                    <span className="bg-slate-950 px-3 py-1.5 rounded-xl border border-yellow-400/40 text-yellow-300 shadow font-mono text-xl">{String(promoCountdown.minutes).padStart(2, '0')}</span>
                    <span className="text-yellow-400 animate-pulse font-sans">:</span>
                    <span className="bg-slate-950 px-3 py-1.5 rounded-xl border border-yellow-400/40 text-yellow-300 shadow font-mono text-xl">{String(promoCountdown.seconds).padStart(2, '0')}</span>
                  </div>
                </div>

                {/* Left/Right manual slide controls for desktop */}
                <div className="absolute left-3 top-[60%] -translate-y-1/2 z-20 opacity-0 group-hover/flashsale:opacity-100 transition-opacity pointer-events-none hidden sm:block">
                  <button
                    onClick={() => {
                      flashSaleContainerRef.current?.scrollBy({ left: -260, behavior: 'smooth' });
                    }}
                    className="p-3 rounded-full border border-red-500/20 bg-white/95 hover:bg-white shadow-xl text-red-600 hover:text-red-700 transition-all hover:scale-110 active:scale-95 cursor-pointer pointer-events-auto animate-fade-in"
                    title="Trượt sang trái"
                  >
                    <ChevronLeft className="w-5 h-5 font-black text-red-600" />
                  </button>
                </div>
                <div className="absolute right-3 top-[60%] -translate-y-1/2 z-20 opacity-0 group-hover/flashsale:opacity-100 transition-opacity pointer-events-none hidden sm:block">
                  <button
                    onClick={() => {
                      flashSaleContainerRef.current?.scrollBy({ left: 260, behavior: 'smooth' });
                    }}
                    className="p-3 rounded-full border border-red-500/20 bg-white/95 hover:bg-white shadow-xl text-red-600 hover:text-red-700 transition-all hover:scale-110 active:scale-95 cursor-pointer pointer-events-auto animate-fade-in"
                    title="Trượt sang phải"
                  >
                    <ChevronRight className="w-5 h-5 font-black text-red-600" />
                  </button>
                </div>

                {/* Left/Right manual slide controls for mobile */}
                <div className="flex sm:hidden justify-end gap-2 mb-3 -mt-2 relative z-10">
                  <button
                    onClick={() => flashSaleContainerRef.current?.scrollBy({ left: -190, behavior: 'smooth' })}
                    className="p-1.5 rounded-lg bg-black/30 hover:bg-black/50 text-white text-xs flex items-center justify-center cursor-pointer active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={() => flashSaleContainerRef.current?.scrollBy({ left: 190, behavior: 'smooth' })}
                    className="p-1.5 rounded-lg bg-black/30 hover:bg-black/50 text-white text-xs flex items-center justify-center cursor-pointer active:scale-95"
                  >
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                </div>

                <div 
                  ref={flashSaleContainerRef}
                  onMouseEnter={() => setIsFlashSaleHovered(true)}
                  onMouseLeave={() => setIsFlashSaleHovered(false)}
                  onTouchStart={() => setIsFlashSaleHovered(true)}
                  onTouchEnd={() => setIsFlashSaleHovered(false)}
                  className="flex overflow-x-auto pt-3.5 pb-4 gap-4 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth snap-x snap-mandatory scrollbar-none items-stretch select-none"
                >
                  {promoProducts.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-slate-300 font-bold bg-white/5 border border-dashed border-white/20 rounded-2xl w-full">
                      Hiện không có chương trình khuyến mãi nào khả dụng.
                    </div>
                  ) : (
                    promoProducts.slice(0, 10).map((p) => (
                      <div key={p.id} className="w-[190px] sm:w-[245px] shrink-0 snap-start flex items-stretch">
                        {renderProductCard(p, true)}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* 4. PARALLEL SOLUTION BENTO BANNERS (2 BANNER TRƯỢT NGANG, 20S TRƯỢT 1 LẦN, BỎ CHỮ Ở TRÊN) */}
            {(() => {
              const visibleList = solutionBanners.filter(b => b.isVisible);
              if (visibleList.length === 0) return null;

              const isMobileView = typeof window !== 'undefined' && window.innerWidth < 768;
              const step = isMobileView ? 1 : 2;
              const maxIndex = isMobileView ? Math.max(0, visibleList.length - 1) : Math.max(0, visibleList.length - 2);

              const handlePrevBanner = () => {
                setSolutionBannerSlideIndex((prev) => {
                  const next = prev - step;
                  return next < 0 ? maxIndex : next;
                });
              };

              const handleNextBanner = () => {
                setSolutionBannerSlideIndex((prev) => {
                  const next = prev + step;
                  return next > maxIndex ? 0 : next;
                });
              };

              let tStartX = 0;

              return (
                <div 
                  className="space-y-2.5 relative group/banner-carousel text-left select-none"
                  onMouseEnter={() => setIsSolutionBannerHovered(true)}
                  onMouseLeave={() => setIsSolutionBannerHovered(false)}
                  onTouchStart={(e) => {
                    setIsSolutionBannerHovered(true);
                    tStartX = e.touches[0].clientX;
                  }}
                  onTouchEnd={(e) => {
                    setIsSolutionBannerHovered(false);
                    const diff = e.changedTouches[0].clientX - tStartX;
                    if (Math.abs(diff) > 40) {
                      if (diff < 0) handleNextBanner();
                      else handlePrevBanner();
                    }
                  }}
                >
                  {/* Carousel Container: Shows 2 banners on desktop, slides 2 banners at a time */}
                  <div className="overflow-hidden rounded-3xl relative shadow-sm border border-slate-200/80">
                    <div
                      className="flex transition-transform duration-700 ease-out -mx-2.5"
                      style={{
                        transform: isMobileView 
                          ? `translateX(-${solutionBannerSlideIndex * 100}%)` 
                          : `translateX(-${solutionBannerSlideIndex * 50}%)`
                      }}
                    >
                      {visibleList.map((banner, bIdx) => {
                        const renderIcon = () => {
                          switch (banner.iconType) {
                            case 'fingerprint': return <Fingerprint className="w-40 h-40" />;
                            case 'shopping-bag': return <ShoppingBag className="w-40 h-40" />;
                            case 'shield': return <ShieldCheck className="w-40 h-40" />;
                            case 'zap': return <Zap className="w-40 h-40" />;
                            case 'sparkles': return <Sparkles className="w-40 h-40" />;
                            case 'printer': return <Printer className="w-40 h-40" />;
                            default: return null;
                          }
                        };

                        const isImageBg = banner.bgType === 'image' || (banner.imageUrl && banner.imageUrl.length > 0);
                        const isColorBg = banner.bgType === 'color' && banner.customBgColor;

                        const containerStyle: React.CSSProperties = {};
                        if (isImageBg && banner.imageUrl) {
                          containerStyle.backgroundImage = `url(${banner.imageUrl})`;
                          containerStyle.backgroundSize = 'cover';
                          containerStyle.backgroundPosition = 'center';
                        } else if (isColorBg && banner.customBgColor) {
                          containerStyle.backgroundColor = banner.customBgColor;
                        }

                        const textStyle: React.CSSProperties = banner.textColor ? { color: banner.textColor } : {};
                        const badgeStyle: React.CSSProperties = banner.badgeTextColor ? { color: banner.badgeTextColor } : {};
                        const buttonStyle: React.CSSProperties = banner.buttonTextColor ? { color: banner.buttonTextColor } : {};

                        return (
                          <div 
                            key={banner.id || bIdx}
                            className="w-full md:w-1/2 shrink-0 px-2.5 flex"
                          >
                            <div 
                              style={containerStyle}
                              className={`p-6 rounded-3xl shadow-lg relative overflow-hidden group min-h-[220px] w-full flex flex-col justify-between ${
                                !isImageBg && !isColorBg 
                                   ? `bg-gradient-to-br ${banner.bgGradient || 'from-blue-600 to-indigo-800 text-white'}` 
                                   : 'text-white'
                              }`}
                            >
                              {/* Dark overlay for readability if background is an image */}
                              {isImageBg && (
                                <div 
                                  className="absolute inset-0 bg-black pointer-events-none z-0" 
                                  style={{ opacity: (banner.overlayOpacity ?? 40) / 100 }} 
                                />
                              )}

                              {banner.iconType !== 'none' && (
                                <div className="absolute -right-8 -bottom-8 opacity-15 group-hover:scale-110 transition-transform duration-500 pointer-events-none z-0">
                                  {renderIcon()}
                                </div>
                              )}

                              <div className="space-y-2 max-w-md relative z-10" style={textStyle}>
                                {banner.badge && (
                                  <span 
                                    style={badgeStyle}
                                    className={`px-2.5 py-0.5 text-[9px] font-black uppercase rounded-md tracking-wider inline-block shadow-xs ${banner.badgeBg || 'bg-orange-400 text-slate-950'}`}
                                  >
                                    {banner.badge}
                                  </span>
                                )}
                                <h4 className="text-base sm:text-lg font-black uppercase tracking-tight leading-tight">{banner.title}</h4>
                                <p className="text-slate-100/90 text-[11px] sm:text-xs leading-relaxed" style={textStyle}>
                                  {banner.description}
                                </p>
                                <div>
                                  <button
                                    type="button"
                                    onClick={() => handleSolutionBannerClick(banner)}
                                    style={buttonStyle}
                                    className={`mt-2.5 px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow cursor-pointer inline-flex items-center gap-1.5 active:scale-95 hover:scale-105 ${banner.buttonBg || 'bg-yellow-400 text-slate-950 hover:bg-yellow-300'}`}
                                  >
                                    <span>{banner.buttonText}</span>
                                    <ChevronRight className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Navigation Arrows on Left and Right (Chỉ hiện khi rê chuột vô) */}
                    {visibleList.length > (isMobileView ? 1 : 2) && (
                      <>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrevBanner();
                          }}
                          className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-slate-900 shadow-2xl border-2 border-slate-200/90 transition-all flex items-center justify-center hover:scale-110 active:scale-90 cursor-pointer z-30 backdrop-blur-md ${
                            isSolutionBannerHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                          } group-hover/banner-carousel:opacity-100 group-hover/banner-carousel:pointer-events-auto group duration-300`}
                          title="Trượt sang trái xem banner trước"
                          aria-label="Trượt banner trước"
                        >
                          <ChevronLeft className="w-6 h-6 stroke-[3] text-slate-800 group-hover:text-blue-600 transition-colors" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNextBanner();
                          }}
                          className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-slate-900 shadow-2xl border-2 border-slate-200/90 transition-all flex items-center justify-center hover:scale-110 active:scale-90 cursor-pointer z-30 backdrop-blur-md ${
                            isSolutionBannerHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                          } group-hover/banner-carousel:opacity-100 group-hover/banner-carousel:pointer-events-auto group duration-300`}
                          title="Trượt sang phải xem 2 banner tiếp theo"
                          aria-label="Trượt banner tiếp theo"
                        >
                          <ChevronRight className="w-6 h-6 stroke-[3] text-slate-800 group-hover:text-blue-600 transition-colors" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Clean Dot Indicators for 2-at-a-time slide */}
                  {visibleList.length > (isMobileView ? 1 : 2) && (() => {
                    const totalPages = isMobileView ? visibleList.length : Math.ceil(visibleList.length / 2);
                    const currentPage = isMobileView ? solutionBannerSlideIndex : Math.floor(solutionBannerSlideIndex / 2);
                    return (
                      <div className="flex items-center justify-center gap-1.5 pt-1">
                        {Array.from({ length: totalPages }).map((_, pageIdx) => {
                          const targetIndex = isMobileView ? pageIdx : pageIdx * 2;
                          const isActive = pageIdx === currentPage;
                          return (
                            <button
                              key={pageIdx}
                              type="button"
                              onClick={() => setSolutionBannerSlideIndex(Math.min(targetIndex, maxIndex))}
                              className={`h-2 rounded-full transition-all cursor-pointer ${
                                isActive 
                                  ? 'w-7 bg-blue-600 shadow-xs' 
                                  : 'w-2 bg-slate-300 hover:bg-slate-400'
                              }`}
                              title={`Trang banner ${pageIdx + 1}`}
                            />
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
              );
            })()}

            {/* 5. BESTSELLERS TABBED SHOWROOM (TAB FILTERS ON THE FLY) */}
            <div className="space-y-6" id="home-bestseller-showroom">
              <div className="border-b border-slate-200/80 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col text-left gap-1">
                  <h4 className="text-sm font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                    <Sparkles className="w-4.5 h-4.5 text-blue-600 animate-pulse" />
                    <span>⭐ SẢN PHẨM NỔI BẬT</span>
                  </h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Danh sách sản phẩm nổi bật được khách hàng quan tâm và lựa chọn nhiều nhất</p>
                </div>
              </div>

              {/* Combined Dynamic Category Filter Cards Grid (with Horizontal Scroll and Auto-scroll) */}
              <div className="relative group/bestseller">
                {/* Manual trượt controls */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 z-10 opacity-0 group-hover/bestseller:opacity-100 transition-opacity pointer-events-none">
                  <button
                    onClick={() => {
                      bestsellerContainerRef.current?.scrollBy({ left: -220, behavior: 'smooth' });
                    }}
                    className="p-2 rounded-full border border-slate-200 bg-white shadow-md text-slate-500 hover:text-slate-800 transition-all hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto"
                    title="Trượt sang trái"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 z-10 opacity-0 group-hover/bestseller:opacity-100 transition-opacity pointer-events-none">
                  <button
                    onClick={() => {
                      bestsellerContainerRef.current?.scrollBy({ left: 220, behavior: 'smooth' });
                    }}
                    className="p-2 rounded-full border border-slate-200 bg-white shadow-md text-slate-500 hover:text-slate-800 transition-all hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto"
                    title="Trượt sang phải"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div 
                  ref={bestsellerContainerRef}
                  onMouseEnter={() => setIsBestsellerHovered(true)}
                  onMouseLeave={() => setIsBestsellerHovered(false)}
                  onTouchStart={() => setIsBestsellerHovered(true)}
                  onTouchEnd={() => setIsBestsellerHovered(false)}
                  className="flex items-stretch gap-3 overflow-x-auto pt-3 pb-4 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth select-none"
                >
                  {bestsellerCategories.map((cat) => {
                    const isActive = homeTab === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setHomeTab(cat.id)}
                        className={`border rounded-2xl p-4 text-center transition-all cursor-pointer group flex flex-col items-center justify-between gap-2.5 shadow-sm active:scale-[0.98] duration-300 shrink-0 w-[calc(50%-6px)] sm:w-[130px] ${
                          isActive
                            ? `bg-gradient-to-br ${cat.bg} border-transparent ring-2 ring-offset-2 ring-blue-500 scale-[1.02] shadow-md`
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <div className={`p-2.5 rounded-full shadow-inner group-hover:scale-110 transition-transform duration-300 ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-50 text-slate-600 border border-slate-100'
                        }`}>
                          {cat.icon}
                        </div>
                        <div className="space-y-0.5">
                          <div className={`text-[10px] font-black tracking-tight leading-snug break-words ${isActive ? 'text-white' : 'text-slate-800'}`}>
                            {cat.label}
                          </div>
                          <div className={`text-[8px] font-bold font-mono uppercase tracking-wider ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                            {cat.count}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {(() => {
                  if (homeTab === 'featured') {
                    // Tất cả sản phẩm nổi bật - chỉ hiển thị mặc định 10 sản phẩm, bấm xem thêm mới sổ hết ra ngay trên trang chủ
                    const displayList = showAllFeatured ? allBestsellersList : allBestsellersList.slice(0, 10);
                    return displayList.map((p) => renderProductCard(p, false));
                  } else {
                    // Khi chọn từng danh mục: Lọc sản phẩm nổi bật của danh mục đó (hiển thị 10 sản phẩm đầu tiên)
                    const catPopular = products.filter(
                      (p) =>
                        (p.isPopular === true || p.isFeatured === true) &&
                        (p.category === homeTab || p.subCategoryId === homeTab)
                    );
                    const catList = catPopular.length > 0
                      ? catPopular
                      : products.filter((p) => p.category === homeTab || p.subCategoryId === homeTab);
                    const displayList = catList.slice(0, 10);
                    return displayList.map((p) => renderProductCard(p, false));
                  }
                })()}
              </div>

              {/* Dòng xem thêm sản phẩm: */}
              {/* TRƯỜNG HỢP 1: Tab "Tất cả nổi bật" -> Khách bấm xem thêm thì sổ ra thêm ngay tại trang chủ */}
              {homeTab === 'featured' && allBestsellersList.length > 10 && (
                <div className="pt-2 flex justify-center">
                  {!showAllFeatured ? (
                    <button
                      type="button"
                      onClick={() => setShowAllFeatured(true)}
                      className="px-6 py-2.5 bg-white hover:bg-blue-50 text-blue-600 hover:text-blue-700 font-extrabold text-xs sm:text-sm rounded-xl border border-blue-200 hover:border-blue-300 shadow-xs transition-all flex items-center gap-2 cursor-pointer active:scale-95 group"
                    >
                      <span>Xem thêm {allBestsellersList.length - 10} sản phẩm nổi bật</span>
                      <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setShowAllFeatured(false);
                        const el = document.getElementById('home-bestseller-showroom');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <span>Thu gọn (Hiển thị 10 sản phẩm)</span>
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}

              {/* TRƯỜNG HỢP 2: Khách xem ở bên danh mục chứa sản phẩm nổi bật -> Bấm xem thêm sẽ chuyển qua trang chứa sản phẩm đó */}
              {homeTab !== 'featured' && (() => {
                const currentCatObj = bestsellerCategories.find((c) => c.id === homeTab);
                const currentCatName = currentCatObj?.label || 'danh mục này';
                const catPopular = products.filter(
                  (p) =>
                    (p.isPopular === true || p.isFeatured === true) &&
                    (p.category === homeTab || p.subCategoryId === homeTab)
                );
                const totalInCat = catPopular.length > 0
                  ? catPopular.length
                  : products.filter((p) => p.category === homeTab || p.subCategoryId === homeTab).length;

                return (
                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setCatalogCategory(homeTab);
                        setCatalogSubCategory('all');
                        setSelectedProduct(null);
                        setActiveTab('catalog');
                        window.scrollTo({ top: 380, behavior: 'smooth' });
                        showToast(`Đang chuyển đến trang danh mục: ${currentCatName}`);
                      }}
                      className="px-7 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 cursor-pointer active:scale-95 group"
                    >
                      <span>
                        Xem thêm tất cả {totalInCat} sản phẩm {currentCatName}
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </button>
                  </div>
                );
              })()}
            </div>

            {/* 5B. BỐ CỤC "COMBO TRỌN BỘ / GIẢI PHÁP TIẾT KIỆM" (BUNDLE & SAVE) */}
            <ComboBundlesSection
              bundles={comboBundles}
              products={products}
              onAddBundleToQuote={handleAddBundleToQuote}
              onOpenProductModal={(prodId) => {
                const p = products.find((x) => x.id === prodId)
                  || products.find((x) => x.name.toLowerCase().includes(prodId.toLowerCase()));
                if (p) {
                  handleViewProductDetails(p);
                }
              }}
              onConsultBundle={handleConsultBundle}
              formatVND={formatVND}
              showcaseConfig={comboShowcaseConfig}
            />

            {/* 5C. SẢN PHẨM ĐÃ XEM (RECENTLY VIEWED PRODUCTS SHOWROOM) */}
            {viewedProducts.length > 0 && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-5 text-left" id="viewed-products-section">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 border border-blue-100 shadow-2xs">
                      <Eye className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h4 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                          <span>👁️ SẢN PHẨM ĐÃ XEM</span>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-mono font-black rounded-full">
                            {viewedProducts.length}
                          </span>
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400 font-medium">
                        Danh sách các sản phẩm bạn vừa xem gần đây — Dễ dàng xem lại và so sánh
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleClearViewedProducts}
                      className="text-xs font-bold text-slate-500 hover:text-red-600 transition-colors flex items-center gap-1.5 cursor-pointer px-3 py-1.5 rounded-xl hover:bg-red-50 border border-slate-200 hover:border-red-200"
                      title="Xóa toàn bộ lịch sử xem"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xóa lịch sử</span>
                    </button>
                  </div>
                </div>

                {/* Slider / Grid các sản phẩm đã xem */}
                <div className="flex gap-4 overflow-x-auto pb-2 pt-1 scrollbar-thin">
                  {viewedProducts.map((p) => {
                    const hasDisc = p.originalPrice > p.price;
                    return (
                      <div
                        key={p.id}
                        onClick={() => handleViewProductDetails(p)}
                        className="w-48 sm:w-52 shrink-0 bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 p-3 flex flex-col justify-between shadow-xs hover:shadow-md transition-all cursor-pointer group relative text-left"
                      >
                        <button
                          type="button"
                          onClick={(e) => handleRemoveViewedProduct(p.id, e)}
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-600 flex items-center justify-center transition-colors z-10"
                          title="Xóa khỏi danh sách đã xem"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>

                        <div>
                          <div className="w-full h-32 bg-slate-50 rounded-xl overflow-hidden p-2 flex items-center justify-center relative mb-2.5 group-hover:bg-blue-50/20 transition-colors border border-slate-100">
                            <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-slate-900 text-white text-[7.5px] font-black uppercase rounded flex items-center gap-1 shadow-2xs border border-slate-700">
                              <Eye className="w-2.5 h-2.5 text-blue-400" />
                              <span>ĐÃ XEM</span>
                            </span>
                            {p.image ? (
                              <img src={p.image} alt={p.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                            ) : (
                              <div className="text-slate-300 font-bold text-xs">{p.name.substring(0, 2)}</div>
                            )}
                          </div>
                          <span className="text-[8.5px] font-black text-blue-600 uppercase tracking-wider block mb-1">
                            {p.categoryLabel}
                          </span>
                          <h5 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 h-8 leading-snug">
                            {p.name}
                          </h5>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <div className="text-xs sm:text-sm font-black text-red-600 font-mono">
                              {formatVND(p.price)}
                            </div>
                            {hasDisc && (
                              <div className="text-[9px] text-slate-400 line-through font-mono">
                                {formatVND(p.originalPrice)}
                              </div>
                            )}
                          </div>
                          <span className="px-2.5 py-1 bg-blue-600 group-hover:bg-blue-700 text-white font-extrabold text-[9px] uppercase tracking-wider rounded-lg transition-colors">
                            Xem lại
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 6. TRUSTED PARTNERS LOGO STRIP */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 overflow-hidden space-y-4">
              <div className="text-center">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">
                  Đối tác ủy quyền chính thức & Hỗ trợ tài chính
                </span>
              </div>
              
              {/* Marquee Container with fade gradient masks on sides */}
              <div className="relative w-full overflow-hidden">
                {/* Left/Right fading edges for professional layout */}
                <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
                
                {/* Rolling container */}
                <div className="flex gap-4 sm:gap-6 w-max animate-marquee py-2 hover:[animation-play-state:paused]">
                  {(() => {
                    const baseBrands = webConfig.partners || ['ZKTeco', 'Ronald Jack', 'Xprinter', 'Epson', 'Honeywell', 'Zebra', 'MB Bank'];
                    // Triple the array to ensure seamless marquee wrapping even on 4K screens
                    const repeatedBrands = [...baseBrands, ...baseBrands, ...baseBrands, ...baseBrands];
                    return repeatedBrands.map((brand: string, idx: number) => (
                      <div 
                        key={`${brand}-${idx}`} 
                        className="skew-x-[-8deg] rounded-xl border border-slate-250 bg-white hover:border-blue-500 hover:bg-blue-50/10 px-5 py-2.5 transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex items-center justify-center shrink-0 min-w-[120px] sm:min-w-[140px] text-center font-mono cursor-pointer"
                        title={`Đối tác chính thức: ${brand}`}
                      >
                        <span className="skew-x-[8deg] text-[11px] sm:text-xs font-black text-slate-600 hover:text-blue-600 uppercase tracking-tight">
                          {brand}
                        </span>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>

            {/* 7. CUSTOMER TESTIMONIALS & TRUST BADGES */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
              {[
                { title: 'CAM KẾT CHÍNH HÃNG 100%', desc: 'Sản phẩm có đầy đủ CO, CQ, nhập khẩu nguyên chiếc bảo hành chính hãng uy tín.', icon: <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto" /> },
                { title: 'LẮP ĐẶT 2H HỎA TỐC', desc: 'Đội ngũ kỹ thuật viên lắp đặt tận nơi nội thành TP.HCM chỉ trong 2-4 tiếng cực nhanh.', icon: <Truck className="w-8 h-8 text-blue-600 mx-auto" /> },
                { title: 'MIỄN PHÍ CÀI PHẦN MỀM', desc: 'Phần mềm chấm công tiếng Việt, cài đặt Driver máy in vận đơn trọn đời hoàn toàn miễn phí.', icon: <Wrench className="w-8 h-8 text-orange-500 mx-auto" /> },
                { title: 'TƯ VẤN THIẾT KẾ TRỌN GÓI', desc: 'Đội ngũ chuyên viên tư vấn thiết kế trọn gói giải pháp bán hàng & chấm công tối ưu chi phí.', icon: <Sparkles className="w-8 h-8 text-amber-500 mx-auto" /> },
              ].map((badge, idx) => (
                <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-2 hover:shadow-md transition-shadow">
                  {badge.icon}
                  <h5 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-tight">{badge.title}</h5>
                  <p className="text-[10px] text-slate-400 font-medium leading-relaxed">{badge.desc}</p>
                </div>
              ))}
            </div>

            {/* 7.5. DIRECT CONSULTATION CALLBACK FORM (Gom data khách hàng bận rộn) */}
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-800/40 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden text-left">
              <div className="absolute -right-16 -top-16 opacity-10 pointer-events-none">
                <Sliders className="w-56 h-56 text-blue-400" />
              </div>
              <div className="absolute -left-10 -bottom-10 opacity-15 pointer-events-none">
                <CheckCircle className="w-44 h-44 text-emerald-400" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Left text intro column */}
                <div className="lg:col-span-5 space-y-4">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-black uppercase tracking-wider rounded-lg inline-block">
                    ⚡ DÀNH CHO KHÁCH HÀNG BẬN RỘN
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                    Không Có Thời Gian Chọn Lọc? Để Lại Yêu Cầu Tư Vấn Ngay!
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Đội ngũ chuyên viên kỹ thuật SOLUTION B A O sẽ gọi lại hỗ trợ giải pháp và báo giá chiết khấu hỏa tốc cho bạn sau <span className="text-amber-400 font-extrabold font-mono">10 - 15 phút</span>. Hoàn toàn miễn phí!
                  </p>

                  <div className="space-y-2.5 pt-2">
                    {[
                      'Hỗ trợ tư vấn giải pháp trọn bộ thiết bị phù hợp ngân sách.',
                      'Thiết kế sơ đồ lắp đặt máy chấm công & hệ thống tính tiền.',
                      'Cung cấp bảng báo giá chính thức có dấu đỏ công ty.',
                      'Bảo hành chính hãng 12-24 tháng tận nơi sử dụng.'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Form column */}
                <div className="lg:col-span-7 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-inner">
                  {homeConsultSuccess ? (
                    <div className="space-y-4 py-4 text-center">
                      <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30 animate-pulse">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-base font-black text-white">Gửi Yêu Cầu Thành Công!</h4>
                        <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                          Chào <strong>{homeConsultName}</strong>, mã yêu cầu tư vấn của bạn là <span className="text-blue-400 font-mono font-black text-sm">{homeConsultSuccess}</span>. Hệ thống đã ghi nhận số điện thoại <strong className="text-white">{homeConsultPhone}</strong>.
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Chuyên viên giải pháp của chúng tôi đang xử lý yêu cầu và sẽ liên hệ trực tiếp hỗ trợ bạn ngay lập tức. Bạn có thể sử dụng mã này để tra cứu tiến trình bất kỳ lúc nào.
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
                        <button
                          onClick={() => {
                            setHomeConsultName('');
                            setHomeConsultPhone('');
                            setHomeConsultContent('');
                            setHomeConsultSuccess(null);
                          }}
                          className="px-4 py-2 bg-slate-850 hover:bg-slate-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                        >
                          Gửi yêu cầu mới
                        </button>
                        <button
                          onClick={() => {
                            setLookupQuery(homeConsultSuccess);
                            setActiveTab('order-lookup');
                            handleLookupOrder(homeConsultSuccess);
                            window.scrollTo({ top: 380, behavior: 'smooth' });
                          }}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                        >
                          Tra cứu yêu cầu này
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleHomeConsultationSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1 text-left">
                          <label className="text-[10px] font-black uppercase tracking-wider text-slate-300 block">
                            Họ và Tên <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Nhập họ và tên..."
                            value={homeConsultName}
                            onChange={(e) => { setHomeConsultName(e.target.value); setHomeConsultError(null); }}
                            className="w-full bg-slate-950/40 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-slate-950/80 transition-all font-medium"
                          />
                        </div>

                        <div className="space-y-1 text-left">
                          <label className="text-[10px] font-black uppercase tracking-wider text-slate-300 block">
                            Số điện thoại <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="tel"
                            placeholder="Nhập số điện thoại liên hệ..."
                            value={homeConsultPhone}
                            onChange={(e) => { setHomeConsultPhone(e.target.value); setHomeConsultError(null); }}
                            className="w-full bg-slate-950/40 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-slate-950/80 transition-all font-medium"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-300 block">
                          Nội dung cần tư vấn <span className="text-red-400">*</span>
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Ví dụ: Tôi muốn tư vấn lắp đặt trọn bộ máy chấm công vân tay ZKTeco cho văn phòng 35 người tại Quận 3..."
                          value={homeConsultContent}
                          onChange={(e) => { setHomeConsultContent(e.target.value); setHomeConsultError(null); }}
                          className="w-full bg-slate-950/40 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-slate-950/80 transition-all font-medium resize-none"
                        />
                      </div>

                      {homeConsultError && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2 text-xs text-red-300 animate-fade-in font-medium">
                          <span className="flex-shrink-0 mt-0.5">⚠️</span>
                          <div className="whitespace-pre-line">{homeConsultError}</div>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer transform active:scale-[0.99]"
                      >
                        <Phone className="w-4 h-4 text-white animate-pulse" />
                        <span>Gửi yêu cầu gọi lại ngay</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* 8. LATEST NEWS & GUIDES FEED FROM BLOG */}
            <div className="space-y-6 pt-4">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-orange-100 text-orange-700 rounded-lg">
                    <Newspaper className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-wider text-slate-800">
                    📰 CẨM NANG CÔNG NGHỆ & TIN TỨC MỚI NHẤT
                  </h4>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('news');
                    window.scrollTo({ top: 380, behavior: 'smooth' });
                  }}
                  className="text-[11px] font-black uppercase text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  Xem tất cả bài viết <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {NEWS_ARTICLES.slice(0, 3).map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      setActiveTab('news');
                      setSelectedArticle(art);
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="h-40 bg-slate-100 relative overflow-hidden">
                        {art.image ? (
                          <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-100">
                            <Newspaper className="w-10 h-10 text-slate-300" />
                          </div>
                        )}
                        <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest rounded">
                          {art.categoryLabel}
                        </span>
                      </div>

                      <div className="p-4 space-y-1.5 text-left">
                        <span className="text-[9px] text-slate-400 font-bold font-mono">{art.date} • {art.views} lượt xem</span>
                        <h5 className="text-xs font-black text-slate-800 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                          {art.title}
                        </h5>
                        <p className="text-[10px] text-slate-400 font-medium leading-relaxed line-clamp-2">
                          {art.summary}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 text-left">
                      <span className="text-[10px] font-black text-blue-600 group-hover:text-blue-800 transition-colors flex items-center gap-1">
                        Đọc tiếp bài viết <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 9. CUSTOMER SUCCESS STORIES & REAL INSTALLATION GALLERY SECTION */}
            <section id="customer-success" className="mt-12 bg-gradient-to-tr from-blue-50/70 via-slate-50/80 to-indigo-50/70 rounded-2xl p-6 md:p-8 border border-slate-200/60 shadow-sm relative overflow-hidden">
              {/* Ambient background blur elements for frosted effect */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -z-10" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl -z-10" />

              <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
                <span className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-100/60 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>KHÁCH HÀNG & DỰ ÁN THỰC TẾ</span>
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                  Hình Ảnh Lắp Đặt Thực Tế & Đánh Giá Khách Hàng
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed font-sans">
                  Đã có hơn 10,000+ doanh nghiệp, nhà hàng, quán cafe, bệnh viện và kho vận tin dùng giải pháp thiết bị chấm công & máy in từ SOLUTION B A O.
                </p>
              </div>

              {/* Real Installation Showcase Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {[
                  { title: "Lắp đặt Máy Chấm Công Khu Công Nghiệp", location: "KCN Tân Bình, TP.HCM", img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80", tag: "NHÀ XƯỞNG 300+ NS" },
                  { title: "Đồng bộ Máy POS Thu Ngân & In Bill", location: "Chuỗi Quán Cafe Q1", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80", tag: "CHUỖI CHUẨN F&B" },
                  { title: "Hệ thống In Tem Mã Vạch & Vận Đơn", location: "Kho Vận Logistics Bình Tân", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80", tag: "IN 5,000 TEM/NGÀY" },
                  { title: "Bàn Giao Máy Chấm Công Khuôn Mặt", location: "Văn Phòng LandMark 81", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80", tag: "AI FACE ID AI 0.2S" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-sm group hover:shadow-md transition-all">
                    <div className="h-28 sm:h-36 overflow-hidden relative">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                      <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-yellow-300 text-[9px] font-black px-2 py-0.5 rounded uppercase">
                        {item.tag}
                      </span>
                    </div>
                    <div className="p-3">
                      <div className="text-xs font-black text-slate-800 line-clamp-1">{item.title}</div>
                      <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                        <Truck className="w-3 h-3 text-blue-600" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    name: "Chị Nguyễn Thị Lan Anh",
                    role: "Chủ chuỗi Highlands Coffee Q3",
                    comment: "Chúng tôi đã trang bị đồng bộ 5 máy in hóa đơn Xprinter và 2 máy chấm công Ronald Jack tại SOLUTION B A O. Thiết bị chạy rất ổn định, phần mềm chấm công xuất file Excel nhanh, hỗ trợ cài đặt từ xa qua UltraViewer rất tận tình và nhanh chóng.",
                    rating: 5,
                    tag: "F&B"
                  },
                  {
                    name: "Anh Trần Hoàng Long",
                    role: "Giám đốc vận hành Kho GHN Bình Tân",
                    comment: "Đầu đọc mã vạch Zebra và máy in tem nhãn nhiệt khổ A6 của SOLUTION B A O cung cấp giúp quá trình đóng gói, phân loại vận đơn tăng hơn 40% hiệu suất. Giao hàng cực nhanh nội thành, đầy đủ hóa đơn chứng từ chính hãng.",
                    rating: 5,
                    tag: "LOGISTICS"
                  },
                  {
                    name: "Chị Lê Vy",
                    role: "Quản lý chuỗi thời trang Bloom Boutique",
                    comment: "Két đựng tiền thu ngân tự động bật ra khi in bill cùng máy in hóa đơn K80 hoạt động cực kỳ êm ái. Đặc biệt là bạn nhân viên tư vấn sản phẩm rất đúng nhu cầu thực tế của cửa hàng mới mở, không bị vẽ vời thêm chi phí.",
                    rating: 5,
                    tag: "BÁN LẺ"
                  },
                  {
                    name: "Anh Phạm Minh Đức",
                    role: "Sáng lập nhà hàng Lẩu nướng Hana",
                    comment: "Phần ca kíp xoay tua phức tạp của nhân viên nhà hàng được đội ngũ kỹ thuật viên của SOLUTION B A O hỗ trợ chia ca tỉ mỉ trên phần mềm Wise Eye hoàn toàn miễn phí. Rất yên tâm với chính sách bảo hành 12 tháng tận tâm.",
                    rating: 5,
                    tag: "NHÀ HÀNG"
                  }
                ].map((story, idx) => (
                  <div
                    key={idx}
                    className="backdrop-blur-md bg-white/80 border border-white rounded-2xl p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between transition-all hover:translate-y-[-4px] hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)] group"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-extrabold tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded uppercase border border-blue-100">
                          {story.tag}
                        </span>
                        <div className="flex gap-0.5">
                          {[...Array(story.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-600 text-xs leading-relaxed italic">
                        "{story.comment}"
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center gap-3">
                      <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center font-black text-xs text-white shadow-sm shrink-0">
                        {story.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-800 tracking-tight leading-none group-hover:text-blue-600 transition-colors">
                          {story.name}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-medium font-sans">
                          {story.role}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* -------------------- TAB VIEW 1: PRODUCT CATALOG -------------------- */}
        {activeTab === 'catalog' && (
          <>
            <div className="hidden md:block space-y-8 animate-fade-in">
              
              {/* Modern Horizontal Category Selector at the Top */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2.5 px-1">
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Menu className="w-4 h-4 text-blue-600 animate-pulse" />
                    <span>Danh Mục Thiết Bị</span>
                  </div>
                  {/* Manual trượt controls */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        categoryContainerRef.current?.scrollBy({ left: -220, behavior: 'smooth' });
                      }}
                      className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-all shadow-sm cursor-pointer flex items-center justify-center hover:scale-105 active:scale-95"
                      title="Trượt sang trái"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        categoryContainerRef.current?.scrollBy({ left: 220, behavior: 'smooth' });
                      }}
                      className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-all shadow-sm cursor-pointer flex items-center justify-center hover:scale-105 active:scale-95"
                      title="Trượt sang phải"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div 
                  ref={categoryContainerRef}
                  onMouseEnter={() => setIsCategoryHovered(true)}
                  onMouseLeave={() => setIsCategoryHovered(false)}
                  onTouchStart={() => setIsCategoryHovered(true)}
                  onTouchEnd={() => setIsCategoryHovered(false)}
                  className="flex items-center gap-2 overflow-x-auto pt-2.5 pb-2.5 scrollbar-none -mx-2 px-2 sm:mx-0 sm:px-0"
                >
                  {[
                    { id: 'all', label: 'Tất cả sản phẩm', count: products.length },
                    ...visibleMainCategories.map((mc) => ({
                      id: mc.id,
                      label: mc.name,
                      count: products.filter((p) => p.category === mc.id).length
                    }))
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setCatalogCategory(cat.id);
                        setCatalogSubCategory('all');
                      }}
                      className={`px-4 py-2.5 rounded-xl text-xs font-black whitespace-nowrap transition-all border cursor-pointer shrink-0 flex items-center gap-2 ${
                        catalogCategory === cat.id
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-800'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        catalogCategory === cat.id ? 'bg-blue-800 text-white' : 'bg-slate-200 text-slate-500'
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Subcategory Pills Row on Catalog page */}
                {(() => {
                  const activeSubs = visibleSubCategories.filter(s => s.mainCategoryId === catalogCategory);
                  if (activeSubs.length === 0) return null;
                  return (
                    <div className="pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
                      <span className="text-[10px] font-black uppercase text-slate-400 shrink-0 flex items-center gap-1.5">
                        <Layers className={`w-3.5 h-3.5 ${theme.primaryText}`} />
                        <span>Danh mục con:</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setCatalogSubCategory('all')}
                        className={`px-3 py-1 rounded-xl text-[11px] font-bold shrink-0 transition-all cursor-pointer ${
                          catalogSubCategory === 'all' ? `${theme.primary} text-white shadow-sm` : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        Tất cả
                      </button>
                      {activeSubs.map((sub) => {
                        const isActive = catalogSubCategory === sub.id;
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => setCatalogSubCategory(isActive ? 'all' : sub.id)}
                            className={`px-3 py-1 rounded-xl text-[11px] font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                              isActive ? `${theme.primary} text-white shadow-sm` : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {sub.brandBadge && (
                              <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${isActive ? 'bg-white/20 text-white' : `${theme.primaryText} bg-white`}`}>
                                {sub.brandBadge}
                              </span>
                            )}
                            <span>{sub.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              {/* Active Product Section */}
              <div className="space-y-6" id="all-products-catalog-section">
                
                {/* Product Filtering Header controls */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4.5 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-blue-600" />
                      <span>
                        {catalogCategory === 'home' 
                          ? (searchQuery.trim() !== '' ? 'Kết quả tìm kiếm thiết bị' : 'Trang chủ - Thiết Bị Nổi Bật & Khuyến Mãi') 
                          : catalogCategory === 'all'
                          ? (searchQuery.trim() !== '' ? 'Kết quả tìm kiếm thiết bị' : 'Tất cả sản phẩm bán chạy & chính hãng')
                          : (mainCategories.find(c => c.id === catalogCategory)?.name || 'Danh mục thiết bị')
                        }
                      </span>
                      <span className="text-xs bg-slate-100 text-slate-500 px-2.5 py-0.5 rounded-full font-mono">
                        {processedProducts.length} model
                      </span>
                    </h3>
                  </div>

                  {/* Sorter & Admin Quick Mode */}
                  <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
                    {adminUser && (
                      <label className="flex items-center gap-1.5 cursor-pointer bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-[10px] sm:text-xs font-bold text-slate-700 transition-all select-none shrink-0">
                        <input
                          type="checkbox"
                          checked={isAdminMode}
                          onChange={(e) => {
                            setIsAdminMode(e.target.checked);
                            localStorage.setItem('solutionbao_admin_mode', e.target.checked ? 'true' : 'false');
                            showToast(e.target.checked ? 'Đã bật Chế độ Sửa/Xóa nhanh!' : 'Đã tắt Chế độ Sửa/Xóa nhanh!');
                          }}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer h-3.5 w-3.5"
                        />
                        <Lock className="w-3.5 h-3.5 text-orange-500" />
                        <span>Quyền Admin</span>
                      </label>
                    )}

                    {adminUser && isAdminMode && (
                      <button
                        onClick={handleOpenAddModal}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-black text-[10px] sm:text-xs uppercase px-3 py-2 rounded-xl transition-all shadow-md flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Thêm SP</span>
                      </button>
                    )}

                    <span className="text-xs text-slate-500 font-bold shrink-0">Sắp xếp:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-slate-100 border border-slate-200 rounded-xl py-2 px-3.5 text-xs text-slate-700 font-bold focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all cursor-pointer mr-1"
                    >
                      <option value="popular">Bán chạy & Nổi bật</option>
                      <option value="priceAsc">Giá thấp đến cao</option>
                      <option value="priceDesc">Giá cao xuống thấp</option>
                    </select>

                    <button
                      onClick={() => setIsAdvancedFilterOpen(!isAdvancedFilterOpen)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer shrink-0 ${
                        isAdvancedFilterOpen || filterPriceRange !== 'all' || filterBrand !== 'all' || filterStockStatus !== 'all' || filterTag !== 'all'
                          ? 'bg-blue-50 border-blue-200 text-blue-700'
                          : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                      }`}
                      title="Lọc sản phẩm nâng cao"
                    >
                      <Sliders className="w-3.5 h-3.5 text-blue-600" />
                      <span>Lọc nâng cao</span>
                      {(filterPriceRange !== 'all' || filterBrand !== 'all' || filterStockStatus !== 'all' || filterTag !== 'all') && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Advanced Filter Panel */}
                {isAdvancedFilterOpen && (
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 animate-slide-down">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <Sliders className="w-4 h-4 text-blue-600" />
                        <span>BỘ LỌC TÌM KIẾM NÂNG CAO</span>
                      </h4>
                      {(filterPriceRange !== 'all' || filterBrand !== 'all' || filterStockStatus !== 'all' || filterTag !== 'all') && (
                        <button
                          onClick={() => {
                            setFilterPriceRange('all');
                            setFilterBrand('all');
                            setFilterStockStatus('all');
                            setFilterTag('all');
                            showToast('Đã xóa tất cả bộ lọc');
                          }}
                          className="text-[10px] font-bold text-red-600 hover:text-red-700 uppercase flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Xóa bộ lọc</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {/* Price Range Filter */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Khoảng giá:</label>
                        <select
                          value={filterPriceRange}
                          onChange={(e) => setFilterPriceRange(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white cursor-pointer"
                        >
                          <option value="all">Tất cả khoảng giá</option>
                          <option value="under_1.5m">Dưới 1.5 Triệu</option>
                          <option value="1.5m_3m">Từ 1.5 - 3 Triệu</option>
                          <option value="3m_5m">Từ 3 - 5 Triệu</option>
                          <option value="over_5m">Trên 5 Triệu</option>
                        </select>
                      </div>

                      {/* Brand Filter */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Thương hiệu:</label>
                        <select
                          value={filterBrand}
                          onChange={(e) => setFilterBrand(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white cursor-pointer"
                        >
                          <option value="all">Tất cả thương hiệu</option>
                          {uniqueBrands.map((brand) => (
                            <option key={brand} value={brand.toLowerCase()}>{brand}</option>
                          ))}
                        </select>
                      </div>

                      {/* Feature Tag Filter */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Đặc tính nổi bật (Tag):</label>
                        <select
                          value={filterTag}
                          onChange={(e) => setFilterTag(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white cursor-pointer"
                        >
                          <option value="all">Tất cả đặc tính</option>
                          {uniqueFeatureTags.map((tag) => (
                            <option key={tag} value={tag}>{tag}</option>
                          ))}
                        </select>
                      </div>

                      {/* Stock Status Filter */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Trạng thái tồn kho:</label>
                        <select
                          value={filterStockStatus}
                          onChange={(e) => setFilterStockStatus(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white cursor-pointer"
                        >
                          <option value="all">Tất cả trạng thái</option>
                          <option value="in_stock">Còn hàng (Sẵn sàng)</option>
                          <option value="out_of_stock">Hết hàng (Tạm thời)</option>
                          <option value="pre_order">Đặt trước (Hàng về sau)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* If we are on the home page and there is no active search query, show the split lists */}
                {catalogCategory === 'home' && searchQuery.trim() === '' ? (
                  <div className="space-y-12">
                    
                    {/* SECTION 1: PROMOTIONAL PRODUCTS WITH COUNTDOWN TIMER */}
                    <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-red-50/60 via-white to-amber-50/40 rounded-3xl border-2 border-red-100 shadow-[0_10px_35px_rgba(239,68,68,0.06)] hover:shadow-[0_12px_45px_rgba(239,68,68,0.11)] transition-all duration-300 space-y-6 relative overflow-hidden" id="promotional-block-container">
                      {/* Subtly glowing ambient light spots in background */}
                      <div className="absolute top-0 right-0 w-64 h-64 bg-red-100/20 rounded-full blur-3xl pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-100/10 rounded-full blur-3xl pointer-events-none" />

                      <div className="bg-gradient-to-r from-red-600 via-orange-500 to-red-600 rounded-2xl p-5 md:p-6 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Decorative glowing light effect */}
                        <div className="absolute top-0 left-0 w-full h-full bg-white/5 pointer-events-none animate-pulse" />
                        
                        <div className="space-y-1 relative z-10">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-yellow-400 text-slate-950 text-[10px] font-black uppercase rounded-md tracking-wider animate-bounce">
                              HOT DEAL
                            </span>
                            <h4 className="text-base md:text-lg font-black uppercase tracking-tight flex items-center gap-1.5">
                              {webConfig.flashSaleTitle || "💥 GIỜ VÀNG KHUYẾN MÃI"}
                            </h4>
                          </div>
                          <p className="text-xs text-red-100 font-medium">
                            Sản phẩm công nghệ, thiết bị bán hàng chính hãng đang được giảm giá cực sốc!
                          </p>
                        </div>

                        {/* Urgency Realtime Countdown Timer */}
                        <div className="flex items-center gap-2 bg-slate-900/90 text-white border border-red-400/30 px-4 py-2.5 rounded-xl self-start md:self-auto shadow-inner relative z-10">
                          <Clock className="w-4.5 h-4.5 text-yellow-400 animate-spin" style={{ animationDuration: '4s' }} />
                          <span className="text-xs font-black uppercase tracking-wider text-slate-300">Kết thúc sau:</span>
                          <div className="flex items-center gap-1 font-mono font-black text-sm md:text-base text-yellow-400 min-w-[120px] justify-center">
                            <span className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">{String(promoCountdown.hours).padStart(2, '0')}</span>
                            <span className="text-slate-500 animate-pulse">:</span>
                            <span className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">{String(promoCountdown.minutes).padStart(2, '0')}</span>
                            <span className="text-slate-500 animate-pulse">:</span>
                            <span className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">{String(promoCountdown.seconds).padStart(2, '0')}</span>
                          </div>
                        </div>
                      </div>

                      {promoProducts.length === 0 ? (
                        <div className="py-12 text-center text-slate-400 font-bold bg-white border border-dashed border-slate-200 rounded-2xl relative z-10">
                          Hiện không có chương trình khuyến mãi nào khả dụng.
                        </div>
                      ) : (
                        <motion.div
                          variants={{
                            hidden: { opacity: 0 },
                            show: {
                              opacity: 1,
                              transition: {
                                staggerChildren: 0.05
                              }
                            }
                          }}
                          initial="hidden"
                          whileInView="show"
                          viewport={{ once: true, amount: 0.05 }}
                          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 relative z-10"
                        >
                          {promoProducts.map((p) => renderProductCard(p, true))}
                        </motion.div>
                      )}
                    </div>

                    {/* SECTION 2: FEATURED / POPULAR PRODUCTS */}
                    <div className="space-y-6">
                      <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
                            <Sparkles className="w-4.5 h-4.5" />
                          </div>
                          <h4 className="text-sm font-black uppercase tracking-wider text-slate-800">
                            ⭐ THIẾT BỊ NỔI BẬT & BÁN CHẠY NHẤT
                          </h4>
                        </div>
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-2.5 py-0.5 rounded-full font-mono font-bold">
                          Hàng chính hãng 100%
                        </span>
                      </div>

                      {featuredProducts.length === 0 ? (
                        <div className="py-12 text-center text-slate-400 font-bold bg-white border border-dashed border-slate-200 rounded-2xl">
                          Không tìm thấy thiết bị nổi bật nào.
                        </div>
                      ) : (
                        <motion.div
                          variants={{
                            hidden: { opacity: 0 },
                            show: {
                              opacity: 1,
                              transition: {
                                staggerChildren: 0.05
                              }
                            }
                          }}
                          initial="hidden"
                          whileInView="show"
                          viewport={{ once: true, amount: 0.05 }}
                          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4"
                        >
                          {featuredProducts.map((p) => renderProductCard(p, false))}
                        </motion.div>
                      )}
                    </div>

                    {/* SECTION 3: NEWS HIGHLIGHTS / TIN NỔI BẬT */}
                    <div className="space-y-6 pt-6">
                      <div className="border-b border-slate-200 pb-3 flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-orange-100 text-orange-700 rounded-lg">
                            <Newspaper className="w-4.5 h-4.5 animate-pulse" />
                          </div>
                          <h4 className="text-sm font-black uppercase tracking-wider text-slate-800">
                            📰 TIN NỔI BẬT & CẨM NANG KỸ THUẬT
                          </h4>
                        </div>
                        <button
                          onClick={() => {
                            setActiveTab('news');
                            window.scrollTo({ top: 380, behavior: 'smooth' });
                          }}
                          className="text-[11px] font-black uppercase text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>Xem tất cả tin tức</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {newsArticles.slice(0, 3).map((art) => {
                          return (
                            <div 
                              key={art.id}
                              className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                            >
                              <div className="relative h-44 overflow-hidden bg-slate-100 shrink-0">
                                {art.image && art.image.trim() ? (
                                  <img 
                                    src={art.image} 
                                    alt={art.title} 
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-slate-100">
                                    <Newspaper className="w-10 h-10 text-slate-300" />
                                  </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                                <span className="absolute top-3 left-3 bg-blue-600 text-white font-black text-[9px] uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                                  {art.categoryLabel}
                                </span>
                                <span className="absolute bottom-3 left-3 text-slate-200 text-[10px] font-bold flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5 text-orange-400" />
                                  <span>{art.readTime}</span>
                                </span>
                              </div>

                              <div className="p-4 flex-1 flex flex-col justify-between space-y-3 text-left">
                                <div className="space-y-1.5">
                                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold font-mono">
                                    <span>{art.author}</span>
                                    <span>{art.date}</span>
                                  </div>
                                  <h5 
                                    onClick={() => {
                                      setSelectedArticle(art);
                                      setActiveTab('news');
                                      window.scrollTo({ top: 380, behavior: 'smooth' });
                                    }}
                                    className="text-xs sm:text-sm font-extrabold text-slate-800 hover:text-blue-600 transition-colors cursor-pointer line-clamp-2 leading-snug uppercase"
                                  >
                                    {art.title}
                                  </h5>
                                  <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3 font-medium">
                                    {art.summary}
                                  </p>
                                </div>

                                <button
                                  onClick={() => {
                                    setSelectedArticle(art);
                                    setActiveTab('news');
                                    window.scrollTo({ top: 380, behavior: 'smooth' });
                                  }}
                                  className="w-full py-2 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-200/50 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1"
                                >
                                  <span>Đọc chi tiết</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Quick catalog guide text */}
                    <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4 text-[11px] text-slate-500 leading-relaxed font-medium">
                      💡 <span className="font-extrabold text-slate-700">Mẹo tìm kiếm:</span> Trang chủ chỉ tuyển chọn và hiển thị tối đa 10 Sản phẩm Nổi bật & 10 Sản phẩm Khuyến mãi tốt nhất. Để xem trọn vẹn tất cả thiết bị của một danh mục cụ thể, bạn vui lòng nhấn chọn các mục ở thanh danh mục phía trên hoặc sử dụng ô tìm kiếm ở phía trên.
                    </div>

                  </div>
                ) : (
                  /* Otherwise, show standard search or category filtered grid of products */
                  <div className="space-y-6">
                    {/* Brand, Tag and Stock Status Quick Filters directly above the cards */}
                    <div className="flex flex-col gap-3 bg-slate-50 border border-slate-200/80 p-4 rounded-2xl shadow-sm text-left">
                      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                        {/* Brands Chips */}
                        <div className="flex flex-col text-left gap-1.5 flex-1 min-w-[200px]">
                          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block flex items-center gap-1.5">
                            <Award className="w-4 h-4 text-blue-600" />
                            <span>Lọc theo thương hiệu:</span>
                          </span>
                          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
                            <button
                              onClick={() => {
                                setFilterBrand('all');
                                showToast('Hiển thị tất cả thương hiệu');
                              }}
                              className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                                filterBrand === 'all'
                                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/15'
                                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-800'
                              }`}
                            >
                              Tất cả
                            </button>
                            {uniqueBrands.map((brand) => (
                              <button
                                key={brand}
                                onClick={() => {
                                  setFilterBrand(brand.toLowerCase());
                                  showToast(`Đang lọc thương hiệu: ${brand}`);
                                }}
                                className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                                  filterBrand === brand.toLowerCase()
                                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/15'
                                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-800'
                                }`}
                              >
                                {brand}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Stock Status Buttons */}
                        <div className="flex flex-col text-left gap-1.5 shrink-0">
                          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block flex items-center gap-1.5">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            <span>Tình trạng kho:</span>
                          </span>
                          <div className="flex bg-white border border-slate-200 rounded-xl p-1 gap-1">
                            {[
                              { id: 'all', label: 'Tất cả' },
                              { id: 'in_stock', label: 'Còn hàng' },
                              { id: 'out_of_stock', label: 'Hết hàng' },
                              { id: 'pre_order', label: 'Đặt trước' },
                            ].map((status) => (
                              <button
                                key={status.id}
                                onClick={() => {
                                  setFilterStockStatus(status.id);
                                  showToast(`Lọc tình trạng: ${status.label}`);
                                }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                                  filterStockStatus === status.id
                                    ? 'bg-slate-900 text-white shadow-sm'
                                    : 'text-slate-500 hover:text-slate-800'
                                }`}
                              >
                                {status.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Feature Tags Chips (In qua điện thoại, Vân tay, Bảo mật cao...) */}
                      <div className="flex flex-col text-left gap-1.5 pt-2 border-t border-slate-200/60">
                        <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>Lọc nhanh theo đặc tính nổi bật (Tags):</span>
                        </span>
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
                          <button
                            onClick={() => {
                              setFilterTag('all');
                              showToast('Hiển thị tất cả đặc tính');
                            }}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                              filterTag === 'all'
                                ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/20'
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-amber-50 hover:text-amber-700'
                            }`}
                          >
                            Tất cả đặc tính
                          </button>
                          {uniqueFeatureTags.map((tag) => (
                            <button
                              key={tag}
                              onClick={() => {
                                setFilterTag(tag);
                                showToast(`Đang lọc theo đặc tính: ${tag}`);
                              }}
                              className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                                filterTag === tag
                                  ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/20'
                                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-amber-50 hover:text-amber-700'
                              }`}
                            >
                              ⚡ {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {processedProducts.length === 0 ? (
                      <div className="py-12 text-center text-slate-400 font-bold bg-white border border-dashed border-slate-200 rounded-2xl">
                        Không tìm thấy thiết bị nào khớp với từ khóa tìm kiếm hoặc bộ lọc hiện tại.
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <motion.div
                          key={`catalog-page-${safeCurrentPage}`}
                          variants={{
                            hidden: { opacity: 0 },
                            show: {
                              opacity: 1,
                              transition: {
                                staggerChildren: 0.03
                              }
                            }
                          }}
                          initial="hidden"
                          animate="show"
                          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 min-h-[300px]"
                        >
                          {paginatedProducts.map((p) => renderProductCard(p, false))}
                        </motion.div>

                        {/* Pagination UI */}
                        {totalPages > 1 && (
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-200/80 p-4 rounded-2xl shadow-sm mt-6">
                            <div className="text-xs font-bold text-slate-500 text-left">
                              Hiển thị <span className="text-slate-800 font-extrabold">{((safeCurrentPage - 1) * ITEMS_PER_PAGE) + 1}</span> - <span className="text-slate-800 font-extrabold">{Math.min(safeCurrentPage * ITEMS_PER_PAGE, processedProducts.length)}</span> trong tổng số <span className="text-blue-600 font-extrabold">{processedProducts.length}</span> sản phẩm
                            </div>

                            <div className="flex items-center gap-1.5">
                              {/* Previous Button */}
                              <button
                                onClick={() => {
                                  if (safeCurrentPage > 1) {
                                    setCurrentPage(safeCurrentPage - 1);
                                    const el = document.getElementById('all-products-catalog-section');
                                    if (el) {
                                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    } else {
                                      window.scrollTo({ top: 300, behavior: 'smooth' });
                                    }
                                  }
                                }}
                                disabled={safeCurrentPage === 1}
                                className={`px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all border cursor-pointer ${
                                  safeCurrentPage === 1
                                    ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
                                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900 active:scale-95'
                                }`}
                              >
                                <ChevronLeft className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Trước</span>
                              </button>

                              {/* Numbered Page Buttons */}
                              {Array.from({ length: totalPages }, (_, idx) => {
                                const pageNum = idx + 1;
                                const isActive = safeCurrentPage === pageNum;
                                return (
                                  <button
                                    key={pageNum}
                                    onClick={() => {
                                      setCurrentPage(pageNum);
                                      const el = document.getElementById('all-products-catalog-section');
                                      if (el) {
                                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                      } else {
                                        window.scrollTo({ top: 300, behavior: 'smooth' });
                                      }
                                    }}
                                    className={`w-9 h-9 rounded-xl text-xs font-black flex items-center justify-center transition-all cursor-pointer ${
                                      isActive
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-800'
                                    }`}
                                  >
                                    {pageNum}
                                  </button>
                                );
                              })}

                              {/* Next Button */}
                              <button
                                onClick={() => {
                                  if (safeCurrentPage < totalPages) {
                                    setCurrentPage(safeCurrentPage + 1);
                                    const el = document.getElementById('all-products-catalog-section');
                                    if (el) {
                                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    } else {
                                      window.scrollTo({ top: 300, behavior: 'smooth' });
                                    }
                                  }
                                }}
                                disabled={safeCurrentPage === totalPages}
                                className={`px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all border cursor-pointer ${
                                  safeCurrentPage === totalPages
                                    ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
                                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900 active:scale-95'
                                }`}
                              >
                                <span className="hidden sm:inline">Sau</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

              </div>

              {/* ----------------- BOTTOM PANELS (THE MOVED WIDGETS) ----------------- */}
              <div className="border-t border-slate-200 pt-8 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                  
                  {/* Panel 1: Traditional Category Overview Filter & Price tracking list */}
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 space-y-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 pb-2.5 border-b border-slate-100 flex items-center gap-2">
                        <Menu className="w-4 h-4 text-blue-600" />
                        <span>Bộ lọc thiết bị nhanh</span>
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-1.5 pt-2">
                        {[
                          { id: 'all', label: 'Tất cả sản phẩm', count: products.length },
                          { id: 'attendance', label: 'Máy Chấm Công', count: products.filter(p => p.category === 'attendance').length },
                          { id: 'printer', label: 'Máy In Bill', count: products.filter(p => p.category === 'printer').length },
                          { id: 'scanner', label: 'Đầu Đọc Mã Vạch', count: products.filter(p => p.category === 'scanner').length },
                          { id: 'label', label: 'Máy In Tem Nhãn', count: products.filter(p => p.category === 'label').length },
                          { id: 'consumable', label: 'Giấy In & Vật Tư', count: products.filter(p => p.category === 'consumable').length },
                          { id: 'drawer', label: 'Hộp Đựng Tiền Cash', count: products.filter(p => p.category === 'drawer').length }
                        ].map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => {
                              setCatalogCategory(cat.id);
                              window.scrollTo({ top: 400, behavior: 'smooth' });
                            }}
                            className={`text-left px-2.5 py-1.5 rounded-lg text-[11px] font-semibold flex justify-between items-center transition-all cursor-pointer border ${
                              catalogCategory === cat.id
                                ? 'bg-blue-50 text-blue-700 border-blue-200 font-bold'
                                : 'bg-slate-50 text-slate-600 border-transparent hover:bg-slate-100 hover:text-slate-800'
                            }`}
                          >
                            <span className="truncate">{cat.label}</span>
                            <span className="text-[9px] bg-slate-200/80 text-slate-600 px-1.5 py-0.5 rounded-full font-bold shrink-0 ml-1">
                              {cat.count} SP
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {priceAlerts.length > 0 && (
                      <div className="mt-4 border-t border-slate-100 pt-3">
                        <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
                          <Bell className="w-3.5 h-3.5 text-blue-600" />
                          <span>Mục Đang Theo Dõi Giá ({priceAlerts.length})</span>
                        </h4>
                        <div className="space-y-2 max-h-[120px] overflow-y-auto">
                          {priceAlerts.map((alert, index) => (
                            <div key={index} className="text-[10px] bg-slate-50 border border-slate-100 p-2 rounded-lg flex justify-between items-center gap-2">
                              <span className="font-extrabold text-slate-700 truncate flex-1">{alert.productName}</span>
                              <button
                                onClick={() => handleRemovePriceAlert(alert.productId, alert.email)}
                                className="text-red-500 hover:text-red-700 font-bold shrink-0 text-[9px] uppercase cursor-pointer"
                              >
                                Hủy
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Panel 2: Technical Help Widget */}
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 flex flex-col justify-between text-center space-y-4">
                    <div className="space-y-3">
                      <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <Wrench className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide">Cần Hỗ Trợ Kỹ Thuật?</h4>
                        <p className="text-slate-500 text-[11px] leading-relaxed">
                          Hỗ trợ cấu hình phần ca kíp, sửa lỗi font tiếng Việt, cài đặt phần mềm chấm công từ xa.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('troubleshoot');
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }}
                      className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold uppercase rounded-xl transition-all cursor-pointer"
                    >
                      Vào Cẩm Nang Kỹ Thuật
                    </button>
                  </div>

                  {/* Panel 3: Fast Quote shortcut banner */}
                  <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-5 rounded-2xl shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 opacity-5">
                      <Calculator className="w-24 h-24" />
                    </div>
                    <div className="space-y-2 relative z-10">
                      <h4 className="text-xs font-black uppercase tracking-wide">Ước Tính Giấy In</h4>
                      <p className="text-amber-50 text-[11px] leading-relaxed">
                        Tính toán chuẩn xác số thùng giấy in nhiệt (K80, K57) bạn cần dự trù cho cửa hàng trong 1 năm!
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('quote');
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                        // Scroll to calculator
                        setTimeout(() => {
                          document.getElementById('consumables-calculator')?.scrollIntoView({ behavior: 'smooth' });
                        }, 200);
                      }}
                      className="w-full py-2 bg-white text-orange-600 hover:bg-amber-50 text-[11px] font-bold uppercase rounded-xl transition-all shadow cursor-pointer relative z-10"
                    >
                      Công cụ tính toán
                    </button>
                  </div>

                </div>
              </div>

            </div>

          {/* Customer Success Stories & Real Installation Gallery Section */}
          <section id="customer-success" className="mt-12 bg-gradient-to-tr from-blue-50/70 via-slate-50/80 to-indigo-50/70 rounded-2xl p-6 md:p-8 border border-slate-200/60 shadow-sm relative overflow-hidden">
            {/* Ambient background blur elements for frosted effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl -z-10" />

            <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
              <span className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-100/60 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                <span>Khách Hàng & Dự Án Thực Tế</span>
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                Hình Ảnh Lắp Đặt Thực Tế & Đánh Giá Khách Hàng
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed font-sans">
                Đã có hơn 10,000+ doanh nghiệp, nhà hàng, quán cafe, bệnh viện và kho vận tin dùng giải pháp thiết bị chấm công & máy in từ SOLUTION B A O.
              </p>
            </div>

            {/* Real Installation Showcase Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {[
                { title: "Lắp đặt Máy Chấm Công Khu Công Nghiệp", location: "KCN Tân Bình, TP.HCM", img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80", tag: "Nhà xưởng 300+ NS" },
                { title: "Đồng bộ Máy POS Thu Ngân & In Bill", location: "Chuỗi Quán Cafe Q1", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80", tag: "Chuỗi Chuẩn F&B" },
                { title: "Hệ thống In Tem Mã Vạch & Vận Đơn", location: "Kho Vận Logistics Bình Tân", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80", tag: "In 5,000 Tem/Ngày" },
                { title: "Bàn Giao Máy Chấm Công Khuôn Mặt", location: "Văn Phòng LandMark 81", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80", tag: "AI Face ID AI 0.2s" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-sm group hover:shadow-md transition-all">
                  <div className="h-28 sm:h-36 overflow-hidden relative">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-yellow-300 text-[9px] font-black px-2 py-0.5 rounded uppercase">
                      {item.tag}
                    </span>
                  </div>
                  <div className="p-3">
                    <div className="text-xs font-black text-slate-800 line-clamp-1">{item.title}</div>
                    <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                      <Truck className="w-3 h-3 text-blue-600" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Chị Nguyễn Thị Lan Anh",
                  role: "Chủ chuỗi Highlands Coffee Q3",
                  comment: "Chúng tôi đã trang bị đồng bộ 5 máy in hóa đơn Xprinter và 2 máy chấm công Ronald Jack tại SOLUTION B A O. Thiết bị chạy rất ổn định, phần mềm chấm công xuất file Excel nhanh, hỗ trợ cài đặt từ xa qua UltraViewer rất tận tình và nhanh chóng.",
                  rating: 5,
                  tag: "F&B"
                },
                {
                  name: "Anh Trần Hoàng Long",
                  role: "Giám đốc vận hành Kho GHN Bình Tân",
                  comment: "Đầu đọc mã vạch Zebra và máy in tem nhãn nhiệt khổ A6 của SOLUTION B A O cung cấp giúp quá trình đóng gói, phân loại vận đơn tăng hơn 40% hiệu suất. Giao hàng cực nhanh nội thành, đầy đủ hóa đơn chứng từ chính hãng.",
                  rating: 5,
                  tag: "Logistics"
                },
                {
                  name: "Chị Lê Vy",
                  role: "Quản lý chuỗi thời trang Bloom Boutique",
                  comment: "Két đựng tiền thu ngân tự động bật ra khi in bill cùng máy in hóa đơn K80 hoạt động cực kỳ êm ái. Đặc biệt là bạn nhân viên tư vấn sản phẩm rất đúng nhu cầu thực tế của cửa hàng mới mở, không bị vẽ vời thêm chi phí.",
                  rating: 5,
                  tag: "Bán lẻ"
                },
                {
                  name: "Anh Phạm Minh Đức",
                  role: "Sáng lập nhà hàng Lẩu nướng Hana",
                  comment: "Phần ca kíp xoay tua phức tạp của nhân viên nhà hàng được đội ngũ kỹ thuật viên của SOLUTION B A O hỗ trợ chia ca tỉ mỉ trên phần mềm Wise Eye hoàn toàn miễn phí. Rất yên tâm với chính sách bảo hành 12 tháng tận tâm.",
                  rating: 5,
                  tag: "Nhà hàng"
                }
              ].map((story, idx) => (
                <div
                  key={idx}
                  className="backdrop-blur-md bg-white/80 border border-white rounded-2xl p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between transition-all hover:translate-y-[-4px] hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)] group"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-extrabold tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded uppercase border border-blue-100">
                        {story.tag}
                      </span>
                      <div className="flex gap-0.5">
                        {[...Array(story.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed italic">
                      "{story.comment}"
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center font-black text-xs text-white shadow-sm shrink-0">
                      {story.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-800 tracking-tight leading-none group-hover:text-blue-600 transition-colors">
                        {story.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-medium font-sans">
                        {story.role}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          </>
        )}

        {/* -------------------- TAB VIEW 2: SMART AI CONSULTANT -------------------- */}
        {activeTab === 'advisor' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-fade-in">
            
            {/* Left Prompt Guide panel */}
            <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shadow-sm">
                    <Sparkles className="w-5.5 h-5.5 animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-slate-800">Nguyễn Hoàng Anh - Tư Vấn Bán Hàng</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Hỗ trợ trực tuyến & Báo giá hỏa tốc</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Chuyên viên tư vấn SOLUTION B A O sẵn sàng hỗ trợ Anh/Chị chọn đúng dòng máy, bóc tách cấu hình cho cửa hàng, quán cafe hay kho bãi với chi phí tối ưu nhất.
                </p>

                {/* Pre-made quick questions */}
                <div className="border-t border-slate-100 pt-4 space-y-2.5">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Chọn câu hỏi tư vấn nhanh:</h4>
                  <div className="flex flex-col gap-2">
                    {[
                      'Tôi chuẩn bị mở quán cafe nhỏ cần in bill qua điện thoại và máy chấm công giá rẻ.',
                      'Máy quét Honeywell MS7120 đa tia có gì tốt hơn dòng đơn tia Zebra LI2208?',
                      'Có hỗ trợ cài đặt UltraViewer và tặng phần mềm Ronald Jack Pro không?',
                      'SOLUTION B A O giao máy in hóa đơn nội thành TP.HCM trong bao lâu?'
                    ].map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendAiMessage(prompt)}
                        className="text-left text-xs bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 px-3.5 py-2.5 rounded-xl text-slate-700 hover:text-blue-700 transition-all cursor-pointer leading-snug"
                        disabled={isAiLoading}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Corporate seal commitment */}
              <div className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-6 rounded-2xl space-y-3 shadow-md hidden lg:block relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-10">
                  <ShieldCheck className="w-40 h-40" />
                </div>
                <div className="flex items-center gap-2 text-orange-400 font-extrabold uppercase tracking-widest text-xs">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Cam kết từ SOLUTION B A O</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-relaxed">
                  Mọi sản phẩm bán ra đều đi kèm chế độ bảo hành 12 tháng. Kỹ thuật viên hỗ trợ nạp cơ sở dữ liệu nhân viên, thiết lập in bếp, in bill miễn phí vĩnh viễn thông qua các kênh TeamViewer hoặc UltraViewer.
                </p>
              </div>
            </div>

            {/* Right Chat interaction box */}
            <div className="lg:col-span-8 flex flex-col h-full">
              <AiChatbotBox
                chatMessages={chatMessages}
                setChatMessages={setChatMessages}
                userInput={userInput}
                setUserInput={setUserInput}
                isAiLoading={isAiLoading}
                handleSendAiMessage={handleSendAiMessage}
                products={PRODUCTS_DATA}
                setActiveTab={setActiveTab}
                showToast={showToast}
                mode="embedded"
              />
            </div>
          </div>
        )}

        {/* -------------------- TAB VIEW 3: PROFESSIONAL QUOTE & ESTIMATOR -------------------- */}
        {activeTab === 'quote' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
            
            {/* Left side: Quotation editor panel & paper budget tool */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Product selector/quotation sheet builder */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-sm">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <h3 className="text-base font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-blue-600" />
                    <span>Danh sách thiết bị lập báo giá</span>
                  </h3>
                  {quoteItems.length > 0 && (
                    <button
                      onClick={handleClearQuote}
                      className={`text-xs text-slate-400 ${theme.primaryTextHover} flex items-center gap-1 transition-all cursor-pointer font-bold`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xóa hết</span>
                    </button>
                  )}
                </div>

                {quoteItems.length > 0 ? (
                  <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                    {quoteItems.map((item) => {
                      const finalPrice = item.customPrice !== undefined ? item.customPrice : item.product.price;
                      return (
                        <div
                          key={`${item.product.id}-${item.priceOptionLabel || 'store'}`}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-all"
                        >
                          <div 
                            className="space-y-0.5 text-left cursor-pointer group/cartitem flex-1"
                            title={`Click để xem chi tiết sản phẩm: ${item.product.name}`}
                            onClick={() => {
                              setSelectedProduct(item.product);
                              setActiveTab('catalog');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                              showToast(`Đang xem chi tiết sản phẩm: ${item.product.name}`);
                            }}
                          >
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-[9px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                                {item.product.categoryLabel}
                              </span>
                              {item.priceOptionLabel && (
                                <span className="text-[9px] uppercase font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/50">
                                  {item.priceOptionLabel}
                                </span>
                              )}
                            </div>
                            <h4 className="text-xs font-black text-slate-800 group-hover/cartitem:text-blue-600 transition-colors">{item.product.name}</h4>
                            <p className="text-[11px] text-slate-400 font-mono font-bold">
                              Đơn giá: {formatVND(finalPrice)}
                            </p>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-6">
                            {/* Quantity adjustments */}
                            <div className="flex items-center bg-white border border-slate-300 rounded-xl p-1 shadow-sm">
                              <button
                                onClick={() => handleUpdateQuantity(item.product.id, -1, item.priceOptionLabel)}
                                className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-3.5 text-xs font-bold font-mono text-slate-800">{item.quantity}</span>
                              <button
                                onClick={() => handleUpdateQuantity(item.product.id, 1, item.priceOptionLabel)}
                                className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <div className="text-right min-w-[110px]">
                              <div className="text-xs font-mono font-bold text-slate-800">
                                {formatVND(finalPrice * item.quantity)}
                              </div>
                              <button
                                onClick={() => handleRemoveFromQuote(item.product.id, item.priceOptionLabel)}
                                className="text-[10px] text-red-500 hover:underline mt-0.5 font-bold cursor-pointer"
                              >
                                Bỏ khỏi bảng
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-slate-50 border border-dashed border-slate-200 rounded-xl space-y-4">
                    <p className="text-xs text-slate-400 font-bold">Quý khách chưa chọn thiết bị nào từ danh sách sản phẩm.</p>
                    <button
                      onClick={() => setActiveTab('catalog')}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow cursor-pointer"
                    >
                      Xem danh sách thiết bị
                    </button>
                  </div>
                )}
              </div>

              {/* INTERACTIVE CONSUMABLES CALCULATOR WIDGET (Highly detailed, exact client request integration) */}
              <div id="consumables-calculator" className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-sm">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                    <Calculator className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-800">Dự Tính Ngân Sách Vật Tư & Giấy In</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tính lượng giấy tiêu thụ trong 1 năm</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-600 mb-1.5">Số hóa đơn / bill in ra mỗi ngày:</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="10"
                          max="1000"
                          step="10"
                          value={calcBillsPerDay}
                          onChange={(e) => setCalcBillsPerDay(Number(e.target.value))}
                          className="flex-1 accent-blue-600"
                        />
                        <span className="w-16 text-xs font-black font-mono bg-slate-100 py-1 px-2 rounded text-center text-blue-700">
                          {calcBillsPerDay} bill
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-600 mb-1.5">Chiều dài trung bình của 1 hóa đơn:</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="5"
                          max="50"
                          step="1"
                          value={calcReceiptLength}
                          onChange={(e) => setCalcReceiptLength(Number(e.target.value))}
                          className="flex-1 accent-blue-600"
                        />
                        <span className="w-16 text-xs font-black font-mono bg-slate-100 py-1 px-2 rounded text-center text-blue-700">
                          {calcReceiptLength} cm
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-600 mb-1.5">Khổ giấy in nhiệt đang dùng:</label>
                      <div className="flex gap-3">
                        {['K80', 'K57'].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setCalcPaperType(type as any)}
                            className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                              calcPaperType === type
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            Khổ {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Calculator output metrics */}
                  <div className="bg-slate-50 p-4.5 rounded-xl border border-slate-200 flex flex-col justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs pb-1.5 border-b border-slate-200/60">
                        <span className="text-slate-500 font-bold">Lượng giấy / ngày:</span>
                        <span className="font-bold font-mono text-slate-800">{calculatedPaperStats.metersPerDay} mét</span>
                      </div>
                      <div className="flex justify-between items-center text-xs pb-1.5 border-b border-slate-200/60">
                        <span className="text-slate-500 font-bold">Lượng giấy / năm:</span>
                        <span className="font-bold font-mono text-slate-800">{calculatedPaperStats.metersPerYear} mét</span>
                      </div>
                      <div className="flex justify-between items-center text-xs pb-1.5 border-b border-slate-200/60">
                        <span className="text-slate-500 font-bold">Số cuộn ước lượng:</span>
                        <span className="font-black font-mono text-blue-700">{calculatedPaperStats.rollsPerYear} cuộn</span>
                      </div>
                      <div className="flex justify-between items-center text-xs pb-1.5 border-b border-slate-200/60">
                        <span className="text-slate-500 font-bold">Quy cách đóng gói:</span>
                        <span className="font-bold text-slate-700">
                          {calcPaperType === 'K80' ? 'Thùng 50 cuộn' : 'Thùng 100 cuộn'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500 font-bold">Thùng cần mua / năm:</span>
                        <span className="font-black font-mono text-orange-600">{calculatedPaperStats.boxesNeeded} thùng</span>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-slate-200/60 text-center">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Chi phí giấy dự kiến / năm</div>
                      <div className={`text-base font-extrabold ${theme.primaryText} font-mono mt-0.5`}>
                        {formatVND(calculatedPaperStats.costEstimate)}
                      </div>
                      <button
                        onClick={() => {
                          if (calculatedPaperStats.matchingProduct) {
                            handleAddToQuote(calculatedPaperStats.matchingProduct, calculatedPaperStats.boxesNeeded);
                          }
                        }}
                        className="mt-2.5 w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 text-[10px] font-black uppercase tracking-wider rounded-lg border border-blue-200/60 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Thêm {calculatedPaperStats.boxesNeeded} thùng vào báo giá</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right side: Final customer registration details & Quotation simulator */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Form panel */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100 flex items-center gap-2">
                  <FileText className="w-4.5 h-4.5 text-blue-600" />
                  <span>Thông tin khách hàng nhận báo giá</span>
                </h3>

                <form onSubmit={handleSubmitQuoteRequest} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">Họ tên khách hàng *</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Nguyễn Văn A"
                      value={customerName}
                      onChange={(e) => { setCustomerName(e.target.value); setQuoteFormError(null); }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                      <span>Số điện thoại (đầy đủ 10 số) *</span>
                      <span className="text-[8px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-black uppercase">ĐÚNG ĐẦY ĐỦ</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Ví dụ: 0901234567"
                      value={customerPhone}
                      onChange={(e) => { setCustomerPhone(e.target.value); setQuoteFormError(null); }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">Tên công ty / Cửa hàng</label>
                      <input
                        type="text"
                        placeholder="Ví dụ: Công ty Minh Khang"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">Email nhận thư</label>
                      <input
                        type="email"
                        placeholder="Ví dụ: client@gmail.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold text-rose-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <span>Địa chỉ giao hàng & Lắp đặt *</span>
                      <span className="text-[9px] bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded font-bold uppercase">Bắt buộc</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố (Bắt buộc) *"
                      value={customerAddress}
                      onChange={(e) => { setCustomerAddress(e.target.value); setQuoteFormError(null); }}
                      className="w-full bg-slate-50 border border-rose-200 focus:border-rose-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white transition-all ring-1 ring-rose-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5">Hình thức thanh toán *</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`py-2 px-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          paymentMethod === 'cod'
                            ? 'border-blue-600 bg-blue-50/40 text-blue-800 ring-1 ring-blue-600'
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <Truck className={`w-3.5 h-3.5 ${paymentMethod === 'cod' ? 'text-blue-600' : 'text-slate-400'}`} />
                          <span className="text-xs font-extrabold font-sans">Giao hàng COD</span>
                        </div>
                        <span className="text-[9px] text-slate-400 mt-0.5 leading-tight block">Nhận hàng rồi mới thanh toán</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('bank_transfer')}
                        className={`py-2 px-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          paymentMethod === 'bank_transfer'
                            ? 'border-blue-600 bg-blue-50/40 text-blue-800 ring-1 ring-blue-600'
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck className={`w-3.5 h-3.5 ${paymentMethod === 'bank_transfer' ? 'text-blue-600' : 'text-slate-400'}`} />
                          <span className="text-xs font-extrabold font-sans">Chuyển khoản</span>
                        </div>
                        <span className="text-[9px] text-slate-400 mt-0.5 leading-tight block">Banking nhanh, bảo mật 100%</span>
                      </button>
                    </div>
                  </div>

                  {/* Voucher Discount Input Block */}
                  <div className="space-y-1.5 pt-2">
                    <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">Mã Voucher Giảm Giá</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Nhập mã voucher (VD: KM10, SOLUTIONBAO50...)"
                        value={voucherCode}
                        onChange={(e) => {
                          setVoucherCode(e.target.value);
                          setVoucherError('');
                        }}
                        disabled={!!appliedVoucher}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-mono uppercase font-black"
                      />
                      {appliedVoucher ? (
                        <button
                          type="button"
                          onClick={handleRemoveVoucher}
                          className={`px-4 py-2.5 ${theme.lightBg} ${theme.primaryText} font-extrabold text-[11px] uppercase rounded-xl transition-all cursor-pointer whitespace-nowrap`}
                        >
                          Hủy bỏ
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleApplyVoucher(voucherCode)}
                          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[11px] uppercase rounded-xl transition-all cursor-pointer shadow-sm whitespace-nowrap"
                        >
                          Áp dụng
                        </button>
                      )}
                    </div>
                    {voucherError && (
                      <p className="text-[10px] text-red-500 mt-1 font-extrabold">{voucherError}</p>
                    )}
                    {appliedVoucher && (
                      <div className="mt-1.5 p-2 bg-emerald-50 border border-emerald-150 rounded-lg flex justify-between items-center text-[11px]">
                        <span className="text-slate-600">
                          Đã áp dụng mã <strong className="text-emerald-700">{appliedVoucher.code}</strong>: <span className="font-semibold text-slate-500">{appliedVoucher.desc}</span>
                        </span>
                        <span className="font-mono font-black text-emerald-600">
                          -{formatVND(quoteDiscount)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-150 pt-3.5 space-y-2">
                    <div className="flex justify-between items-center text-xs text-slate-600 font-bold">
                      <span>Tạm tính:</span>
                      <span className="font-mono font-black text-slate-800">{formatVND(quoteSubtotal)}</span>
                    </div>
                    {quoteDiscount > 0 && (
                      <div className="flex justify-between items-center text-xs text-emerald-600 font-black">
                        <span>Voucher giảm giá:</span>
                        <span className="font-mono">-{formatVND(quoteDiscount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-sm text-slate-800 font-black border-t border-slate-100 pt-2 bg-slate-50 p-2.5 rounded-xl">
                      <span>TỔNG THANH TOÁN:</span>
                      <span className={`font-mono ${theme.primaryText} text-base`}>{formatVND(quoteTotal)}</span>
                    </div>
                  </div>

                  {quoteFormError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-xs text-red-700 animate-fade-in font-medium">
                      <span className="flex-shrink-0 mt-0.5">⚠️</span>
                      <div className="whitespace-pre-line">{quoteFormError}</div>
                    </div>
                  )}

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                    >
                      <Sparkles className="w-4 h-4 text-orange-400" />
                      <span>Xác nhận & Chuyển AI phân tích giải pháp</span>
                    </button>
                  </div>
                </form>
              </div>



            </div>
          </div>
        )}

        {/* -------------------- TAB VIEW 4: TROUBLESHOOT TECHNICAL WIKI -------------------- */}
        {activeTab === 'troubleshoot' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Troubleshoot Header Intro & Search */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-800">Cẩm Nang Tự Khắc Phục Sự Cố Thiết Bị</h2>
                  <p className="text-xs text-slate-500 font-medium">Bí kíp sửa lỗi máy in bill trắng tinh, mất kết nối máy chấm công, lỗi báo đèn đỏ máy in tem nhãn cực nhanh</p>
                </div>
              </div>

              {/* Live search specifically for errors */}
              <div className="relative max-w-lg">
                <input
                  type="text"
                  placeholder="Gõ từ khóa sự cố (ví dụ: in ra giấy trắng, mất mạng, đèn đỏ...)"
                  value={troubleSearch}
                  onChange={(e) => setTroubleSearch(e.target.value)}
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {/* Electronic Warranty Search (12-Month Check) */}
            <div className="bg-gradient-to-br from-blue-50/60 via-slate-50/80 to-indigo-50/60 border border-slate-200/60 rounded-2xl p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-300/10 rounded-full blur-2xl -z-10" />
              
              <div className="flex flex-col lg:flex-row gap-6 items-start justify-between relative z-10">
                <div className="space-y-3 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Hệ Thống Bảo Hành Điện Tử</span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-800 tracking-tight">
                    Tra Cứu Thời Hạn Bảo Hành Thiết Bị SOLUTION B A O
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    Nhập mã số Serial Number (S/N) trên thân máy hoặc tem dán để kiểm tra nhanh thời gian 12 tháng bảo hành chính hãng, ngày kích hoạt và ngày hết hạn bảo hành điện tử của bạn.
                  </p>
                  
                  {/* Examples */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[10px] text-slate-400 font-bold font-sans uppercase">Mẫu thử nghiệm nhanh:</span>
                    <button
                      onClick={() => handleCheckWarranty(undefined, 'VN-RJ-8686')}
                      className="px-2 py-1 bg-white/70 hover:bg-blue-50 hover:text-blue-700 text-[10px] font-mono font-bold border border-slate-200/60 rounded-lg text-slate-500 cursor-pointer transition-all shrink-0"
                    >
                      VN-RJ-8686 (Ronald Jack - Còn hạn)
                    </button>
                    <button
                      onClick={() => handleCheckWarranty(undefined, 'VN-XP-350B')}
                      className="px-2 py-1 bg-white/70 hover:bg-red-50 hover:text-red-700 text-[10px] font-mono font-bold border border-slate-200/60 rounded-lg text-slate-500 cursor-pointer transition-all shrink-0"
                    >
                      VN-XP-350B (Xprinter - Hết hạn)
                    </button>
                    <button
                      onClick={() => handleCheckWarranty(undefined, 'VN-ZE-9999')}
                      className="px-2 py-1 bg-white/70 hover:bg-blue-50 hover:text-blue-700 text-[10px] font-mono font-bold border border-slate-200/60 rounded-lg text-slate-500 cursor-pointer transition-all shrink-0"
                    >
                      VN-ZE-9999 (Zebra - Còn hạn)
                    </button>
                  </div>
                </div>

                {/* Form and Results Box */}
                <div className="w-full lg:max-w-md bg-white/75 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-5 space-y-4 shadow-[0_4px_15px_rgba(0,0,0,0.01)] shrink-0">
                  <form onSubmit={handleCheckWarranty} className="space-y-2.5">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Nhập số S/N sản phẩm:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Ví dụ: VN-RJ-8686 hoặc mã S/N bất kỳ..."
                        value={warrantySerial}
                        onChange={(e) => setWarrantySerial(e.target.value)}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold uppercase text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                      />
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition-all shadow cursor-pointer flex items-center gap-1.5 uppercase shrink-0"
                      >
                        <Search className="w-3.5 h-3.5" />
                        <span>Tra cứu</span>
                      </button>
                    </div>
                    {warrantyError && (
                      <p className="text-[10px] text-red-500 font-bold font-sans flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 animate-pulse" />
                        <span>{warrantyError}</span>
                      </p>
                    )}
                  </form>

                  {/* Results visualization */}
                  {warrantyChecked && warrantyResult && (
                    <div className="border-t border-slate-100 pt-3.5 space-y-3.5 animate-slide-down">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[10px] text-slate-400 font-mono uppercase font-black">Kết Quả Tra Cứu:</span>
                        {warrantyResult.isUnderWarranty ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase rounded border border-emerald-200">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            <span>Còn Bảo Hành</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-800 text-[9px] font-black uppercase rounded border border-red-200">
                            <AlertCircle className="w-3 h-3 text-red-600" />
                            <span>Hết Hạn Bảo Hành</span>
                          </span>
                        )}
                      </div>

                      <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-3 space-y-2 text-xs">
                        <div className="flex justify-between gap-3">
                          <span className="text-slate-400 font-sans shrink-0">Tên sản phẩm:</span>
                          <span className="text-right text-slate-800 font-bold">{warrantyResult.productName}</span>
                        </div>
                        <div className="flex justify-between gap-3">
                          <span className="text-slate-400 font-sans shrink-0">Model:</span>
                          <span className="text-right text-slate-800 font-bold font-mono">{warrantyResult.model}</span>
                        </div>
                        <div className="flex justify-between gap-3">
                          <span className="text-slate-400 font-sans shrink-0">Số S/N tra cứu:</span>
                          <span className="text-right text-slate-800 font-bold font-mono">{warrantyResult.serial}</span>
                        </div>
                        <div className="flex justify-between gap-3 border-t border-slate-200/50 pt-2 mt-2">
                          <span className="text-slate-400 font-sans shrink-0">Ngày kích hoạt:</span>
                          <span className="text-right text-slate-800 font-bold font-mono">{warrantyResult.purchaseDate}</span>
                        </div>
                        <div className="flex justify-between gap-3">
                          <span className="text-slate-400 font-sans shrink-0">Ngày hết hạn (12T):</span>
                          <span className="text-right text-slate-800 font-bold font-mono">{warrantyResult.expireDate}</span>
                        </div>
                      </div>

                      {warrantyResult.isUnderWarranty ? (
                        <div className="text-[11px] text-emerald-700 bg-emerald-50/50 border border-emerald-100 rounded-xl p-3 leading-relaxed flex gap-2">
                          <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                          <div>
                            Thiết bị của bạn còn <strong>{warrantyResult.daysLeftOrExpired} ngày</strong> bảo hành chính hãng. Quý khách được hỗ trợ kỹ thuật cài đặt miễn phí trọn vẹn!
                          </div>
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-600 bg-red-50/30 border border-red-100 rounded-xl p-3 leading-relaxed flex flex-col gap-2">
                          <div className="flex gap-2">
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                            <div>
                              Thiết bị đã quá hạn bảo hành 12 tháng <strong>{warrantyResult.daysLeftOrExpired} ngày</strong>.
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const autoPrompt = `Tôi tra cứu bảo hành thiết bị S/N: ${warrantyResult.serial} (${warrantyResult.productName}) và thấy đã hết hạn bảo hành. Máy đang bị sự cố cần hỗ trợ. Hãy tư vấn cho tôi chính sách sửa chữa dịch vụ có tính phí ưu đãi hoặc các bước gửi linh kiện về trung tâm bảo hành SOLUTION B A O để sửa chữa nhé.`;
                              setActiveTab('advisor');
                              handleSendAiMessage(autoPrompt);
                            }}
                            className="text-left text-[10px] font-black uppercase text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>Gửi trợ lý AI yêu cầu hỗ trợ sửa chữa dịch vụ ưu đãi</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Structured Diagnostics accordion list */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Active issues menu list */}
              <div className="lg:col-span-5 space-y-3">
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pb-3 border-b border-slate-100 mb-3">
                    Danh mục sự cố kỹ thuật thường gặp
                  </h3>

                  <div className="space-y-2">
                    {filteredTroubleshoots.map((guide, idx) => {
                      const isActive = selectedTroubleshoot === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedTroubleshoot(idx)}
                          className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                            isActive
                              ? 'bg-orange-50/50 border-orange-400/60 shadow-sm'
                              : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className={`p-1.5 rounded-lg shrink-0 ${
                            isActive ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-500'
                          }`}>
                            <InfoIcon className="w-4 h-4" />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                              {highlightText(guide.categoryLabel, troubleSearch)}
                            </span>
                            <h4 className={`text-xs font-black leading-snug ${
                              isActive ? 'text-orange-700' : 'text-slate-700'
                            }`}>
                              {highlightText(guide.problem, troubleSearch)}
                            </h4>
                          </div>
                        </button>
                      );
                    })}

                    {filteredTroubleshoots.length === 0 && (
                      <div className="text-center py-6 text-slate-400 text-xs font-medium">
                        Không tìm thấy sự cố kỹ thuật nào khớp với từ khóa tìm kiếm.
                      </div>
                    )}
                  </div>
                </div>

                {/* Technical hotline helper card */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-5 rounded-2xl shadow-sm space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-orange-400 uppercase tracking-widest">Không tự sửa được lỗi?</h4>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Đội ngũ hỗ trợ kỹ thuật của SOLUTION B A O luôn sẵn sàng giải đáp và xử lý qua UltraViewer hoàn toàn miễn phí.
                    </p>
                  </div>
                  <a
                    href="tel:0908555547"
                    className={`w-full py-2.5 ${theme.primary} ${theme.primaryHover} text-white text-xs font-bold uppercase rounded-xl transition-all shadow block text-center`}
                  >
                    Hotline kỹ thuật: 0908.555.547
                  </a>
                </div>
              </div>

              {/* Step-by-step diagnostic active display zone */}
              <div className="lg:col-span-7">
                {selectedTroubleshoot !== null && filteredTroubleshoots[selectedTroubleshoot] ? (
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                    <div className="space-y-2 border-b border-slate-100 pb-4.5">
                      <span className="px-2.5 py-0.5 bg-orange-100 text-orange-700 text-[10px] font-black uppercase rounded border border-orange-200">
                        {highlightText(filteredTroubleshoots[selectedTroubleshoot].categoryLabel, troubleSearch)}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-800 leading-snug">
                        {highlightText(filteredTroubleshoots[selectedTroubleshoot].problem, troubleSearch)}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Các bước thực hiện khắc phục:</h4>
                      <div className="space-y-4">
                        {filteredTroubleshoots[selectedTroubleshoot].steps.map((step, sIdx) => (
                          <div key={sIdx} className="flex gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-all">
                            <div className="w-7.5 h-7.5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-mono font-black shrink-0 shadow-sm">
                              {sIdx + 1}
                            </div>
                            <div className="text-xs text-slate-600 leading-relaxed font-medium pt-0.5">
                              {highlightText(step, troubleSearch)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Simulation completion feedback */}
                    <div className="bg-blue-50 border border-blue-200 p-4.5 rounded-xl text-center space-y-3">
                      <p className="text-xs text-slate-600 font-medium">
                        Bạn đã thực hiện các bước trên nhưng máy vẫn báo lỗi?
                      </p>
                      <button
                        onClick={() => {
                          const errorProb = filteredTroubleshoots[selectedTroubleshoot].problem;
                          const autoPrompt = `Tôi đang gặp lỗi: "${errorProb}" trên thiết bị của mình. Tôi đã thử các bước hướng dẫn cơ bản trong cẩm nang sửa lỗi kỹ thuật nhưng vẫn không xử lý được. Hãy tư vấn chi tiết hơn cho tôi cách xử lý sâu về phần mềm hoặc hướng dẫn cách gửi máy qua bảo hành/sửa chữa tại trung tâm SOLUTION B A O.`;
                          setActiveTab('advisor');
                          handleSendAiMessage(autoPrompt);
                        }}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold uppercase rounded-lg transition-all shadow cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <Sparkles className="w-4 h-4 text-orange-400" />
                        <span>Nhờ trợ lý AI hỗ trợ sửa lỗi nâng cao</span>
                      </button>
                    </div>

                  </div>
                ) : (
                  <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <HelpCircle className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-extrabold text-slate-800">Chưa chọn nội dung sự cố</h4>
                      <p className="text-slate-400 text-xs max-w-sm mx-auto">
                        Hãy chọn một sự cố thường gặp từ danh sách bên trái để mở rộng tài liệu kĩ thuật hướng dẫn chi tiết từng bước tự khắc phục.
                      </p>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Frequently Asked Questions (FAQ) Section - Minimalist Frosted Glass Design */}
            <div className="bg-gradient-to-tr from-slate-50/70 via-white/85 to-blue-50/70 rounded-3xl p-6 md:p-8 border border-slate-200/50 shadow-sm relative overflow-hidden mt-8">
              {/* Ambient background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl -z-10" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/5 rounded-full blur-3xl -z-10" />

              <div className="max-w-3xl mb-8 space-y-2">
                <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest bg-blue-100/60 px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Hỏi Đáp Kỹ Thuật (FAQ)</span>
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight">
                  Giải Đáp Thắc Mắc Về Cài Đặt & Khả Năng Tương Thích
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  Tổng hợp các câu hỏi phổ biến từ khách hàng trong quá trình tự lắp đặt thiết bị chấm công, máy in hóa đơn và lựa chọn hệ điều hành phù hợp.
                </p>
              </div>

              {/* Filter Categories Bar with neat animation */}
              <div className="mb-6 flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'Tất cả câu hỏi', icon: HelpCircle },
                  { id: 'attendance', label: 'Máy chấm công', icon: Fingerprint },
                  { id: 'printer', label: 'In hóa đơn & Giấy', icon: Printer },
                  { id: 'label', label: 'Máy in tem nhãn', icon: Barcode },
                  { id: 'general', label: 'Phần mềm & Kết nối', icon: Cpu },
                ].map((cat) => {
                  const IconComponent = cat.icon;
                  const isActive = faqCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setFaqCategory(cat.id);
                        setExpandedFaqIndex(null);
                      }}
                      className={`relative flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 border cursor-pointer ${
                        isActive
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10 scale-[1.02]'
                          : 'bg-white/60 hover:bg-white/90 text-slate-600 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span>{cat.label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="activeFaqCatGlow"
                          className="absolute inset-0 rounded-2xl bg-blue-500/10 pointer-events-none -z-10"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-4 max-w-4xl">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, idx) => {
                    const isOpen = expandedFaqIndex === idx;
                    return (
                      <div 
                        key={idx}
                        className="backdrop-blur-md bg-white/50 border border-white/60 hover:bg-white/80 rounded-2xl transition-all shadow-[0_2px_12px_rgba(0,0,0,0.01)] overflow-hidden"
                      >
                        <button
                          onClick={() => setExpandedFaqIndex(isOpen ? null : idx)}
                          className="w-full text-left p-4 md:p-5 flex justify-between items-center gap-4 cursor-pointer"
                        >
                          <div className="flex items-start gap-3">
                            <span className="w-5.5 h-5.5 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xs font-black shrink-0 font-sans">
                              Q
                            </span>
                            <h4 className="text-xs md:text-sm font-extrabold text-slate-800 leading-snug pt-0.5">
                              {highlightText(faq.q, troubleSearch)}
                            </h4>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden border-t border-slate-100/50"
                            >
                              <div className="px-5 pb-5 md:px-6 md:pb-6 pt-0">
                                <div className="flex items-start gap-3 mt-4">
                                  <span className="w-5.5 h-5.5 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center text-xs font-black shrink-0 font-sans">
                                    A
                                  </span>
                                  <p className="text-xs text-slate-600 leading-relaxed font-medium pt-0.5 whitespace-pre-line">
                                    {highlightText(faq.a, troubleSearch)}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-12 bg-white/40 border border-dashed border-slate-200 rounded-2xl">
                    <HelpCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-500">Không tìm thấy câu hỏi phù hợp với danh mục hoặc từ khóa.</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Vui lòng chọn danh mục khác hoặc thay đổi từ khóa tìm kiếm.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* -------------------- TAB VIEW 6: NEWS & BLOG (TIN TỨC & CẨM NANG) -------------------- */}
        {activeTab === 'news' && (
          <div className="space-y-8 animate-fade-in">
            {/* Header / Filter Bar */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                    <Newspaper className="w-5 h-5 text-blue-600" />
                  </div>
                  <h1 className="text-xl font-black text-slate-800 uppercase tracking-tight">
                    Tin Tức & Cẩm Nang
                  </h1>
                </div>
                <p className="text-xs text-slate-400 font-medium">
                  Cẩm nang công nghệ, hướng dẫn sửa lỗi máy in bill, máy chấm công từ chuyên gia SOLUTION B A O.
                </p>
              </div>

              {/* Search input specific for News */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1 sm:w-64">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Tìm bài viết, cẩm nang..."
                    value={newsSearchQuery}
                    onChange={(e) => setNewsSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white text-slate-800 font-medium transition-all"
                  />
                  {newsSearchQuery && (
                    <button
                      onClick={() => setNewsSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-[10px] font-black cursor-pointer"
                    >
                      X
                    </button>
                  )}
                </div>

                {/* Back to list button if inside detailed view */}
                {selectedArticle && (
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    ← Danh sách
                  </button>
                )}
              </div>
            </div>

            {/* Category selection bar */}
            {!selectedArticle && (
              <div className="flex flex-wrap items-center gap-2 pb-1 overflow-x-auto">
                {[
                  { id: 'all', label: 'Tất cả bài viết' },
                  { id: 'technical', label: 'Hướng Dẫn Kỹ Thuật' },
                  { id: 'reviews', label: 'Đánh Giá Sản Phẩm' },
                  { id: 'news', label: 'Tin tức Công Nghệ' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setNewsCategoryFilter(cat.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      newsCategoryFilter === cat.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/10'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}

            {/* ARTICLE DETAIL VIEW */}
            {selectedArticle ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left side: Main Article Content */}
                <article className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                  {/* Category Badge & Back */}
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <span className={`px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-lg ${
                      selectedArticle.category === 'technical' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                      selectedArticle.category === 'reviews' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                      'bg-purple-50 text-purple-600 border border-purple-100'
                    }`}>
                      {selectedArticle.categoryLabel}
                    </span>
                    <button
                      onClick={() => setSelectedArticle(null)}
                      className="text-xs font-extrabold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer hover:underline"
                    >
                      ← Trở về danh sách
                    </button>
                  </div>

                  {/* Title & Meta Info */}
                  <div className="space-y-4">
                    <h1 className="text-xl md:text-2xl font-black text-slate-800 leading-tight">
                      {selectedArticle.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-slate-400 text-xs font-medium border-y border-slate-100 py-3">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        Tác giả: <strong className="text-slate-600">{selectedArticle.author}</strong>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {selectedArticle.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {selectedArticle.readTime}
                      </span>
                      <span className="flex items-center gap-1.5 ml-auto md:ml-0">
                        <Activity className="w-3.5 h-3.5 text-slate-400" />
                        {selectedArticle.views.toLocaleString('vi-VN')} lượt xem
                      </span>
                    </div>
                  </div>

                  {/* Highlight Summary Card */}
                  <div className="bg-slate-50 border-l-4 border-blue-600 rounded-r-2xl p-4 text-xs md:text-sm text-slate-600 italic font-medium leading-relaxed">
                    "{selectedArticle.summary}"
                  </div>

                  {/* Cover Image */}
                  {selectedArticle.image && selectedArticle.image.trim() && (
                    <div className="rounded-2xl overflow-hidden shadow-sm aspect-video max-h-[360px] relative">
                      <img
                        src={selectedArticle.image}
                        alt={selectedArticle.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  {/* Article Rich Sections */}
                  <div className="space-y-6">
                    {selectedArticle.sections.map((section, sIdx) => (
                      <div key={sIdx} className="space-y-3">
                        <h2 className="text-sm md:text-base font-black text-slate-800 uppercase tracking-tight">
                          {section.title}
                        </h2>
                        
                        <div className="space-y-2.5">
                          {section.paragraphs.map((pText, pIdx) => (
                            <p key={pIdx} className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
                              {pText}
                            </p>
                          ))}
                        </div>

                        {/* Optional Section List */}
                        {section.list && section.list.length > 0 && (
                          <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4.5 my-3">
                            <ul className="space-y-2">
                              {section.list.map((lItem, lIdx) => (
                                <li key={lIdx} className="flex items-start gap-2 text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                                  <span>{lItem}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Optional Warning/Alert Callout */}
                        {section.alert && (
                          <div className="border-l-4 border-amber-500 bg-amber-50/70 p-4 rounded-r-2xl text-xs text-amber-800 font-medium leading-relaxed">
                            {section.alert}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Share buttons */}
                  <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-8">
                    <div className="text-xs text-slate-400 font-bold">
                      Cung cấp bởi SOLUTION B A O Technology
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        showToast('Đã sao chép liên kết cẩm nang vào bộ nhớ tạm!');
                      }}
                      className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 border border-blue-100"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      Chia sẻ bài viết
                    </button>
                  </div>

                  {/* Interactive Live Comments Container */}
                  <div className="border-t border-slate-100 pt-6 space-y-6">
                    <h3 className="text-sm md:text-base font-black text-slate-800 uppercase tracking-tight flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                      Bình luận từ độc giả ({ (newsComments[selectedArticle.id] || []).length })
                    </h3>

                    {/* Comments List */}
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                      { (newsComments[selectedArticle.id] || []).length === 0 ? (
                        <p className="text-xs text-slate-400 italic">Chưa có bình luận nào cho cẩm nang này. Hãy là người đầu tiên chia sẻ ý kiến của bạn!</p>
                      ) : (
                        (newsComments[selectedArticle.id] || []).map((cmt, cIdx) => (
                          <div key={cIdx} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-1.5">
                            <div className="flex justify-between items-center text-[10px] md:text-xs">
                              <strong className="text-slate-800 font-extrabold">{cmt.author}</strong>
                              <span className="text-slate-400 font-medium">{cmt.date}</span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed font-medium">
                              {cmt.content}
                            </p>
                          </div>
                        ))
                      )}
                    </div>

                    {/* New Comment Form */}
                    <div className="bg-slate-50/50 border border-slate-150 p-4 rounded-2xl space-y-3">
                      <h4 className="text-xs font-black text-slate-700 uppercase tracking-wide">Để lại phản hồi kỹ thuật của bạn</h4>
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                        <div className="md:col-span-4">
                          <input
                            type="text"
                            placeholder="Họ tên của bạn *"
                            value={newCommentName}
                            onChange={(e) => setNewCommentName(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 font-medium"
                            required
                          />
                        </div>
                        <div className="md:col-span-8">
                          <input
                            type="text"
                            placeholder="Ý kiến hoặc câu hỏi của bạn về lỗi kỹ thuật này... *"
                            value={newCommentText}
                            onChange={(e) => setNewCommentText(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 font-medium"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            if (!newCommentName.trim() || !newCommentText.trim()) {
                              showToast('Vui lòng điền tên và nội dung phản hồi!');
                              return;
                            }
                            const currentCmt = newsComments[selectedArticle.id] || [];
                            const updated = {
                              ...newsComments,
                              [selectedArticle.id]: [
                                ...currentCmt,
                                {
                                  author: newCommentName.trim(),
                                  content: newCommentText.trim(),
                                  date: new Date().toLocaleDateString('vi-VN')
                                }
                              ]
                            };
                            setNewsComments(updated);
                            setNewCommentName('');
                            setNewCommentText('');
                            showToast('Đã gửi bình luận của bạn thành công!');
                          }}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1 shadow-sm"
                        >
                          Gửi bình luận
                        </button>
                      </div>
                    </div>

                  </div>

                </article>

                {/* Right side: Sticky Recommended Products panel */}
                <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                  <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-sm space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-2">
                      <ShoppingBag className="w-4.5 h-4.5 text-blue-600" />
                      <span>Sản Phẩm Khuyên Dùng</span>
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                      Các thiết bị chính hãng được đề cập trong bài viết, khuyên dùng đồng bộ để tránh phát sinh lỗi tương thích.
                    </p>

                    <div className="space-y-4 pt-1">
                      {selectedArticle.relatedProductIds.map((rId) => {
                        const prd = products.find((p) => p.id === rId);
                        if (!prd) return null;
                        const inQuote = quoteItems.find((item) => item.product.id === prd.id);
                        
                        return (
                          <div key={prd.id} className="bg-slate-50 border border-slate-150 p-3 rounded-2xl flex flex-col gap-2 transition-all hover:border-blue-300">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4 className="text-xs font-extrabold text-slate-800 leading-snug">
                                  {prd.name}
                                </h4>
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                  {prd.brand}
                                </span>
                              </div>
                              <span className={`text-xs font-extrabold ${theme.primaryText} font-mono`}>
                                {formatVND(prd.price)}
                              </span>
                            </div>

                            <div className="flex gap-2 mt-1">
                              <button
                                type="button"
                                onClick={() => {
                                  handleAddToQuote(prd);
                                  showToast(`Đã thêm ${prd.name} vào báo giá!`);
                                }}
                                className={`flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all cursor-pointer flex items-center justify-center gap-1 border ${
                                  inQuote
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 shadow-sm'
                                }`}
                              >
                                {inQuote ? 'Đã thêm ✓' : 'Thêm báo giá'}
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  // Switch to AI chat and send a custom prompt about this product in context of the article
                                  setActiveTab('advisor');
                                  handleSendAiMessage(`Chào Hoàng Anh, tôi đang đọc bài viết "${selectedArticle.title}" của SOLUTION B A O. Tôi muốn được tư vấn chi tiết hơn về cấu hình, thông số, dịch vụ lắp đặt và chế độ bảo hành đi kèm cho thiết bị: ${prd.name} (${prd.brand}).`);
                                }}
                                className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-blue-600 border border-slate-200 rounded-lg text-[10px] font-bold transition-all cursor-pointer"
                                title="Nhắn tư vấn viên hỏi về thiết bị này"
                              >
                                Hỏi Tư Vấn
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Technical Chat regarding the guide */}
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-5 rounded-3xl shadow-sm space-y-3.5 relative overflow-hidden group">
                    <div className="absolute -right-8 -bottom-8 opacity-10 transition-transform group-hover:scale-110 duration-500">
                      <Sparkles className="w-32 h-32" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-[9px] font-black uppercase tracking-widest text-orange-400 bg-orange-950/40 w-max px-2 py-0.5 rounded-md">
                        TƯ VẤN KỸ THUẬT NƠI CHÁT
                      </div>
                      <h4 className="text-xs font-black uppercase">Chưa sửa được lỗi thiết bị?</h4>
                      <p className="text-slate-200 text-[10px] leading-relaxed">
                        Hỏi trực tiếp chuyên viên kỹ thuật để phân tích mã lỗi, hướng dẫn can thiệp driver máy in, IP máy chấm công theo dải thiết lập thực tế tại văn phòng của bạn.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('advisor');
                        handleSendAiMessage(`Tôi đang gặp sự cố và muốn hỏi thêm về chủ đề được đề cập trong bài viết cẩm nang kỹ thuật: "${selectedArticle.title}". Xin hãy hướng dẫn cho tôi các bước chẩn đoán lỗi tiếp theo!`);
                      }}
                      className="w-full py-2 bg-white hover:bg-slate-50 text-blue-700 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                      Nhắn tin với tư vấn viên ngay
                    </button>
                  </div>
                </aside>
              </div>
            ) : (
              /* LIST VIEW CONTAINER */
              <div className="space-y-8">
                
                {/* Apply search and category filtering to NEWS_ARTICLES */}
                {(() => {
                  const filtered = newsArticles.filter((art) => {
                    const matchesCategory = newsCategoryFilter === 'all' || art.category === newsCategoryFilter;
                    const matchesSearch = !newsSearchQuery.trim() || 
                      art.title.toLowerCase().includes(newsSearchQuery.toLowerCase()) ||
                      art.summary.toLowerCase().includes(newsSearchQuery.toLowerCase()) ||
                      art.categoryLabel.toLowerCase().includes(newsSearchQuery.toLowerCase());
                    return matchesCategory && matchesSearch;
                  });

                  if (filtered.length === 0) {
                    return (
                      <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4">
                        <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-400">
                          <Newspaper className="w-7 h-7" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">Không tìm thấy bài viết</h3>
                          <p className="text-xs text-slate-500 font-sans leading-relaxed">
                            Không tìm thấy cẩm nang kỹ thuật hoặc bài viết nào trùng với từ khóa "{newsSearchQuery}". Vui lòng thử lại bằng từ khóa khác hoặc xóa bộ lọc.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setNewsSearchQuery('');
                            setNewsCategoryFilter('all');
                          }}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                        >
                          Xóa bộ lọc
                        </button>
                      </div>
                    );
                  }

                  // Find featured article (always first in filtered if no search, or simply first filtered match)
                  const featured = filtered[0];
                  const remaining = filtered.slice(1);

                  return (
                    <div className="space-y-8 animate-fade-in">
                      
                      {/* FEATURED HERO CARD (Only shown when not searching specifically or just showing the top matched article in a premium wide frame) */}
                      {featured && !newsSearchQuery && (
                        <div 
                          onClick={() => setSelectedArticle(featured)}
                          className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group grid grid-cols-1 lg:grid-cols-12"
                        >
                          <div className="lg:col-span-7 aspect-video lg:aspect-auto min-h-[240px] md:min-h-[320px] relative overflow-hidden bg-slate-100">
                            {featured.image && featured.image.trim() ? (
                              <img
                                src={featured.image}
                                alt={featured.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-slate-100">
                                <Newspaper className="w-12 h-12 text-slate-300" />
                              </div>
                            )}
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-lg bg-blue-600 text-white shadow-md">
                                Tin tức nổi bật
                              </span>
                            </div>
                          </div>
                          
                          <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between space-y-4">
                            <div className="space-y-3">
                              <div className="flex items-center gap-3 text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-wider">
                                <span className="text-blue-600 font-black">{featured.categoryLabel}</span>
                                <span>•</span>
                                <span>{featured.date}</span>
                              </div>
                              <h2 className="text-base md:text-lg font-black text-slate-800 group-hover:text-blue-600 transition-colors leading-snug">
                                {featured.title}
                              </h2>
                              <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-3">
                                {featured.summary}
                              </p>
                            </div>

                            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                              <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                                <User className="w-3.5 h-3.5" /> {featured.author}
                              </span>
                              <span className="text-xs text-blue-600 font-black flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                Đọc bài viết →
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ARTICLES GRID */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(newsSearchQuery ? filtered : remaining).map((art) => (
                          <div
                            key={art.id}
                            onClick={() => setSelectedArticle(art)}
                            className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group h-full"
                          >
                            <div className="space-y-4">
                              {/* Aspect image container */}
                              <div className="aspect-video relative overflow-hidden bg-slate-100">
                                {art.image && art.image.trim() ? (
                                  <img
                                    src={art.image}
                                    alt={art.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    referrerPolicy="no-referrer"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-slate-100">
                                    <Newspaper className="w-10 h-10 text-slate-300" />
                                  </div>
                                )}
                                <div className="absolute top-3 left-3">
                                  <span className={`px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider rounded-md shadow-sm text-white ${
                                    art.category === 'technical' ? 'bg-orange-600' :
                                    art.category === 'reviews' ? 'bg-emerald-600' :
                                    'bg-purple-600'
                                  }`}>
                                    {art.categoryLabel}
                                  </span>
                                </div>
                              </div>

                              <div className="px-5 space-y-2">
                                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                  <span>{art.date}</span>
                                  <span>•</span>
                                  <span>{art.readTime}</span>
                                </div>
                                <h3 className="text-xs md:text-sm font-extrabold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                                  {art.title}
                                </h3>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-3">
                                  {art.summary}
                                </p>
                              </div>
                            </div>

                            <div className="px-5 py-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[10px] md:text-xs">
                              <span className="text-slate-400 font-bold flex items-center gap-1">
                                <User className="w-3.5 h-3.5" /> {art.author}
                              </span>
                              <span className="text-blue-600 font-black flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                                Đọc tiếp →
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  );
                })()}

              </div>
            )}

          </div>
        )}

        {/* -------------------- TAB VIEW 7: ORDER LOOKUP (TRA CỨU ĐƠN HÀNG) -------------------- */}
        {activeTab === 'order-lookup' && (
          <div className="space-y-6 animate-fade-in text-left">
            
            {/* Header section with solid modern corporate theme */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Search className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-800">Tra Cứu Tiến Độ Đơn Hàng & Yêu Cầu Báo Giá</h2>
                  <p className="text-xs text-slate-500 font-medium">Nhập mã đơn hàng (ĐH-XXXX), số điện thoại hoặc họ tên để tra cứu tức thì tình trạng vận chuyển, thông tin thanh toán và nhận tư vấn cấu hình từ đội ngũ SOLUTION B A O.</p>
                </div>
              </div>

              {/* Form to query */}
              <form onSubmit={(e) => handleLookupOrder(undefined, e)} className="flex flex-col sm:flex-row gap-3 pt-2">
                <div className="relative flex-1 text-left">
                  <input
                    type="text"
                    required
                    placeholder="Nhập mã đơn hàng (ví dụ: ĐH-1234), số điện thoại hoặc họ tên..."
                    value={lookupQuery}
                    onChange={(e) => setLookupQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-medium"
                  />
                  <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  {lookupQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setLookupQuery('');
                        setLookupResult(null);
                        setHasSearchedOrder(false);
                      }}
                      className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <Search className="w-4 h-4" />
                  <span>Tra cứu</span>
                </button>
              </form>
            </div>

            {/* Results output or Quick-look shortcuts */}
            {!hasSearchedOrder ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>Lịch sử đơn hàng trên trình duyệt này</span>
                </h3>
                {(() => {
                  try {
                    const saved = localStorage.getItem('solutionbao_orders');
                    if (saved) {
                      const list = JSON.parse(saved);
                      if (Array.isArray(list) && list.length > 0) {
                        return (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {list.map((order: any, idx: number) => (
                              <div
                                key={order.id || idx}
                                onClick={() => {
                                  setLookupQuery(order.id);
                                  handleLookupOrder(order.id);
                                }}
                                className="border border-slate-100 hover:border-blue-200 hover:bg-blue-50/20 rounded-xl p-4 transition-all cursor-pointer flex justify-between items-center group text-left"
                              >
                                <div className="space-y-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-black text-blue-600 font-mono">{order.id}</span>
                                    <span className="text-[10px] text-slate-400 font-bold font-mono">{order.date}</span>
                                  </div>
                                  <div className="text-[11px] font-bold text-slate-700 truncate">
                                    {order.productName || 'Yêu cầu tư vấn thiết bị'}
                                  </div>
                                  <div className="text-[10px] text-slate-400 font-bold">
                                    Khách hàng: <span className="text-slate-600">{order.customerName}</span>
                                  </div>
                                </div>
                                <div className="text-right shrink-0">
                                  <div className="text-xs font-black text-slate-800 font-mono">
                                    {formatVND(order.totalAmount)}
                                  </div>
                                  <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full mt-1 ${
                                    order.status === 'Chờ xử lý' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                                    order.status === 'Đang giao' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                    order.status === 'Đã hoàn thành' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                    'bg-rose-50 text-rose-600 border border-rose-100'
                                  }`}>
                                    {order.status}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      }
                    }
                  } catch (err) {}
                  return (
                    <div className="py-8 text-center text-slate-400 space-y-2">
                      <Package className="w-10 h-10 text-slate-300 mx-auto" />
                      <p className="text-xs font-bold">Bạn chưa tạo đơn hàng hay báo giá nào trên trình duyệt này.</p>
                      <p className="text-[10px] text-slate-400">Các yêu cầu tạo từ tab "Tạo Báo Giá PDF" sẽ được lưu trữ tự động tại đây để bạn tiện quản lý và tra cứu.</p>
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="space-y-6">
                {lookupResult && lookupResult.length > 0 ? (
                  lookupResult.map((order: any, idx: number) => {
                    const isBank = order.paymentMethod?.toLowerCase().includes('chuyển khoản') || order.paymentMethod?.toLowerCase().includes('banking') || order.paymentMethod?.toLowerCase().includes('bank_transfer');
                    
                    return (
                      <div key={order.id || idx} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden text-left">
                        {/* Header of specific order */}
                        <div className="p-5 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                          <div className="space-y-1 text-left">
                            <div className="flex items-center flex-wrap gap-2.5">
                              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider font-mono">Đơn Hàng:</span>
                              <span className="text-sm font-black text-blue-600 font-mono tracking-tight">{order.id}</span>
                              <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                                order.status === 'Chờ xử lý' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                order.status === 'Đang giao' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                order.status === 'Đã hoàn thành' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                'bg-rose-50 text-rose-600 border-rose-100'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-400 font-bold">Ngày ghi nhận: <span className="font-mono text-slate-600">{order.date}</span></p>
                          </div>
                          
                          <div className="text-left sm:text-right shrink-0">
                            <span className="text-xs text-slate-400 font-bold uppercase block tracking-wider">Tổng giá trị đơn hàng</span>
                            <span className={`text-base font-black ${theme.primaryText} font-mono`}>{formatVND(order.totalAmount)}</span>
                          </div>
                        </div>

                        {/* Framer Motion Step-Progress Visual Timeline & Copy Tracking Link */}
                        <div className="p-5 border-b border-slate-100 bg-white space-y-5">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <div className="space-y-0.5">
                              <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                                <Activity className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
                                <span>Tiến trình xử lý & Vận chuyển</span>
                              </h4>
                              <p className="text-[10px] text-slate-400 font-medium">Theo dõi thời gian thực quá trình chuẩn bị sản phẩm và bàn giao.</p>
                            </div>
                            
                            {/* Copy tracking link button */}
                            <button
                              onClick={() => {
                                const trackingUrl = `${window.location.origin}${window.location.pathname}?orderId=${order.id}`;
                                navigator.clipboard.writeText(trackingUrl);
                                showToast('Đã sao chép liên kết theo dõi đơn hàng!');
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 text-[10px] font-black uppercase tracking-wider rounded-xl border border-blue-200 transition-all duration-200 cursor-pointer active:scale-95 shrink-0"
                              title="Sao chép đường dẫn trực tiếp để tra cứu nhanh"
                            >
                              <Copy className="w-3 h-3 text-blue-600" />
                              <span>Sao chép link theo dõi</span>
                            </button>
                          </div>
                          
                          {/* The progress bar and steps */}
                          {(() => {
                            const statusMap: Record<string, number> = {
                              'Chờ xử lý': 1,
                              'Đang xử lý': 1,
                              'Đang giao': 2,
                              'Đang vận chuyển': 2,
                              'Đã giao': 3,
                              'Đã hoàn thành': 3,
                              'Đã thanh toán': 3,
                            };
                            const currentStep = statusMap[order.status] || 1;
                            
                            const steps = [
                              { id: 1, label: 'Đang chuẩn bị', desc: 'Kiểm tra & Cấu hình máy', icon: '⚙️' },
                              { id: 2, label: 'Đang vận chuyển', desc: 'Bàn giao shipper công nghệ', icon: '🚚' },
                              { id: 3, label: 'Đã hoàn thành', desc: 'Lắp đặt & Hỗ trợ kỹ thuật', icon: '✅' },
                            ];
                            
                            return (
                              <div className="relative pt-4 pb-2 px-2 sm:px-6">
                                {/* Background Line */}
                                <div className="absolute left-10 right-10 top-[2.25rem] h-1 bg-slate-100 rounded-full" />
                                
                                {/* Framer Motion Filled Line */}
                                <motion.div 
                                  className="absolute left-10 top-[2.25rem] h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full origin-left"
                                  initial={{ width: '0%' }}
                                  animate={{ 
                                    width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' 
                                  }}
                                  transition={{ duration: 1, ease: 'easeInOut' }}
                                />
                                
                                {/* Step Nodes */}
                                <div className="relative flex justify-between">
                                  {steps.map((step) => {
                                    const isCompleted = step.id < currentStep;
                                    const isActive = step.id === currentStep;
                                    const isPending = step.id > currentStep;
                                    
                                    return (
                                      <div key={step.id} className="flex flex-col items-center text-center space-y-2 max-w-[100px] sm:max-w-[140px] relative z-10">
                                        {/* Node circle */}
                                        <motion.div
                                          initial={{ scale: 0.8, opacity: 0 }}
                                          animate={{ scale: 1, opacity: 1 }}
                                          transition={{ delay: step.id * 0.15, duration: 0.3 }}
                                          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-black transition-all duration-300 ${
                                            isCompleted 
                                              ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200' 
                                              : isActive 
                                              ? 'bg-white border-blue-600 text-blue-600 ring-4 ring-blue-100 shadow-md' 
                                              : 'bg-white border-slate-200 text-slate-400'
                                          }`}
                                        >
                                          {isCompleted ? (
                                            <motion.span
                                              initial={{ scale: 0 }}
                                              animate={{ scale: 1 }}
                                              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                                            >
                                              ✓
                                            </motion.span>
                                          ) : (
                                            <span>{step.icon}</span>
                                          )}
                                        </motion.div>
                                        
                                        {/* Step Labels */}
                                        <div className="space-y-0.5">
                                          <span className={`text-[10.5px] font-black block tracking-tight ${
                                            isActive ? 'text-blue-700 font-extrabold' : isCompleted ? 'text-slate-700 font-bold' : 'text-slate-400 font-semibold'
                                          }`}>
                                            {step.label}
                                          </span>
                                          <span className="text-[9px] text-slate-400 font-medium leading-tight block">
                                            {step.desc}
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })()}
                        </div>

                        {/* Order Details Body */}
                        <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
                          {/* Left: Customer & Products */}
                          <div className="lg:col-span-7 space-y-5">
                            {/* Customer information details */}
                            <div className="space-y-3">
                              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-1.5">Thông tin giao nhận</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                <div className="space-y-1">
                                  <span className="text-slate-400 font-bold block">Họ tên người nhận:</span>
                                  <span className="text-slate-800 font-black">{order.customerName}</span>
                                </div>
                                <div className="space-y-1">
                                  <span className="text-slate-400 font-bold block">Số điện thoại liên lạc:</span>
                                  <span className="text-slate-800 font-black font-mono">{order.customerPhone}</span>
                                </div>
                                <div className="space-y-1">
                                  <span className="text-slate-400 font-bold block">Thư điện tử (Email):</span>
                                  <span className="text-slate-800 font-medium">{order.customerEmail}</span>
                                </div>
                                <div className="space-y-1">
                                  <span className="text-slate-400 font-bold block">Phương thức thanh toán:</span>
                                  <span className="text-slate-800 font-black text-blue-600">{order.paymentMethod}</span>
                                </div>
                                <div className="sm:col-span-2 space-y-1">
                                  <span className="text-slate-400 font-bold block">Địa chỉ nhận hàng:</span>
                                  <span className="text-slate-800 font-bold">{order.customerAddress}</span>
                                </div>
                              </div>
                            </div>

                            {/* Products summary list */}
                            <div className="space-y-3">
                              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-1.5">Danh sách thiết bị cấu hình</h4>
                              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4.5 space-y-2.5">
                                {order.productName ? (
                                  order.productName.split(', ').map((pString: string, pIdx: number) => (
                                    <div key={pIdx} className="flex justify-between items-start text-xs border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                                      <div className="flex items-center gap-2 min-w-0">
                                        <div className="w-5 h-5 bg-white border border-slate-200 rounded-md flex items-center justify-center shrink-0">
                                          <Package className="w-3.5 h-3.5 text-blue-600" />
                                        </div>
                                        <span className="text-slate-700 font-bold truncate">{pString}</span>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div className="text-slate-500 italic text-xs">Yêu cầu cấu hình thiết bị trọn gói</div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Right: Payment guide / COD notice */}
                          <div className="lg:col-span-5 space-y-4">
                            {isBank ? (
                              <div className="bg-slate-900 border border-slate-800 text-slate-100 p-5 rounded-2xl space-y-4 shadow-md text-left">
                                <h4 className="text-[11px] font-black uppercase tracking-wider text-orange-400 border-b border-slate-800 pb-2 flex items-center gap-1.5">
                                  <ShieldCheck className="w-4 h-4 text-orange-400" />
                                  <span>Hướng dẫn chuyển khoản nhanh</span>
                                </h4>
                                <p className="text-[10px] text-slate-400 leading-relaxed font-medium">Để đơn hàng được duyệt lắp đặt và xuất kho nhanh chóng, quý khách vui lòng thanh toán chuyển khoản với thông tin sau:</p>
                                
                                <div className="space-y-3 bg-slate-950/80 p-4 rounded-xl border border-slate-850 text-xs text-left font-mono">
                                  <div className="space-y-0.5 font-sans">
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Tên ngân hàng</span>
                                    <span className="text-slate-200 font-extrabold text-[11px]">Ngân hàng Quân đội (MB Bank)</span>
                                  </div>
                                  
                                  <div className="space-y-1 border-t border-slate-850 pt-2.5">
                                    <span className="text-[10px] text-slate-500 font-bold font-sans uppercase tracking-wider block">Số tài khoản</span>
                                    <div className="flex items-center justify-between">
                                      <span className="text-orange-400 font-black font-mono text-sm tracking-wide">1903555547012</span>
                                      <button
                                        onClick={() => {
                                          navigator.clipboard.writeText('1903555547012');
                                          showToast('Đã sao chép Số tài khoản MB Bank!');
                                        }}
                                        className="p-1.5 bg-slate-850 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                                        title="Sao chép số tài khoản"
                                      >
                                        <Copy className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </div>

                                  <div className="space-y-1 border-t border-slate-850 pt-2.5">
                                    <span className="text-[10px] text-slate-500 font-bold font-sans uppercase tracking-wider block">Tên tài khoản thụ hưởng</span>
                                    <span className="text-slate-200 font-bold text-[11px] font-sans">CONG TY TNHH CONG NGHE SOLUTION B A O</span>
                                  </div>

                                  <div className="space-y-1 border-t border-slate-850 pt-2.5">
                                    <span className="text-[10px] text-slate-500 font-bold font-sans uppercase tracking-wider block">Nội dung chuyển khoản</span>
                                    <div className="flex items-center justify-between gap-1">
                                      <span className="text-blue-400 font-black font-mono text-[11px] truncate uppercase">Thanh toan {order.id} {order.customerPhone}</span>
                                      <button
                                        onClick={() => {
                                          navigator.clipboard.writeText(`Thanh toan ${order.id} ${order.customerPhone}`);
                                          showToast('Đã sao chép Nội dung chuyển khoản!');
                                        }}
                                        className="p-1.5 bg-slate-850 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                                        title="Sao chép nội dung"
                                      >
                                        <Copy className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex gap-2.5 items-center bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/80">
                                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1 shrink-0">
                                    <div className="w-full h-full border border-slate-300 rounded flex flex-wrap p-0.5 opacity-80">
                                      <div className="w-1/2 h-1/2 bg-slate-900 border border-white"></div>
                                      <div className="w-1/2 h-1/2 bg-slate-100 flex items-center justify-center text-[6px] font-black font-mono">MB</div>
                                      <div className="w-1/2 h-1/2 bg-slate-100"></div>
                                      <div className="w-1/2 h-1/2 bg-slate-900 border border-white"></div>
                                    </div>
                                  </div>
                                  <p className="text-[9px] text-slate-400 leading-normal font-medium">Quét QR hoặc chuyển đúng tài khoản trên. SOLUTION B A O sẽ xác thực tự động và đổi trạng thái đơn hàng sang <strong className="text-emerald-400">Đã thanh toán</strong> trong 2-5 phút.</p>
                                </div>
                              </div>
                            ) : (
                              <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl space-y-3.5 text-left">
                                <h4 className="text-xs font-black uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
                                  <Truck className="w-4 h-4 text-blue-600" />
                                  <span>Thông báo giao hàng COD</span>
                                </h4>
                                <p className="text-xs text-blue-700 leading-relaxed font-medium">Bạn đã đăng ký hình thức <strong>Thanh toán khi nhận hàng (COD)</strong>.</p>
                                <div className="space-y-2 text-[11px] text-blue-600/90 leading-relaxed pl-3.5 border-l-2 border-blue-400">
                                  <p>• Nhân viên hỗ trợ sẽ gọi điện thoại xác nhận trong vòng 15-30 phút.</p>
                                  <p>• Thiết bị sẽ được kiểm tra kỹ lưỡng, đóng gói tiêu chuẩn và chuyển giao cho đơn vị vận chuyển ngay lập tức.</p>
                                  <p>• Bạn có quyền kiểm tra niêm phong, cắm thử nguồn thiết bị trước khi thực hiện thanh toán cho shipper.</p>
                                </div>
                                <div className="text-[10px] text-blue-500 font-bold bg-blue-100/40 p-2.5 rounded-lg text-center">
                                  Hotline xử lý gấp: <strong>0908.555.547</strong>
                                </div>
                              </div>
                            )}

                            {/* Connected Support Center for this order */}
                            <div className="bg-white border border-slate-150 rounded-2xl p-4.5 space-y-3 text-left">
                              <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500">Hỗ trợ riêng cho đơn hàng này</h4>
                              <div className="grid grid-cols-1 gap-2">
                                <button
                                  onClick={() => {
                                    const prompt = `Tôi cần tư vấn cấu hình chi tiết và hướng dẫn lắp đặt phần mềm chấm công cho đơn hàng ${order.id} của tôi. Thông tin thiết bị: ${order.productName}.`;
                                    setActiveTab('advisor');
                                    handleSendAiMessage(prompt);
                                    showToast('Đã gửi thông tin đơn hàng tới Chuyên Viên Tư Vấn!');
                                  }}
                                  className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 text-[10.5px] font-extrabold uppercase tracking-wide rounded-xl border border-blue-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                  <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                                  <span>Thảo luận giải pháp với Chuyên Viên</span>
                                </button>

                                <a
                                  href="https://zalo.me/0908555547"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full py-2.5 bg-orange-50 hover:bg-orange-100 text-orange-700 hover:text-orange-800 text-[10.5px] font-extrabold uppercase tracking-wide rounded-xl border border-orange-200 transition-all flex items-center justify-center gap-1.5 text-center"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                  <span>Chat Zalo với Kỹ Thuật Viên</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4 shadow-sm">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto border border-slate-200">
                      <Search className="w-8 h-8 text-slate-400 animate-pulse" />
                    </div>
                    <div className="space-y-2 max-w-md mx-auto">
                      <h4 className="text-sm font-black text-slate-800 uppercase tracking-wide">Không tìm thấy kết quả tra cứu</h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">Hệ thống không tìm thấy đơn hàng nào khớp với thông tin <strong>"{lookupQuery}"</strong>.</p>
                      <p className="text-[11px] text-slate-400 font-medium">Vui lòng đảm bảo rằng bạn nhập đúng mã đơn hàng (ví dụ: <strong>ĐH-1234</strong>) hoặc số điện thoại, tên khách hàng chính xác đã đăng ký.</p>
                    </div>
                    <button
                      onClick={() => {
                        setHasSearchedOrder(false);
                        setLookupQuery('');
                        setLookupResult(null);
                      }}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all border border-slate-200 cursor-pointer"
                    >
                      Quay lại lịch sử
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* -------------------- TAB VIEW 5: ADMIN PANEL (TRANG QUẢN TRỊ HỆ THỐNG) -------------------- */}
        {activeTab === 'admin' && (
          <AdminPanel
            products={products}
            saveProducts={saveProducts}
            priceAlerts={priceAlerts}
            handleRemovePriceAlert={handleRemovePriceAlert}
            troubleshoots={troubleshoots}
            saveTroubleshoots={saveTroubleshoots}
            quoteItems={quoteItems}
            mainCategories={mainCategories}
            setMainCategories={setMainCategories}
            subCategories={subCategories}
            setSubCategories={setSubCategories}
            newsArticles={newsArticles}
            saveNewsArticles={saveNewsArticles}
            webConfig={webConfig}
            saveWebConfig={saveWebConfig}
            productReviews={productReviews}
            saveProductReviews={saveProductReviews}
            generateXMLSitemap={generateXMLSitemap}
            solutionBanners={solutionBanners}
            setSolutionBanners={setSolutionBanners}
            handleGoToHomeAndReset={handleGoToHomeAndReset}
            landingPages={landingPages}
            onSaveLandingPages={handleSaveLandingPages}
            onPreviewLivePage={handlePreviewLiveLandingPage}
            comboBundles={comboBundles}
            saveComboBundles={saveComboBundles}
            comboShowcaseConfig={comboShowcaseConfig}
            saveComboShowcaseConfig={saveComboShowcaseConfig}
          />
        )}

        {/* -------------------- TAB VIEW: LIVE ELEMENTOR LANDING PAGE -------------------- */}
        {activeTab === 'landing' && (() => {
          const targetPage = landingPages.find(p => p.slug === activeLandingSlug) || landingPages[0];
          if (!targetPage) return null;
          return (
            <div className="w-full min-h-screen bg-slate-50 text-slate-800">
              <PublicLandingPageView
                page={targetPage}
                products={products}
                onBackToHome={handleGoToHomeAndReset}
                onSubmitLead={handleSubmitLandingLead}
                primaryPhone={webConfig.primaryPhone}
                zaloLink={webConfig.zaloLink}
              />
            </div>
          );
        })()}
          </>
        )}
          </motion.div>
        </AnimatePresence>

      </main>

      {/* 6. COMPREHENSIVE FOOTER - Standard Vietnam Enterprise Blueprint */}
      {activeTab !== 'admin' && activeTab !== 'landing' && (
        <footer className="hidden md:block bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-12 shrink-0">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Corporate profile */}
          <div className="space-y-4">
            <div className="text-white text-lg font-black tracking-tight flex items-center gap-2.5">
              {webConfig.footerLogoImageUrl ? (
                <img 
                  src={webConfig.footerLogoImageUrl} 
                  alt="Footer Logo" 
                  className="h-8 w-auto max-w-[140px] object-contain rounded bg-white p-1 shadow-sm shrink-0" 
                />
              ) : (
                <span className={`w-7 h-7 ${theme.primary || 'bg-red-600'} rounded-lg flex items-center justify-center font-black text-xs text-white shrink-0 shadow-sm`}>
                  {(webConfig.footerLogoText || webConfig.logoText || 'SB').substring(0, 3)}
                </span>
              )}
              <span className="font-black leading-snug text-white">{webConfig.footerCompanyName || webConfig.companyName || 'Quản lý cửa hàng & doanh nghiệp'}</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px] font-medium text-left">
              {webConfig.footerDescription || `Chuyên phân phối, lắp đặt các giải pháp quản lý bán hàng toàn diện, chính hãng hàng đầu tại Việt Nam. ${webConfig.footerCompanyName || webConfig.companyName || 'Quản lý cửa hàng & doanh nghiệp'} - Uy tín xây dựng niềm tin trọn vẹn.`}
            </p>
            <div className="text-[11px] text-slate-500 space-y-1.5 font-mono text-left">
              <div>MST: {webConfig.footerTaxCode || webConfig.taxCode || '0315357891'} do Sở KH&ĐT cấp</div>
              <div>{webConfig.footerCopyright || `Bản quyền © ${new Date().getFullYear()} ${webConfig.footerCompanyName || webConfig.companyName || 'Quản lý cửa hàng & doanh nghiệp'}.`}</div>
            </div>
          </div>

          {/* Col 2: Offices & Address details */}
          <div className="space-y-4 text-left">
            <h4 className="text-white font-extrabold uppercase text-xs tracking-wider border-b border-slate-800 pb-2">Liên hệ văn phòng</h4>
            <ul className="space-y-3 text-[11px] leading-relaxed">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{webConfig.address}</span>
              </li>
              <li className="flex flex-col gap-1 border-l-2 border-blue-500/40 pl-2.5">
                <span className="text-[9px] text-slate-500 font-extrabold uppercase tracking-wider block">Hotline Tư vấn 24/7:</span>
                <a 
                  href={`tel:${webConfig.primaryPhone.replace(/[\s\.]/g, '')}`} 
                  className="text-blue-400 hover:text-blue-300 font-extrabold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  <span>{webConfig.primaryPhone} (Zalo)</span>
                </a>
              </li>
              {webConfig.secondaryPhone && (
                <li className="flex flex-col gap-1 border-l-2 border-teal-500/40 pl-2.5">
                  <span className="text-[9px] text-slate-500 font-extrabold uppercase tracking-wider block">Hotline Kỹ thuật / Máy bàn:</span>
                  <a 
                    href={`tel:${webConfig.secondaryPhone.replace(/[\s\.]/g, '')}`} 
                    className="text-teal-400 hover:text-teal-300 font-extrabold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 shrink-0" />
                    <span>{webConfig.secondaryPhone}</span>
                  </a>
                </li>
              )}
              <li className="flex flex-col gap-1 border-l-2 border-teal-500/40 pl-2.5">
                <span className="text-[9px] text-slate-500 font-extrabold uppercase tracking-wider block">Kết nối hỗ trợ nhanh:</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a 
                    href={webConfig.zaloLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-2.5 py-1 bg-teal-600/25 hover:bg-teal-600/40 border border-teal-500/30 rounded text-teal-300 font-bold flex items-center gap-1.5 transition-all text-[10px]"
                  >
                    <ZaloIcon className="w-3.5 h-3.5 rounded-full overflow-hidden" />
                    <span>Chat Zalo</span>
                  </a>
                  <a 
                    href={webConfig.facebookLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-2.5 py-1 bg-blue-600/25 hover:bg-blue-600/40 border border-blue-500/30 rounded text-blue-300 font-bold flex items-center gap-1.5 transition-all text-[10px]"
                  >
                    <Facebook className="w-3.5 h-3.5 text-blue-400" />
                    <span>Facebook</span>
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2 pt-1 border-t border-slate-800/40">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`mailto:${webConfig.email}`} className="hover:text-white hover:underline transition-all">{webConfig.email}</a>
              </li>
            </ul>
          </div>

          {/* Col 3 & 4: Dynamic columns from webConfig or defaults */}
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
          ]).map((col: any) => (
            <div key={col.id} className="space-y-4 text-left">
              <h4 className="text-white font-extrabold uppercase text-xs tracking-wider border-b border-slate-800 pb-2">{col.title}</h4>
              <ul className="space-y-2 text-[11px] leading-relaxed">
                {(col.links || []).map((link: any) => (
                  <li key={link.id}>
                    <a 
                      href={link.url || "#"} 
                      onClick={(e) => {
                        if (link.url && link.url.startsWith('#')) {
                          e.preventDefault();
                          setActiveTab('catalog');
                        }
                      }}
                      className="hover:text-white hover:underline transition-colors block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className="border-t border-slate-800/80 py-4 text-center text-[10px] text-slate-500 bg-slate-950/40">
          Thiết kế lấy cảm hứng và đồng bộ dữ liệu giao diện chuẩn hóa solutionbao.vn
        </div>
      </footer>
      )}

      {/* Frosted Glass Modal Lightbox for Technical Specifications */}
      {(() => {
        const activeProductForSpecs = expandedProduct 
          ? (products.find((p) => p.id === expandedProduct) || PRODUCTS_DATA.find((p) => p.id === expandedProduct))
          : null;

        if (!activeProductForSpecs) return null;

        return (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            {/* Click backdrop to close */}
            <div 
              className="absolute inset-0 cursor-default" 
              onClick={() => setExpandedProduct(null)} 
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-xl bg-white/85 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-scale-up">
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-200/50 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black tracking-wider text-blue-700 uppercase bg-blue-50 px-2 py-0.5 rounded">
                    {highlightText(activeProductForSpecs.categoryLabel, searchQuery)}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                    {highlightText(activeProductForSpecs.brand, searchQuery)}
                  </span>
                </div>
                <button
                  onClick={() => setExpandedProduct(null)}
                  className="p-1.5 hover:bg-slate-200/50 border border-slate-200/60 rounded-xl text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                {/* Hero Summary */}
                <div className="flex flex-col sm:flex-row items-center gap-5 pb-5 border-b border-slate-200/50">
                  <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center shrink-0 shadow-inner relative overflow-hidden">
                    {activeProductForSpecs.image ? (
                      <img
                        src={activeProductForSpecs.image}
                        alt={activeProductForSpecs.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        {activeProductForSpecs.category === 'attendance' && <Fingerprint className="w-10 h-10 text-blue-600 stroke-[1.2]" />}
                        {activeProductForSpecs.category === 'printer' && <Printer className="w-10 h-10 text-indigo-600 stroke-[1.2]" />}
                        {activeProductForSpecs.category === 'scanner' && <Scan className="w-10 h-10 text-cyan-600 stroke-[1.2]" />}
                        {activeProductForSpecs.category === 'label' && <Barcode className="w-10 h-10 text-teal-600 stroke-[1.2]" />}
                        {activeProductForSpecs.category === 'consumable' && <FileText className="w-10 h-10 text-amber-600 stroke-[1.2]" />}
                        {activeProductForSpecs.category === 'drawer' && <Calculator className="w-10 h-10 text-rose-600 stroke-[1.2]" />}
                      </>
                    )}
                  </div>
                  <div className="space-y-1.5 text-center sm:text-left">
                    <h3 className="text-base font-black text-slate-800 tracking-tight leading-snug">
                      {highlightText(activeProductForSpecs.name, searchQuery)}
                    </h3>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                      <span className={`text-base font-extrabold ${theme.primaryText} font-mono`}>
                        {formatVND(activeProductForSpecs.price)}
                      </span>
                      <span className="text-xs text-slate-400 line-through font-mono">
                        {formatVND(activeProductForSpecs.originalPrice)}
                      </span>
                      <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-[9px] font-black uppercase rounded border border-orange-200/50">
                        GIẢM {formatVND(Math.round(activeProductForSpecs.originalPrice - activeProductForSpecs.price))}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Main Product Image - Large display if scraped with real image */}
                {activeProductForSpecs.image && (
                  <div 
                    onClick={() => {
                      const allImgs: string[] = [activeProductForSpecs.image];
                      if (activeProductForSpecs.images) {
                        activeProductForSpecs.images.forEach(im => {
                          if (im && !allImgs.includes(im)) allImgs.push(im);
                        });
                      }
                      openImageLightbox(allImgs, 0, activeProductForSpecs.name);
                    }}
                    className="rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm relative aspect-[16/9] bg-slate-50 cursor-zoom-in group"
                    title="Click để phóng to ảnh và xem trượt ảnh"
                  >
                    <img
                      src={activeProductForSpecs.image}
                      alt={activeProductForSpecs.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2.5 right-2.5 bg-slate-900/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm flex items-center gap-1.5 shadow pointer-events-none">
                      <ZoomIn className="w-3.5 h-3.5 text-blue-400" />
                      <span>Click phóng to ảnh</span>
                    </div>
                  </div>
                )}

                {/* Product Video Section */}
                {activeProductForSpecs.videoUrl && (
                  <div className="space-y-2.5 border-t border-slate-200/40 pt-4">
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-red-600 flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                      <span>Video trải nghiệm thực tế</span>
                    </h4>
                    {(() => {
                      const embedUrl = getYoutubeEmbedUrl(activeProductForSpecs.videoUrl);
                      if (embedUrl) {
                        return (
                          <div className="rounded-2xl overflow-hidden border border-slate-200/60 shadow-md relative aspect-[16/9] bg-black">
                            <iframe
                              src={embedUrl}
                              title={`Video giới thiệu ${activeProductForSpecs.name}`}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              className="w-full h-full"
                            />
                          </div>
                        );
                      } else {
                        // Regular HTML5 video
                        return (
                          <div className="rounded-2xl overflow-hidden border border-slate-200/60 shadow-md bg-black relative">
                            <video 
                              src={activeProductForSpecs.videoUrl} 
                              controls 
                              className="w-full max-h-[300px] object-contain"
                            />
                          </div>
                        );
                      }
                    })()}
                  </div>
                )}

                {/* Key Features */}
                <div className="space-y-2.5">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Ưu điểm nổi bật</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50/50 p-4 rounded-2xl border border-slate-200/40">
                    {activeProductForSpecs.highlights.map((hl, idx) => (
                      <div key={idx} className="text-slate-600 text-[11px] flex items-start gap-1.5 leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{highlightText(hl, searchQuery)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Detailed Article Content (Tích hợp bài viết sản phẩm bóc tách & viết bài bởi AI) */}
                {activeProductForSpecs.articleContent && (
                  <div className="space-y-2.5 border-t border-slate-100 pt-5">
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
                      <span>Thông tin bài viết & mô tả chi tiết</span>
                    </h4>
                    <div className="bg-gradient-to-b from-indigo-50/20 to-transparent p-4 sm:p-5 rounded-2xl border border-indigo-50/60 text-xs text-slate-700 leading-relaxed font-sans space-y-3 prose max-w-none">
                      {/<[a-z][\s\S]*>/i.test(activeProductForSpecs.articleContent) || activeProductForSpecs.articleContent.includes('<p>') || activeProductForSpecs.articleContent.includes('<div>') ? (
                        <div 
                          className="rich-text-content space-y-3 font-sans text-xs text-slate-700 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: sanitizeHtml(activeProductForSpecs.articleContent) }}
                        />
                      ) : (
                        activeProductForSpecs.articleContent.split('\n\n').map((paragraph, pIdx) => {
                          const trimmed = paragraph.trim();
                          if (!trimmed) return null;
                          if (trimmed.startsWith('###')) {
                            return (
                              <h5 key={pIdx} className="text-xs font-black text-slate-800 uppercase tracking-wide mt-3 mb-1.5 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                                {trimmed.replace('###', '').trim()}
                              </h5>
                            );
                          }
                          if (trimmed.startsWith('##')) {
                            return (
                              <h4 key={pIdx} className="text-sm font-black text-blue-700 uppercase tracking-wide mt-4 mb-2">
                                {trimmed.replace('##', '').trim()}
                              </h4>
                            );
                          }
                          if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
                            return (
                              <ul key={pIdx} className="list-disc pl-4 space-y-1 my-1.5">
                                {trimmed.split('\n').map((item, iIdx) => (
                                  <li key={iIdx} className="text-[11px] text-slate-600 font-medium">
                                    {item.replace(/^[-*]\s*/, '').trim()}
                                  </li>
                                ))}
                              </ul>
                            );
                          }
                          return (
                            <p key={pIdx} className="text-slate-600 text-[11px] sm:text-xs font-medium font-sans">
                              {trimmed}
                            </p>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}

                {/* Detailed Specifications */}
                <div className="space-y-2.5">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>Thông số kỹ thuật chi tiết</span>
                  </h4>
                  <div className="border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm font-mono text-xs">
                    {Object.entries(activeProductForSpecs.specs).map(([key, val], idx) => (
                      <div 
                        key={idx} 
                        className={`flex justify-between gap-6 px-4 py-2.5 border-b border-slate-100 last:border-0 ${
                          idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                        }`}
                      >
                        <span className="text-slate-500 font-sans font-bold text-[11px] shrink-0">{highlightText(key, searchQuery)}</span>
                        <span className="text-right text-slate-800 font-bold text-[11px]">{highlightText(val as string, searchQuery)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-slate-200/50 bg-slate-50/80 flex justify-between items-center gap-4">
                <button
                  onClick={() => setExpandedProduct(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold uppercase text-slate-500 hover:text-slate-800 hover:bg-slate-200/40 transition-all cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    handleAddToQuote(activeProductForSpecs);
                    setExpandedProduct(null);
                  }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Chọn mua</span>
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Floating Subtle Admin Trigger (Removed as requested to save screen space) */}

      {/* 7. QUICK EDIT & ADD PRODUCT MODAL FOR ADMINS */}
      {(editingProduct || isAddingNewProduct) && (
        <div className={`fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-fade-in ${
          isModalMaximized ? 'p-0' : 'p-4'
        }`}>
          {/* Backdrop click close */}
          {!isModalMaximized && (
            <div 
              className="absolute inset-0 cursor-default" 
              onClick={() => {
                setEditingProduct(null);
                setIsAddingNewProduct(false);
              }} 
            />
          )}

          {/* Form Container */}
          <div className={`relative bg-white shadow-2xl flex flex-col border border-slate-200 transition-all duration-300 ${
            isModalMaximized 
              ? 'w-full h-full max-h-screen rounded-none' 
              : 'w-full max-w-2xl rounded-3xl overflow-hidden max-h-[90vh] animate-scale-up'
          }`}>
            {/* Header */}
            <div className="px-6 py-4.5 bg-slate-900 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-orange-400 animate-pulse" />
                <h3 className="text-sm font-black uppercase tracking-wide">
                  {editingProduct ? `Cập Nhật Thiết Bị: ${editingProduct.id}` : 'Thêm Thiết Bị Mới Vào Hệ Thống'}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalMaximized(!isModalMaximized)}
                  className="p-1.5 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-400 hover:text-white transition-all cursor-pointer"
                  title={isModalMaximized ? "Thu nhỏ cửa sổ (Bỏ toàn màn hình)" : "Mở rộng toàn màn hình"}
                >
                  {isModalMaximized ? <Minimize2 className="w-4 h-4 text-emerald-400" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setIsAddingNewProduct(false);
                  }}
                  className="p-1.5 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSaveQuickProduct} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* ID (Editable only for new products) */}
                <div>
                  <label className="block text-[11px] font-black uppercase text-slate-500 mb-1.5">Mã thiết bị (S/N / ID):</label>
                  <input
                    type="text"
                    required
                    disabled={!!editingProduct}
                    value={formId}
                    onChange={(e) => setFormId(e.target.value)}
                    placeholder="VD: VN-RJ-3000"
                    className="w-full bg-slate-50 disabled:bg-slate-100 disabled:text-slate-400 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-800 font-bold focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all font-mono"
                  />
                </div>

                {/* Name */}
                <div>
                  <label className="block text-[11px] font-black uppercase text-slate-500 mb-1.5">Tên thiết bị:</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="VD: Máy Chấm Công Ronald Jack K14 Pro"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-800 font-bold focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all"
                  />
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-[11px] font-black uppercase text-slate-500 mb-1.5">Nhóm danh mục:</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-800 font-bold focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all cursor-pointer"
                  >
                    <option value="attendance">Máy Chấm Công</option>
                    <option value="printer">Máy In Hóa Đơn</option>
                    <option value="scanner">Đầu Đọc Mã Vạch</option>
                    <option value="label">Máy In Tem Nhãn</option>
                    <option value="consumable">Giấy In & Vật Tư</option>
                    <option value="drawer">Hộp Đựng Tiền Cash</option>
                  </select>
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-[11px] font-black uppercase text-slate-500 mb-1.5">Hãng sản xuất / Thương hiệu:</label>
                  <input
                    type="text"
                    required
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    placeholder="VD: Ronald Jack, Xprinter, Zebra..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-800 font-bold focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-[11px] font-black uppercase text-slate-500 mb-1.5">Giá khuyến mãi (VND):</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    placeholder="VD: 1250000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-800 font-bold focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all font-mono"
                  />
                </div>

                {/* Original Price */}
                <div>
                  <label className="block text-[11px] font-black uppercase text-slate-500 mb-1.5">Giá gốc chưa giảm (VND):</label>
                  <input
                    type="number"
                    required
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                    placeholder="VD: 1550000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-800 font-bold focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all font-mono"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-[11px] font-black uppercase text-slate-500 mb-1.5">Link ảnh sản phẩm (Optional):</label>
                <input
                  type="url"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="https://example.com/image.jpg (Để trống nếu dùng icon mô phỏng mặc định)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-800 font-bold focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all"
                />
              </div>

              {/* Highlights */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[11px] font-black uppercase text-slate-500">Đặc điểm nổi bật (Mỗi dòng 1 ý):</label>
                  <span className="text-[9px] text-slate-400 font-semibold uppercase">VD: Bộ nhớ 3.000 vân tay</span>
                </div>
                <textarea
                  rows={3}
                  value={formHighlights}
                  onChange={(e) => setFormHighlights(e.target.value)}
                  placeholder="Nhập các đặc điểm chính của sản phẩm..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-800 font-bold focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all"
                />
              </div>

              {/* Technical Specifications */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[11px] font-black uppercase text-slate-500">Thông số kỹ thuật (Dạng 'Khóa: Giá trị', Mỗi dòng 1 dòng):</label>
                  <span className="text-[9px] text-slate-400 font-semibold uppercase">VD: Bộ nhớ: 3000 vân tay</span>
                </div>
                <textarea
                  rows={4}
                  value={formSpecs}
                  onChange={(e) => setFormSpecs(e.target.value)}
                  placeholder="Kiểu kết nối: USB/LAN&#10;Tốc độ in: 200mm/s&#10;Khổ giấy: K80 (80mm)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-800 font-bold focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all"
                />
              </div>

              {/* Is Popular Checkbox */}
              <div className="flex items-center gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200/60 font-sans">
                <input
                  type="checkbox"
                  id="form-is-popular"
                  checked={formIsPopular}
                  onChange={(e) => setFormIsPopular(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4 cursor-pointer"
                />
                <label htmlFor="form-is-popular" className="text-xs font-bold text-slate-700 cursor-pointer select-none flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>Đánh dấu là Sản phẩm Bán chạy & Nổi bật (Hiển thị nhãn HOT)</span>
                </label>
              </div>

              {/* Form Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3.5">
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setIsAddingNewProduct(false);
                  }}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. ORDER SUCCESS MODAL OVERLAY */}
      <AnimatePresence>
        {showOrderSuccessModal && (
          <div className="fixed inset-0 z-55 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 text-left"
            >
              <div className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-100 shadow-sm">
                  <CheckCircle className="w-8 h-8 text-emerald-600 animate-bounce" />
                </div>
                
                <div className="space-y-1.5 text-center">
                  <span className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-widest block font-mono">Đã Đăng Ký Yêu Cầu Thành Công</span>
                  <h3 className="text-lg font-black text-slate-800">Cảm Ơn Quý Khách, {customerName}!</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">
                    Yêu cầu báo giá và đơn đặt hàng giải pháp thiết bị của quý khách đã được lưu trữ an toàn trên hệ thống.
                  </p>
                </div>

                {/* Important credentials display box */}
                <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 max-w-sm mx-auto space-y-2 text-left">
                  <div className="flex justify-between items-center text-xs text-slate-400 font-bold uppercase tracking-wider">
                    <span>Mã tra cứu đơn hàng</span>
                    <span>Tạm tính</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base font-black text-blue-600 font-mono tracking-wide">{lastCreatedOrderId}</span>
                    <span className={`text-base font-black ${theme.primaryText} font-mono`}>{formatVND(quoteTotal)}</span>
                  </div>
                  <div className="border-t border-slate-200/60 pt-2 flex justify-between text-[11px] text-slate-500">
                    <span className="font-bold">Phương thức:</span>
                    <span className="font-extrabold text-slate-700">{paymentMethod === 'cod' ? 'Giao hàng COD' : 'Chuyển khoản'}</span>
                  </div>
                </div>

                <p className="text-[10.5px] text-slate-400 leading-normal max-w-sm mx-auto text-center">
                  Bạn có thể tra cứu chi tiết và thông tin hướng dẫn chuyển khoản bất kỳ lúc nào bằng cách sử dụng mã <strong className="text-slate-700 font-mono">{lastCreatedOrderId}</strong> trong tab <strong>"Tra cứu đơn hàng"</strong> ở thanh menu.
                </p>

                {/* Main navigation choices */}
                <div className="pt-3.5 border-t border-slate-100 grid grid-cols-1 gap-2.5">
                  <button
                    onClick={() => {
                      setShowOrderSuccessModal(false);
                      saveQuoteItems([]); // Clear cart items and save to localStorage
                      
                      const quoteSummary = quoteItems
                        .map((item) => {
                          const finalPrice = item.customPrice !== undefined ? item.customPrice : item.product.price;
                          const optText = item.priceOptionLabel ? ` (${item.priceOptionLabel})` : '';
                          return `- ${item.product.name} x${item.quantity} (Giá: ${formatVND(finalPrice)}${optText})`;
                        })
                        .join('\n');
                      const paymentText = paymentMethod === 'cod' 
                        ? 'hình thức giao hàng COD thanh toán tận nơi' 
                        : 'hình thức thanh toán Chuyển khoản ngân hàng (Banking)';
                      const autoPrompt = `Chào chuyên viên SOLUTION B A O, tôi là ${customerName} (SĐT: ${customerPhone}, Email: ${customerEmail || 'Chưa cung cấp'}, Địa chỉ: ${customerAddress || 'Chưa cung cấp'}). Tôi vừa lập bảng báo giá và đặt hàng mã ${lastCreatedOrderId} với ${paymentText}. Danh sách các thiết bị gồm:\n${quoteSummary}\nTổng chi phí đề xuất sau chiết khấu là ${formatVND(quoteTotal)}. Hãy tư vấn cho tôi về giải pháp lắp đặt phần mềm chấm công tiếng Việt, cài đặt driver máy in và hướng dẫn hoàn tất thanh toán/vận chuyển cho đơn hàng này.`;

                      setActiveTab('advisor');
                      handleSendAiMessage(autoPrompt);
                    }}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    <span>Thảo luận giải pháp với Trợ Lý AI</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowOrderSuccessModal(false);
                      saveQuoteItems([]); // Clear cart items and save to localStorage
                      setActiveTab('order-lookup');
                      setLookupQuery(lastCreatedOrderId);
                      handleLookupOrder(lastCreatedOrderId);
                    }}
                    className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200"
                  >
                    <Search className="w-4 h-4 text-blue-600" />
                    <span>Đến trang tra cứu để lấy số tài khoản</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowOrderSuccessModal(false);
                      saveQuoteItems([]); // Clear cart items and save to localStorage
                    }}
                    className="w-full py-2.5 text-slate-400 hover:text-slate-600 text-[10.5px] font-bold uppercase transition-all cursor-pointer text-center"
                  >
                    Đóng cửa sổ
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dynamic Product Comparison Floating Panel */}
      {activeTab !== 'admin' && activeTab !== 'landing' && comparedProductIds.length > 0 && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[45] w-full max-w-lg px-4">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            className="bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-800 p-3 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2.5">
              <div className="bg-blue-600 rounded-lg p-2 shrink-0">
                <Sliders className="w-4 h-4 text-white animate-pulse" />
              </div>
              <div className="text-left">
                <span className="text-[11px] font-black uppercase tracking-wider block text-blue-400">
                  So sánh thiết bị ({comparedProductIds.length}/3)
                </span>
                <span className="text-[9px] text-slate-400 font-medium block leading-none">
                  {comparedProductIds.length < 2 
                    ? "Chọn tiếp 1 sản phẩm để so sánh chi tiết" 
                    : "Đã đủ điều kiện đối chiếu thông số!"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setComparedProductIds([])}
                className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[9px] font-bold uppercase transition-all cursor-pointer"
              >
                Xóa hết
              </button>
              <button
                type="button"
                disabled={comparedProductIds.length < 2}
                onClick={() => setIsCompareModalOpen(true)}
                className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 shadow-sm ${
                  comparedProductIds.length >= 2
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                }`}
                title={comparedProductIds.length < 2 ? "Vui lòng chọn ít nhất 2 sản phẩm để so sánh" : "Bắt đầu so sánh chi tiết"}
              >
                <span>So sánh ngay</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* 9. DETAILED PRODUCT COMPARISON MODAL */}
      <AnimatePresence>
        {isCompareModalOpen && (
          <div className="fixed inset-0 z-55 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 text-left flex flex-col max-h-[92vh]"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <h3 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider">
                      Bảng So Sánh Chi Tiết Thiết Bị
                    </h3>
                    <p className="text-[10px] text-slate-400 font-medium">
                      Đối chiếu trực tiếp thông số kỹ thuật, giá thành và khuyến mãi
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCompareModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all cursor-pointer border border-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Comparison Body Content */}
              <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1 custom-scrollbar">
                {(() => {
                  const comparedProducts = products.filter((p) => comparedProductIds.includes(p.id));
                  if (comparedProducts.length === 0) {
                    return (
                      <div className="text-center py-12 text-slate-400 font-bold text-xs uppercase">
                        Chưa chọn sản phẩm nào để so sánh!
                      </div>
                    );
                  }

                  // Gather all spec keys dynamically
                  const allSpecKeys: string[] = Array.from(
                    new Set(comparedProducts.flatMap((p) => Object.keys(p.specs || {})))
                  ) as string[];

                  return (
                    <div className="space-y-4">
                      {/* Products overview horizontal grid */}
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse min-w-[600px] table-fixed">
                          <thead>
                            <tr className="border-b border-slate-100">
                              <th className="w-1/4 text-left p-2.5 text-[10px] font-black text-slate-400 uppercase tracking-wider bg-slate-50/50 rounded-tl-xl">
                                Tiêu chí so sánh
                              </th>
                              {comparedProducts.map((p, idx) => (
                                <th
                                  key={p.id}
                                  className={`p-3 text-center align-top relative transition-all duration-300 hover:bg-slate-50/45 ${
                                    idx === comparedProducts.length - 1 ? 'rounded-tr-2xl' : ''
                                  }`}
                                  style={{ width: `${75 / comparedProducts.length}%` }}
                                >
                                  {/* Close button to remove product from comparison with pop transition */}
                                  <button
                                    type="button"
                                    onClick={() => handleToggleCompare(p.id)}
                                    className="absolute top-2 right-2 p-1.5 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-full transition-all duration-300 cursor-pointer shadow-sm hover:rotate-90 z-10 hover:scale-110"
                                    title="Xóa khỏi danh sách so sánh"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>

                                  <div className="flex flex-col items-center space-y-2.5 mt-3 group">
                                    {/* Elevated, professionally framed product image card */}
                                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-tr from-slate-50 to-white border border-slate-150/85 rounded-2xl flex items-center justify-center overflow-hidden p-2.5 transition-all duration-500 ease-out shadow-sm group-hover:shadow-md group-hover:border-blue-200/90 group-hover:-translate-y-1 transform-gpu">
                                      {/* Decorative subtle border light overlay */}
                                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/10 transition-all duration-500 pointer-events-none rounded-2xl" />
                                      
                                      {/* Animated reflection sweeping glass overlay */}
                                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />

                                      {p.image ? (
                                        <LazyImage
                                          src={p.image}
                                          alt={p.name}
                                          className="w-full h-full object-contain p-0.5 transition-transform duration-500 ease-out group-hover:scale-110 transform-gpu"
                                        />
                                      ) : (
                                        <Package className="w-8 h-8 text-slate-300 transition-transform duration-500 ease-out group-hover:scale-110" />
                                      )}

                                      {/* Visual Status Indicator Dot inside image frame */}
                                      <div className="absolute bottom-1 right-1 flex h-2 w-2">
                                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                                          p.inventoryStatus === 'out_of_stock' ? 'bg-rose-400' : 'bg-emerald-400'
                                        }`}></span>
                                        <span className={`relative inline-flex rounded-full h-2 w-2 ${
                                          p.inventoryStatus === 'out_of_stock' ? 'bg-rose-500' : 'bg-emerald-500'
                                        }`}></span>
                                      </div>
                                    </div>

                                    <span className="text-[9px] font-extrabold tracking-widest text-blue-600 uppercase bg-blue-50/80 px-2 py-0.5 rounded-full border border-blue-100/50 shadow-sm transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                                      {p.brand}
                                    </span>
                                    <span className="text-[11px] font-extrabold text-slate-800 line-clamp-2 text-center leading-snug px-1.5 transition-colors duration-300 group-hover:text-blue-600" title={p.name}>
                                      {p.name}
                                    </span>
                                  </div>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-150">
                            {/* 1. Price row */}
                            <tr>
                              <td className="p-3 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider bg-slate-50/30">
                                Giá khuyến mãi
                              </td>
                              {comparedProducts.map((p) => {
                                const hasDiscount = p.originalPrice > p.price;
                                return (
                                  <td key={`price-${p.id}`} className="p-3 text-center">
                                    <div className="flex flex-col items-center">
                                      {hasDiscount && (
                                        <span className="text-[9px] text-slate-400 line-through font-mono">
                                          {formatVND(p.originalPrice)}
                                        </span>
                                      )}
                                      <span className={`text-xs sm:text-sm font-black ${theme.primaryText} font-mono`}>
                                        {formatVND(p.price)}
                                      </span>
                                    </div>
                                  </td>
                                );
                              })}
                            </tr>

                            {/* 2. Rating row */}
                            <tr>
                              <td className="p-3 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider bg-slate-50/30">
                                Đánh giá khách hàng
                              </td>
                              {comparedProducts.map((p) => (
                                <td key={`rating-${p.id}`} className="p-3 text-center">
                                  <div className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 rounded-lg border border-amber-100 text-[10px] font-black text-amber-600">
                                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                    <span>{getAverageRating(p.id)} ({getProductReviewsCount(p.id)})</span>
                                  </div>
                                </td>
                              ))}
                            </tr>

                            {/* 3. Stock Status */}
                            <tr>
                              <td className="p-3 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider bg-slate-50/30">
                                Tình trạng kho hàng
                              </td>
                              {comparedProducts.map((p) => {
                                const status = p.inventoryStatus || 'in_stock';
                                return (
                                  <td key={`stock-${p.id}`} className="p-3 text-center">
                                    {status === 'in_stock' ? (
                                      <span className="text-[9px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                                        Còn hàng
                                      </span>
                                    ) : status === 'out_of_stock' ? (
                                      <span className="text-[9px] font-extrabold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full inline-block">
                                        Hết hàng
                                      </span>
                                    ) : (
                                      <span className="text-[9px] font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full inline-block">
                                        Đặt trước
                                      </span>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>

                            {/* 4. Category */}
                            <tr>
                              <td className="p-3 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider bg-slate-50/30">
                                Danh mục thiết bị
                              </td>
                              {comparedProducts.map((p) => (
                                <td key={`cat-${p.id}`} className="p-3 text-center text-[11px] text-slate-600 font-bold">
                                  {p.categoryLabel}
                                </td>
                              ))}
                            </tr>

                            {/* 5. Highlights */}
                            <tr>
                              <td className="p-3 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider bg-slate-50/30 align-top">
                                Ưu điểm nổi bật
                              </td>
                              {comparedProducts.map((p) => (
                                <td key={`hl-${p.id}`} className="p-3 align-top text-[10.5px] text-slate-600 font-medium">
                                  <ul className="list-disc pl-3.5 space-y-1 text-left">
                                    {(p.highlights || []).map((hl, i) => (
                                      <li key={i}>{hl}</li>
                                    ))}
                                  </ul>
                                </td>
                              ))}
                            </tr>

                            {/* 6. Dynamic Specifications */}
                            {allSpecKeys.map((key) => (
                              <tr key={`spec-row-${key}`}>
                                <td className="p-3 text-[10px] font-bold text-slate-700 bg-slate-50/50">
                                  {key}
                                </td>
                                {comparedProducts.map((p) => {
                                  const val = p.specs?.[key] || '-';
                                  return (
                                    <td key={`spec-${p.id}-${key}`} className="p-3 text-center text-[11px] text-slate-600 font-semibold leading-relaxed">
                                      {val}
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}

                            {/* 7. Action Button row */}
                            <tr className="border-t-2 border-slate-150 bg-slate-50/40">
                              <td className="p-3.5 text-[10px] font-black text-slate-500 uppercase tracking-wider">
                                Lựa chọn
                              </td>
                              {comparedProducts.map((p) => {
                                const itemInQuote = quoteItems.find((item) => item.product.id === p.id);
                                return (
                                  <td key={`action-${p.id}`} className="p-3.5 text-center">
                                    <button
                                      type="button"
                                      onClick={() => handleAddToQuote(p)}
                                      className={`w-full max-w-[160px] mx-auto py-2 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                        itemInQuote
                                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                                      }`}
                                    >
                                      <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                                      <span>{itemInQuote ? 'Đã thêm' : 'Mua'}</span>
                                    </button>
                                  </td>
                                );
                              })}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Footer */}
              <div className="bg-slate-50 px-5 py-4 border-t border-slate-150 flex items-center justify-between shrink-0">
                <span className="text-[10px] text-slate-400 font-medium">
                  * Trực quan hóa thông số kỹ thuật sản phẩm giúp bạn đưa ra lựa chọn đầu tư tối ưu nhất.
                </span>
                <button
                  type="button"
                  onClick={() => setIsCompareModalOpen(false)}
                  className="px-5 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 font-extrabold text-[10px] uppercase rounded-xl transition-all cursor-pointer min-h-[38px]"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Service Badge Guarantee & Commitment Detail Modal */}
      <AnimatePresence>
        {activeServiceBadgeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-red-800 via-rose-900 to-red-950 text-white p-5 flex items-center justify-between relative overflow-hidden">
                <div className="flex items-center gap-3 relative z-10">
                  <div className="p-3 bg-white/10 rounded-xl border border-white/20">
                    <ShieldCheck className="w-6 h-6 text-yellow-300" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-yellow-300 bg-yellow-400/20 px-2 py-0.5 rounded">
                      Cam Kết Chất Lượng
                    </span>
                    <h3 className="text-base font-black text-white mt-0.5">
                      {activeServiceBadgeModal.title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setActiveServiceBadgeModal(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer relative z-10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4 overflow-y-auto text-slate-700 text-xs">
                <div className="p-3.5 bg-blue-50 border border-blue-200/80 rounded-xl text-blue-900 font-extrabold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Mô tả ngắn: {activeServiceBadgeModal.desc}</span>
                </div>

                {activeServiceBadgeModal.id === 'badge-1' && (
                  <div className="space-y-3 leading-relaxed">
                    <p className="font-bold text-slate-900 text-sm">Chính sách Hàng Chính Hãng 100%:</p>
                    <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                      <li>Tất cả máy chấm công (Ronald Jack, ZKTeco, Gigata), máy in bill (Xprinter), máy quét mã vạch đều có giấy chứng nhận xuất xứ CO/CQ.</li>
                      <li>Hoàn tiền 200% nếu phát hiện hàng giả, hàng kém chất lượng.</li>
                      <li>Cung cấp đầy đủ hóa đơn GTGT (VAT) điện tử hợp pháp cho doanh nghiệp.</li>
                    </ul>
                  </div>
                )}

                {activeServiceBadgeModal.id === 'badge-2' && (
                  <div className="space-y-3 leading-relaxed">
                    <p className="font-bold text-slate-900 text-sm">Chính sách Giao Hàng Hỏa Tốc 1H:</p>
                    <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                      <li>Giao siêu tốc 1h - 2h nội thành TP. Hồ Chí Minh & Hà Nội.</li>
                      <li>Kỹ thuật viên giao tận nơi, hỗ trợ test máy và hướng dẫn trực tiếp.</li>
                      <li>Vận chuyển COD toàn quốc trong 24h - 48h, được đồng kiểm sản phẩm trước khi thanh toán.</li>
                    </ul>
                  </div>
                )}

                {activeServiceBadgeModal.id === 'badge-3' && (
                  <div className="space-y-3 leading-relaxed">
                    <p className="font-bold text-slate-900 text-sm">Hướng Dẫn Trả Góp 0% Lãi Suất:</p>
                    <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                      <li>Hỗ trợ trả góp qua thẻ tín dụng Visa, Mastercard, JCB của hơn 25 ngân hàng liên kết.</li>
                      <li>Duyệt hồ sơ online chỉ trong 5 phút qua CCCD gắn chip (không cần chứng minh thu nhập).</li>
                      <li>Kỳ hạn linh hoạt từ 3, 6, 9 đến 12 tháng.</li>
                    </ul>
                  </div>
                )}

                {activeServiceBadgeModal.id === 'badge-4' && (
                  <div className="space-y-3 leading-relaxed">
                    <p className="font-bold text-slate-900 text-sm">Dịch Vụ Hỗ Trợ Kỹ Thuật & Bảo Hành 24/7:</p>
                    <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                      <li>Đội ngũ Kỹ thuật viên Solution Bảo sẵn sàng hỗ trợ cài đặt từ xa qua UltraViewer / TeamViewer miễn phí trọn đời.</li>
                      <li>Hỗ trợ xuất file báo cáo Excel phân ca kíp hành chính, nhà xưởng, ca đêm phức tạp.</li>
                      <li>Trung tâm bảo hành chính hãng đổi mới thiết bị lỗi trong vòng 30 ngày.</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Modal Footer CTA */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
                <a
                  href={webConfig.zaloLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 bg-[#0068FF] hover:bg-[#0052cc] text-white rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <ZaloIcon className="w-4 h-4 rounded-full overflow-hidden" />
                  <span>Chat Zalo Hỏi Ngay</span>
                </a>
                <a
                  href={`tel:${webConfig.primaryPhone.replace(/[^0-9]/g, '')}`}
                  className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Gọi Hotline</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900/95 text-white border border-slate-800 rounded-xl px-4 py-3 shadow-2xl flex items-center gap-2.5 text-xs font-bold animate-slide-down">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}



      {/* 7. PORTFOLIO FLOATING CONTACT ACTIONS BLUEPRINT (AI CHATBOT - ZALO - FACEBOOK - HOTLINE) */}
      {activeTab !== 'admin' && activeTab !== 'landing' && (
        <>
          {/* Floating AI Chat Window Popup */}
          {isOpenFloatingChat && (
            <div className="fixed bottom-20 right-3 sm:right-6 z-50 animate-slide-up">
              <AiChatbotBox
                chatMessages={chatMessages}
                setChatMessages={setChatMessages}
                userInput={userInput}
                setUserInput={setUserInput}
                isAiLoading={isAiLoading}
                handleSendAiMessage={handleSendAiMessage}
                products={PRODUCTS_DATA}
                setActiveTab={setActiveTab}
                showToast={showToast}
                mode="floating"
                isOpenFloating={isOpenFloatingChat}
                setIsOpenFloating={setIsOpenFloatingChat}
              />
            </div>
          )}

          {/* 7. PORTFOLIO FLOATING CONTACT ACTIONS BLUEPRINT */}
          
          {/* DESKTOP VIEW: Collapsible Floating Actions on bottom-right (hidden on mobile) */}
          <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col gap-2.5 text-none select-none animate-fade-in items-end" id="floating-contact-actions-desktop">
            <AnimatePresence mode="wait">
              {isContactWidgetExpanded ? (
                <motion.div
                  key="expanded-contact-widget"
                  initial={{ opacity: 0, y: 15, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-2.5 items-end"
                >
                  {/* 1. Floating AI Chatbot Trigger Button */}
                  <div className="relative flex items-center group justify-end">
                    <button
                      type="button"
                      onClick={() => setIsOpenFloatingChat(!isOpenFloatingChat)}
                      title="Nguyễn Hoàng Anh - Tư Vấn & Báo Giá 24/7"
                      className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#CD1818] via-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white flex items-center justify-center shadow-[0_4px_16px_rgba(205,24,24,0.45)] hover:scale-110 active:scale-95 transition-all duration-300 relative border-2 border-white cursor-pointer"
                    >
                      <span className="absolute -top-1 -right-1 px-1 py-0.2 bg-emerald-400 border border-slate-900 rounded-full font-black text-[7px] text-slate-950 shadow-xs uppercase">
                        ONLINE
                      </span>
                      <Sparkles className="w-5 h-5 relative z-10" />
                    </button>
                    <div className="absolute right-14 bg-slate-900/95 backdrop-blur-md text-white text-[10.5px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 pointer-events-none transition-all duration-300 whitespace-nowrap border border-slate-700/80 flex items-center gap-1.5 z-30">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Tư Vấn & Báo Giá Trực Tuyến</span>
                    </div>
                  </div>

                  {/* 2. Zalo Button */}
                  <div className="relative flex items-center group justify-end">
                    <a
                      href={webConfig.zaloLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Chat Zalo Kỹ Thuật Viên 24/7"
                      className="w-11 h-11 rounded-full bg-[#0068FF] hover:bg-[#0052cc] text-white flex items-center justify-center shadow-[0_4px_16px_rgba(0,104,255,0.4)] hover:shadow-[0_6px_20px_rgba(0,104,255,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 relative border-2 border-white p-0 overflow-hidden"
                    >
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse z-20" />
                      <ZaloIcon className="w-full h-full relative z-10" />
                    </a>
                    <div className="absolute right-14 bg-slate-900/95 backdrop-blur-md text-white text-[10.5px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 pointer-events-none transition-all duration-300 whitespace-nowrap border border-slate-700/80 flex items-center gap-2 z-30">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Chat Zalo (Hỗ Trợ Kỹ Thuật 24/7)</span>
                    </div>
                  </div>

                  {/* 3. Hotline Call Button */}
                  <div className="relative flex items-center group justify-end">
                    <a
                      href={`tel:${webConfig.primaryPhone.replace(/[^0-9]/g, '')}`}
                      title={`Gọi điện tư vấn: ${webConfig.primaryPhone}`}
                      className="w-11 h-11 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white flex items-center justify-center shadow-[0_4px_16px_rgba(16,185,129,0.4)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 relative border-2 border-white"
                    >
                      <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60 pointer-events-none" />
                      <PhoneCall className="w-5 h-5 relative z-10 animate-bounce" />
                    </a>
                    <div className="absolute right-14 bg-slate-900/95 backdrop-blur-md text-white text-[10.5px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 pointer-events-none transition-all duration-300 whitespace-nowrap border border-slate-700/80 flex items-center gap-1.5 z-30">
                      <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Gọi Hotline: {webConfig.primaryPhone}</span>
                    </div>
                  </div>

                  {/* 4. Facebook Button */}
                  <div className="relative flex items-center group justify-end">
                    <a
                      href={webConfig.facebookLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Kết nối Facebook Fanpage"
                      className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-[0_4px_12px_rgba(37,99,235,0.35)] hover:scale-110 active:scale-95 transition-all duration-300 relative"
                    >
                      <Facebook className="w-4.5 h-4.5 relative z-10" />
                    </a>
                    <div className="absolute right-13 bg-slate-900/95 backdrop-blur-md text-white text-[10.5px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 pointer-events-none transition-all duration-300 whitespace-nowrap border border-slate-700/80 z-30">
                      Fanpage Facebook
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* Desktop Contact Trigger Button (Nút Tròn Mặc Định, không chữ Liên hệ, click sổ ra thông tin liên hệ, click lại đóng) */}
            <div className="relative flex items-center group justify-end">
              <button
                type="button"
                onClick={toggleContactWidget}
                title="Tư vấn & Liên hệ (Hotline, Zalo, Facebook, Chat AI)"
                className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#CD1818] via-rose-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white flex items-center justify-center shadow-[0_4px_20px_rgba(205,24,24,0.5)] hover:shadow-[0_6px_25px_rgba(205,24,24,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-white relative group/btn"
              >
                {/* Online Pulse Indicator khi đóng */}
                {!isContactWidgetExpanded && (
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-white" />
                  </span>
                )}
                {isContactWidgetExpanded ? (
                  <X className="w-6 h-6 text-white transition-transform" />
                ) : (
                  <Headphones className="w-6 h-6 text-white group-hover/btn:rotate-12 transition-transform" />
                )}
              </button>
            </div>

            {/* Desktop Scroll to Top Button */}
            {showScrollTop && (
              <div className="relative flex items-center group justify-end pt-0.5">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  title="Cuộn lên đầu trang"
                  className="w-10 h-10 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 relative cursor-pointer border border-slate-700/80 backdrop-blur-md"
                >
                  <ArrowUp className="w-4.5 h-4.5 text-slate-200" />
                </button>
                <div className="absolute right-13 bg-slate-900/95 backdrop-blur-md text-white text-[10.5px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 pointer-events-none transition-all duration-300 whitespace-nowrap border border-slate-700/80 z-30">
                  Cuộn lên đầu trang
                </div>
              </div>
            )}
          </div>

          {/* MOBILE VIEW: Ultra-compact Round Floating Trigger Button (Mặc định nút tròn, không chữ Liên hệ, click sổ ra thông tin liên hệ) */}
          <div className="flex md:hidden fixed bottom-[64px] right-3 z-40 flex-col items-end gap-2.5" id="floating-contact-actions-mobile">
            {/* Scroll to top (nút nhỏ trên mobile) */}
            {showScrollTop && (
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                title="Lên đầu trang"
                className="w-8 h-8 rounded-full bg-slate-900/85 text-white flex items-center justify-center shadow-md active:scale-90 border border-slate-700/80 backdrop-blur-md"
              >
                <ArrowUp className="w-3.5 h-3.5 text-slate-300" />
              </button>
            )}

            {/* Nút Tròn Tai Nghe Hỗ Trợ 24/7 Chuẩn Mobile (Không chữ Liên hệ, bấm mở bottom sheet) */}
            <button
              type="button"
              onClick={() => setIsMobileContactSheetOpen(true)}
              title="Liên hệ & Tư vấn 24/7"
              className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#CD1818] via-rose-600 to-amber-500 active:scale-90 text-white flex items-center justify-center shadow-[0_4px_16px_rgba(205,24,24,0.45)] border-2 border-white relative transition-transform"
            >
              {/* Online Pulse Indicator */}
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-white" />
              </span>
              <Headphones className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* MOBILE CONTACT BOTTOM SHEET MODAL (Giao diện chuẩn App, mở lên khi bấm và đóng ngay khi xong - Không bao giờ chiếm diện tích) */}
          <AnimatePresence>
            {isMobileContactSheetOpen && (
              <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
                {/* Backdrop mờ phía sau - Bấm ra ngoài là đóng ngay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMobileContactSheetOpen(false)}
                  className="absolute inset-0 bg-black/60 backdrop-blur-xs"
                />

                {/* Sheet nội dung trượt từ dưới lên */}
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 26, stiffness: 320 }}
                  className="relative bg-white rounded-t-3xl shadow-2xl p-4.5 pb-6 border-t border-slate-100 z-10 max-h-[85vh] overflow-y-auto"
                >
                  {/* Thanh kéo nhỏ phía trên */}
                  <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-3" />

                  {/* Header popup liên hệ */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold">
                        <Headphones className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-slate-900 leading-tight">Tổng Đài Hỗ Trợ & Tư Vấn 24/7</h3>
                        <p className="text-[11px] text-slate-500 font-medium">Kỹ thuật & Báo giá: {webConfig.supportName || 'Mr. Bảo Bảo'}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsMobileContactSheetOpen(false)}
                      className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center active:scale-95"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Danh sách 4 kênh liên hệ dạng Card lớn, chạm dễ dàng */}
                  <div className="grid grid-cols-1 gap-2.5 py-3.5">
                    {/* 1. Hotline Gọi Ngay */}
                    <a
                      href={`tel:${webConfig.primaryPhone.replace(/[^0-9]/g, '')}`}
                      className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20 active:scale-[0.98] transition-transform"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                          <PhoneCall className="w-5 h-5 text-white animate-bounce" />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-black tracking-wider text-emerald-100">Gọi Hotline Tư Vấn Ngay</div>
                          <div className="text-base font-black tracking-wide">{webConfig.primaryPhone}</div>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-white text-emerald-700 text-[11px] font-black uppercase">
                        Gọi ngay
                      </span>
                    </a>

                    {/* 2. Zalo Kỹ Thuật */}
                    <a
                      href={webConfig.zaloLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-[#0068FF] to-blue-600 text-white shadow-md shadow-blue-500/20 active:scale-[0.98] transition-transform"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center overflow-hidden shrink-0">
                          <ZaloIcon className="w-full h-full" />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-black tracking-wider text-blue-100">Chat Zalo Kỹ Thuật 24/7</div>
                          <div className="text-xs font-black">Báo giá, gửi hình ảnh, kết bạn Zalo</div>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-white text-[#0068FF] text-[11px] font-black uppercase">
                        Mở Zalo
                      </span>
                    </a>

                    {/* 3. Facebook Messenger */}
                    <a
                      href={webConfig.facebookLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-2xl bg-slate-900 text-white shadow-md active:scale-[0.98] transition-transform border border-slate-800"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                          <Facebook className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-black tracking-wider text-slate-300">Facebook Fanpage</div>
                          <div className="text-xs font-black">Nhắn tin Fanpage tư vấn</div>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-200 text-[11px] font-bold">
                        Truy cập
                      </span>
                    </a>

                    {/* 4. Trợ Lý AI Thông Minh */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileContactSheetOpen(false);
                        setIsOpenFloatingChat(true);
                      }}
                      className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white shadow-md active:scale-[0.98] transition-transform text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                          <Sparkles className="w-5 h-5 text-amber-300" />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-black tracking-wider text-rose-100">Trợ Lý AI Trực Tuyến</div>
                          <div className="text-xs font-black">Hỏi đáp kỹ thuật & báo giá tự động</div>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-white text-rose-600 text-[11px] font-black uppercase">
                        Chat AI
                      </span>
                    </button>
                  </div>

                  {/* Ghi chú footer */}
                  <div className="pt-2 text-center text-[11px] text-slate-400 font-medium">
                    Hỗ trợ kỹ thuật cài đặt từ xa qua TeamViewer / UltraViewer 24/7
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
    </>
  )}

      {/* FULL-SCREEN PRODUCT IMAGE LIGHTBOX MODAL WITH ZOOM & SLIDER */}
      <AnimatePresence>
        {isLightboxOpen && lightboxImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[120] bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 select-none"
            onClick={() => {
              setIsLightboxOpen(false);
              setLightboxZoom(1);
            }}
          >
            {/* Top Bar: Title, Counter, Zoom Controls, Close Button */}
            <div 
              className="flex items-center justify-between gap-4 z-20 text-white pb-3 border-b border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 truncate">
                <div className="p-2 bg-blue-600/30 border border-blue-500/40 rounded-xl text-blue-400 shrink-0">
                  <Image className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="truncate text-left">
                  <h4 className="text-xs sm:text-sm font-black text-white truncate max-w-[200px] sm:max-w-md">
                    {lightboxTitle || 'Chi tiết hình ảnh sản phẩm'}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] sm:text-xs text-slate-400 font-bold font-mono">
                    <span>Ảnh {lightboxIndex + 1} / {lightboxImages.length}</span>
                    <span>•</span>
                    <span className="text-blue-400 font-black">Phóng to: {Math.round(lightboxZoom * 100)}%</span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {/* Zoom Out */}
                <button
                  type="button"
                  onClick={() => setLightboxZoom((z) => Math.max(1, Math.round((z - 0.5) * 10) / 10))}
                  disabled={lightboxZoom <= 1}
                  className="p-2 bg-white/10 hover:bg-white/20 disabled:opacity-40 disabled:hover:bg-white/10 text-white rounded-xl transition-all cursor-pointer active:scale-95 border border-white/10"
                  title="Thu nhỏ (-)"
                >
                  <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Reset Zoom */}
                <button
                  type="button"
                  onClick={() => setLightboxZoom(1)}
                  className={`px-2.5 py-1.5 text-[11px] font-black rounded-xl transition-all cursor-pointer border ${
                    lightboxZoom > 1
                      ? 'bg-blue-600 text-white border-blue-500'
                      : 'bg-white/10 text-white/70 border-white/10 hover:bg-white/20'
                  }`}
                  title="Đặt lại kích thước ban đầu (100%)"
                >
                  {Math.round(lightboxZoom * 100)}%
                </button>

                {/* Zoom In */}
                <button
                  type="button"
                  onClick={() => setLightboxZoom((z) => Math.min(3, Math.round((z + 0.5) * 10) / 10))}
                  disabled={lightboxZoom >= 3}
                  className="p-2 bg-white/10 hover:bg-white/20 disabled:opacity-40 disabled:hover:bg-white/10 text-white rounded-xl transition-all cursor-pointer active:scale-95 border border-white/10"
                  title="Phóng to (+)"
                >
                  <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <div className="w-px h-6 bg-white/20 mx-1 hidden sm:block" />

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => {
                    setIsLightboxOpen(false);
                    setLightboxZoom(1);
                  }}
                  className="p-2 bg-red-600/80 hover:bg-red-600 text-white rounded-xl transition-all cursor-pointer active:scale-95 border border-red-500/50 shadow-md ml-1"
                  title="Đóng cửa sổ ảnh (Phím Esc)"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            {/* Middle Main Viewing Stage: Prev Button, Image, Next Button */}
            <div 
              className="flex-1 relative flex items-center justify-center overflow-hidden my-3 w-full"
              onTouchStart={handleTouchStart}
              onTouchEnd={(e) => {
                if (lightboxImages.length > 1) {
                  handleTouchEnd(
                    e,
                    () => handleLightboxIndexChange(lightboxIndex < lightboxImages.length - 1 ? lightboxIndex + 1 : 0),
                    () => handleLightboxIndexChange(lightboxIndex > 0 ? lightboxIndex - 1 : lightboxImages.length - 1)
                  );
                }
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev Button */}
              {lightboxImages.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLightboxIndexChange(lightboxIndex > 0 ? lightboxIndex - 1 : lightboxImages.length - 1);
                  }}
                  className="absolute left-2 sm:left-4 z-30 p-2.5 sm:p-3.5 bg-black/60 hover:bg-black/90 text-white border border-white/20 rounded-full transition-all cursor-pointer active:scale-90 shadow-2xl backdrop-blur-md"
                  title="Xem ảnh trước (Phím ◄)"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
                </button>
              )}

              {/* Main Image with Zoom & Double Click Toggle */}
              <div 
                className="w-full h-full flex items-center justify-center overflow-auto p-2"
                onDoubleClick={() => setLightboxZoom((z) => (z > 1 ? 1 : 2))}
              >
                <img
                  src={lightboxImages[lightboxIndex] || undefined}
                  alt={`${lightboxTitle} - Ảnh ${lightboxIndex + 1}`}
                  referrerPolicy="no-referrer"
                  style={{
                    transform: `scale(${lightboxZoom})`,
                    transition: 'transform 0.25s cubic-bezier(0.2, 0, 0, 1)'
                  }}
                  className={`max-w-full max-h-[70vh] sm:max-h-[75vh] object-contain rounded-2xl select-none shadow-2xl drop-shadow-2xl ${
                    lightboxZoom > 1 ? 'cursor-zoom-out' : 'cursor-zoom-in'
                  }`}
                />
              </div>

              {/* Next Button */}
              {lightboxImages.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLightboxIndexChange(lightboxIndex < lightboxImages.length - 1 ? lightboxIndex + 1 : 0);
                  }}
                  className="absolute right-2 sm:right-4 z-30 p-2.5 sm:p-3.5 bg-black/60 hover:bg-black/90 text-white border border-white/20 rounded-full transition-all cursor-pointer active:scale-90 shadow-2xl backdrop-blur-md"
                  title="Xem ảnh kế tiếp (Phím ►)"
                >
                  <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
                </button>
              )}
            </div>

            {/* Bottom Bar: Thumbnail Slider & Help Instructions */}
            <div 
              className="z-20 pt-2 border-t border-white/10 space-y-2"
              onClick={(e) => e.stopPropagation()}
            >
              {lightboxImages.length > 1 && (
                <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 px-2 max-w-2xl mx-auto scrollbar-thin">
                  {lightboxImages.map((imgUrl, idx) => {
                    const isActive = lightboxIndex === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleLightboxIndexChange(idx)}
                        className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-slate-900 shrink-0 ${
                          isActive
                            ? 'border-blue-500 ring-2 ring-blue-500/50 scale-105 shadow-lg'
                            : 'border-white/20 opacity-60 hover:opacity-100 hover:border-white/50'
                        }`}
                        title={`Xem ảnh #${idx + 1}`}
                      >
                        <img
                          src={imgUrl || undefined}
                          alt={`Thumbnail ${idx + 1}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain p-0.5"
                        />
                        <span className="absolute bottom-0.5 right-0.5 bg-black/80 text-white font-mono text-[8px] px-1 rounded">
                          #{idx + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              <p className="text-[10px] sm:text-xs text-slate-400 text-center font-medium">
                💡 <span className="hidden sm:inline">Dùng phím mũi tên ◄ ► để trượt ảnh • Nhấn đúp hoặc dùng phím + / - để phóng to • </span>Vuốt ngang trên điện thoại để chuyển ảnh • Nhấn Esc để đóng
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
