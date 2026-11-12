import React, { useState, useEffect } from 'react';
import {
  Package,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Layers,
  Image as ImageIcon,
  Tag,
  DollarSign,
  Gift,
  Copy,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  X,
  Eye,
  EyeOff,
  Store,
  ShieldCheck,
  Percent,
  Check,
  ArrowUp,
  ArrowDown,
  Save,
  Coffee,
  UtensilsCrossed,
  Settings,
  SlidersHorizontal,
  ChevronUp
} from 'lucide-react';
import { ComboBundle, ComboBundleItem, Product, ComboShowcaseConfig, DEFAULT_COMBO_SHOWCASE_CONFIG } from '../types';
import { DEFAULT_COMBO_BUNDLES } from '../comboBundlesData';

interface ComboBundlesAdminProps {
  comboBundles: ComboBundle[];
  saveComboBundles: (bundles: ComboBundle[]) => void;
  comboShowcaseConfig?: ComboShowcaseConfig;
  saveComboShowcaseConfig?: (config: ComboShowcaseConfig) => void;
  products: Product[];
  showAlert: (title: string, message: string, type?: 'success' | 'error' | 'info') => void;
  showConfirm: (title: string, message: string, onConfirm: () => void, type?: 'danger' | 'warning' | 'info') => void;
}

// Preset library of curated high quality banner images
const PRESET_BANNER_IMAGES = [
  {
    name: 'Quầy Cafe & Bar Pha Chế',
    url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    tag: 'Cafe / Trà Sữa'
  },
  {
    name: 'Thu Ngân Siêu Thị & Bán Lẻ',
    url: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80',
    tag: 'Siêu Thị / Tạp Hóa'
  },
  {
    name: 'Nhà Hàng & Gọi Món Bếp',
    url: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=80',
    tag: 'Nhà Hàng / F&B'
  },
  {
    name: 'Kho Vận & Đóng Hàng TMĐT',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    tag: 'Shopee / TikTok Shop'
  },
  {
    name: 'Shop Thời Trang & Boutique',
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    tag: 'Thời Trang / Mỹ Phẩm'
  },
  {
    name: 'Quầy Kiosk & Take-Away',
    url: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80',
    tag: 'Mang Đi / Vỉa Hè'
  }
];

