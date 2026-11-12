import { ComboBundle } from './types';

export const DEFAULT_COMBO_BUNDLES: ComboBundle[] = [
  {
    id: 'combo-cafe-trasua',
    title: 'Bộ Trọn Gói Quán Cafe & Trà Sữa Chuẩn Vận Hành',
    tagline: 'Tiết kiệm 15% - Cắm điện là bán ngay, tối ưu tốc độ gọi món',
    badge: 'BÁN CHẠY NHẤT ★',
    badgeColor: 'from-amber-500 to-orange-600',
    targetAudience: 'Quán Cafe, Trà Sữa, Quán Nước, Tiệm Trà Chanh, Bakery',
    description: 'Giải pháp chuyên dụng cho quầy bar pha chế: Máy POS màn hình cảm ứng điện dung mượt mà, máy in hóa đơn K80 tự động cắt giấy, ngăn kéo đựng tiền tự bung khi xuất bill và máy in tem dán ly trà sữa.',
    popular: true,
    warrantyMonths: 12,
    order: 1,
    isVisible: true,
    bannerImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    bonusGifts: [
      'Tặng 10 cuộn giấy in nhiệt K80 Oji Nhật Bản',
      'Tặng 02 cuộn tem trà sữa 50x30mm chất lượng cao',
      'Cài đặt sẵn menu, cấu hình in bill & bàn giao tận nơi',
      'Bảo hành chính hãng 1 đổi 1 trong 30 ngày đầu'
    ],
    items: [
      {
        productId: 'pos-sunmi-d2s',
        name: 'Máy POS Bán Hàng Sunmi Cảm Ứng Đa Điểm 15.6 inch',
        categoryLabel: 'Máy Bán Hàng POS',
        price: 6500000,
        originalPrice: 7500000,
        image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80',
        specsSummary: 'Màn hình 15.6" Full HD, Ram 4GB / SSD 64GB siêu mượt'
      },
      {
        productId: 'prn-xp-n160ii',
        name: 'Máy In Hóa Đơn Xprinter XP-N160II Khổ K80 Tự Động Cắt',
        categoryLabel: 'Máy In Hóa Đơn',
        price: 1150000,
        originalPrice: 1450000,
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80',
        specsSummary: 'Tốc độ 160mm/s, dao cắt tự động siêu bền 1.5 triệu lần'
      },
      {
        productId: 'draw-mk-410',
        name: 'Két Đựng Tiền Thu Ngân Maken MK-410 (5 Ngăn Kẹp Tiền)',
        categoryLabel: 'Két Đựng Tiền',
        price: 790000,
        originalPrice: 950000,
        image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=600&q=80',
        specsSummary: 'Vỏ thép sơn tĩnh điện, tự động bật két khi in bill'
      },
      {
        productId: 'lbl-350b',
        name: 'Máy In Tem Nhãn Dán Ly Trà Sữa Xprinter XP-350B',
        categoryLabel: 'Máy In Tem Nhãn',
        price: 1250000,
        originalPrice: 1550000,
        image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=600&q=80',
        specsSummary: 'In tem nhiệt trực tiếp không cần mực, tốc độ 127mm/s'
      }
    ],
    originalPrice: 11450000,
    bundlePrice: 9690000,
    discountPercent: 15,
    savingAmount: 1760000
  },
  {
    id: 'combo-banle-taphoa',
    title: 'Bộ Trọn Gói Cửa Hàng Bán Lẻ & Siêu Thị Mini Tiết Kiệm',
    tagline: 'Tiết kiệm 18% - Quét mã siêu tốc, quản lý tồn kho chính xác',
    badge: 'KHUYÊN DÙNG ⭐',
    badgeColor: 'from-blue-600 to-indigo-700',
    targetAudience: 'Cửa hàng tạp hóa, siêu thị mini, shop mỹ phẩm, shop quần áo, văn phòng phẩm',
    description: 'Trọn bộ thiết bị tính tiền và kiểm kho hiện đại cho cửa hàng bán lẻ: Quét mã vạch 1D/2D QR code siêu nhạy, in hóa đơn sắc nét và két thu ngân chống thất thoát tiền mặt.',
    popular: true,
    warrantyMonths: 12,
    order: 2,
    isVisible: true,
    bannerImage: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80',
    bonusGifts: [
      'Tặng 10 cuộn giấy in nhiệt K80 Oji Nhật Bản cao cấp',
      'Tặng phần mềm quản lý kho & bán hàng bản chuẩn',
      'Hỗ trợ cấu hình tích hợp cổng mã vạch thanh toán QR Ngân Hàng',
      'Miễn phí lắp đặt & đào tạo nhân viên thu ngân'
    ],
    items: [
      {
        productId: 'pos-tyso-ts150',
        name: 'Máy POS Cảm Ứng All-In-One Tyso TS150 (Core i5 / 8GB / 128GB)',
        categoryLabel: 'Máy Bán Hàng POS',
        price: 7900000,
        originalPrice: 9200000,
        image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80',
        specsSummary: 'CPU Intel Core i5 mạnh mẽ, cảm ứng điện dung mượt mà'
      },
      {
        productId: 'scan-hw-1900g',
        name: 'Đầu Đọc Mã Vạch 2D Đa Tia Honeywell Xenon 1900GSR',
        categoryLabel: 'Đầu Đọc Mã Vạch',
        price: 3450000,
        originalPrice: 3950000,
        image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
        specsSummary: 'Quét siêu nhạy mã mờ, trầy xước, quét mã QR trên màn hình điện thoại'
      },
      {
        productId: 'prn-xp-q80c',
        name: 'Máy In Hóa Đơn Xprinter XP-Q80C Cổng LAN + USB Tốc Độ Cao',
        categoryLabel: 'Máy In Hóa Đơn',
        price: 1550000,
        originalPrice: 1850000,
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80',
        specsSummary: 'Tốc độ 230mm/s, dao cắt tự động, hỗ trợ in qua mạng LAN'
      },
      {
        productId: 'draw-mk-410',
        name: 'Hộp Đựng Tiền Thu Ngân Maken MK-410 (5 Ngăn Kẹp Tiền)',
        categoryLabel: 'Két Đựng Tiền',
        price: 790000,
        originalPrice: 950000,
        image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=600&q=80',
        specsSummary: '5 ngăn tiền giấy kẹp lò xo chắc chắn + 4 ngăn tiền xu/tiền lẻ'
      }
    ],
    originalPrice: 15950000,
    bundlePrice: 12990000,
    discountPercent: 18,
    savingAmount: 2960000
  },
  {
    id: 'combo-nha-hang-quan-an',
    title: 'Bộ Trọn Gói Nhà Hàng & Quán Ăn (In Bếp Từ Xa Không Dây)',
    tagline: 'Tiết kiệm 16% - Báo món nhà bếp tức thì, không sót order',
    badge: 'GIẢI PHÁP F&B 🔥',
    badgeColor: 'from-emerald-600 to-teal-700',
    targetAudience: 'Nhà hàng, Quán lẩu nướng, Quán ăn gia đình, Quán nhậu, Chuỗi ẩm thực',
    description: 'Hệ thống gọi món và in bill chuyên dụng cho nhà hàng: Trang bị máy in hóa đơn cổng LAN cắm trực tiếp nhà bếp chống dầu mỡ và ẩm ướt, chuông báo âm thanh khi có order món mới.',
    popular: false,
    warrantyMonths: 12,
    order: 3,
    isVisible: true,
    bannerImage: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=80',
    bonusGifts: [
      'Tặng 15 cuộn giấy in hóa đơn K80 bọc bạc chống ẩm',
      'Tặng dây cáp mạng bấm sẵn 2 đầu 20 mét kết nối nhà bếp',
      'Hỗ trợ chia khu vực bàn, sơ đồ phòng VIP và quản lý kho định lượng',
      'Tư vấn kỹ thuật online 24/7 trọn đời'
    ],
    items: [
      {
        productId: 'pos-dual-ts152',
        name: 'Bộ Máy POS 2 Màn Hình Cảm Ứng Dual Screen POS-1520',
        categoryLabel: 'Máy Bán Hàng POS',
        price: 8900000,
        originalPrice: 10500000,
        image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80',
        specsSummary: '1 màn hình thu ngân cảm ứng + 1 màn hình phụ hướng về khách hàng'
      },
      {
        productId: 'prn-xp-q80c',
        name: 'Máy In Bill Bếp Chuyên Dụng Xprinter XP-Q80C (Chống Bám Dầu)',
        categoryLabel: 'Máy In Hóa Đơn Bếp',
        price: 1550000,
        originalPrice: 1850000,
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80',
        specsSummary: 'Âm báo to rõ khi có món mới, chống khói bụi và ẩm ướt nhà bếp'
      },
      {
        productId: 'prn-xp-n160ii',
        name: 'Máy In Hóa Đơn Quầy Thu Ngân Xprinter XP-N160II K80',
        categoryLabel: 'Máy In Hóa Đơn Thu Ngân',
        price: 1150000,
        originalPrice: 1450000,
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80',
        specsSummary: 'In bill tính tiền thanh toán tại quầy ra món cho thực khách'
      },
      {
        productId: 'draw-mk-410',
        name: 'Hộp Đựng Tiền Thu Ngân Maken MK-410 Tự Động Bật Két',
        categoryLabel: 'Két Đựng Tiền',
        price: 790000,
        originalPrice: 950000,
        image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=600&q=80',
        specsSummary: 'Khóa 3 chế độ (Khóa cứng, mở cơ, mở tự động bằng xung điện)'
      }
    ],
    originalPrice: 14750000,
    bundlePrice: 12390000,
    discountPercent: 16,
    savingAmount: 2360000
  },
  {
    id: 'combo-kho-van-chuyen-phat',
    title: 'Bộ Trọn Gói In Đơn Hàng Shopee / TikTok & Kiểm Kho Mã Vạch',
    tagline: 'Tiết kiệm 20% - Tối ưu đóng gói đơn hàng TMĐT và kho vận',
    badge: 'SHOP ONLINE 📦',
    badgeColor: 'from-purple-600 to-indigo-800',
    targetAudience: 'Shop bán hàng online (Shopee, Lazada, TikTok Shop), Kho hàng phân phối, Chuyển phát nhanh',
    description: 'Trọn bộ thiết bị in vận đơn và kiểm hàng không dây: In mã vận đơn A6 tự dính bóc dán ngay không cần băng keo, kết hợp đầu đọc mã vạch không dây quét đối soát hàng trăm đơn mỗi giờ.',
    popular: false,
    warrantyMonths: 12,
    order: 4,
    isVisible: true,
    bannerImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    bonusGifts: [
      'Tặng 02 cuộn giấy in mã vận đơn A6 (100x150mm) 300 tem/cuộn',
      'Cài đặt sẵn driver máy in và hướng dẫn in từ app Shopee/TikTok',
      'Đổi mới thiết bị trong 15 ngày nếu có lỗi kỹ thuật'
    ],
    items: [
      {
        productId: 'lbl-420b',
        name: 'Máy In Đơn Hàng TMĐT Xprinter XP-420B Khổ A6 (100x150mm)',
        categoryLabel: 'Máy In Vận Đơn',
        price: 1850000,
        originalPrice: 2200000,
        image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=600&q=80',
        specsSummary: 'Tốc độ 152mm/s, khổ in 108mm, in rõ nét mã vận đơn mọi sàn TMĐT'
      },
      {
        productId: 'scan-zb-li4278',
        name: 'Máy Quét Mã Vạch Không Dây Zebra LI4278 Bluetooth',
        categoryLabel: 'Đầu Đọc Mã Vạch Không Dây',
        price: 5200000,
        originalPrice: 5900000,
        image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
        specsSummary: 'Kết nối không dây tầm xa 100 mét, quét liên tục 72 giờ không lo hết pin'
      },
      {
        productId: 'prn-xp-n160ii',
        name: 'Máy In Hóa Đơn Bán Lẻ Kẹp Hàng Xprinter XP-N160II Khổ K80',
        categoryLabel: 'Máy In Hóa Đơn',
        price: 1150000,
        originalPrice: 1450000,
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80',
        specsSummary: 'In phiếu xuất kho, phiếu nhặt hàng hoặc hóa đơn bán lẻ kẹp gói hàng'
      }
    ],
    originalPrice: 9550000,
    bundlePrice: 7640000,
    discountPercent: 20,
    savingAmount: 1910000
  },
  {
    id: 'combo-thoi-trang-boutique',
    title: 'Bộ Trọn Gói Shop Thời Trang, Mỹ Phẩm & Phụ Kiện Cao Cấp',
    tagline: 'Tiết kiệm 17% - Thiết kế sang trọng, thanh toán nhanh chóng',
    badge: 'BOUTIQUE CHIC ✨',
    badgeColor: 'from-pink-600 to-rose-700',
    targetAudience: 'Shop thời trang cao cấp, cửa hàng mỹ phẩm, phụ kiện trang sức, tiệm kính mắt',
    description: 'Bộ giải pháp thẩm mỹ cao cho cửa hàng phong cách: Máy POS màu trắng thanh lịch, đầu đọc mã vạch quét thẻ thành viên tích điểm và máy in tem nhãn trang sức, phụ kiện.',
    popular: true,
    warrantyMonths: 12,
    order: 5,
    isVisible: true,
    bannerImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    bonusGifts: [
      'Tặng 10 cuộn giấy in bill K80 cao cấp',
      'Tặng 02 cuộn tem trang sức & mã vạch bọc bóng',
      'Miễn phí cấu hình mẫu hóa đơn in logo shop',
      'Bảo hành 1 đổi 1 trong 30 ngày'
    ],
    items: [
      {
        productId: 'pos-sunmi-d2s',
        name: 'Máy POS Cảm Ứng Sunmi Sang Trọng 15.6 inch',
        categoryLabel: 'Máy Bán Hàng POS',
        price: 6500000,
        originalPrice: 7500000,
        image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80',
        specsSummary: 'Thiết kế bo cong tinh tế, màn hình cảm ứng điện dung Full HD'
      },
      {
        productId: 'scan-hw-1900g',
        name: 'Máy Quét Mã Vạch 2D Cầm Tay Honeywell Xenon 1900GSR',
        categoryLabel: 'Đầu Đọc Mã Vạch',
        price: 3450000,
        originalPrice: 3950000,
        image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
        specsSummary: 'Quét tem mã vạch trang sức, mã tích điểm khách hàng trên điện thoại'
      },
      {
        productId: 'prn-xp-n160ii',
        name: 'Máy In Hóa Đơn Xprinter XP-N160II Tự Cắt Giấy',
        categoryLabel: 'Máy In Hóa Đơn',
        price: 1150000,
        originalPrice: 1450000,
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80',
        specsSummary: 'In bill tính tiền rõ nét, cắt giấy tự động chuẩn xác'
      },
      {
        productId: 'draw-mk-410',
        name: 'Két Thu Ngân Maken MK-410 Sơn Tĩnh Điện Cao Cấp',
        categoryLabel: 'Két Đựng Tiền',
        price: 790000,
        originalPrice: 950000,
        image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=600&q=80',
        specsSummary: 'Chống thất thoát, kết nối mở tự động sau khi thanh toán'
      }
    ],
    originalPrice: 13850000,
    bundlePrice: 11490000,
    discountPercent: 17,
    savingAmount: 2360000
  },
  {
    id: 'combo-takeaway-nhanh',
    title: 'Bộ Trọn Gói Quán Trà Chanh, Bánh Mì & Take-Away Tiết Kiệm Tối Đa',
    tagline: 'Tiết kiệm 22% - Gọn nhẹ, chi phí đầu tư siêu thấp thu hồi vốn nhanh',
    badge: 'GIÁ RẺ NHẤT 🚀',
    badgeColor: 'from-amber-600 to-yellow-600',
    targetAudience: 'Xe đẩy cafe mang đi, tiệm bánh mì, quán trà chanh vỉa hè, kiosk đồ ăn nhanh',
    description: 'Gói combo tinh gọn tối đa chi phí cho mô hình bán mang đi take-away: Máy in hóa đơn di động cổng Bluetooth/USB, ngăn kéo thu ngân bảo mật và máy quét cầm tay quét mã QR momo/ngân hàng.',
    popular: false,
    warrantyMonths: 12,
    order: 6,
    isVisible: true,
    bannerImage: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80',
    bonusGifts: [
      'Tặng 10 cuộn giấy in hóa đơn nhiệt K58',
      'Tặng bảng mica QR Code thanh toán để bàn',
      'Cài đặt ứng dụng tính tiền miễn phí trên điện thoại Android/iOS',
      'Bảo hành chính hãng 12 tháng'
    ],
    items: [
      {
        productId: 'prn-xp-n160ii',
        name: 'Máy In Hóa Đơn Khổ K80 Cổng USB Xprinter XP-N160II',
        categoryLabel: 'Máy In Hóa Đơn',
        price: 1150000,
        originalPrice: 1450000,
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80',
        specsSummary: 'Tốc độ 160mm/s, in siêu nhanh hóa đơn mang đi cho khách'
      },
      {
        productId: 'draw-mk-410',
        name: 'Két Đựng Tiền Thu Ngân Nhỏ Gọn Maken MK-410',
        categoryLabel: 'Két Đựng Tiền',
        price: 790000,
        originalPrice: 950000,
        image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=600&q=80',
        specsSummary: 'Bảo mật tiền mặt tại quầy mang đi, tự bật két khi in bill'
      },
      {
        productId: 'scan-hw-1900g',
        name: 'Máy Quét Mã Vạch 1D/2D Quét Mã QR Khách Hàng',
        categoryLabel: 'Đầu Đọc Mã Vạch',
        price: 3450000,
        originalPrice: 3950000,
        image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
        specsSummary: 'Quét nhanh mã chuyển khoản ngân hàng trên điện thoại khách hàng'
      }
    ],
    originalPrice: 6350000,
    bundlePrice: 4950000,
    discountPercent: 22,
    savingAmount: 1400000
  }
];
