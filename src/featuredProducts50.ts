import { Product } from './types';

export const FEATURED_PRODUCTS_50: Product[] = [
  // ==========================================
  // 1. MÁY CHẤM CÔNG (5 SẢN PHẨM NỔI BẬT)
  // ==========================================
  {
    id: 'att-hik-k1t342',
    name: 'Máy Chấm Công Khuôn Mặt AI Hikvision DS-K1T342MFWX',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'Hikvision',
    price: 3850000,
    originalPrice: 4500000,
    highlights: [
      'Nhận diện khuôn mặt AI góc siêu rộng dưới 0.2 giây, chống giả mạo ảnh chụp',
      'Tích hợp Wifi không dây & kết nối App điện thoại Hik-Connect quản lý từ xa',
      'Dung lượng 1.500 khuôn mặt, 3.000 vân tay và 3.000 thẻ Mifare'
    ],
    specs: {
      'Dung lượng khuôn mặt': '1.500 khuôn mặt AI',
      'Dung lượng vân tay / thẻ': '3.000 vân tay + 3.000 thẻ Mifare',
      'Màn hình': 'Cảm ứng LCD 4.3 inch sắc nét',
      'Camera': 'Ống kính kép 2MP WDR chống ngược sáng',
      'Kết nối': 'Wifi, TCP/IP, USB host, RS-485',
      'Phần mềm': 'iVMS-4200 / HikCentral tiếng Việt'
    },
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    description: 'Máy chấm công nhận diện khuôn mặt AI thế hệ mới của Hikvision, hỗ trợ kết nối Wifi không cần đi dây mạng phức tạp, quản lý qua điện thoại.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'att-zk-uface800',
    name: 'Máy Chấm Công Khuôn Mặt & Vân Tay ZKTeco uFace800 Plus',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'ZKTeco',
    price: 6800000,
    originalPrice: 7900000,
    highlights: [
      'Dung lượng khủng: 3.000 khuôn mặt & 4.000 vân tay chuyên dụng cho nhà máy',
      'Tích hợp pin lưu điện dự phòng hoạt động liên tục 4-5 tiếng khi cúp điện',
      'Camera hồng ngoại kép nhận diện chuẩn xác ngay cả trong bóng tối hoàn toàn'
    ],
    specs: {
      'Khuôn mặt': '3.000 khuôn mặt',
      'Vân tay & Thẻ': '4.000 vân tay + 10.000 thẻ cảm ứng',
      'Bộ nhớ sự kiện': '100.000 lượt chấm công',
      'Màn hình': 'Cảm ứng màu TFT 4.3 inch',
      'Pin dự phòng': 'Tích hợp sẵn 2.000 mAh',
      'Bảo hành': '12 tháng chính hãng ZKTeco'
    },
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
    description: 'Dòng máy chấm công đa sinh trắc học công suất lớn, độ bền vượt trội cho các khu công nghiệp, xí nghiệp đông nhân sự.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'att-rj-dg600',
    name: 'Máy Chấm Công Vân Tay Ronald Jack DG600 (Pin Lưu Điện)',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'Ronald Jack',
    price: 2350000,
    originalPrice: 2800000,
    highlights: [
      'Trang bị pin lưu điện tích hợp sẵn 8 giờ, không lo mất điện',
      'Bộ nhớ 1.000 vân tay & 1.000 thẻ cảm ứng, phù hợp văn phòng vừa và nhỏ',
      'Xuất báo cáo chấm công trực tiếp ra USB hoặc qua mạng LAN cực nhanh'
    ],
    specs: {
      'Dung lượng': '1.000 dấu vân tay + 1.000 thẻ',
      'Dung lượng chấm công': '80.000 lần',
      'Pin lưu điện': 'Hoạt động liên tục 6 - 8 tiếng',
      'Giao tiếp': 'TCP/IP (mạng LAN), USB',
      'Âm thanh': 'Giọng nói tiếng Việt thông báo giờ vào/ra',
      'Tặng kèm': 'Phần mềm chấm công tiếng Việt bản quyền trọn đời'
    },
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    description: 'Mẫu máy chấm công giá rẻ bán chạy hàng đầu với pin sạc dự phòng tích hợp, bảo toàn dữ liệu chấm công khi mất điện đột ngột.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'att-gigata-t8',
    name: 'Máy Chấm Công Kiểm Soát Cửa Ra Vào Gigata T8',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'Gigata',
    price: 3200000,
    originalPrice: 3800000,
    highlights: [
      'Tích hợp chức năng kiểm soát cửa Access Control (kết nối khóa từ/nam châm)',
      'Chip xử lý Intel Mỹ nhận dạng vân tay siêu nhạy dưới 0.5s',
      'Có chuông báo giờ vào - tan ca và chế độ hẹn giờ bật tắt máy tự động'
    ],
    specs: {
      'Dung lượng': '1.000 vân tay + 1.000 thẻ cảm ứng',
      'Bộ nhớ': '80.000 lượt chấm công',
      'Cổng Access Control': 'Rơ-le kết nối khóa từ chốt thả, nút Exit',
      'Màn hình': '2.8 inch Color TFT',
      'Cổng kết nối': 'TCP/IP, USB'
    },
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    description: 'Thiết bị chấm công kết hợp khóa kiểm soát an ninh cửa ra vào, bảo mật chuyên nghiệp cho tòa nhà văn phòng và phòng server.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'att-zk-senseface2a',
    name: 'Máy Chấm Công Nhận Diện Khuôn Mặt ZKTeco SenseFace 2A',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'ZKTeco',
    price: 4950000,
    originalPrice: 5800000,
    highlights: [
      'Công nghệ Visible Light nhận diện khoảng cách xa 0.3 - 2m không cần đứng sát',
      'Thuật toán AI phát hiện người thật, chống gian lận bằng hình ảnh/video',
      'Hỗ trợ chấm công qua ứng dụng Cloud ZKTeco BioTime'
    ],
    specs: {
      'Khuôn mặt': '1.500 khuôn mặt Visible Light',
      'Vân tay & Thẻ': '2.000 vân tay + 2.000 thẻ',
      'Giao tiếp': 'TCP/IP, Wifi băng tần kép, USB',
      'Camera': 'Dual 2MP Starlight Sensor góc rộng',
      'Bảo hành': 'Chính hãng 12 tháng'
    },
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
    description: 'Dòng máy chấm công Visible Light AI hiện đại nhất của ZKTeco, nhận diện không chạm cực nhanh ngay khi bước qua cửa.',
    isPopular: true,
    isFeatured: true
  },

  // ==========================================
  // 2. MÁY IN HÓA ĐƠN / IN BILL (5 SẢN PHẨM NỔI BẬT)
  // ==========================================
  {
    id: 'prn-xp-n160ii',
    name: 'Máy In Hóa Đơn Xprinter XP-N160II Khổ K80 Tự Động Cắt',
    category: 'printer',
    categoryLabel: 'Máy In Hóa Đơn, Máy In Bill',
    brand: 'Xprinter',
    price: 1150000,
    originalPrice: 1450000,
    highlights: [
      'Dao cắt giấy tự động cực bền, tuổi thọ dao cắt hơn 1.5 triệu lần',
      'Tốc độ in nhanh 160mm/s, chữ in nhiệt rõ nét, không dùng mực',
      'Thiết kế nhỏ gọn, nắp mở rộng thay giấy cuộn K80 cực kỳ thuận tiện'
    ],
    specs: {
      'Khổ giấy': 'K80 (80mm)',
      'Tốc độ in': '160mm/giây',
      'Cổng giao tiếp': 'USB 2.0',
      'Độ bền đầu in': '100 km giấy in',
      'Chức năng cắt giấy': 'Tự động (Auto-Cutter)',
      'Hỗ trợ hệ điều hành': 'Windows 7/10/11, POSBox, Android'
    },
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80',
    description: 'Máy in bill nhiệt K80 quốc dân cho các cửa hàng thời trang, tiệm tạp hóa, trà sữa với chi phí đầu tư tiết kiệm và độ ổn định cao.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'prn-xp-q80c',
    name: 'Máy In Bill Bếp Xprinter XP-Q80C Cổng LAN + USB',
    category: 'printer',
    categoryLabel: 'Máy In Hóa Đơn, Máy In Bill',
    brand: 'Xprinter',
    price: 1550000,
    originalPrice: 1900000,
    highlights: [
      'Trang bị cổng mạng LAN Ethernet in bill bếp nhà hàng qua Wifi từ điện thoại, iPad',
      'Có còi báo âm thanh và đèn chớp khi có bill mới, tránh trễ đơn order của khách',
      'Vỏ máy kháng dầu mỡ, ẩm mốc khu vực quầy bếp bar'
    ],
    specs: {
      'Khổ giấy': 'K80 (80mm)',
      'Cổng giao tiếp': 'LAN (RJ45) + USB',
      'Tốc độ in': '200mm/giây',
      'Tính năng đặc biệt': 'Còi âm thanh Beep báo bill & Đèn LED',
      'Cổng két đựng tiền': 'RJ11 (12V/24V mở tự động)'
    },
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=600&q=80',
    description: 'Chuyên dụng in bill order bếp, nhà hàng quán ăn, kết nối mạng LAN chia sẻ in cùng lúc từ nhiều máy tính và thiết bị order cầm tay.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'prn-bix-srp330',
    name: 'Máy In Hóa Đơn Bixolon SRP-330II (Made In Korea)',
    category: 'printer',
    categoryLabel: 'Máy In Hóa Đơn, Máy In Bill',
    brand: 'Bixolon',
    price: 3600000,
    originalPrice: 4200000,
    highlights: [
      'Sản xuất nguyên chiếc tại Hàn Quốc theo tiêu chuẩn công nghiệp Samsung Bixolon',
      'Tốc độ in khủng 220mm/s với cơ cấu bánh răng kim loại siêu bền bỉ',
      'Tiết kiệm giấy in lên đến 20% nhờ cơ chế in sát lề thông minh'
    ],
    specs: {
      'Xuất xứ': 'Hàn Quốc (Korea)',
      'Khổ giấy': 'K80 / K58 tùy chọn',
      'Tốc độ in': '220mm/giây',
      'Cổng kết nối': 'USB + Serial (hoặc LAN tùy option)',
      'Độ bền đầu in': '150 km',
      'Tuổi thọ dao cắt': '1.8 triệu lần cắt'
    },
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80',
    description: 'Dòng máy in hóa đơn siêu bền đến từ thương hiệu Hàn Quốc, vận hành liên tục 24/7 không kẹt giấy cho các chuỗi siêu thị lớn.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'prn-ep-t82iii',
    name: 'Máy In Hóa Đơn Siêu Thị Epson TM-T82III Chính Hãng',
    category: 'printer',
    categoryLabel: 'Máy In Hóa Đơn, Máy In Bill',
    brand: 'Epson',
    price: 3950000,
    originalPrice: 4600000,
    highlights: [
      'Công nghệ đầu in độc quyền của Seiko Epson Nhật Bản cho tuổi thọ trên 10 năm',
      'Tốc độ in 250mm/giây siêu tốc, không gây tiếng ồn khó chịu',
      'Bảo hành chính hãng 24 tháng toàn quốc'
    ],
    specs: {
      'Thương hiệu': 'Epson (Nhật Bản)',
      'Tốc độ in': '250mm/giây',
      'Khổ giấy': 'K80 (80mm)',
      'Độ phân giải': '203 dpi',
      'Kết nối': 'USB + RS232 (hoặc USB + LAN)',
      'Bảo hành': '24 tháng chính hãng'
    },
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80',
    description: 'Lựa chọn hàng đầu cho các trung tâm thương mại, chuỗi bán lẻ VinMart, Circle K, bệnh viện và ngân hàng đòi hỏi độ ổn định tuyệt đối.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'prn-xp-p810',
    name: 'Máy In Hóa Đơn Di Động Bluetooth Xprinter XP-P810 Khổ K80',
    category: 'printer',
    categoryLabel: 'Máy In Hóa Đơn, Máy In Bill',
    brand: 'Xprinter',
    price: 2150000,
    originalPrice: 2600000,
    highlights: [
      'Kết nối Bluetooth không dây in bill trực tiếp từ điện thoại Android và iPhone',
      'Pin sạc Lithium 2.000 mAh in liên tục hàng trăm hóa đơn mỗi lần sạc',
      'In bill giao hàng Grab, ShopeeFood, Baemin, tiền điện nước di động'
    ],
    specs: {
      'Khổ giấy': 'K80 (80mm) di động',
      'Kết nối': 'Bluetooth 4.0 + Cáp Type-C',
      'Dung lượng pin': '2.000 mAh Li-ion',
      'Tốc độ in': '70mm/giây',
      'Trọng lượng': 'Chỉ 350g, bỏ vừa túi áo hoặc bao da đeo thắt lưng'
    },
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=600&q=80',
    description: 'Máy in bill cầm tay không dây bluetooth khổ K80 gọn nhẹ, giải pháp in hóa đơn linh hoạt cho shipper, nhân viên thu cước tận nơi.',
    isPopular: true,
    isFeatured: true
  },

  // ==========================================
  // 3. MÁY QUÉT MÃ VẠCH (5 SẢN PHẨM NỔI BẬT)
  // ==========================================
  {
    id: 'scan-hw-1900g',
    name: 'Đầu Đọc Mã Vạch 2D Honeywell Xenon 1900GSR (Mỹ)',
    category: 'scanner',
    categoryLabel: 'Máy Quét Mã Vạch, Scanner Barcode',
    brand: 'Honeywell',
    price: 3450000,
    originalPrice: 4100000,
    highlights: [
      'Đọc xuất sắc mã QR căn cước công dân gắn chip (CCCD) và thẻ bảo hiểm y tế BHYT',
      'Cảm biến quang học Area Imager công nghệ ColorFusion tùy chỉnh của Honeywell',
      'Độ bền chuẩn IP41, rơi 50 lần từ độ cao 1.8m xuống nền bê tông vẫn hoạt động tốt'
    ],
    specs: {
      'Thương hiệu': 'Honeywell (Mỹ)',
      'Công nghệ': 'Area Image (838 x 640 pixel)',
      'Giải mã': 'Mọi mã 1D, 2D (QR Code, Data Matrix, PDF417)',
      'Kết nối': 'USB kèm cáp zin chính hãng',
      'Chân đế': 'Tùy chọn kèm chân đế rảnh tay tự động kích hoạt'
    },
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80',
    description: 'Dòng máy quét 2D y tế và hành chính công tiêu chuẩn của Honeywell, quét cực nhanh mã căn cước công dân và tem mã vạch siêu nhỏ.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'scan-zb-li4278',
    name: 'Máy Quét Mã Vạch Không Dây Zebra LI4278 Bluetooth',
    category: 'scanner',
    categoryLabel: 'Máy Quét Mã Vạch, Scanner Barcode',
    brand: 'Zebra',
    price: 5200000,
    originalPrice: 6200000,
    highlights: [
      'Khoảng cách quét không dây lên đến 100m tính từ chân đế sạc (Cradle)',
      'Pin dung lượng cao cho phép quét hơn 57.000 lần hoặc hoạt động liên tục 72 giờ',
      'Đọc mượt mà mã vạch hiển thị trên màn hình điện thoại di động và máy tính bảng'
    ],
    specs: {
      'Xuất xứ': 'Zebra (Mỹ)',
      'Chuẩn kết nối': 'Bluetooth v2.1 Class 1',
      'Tốc độ quét': '547 scan/giây',
      'Kháng va đập': 'Chịu rơi từ độ cao 1.8m',
      'Bảo hành': '24 tháng'
    },
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
    description: 'Máy quét không dây chuyên nghiệp cho kho bãi logistics, cho phép nhân viên tự do di chuyển kiểm kê hàng hóa trong phạm vi rộng.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'scan-dl-qd2430',
    name: 'Đầu Đọc Mã Vạch 2D Datalogic QuickScan QD2430 (Ý)',
    category: 'scanner',
    categoryLabel: 'Máy Quét Mã Vạch, Scanner Barcode',
    brand: 'Datalogic',
    price: 2750000,
    originalPrice: 3300000,
    highlights: [
      'Công nghệ điểm xanh Green Spot phản hồi xác nhận quét thành công độc quyền',
      'Đèn ngắm LED màu đỏ dịu mắt không gây chói cho thu ngân khi quét ca dài',
      'Đọc được mã vạch mờ, xước, in chất lượng kém trên bao bì nilon'
    ],
    specs: {
      'Xuất xứ': 'Datalogic (Ý)',
      'Góc quét': 'Đa hướng Omni-directional',
      'Kháng nước/bụi': 'Chuẩn IP42',
      'Chuẩn giao tiếp': 'USB',
      'Đi kèm': 'Chân đế uốn dẻo để bàn thông minh'
    },
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80',
    description: 'Thương hiệu cao cấp từ nước Ý với độ chính xác tuyệt đối, đèn ngắm êm dịu bảo vệ mắt người vận hành tại quầy thu ngân.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'scan-sl-xl6200',
    name: 'Máy Quét Đa Tia Để Bàn Siêu Thị Sunlux XL-6200A',
    category: 'scanner',
    categoryLabel: 'Máy Quét Mã Vạch, Scanner Barcode',
    brand: 'Sunlux',
    price: 2350000,
    originalPrice: 2900000,
    highlights: [
      '20 tia laser quét đa hướng 360 độ, không cần căn chỉnh góc mã vạch',
      'Tốc độ quét cực nhanh 1.500 dòng/giây giải tỏa ùn tắc quầy thu ngân giờ cao điểm',
      'Thiết kế để bàn vững chãi, khớp gập xoay điều chỉnh góc nghiêng linh hoạt'
    ],
    specs: {
      'Tia quét': '20 tia Laser 5 hướng quét',
      'Tốc độ quét': '1.500 scans/giây',
      'Khoảng cách đọc': '0 - 220mm',
      'Chế độ': 'Tự động quét khi có hàng hóa đi qua mắt cảm ứng',
      'Cổng cắm': 'USB cắm là nhận ngay'
    },
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
    description: 'Máy quét đa tia để bàn rảnh tay tối ưu cho siêu thị mini, cửa hàng bách hóa, cho phép thu ngân chỉ cần lướt sản phẩm qua để tính tiền.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'scan-nt-w6',
    name: 'Máy Quét Mã Vạch Đeo Ngón Tay Ring Barcode Netum W6',
    category: 'scanner',
    categoryLabel: 'Máy Quét Mã Vạch, Scanner Barcode',
    brand: 'Netum',
    price: 1850000,
    originalPrice: 2300000,
    highlights: [
      'Thiết kế đeo vào ngón tay xoay 330 độ, giải phóng đôi bàn tay để bốc dỡ hàng',
      'Kết nối đa năng 3 trong 1: Bluetooth, Wireless 2.4G và cáp sạc Type-C',
      'Đọc mượt mà cả mã 1D và 2D QR Code trên thùng carton'
    ],
    specs: {
      'Kiểu dáng': 'Ring Barcode Scanner (Đeo nhẫn ngón tay)',
      'Trọng lượng': 'Chỉ 35g siêu nhẹ',
      'Pin tích hợp': '450 mAh dùng liên tục 8 tiếng',
      'Khả năng đọc': '1D & 2D QR Code, Data Matrix',
      'Tương thích': 'Điện thoại Android, iOS, Máy tính Windows'
    },
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80',
    description: 'Thiết bị quét mã đeo tay thông minh chuyên cho nhân viên lấy hàng kho hàng Shopee, Lazada, Tiki bốc dỡ và đóng gói cực nhanh.',
    isPopular: true,
    isFeatured: true
  },

  // ==========================================
  // 4. MÁY IN MÃ VẠCH / TEM NHÃN (5 SẢN PHẨM NỔI BẬT)
  // ==========================================
  {
    id: 'lbl-godex-ez120',
    name: 'Máy In Mã Vạch Godex EZ120 (Chuyển Nhiệt Ribbon 300m)',
    category: 'label',
    categoryLabel: 'Máy in mã vạch | In tem nhãn',
    brand: 'Godex',
    price: 3650000,
    originalPrice: 4300000,
    highlights: [
      'Chứa được cuộn ruy băng mực Ribbon chuẩn 300 mét tiết kiệm chi phí in',
      'Công nghệ truyền nhiệt gián tiếp in tem decal xi bạc, tem PVC không phai màu',
      'Tặng kèm phần mềm thiết kế tem nhãn bản quyền GoLabel chuyên nghiệp'
    ],
    specs: {
      'Độ phân giải': '203 dpi',
      'Phương thức in': 'Truyền nhiệt gián tiếp & Nhiệt trực tiếp',
      'Khổ in tối đa': '108 mm',
      'Chiều dài ruy băng': '300 mét (Lõi 1 inch)',
      'Tốc độ in': '102 mm/giây (4 ips)',
      'Kết nối': 'USB 2.0 tốc độ cao'
    },
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=600&q=80',
    description: 'Máy in tem nhãn chuyển nhiệt công nghiệp nhỏ được tin dùng nhất, in tem vàng bạc trang sức, tem bảo hành, tem phụ hàng nhập khẩu.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'lbl-tsc-te200',
    name: 'Máy In Tem Nhãn Chuyển Nhiệt TSC TE200 Động Cơ Kép',
    category: 'label',
    categoryLabel: 'Máy in mã vạch | In tem nhãn',
    brand: 'TSC',
    price: 3950000,
    originalPrice: 4700000,
    highlights: [
      'Cơ chế động cơ kép bánh răng siêu khỏe vận hành êm ái, giảm ma sát tối đa',
      'Tốc độ in nhanh 152.4 mm/s (6 inch/giây) vượt trội so với các đối thủ cùng phân khúc',
      'Bộ vi xử lý 400 MHz 32-bit RISC xử lý file in tem phức tạp nhanh chóng'
    ],
    specs: {
      'Tốc độ in': '152.4 mm/giây (6 ips)',
      'Độ phân giải': '203 dpi',
      'Bộ nhớ': '16 MB SDRAM, 8 MB Flash',
      'Ruy băng mực': 'Cuộn 300m (Wax, Wax/Resin, Resin)',
      'Phần mềm': 'BarTender UltraLite kèm theo máy'
    },
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
    description: 'Dòng máy in tem Đài Loan nổi tiếng với động cơ bền bỉ số 1, in sắc nét mọi kích thước tem mã vạch siêu thị và tem phụ dán chai lọ.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'lbl-zb-zd220',
    name: 'Máy In Mã Vạch Zebra ZD220T Chính Hãng Zebra USA',
    category: 'label',
    categoryLabel: 'Máy in mã vạch | In tem nhãn',
    brand: 'Zebra',
    price: 4350000,
    originalPrice: 5100000,
    highlights: [
      'Thương hiệu Zebra (Mỹ) đẳng cấp hàng đầu thế giới về thiết bị mã vạch',
      'Kết cấu vỏ sò hai lớp OpenACCESS chắc chắn, dễ dàng thay giấy mực',
      'Đạt chứng nhận Energy Star tiết kiệm điện năng tiêu thụ'
    ],
    specs: {
      'Hãng sản xuất': 'Zebra Technologies (Mỹ)',
      'Độ phân giải': '203 dpi (8 dots/mm)',
      'Tốc độ in': '102 mm/giây (4 ips)',
      'Chiều dài ribbon': '74 mét',
      'Bộ nhớ': '256 MB Flash, 128 MB SDRAM',
      'Bảo hành': '12 tháng chính hãng'
    },
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=600&q=80',
    description: 'Máy in tem cao cấp từ thương hiệu Zebra Hoa Kỳ, hoạt động ổn định quanh năm, đầu in chịu nhiệt siêu bền.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'lbl-xp-tt426b',
    name: 'Máy In Tem Nhãn 2 Chế Độ Xprinter XP-TT426B (Nhiệt & Mực)',
    category: 'label',
    categoryLabel: 'Máy in mã vạch | In tem nhãn',
    brand: 'Xprinter',
    price: 2950000,
    originalPrice: 3600000,
    highlights: [
      'In được cả giấy Decal nhiệt trực tiếp lẫn Decal thường dùng ruy băng Ribbon',
      'Cảm biến kép Transmission & Reflective tự căn chỉnh mọi loại bế tem nhãn',
      'Giá thành cực tốt, độ bền cao phù hợp với xưởng may mặc và shop online'
    ],
    specs: {
      'Độ phân giải': '203 dpi',
      'Tốc độ in': '127 mm/giây',
      'Khổ rộng in': '108 mm',
      'Chiều dài Ribbon': '300m chuẩn công nghiệp',
      'Kết nối': 'USB'
    },
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
    description: 'Máy in mã vạch đa năng 2 trong 1 linh hoạt chuyển đổi giữa in nhiệt không dùng mực và in qua cuộn than mực chuyên nghiệp.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'lbl-bix-sldl410',
    name: 'Máy In Tem Nhãn Bixolon SLP-DX410 (Hàn Quốc)',
    category: 'label',
    categoryLabel: 'Máy in mã vạch | In tem nhãn',
    brand: 'Bixolon',
    price: 4850000,
    originalPrice: 5700000,
    highlights: [
      'Sản xuất tại Hàn Quốc, tốc độ in cực khủng lên đến 178 mm/s (7 ips)',
      'Tự động nhận diện và căn chỉnh khổ tem thông minh Smart Media Detection',
      'Tích hợp cảm biến mở nắp máy và cảm biến nhiệt độ đầu in bảo vệ máy'
    ],
    specs: {
      'Xuất xứ': 'Made in Korea',
      'Tốc độ': '178 mm/giây (7 ips)',
      'Độ phân giải': '203 dpi (tùy chọn 300 dpi)',
      'Giao tiếp': 'USB + Serial + Ethernet',
      'Phần mềm': 'Label Artist bản quyền miễn phí'
    },
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=600&q=80',
    description: 'Thiết bị in tem nhãn chuẩn công nghiệp cao cấp từ Hàn Quốc, tốc độ nhanh nhất trong các dòng máy in tem để bàn.',
    isPopular: true,
    isFeatured: true
  },

  // ==========================================
  // 5. MÁY BÁN HÀNG CẢM ỨNG POS (5 SẢN PHẨM NỔI BẬT)
  // ==========================================
  {
    id: 'pos-sunmi-d2s',
    name: 'Máy Bán Hàng Cảm Ứng Sunmi D2s Combi (Tích Hợp Máy In)',
    category: 'pos',
    categoryLabel: 'Máy bán hàng cảm ứng POS',
    brand: 'Sunmi',
    price: 7900000,
    originalPrice: 9200000,
    highlights: [
      'Tất cả trong một: Màn hình cảm ứng 15.6 inch Full HD + Máy in bill K80 Seiko tích hợp',
      'Hệ điều hành Sunmi OS mượt mà, tối ưu cho KiotViet, Sapo, iPOS, CukCuk',
      'Thiết kế nguyên khối gọn gàng, tiết kiệm không gian quầy thu ngân tối đa'
    ],
    specs: {
      'Màn hình': '15.6 inch IPS FHD 1920x1080 cảm ứng điện dung đa điểm',
      'Máy in': 'Tích hợp sẵn máy in nhiệt K80 cắt giấy tự động tốc độ 250mm/s',
      'Hệ điều hành': 'Sunmi OS (Android 7.1/11)',
      'CPU': 'Cortex-A53 8 nhân 1.4GHz',
      'Bộ nhớ': 'RAM 2GB + ROM 8GB/16GB',
      'Kết nối': 'Wifi, Bluetooth, LAN, 4 cổng USB, cổng ngăn kéo đựng tiền RJ11'
    },
    image: 'https://images.unsplash.com/photo-1556742049-0a670f4a45a7?auto=format&fit=crop&w=600&q=80',
    description: 'Máy bán hàng All-in-One hiện đại hàng đầu cho quán cafe, trà sữa, nhà hàng, không cần mua thêm máy in bill cồng kềnh.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'pos-tyso-ts150',
    name: 'Máy POS Bán Hàng Cảm Ứng Tyso TS150 (Core i5 / 8GB / SSD)',
    category: 'pos',
    categoryLabel: 'Máy bán hàng cảm ứng POS',
    brand: 'Tyso',
    price: 9200000,
    originalPrice: 10800000,
    highlights: [
      'Cấu hình Intel Core i5 mạnh mẽ, RAM 8GB, SSD 128GB chạy Windows 10 Pro',
      'Màn hình cảm ứng điện dung 15 inch phẳng tràn viền chống nước, chống bụi bẩn',
      'Chân đế kim loại nguyên khối chống rung lắc khi chạm thao tác liên tục'
    ],
    specs: {
      'CPU': 'Intel Core i5 Turbo 3.2GHz',
      'RAM': '8GB DDR3L/DDR4',
      'Ổ cứng': 'SSD 128GB M.2 siêu tốc',
      'Màn hình': '15 inch LED LCD cảm ứng điện dung 10 điểm chạm',
      'Hệ điều hành': 'Windows 10 Pro 64-bit cài sẵn',
      'Cổng kết nối': '6 x USB, 1 x LAN Gigabit, 1 x VGA, 1 x HDMI, Audio'
    },
    image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=600&q=80',
    description: 'Máy POS cảm ứng chạy Windows chuyên nghiệp cho chuỗi siêu thị, shop bán lẻ với khả năng tương thích 100% mọi phần mềm kế toán bán hàng.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'pos-posbank-apexa',
    name: 'Máy POS Cảm Ứng Cao Cấp Posbank Apexag (Made In Korea)',
    category: 'pos',
    categoryLabel: 'Máy bán hàng cảm ứng POS',
    brand: 'Posbank',
    price: 13500000,
    originalPrice: 15500000,
    highlights: [
      'Thương hiệu POS số 1 Hàn Quốc, thiết kế thanh lịch đạt giải thưởng Red Dot Design',
      'Màn hình cảm ứng phẳng True-Flat công nghệ PCAP siêu nhạy, độ sáng 400 nits',
      'Hệ thống tản nhiệt thụ động không quạt (Fanless) hoạt động êm ái, chống bụi bẩn'
    ],
    specs: {
      'Xuất xứ': 'Hàn Quốc (Korea)',
      'CPU': 'Intel Celeron J1900 / Core i3 thế hệ mới',
      'Màn hình': '15 inch Bezel-Free True-Flat PCAP Touch',
      'RAM & SSD': '4GB RAM / 128GB SSD công nghiệp',
      'Độ bền': 'Chuẩn công nghiệp chịu nhiệt độ cao và độ ẩm cao',
      'Bảo hành': '24 tháng đổi mới linh kiện'
    },
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=600&q=80',
    description: 'Biểu tượng sang trọng cho các nhà hàng Fine Dining, khách sạn 5 sao và chuỗi cafe danh tiếng với độ bền chuẩn quốc tế.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'pos-sunmi-v2pro',
    name: 'Máy POS Cầm Tay Thông Minh Sunmi V2 Pro (Quét Mã 2D, In Bill)',
    category: 'pos',
    categoryLabel: 'Máy bán hàng cảm ứng POS',
    brand: 'Sunmi',
    price: 4950000,
    originalPrice: 5800000,
    highlights: [
      'Thiết bị bán hàng cầm tay bỏ túi, tích hợp sẵn máy in bill nhiệt 58mm Seiko',
      'Mắt đọc mã vạch 2D chuyên nghiệp quét nhanh mã thanh toán VNPay, MoMo, ZaloPay',
      'Hỗ trợ lắp sim 4G LTE và Wifi băng tần kép, pin trâu dùng cả ngày'
    ],
    specs: {
      'Màn hình': '5.99 inch HD+ IPS cảm ứng',
      'Máy in tích hợp': 'Khổ giấy 58mm, tốc độ 70mm/s',
      'Đầu đọc mã': 'Đầu đọc mã vạch 2D chuyên dụng',
      'Pin': '2.580 mAh sạc nhanh Type-C',
      'Kết nối': '4G, Wifi kép 2.4G/5G, Bluetooth 4.2, GPS',
      'Trọng lượng': 'Chỉ 356g'
    },
    image: 'https://images.unsplash.com/photo-1556742049-0a670f4a45a7?auto=format&fit=crop&w=600&q=80',
    description: 'Máy order tính tiền di động tối ưu cho nhân viên phục vụ tận bàn, bán hàng lưu động, hội chợ, nhận đơn GrabFood/ShopeeFood tức thì.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'pos-dual-ts152',
    name: 'Bộ Máy POS 2 Màn Hình Cảm Ứng Dual Screen POS-1520',
    category: 'pos',
    categoryLabel: 'Máy bán hàng cảm ứng POS',
    brand: 'Tyso',
    price: 11800000,
    originalPrice: 13900000,
    highlights: [
      '2 Màn hình độc lập: Màn chính 15.6" cảm ứng cho thu ngân + Màn phụ 11.6" hiển thị hóa đơn & quảng cáo cho khách',
      'Cấu hình Core i5, RAM 8GB, SSD 256GB xử lý mượt mà lượng đơn hàng lớn',
      'Nâng cao tính chuyên nghiệp và minh bạch hóa đơn thanh toán cho khách hàng'
    ],
    specs: {
      'Màn hình chính': '15.6 inch Full HD (1920x1080) Cảm ứng điện dung',
      'Màn hình phụ': '11.6 inch LCD hiển thị giá tiền & banner quảng cáo',
      'CPU': 'Intel Core i5 thế hệ mới',
      'RAM / Ổ cứng': '8GB RAM / 256GB SSD',
      'Vỏ máy': 'Hợp kim nhôm đúc sang trọng, tản nhiệt tốt'
    },
    image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=600&q=80',
    description: 'Giải pháp bán hàng 2 màn hình cao cấp, màn hình phụ cho khách quan sát trực quan đơn hàng và xem video/hình ảnh khuyến mãi.',
    isPopular: true,
    isFeatured: true
  },

  // ==========================================
  // 6. KÉT THU NGÂN / HỘP ĐỰNG TIỀN (4 SẢN PHẨM NỔI BẬT)
  // ==========================================
  {
    id: 'draw-mk-410',
    name: 'Hộp Đựng Tiền Thu Ngân Maken MK-410 (5 Ngăn Kẹp Tiền)',
    category: 'drawer',
    categoryLabel: 'Hộp Đựng Tiền Cash',
    brand: 'Maken',
    price: 1150000,
    originalPrice: 1400000,
    highlights: [
      'Khung thép dày dặn dập nổi chịu lực lớn, chịu được sức nặng đặt máy POS lên trên',
      '5 ngăn kẹp tiền giấy polyme + 4 ngăn tiền xu/tiền lẻ tiện dụng',
      'Tự động bật mở khi in bill thanh toán qua cổng RJ11 kết nối máy in hóa đơn'
    ],
    specs: {
      'Kích thước': '410 (W) x 420 (D) x 100 (H) mm',
      'Ngăn tiền': '5 ngăn kẹp tiền giấy có kẹp sắt lò xo + 4 ngăn tiền xu tháo rời',
      'Khóa két': '3 vị trí khóa (Khóa cứng, Mở tự động, Mở bằng chìa thủ công)',
      'Kết nối': 'RJ11 xung điện 12V/24V tương thích mọi máy in bill',
      'Độ bền': 'Hơn 1.000.000 lần mở'
    },
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    description: 'Két đựng tiền quầy thu ngân tiêu chuẩn 5 ngăn kẹp sắt lò xo chắc chắn, chống trộm tiền và chống thất thoát doanh thu hiệu quả.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'draw-ant-mk330',
    name: 'Két Đựng Tiền Nhỏ Gọn Antech MK330 (4 Ngăn Tiền Giấy)',
    category: 'drawer',
    categoryLabel: 'Hộp Đựng Tiền Cash',
    brand: 'Antech',
    price: 850000,
    originalPrice: 1100000,
    highlights: [
      'Kích thước mini siêu gọn 33cm x 36cm, phù hợp với quầy bar nhỏ hẹp hoặc kiot',
      '4 ngăn kẹp tiền giấy polyme thẳng thớm + khay tiền xu/voucher bên dưới',
      'Sơn tĩnh điện chống gỉ sét, sang trọng với tông màu đen nhám'
    ],
    specs: {
      'Kích thước': '330 x 360 x 90 mm',
      'Số ngăn': '4 ngăn kẹp tiền giấy + 5 ô chứa tiền mệnh giá nhỏ',
      'Cổng giao tiếp': 'RJ11 cắm máy in bill kích mở tự động',
      'Chìa khóa': '2 chìa khóa cơ dự phòng an toàn'
    },
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
    description: 'Két tiền thu ngân mini kích thước nhỏ gọn nhất, giải pháp hoàn hảo cho các quầy thu ngân diện tích khiêm tốn.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'draw-rotech-rt350',
    name: 'Ngăn Kéo Đựng Tiền Thu Ngân RoTech RT350',
    category: 'drawer',
    categoryLabel: 'Hộp Đựng Tiền Cash',
    brand: 'RoTech',
    price: 990000,
    originalPrice: 1250000,
    highlights: [
      'Ray trượt bạc đạn kim loại êm ái, kéo đẩy nhẹ nhàng không phát ra tiếng ồn',
      'Kẹp sắt giữ tiền mạ crom sáng bóng, lực kẹp mạnh giữ tiền phẳng phiu',
      'Có khe thả séc, hóa đơn phía trước mà không cần mở ngăn kéo'
    ],
    specs: {
      'Kích thước': '350 x 405 x 90 mm',
      'Cấu trúc': 'Thép cán nguội SPCC chất lượng cao',
      'Số ngăn': '4 ngăn kẹp tiền giấy + 4 ngăn chia linh hoạt',
      'Bảo hành': '12 tháng chính hãng'
    },
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    description: 'Ngăn kéo đựng tiền thu ngân cao cấp với thanh trượt bi êm ái, độ bền vượt trội trên 1 triệu lượt đóng mở.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'draw-maken-ek350',
    name: 'Két Thu Ngân Mở Nắp Lên Flip-Top Maken EK-350',
    category: 'drawer',
    categoryLabel: 'Hộp Đựng Tiền Cash',
    brand: 'Maken',
    price: 1950000,
    originalPrice: 2400000,
    highlights: [
      'Thiết kế nắp mở bật lên trên (Flip-Top) chuyên dụng cho quầy bar, siêu thị',
      'Khay đựng tiền bên trong có nắp khóa riêng, có thể nhấc cả khay đi giao ban ca',
      'Nắp đậy bằng thép không gỉ sáng bóng, sang trọng và bền bỉ'
    ],
    specs: {
      'Kiểu dáng': 'Flip-Top mở nắp lật lên góc 80 độ',
      'Kích thước': '460 (W) x 170 (D) x 100 (H) mm',
      'Ngăn tiền': '6 - 8 ngăn tiền giấy đứng + 8 ngăn tiền xu',
      'Khóa khay phụ': 'Tích hợp nắp có chìa khóa riêng biệt khi đổi ca'
    },
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
    description: 'Két thu ngân dạng lật chuyên dụng cho các chuỗi siêu thị lớn (như Aeon, Lotte) và quầy bar nhà hàng cao cấp.',
    isPopular: true,
    isFeatured: true
  },

  // ==========================================
  // 7. GIẤY IN & DECAL TEM NHÃN (4 SẢN PHẨM NỔI BẬT)
  // ==========================================
  {
    id: 'con-k80x45-oji',
    name: 'Giấy In Nhiệt K80x45mm Oji Nhật Bản (Thùng 50 Cuộn Bọc Bạc)',
    category: 'consumable',
    categoryLabel: 'Giấy In Bill - Giấy In Decal Dán',
    brand: 'Oji Japan',
    price: 330000,
    originalPrice: 420000,
    highlights: [
      'Giấy cảm nhiệt thương hiệu Oji nhập khẩu nguyên liệu Nhật Bản cao cấp',
      'Bề mặt giấy láng mịn, trắng tinh khiết, in chữ cực đen và bền màu không hại đầu in',
      'Mỗi cuộn được bọc giấy bạc chống ẩm và dán tem niêm phong 2 đầu'
    ],
    specs: {
      'Quy cách': 'Khổ giấy 80mm, đường kính cuộn 45mm',
      'Đóng gói': 'Thùng 50 cuộn bọc giấy bạc',
      'Lõi giấy': 'Lõi nhựa hoặc lõi tổ ong siêu nhỏ giúp dài giấy hơn',
      'Tương thích': 'Mọi dòng máy in hóa đơn nhiệt khổ K80 (Xprinter, Epson, Bixolon...)'
    },
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80',
    description: 'Giấy in bill nhiệt K80x45mm chuẩn Oji Nhật Bản, bảo vệ tối đa tuổi thọ đầu in máy in hóa đơn, lưu trữ hóa đơn rõ nét.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'con-k57x38-oji',
    name: 'Giấy In Bill K57x38mm Oji Japan (Thùng 100 Cuộn POS Di Động)',
    category: 'consumable',
    categoryLabel: 'Giấy In Bill - Giấy In Decal Dán',
    brand: 'Oji Japan',
    price: 380000,
    originalPrice: 480000,
    highlights: [
      'Khổ K57 đường kính 38mm chuyên dụng cho máy POS quẹt thẻ ngân hàng, máy POS Sunmi',
      'Độ nhạy nhiệt cao, không tạo bụi giấy làm mờ mắt đọc và đầu in',
      'Thùng 100 cuộn bọc màng co bảo quản đến 3 năm trong điều kiện thoáng mát'
    ],
    specs: {
      'Khổ giấy': '57mm, đường kính 38mm',
      'Quy cách': 'Thùng 100 cuộn',
      'Bảo quản': 'Bọc màng co nilon bảo vệ chống ẩm mốc',
      'Ứng dụng': 'Máy POS ngân hàng, máy in di động Bluetooth, máy in bill K58'
    },
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=600&q=80',
    description: 'Giấy in hóa đơn K57 mini cho máy quẹt thẻ POS cầm tay, máy in hóa đơn taxi và máy đo nồng độ cồn.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'con-decal-75x100',
    name: 'Decal Nhiệt 75x100mm In Vận Đơn Shopee, GHTK, Viettel Post (500 Tem)',
    category: 'consumable',
    categoryLabel: 'Giấy In Bill - Giấy In Decal Dán',
    brand: 'Fasson',
    price: 55000,
    originalPrice: 75000,
    highlights: [
      'Kích thước chuẩn 75x100mm chuyên in phiếu gửi hàng GHTK, Viettel Post, Ninja Van',
      'Decal nhiệt trực tiếp có sẵn keo dán siêu dính, chỉ cần bóc dán ngay lên thùng hàng',
      'Chống nước, chống dầu mỡ và chống cọ xát trong quá trình vận chuyển bưu kiện'
    ],
    specs: {
      'Kích thước tem': '75 x 100 mm (1 tem/hàng)',
      'Số lượng tem': '500 tem / cuộn',
      'Chất liệu': 'Decal cảm nhiệt 3 lớp chống bay chữ',
      'Tương thích': 'Máy in tem khổ A6, Xprinter XP-420B, XP-470B, HPRT...'
    },
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80',
    description: 'Cuộn decal in tem vận đơn thương mại điện tử chuyên nghiệp, dán dính chắc chắn trên mọi bề mặt túi bóng và thùng carton.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'con-decal-50x30',
    name: 'Decal Nhiệt Trà Sữa 50x30mm Chống Nước Lạnh (Cuộn 800 Tem)',
    category: 'consumable',
    categoryLabel: 'Giấy In Bill - Giấy In Decal Dán',
    brand: 'Fasson',
    price: 32000,
    originalPrice: 45000,
    highlights: [
      'Kích thước chuẩn 50x30mm chuyên in tem dán cốc trà sữa, cà phê, dán giá sản phẩm',
      'Keo acrylic chịu nhiệt độ lạnh tốt, không bị bong tróc khi ngâm nước đá lạnh',
      'Đường răng cưa đục lỗ xé tem tiện lợi giữa từng nhãn'
    ],
    specs: {
      'Kích thước tem': '50 x 30 mm',
      'Số lượng tem': '800 tem / cuộn',
      'Chất liệu': 'Decal nhiệt mặt bóng chống ngấm nước',
      'Tương thích máy': 'Xprinter XP-350B, XP-365B, APOS 350...'
    },
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=600&q=80',
    description: 'Decal nhiệt in tem nhãn cốc trà sữa, thông tin topping và đường đá, keo dính chịu nước đá lạnh không bị bong tróc.',
    isPopular: true,
    isFeatured: true
  },

  // ==========================================
  // 8. CAMERA AN NINH & GIÁM SÁT (4 SẢN PHẨM NỔI BẬT)
  // ==========================================
  {
    id: 'cam-ez-c6n',
    name: 'Camera Wifi Thông Minh Trong Nhà Ezviz C6N 2K+ (Xoay 360 Độ)',
    category: 'camera',
    categoryLabel: 'Camera Giám Sát & An Ninh',
    brand: 'Ezviz',
    price: 650000,
    originalPrice: 890000,
    highlights: [
      'Độ phân giải 2K+ (4 Megapixel) siêu nét, góc nhìn bao quát toàn bộ gian phòng',
      'Tự động xoay theo chuyển động của người (Smart Tracking) thông minh',
      'Đàm thoại âm thanh 2 chiều to rõ, loa chống hú cực tốt'
    ],
    specs: {
      'Độ phân giải': '4.0 MP (2560 x 1440)',
      'Góc quay quét': 'Ngang 340°, Dọc 55° bao quát 360°',
      'Tầm nhìn ban đêm': 'Hồng ngoại 10 mét Smart IR',
      'Lưu trữ': 'Khe cắm thẻ nhớ MicroSD lên đến 256GB hoặc Ezviz Cloud',
      'Tính năng AI': 'Nhận diện người, cảnh báo rung điện thoại'
    },
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80',
    description: 'Camera quan sát cửa hàng và gia đình bán chạy số 1, cài đặt nhanh chóng qua App điện thoại trong 2 phút.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'cam-hik-colorvu',
    name: 'Camera Giám Sát Ban Đêm Có Màu Hikvision ColorVu 2MP',
    category: 'camera',
    categoryLabel: 'Camera Giám Sát & An Ninh',
    brand: 'Hikvision',
    price: 1150000,
    originalPrice: 1450000,
    highlights: [
      'Công nghệ ColorVu cho hình ảnh có màu sắc sống động 24/7 kể cả trong đêm tối',
      'Khẩu độ siêu lớn F1.0 thu sáng gấp 4 lần camera thông thường',
      'Vỏ kim loại nguyên khối đạt chuẩn kháng nước chống bụi IP67 lắp ngoài trời'
    ],
    specs: {
      'Độ phân giải': '2MP Full HD (1920 x 1080)',
      'Ống kính': 'Khẩu độ F1.0 cho hình ảnh có màu ban đêm',
      'Đèn trợ sáng': 'Ánh sáng trắng tầm xa 20m êm dịu',
      'Tiêu chuẩn ngoài trời': 'IP67 chịu nắng mưa bão gió',
      'Bảo hành': '24 tháng chính hãng Hikvision'
    },
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80',
    description: 'Camera an ninh ngoài trời thế hệ mới của Hikvision, giám sát rõ mặt và biển số xe ban đêm với màu sắc chân thực.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'cam-imou-cruiser',
    name: 'Camera Wifi Ngoài Trời Imou Cruiser 2 3K (Còi & Đèn Báo Động)',
    category: 'camera',
    categoryLabel: 'Camera Giám Sát & An Ninh',
    brand: 'Imou',
    price: 1390000,
    originalPrice: 1750000,
    highlights: [
      'Độ nét 3K (5 Megapixel) sắc sảo đến từng chi tiết nhỏ nhất',
      'Tích hợp còi hú 110dB và đèn chớp xanh đỏ xua đuổi kẻ đột nhập ngay lập tức',
      'Xoay 360 độ ngoài trời chống nước IP66 với 4 chế độ nhìn đêm thông minh'
    ],
    specs: {
      'Cảm biến': '5.0 Megapixel (3K)',
      'Báo động': 'Còi hú 110dB + Đèn chớp Spotlight',
      'Chống nước': 'IP66 chống chọi mưa bão',
      'Wifi': 'Wifi 6 với 2 ăng-ten ngầm bắt sóng siêu xa',
      'AI': 'Nhận diện người & phương tiện giao thông chính xác'
    },
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80',
    description: 'Camera ngoài trời đa năng bảo vệ an ninh toàn diện cho nhà xưởng, bãi đỗ xe và sân vườn với còi báo động thông minh.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'cam-dahua-dh4k',
    name: 'Trọn Bộ Đầu Ghi Hình 4 Kênh Dahua Kèm 4 Mắt Camera Full HD',
    category: 'camera',
    categoryLabel: 'Camera Giám Sát & An Ninh',
    brand: 'Dahua',
    price: 4600000,
    originalPrice: 5800000,
    highlights: [
      'Trọn bộ gồm: 1 Đầu ghi Dahua 4 kênh + 4 Camera Dome/Thân Full HD + Ổ cứng 1TB',
      'Đường truyền tín hiệu có dây ổn định tuyệt đối, không lo rớt mạng hay giật lag',
      'Lưu trữ liên tục 20-30 ngày với công nghệ chuẩn nén H.265+ tiết kiệm dung lượng'
    ],
    specs: {
      'Đầu ghi hình': 'Dahua 4 kênh hỗ trợ 5 trong 1 (HDCVI/AHD/TVI/CVBS/IP)',
      'Camera': '4 mắt Dahua 2.0MP Full HD kim loại',
      'Ổ cứng đi kèm': 'Western Digital Purple 1TB chuyên dụng camera',
      'Nguồn & Phụ kiện': 'Bao gồm trọn bộ nguồn tổng và jack BNC cao cấp',
      'Bảo hành': '24 tháng tại công trình'
    },
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80',
    description: 'Combo camera chuyên dụng có dây độ tin cậy tuyệt đối cho nhà hàng, xưởng sản xuất, cửa hàng kinh doanh lớn.',
    isPopular: true,
    isFeatured: true
  },

  // ==========================================
  // 9. THIẾT BỊ MẠNG & WIFI ROUTER (4 SẢN PHẨM NỔI BẬT)
  // ==========================================
  {
    id: 'net-ruijie-rg1200',
    name: 'Bộ Phát Wifi Chuyên Dụng Ruijie Reyee RG-RAP1200(F) Ốp Trần',
    category: 'network',
    categoryLabel: 'Thiết Bị Mạng & Wifi Router',
    brand: 'Ruijie',
    price: 1550000,
    originalPrice: 1950000,
    highlights: [
      'Chịu tải thực tế lên đến 110 người dùng đồng thời không bị đơ giật mạng',
      'Chuẩn AC1300 băng tần kép Wave 2 MU-MIMO tốc độ cao',
      'Quản lý Cloud Ruijie miễn phí trọn đời qua điện thoại ở bất kỳ đâu'
    ],
    specs: {
      'Tốc độ': 'Băng tần 2.4GHz: 400Mbps, 5GHz: 867Mbps',
      'Số lượng kết nối': 'Khuyến nghị 110 thiết bị truy cập đồng thời',
      'Cấp nguồn': 'Hỗ trợ cấp nguồn PoE 802.3af tiện lợi qua dây mạng',
      'Lắp đặt': 'Ốp trần hoặc gắn tường thẩm mỹ',
      'Tính năng': 'Roaming sóng mượt mà khi di chuyển giữa các tầng'
    },
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
    description: 'Wifi chuyên dụng cho quán cafe, nhà hàng và văn phòng đông người truy cập, phát sóng ổn định không bao giờ nghẽn mạng.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'net-draytek-2927',
    name: 'Router Cân Bằng Tải Doanh Nghiệp DrayTek Vigor2927',
    category: 'network',
    categoryLabel: 'Thiết Bị Mạng & Wifi Router',
    brand: 'DrayTek',
    price: 4950000,
    originalPrice: 5800000,
    highlights: [
      '2 cổng WAN Gigabit chạy cân bằng tải nhiều đường truyền Internet cùng lúc',
      'Chịu tải mạnh mẽ từ 150 đến 200 người dùng liên tục với NAT Throughput 900 Mbps',
      'Tường lửa bảo mật cấp doanh nghiệp, quản lý băng thông theo từng phòng ban'
    ],
    specs: {
      'Cổng giao tiếp': '2 x WAN Gigabit + 5 x LAN Gigabit + 2 x USB (hỗ trợ modem 4G)',
      'Chịu tải': '150 - 200 máy tính/điện thoại',
      'VPN': '50 kênh VPN kết nối đa chi nhánh bảo mật cao',
      'Tường lửa': 'Lọc nội dung web, chống tấn công DoS/DDoS'
    },
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    description: 'Trái tim mạng cho công ty, nhà hàng tiệc cưới và khách sạn, tự động gộp băng thông và chuyển đổi dự phòng khi một đường mạng bị đứt.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'net-tplink-sg1016',
    name: 'Switch Chia Mạng 16 Cổng Gigabit TP-Link TL-SG1016D Vỏ Kim Loại',
    category: 'network',
    categoryLabel: 'Thiết Bị Mạng & Wifi Router',
    brand: 'TP-Link',
    price: 1150000,
    originalPrice: 1450000,
    highlights: [
      '16 cổng mạng RJ45 chuẩn tốc độ Gigabit 10/100/1000Mbps truyền dữ liệu siêu nhanh',
      'Vỏ thép kim loại chống nhiễu tản nhiệt cực tốt, thiết kế lắp tủ rack hoặc để bàn',
      'Công nghệ Green Ethernet tiết kiệm năng lượng điện lên đến 40%'
    ],
    specs: {
      'Số cổng': '16 cổng 10/100/1000 Mbps Auto-Negotiation',
      'Băng thông chuyển mạch': '32 Gbps',
      'Kiểu dáng': 'Vỏ sắt chuẩn công nghiệp tản nhiệt tự nhiên',
      'Cắm và chạy': 'Plug and Play không cần cài đặt cấu hình'
    },
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
    description: 'Switch mạng Gigabit 16 cổng tốc độ cao chia mạng cho máy POS, máy in, camera và máy tính trong văn phòng vận hành ổn định.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'net-unifi-u6pro',
    name: 'Bộ Phát Wifi 6 Chuyên Nghiệp Ubiquiti UniFi U6-Pro',
    category: 'network',
    categoryLabel: 'Thiết Bị Mạng & Wifi Router',
    brand: 'Ubiquiti UniFi',
    price: 4350000,
    originalPrice: 5200000,
    highlights: [
      'Công nghệ Wifi 6 mới nhất băng thông tổng hợp lên đến 5.3 Gbps',
      'Khả năng chịu tải cực đại trên 350 thiết bị kết nối cùng lúc',
      'Vỏ chống bụi nước nhẹ lắp đặt linh hoạt trong nhà và bán ngoài trời'
    ],
    specs: {
      'Chuẩn Wifi': 'Wifi 6 (802.11ax) với 4x4 MU-MIMO và OFDMA',
      'Tốc độ': '5GHz: 4.8 Gbps, 2.4GHz: 573.5 Mbps',
      'Kết nối đồng thời': '350+ client',
      'Hệ thống quản lý': 'UniFi Network Controller tập trung trực quan'
    },
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    description: 'Dòng Access Point Wifi 6 cao cấp từ hãng Ubiquiti của Mỹ, chuyên trị các sự kiện hội trường, resort và quán cafe đông khách.',
    isPopular: true,
    isFeatured: true
  },

  // ==========================================
  // 10. MÁY ĐẾM TIỀN TỰ ĐỘNG (4 SẢN PHẨM NỔI BẬT)
  // ==========================================
  {
    id: 'cnt-silicon-mc8800',
    name: 'Máy Đếm Tiền Cao Cấp Silicon MC-8800 (Phát Hiện Tiền Giả Polymer)',
    category: 'counter',
    categoryLabel: 'Máy Đếm Tiền Tự Động',
    brand: 'Silicon',
    price: 6850000,
    originalPrice: 7900000,
    highlights: [
      'Hệ thống mắt thần kiểm giả đa tầng hồng ngoại IR, từ tính MG và siêu âm US',
      'Tự động phân biệt mệnh giá tiền lẫn loại và phát hiện tiền rách, chắp vá tinh vi',
      'Màn hình hiển thị LED 2 mặt lớn cùng mặt số phụ kéo dài cho khách hàng quan sát'
    ],
    specs: {
      'Tốc độ đếm': '1.000 - 1.200 tờ/phút',
      'Khả năng phát hiện': 'Phát hiện tiền giả Polymer và ngoại tệ USD, EUR siêu chuẩn',
      'Chế độ đếm': 'Đếm lẫn loại, đếm cộng dồn, đếm chia mẻ định lượng',
      'Nâng cấp phần mềm': 'Cổng USB cập nhật phần mềm khi ngân hàng phát hành tiền mới'
    },
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
    description: 'Máy đếm tiền kiểm giả thông minh thương hiệu Silicon Mỹ, độ chính xác tuyệt đối, tránh tổn thất tài chính cho doanh nghiệp.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'cnt-xiudun-6688',
    name: 'Máy Đếm Tiền Băng Tải Dài Xiudun 6688W Chuyên Dụng Ngân Hàng',
    category: 'counter',
    categoryLabel: 'Máy Đếm Tiền Tự Động',
    brand: 'Xiudun',
    price: 7600000,
    originalPrice: 8900000,
    highlights: [
      'Thiết kế băng tải dài trải tiền giúp người đếm quan sát rõ ràng từng thếp tiền',
      'Hệ thống 2 đôi mắt màu kiểm tra hình chìm và kích thước tiền siêu chuẩn xác',
      'Khung máy hợp kim nguyên khối chống rung, chạy êm và không làm quăn góc tiền'
    ],
    specs: {
      'Kiểu dáng': 'Máy nằm băng tải dài chuyên dụng ngân hàng',
      'Tốc độ đếm': '8 giây / 100 tờ tiền',
      'Chức năng': 'Kiểm tra tiền giả, đếm ấn định số tờ, tự động kiểm tra lỗi máy',
      'Điện áp': '220V/50Hz'
    },
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=600&q=80',
    description: 'Dòng máy đếm tiền băng tải dài được tất cả các ngân hàng và tiệm vàng tin tưởng lựa chọn với độ bền bỉ suốt hàng chục năm.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'cnt-modul-1618',
    name: 'Máy Đếm Tiền Mini Để Bàn Modul 1618 Màn Hình LED Rõ Nét',
    category: 'counter',
    categoryLabel: 'Máy Đếm Tiền Tự Động',
    brand: 'Modul',
    price: 2450000,
    originalPrice: 2950000,
    highlights: [
      'Giá thành tiết kiệm, kích thước nhỏ gọn dễ dàng xách tay di chuyển',
      'Đếm nhanh chính xác các loại tiền Polymer, tiền Cotton và vé số, hóa đơn',
      'Tự động khởi động khi thả tiền vào và tự động dừng khi đếm xong'
    ],
    specs: {
      'Tốc độ đếm': '1.000 tờ/phút',
      'Chức năng': 'Đếm thông thường, đếm cộng dồn Total, tách mẻ Batch',
      'Màn hình': 'Màn hình hiển thị số LED đỏ sắc nét',
      'Phụ kiện': 'Kèm mặt số phụ kéo dài đặt trên quầy'
    },
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
    description: 'Máy đếm tiền giá rẻ nhỏ gọn cho shop thời trang, nhà hàng nhỏ có nhu cầu đếm kiểm số lượng tiền mặt nhanh chóng mỗi ngày.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'cnt-balion-nh8600',
    name: 'Máy Đếm Tiền Đa Năng Chống Kẹt Balion NH-8600',
    category: 'counter',
    categoryLabel: 'Máy Đếm Tiền Tự Động',
    brand: 'Balion',
    price: 5450000,
    originalPrice: 6500000,
    highlights: [
      'Công nghệ đệm cao su kép chống kẹt tiền và chống đếm dính 2 tờ cùng lúc',
      'Bộ cảm biến 3D đo độ dày và kiểm tra hình ảnh tiền giả polyme thế hệ mới',
      'Vận hành êm ái, độ ồn dưới 60dB không gây ảnh hưởng xung quanh'
    ],
    specs: {
      'Tốc độ': '1.100 tờ/phút',
      'Cảm biến': 'Cảm biến hồng ngoại kép, từ tính MG, tia cực tím UV',
      'Hiển thị': 'Màn hình LCD màu hiển thị chi tiết mệnh giá và tổng tiền',
      'Bảo hành': '18 tháng chính hãng'
    },
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=600&q=80',
    description: 'Máy đếm tiền kiểm giả chính hãng Balion với công nghệ chống dính kẹt tiền vượt trội, màn hình màu hiện tổng giá trị tiền sau đếm.',
    isPopular: true,
    isFeatured: true
  },

  // ==========================================
  // 11. BỘ ĐÀM & ĐIỆN THOẠI BÀN (3 SẢN PHẨM NỔI BẬT)
  // ==========================================
  {
    id: 'phn-moto-cp1300',
    name: 'Bộ Đàm Cầm Tay Chuyên Dụng Motorola CP-1300 (Cự Ly 1-3km)',
    category: 'phone',
    categoryLabel: 'Bộ Đàm & Điện Thoại Bàn',
    brand: 'Motorola',
    price: 1650000,
    originalPrice: 2100000,
    highlights: [
      'Thương hiệu bộ đàm số 1 thế giới Motorola, âm thanh lọc ồn đàm thoại trong trẻo',
      'Công suất phát 5W cự ly liên lạc từ 1km đến 3km xuyên tầng bê tông tốt',
      'Vỏ máy chống va đập tiêu chuẩn quân đội Mỹ MIL-STD-810 C/D/E'
    ],
    specs: {
      'Dải tần': 'UHF 400 - 470 MHz',
      'Số kênh': '16 kênh tần số mã hóa chống nhiễu',
      'Dung lượng pin': '1.750 mAh Li-ion dùng liên tục 12 - 16 tiếng',
      'Trọng lượng': '335g chắc chắn trong lòng bàn tay',
      'Phụ kiện': 'Thân máy, pin, sạc bàn, bát cài lưng, dây đeo, ăng-ten'
    },
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80',
    description: 'Bộ đàm cầm tay tiêu chuẩn quân đội cho bảo vệ tòa nhà, công trình xây dựng, khách sạn và quản lý sự kiện chuyên nghiệp.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'phn-baofeng-bf888s',
    name: 'Bộ Đàm Nhà Hàng Quán Ăn Baofeng BF-888S Nhỏ Gọn',
    category: 'phone',
    categoryLabel: 'Bộ Đàm & Điện Thoại Bàn',
    brand: 'Baofeng',
    price: 290000,
    originalPrice: 380000,
    highlights: [
      'Giá siêu rẻ, tối ưu cho nhà hàng, quán cafe, nhân viên chạy bàn và giữ xe',
      'Thiết kế cực kỳ nhỏ gọn, cầm vừa lòng bàn tay và kẹp thắt lưng tiện lợi',
      'Tích hợp đèn pin LED chiếu sáng khi đi tuần tra trong đêm'
    ],
    specs: {
      'Cự ly liên lạc': '500m - 1.5km tùy địa hình',
      'Số kênh': '16 kênh đàm thoại',
      'Pin': '1.500 mAh sạc nhanh qua đế sạc',
      'Độ bền': 'Chống rơi vỡ nhẹ, nút bấm mềm dễ thao tác'
    },
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80',
    description: 'Bộ đàm bán chạy nhất cho các quán nướng, quán cafe nhiều tầng để nhân viên liên lạc gọi đồ và báo bàn tức thì.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'phn-pana-ts500',
    name: 'Điện Thoại Bàn Có Dây Panasonic KX-TS500VN Phím Lớn',
    category: 'phone',
    categoryLabel: 'Bộ Đàm & Điện Thoại Bàn',
    brand: 'Panasonic',
    price: 360000,
    originalPrice: 450000,
    highlights: [
      'Chính hãng Panasonic Nhật Bản, siêu bền bỉ dùng hàng chục năm không hỏng',
      'Âm thanh nghe gọi to rõ, có nút điều chỉnh âm lượng chuông 3 mức độ',
      'Phím bấm số lớn êm ái, có tính năng quay lại số vừa gọi gần nhất (Redial)'
    ],
    specs: {
      'Thương hiệu': 'Panasonic (Nhật Bản)',
      'Kiểu lắp đặt': 'Để bàn hoặc treo tường tiện dụng',
      'Tính năng': 'Quay số nhanh Redial, phím Flash chuyển máy nội bộ tổng đài',
      'Màu sắc': 'Trắng trang nhã hoặc Đen sang trọng'
    },
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=600&q=80',
    description: 'Điện thoại bàn có dây huyền thoại của Panasonic cho quầy lễ tân, bàn làm việc văn phòng và phòng khách sạn.',
    isPopular: true,
    isFeatured: true
  },

  // ==========================================
  // 12. LAPTOP & MÁY TÍNH VĂN PHÒNG (2 SẢN PHẨM NỔI BẬT)
  // ==========================================
  {
    id: 'lap-dell-opti3090',
    name: 'Máy Tính Đồng Bộ Dell OptiPlex 3090 SFF (Core i5 / 16GB / 512GB SSD)',
    category: 'laptop',
    categoryLabel: 'Laptop & Máy Tính Văn Phòng',
    brand: 'Dell',
    price: 10500000,
    originalPrice: 12500000,
    highlights: [
      'Thiết kế dạng thùng nhỏ SFF đặt vừa vặn trên bàn thu ngân hoặc gầm bàn hẹp',
      'Cấu hình Core i5 thế hệ mới, RAM 16GB đa nhiệm mượt mà không lo giật lag',
      'Bo mạch chủ và bộ nguồn công nghiệp Dell chạy liên tục 24/7 suốt nhiều năm'
    ],
    specs: {
      'CPU': 'Intel Core i5-10505 (6 nhân 12 luồng, Turbo 4.6GHz)',
      'RAM': '16GB DDR4 bus 3200',
      'Ổ cứng': 'SSD 512GB PCIe NVMe siêu tốc',
      'Cổng xuất hình': 'DisplayPort, HDMI (xuất 2 màn hình cùng lúc)',
      'Bảo hành': '24 tháng chính hãng'
    },
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80',
    description: 'Máy tính để bàn đồng bộ chuyên dụng cho kế toán, quản lý bán hàng và thu ngân đòi hỏi độ bền bỉ và tính ổn định cao.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'lap-hp-prodesk400',
    name: 'Máy Tính Thu Ngân Mini HP ProDesk 400 G7 DM Siêu Nhỏ Gọn',
    category: 'laptop',
    categoryLabel: 'Laptop & Máy Tính Văn Phòng',
    brand: 'HP',
    price: 8900000,
    originalPrice: 10500000,
    highlights: [
      'Kích thước mini chỉ bằng cuốn sách, giấu gọn sau màn hình hoặc dưới gầm quầy',
      'Cấu hình Intel Core i5 mạnh mẽ, tích hợp sẵn Wifi và Bluetooth tiện lợi',
      'Tiêu thụ điện năng cực thấp chỉ bằng 1/3 so với cây máy tính thùng to'
    ],
    specs: {
      'Kích thước': '17.7 x 17.5 x 3.4 cm (Trọng lượng chỉ 1.25 kg)',
      'CPU': 'Intel Core i5-10500T tiết kiệm điện',
      'RAM / SSD': '8GB DDR4 / 256GB SSD NVMe',
      'Kết nối': 'Wifi băng tần kép, Bluetooth, cổng LAN Gigabit, 6 cổng USB'
    },
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80',
    description: 'Máy tính cây mini siêu gọn đẹp cho quầy thu ngân phong cách tối giản, tiết kiệm diện tích tối đa.',
    isPopular: true,
    isFeatured: true
  }
];