export const ComboBundlesAdmin: React.FC<ComboBundlesAdminProps> = ({
  comboBundles,
  saveComboBundles,
  comboShowcaseConfig = DEFAULT_COMBO_SHOWCASE_CONFIG,
  saveComboShowcaseConfig = (_cfg: ComboShowcaseConfig) => {},
  products,
  showAlert,
  showConfirm
}) => {

  // State for Bottom Showcase Configuration
  const [localShowcaseConfig, setLocalShowcaseConfig] = useState<ComboShowcaseConfig>(
    comboShowcaseConfig || DEFAULT_COMBO_SHOWCASE_CONFIG
  );
  const [isShowcaseSettingsOpen, setIsShowcaseSettingsOpen] = useState(false);

  useEffect(() => {
    if (comboShowcaseConfig) {
      setLocalShowcaseConfig(comboShowcaseConfig);
    }
  }, [comboShowcaseConfig]);

  const handleSaveShowcaseConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveComboShowcaseConfig(localShowcaseConfig);
    showAlert('Thành công', 'Đã lưu cấu hình tiêu đề và ưu đãi Combo!', 'success');
    setIsShowcaseSettingsOpen(false);
  };

  // Synchronized Interactive Live Preview State
  const sortedBundles = [...comboBundles].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  const visibleBundles = sortedBundles.filter((b) => b.isVisible !== false);
  const [previewSlideIdx, setPreviewSlideIdx] = useState<number>(0);
  const [previewSelectedId, setPreviewSelectedId] = useState<string>(visibleBundles[0]?.id || '');

  useEffect(() => {
    if (visibleBundles.length > 0 && (!previewSelectedId || !visibleBundles.find((b) => b.id === previewSelectedId))) {
      setPreviewSelectedId(visibleBundles[0].id);
    }
  }, [visibleBundles, previewSelectedId]);

  const previewActiveBundle = visibleBundles.find((b) => b.id === previewSelectedId) || visibleBundles[0];

  const handlePreviewPrev = () => {
    const maxPrev = Math.max(0, visibleBundles.length - 2);
    setPreviewSlideIdx((prev) => {
      const next = prev - 2 < 0 ? maxPrev : prev - 2;
      if (visibleBundles[next]) {
        setPreviewSelectedId(visibleBundles[next].id);
      }
      return next;
    });
  };

  const handlePreviewNext = () => {
    const maxPrev = Math.max(0, visibleBundles.length - 2);
    setPreviewSlideIdx((prev) => {
      const next = prev + 2 > maxPrev ? 0 : prev + 2;
      if (visibleBundles[next]) {
        setPreviewSelectedId(visibleBundles[next].id);
      }
      return next;
    });
  };

  const handlePreviewSelectBundle = (bundleId: string) => {
    setPreviewSelectedId(bundleId);
    const bIndex = visibleBundles.findIndex((b) => b.id === bundleId);
    if (bIndex >= 0) {
      setPreviewSlideIdx(Math.floor(bIndex / 2) * 2);
    }
  };

  // Modal Edit / Add
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBundleId, setEditingBundleId] = useState<string | null>(null);

  // Form states for Bundle
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [badge, setBadge] = useState('BÁN CHẠY NHẤT ★');
  const [badgeColor, setBadgeColor] = useState('from-amber-500 to-orange-600');
  const [targetAudience, setTargetAudience] = useState('');
  const [description, setDescription] = useState('');
  const [popular, setPopular] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [order, setOrder] = useState<number>(1);
  const [linkUrl, setLinkUrl] = useState('');
  const [warrantyMonths, setWarrantyMonths] = useState<number>(12);
  const [discountPercent, setDiscountPercent] = useState<number>(15);
  const [customBundlePrice, setCustomBundlePrice] = useState<string>('');
  const [bonusGiftsText, setBonusGiftsText] = useState('');

  // Items in bundle
  const [bundleItems, setBundleItems] = useState<ComboBundleItem[]>([]);
  const [selectedProductIdToAdd, setSelectedProductIdToAdd] = useState('');

  const formatVND = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  // Calculate pricing
  const calculatedOriginalPrice = bundleItems.reduce((acc, curr) => acc + (curr.originalPrice || curr.price || 0), 0);
  const calculatedBundlePrice = Math.round((calculatedOriginalPrice * (100 - (Number(discountPercent) || 0))) / 100);
  const finalBundlePrice = customBundlePrice ? Number(customBundlePrice) : calculatedBundlePrice;
  const calculatedSavings = Math.max(0, calculatedOriginalPrice - finalBundlePrice);

  const handleOpenAddModal = () => {
    setEditingBundleId(null);
    setTitle('');
    setTagline('Tiết kiệm 15% - Cắm điện là bán ngay, tối ưu vận hành');
    setBannerImage(PRESET_BANNER_IMAGES[0].url);
    setBadge('COMBO MỚI ⭐');
    setBadgeColor('from-blue-600 to-indigo-700');
    setTargetAudience('Quán cafe, nhà hàng, siêu thị mini, shop bán lẻ');
    setDescription('Trọn bộ thiết bị bán hàng đồng bộ tốc độ cao, bảo hành chính hãng tận nơi.');
    setPopular(false);
    setIsVisible(true);
    setOrder(comboBundles.length + 1);
    setLinkUrl('');
    setWarrantyMonths(12);
    setDiscountPercent(15);
    setCustomBundlePrice('');
    setBonusGiftsText('Tặng 10 cuộn giấy in nhiệt K80 Oji Nhật Bản\nMiễn phí cài đặt và hướng dẫn tận nơi');
    setBundleItems([]);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (bundle: ComboBundle) => {
    setEditingBundleId(bundle.id);
    setTitle(bundle.title || '');
    setTagline(bundle.tagline || '');
    setBannerImage(bundle.bannerImage || PRESET_BANNER_IMAGES[0].url);
    setBadge(bundle.badge || 'HOT COMBO');
    setBadgeColor(bundle.badgeColor || 'from-amber-500 to-orange-600');
    setTargetAudience(bundle.targetAudience || '');
    setDescription(bundle.description || '');
    setPopular(bundle.popular ?? false);
    setIsVisible(bundle.isVisible ?? true);
    setOrder(bundle.order ?? 1);
    setLinkUrl(bundle.linkUrl || '');
    setWarrantyMonths(bundle.warrantyMonths || 12);
    setDiscountPercent(bundle.discountPercent || 15);
    setCustomBundlePrice(bundle.bundlePrice ? String(bundle.bundlePrice) : '');
    setBonusGiftsText((bundle.bonusGifts || []).join('\n'));
    setBundleItems([...(bundle.items || [])]);
    setIsModalOpen(true);
  };

  const handleToggleVisibility = (bundleId: string) => {
    const updated = comboBundles.map((b) => {
      if (b.id === bundleId) {
        return { ...b, isVisible: b.isVisible === false ? true : false };
      }
      return b;
    });
    saveComboBundles(updated);
  };

  const handleMoveOrder = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sortedBundles.length) return;

    const updated = [...sortedBundles];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    updated.forEach((item, idx) => {
      item.order = idx + 1;
    });

    saveComboBundles(updated);
  };

  const handleAddItemFromProduct = () => {
    if (!selectedProductIdToAdd) return;
    const prod = products.find((p) => p.id === selectedProductIdToAdd);
    if (!prod) return;

    const newItem: ComboBundleItem = {
      productId: prod.id,
      name: prod.name,
      categoryLabel: prod.categoryLabel || 'Thiết Bị',
      price: prod.price,
      originalPrice: prod.originalPrice || prod.price,
      image: prod.image,
      specsSummary: prod.highlights?.[0] || 'Chính hãng bảo hành 12 tháng'
    };

    setBundleItems([...bundleItems, newItem]);
    setSelectedProductIdToAdd('');
  };

  const handleRemoveBundleItem = (index: number) => {
    setBundleItems(bundleItems.filter((_, i) => i !== index));
  };

  const handleUpdateItemPrice = (index: number, newPrice: number) => {
    const updated = [...bundleItems];
    updated[index].price = newPrice;
    setBundleItems(updated);
  };

  const handleSaveBundle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showAlert('Thiếu thông tin', 'Vui lòng nhập tên gói Combo!', 'error');
      return;
    }
    if (bundleItems.length === 0) {
      showAlert('Chưa có thiết bị', 'Vui lòng thêm ít nhất 1 thiết bị vào gói Combo!', 'error');
      return;
    }

    const gifts = bonusGiftsText
      .split('\n')
      .map((g) => g.trim())
      .filter(Boolean);

    const newBundle: ComboBundle = {
      id: editingBundleId || `combo-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title: title.trim(),
      tagline: tagline.trim() || `Tiết kiệm ${discountPercent}% - Trọn bộ thiết bị đồng bộ`,
      bannerImage: bannerImage.trim() || PRESET_BANNER_IMAGES[0].url,
      badge: badge.trim() || 'HOT COMBO',
      badgeColor,
      targetAudience: targetAudience.trim() || 'Cửa hàng kinh doanh & doanh nghiệp',
      description: description.trim(),
      items: bundleItems,
      bundlePrice: finalBundlePrice,
      originalPrice: calculatedOriginalPrice,
      discountPercent: Number(discountPercent) || 0,
      savingAmount: calculatedSavings,
      bonusGifts: gifts,
      popular,
      isVisible,
      order: Number(order) || 1,
      linkUrl: linkUrl.trim(),
      warrantyMonths: Number(warrantyMonths) || 12
    };

    let updatedBundles: ComboBundle[];
    if (editingBundleId) {
      updatedBundles = comboBundles.map((b) => (b.id === editingBundleId ? newBundle : b));
      showAlert('Thành công', `Đã cập nhật gói combo "${newBundle.title}"!`, 'success');
    } else {
      updatedBundles = [newBundle, ...comboBundles];
      showAlert('Thành công', `Đã tạo mới gói combo "${newBundle.title}"!`, 'success');
    }

    saveComboBundles(updatedBundles);
    setIsModalOpen(false);
  };

  const handleDeleteBundle = (bundleId: string, bundleTitle: string) => {
    showConfirm(
      'Xóa Combo',
      `Bạn có chắc chắn muốn xóa gói combo "${bundleTitle}" không? Hành động này sẽ gỡ gói combo khỏi trang chủ.`,
      () => {
        const updated = comboBundles.filter((b) => b.id !== bundleId);
        saveComboBundles(updated);
        showAlert('Đã xóa', `Đã xóa gói combo "${bundleTitle}" thành công!`, 'info');
      },
      'danger'
    );
  };

  const handleDuplicateBundle = (bundle: ComboBundle) => {
    const duplicated: ComboBundle = {
      ...bundle,
      id: `combo-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title: `${bundle.title} (Bản sao)`,
      order: comboBundles.length + 1
    };
    const updated = [...comboBundles, duplicated];
    saveComboBundles(updated);
    showAlert('Đã nhân bản', `Đã nhân bản gói combo thành công!`, 'success');
  };

  const handleResetDefaults = () => {
    showConfirm(
      'Khôi phục mặc định',
      'Bạn có muốn đặt lại danh sách các gói Combo về 6 gói tiêu chuẩn ban đầu (Cafe/Trà sữa, Bán lẻ tạp hóa, Nhà hàng quán ăn, Shop TMĐT, Thời trang, Take-away)?',
      () => {
        saveComboBundles(DEFAULT_COMBO_BUNDLES);
        saveComboShowcaseConfig(DEFAULT_COMBO_SHOWCASE_CONFIG);
        setLocalShowcaseConfig(DEFAULT_COMBO_SHOWCASE_CONFIG);
        showAlert('Khôi phục thành công', 'Đã đặt lại các gói Combo và giao diện Showcase chuẩn ban đầu!', 'success');
      },
      'warning'
    );
  };

  const getBundleIcon = (id: string) => {
    if (id.includes('cafe') || id.includes('trasua')) return <Coffee className="w-4 h-4 text-amber-600" />;
    if (id.includes('banle') || id.includes('taphoa') || id.includes('sieu-thi')) return <Store className="w-4 h-4 text-emerald-600" />;
    if (id.includes('nha-hang') || id.includes('quan-an')) return <UtensilsCrossed className="w-4 h-4 text-orange-600" />;
    return <Package className="w-4 h-4 text-blue-600" />;
  };

  return (
    <div className="space-y-6 text-left animate-fade-in" id="admin-combo-bundles-panel">
      {/* 1. UNIFIED HEADER */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/15 to-orange-500/15 text-amber-800 text-xs font-black uppercase mb-1.5 border border-amber-300/40">
              <Package className="w-3.5 h-3.5 text-amber-600" />
              <span>Quản Lý Combo Trọn Bộ (Bundle & Save) — Hệ Thống Đồng Bộ Duy Nhất</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Quản Trị Chung Toàn Bộ Combo Thiết Bị & Banner Trượt</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
              Banner trượt 2 ảnh phía trên và khối chi tiết thiết bị phía dưới đã được <strong className="text-slate-800">gom chung thành một hệ thống đồng bộ duy nhất</strong>. Tất cả cấu hình từ ảnh banner, thứ tự, bật/tắt đến danh sách 4 thiết bị đều được quản lý tiện lợi ngay trong một màn hình này.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border border-slate-200 shadow-2xs"
              title="Khôi phục 6 gói combo và giao diện mặc định"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Khôi Phục Mặc Định</span>
            </button>
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-2 active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ Thêm Gói Combo Mới</span>
            </button>
          </div>
        </div>

        {/* 2. GENERAL SETTINGS TOOLBAR */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localShowcaseConfig.showcaseVisible !== false}
                  onChange={(e) => {
                    const updated = { ...localShowcaseConfig, showcaseVisible: e.target.checked };
                    setLocalShowcaseConfig(updated);
                    saveComboShowcaseConfig(updated);
                    showAlert('Cập nhật', `Đã ${e.target.checked ? 'bật' : 'tắt'} khối Combo trên trang chủ!`, 'info');
                  }}
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                />
                <span>Hiển thị khối Combo trên trang chủ</span>
              </label>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() => setIsShowcaseSettingsOpen(!isShowcaseSettingsOpen)}
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
              <span>Tùy chỉnh tiêu đề & ưu đãi khối giới thiệu</span>
              {isShowcaseSettingsOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* COLLAPSIBLE SHOWCASE TEXT SETTINGS */}
        {isShowcaseSettingsOpen && (
          <form onSubmit={handleSaveShowcaseConfig} className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
              <div className="text-xs font-black uppercase text-indigo-950 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Nội Dung Banner Giới Thiệu Khối Combo</span>
              </div>
              <button
                type="submit"
                className="px-3.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer flex items-center gap-1"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Lưu tiêu đề</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700">Huy hiệu trên cùng</label>
                <input
                  type="text"
                  value={localShowcaseConfig.badge || ''}
                  onChange={(e) => setLocalShowcaseConfig({ ...localShowcaseConfig, badge: e.target.value })}
                  className="mt-1 w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700">Dòng nổi bật màu vàng</label>
                <input
                  type="text"
                  value={localShowcaseConfig.highlightText || ''}
                  onChange={(e) => setLocalShowcaseConfig({ ...localShowcaseConfig, highlightText: e.target.value })}
                  className="mt-1 w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-amber-600"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700">Dòng ưu đãi (Callout)</label>
                <input
                  type="text"
                  value={localShowcaseConfig.discountCallout || ''}
                  onChange={(e) => setLocalShowcaseConfig({ ...localShowcaseConfig, discountCallout: e.target.value })}
                  className="mt-1 w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-amber-600"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700">Cam kết bảo hành</label>
                <input
                  type="text"
                  value={localShowcaseConfig.warrantyCallout || ''}
                  onChange={(e) => setLocalShowcaseConfig({ ...localShowcaseConfig, warrantyCallout: e.target.value })}
                  className="mt-1 w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700">Cam kết giao hàng</label>
                <input
                  type="text"
                  value={localShowcaseConfig.deliveryCallout || ''}
                  onChange={(e) => setLocalShowcaseConfig({ ...localShowcaseConfig, deliveryCallout: e.target.value })}
                  className="mt-1 w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700">Nút đặt mua prefix</label>
                <input
                  type="text"
                  value={localShowcaseConfig.buyButtonPrefix || ''}
                  onChange={(e) => setLocalShowcaseConfig({ ...localShowcaseConfig, buyButtonPrefix: e.target.value })}
                  className="mt-1 w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="col-span-full">
                <label className="text-[11px] font-bold text-slate-700">Mô tả chi tiết giải pháp</label>
                <input
                  type="text"
                  value={localShowcaseConfig.description || ''}
                  onChange={(e) => setLocalShowcaseConfig({ ...localShowcaseConfig, description: e.target.value })}
                  className="mt-1 w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                />
              </div>
            </div>
          </form>
        )}

        {/* 3. INTERACTIVE 2-IN-1 LIVE PREVIEW */}
        <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-slate-900 text-white border border-slate-800">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-400">
              <Eye className="w-4 h-4" />
              <span>Xem Trước Đồng Bộ: Banner 2 Ảnh & Khối Chi Tiết Thiết Bị</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400">
                {visibleBundles.length} combo đang bật
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePreviewPrev}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white cursor-pointer active:scale-95 transition-all"
                  title="Trượt 2 ảnh trước (Đồng bộ chi tiết)"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handlePreviewNext}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white cursor-pointer active:scale-95 transition-all"
                  title="Trượt 2 ảnh tiếp (Đồng bộ chi tiết)"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 1. Header Banner Preview (Banner Dài Đứng Lên Trên 2 Banner Ngắn) */}
          {localShowcaseConfig.showcaseVisible !== false && (
            <div className="bg-gradient-to-r from-[#0d1435] via-[#141d4b] to-[#101840] rounded-xl p-3.5 text-white border border-indigo-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1 text-left">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-black uppercase">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{localShowcaseConfig.badge || 'COMBO TRỌN BỘ • GIẢI PHÁP TIẾT KIỆM (BUNDLE & SAVE)'}</span>
                </div>
                <div className="text-xs sm:text-sm font-black uppercase text-white">
                  MUA TRỌN BỘ THIẾT BỊ BÁN HÀNG — <span className="text-amber-400">{localShowcaseConfig.highlightText || 'TIẾT KIỆM ĐẾN 20%'}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2.5 py-1 rounded-lg border border-amber-400/30">
                  {localShowcaseConfig.discountCallout || 'Giảm thêm 1.5 - 3 Triệu / Bộ'}
                </span>
                <span className="text-[10px] text-slate-300 font-medium hidden sm:inline">
                  {localShowcaseConfig.warrantyCallout || 'Bảo hành 12 Tháng tận nơi'}
                </span>
              </div>
            </div>
          )}

          {/* 2. Top 2 Banners Preview (2 Banner Ngắn) */}
          <div className="overflow-hidden rounded-2xl relative pt-1">
            <div 
              className="flex transition-transform duration-500 -mx-2"
              style={{ transform: `translateX(-${previewSlideIdx * 50}%)` }}
            >
              {visibleBundles.map((b) => {
                const isSelected = previewSelectedId === b.id;
                return (
                  <div key={b.id} className="w-full sm:w-1/2 shrink-0 px-2">
                    <div 
                      onClick={() => handlePreviewSelectBundle(b.id)}
                      className={`relative h-44 rounded-2xl overflow-hidden border-2 p-4 flex flex-col justify-between bg-cover bg-center cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-amber-400 ring-4 ring-amber-400/30' 
                          : 'border-slate-700/80 hover:border-slate-500'
                      }`}
                      style={{ backgroundImage: `url(${b.bannerImage || PRESET_BANNER_IMAGES[0].url})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/35 pointer-events-none" />
                      
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-amber-500 text-slate-950">
                          {b.badge || 'COMBO TIẾT KIỆM'}
                        </span>
                        {isSelected ? (
                          <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Eye className="w-2.5 h-2.5" />
                            ĐANG XEM CHI TIẾT
                          </span>
                        ) : (
                          <span className="bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase">
                            Giảm {b.discountPercent}%
                          </span>
                        )}
                      </div>

                      <div className="relative z-10 space-y-1">
                        <h5 className="text-sm font-black text-white truncate">{b.title}</h5>
                        <div className="flex items-baseline gap-2">
                          <span className="text-base font-black font-mono text-amber-300">{formatVND(b.bundlePrice)}</span>
                          <span className="text-[10px] text-slate-400 line-through font-mono">{formatVND(b.originalPrice)}</span>
                        </div>
                        <div className="text-[10px] text-emerald-400 font-bold">
                          ✓ Tiết kiệm {formatVND(b.savingAmount)} • {b.items.length} thiết bị
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Synchronized Details Preview Box */}
          {previewActiveBundle && (
            <div className="mt-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-left space-y-2">
              <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-1.5">
                <span className="font-bold text-amber-300 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Khối chi tiết bên dưới đang hiển thị: <strong>{previewActiveBundle.title}</strong></span>
                </span>
                <span className="text-[11px] text-slate-400">
                  Phù hợp: {previewActiveBundle.targetAudience}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {previewActiveBundle.items.map((it, iIdx) => (
                  <div key={iIdx} className="bg-slate-900 border border-slate-800 p-2 rounded-lg flex items-center gap-2">
                    <img 
                      src={it.image || 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=100&q=80'} 
                      alt={it.name}
                      className="w-8 h-8 object-contain rounded bg-white p-0.5"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-bold text-white truncate">{it.name}</div>
                      <div className="text-[9px] text-amber-400 font-mono">{formatVND(it.price)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 4. ALL-IN-ONE BUNDLE LIST TABLE */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Danh Sách Tất Cả Gói Combo ({comboBundles.length} gói) — Chỉnh Sửa Banner & Thiết Bị Cùng Lúc</span>
            </h4>
            <span className="text-xs text-slate-400">Bấm nút Sửa để thay đổi ảnh banner, thiết bị và giá</span>
          </div>

          <div className="space-y-3">
            {sortedBundles.map((bundle, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === sortedBundles.length - 1;

              return (
                <div
                  key={bundle.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                    bundle.isVisible !== false
                      ? 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-sm'
                      : 'bg-slate-50/70 border-slate-200/60 opacity-60'
                  }`}
                >
                  {/* Left: Order Buttons & Banner Thumbnail */}
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <button
                        type="button"
                        disabled={isFirst}
                        onClick={() => handleMoveOrder(idx, 'up')}
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-slate-100 text-slate-600 cursor-pointer"
                        title="Đẩy lên trước"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-black text-slate-600 font-mono">#{idx + 1}</span>
                      <button
                        type="button"
                        disabled={isLast}
                        onClick={() => handleMoveOrder(idx, 'down')}
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-slate-100 text-slate-600 cursor-pointer"
                        title="Đẩy xuống sau"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="w-28 sm:w-36 h-20 rounded-xl overflow-hidden relative border border-slate-200 shrink-0 bg-slate-900 group">
                      <img
                        src={bundle.bannerImage || PRESET_BANNER_IMAGES[0].url}
                        alt={bundle.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-1.5">
                        <span className="text-[9px] font-black text-amber-300 truncate">
                          Giảm {bundle.discountPercent}%
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          {bundle.badge || 'COMBO'}
                        </span>
                        {bundle.popular && (
                          <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-red-100 text-red-700">
                            HOT DEAL
                          </span>
                        )}
                        <span className="text-[11px] text-slate-500 font-bold flex items-center gap-1">
                          {getBundleIcon(bundle.id)}
                          <span>{bundle.targetAudience}</span>
                        </span>
                      </div>

                      <h5 className="text-sm font-extrabold text-slate-800 leading-snug">
                        {bundle.title}
                      </h5>

                      <div className="flex items-center gap-2 flex-wrap text-xs">
                        <span className="font-black text-red-600 font-mono">
                          {formatVND(bundle.bundlePrice)}
                        </span>
                        <span className="text-slate-400 line-through text-[11px] font-mono">
                          {formatVND(bundle.originalPrice)}
                        </span>
                        <span className="text-emerald-600 font-bold text-[11px]">
                          (Tiết kiệm {formatVND(bundle.savingAmount)})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Included Equipment Pill Badges */}
                  <div className="flex-1 lg:max-w-md space-y-1">
                    <div className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                      <Package className="w-3.5 h-3.5 text-blue-600" />
                      <span>{bundle.items.length} thiết bị đã cấu hình trong gói:</span>
                    </div>
                    <div className="flex items-center gap-1 flex-wrap">
                      {bundle.items.map((it, itIdx) => (
                        <span
                          key={itIdx}
                          className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-200"
                        >
                          {it.name.split(' ')[0]} {it.name.split(' ')[1] || ''}
                        </span>
                      ))}
                    </div>
                    {bundle.bonusGifts && bundle.bonusGifts.length > 0 && (
                      <div className="text-[10px] text-amber-800 font-medium truncate">
                        🎁 Tặng: {bundle.bonusGifts[0]}
                      </div>
                    )}
                  </div>

                  {/* Right: Actions (Toggle Visibility, Edit, Duplicate, Delete) */}
                  <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                    <button
                      type="button"
                      onClick={() => handleToggleVisibility(bundle.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                        bundle.isVisible !== false
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-300'
                      }`}
                      title={bundle.isVisible !== false ? 'Đang hiển thị ngoài web' : 'Đang ẩn khỏi web'}
                    >
                      {bundle.isVisible !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span>{bundle.isVisible !== false ? 'Đang Bật' : 'Đang Ẩn'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(bundle)}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1 border border-blue-200 cursor-pointer shadow-2xs"
                      title="Chỉnh sửa toàn bộ: Ảnh banner, thiết bị, giá, quà tặng"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Sửa Trọn Gói</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDuplicateBundle(bundle)}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all cursor-pointer border border-slate-200"
                      title="Nhân bản combo này"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteBundle(bundle.id, bundle.title)}
                      className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all cursor-pointer border border-red-200"
                      title="Xóa combo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. MODAL CHỈNH SỬA TOÀN BỘ GÓI COMBO: BANNER + THIẾT BỊ + GIÁ + QUÀ TẶNG */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 animate-scale-up text-left">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-indigo-50/30 rounded-t-3xl">
              <div>
                <div className="text-[10px] font-black uppercase text-blue-600 tracking-wider">
                  {editingBundleId ? 'CẬP NHẬT GÓI COMBO' : 'THÊM GÓI COMBO MỚI'}
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  {editingBundleId ? `Chỉnh Sửa Gói: ${title || 'Chưa đặt tên'}` : 'Tạo Mới Combo Đồng Bộ (Banner + Thiết Bị)'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <form onSubmit={handleSaveBundle} className="p-5 sm:p-7 space-y-6 overflow-y-auto flex-1">
              {/* SECTION A: HÌNH ẢNH BANNER CHO GÓI */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-blue-600" />
                    <span>1. Hình Ảnh Banner Cho Gói Combo (Hiển Thị Ở Slider Phía Trên)</span>
                  </h4>
                  <span className="text-[10px] text-slate-500">Tỷ lệ banner ngang ~1200x550px</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700">Đường dẫn ảnh banner (URL)</label>
                    <input
                      type="url"
                      required
                      value={bannerImage}
                      onChange={(e) => setBannerImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="mt-1 w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="mt-3">
                      <label className="text-[11px] font-bold text-slate-600">Hoặc chọn nhanh ảnh mẫu ngành nghề:</label>
                      <div className="grid grid-cols-2 gap-1.5 mt-1.5">
                        {PRESET_BANNER_IMAGES.map((preset, pIdx) => (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => setBannerImage(preset.url)}
                            className={`px-2 py-1.5 rounded-lg text-[10px] font-bold text-left truncate transition-all cursor-pointer border ${
                              bannerImage === preset.url
                                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            {preset.tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Banner Preview */}
                  <div className="h-40 rounded-xl overflow-hidden border border-slate-300 relative bg-slate-900 group">
                    <img
                      src={bannerImage || PRESET_BANNER_IMAGES[0].url}
                      alt="Banner Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = PRESET_BANNER_IMAGES[0].url;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                      <div className="text-white text-xs font-bold truncate">
                        Preview: {title || 'Tiêu đề gói combo'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION B: THÔNG TIN GÓI COMBO */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5 border-b pb-2">
                  <Tag className="w-4 h-4 text-amber-500" />
                  <span>2. Thông Tin Chung & Ngành Nghề Phù Hợp</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div className="md:col-span-2">
                    <label className="text-[11px] font-bold text-slate-700">Tên gói combo *</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="VD: Bộ Trọn Gói Quán Cafe & Trà Sữa Chuẩn Vận Hành"
                      className="mt-1 w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700">Ngành nghề phù hợp</label>
                    <input
                      type="text"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      placeholder="VD: Quán cafe, trà sữa, trà chanh, quán kem"
                      className="mt-1 w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700">Tagline / Câu tóm tắt nổi bật</label>
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      placeholder="VD: Tiết kiệm 15% - Cắm điện là bán ngay"
                      className="mt-1 w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700">Huy hiệu hiển thị (Badge)</label>
                    <input
                      type="text"
                      value={badge}
                      onChange={(e) => setBadge(e.target.value)}
                      placeholder="VD: BÁN CHẠY NHẤT ★"
                      className="mt-1 w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700">Màu nền huy hiệu</label>
                    <select
                      value={badgeColor}
                      onChange={(e) => setBadgeColor(e.target.value)}
                      className="mt-1 w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="from-amber-500 to-orange-600">Cam Vàng (Tiết kiệm nổi bật)</option>
                      <option value="from-red-600 to-rose-700">Đỏ Rực (Hot Deal / Siêu Sale)</option>
                      <option value="from-blue-600 to-indigo-700">Xanh Dương (Chuyên nghiệp)</option>
                      <option value="from-emerald-600 to-teal-700">Xanh Lá (Eco / Bền bỉ)</option>
                      <option value="from-purple-600 to-pink-600">Tím Hồng (Thời trang / Spa)</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-[11px] font-bold text-slate-700">Mô tả chi tiết giải pháp</label>
                    <textarea
                      rows={2}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Mô tả lý do nên mua trọn bộ thiết bị này..."
                      className="mt-1 w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION C: DANH SÁCH CÁC THIẾT BỊ BAO GỒM TRONG GÓI */}
              <div className="space-y-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-blue-600" />
                      <span>3. Các Thiết Bị Bao Gồm Trong Combo ({bundleItems.length} món)</span>
                    </h4>
                    <p className="text-[11px] text-slate-500">Mỗi gói thường gồm 4 thiết bị: Máy POS, Máy in, Két tiền, Máy quét</p>
                  </div>

                  {/* Add from product catalog dropdown */}
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedProductIdToAdd}
                      onChange={(e) => setSelectedProductIdToAdd(e.target.value)}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs max-w-xs focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">-- Chọn sản phẩm từ danh mục --</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({formatVND(p.price)})
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      disabled={!selectedProductIdToAdd}
                      onClick={handleAddItemFromProduct}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Thêm</span>
                    </button>
                  </div>
                </div>

                {bundleItems.length === 0 ? (
                  <div className="py-8 text-center bg-white rounded-xl border border-dashed border-slate-200 text-slate-400 text-xs">
                    Chưa có thiết bị nào trong gói. Vui lòng chọn sản phẩm ở ô trên để thêm vào combo!
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {bundleItems.map((item, itIdx) => (
                      <div
                        key={itIdx}
                        className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-black flex items-center justify-center shrink-0">
                            {itIdx + 1}
                          </span>
                          <img
                            src={item.image || 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=100&q=80'}
                            alt={item.name}
                            className="w-10 h-10 object-contain rounded bg-slate-50 p-1 border shrink-0"
                          />
                          <div>
                            <div className="text-xs font-bold text-slate-800 line-clamp-1">{item.name}</div>
                            <div className="text-[10px] text-slate-400">{item.specsSummary}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                          <div className="text-right">
                            <label className="text-[9px] text-slate-400 block">Giá tính vào combo:</label>
                            <input
                              type="number"
                              value={item.price}
                              onChange={(e) => handleUpdateItemPrice(itIdx, Number(e.target.value) || 0)}
                              className="w-28 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs font-mono font-bold text-right"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveBundleItem(itIdx)}
                            className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg transition-colors cursor-pointer"
                            title="Xóa thiết bị này khỏi gói"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SECTION D: GIÁ BÁN & QUÀ TẶNG KÈM */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pricing Box */}
                <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-3">
                  <h4 className="text-xs font-black uppercase text-indigo-950 flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span>4. Giá Bán & Mức Tiết Kiệm</span>
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Tổng giá mua lẻ gốc:</span>
                      <strong className="font-mono text-slate-800">{formatVND(calculatedOriginalPrice)}</strong>
                    </div>

                    <div className="flex justify-between items-center gap-3">
                      <span>Phần trăm giảm (%):</span>
                      <input
                        type="number"
                        min="0"
                        max="90"
                        value={discountPercent}
                        onChange={(e) => setDiscountPercent(Number(e.target.value) || 0)}
                        className="w-20 px-2 py-1 bg-white border border-slate-200 rounded text-right font-bold text-xs"
                      />
                    </div>

                    <div className="flex justify-between items-center gap-3">
                      <span>Giá bán trọn gói tùy chỉnh:</span>
                      <input
                        type="number"
                        placeholder={String(calculatedBundlePrice)}
                        value={customBundlePrice}
                        onChange={(e) => setCustomBundlePrice(e.target.value)}
                        className="w-32 px-2 py-1 bg-white border border-slate-200 rounded text-right font-mono font-bold text-red-600 text-xs"
                      />
                    </div>

                    <div className="pt-2 border-t border-indigo-200/80 flex justify-between items-center text-emerald-700 font-bold">
                      <span>Khách tiết kiệm được:</span>
                      <span className="font-mono text-sm">{formatVND(calculatedSavings)}</span>
                    </div>
                  </div>
                </div>

                {/* Gifts & Warranty Box */}
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-3">
                  <h4 className="text-xs font-black uppercase text-amber-950 flex items-center gap-1.5">
                    <Gift className="w-4 h-4 text-amber-600" />
                    <span>5. Quà Tặng Độc Quyền & Bảo Hành</span>
                  </h4>

                  <div className="space-y-2">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700">Quà tặng kèm (Mỗi dòng 1 món quà):</label>
                      <textarea
                        rows={3}
                        value={bonusGiftsText}
                        onChange={(e) => setBonusGiftsText(e.target.value)}
                        placeholder="Tặng 10 cuộn giấy in nhiệt K80 Oji Nhật Bản&#10;Miễn phí cài đặt và hướng dẫn tận nơi"
                        className="mt-1 w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-3 text-xs">
                      <label className="font-bold text-slate-700">Bảo hành (tháng):</label>
                      <input
                        type="number"
                        value={warrantyMonths}
                        onChange={(e) => setWarrantyMonths(Number(e.target.value) || 12)}
                        className="w-20 px-2 py-1 bg-white border border-slate-200 rounded text-right font-bold text-xs"
                      />
                    </div>

                    <div className="flex items-center gap-4 pt-1">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={popular}
                          onChange={(e) => setPopular(e.target.checked)}
                          className="w-4 h-4 text-red-600 rounded cursor-pointer"
                        />
                        <span>Đánh dấu Hot Deal (Bán chạy)</span>
                      </label>

                      <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isVisible}
                          onChange={(e) => setIsVisible(e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                        />
                        <span>Hiển thị trên web</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                >
                  Hủy Bỏ
                </button>

                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingBundleId ? 'Cập Nhật Combo' : 'Tạo Gói Combo'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
