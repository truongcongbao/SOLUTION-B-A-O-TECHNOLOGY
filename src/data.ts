import { Product, TroubleshootingGuide } from './types';
import { FEATURED_PRODUCTS_50 } from './featuredProducts50';
import { ATTENDANCE_PRODUCTS_20 } from './attendanceProducts20';

const INITIAL_PRODUCTS_RAW: Product[] = [
  // --- MÁY CHẤM CÔNG ---
  {
    id: 'att-rj1200',
    name: 'Ronald Jack RJ1200',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'Ronald Jack',
    price: 2450000,
    originalPrice: 2900000,
    highlights: [
      'Quản lý 3.000 vân tay & 3.000 thẻ cảm ứng',
      'Tặng kèm phần mềm tính công tiếng Việt vĩnh viễn',
      'Cổng mạng TCP/IP dễ dàng kết xuất file Excel báo cáo'
    ],
    specs: {
      'Dung lượng': '3.000 vân tay + 3.000 thẻ cảm ứng',
      'Bộ nhớ dữ liệu': '100.000 lượt chấm công',
      'Kết nối': 'TCP/IP (Mạng LAN), USB host',
      'Tốc độ quét': '< 1.0 giây',
      'Màn hình': 'TFT 2.8 inch Color',
      'Hỗ trợ cài đặt': 'Miễn phí phần mềm & hỗ trợ qua UltraViewer trọn đời'
    },
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isPopular: false
  },
  {
    id: 'att-4000tid',
    name: 'Ronald Jack 4000TID-C',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'Ronald Jack',
    price: 3500000,
    originalPrice: 4200000,
    highlights: [
      'Dung lượng lớn 4.000 vân tay chuyên dụng cho nhà xưởng',
      'Tích hợp pin lưu điện dự phòng (hoạt động kể cả khi mất điện)',
      'Hỗ trợ kết nối qua USB hoặc dải mạng nội bộ'
    ],
    specs: {
      'Dung lượng': '4.000 vân tay + 4.000 thẻ',
      'Bộ nhớ dữ liệu': '100.000 lượt chấm công',
      'Kết nối': 'TCP/IP, USB, RS232/RS485',
      'Pin dự phòng': 'Tích hợp sẵn, hoạt động từ 2 - 4 tiếng khi cúp điện',
      'Tốc độ xử lý': '< 0.5 giây',
      'Hệ thống báo cáo': 'Phần mềm tiếng Việt Ronald Jack Pro chuyên nghiệp'
    }
  },
  {
    id: 'att-fa113',
    name: 'Gigata FA113 (FaceID AI)',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'Gigata',
    price: 5800000,
    originalPrice: 6500000,
    highlights: [
      'Nhận diện khuôn mặt FaceID AI hồng ngoại kép cực nhạy',
      'Nhận diện tốt ngay cả khi đeo khẩu trang hoặc trong bóng tối',
      'Thích hợp cho công ty lớn, chuỗi cửa hàng, bảo mật cao'
    ],
    specs: {
      'Dung lượng khuôn mặt': '1.200 khuôn mặt',
      'Dung lượng vân tay': '3.000 vân tay + 3.000 thẻ',
      'Bộ nhớ dữ liệu': '100.000 lượt chấm',
      'Camera': 'Camera hồng ngoại kép chuyên dụng cho AI',
      'Màn hình': 'Cảm ứng màu cực sang trọng',
      'Bảo hành': '12 tháng chính hãng'
    },
    isPopular: false
  },
  {
    id: 'att-wse908',
    name: 'Wise Eye WSE-908A',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'Wise Eye',
    price: 2200000,
    originalPrice: 2700000,
    highlights: [
      'Giá rẻ tối ưu cho văn phòng nhỏ, nhà hàng dưới 50 nhân viên',
      'Tích hợp âm thanh & giọng nói tiếng Việt hướng dẫn chấm công',
      'Thiết kế sang trọng, lịch lãm, lắp đặt treo tường gọn gàng'
    ],
    specs: {
      'Dung lượng': '1.000 vân tay + 1.000 thẻ',
      'Bộ nhớ dữ liệu': '80.000 lượt chấm',
      'Màn hình': 'TFT 2.8 inch màu',
      'Kết nối': 'TCP/IP, USB tải file Excel trực tiếp',
      'Đóng gói': 'Thân máy, nguồn adapter, bát treo, ốc vít đầy đủ'
    }
  },
  {
    id: 'att-zk-k14',
    name: 'ZKTeco K14 (Bản Nâng Cấp)',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'ZKTeco',
    price: 1850000,
    originalPrice: 2300000,
    highlights: [
      'Dòng máy chấm công vân tay giá rẻ bán chạy nhất hiện nay',
      'Thuật toán vân tay ZKFinger 10.0 siêu nhạy và chính xác',
      'Thiết kế nhỏ gọn, hiện đại với giao diện UI cực kỳ trực quan'
    ],
    specs: {
      'Dung lượng': '2.000 vân tay + 2.000 thẻ cảm ứng',
      'Bộ nhớ dữ liệu': '80.000 lượt chấm công',
      'Kết nối': 'TCP/IP (Mạng LAN), cổng USB',
      'Hỗ trợ ngôn ngữ': 'Tiếng Việt và Tiếng Anh',
      'Thương hiệu': 'ZKTeco (Thương hiệu toàn cầu)'
    }
  },
  {
    id: 'att-rj-x628c',
    name: 'Ronald Jack X628-C (Huyền Thoại)',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'Ronald Jack',
    price: 2900000,
    originalPrice: 3400000,
    highlights: [
      'Mẫu máy chấm công bền bỉ hàng chục năm được các công ty tin dùng',
      'Sử dụng cảm biến quang học chống trầy xước, chống bám bụi',
      'Đồng bộ dữ liệu chấm công qua mạng LAN cực kỳ nhanh chóng'
    ],
    specs: {
      'Dung lượng': '3.000 vân tay + 3.000 thẻ',
      'Bộ nhớ dữ liệu': '100.000 lượt chấm công',
      'Kết nối': 'TCP/IP, cổng RS232/RS485, USB',
      'Màn hình': 'Màn hình màu TFT 3.0 inch',
      'Chip xử lý': 'Intel 32-bit tốc độ cực cao'
    }
  },

  // --- MÁY IN HÓA ĐƠN ---
  {
    id: 'prn-q200',
    name: 'Xprinter XP-Q200 (K80)',
    category: 'printer',
    categoryLabel: 'Máy In Bill',
    brand: 'Xprinter',
    price: 1350000,
    originalPrice: 1700000,
    highlights: [
      'Khổ giấy K80 (80mm) tiêu chuẩn của tất cả siêu thị, nhà hàng',
      'Tự động cắt giấy sau khi in bill siêu mượt',
      'Tốc độ in nhanh 200mm/s ổn định, đầu in công nghệ Nhật Bản'
    ],
    specs: {
      'Khổ giấy': 'K80 (80mm)',
      'Tốc độ in': '200 mm/giây',
      'Kết nối': 'Cổng USB 2.0 (Cắm máy tính PC/Laptop)',
      'Dao cắt': 'Tự động cắt giấy, tuổi thọ 1.5 triệu lần cắt',
      'Tuổi thọ đầu in': '100 km giấy in liên tục',
      'Công nghệ': 'In nhiệt trực tiếp (Không tốn mực, chỉ cần lắp giấy)'
    },
    isPopular: false
  },
  {
    id: 'prn-a160m',
    name: 'Xprinter XP-A160M (Cổng LAN)',
    category: 'printer',
    categoryLabel: 'Máy In Bill',
    brand: 'Xprinter',
    price: 1650000,
    originalPrice: 2100000,
    highlights: [
      'Tích hợp cổng LAN (Mạng mạng dây RJ45)',
      'In hóa đơn không dây trực tiếp từ điện thoại, iPad cực nhạy',
      'Hỗ trợ mượt mà các app KiotViet, Sapo, Pos365, Sổ Bán Hàng'
    ],
    specs: {
      'Khổ giấy': 'K80 (80mm)',
      'Tốc độ in': '160 mm/giây',
      'Kết nối': 'LAN (Cắm trực tiếp vào Modem Wifi)',
      'Chức năng phụ': 'Có cổng RJ11 kết nối két đựng tiền thu ngân tự động bật'
    }
  },
  {
    id: 'prn-c300h',
    name: 'Xprinter XP-C300H (Kitchen/Bar)',
    category: 'printer',
    categoryLabel: 'Máy In Bill',
    brand: 'Xprinter',
    price: 2300000,
    originalPrice: 2800000,
    highlights: [
      'Ba cổng kết nối siêu khủng USB + LAN + RS232 tiện lợi',
      'Tốc độ in xé gió 300mm/s, thiết kế chống ẩm dầu mỡ nhà bếp',
      'Có loa báo chuông và đèn chớp lớn khi có món mới cần in'
    ],
    specs: {
      'Khổ giấy': 'K80 (80mm)',
      'Tốc độ in': '300 mm/giây',
      'Kết nối': '3 cổng: USB + LAN + RS232 tích hợp sẵn',
      'Tính năng bếp': 'Chuông báo kêu tít tít cực lớn + đèn LED báo nhận order',
      'Bảo vệ': 'Thiết kế nắp đậy hạn chế nước, dầu mỡ rơi vào'
    },
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: 'prn-58iih',
    name: 'Xprinter XP-58IIH (Khổ K57)',
    category: 'printer',
    categoryLabel: 'Máy In Bill',
    brand: 'Xprinter',
    price: 650000,
    originalPrice: 950000,
    highlights: [
      'Khổ giấy nhỏ K57 (57mm) giá rẻ tiết kiệm nhất phân khúc',
      'Kích thước siêu mini gọn gàng, phù hợp quầy thu ngân hẹp',
      'Thích hợp cửa hàng tạp hóa nhỏ, xe đẩy cà phê mang đi'
    ],
    specs: {
      'Khổ giấy': 'K57 (57mm)',
      'Tốc độ in': '90 mm/giây',
      'Kết nối': 'USB (Kết nối máy tính)',
      'Trọng lượng': '0.56 kg siêu nhẹ',
      'Phương pháp': 'In nhiệt trực tiếp'
    }
  },
  {
    id: 'prn-ep-t82',
    name: 'Epson TM-T82III (Cao Cấp)',
    category: 'printer',
    categoryLabel: 'Máy In Bill',
    brand: 'Epson',
    price: 3800000,
    originalPrice: 4500000,
    highlights: [
      'Thương hiệu máy in hóa đơn số 1 thế giới đến từ Nhật Bản',
      'Độ bền đầu in huyền thoại, hoạt động liên tục 24/7 không lỗi',
      'Hóa đơn in ra sắc nét đến từng chi tiết nhỏ nhất'
    ],
    specs: {
      'Khổ giấy': 'K80 (80mm)',
      'Tốc độ in': '250 mm/giây',
      'Kết nối': 'USB + RS232 hoặc LAN (Tùy chọn phiên bản)',
      'Tuổi thọ dao cắt': '2.2 triệu lần cắt tự động',
      'Độ bền đầu in': '150 km giấy in'
    }
  },

  // --- MÁY QUET MÃ VẠCH ---
  {
    id: 'scan-orbit',
    name: 'Honeywell Orbit MS7120',
    category: 'scanner',
    categoryLabel: 'Đầu Đọc Mã Vạch',
    brand: 'Honeywell',
    price: 4200000,
    originalPrice: 4800000,
    highlights: [
      'Máy quét đa tia hồng ngoại để bàn rảnh tay chuyên nghiệp',
      'Tốc độ quét khủng 1.120 dòng/giây, đưa mã qua là nhận ngay',
      'Mẫu mã độc đáo như chiếc phi thuyền, biểu tượng ngành siêu thị'
    ],
    specs: {
      'Công nghệ': 'Laser đa tia Omni-directional (20 tia đan chéo)',
      'Tốc độ quét': '1.120 dòng/giây cực nhanh',
      'Chuẩn kết nối': 'USB (Cắm vào máy tính là chạy ngay, tự động nhận)',
      'Thiết kế đầu quét': 'Có thể gật gù chỉnh góc lên xuống 30 độ',
      'Thương hiệu': 'Honeywell (Mỹ), độ bền đạt chuẩn quân đội'
    },
    isPopular: false
  },
  {
    id: 'scan-2101g',
    name: 'Xprinter XP-2101G (Không Dây 2D)',
    category: 'scanner',
    categoryLabel: 'Đầu Đọc Mã Vạch',
    brand: 'Xprinter',
    price: 1850000,
    originalPrice: 2300000,
    highlights: [
      'Kết nối không dây Bluetooth & 2.4G di chuyển quanh kho 100m',
      'Đọc tốt cả mã vạch 1D truyền thống và mã 2D/QR Code phức tạp',
      'Đi kèm đế sạc thông minh vừa sạc vừa nhận tín hiệu truyền dữ liệu'
    ],
    specs: {
      'Công nghệ đọc': 'CMOS Image Sensor nhạy cả trên màn hình điện thoại',
      'Kết nối không dây': 'Bluetooth 4.0 & Wireless 2.4Ghz',
      'Phạm vi hoạt động': 'Lên tới 100 mét trong không gian trống',
      'Dung lượng pin': '2.200 mAh, sạc 4 tiếng dùng liên tục 20 tiếng',
      'Chân đế': 'Đế sạc đa năng kiêm đầu thu tín hiệu USB receiver'
    }
  },
  {
    id: 'scan-li2208',
    name: 'Zebra LI2208 (Chính Hãng Mỹ)',
    category: 'scanner',
    categoryLabel: 'Đầu Đọc Mã Vạch',
    brand: 'Zebra',
    price: 2100000,
    originalPrice: 2600000,
    highlights: [
      'Dòng máy quét mã vạch 1D cầm tay số 1 tại các nhà thuốc, shop thời trang',
      'Đầu quét công nghệ Linear Imager quét được cả trên giấy bóng, mờ',
      'Chịu lực siêu bền: rơi từ 1.8m xuống bê tông vẫn chạy hoàn hảo'
    ],
    specs: {
      'Công nghệ': 'Linear Imager',
      'Tốc độ quét': '547 quét/giây',
      'Kết nối': 'Cáp USB rời tiện nâng cấp cắm cổng COM',
      'Chuẩn độ bền': 'IP42 kháng bụi nước nhẹ',
      'Bảo hành': '12 tháng chính hãng Zebra toàn cầu'
    }
  },
  {
    id: 'scan-qw2100',
    name: 'Datalogic QW2100 (Thương Hiệu Ý)',
    category: 'scanner',
    categoryLabel: 'Đầu Đọc Mã Vạch',
    brand: 'Datalogic',
    price: 1950000,
    originalPrice: 2400000,
    highlights: [
      'Thương hiệu Datalogic châu Âu với công nghệ điểm xanh Green Spot',
      'Điểm xanh thông minh phản hồi trên mã vạch báo quét thành công',
      'Tia quét góc rộng đọc được các mã vạch dài trên hóa đơn điện nước'
    ],
    specs: {
      'Công nghệ': 'Laser-like CCD siêu mỏng siêu sắc nét',
      'Độ rộng quét': 'Lên đến góc quét 56 độ',
      'Tính năng đặc biệt': 'Green Spot phản hồi trực tiếp khi hoàn thành quét',
      'Chân đế': 'Gồm chân đế treo máy quét tự động chuyển chế độ rảnh tay'
    }
  },

  // --- MÁY IN MÃ VẠCH ---
  {
    id: 'lbl-350b',
    name: 'Xprinter XP-350B (Tem 80mm)',
    category: 'label',
    categoryLabel: 'Máy In Tem Nhãn',
    brand: 'Xprinter',
    price: 1850000,
    originalPrice: 2200000,
    highlights: [
      'In tem nhãn trà sữa dán cốc, tem nhãn sản phẩm khổ nhỏ',
      'Công nghệ in nhiệt trực tiếp tiện lợi (Không cần ruy-băng mực)',
      'Tự động căn chỉnh khổ giấy chính xác nhờ cảm biến thông minh'
    ],
    specs: {
      'Khổ giấy nhãn': 'Từ 20mm đến 82mm rộng',
      'Tốc độ in': '127 mm/giây',
      'Kết nối': 'USB 2.0 (Cắm máy tính)',
      'Độ phân giải': '203 DPI chữ sắc nét',
      'Ứng dụng phổ biến': 'In tem trà sữa dán ly, tem giá siêu thị, tem nhãn mini'
    }
  },
  {
    id: 'lbl-420b',
    name: 'Xprinter XP-420B (Vận Đơn A6)',
    category: 'label',
    categoryLabel: 'Máy In Tem Nhãn',
    brand: 'Xprinter',
    price: 2250000,
    originalPrice: 2800000,
    highlights: [
      'Vua in đơn hàng Shopee, TikTok Shop, Lazada khổ A6 (100x150mm)',
      'Tốc độ in cực nhanh 152mm/s, in 1 đơn hàng chỉ trong 1 giây',
      'Hỗ trợ toàn diện máy tính Windows và cả hệ điều hành macOS'
    ],
    specs: {
      'Khổ giấy rộng': 'Tối đa 108mm (Chuyên dụng cho giấy xếp nếp A6)',
      'Tốc độ in': '152 mm/giây (Xé gió)',
      'Đầu in': 'Công nghệ bảo vệ nhiệt độ thông minh giúp kéo dài tuổi thọ',
      'Hỗ trợ app vận chuyển': 'GHTK, GHN, Viettel Post, J&T Express, Ninja Van'
    },
    isPopular: false
  },
  {
    id: 'lbl-g500',
    name: 'GoDEX G500 (Truyền Nhiệt)',
    category: 'label',
    categoryLabel: 'Máy In Tem Nhãn',
    brand: 'GoDEX',
    price: 3900000,
    originalPrice: 4500000,
    highlights: [
      'Công nghệ in truyền nhiệt gián tiếp qua ruy-băng mực Ribbon',
      'Chất lượng tem in bền bỉ, chống trầy xước, không bao giờ bay chữ',
      'Tặng kèm phần mềm thiết kế tem chuyên nghiệp GoLabel miễn phí'
    ],
    specs: {
      'Công nghệ in': 'Truyền nhiệt (Sử dụng cuộn mực Ribbon Wax/Resin)',
      'Độ dài mực ribbon': 'Lắp được cuộn mực dài tối đa 300 mét cực kỳ tiết kiệm',
      'Độ phân giải': '203 DPI sắc nét cao',
      'Kết nối': 'Cổng USB 2.0 tốc độ truyền dữ liệu cao',
      'Loại tem hỗ trợ': 'Tem decal giấy thường, decal PVC xé không rách, tem bạc'
    }
  },
  {
    id: 'lbl-tsc200',
    name: 'TSC TE200 (Thương Hiệu Đài Loan)',
    category: 'label',
    categoryLabel: 'Máy In Tem Nhãn',
    brand: 'TSC',
    price: 3650000,
    originalPrice: 4200000,
    highlights: [
      'Thương hiệu TSC Đài Loan nổi tiếng toàn cầu về độ bền máy in mã vạch',
      'Động cơ bánh răng kép hiệu suất cao hoạt động êm ái, bền bỉ',
      'Bộ nhớ lớn 16MB SDRAM và 8MB Flash tải dữ liệu cực kỳ nhanh'
    ],
    specs: {
      'Công nghệ': 'Truyền nhiệt gián tiếp / Trực tiếp',
      'Tốc độ in': '152 mm/giây',
      'Mực ribbon': 'Hỗ trợ cuộn mực 110mm x 300m',
      'Bộ vi xử lý': 'RISC 32-bit 400 MHz mạnh mẽ',
      'Vỏ máy': 'Nhựa ABS cứng cáp chịu va đập tốt'
    }
  },

  // --- GIẤY IN & VẬT TƯ ---
  {
    id: 'con-k80',
    name: 'Giấy In Nhiệt K80x45 (Oji Nhật Bản)',
    category: 'consumable',
    categoryLabel: 'Vật Tư & Giấy In',
    brand: 'Oji',
    price: 350000,
    originalPrice: 450000,
    highlights: [
      'Giấy in nhiệt cao cấp thương hiệu Oji Nhật Bản bọc bạc chống ẩm',
      'Bề mặt giấy láng mịn bảo vệ tối ưu đầu in nhiệt không bị hao mòn',
      'Độ trắng sáng cao, mực in đen rõ nét, đóng thùng 50 cuộn tiêu chuẩn'
    ],
    specs: {
      'Khổ giấy': 'K80 (Rộng 80mm)',
      'Đường kính cuộn': '45mm tiêu chuẩn',
      'Quy cách đóng gói': 'Thùng 50 cuộn bọc giấy bạc chống thấm nước tuyệt đối',
      'Ứng dụng': 'Dùng cho mọi dòng máy in bill K80 (Xprinter, Epson, Birch...)',
      'Xuất xứ': 'Nhập khẩu cuộn từ thương hiệu Oji nổi tiếng Nhật Bản'
    }
  },
  {
    id: 'con-k57',
    name: 'Giấy In Nhiệt K57x45 (Thùng 100 Cuộn)',
    category: 'consumable',
    categoryLabel: 'Vật Tư & Giấy In',
    brand: 'SOLUTION B A O',
    price: 550000,
    originalPrice: 700000,
    highlights: [
      'Giấy in nhiệt khổ nhỏ K57 thích hợp cho các dòng máy in bill cầm tay',
      'Quy cách đóng thùng 100 cuộn thích hợp cho chuỗi tạp hóa, quán ăn',
      'Chất giấy dày dặn bọc bạc từng cuộn giúp lưu kho lên tới 2 năm'
    ],
    specs: {
      'Khổ giấy': 'K57 (Rộng 57mm)',
      'Đường kính': '45mm',
      'Quy cách': 'Thùng 100 cuộn bọc bạc, dán tem nhãn chính hãng SOLUTION B A O',
      'Mặt cảm nhiệt': 'Mặt ngoài nhạy nhiệt cao, in không mờ'
    }
  },
  {
    id: 'con-tem3',
    name: 'Decal Cảm Nhiệt 3 Tem 35x22 (Cuộn 50m)',
    category: 'consumable',
    categoryLabel: 'Vật Tư & Giấy In',
    brand: 'Fasson',
    price: 850000,
    originalPrice: 110000,
    highlights: [
      'Cuộn giấy in decal 3 hàng tem (3 tem dán trên một hàng) dài 50m',
      'Keo dính Fasson cực kỳ chắc chắn, bóc dán lên sản phẩm khó bong',
      'Tương thích tuyệt hảo với các dòng máy in mã vạch truyền nhiệt'
    ],
    specs: {
      'Kích thước tem': '35mm x 22mm mỗi tem nhãn',
      'Quy cách': 'Hàng 3 tem, chiều dài cuộn giấy là 50 mét',
      'Chất liệu keo': 'Avery Fasson AW0331 cao cấp',
      'Ứng dụng': 'Dùng dán nhãn giá sản phẩm tại các shop thời trang, nhà thuốc'
    }
  },

  // --- HỘC ĐỰNG TIỀN ---
  {
    id: 'draw-rt405',
    name: 'Két Sắt Thu Ngân RT405 (Mở Tự Động)',
    category: 'drawer',
    categoryLabel: 'Hộp Đựng Tiền',
    brand: 'Maken',
    price: 950000,
    originalPrice: 1200000,
    highlights: [
      'Thiết kế khung thép dày chống gỉ sét bọc sơn tĩnh điện sang trọng',
      'Tích hợp dây kích hoạt RJ11: Tự động bung két mở ngăn kéo khi máy in bill',
      'Gồm 5 ngăn đựng tiền giấy có kẹp sắt và 4 ngăn tiền xu tiện dụng'
    ],
    specs: {
      'Kích thước': '405 (W) x 410 (D) x 100 (H) mm',
      'Ngăn đựng': '5 ngăn tiền giấy có kẹp giữ + 4 ngăn nhỏ đa năng',
      'Kết nối': 'Cổng RJ11 (Kết nối trực tiếp máy in hóa đơn 12V/24V)',
      'Tuổi thọ bánh răng': 'Mở khóa hơn 1.000.000 lần nhấn',
      'Khóa két': 'Chế độ khóa 3 vị trí (Mở bằng chìa, tự động mở, khóa chặt)'
    },
    isPopular: false
  },
  {
    id: 'att-zk-mb20',
    name: 'ZKTeco MB20 (FaceID AI + Vân Tay)',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'ZKTeco',
    price: 3250000,
    originalPrice: 3800000,
    highlights: [
      'Công nghệ FaceID AI nhận diện khuôn mặt cực nhạy chỉ trong 0.5 giây',
      'Tích hợp vân tay chống sao chép và thẻ cảm ứng tiện lợi',
      'Phù hợp cho các văn phòng, nhà hàng, quán cafe hiện đại'
    ],
    specs: {
      'Dung lượng khuôn mặt': '200 khuôn mặt',
      'Dung lượng vân tay': '500 vân tay + 500 thẻ',
      'Bộ nhớ dữ liệu': '50.000 lượt chấm công',
      'Kết nối': 'TCP/IP (Mạng LAN), USB host',
      'Tính năng nổi bật': 'Nhận diện đa dạng góc khuôn mặt, tốc độ cao',
      'Tặng kèm': 'Phần mềm tính công tiếng Việt chuyên sâu + hỗ trợ cài đặt từ xa'
    },
    isPopular: false
  },
  {
    id: 'prn-xp-p300',
    name: 'Xprinter XP-P300 (Máy In Bill Cầm Tay Bluetooth)',
    category: 'printer',
    categoryLabel: 'Máy In Bill',
    brand: 'Xprinter',
    price: 1450000,
    originalPrice: 1800000,
    highlights: [
      'Máy in hóa đơn cầm tay siêu nhỏ gọn, dễ dàng bỏ túi di chuyển',
      'Kết nối Bluetooth cực kỳ ổn định với điện thoại Android & iOS',
      'Pin dung lượng cao 2000mAh hoạt động liên tục suốt ngày dài'
    ],
    specs: {
      'Khổ giấy': 'K57 (57mm)',
      'Tốc độ in': '70 mm/giây',
      'Kết nối': 'Bluetooth + USB (kết nối máy tính và sạc)',
      'Dung lượng pin': '2.000 mAh sạc nhanh Type-C',
      'Đặc điểm': 'Thích hợp in đơn hàng taxi, giao hàng, thu hộ điện nước tận nơi'
    }
  },
  {
    id: 'scan-zb-ds2208',
    name: 'Zebra DS2208 (Đầu Đọc Mã Vạch 2D QR Code)',
    category: 'scanner',
    categoryLabel: 'Đầu Đọc Mã Vạch',
    brand: 'Zebra',
    price: 2850000,
    originalPrice: 3400000,
    highlights: [
      'Dòng máy quét mã vạch 2D chuyên nghiệp xuất xứ chính hãng Zebra (Mỹ)',
      'Quét cực nhạy mọi mã vạch 1D, 2D, QR Code mờ xước, nhòe trên mọi chất liệu',
      'Đi kèm chân đế thông minh tự động kích hoạt chế độ rảnh tay'
    ],
    specs: {
      'Công nghệ': 'Imager chuỗi ảnh diện rộng (quét đa hướng)',
      'Kết nối': 'Cáp USB dài 2m chính hãng',
      'Độ bền': 'Chịu va đập khi rơi từ độ cao 1.5m xuống sàn bê tông',
      'Kháng nước bụi': 'Đạt chuẩn IP42 cực kỳ bền bỉ',
      'Thương hiệu': 'Zebra (Mỹ) - Uy tín hàng đầu thế giới'
    },
    isPopular: false
  },
  {
    id: 'sw-leo-top-google',
    name: 'Phần Mềm Leo Top Google - Hút Traffic Khủng',
    category: 'software',
    categoryLabel: 'Phần Mềm & Giải Pháp SEO',
    brand: 'SOLUTION B A O',
    price: 1500000,
    originalPrice: 2500000,
    highlights: [
      'Traffic đa nguồn chất lượng: Organic Search, Direct, Social, Referral, Random',
      'Tác động trực tiếp lên dữ liệu báo cáo Google Analytics (GA4) & Search Console (GSC)',
      'Tương tác như người dùng thật, profile trình duyệt có lịch sử search, giải Captcha & Proxy IP toàn quốc',
      'Tự động tạo backlink ảo chất lượng, tùy chọn thời gian on-page, số click và tỷ lệ CTR an toàn'
    ],
    specs: {
      'Tên phần mềm': 'Leo Top Google - Hút Traffic Khủng',
      'Nguồn Traffic': 'Organic, Direct, Social, Referral, Random linh hoạt',
      'Đo lường': 'Tác động trực tiếp Google Analytics (GA4) & Google Search Console (GSC)',
      'Hành vi tương tác': 'Mô phỏng người dùng thật (cuộn trang, click link nội bộ, stay time)',
      'Bảo mật & An toàn': 'Profile trình duyệt có lịch sử search, giải Captcha tự động, Proxy xoay IP toàn quốc',
      'Tùy chỉnh linh hoạt': 'Random thời gian on-page, số click, tùy chỉnh CTR theo từ khóa',
      'Tính năng độc quyền': 'Tự động tạo backlink ảo chất lượng, chạy ẩn không tốn tài nguyên',
      'Hệ điều hành': 'Windows 10 / 11 / Windows Server',
      'Bản quyền & Hỗ trợ': 'Bản quyền sử dụng kèm hỗ trợ kỹ thuật UltraViewer / Zalo 24/7'
    },
    isPopular: false
  }
];

