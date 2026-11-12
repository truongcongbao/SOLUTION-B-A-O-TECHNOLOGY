import { Product } from './types';

export const ATTENDANCE_PRODUCTS_20: Product[] = [
  {
    id: 'att-rj-2200',
    name: 'Máy Chấm Công Ronald Jack 2200 (Pin Lưu Điện 8H, 3.000 Vân Tay)',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'Ronald Jack',
    price: 2750000,
    originalPrice: 3300000,
    highlights: [
      'Trang bị pin lưu điện tích hợp sẵn 8 tiếng hoạt động liên tục khi mất điện',
      'Dung lượng quản lý 3.000 vân tay & 3.000 thẻ cảm ứng, lưu 100.000 lượt chấm công',
      'Đầu đọc vân tay thế hệ mới chống trầy xước, nhận diện dưới 0.8 giây'
    ],
    specs: {
      'Dung lượng': '3.000 vân tay + 3.000 thẻ cảm ứng',
      'Bộ nhớ dữ liệu': '100.000 lượt chấm công',
      'Pin dự phòng': 'Tích hợp sẵn hoạt động từ 6 - 8 giờ',
      'Cổng giao tiếp': 'TCP/IP (mạng LAN), USB host tải Excel trực tiếp',
      'Màn hình': 'TFT 2.8 inch Color siêu nét',
      'Âm thanh': 'Giọng nói tiếng Việt thông báo giờ vào/ra chuẩn xác'
    },
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    description: 'Máy chấm công vân tay bán chạy của Ronald Jack có pin lưu điện dự phòng dung lượng lớn, phù hợp văn phòng và xưởng sản xuất.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'att-zk-tx628',
    name: 'Máy Chấm Công ZKTeco TX628 (Tích Hợp Wifi Không Dây)',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'ZKTeco',
    price: 3150000,
    originalPrice: 3800000,
    highlights: [
      'Kết nối Wifi không dây tiện lợi, không cần khoan đục đi dây mạng thẩm mỹ',
      'Dung lượng 3.200 dấu vân tay, tốc độ xử lý nhanh dưới 0.5 giây',
      'Tích hợp âm thanh chuông báo giờ vào ca, tan ca theo lịch cài đặt'
    ],
    specs: {
      'Dung lượng vân tay': '3.200 dấu vân tay + 10.000 thẻ',
      'Bộ nhớ bản ghi': '100.000 giao dịch',
      'Kết nối': 'Wifi không dây chuẩn 802.11 b/g/n, TCP/IP, USB',
      'Màn hình': 'TFT 3.0 inch màn hình màu',
      'Phần mềm': 'ZKTeco BioTime / ZKTime.Net bản quyền tiếng Việt'
    },
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
    description: 'Máy chấm công kết nối Wifi của ZKTeco giúp việc lắp đặt tại showroom, cửa hàng bán lẻ trở nên cực kỳ đơn giản và nhanh gọn.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'att-rj-3000pro',
    name: 'Máy Chấm Công Vân Tay Ronald Jack 3000PRO Mẫu Mới',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'Ronald Jack',
    price: 2650000,
    originalPrice: 3100000,
    highlights: [
      'Thiết kế sang trọng viền kim loại mỏng nhẹ, bàn phím số bấm êm ái',
      'Tích hợp tính năng bảo toàn dữ liệu khi mất nguồn điện đột ngột',
      'Hỗ trợ cài đặt phần mềm tính công Ronald Jack Pro tiếng Việt miễn phí trọn đời'
    ],
    specs: {
      'Dung lượng': '3.000 vân tay + 3.000 thẻ Proximity',
      'Bộ nhớ': '100.000 lần chấm',
      'Cổng kết nối': 'TCP/IP, USB 2.0',
      'Màn hình': 'Color TFT 2.8 inch',
      'Bảo hành': '12 tháng chính hãng'
    },
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    description: 'Dòng máy 3000PRO đời mới của Ronald Jack với độ nhạy cảm biến vân tay quang học nâng cấp, đọc nhanh cả vân tay mờ nhẹ.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'att-zk-f18',
    name: 'Máy Chấm Công Kiểm Soát Cửa ZKTeco F18 (Access Control)',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'ZKTeco',
    price: 3450000,
    originalPrice: 4200000,
    highlights: [
      'Thiết bị kiểm soát cửa ra vào Access Control chuyên nghiệp kết hợp chấm công',
      'Kết nối trực tiếp khóa từ nam châm, khóa chốt thả, nút Exit, cảm biến cửa',
      'Hỗ trợ chuông báo động chống cạy phá tháo dỡ thiết bị trái phép'
    ],
    specs: {
      'Dung lượng': '3.000 vân tay + 5.000 thẻ cảm ứng',
      'Bộ nhớ sự kiện': '30.000 lần giao dịch',
      'Giao tiếp Access Control': 'Rơle mở khóa cửa, Wiegand In/Out, Door Sensor',
      'Cổng mạng': 'TCP/IP, RS485, USB host',
      'Màn hình': 'TFT LCD màu'
    },
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    description: 'Dòng máy kiểm soát cửa kinh điển của ZKTeco, giải pháp an ninh toàn diện vừa kiểm soát ra vào vừa chấm công nhân viên.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'att-hik-k1t804',
    name: 'Máy Chấm Công Vân Tay & Thẻ Hikvision DS-K1T804AMF Wifi',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'Hikvision',
    price: 2950000,
    originalPrice: 3500000,
    highlights: [
      'Thương hiệu an ninh Hikvision hàng đầu thế giới, kết nối mượt mà qua Wifi',
      'Đồng bộ dữ liệu chấm công trực tiếp lên phần mềm HikCentral và App Hik-Connect',
      'Hỗ trợ đọc cả thẻ Mifare 13.56MHz mã hóa bảo mật cao'
    ],
    specs: {
      'Dung lượng': '3.000 vân tay + 3.000 thẻ Mifare',
      'Bộ nhớ': '100.000 sự kiện',
      'Màn hình': 'LCD 2.4 inch sắc nét',
      'Kết nối': 'Wifi, TCP/IP, RS-485, USB',
      'Kiểm soát cửa': 'Hỗ trợ rơ le đóng mở khóa từ và nút Exit'
    },
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
    description: 'Thiết bị chấm công vân tay chính hãng Hikvision, hỗ trợ quản trị từ xa qua Cloud Hik-Connect trên điện thoại.',
    isPopular: true,
    isFeatured: true
  },
  {
    id: 'att-rj-6868',
    name: 'Máy Chấm Công Kiểm Soát Ra Vào Ronald Jack 6868',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'Ronald Jack',
    price: 2850000,
    originalPrice: 3400000,
    highlights: [
      'Tích hợp rơ-le kiểm soát cửa nam châm điện tử cho văn phòng làm việc',
      'Cảm biến vân tay quang học thế hệ 2 chống trầy, chống va đập',
      'Xuất báo cáo đi trễ, về sớm, tăng ca chi tiết bằng file Excel'
    ],
    specs: {
      'Dung lượng': '3.000 vân tay + 3.000 thẻ',
      'Bộ nhớ lưu trữ': '100.000 lượt chấm công',
      'Cổng kết nối': 'TCP/IP, USB',
      'Cổng kiểm soát': 'Đầu ra tiếp điểm rơ-le khóa cửa'
    },
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    description: 'Mẫu máy chấm công kiêm khóa cửa thông minh Ronald Jack 6868 hoạt động ổn định, giá thành cạnh tranh.',
    isPopular: false,
    isFeatured: false
  },
  {
    id: 'att-zk-f22',
    name: 'Máy Chấm Công ZKTeco F22 Siêu Mỏng Chuẩn Wifi',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'ZKTeco',
    price: 3650000,
    originalPrice: 4350000,
    highlights: [
      'Thiết kế siêu mỏng thời thượng (Ultra-thin), độ dày chỉ 2cm treo tường cực đẹp',
      'Cảm biến BioID nhận diện vân tay khô, ẩm ướt hoặc thô ráp cực nhạy',
      'Tích hợp sẵn Wifi không dây và bàn phím cảm ứng chống bám bụi'
    ],
    specs: {
      'Dung lượng vân tay': '3.000 vân tay + 5.000 thẻ cảm ứng',
      'Bộ nhớ': '30.000 lần quẹt',
      'Bàn phím': 'Cảm ứng Touch Keypad cao cấp',
      'Cảm biến': 'BioID Sensor với thuật toán ZKFinger VX10.0',
      'Kết nối': 'Wifi, TCP/IP, USB'
    },
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    description: 'Máy chấm công phong cách hiện đại với thiết kế siêu mỏng và phím cảm ứng tinh tế, phù hợp văn phòng công nghệ cao.',
    isPopular: false,
    isFeatured: false
  },
  {
    id: 'att-hik-k1t341',
    name: 'Máy Chấm Công Khuôn Mặt AI Hikvision DS-K1T341AMF',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'Hikvision',
    price: 4350000,
    originalPrice: 5100000,
    highlights: [
      'Màn hình cảm ứng 4.3 inch lớn, nhận diện khuôn mặt người đi qua dưới 0.2s',
      'Camera góc siêu rộng WDR chống ngược sáng hoàn hảo khi đặt gần cửa kính',
      'Dung lượng 3.000 khuôn mặt AI và 3.000 vân tay'
    ],
    specs: {
      'Khuôn mặt': '3.000 khuôn mặt AI',
      'Vân tay / Thẻ': '3.000 vân tay + 3.000 thẻ Mifare',
      'Camera': 'Ống kính kép 2MP WDR',
      'Màn hình': '4.3 inch Touch Screen',
      'Giao tiếp': 'TCP/IP, Wifi, RS-485'
    },
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
    description: 'Thiết bị chấm công nhận diện khuôn mặt chuyên nghiệp của Hikvision, chống giả mạo bằng ảnh in và video điện thoại.',
    isPopular: false,
    isFeatured: false
  },
  {
    id: 'att-gigata-t9',
    name: 'Máy Chấm Công Vân Tay Gigata T9 (Chip Intel Mỹ)',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'Gigata',
    price: 2450000,
    originalPrice: 2950000,
    highlights: [
      'Trang bị bộ vi xử lý Intel của Mỹ cho tốc độ xử lý thuật toán cực nhanh',
      'Dung lượng 3.000 vân tay & 3.000 thẻ, bộ nhớ lưu trữ 100.000 lượt chấm công',
      'Lấy dữ liệu qua mạng LAN hoặc tải file Excel trực tiếp qua cổng USB'
    ],
    specs: {
      'Dung lượng': '3.000 vân tay + 3.000 thẻ',
      'Dung lượng bản ghi': '100.000 lượt',
      'Tốc độ đọc': '< 0.5s',
      'Cổng giao tiếp': 'TCP/IP, USB',
      'Tặng kèm': 'Phần mềm tiếng Việt bản quyền trọn đời'
    },
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    description: 'Dòng máy chấm công Gigata T9 xuất xứ chính hãng, hoạt động bền bỉ trong môi trường văn phòng lẫn cửa hàng dịch vụ.',
    isPopular: false,
    isFeatured: false
  },
  {
    id: 'att-wse-810a',
    name: 'Máy Chấm Công Wise Eye WSE-810A Pin Dự Phòng',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'Wise Eye',
    price: 2550000,
    originalPrice: 3000000,
    highlights: [
      'Pin lưu điện dự phòng tích hợp hoạt động 4 tiếng sau khi mất điện lưới',
      'Âm thanh giọng nói hướng dẫn tiếng Việt chuẩn giọng chuẩn xác',
      'Kết nối xuất báo cáo trực tiếp với phần mềm Wise Eye On 39 phổ biến'
    ],
    specs: {
      'Dung lượng': '3.000 vân tay + 3.000 thẻ',
      'Bộ nhớ': '100.000 lần quẹt',
      'Pin': 'Tích hợp pin sạc dự phòng 4 giờ',
      'Màn hình': '2.8 inch Color TFT',
      'Kết nối': 'TCP/IP, USB'
    },
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    description: 'Mẫu máy chấm công thương hiệu Wise Eye tương thích tuyệt đối với phần mềm tính công Wise Eye Pro tại Việt Nam.',
    isPopular: false,
    isFeatured: false
  },
  {
    id: 'att-zk-silkbio',
    name: 'Máy Chấm Công Cảm Biến Tơ Lụa ZKTeco SilkBio-100TC',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'ZKTeco',
    price: 5200000,
    originalPrice: 6100000,
    highlights: [
      'Cảm biến vân tay tơ lụa SilkID độc quyền nhận diện ngón tay bị chai sạn, ướt mồ hôi',
      'Tích hợp 3 trong 1: Khuôn mặt hồng ngoại, Vân tay SilkID và Thẻ cảm ứng',
      'Hoạt động ổn định dưới nguồn ánh sáng mạnh mà không bị lóa'
    ],
    specs: {
      'Khuôn mặt': '2.000 khuôn mặt',
      'Vân tay SilkID': '3.000 vân tay SilkID',
      'Thẻ cảm ứng': '10.000 thẻ',
      'Bộ nhớ sự kiện': '100.000 bản ghi',
      'Màn hình': '2.8 inch TFT màu sắc trung thực'
    },
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
    description: 'Cảm biến SilkID cao cấp chuyên trị cho xưởng cơ khí, thợ làm mộc và công nhân có ngón tay mòn hoặc ra nhiều mồ hôi.',
    isPopular: false,
    isFeatured: false
  },
  {
    id: 'att-rj-879c',
    name: 'Máy Chấm Công Công Suất Lớn Ronald Jack 879C (5.000 Vân Tay)',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'Ronald Jack',
    price: 3600000,
    originalPrice: 4300000,
    highlights: [
      'Dung lượng cực lớn 5.000 vân tay dành riêng cho công ty đông nhân sự',
      'Bộ nhớ lưu trữ lên đến 160.000 lượt chấm công không sợ đầy bộ nhớ',
      'Bộ vi xử lý tốc độ cao chấm công liên tục mà không bị treo đơ'
    ],
    specs: {
      'Dung lượng vân tay': '5.000 vân tay + 5.000 thẻ',
      'Bộ nhớ dữ liệu': '160.000 lần chấm',
      'Giao tiếp': 'TCP/IP, RS232/485, USB Host',
      'Màn hình': 'TFT 3.5 inch lớn dễ nhìn'
    },
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    description: 'Lựa chọn số 1 cho các xí nghiệp may mặc, nhà máy sản xuất đông công nhân cần máy chấm công dung lượng bộ nhớ lớn.',
    isPopular: false,
    isFeatured: false
  },
  {
    id: 'att-hik-k1t671',
    name: 'Máy Chấm Công Khuôn Mặt 7 Inch Hikvision DS-K1T671MF (IP65)',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'Hikvision',
    price: 8900000,
    originalPrice: 10500000,
    highlights: [
      'Màn hình cảm ứng lớn 7 inch IPS Full HD hiển thị hình ảnh sang trọng',
      'Chuẩn kháng nước và bụi bẩn IP65 có thể lắp đặt ở sảnh ra vào có mái che',
      'Dung lượng cực khủng 6.000 khuôn mặt và 5.000 vân tay'
    ],
    specs: {
      'Khuôn mặt': '6.000 khuôn mặt AI',
      'Vân tay & Thẻ': '5.000 vân tay + 6.000 thẻ Mifare',
      'Màn hình': '7 inch IPS Touchscreen',
      'Kháng nước bụi': 'Đạt chuẩn IP65',
      'Khoảng cách nhận diện': '0.3m đến 3.0m cực xa'
    },
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
    description: 'Thiết bị nhận diện khuôn mặt cao cấp cho tòa nhà văn phòng hạng A và các sảnh tập đoàn lớn, tốc độ nhận diện vượt bậc.',
    isPopular: false,
    isFeatured: false
  },
  {
    id: 'att-zk-mb40vl',
    name: 'Máy Chấm Công Nhận Diện Khuôn Mặt Visible Light ZKTeco MB40-VL',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'ZKTeco',
    price: 4150000,
    originalPrice: 4900000,
    highlights: [
      'Công nghệ Visible Light nhận diện góc nghiêng 30 độ không cần dừng lại',
      'Thuật toán chống gian lận AI ngăn chặn hoàn toàn ảnh in màu và video',
      'Tích hợp chấm công bằng khuôn mặt, vân tay và thẻ cảm ứng'
    ],
    specs: {
      'Khuôn mặt': '3.000 khuôn mặt Visible Light',
      'Vân tay & Thẻ': '3.000 vân tay + 10.000 thẻ ID',
      'Bộ nhớ sự kiện': '100.000 lượt chấm công',
      'Màn hình': '2.8 inch Color Screen',
      'Giao tiếp': 'TCP/IP, USB'
    },
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    description: 'Máy chấm công FaceID AI giá hợp lý với công nghệ Visible Light hiện đại, giúp nhân viên chấm công không chạm nhanh chóng.',
    isPopular: false,
    isFeatured: false
  },
  {
    id: 'att-rj-t8',
    name: 'Máy Chấm Công Văn Phòng Nhỏ Ronald Jack T8 Siêu Bền',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'Ronald Jack',
    price: 1950000,
    originalPrice: 2400000,
    highlights: [
      'Giá thành rẻ nhất phân khúc, độ bền bỉ đã được kiểm chứng trên 10 năm',
      'Thích hợp cho quán cafe, tiệm trà sữa, spa và văn phòng dưới 30 người',
      'Lấy công dễ dàng qua dây cáp mạng LAN hoặc rút USB'
    ],
    specs: {
      'Dung lượng': '1.000 vân tay + 1.000 thẻ',
      'Bộ nhớ': '80.000 lần chấm',
      'Màn hình': '2.8 inch màu',
      'Cổng cắm': 'TCP/IP, USB Host',
      'Bảo hành': '12 tháng chính hãng'
    },
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    description: 'Thiết bị chấm công vân tay kinh tế quốc dân cho các cửa hàng nhỏ và văn phòng startup với chi phí đầu tư siêu tiết kiệm.',
    isPopular: false,
    isFeatured: false
  },
  {
    id: 'att-gigata-777',
    name: 'Máy Chấm Công Dung Lượng Lớn Gigata 777 (3.000 Vân Tay)',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'Gigata',
    price: 2600000,
    originalPrice: 3100000,
    highlights: [
      'Sử dụng cảm biến quang học chống trầy mòn và chip vi xử lý tốc độ cao',
      'Hẹn giờ tự động bật tắt máy giúp tiết kiệm điện năng và tăng tuổi thọ máy',
      'Hiển thị tên người chấm công trên màn hình khi đặt ngón tay thành công'
    ],
    specs: {
      'Dung lượng': '3.000 vân tay + 3.000 thẻ cảm ứng',
      'Bộ nhớ': '100.000 lượt giao dịch',
      'Kết nối': 'TCP/IP, USB tải dữ liệu',
      'Màn hình': 'Màu TFT 3.0 inch',
      'Bảo mật': 'Mật mã quản trị viên chống can thiệp cài đặt'
    },
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    description: 'Máy chấm công Gigata 777 thương hiệu Singapore ổn định cao, bảo quản dữ liệu an toàn kể cả khi mất nguồn điện đột ngột.',
    isPopular: false,
    isFeatured: false
  },
  {
    id: 'att-wse-on39',
    name: 'Máy Chấm Công Khuôn Mặt Wise Eye On 39 FaceID',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'Wise Eye',
    price: 3750000,
    originalPrice: 4400000,
    highlights: [
      'Tích hợp công nghệ nhận diện khuôn mặt AI và vân tay quang học',
      'Đèn LED trợ sáng nhận diện chuẩn xác ngay cả trong điều kiện phòng tối',
      'Tương thích hoàn hảo với phần mềm tính công Wise Eye On 39 Plus'
    ],
    specs: {
      'Khuôn mặt': '1.000 khuôn mặt',
      'Vân tay': '3.000 vân tay',
      'Bộ nhớ': '100.000 lần chấm',
      'Camera': 'Camera kép hồng ngoại',
      'Kết nối': 'TCP/IP, USB'
    },
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
    description: 'Máy chấm công khuôn mặt kết hợp vân tay của Wise Eye, giải pháp chấm công linh hoạt cho cả nhân viên văn phòng và kho bãi.',
    isPopular: false,
    isFeatured: false
  },
  {
    id: 'att-zk-speedface',
    name: 'Máy Chấm Công Nhận Diện Khuôn Mặt ZKTeco SpeedFace-V5L',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'ZKTeco',
    price: 7500000,
    originalPrice: 8800000,
    highlights: [
      'Công nghệ nhận diện khuôn mặt tốc độ ánh sáng SpeedFace dưới 0.3s',
      'Màn hình cảm ứng 5 inch sang trọng, khoảng cách đọc lên tới 2 mét',
      'Dung lượng 6.000 khuôn mặt, 6.000 vân tay và 10.000 thẻ cảm ứng'
    ],
    specs: {
      'Khuôn mặt': '6.000 khuôn mặt Visible Light',
      'Vân tay & Thẻ': '6.000 vân tay + 10.000 thẻ ID',
      'Màn hình': '5 inch Touch Screen IPS',
      'Thuật toán': 'AI Deep Learning phát hiện người thật',
      'Cổng giao tiếp': 'TCP/IP, Wifi, RS485, Wiegand In/Out'
    },
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
    description: 'Dòng máy chấm công khuôn mặt cao cấp hàng đầu của ZKTeco trang bị thuật toán Deep Learning, nhận diện cực nhanh khi vừa bước tới.',
    isPopular: false,
    isFeatured: false
  },
  {
    id: 'att-rj-x938c',
    name: 'Máy Chấm Công Nhà Máy Xí Nghiệp Ronald Jack X938-C',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'Ronald Jack',
    price: 3250000,
    originalPrice: 3850000,
    highlights: [
      'Vỏ máy cứng cáp chịu bụi bẩn, chuyên trị cho môi trường nhà xưởng công nghiệp',
      'Dung lượng 4.000 vân tay & 4.000 thẻ, bộ nhớ 100.000 lượt chấm công',
      'Tích hợp chuông báo giờ vào ca, tan ca kết nối trực tiếp chuông reng ngoài xưởng'
    ],
    specs: {
      'Dung lượng': '4.000 vân tay + 4.000 thẻ',
      'Bộ nhớ bản ghi': '100.000 lượt',
      'Cổng chuông ngoài': 'Rơ-le kích hoạt chuông reng báo giờ',
      'Kết nối': 'TCP/IP, USB',
      'Bảo hành': '12 tháng chính hãng'
    },
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    description: 'Thiết bị chấm công công nghiệp chuyên dụng cho nhà máy, xí nghiệp với cổng kích hoạt chuông báo giờ tan ca công suất lớn.',
    isPopular: false,
    isFeatured: false
  },
  {
    id: 'att-zk-minita',
    name: 'Máy Chấm Công Mini Thông Minh ZKTeco MiniTA Để Bàn',
    category: 'attendance',
    categoryLabel: 'Máy Chấm Công',
    brand: 'ZKTeco',
    price: 2150000,
    originalPrice: 2600000,
    highlights: [
      'Thiết kế để bàn độc đáo với chân đế nghiêng công thái học, không cần khoan tường',
      'Cảm biến vân tay quang học BioID quét nhạy bén, tiết kiệm điện năng',
      'Có pin sạc bên trong tiện lợi di chuyển chấm công lưu động'
    ],
    specs: {
      'Dung lượng': '1.000 vân tay + 1.000 thẻ',
      'Bộ nhớ': '50.000 lượt chấm',
      'Kiểu dáng': 'Để bàn hoặc treo tường tiện lợi',
      'Nguồn': 'Cổng micro USB 5V cắm nguồn hoặc sạc dự phòng',
      'Kết nối': 'TCP/IP, USB'
    },
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    description: 'Máy chấm công để bàn mini nhỏ gọn, cấp nguồn bằng cổng USB 5V tiện lợi cho các văn phòng thuê hoặc sự kiện ngắn ngày.',
    isPopular: false,
    isFeatured: false
  }
];