export const PRODUCTS_DATA: Product[] = [
  ...INITIAL_PRODUCTS_RAW,
  ...FEATURED_PRODUCTS_50,
  ...ATTENDANCE_PRODUCTS_20
];

export const TROUBLESHOOTING_GUIDE: TroubleshootingGuide[] = [
  {
    category: 'printer',
    categoryLabel: 'Máy In Hóa Đơn',
    problem: 'Máy in hóa đơn in ra giấy trắng tinh, không có chữ',
    steps: [
      'Kiểm tra lại mặt lắp giấy: Máy in hóa đơn là máy in nhiệt, giấy chỉ cảm nhiệt trên đúng 1 mặt. Hãy lấy cuộn giấy ra, lật ngược đầu cuộn giấy lại và thử bấm nút FEED rồi in lại.',
      'Đảm bảo bạn đang sử dụng loại Giấy In Nhiệt (Thermal Paper). Bạn có thể thử dùng móng tay cà mạnh lên mặt giấy, nếu để lại vệt đen thì đó là giấy in nhiệt chuẩn.',
      'Vệ sinh đầu in nhiệt: Lâu ngày bám bụi giấy có thể cản trở truyền nhiệt. Hãy dùng tăm bông tẩm một chút cồn y tế lau nhẹ bề mặt dải đầu in nhiệt màu đen bên trong nắp máy.'
    ]
  },
  {
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    problem: 'Phần mềm báo lỗi mất kết nối, không kết nối được máy chấm công',
    steps: [
      'Kiểm tra dây cáp mạng LAN cắm ở phía sau máy chấm công. Đèn xanh lá bên cổng mạng phải sáng đứng và đèn vàng phải nhấp nháy liên tục báo hiệu truyền tín hiệu.',
      'Kiểm tra dải địa chỉ IP trên máy chấm công: Bấm giữ nút M/OK trên máy khoảng 3 giây -> Vào mục Thiết lập liên kết -> Ethernet -> Xem IP của máy (Ví dụ mặc định: 192.168.1.201).',
      'Kiểm tra dải IP mạng máy tính: Trên máy tính, bấm tổ hợp phím Windows + R, gõ "cmd" bấm Enter. Gõ lệnh "ping 192.168.1.201" (thay bằng IP máy chấm công của bạn) xem có nhận phản hồi thông mạng hay không.',
      'Đảm bảo dải IP của máy chấm công trùng với dải IP modem mạng Wifi của bạn (Ví dụ modem phát dải 192.168.1.X thì IP máy chấm công phải là 192.168.1.201).'
    ]
  },
  {
    category: 'scanner',
    categoryLabel: 'Đầu Đọc Mã Vạch',
    problem: 'Máy quét có sáng đèn laser nhưng khi quét không truyền số vào máy tính',
    steps: [
      'Rút đầu cáp USB kết nối của máy quét ra khỏi máy tính, chờ 5 giây rồi cắm sang một cổng USB khác (Ưu tiên các cổng USB phía sau thùng máy PC đối với máy tính bàn).',
      'Mở phần mềm Word, Excel hoặc Notepad trên máy tính của bạn lên, nhấp con trỏ chuột vào vị trí soạn thảo cho nhấp nháy, sau đó đưa máy quét một mã vạch chuẩn để xem ký tự có nhảy ra không.',
      'Nếu là máy quét mã vạch không dây Bluetooth, hãy lắp máy quét vào đế sạc hoặc quét mã cấu hình kết nối (Pairing barcode) trong sách hướng dẫn đi kèm để ghép nối lại với cục receiver.'
    ]
  },
  {
    category: 'label',
    categoryLabel: 'Máy In Tem Nhãn',
    problem: 'Máy in tem bị báo đèn đỏ nhấp nháy và không in ra tem được',
    steps: [
      'Lỗi báo đèn đỏ thường là do máy in chưa nhận diện được kích thước tem nhãn hoặc lắp sai khổ giấy. Hãy tháo tem nhãn ra và lắp đúng vào thanh kẹp giấy, điều chỉnh hai miếng kẹp giữ tem sát hông cuộn giấy vừa vặn.',
      'Thực hiện quy trình Calibrate (Đo khổ tem tự động): Tắt công tắc nguồn máy in phía sau -> Nhấn giữ nút FEED ở mặt trên máy -> Đồng thời bật công tắc nguồn lên -> Chờ đèn chớp đỏ vài lần rồi nhả nút FEED. Máy sẽ tự động chạy ra 2-3 hàng tem để đo khoảng cách tem nhãn.',
      'Kiểm tra cài đặt driver trên máy tính: Hãy chắc chắn bạn đã cấu hình đúng khổ giấy in tem (Ví dụ tem nhãn A6 100x150mm hoặc tem trà sữa 50x30mm) trong cài đặt Driver Printing Preferences trên Windows/macOS.'
    ]
  }
];
