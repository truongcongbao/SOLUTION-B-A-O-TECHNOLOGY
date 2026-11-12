export interface ContentSection {
  title: string;
  paragraphs: string[];
  list?: string[];
  alert?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  image: string;
  date: string;
  category: 'technical' | 'reviews' | 'news' | 'promo';
  categoryLabel: string;
  author: string;
  views: number;
  readTime: string;
  summary: string;
  sections: ContentSection[];
  relatedProductIds: string[];
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-driver-setup',
    title: 'Hướng dẫn cài đặt Driver máy in mã vạch Xprinter XP-350B, XP-420B từ A đến Z',
    slug: 'huong-dan-cai-dat-driver-xprinter',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    date: '15/06/2026',
    category: 'technical',
    categoryLabel: 'Hướng Dẫn Kỹ Thuật',
    author: 'Kỹ Thuật Viên SOLUTION B A O',
    views: 12450,
    readTime: '4 phút đọc',
    summary: 'Dòng máy in mã vạch Xprinter XP-350B và XP-420B hiện đang là sản phẩm quốc dân tại Việt Nam. Bài viết này hướng dẫn chi tiết các bước cài đặt driver, căn chỉnh giấy trên cả Windows và MacOS để in đơn hàng Shopee, TikTok Shop nhanh chóng.',
    relatedProductIds: ['lbl-350b', 'lbl-420b'],
    sections: [
      {
        title: '1. Chuẩn bị trước khi cài đặt Driver',
        paragraphs: [
          'Trước khi bắt đầu cài đặt, bạn cần đảm bảo các thiết bị phần cứng đã được kết nối đúng cách. Rất nhiều trường hợp kỹ thuật viên của SOLUTION B A O nhận được cuộc gọi hỗ trợ chỉ vì khách hàng chưa cắm chặt cáp USB.',
          'Hãy kiểm tra kỹ 3 yếu tố sau trước khi tiến hành chạy tệp cài đặt:'
        ],
        list: [
          'Máy in Xprinter đã được cắm nguồn điện và bật công tắc (đèn xanh sáng màu ổn định).',
          'Cáp kết nối USB đã được cắm một đầu vào cổng máy in, đầu còn lại cắm trực tiếp vào máy tính (hạn chế cắm qua cổng chia USB/Hub rời).',
          'Giấy in nhiệt (khổ K80 hoặc A6 100x150) đã được lắp đúng chiều (mặt cảm nhiệt hướng lên trên đối với dòng Xprinter).'
        ]
      },
      {
        title: '2. Các bước tải và cài đặt Driver Xprinter trên Windows',
        paragraphs: [
          'Xprinter sử dụng chung một lõi Driver của hãng Seagull Scientific rất trực quan và dễ cấu hình dải cổng (Ports). Hãy thực hiện theo trình tự các bước sau:',
          'Bước 1: Tải Driver phiên bản chuẩn hóa từ trang hỗ trợ kỹ thuật của SOLUTION B A O hoặc trang chủ Xprinter.',
          'Bước 2: Click đúp vào tệp vừa tải về (thường có tên xprinter_driver.exe) -> Chọn "I accept" -> bấm Next liên tục cho đến khi xuất hiện bảng cài đặt Driver Wizard.',
          'Bước 3: Chọn "Install printer drivers" và click Next. Hệ thống sẽ tự động dò tìm cổng USB đang kết nối trực tiếp với máy in.'
        ],
        alert: 'Mẹo nhỏ: Nếu Driver Wizard không tự động dò thấy cổng USB, bạn hãy chọn mục "Other" -> chọn đúng Model máy in (ví dụ: Xprinter XP-420B hoặc XP-350B) -> bấm Next và chọn dải cổng ảo dạng "USB001" hoặc "USB002" để thiết lập thủ công.'
      },
      {
        title: '3. Cấu hình cỡ giấy in đơn hàng tiêu chuẩn',
        paragraphs: [
          'Sau khi cài đặt thành công, máy in sẽ xuất hiện trong mục "Printers & Scanners" của Windows. Để tránh việc in bị lệch chữ, mất lề, bạn cần thiết lập cỡ giấy chuẩn:',
          'Vào Control Panel -> Devices and Printers -> Click chuột phải vào biểu tượng máy in Xprinter -> Chọn "Printing Preferences".',
          'Tại tab "Page Setup", bấm chọn "New" để tạo khổ giấy mới. Nếu bạn đang in đơn hàng Shopee/TikTok Shop, nhập thông số: Width = 100mm, Height = 150mm. Nếu in tem trà sữa, nhập Width = 50mm, Height = 30mm.'
        ]
      },
      {
        title: '4. Kết luận & Dịch vụ hỗ trợ kỹ thuật',
        paragraphs: [
          'Việc cài đặt driver Xprinter khá đơn giản, tuy nhiên nếu gặp khó khăn, bạn không cần lo lắng. Tất cả khách hàng mua sắm thiết bị in ấn tại SOLUTION B A O đều được hỗ trợ kỹ thuật UltraViewer cấu hình trọn gói hoàn toàn miễn phí.'
        ]
      }
    ]
  },
  {
    id: 'news-rj1200-vs-k14',
    title: 'So sánh chi tiết Ronald Jack RJ1200 và ZKTeco K14: Đâu là giải pháp chấm công tốt nhất?',
    slug: 'so-sanh-ronald-jack-rj1200-va-zkteco-k14',
    image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=800',
    date: '28/05/2026',
    category: 'reviews',
    categoryLabel: 'Đánh Giá Sản Phẩm',
    author: 'Chuyên gia Thiết Bị Văn Phòng',
    views: 8920,
    readTime: '5 phút đọc',
    summary: 'Khi chọn mua máy chấm công vân tay cho văn phòng hoặc chuỗi cửa hàng dưới 100 nhân sự, Ronald Jack RJ1200 và ZKTeco K14 là hai đối thủ trực tiếp nặng ký nhất. Cùng SOLUTION B A O phân tích chi tiết ưu nhược điểm của từng model.',
    relatedProductIds: ['att-rj1200', 'att-zk-k14'],
    sections: [
      {
        title: '1. Đặt lên bàn cân thiết kế và cảm biến',
        paragraphs: [
          'Về ngoại hình, ZKTeco K14 có phần nhỉnh hơn nhờ thiết kế trẻ trung, hiện đại và nhỏ gọn hơn. Máy sở hữu màn hình màu TFT 2.8 inch sắc nét, các phím bấm nhạy bén.',
          'Trong khi đó, Ronald Jack RJ1200 mang phong cách cổ điển, bền bỉ và chắc chắn hơn với khung nhựa nhám chống bám vân tay tốt. Cả hai đều sở hữu đầu đọc chống trầy xước.'
        ]
      },
      {
        title: '2. So sánh dung lượng bộ nhớ và tốc độ xử lý',
        paragraphs: [
          'Đây là yếu tố cốt lõi ảnh hưởng trực tiếp đến hiệu năng vận hành hàng ngày của máy:',
          'ZKTeco K14: Đạt dung lượng quản lý tối đa 2.000 dấu vân tay và 2.000 thẻ cảm ứng. Dung lượng ghi nhớ sự kiện chấm công là 50.000 lượt.',
          'Ronald Jack RJ1200: Vượt trội hơn với khả năng quản lý lên tới 3.000 dấu vân tay, 3.000 thẻ cảm ứng và bộ nhớ lưu trữ đến 100.000 lượt chấm công.'
        ],
        alert: 'Khuyên dùng: Nếu doanh nghiệp của bạn hoạt động sản xuất, có tỷ lệ luân chuyển nhân sự cao hoặc có quy mô dự kiến tăng trưởng nhanh trong tương lai, Ronald Jack RJ1200 với bộ nhớ gấp đôi sẽ là khoản đầu tư an toàn và dài hạn hơn.'
      },
      {
        title: '3. Khả năng tương thích phần mềm tính công tiếng Việt',
        paragraphs: [
          'ZKTeco K14 kết nối mượt mà nhất với phần mềm BioTime hoặc ZKTime chuẩn quốc tế, tuy nhiên báo cáo tiếng Việt hơi phức tạp.',
          'Ronald Jack RJ1200 lại là "vua" tương thích với dải phần mềm tính công phổ biến tại Việt Nam như Wise Eye Mix3, Wise Eye On 39, Ronald Jack Pro. Báo cáo xuất ra file Excel tiếng Việt cực kỳ chi tiết, tính được ca gãy, ca đêm, đi trễ về sớm chính xác 100%.'
        ]
      },
      {
        title: '4. Kết luận lựa chọn mua sắm',
        paragraphs: [
          'Nếu bạn thích một chiếc máy thiết kế đẹp mắt, giá cực tốt cho văn phòng nhỏ dưới 30 người: Hãy chọn ZKTeco K14.',
          'Nếu bạn đề cao sự bền bỉ, dung lượng lớn, tương thích sâu sắc với phần mềm Excel tiếng Việt trực quan cho nhà hàng, quán cafe, văn phòng dưới 150 người: Ronald Jack RJ1200 chắc chắn là lựa chọn hoàn hảo nhất.'
        ]
      }
    ]
  },
  {
    id: 'news-printer-troubleshooting',
    title: 'Khắc phục lỗi máy in bill hóa đơn nhấp nháy đèn đỏ (Error) kêu bíp bíp liên tục',
    slug: 'khac-phuc-loi-may-in-bill-bao-den-do',
    image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=800',
    date: '10/05/2026',
    category: 'technical',
    categoryLabel: 'Hướng Dẫn Kỹ Thuật',
    author: 'Phòng Kỹ Thuật SOLUTION B A O',
    views: 15600,
    readTime: '3 phút đọc',
    summary: 'Trong quá trình vận hành quầy thu ngân, máy in bill bất ngờ ngưng hoạt động, đồng thời nhấp nháy đèn LED đỏ và kêu bíp bíp liên hồi là lỗi phổ biến nhất. Đọc ngay bài viết để biết cách xử lý tức thời không gián đoạn bán hàng.',
    relatedProductIds: ['prn-q200', 'prn-a160m'],
    sections: [
      {
        title: '1. Nguyên nhân 1: Máy bị hết giấy in hoặc nắp đậy chưa chặt',
        paragraphs: [
          'Đây là nguyên nhân đơn giản nhất chiếm đến 60% trường hợp lỗi. Cảm biến quang học của máy in hóa đơn K80 sẽ phát hiện khi dải giấy nhiệt kết thúc và lập tức phát tín hiệu cảnh báo đèn đỏ.',
          'Cách khắc phục: Mở nắp máy in, thay một cuộn giấy in nhiệt bọc bạc K80 mới. Đảm bảo lắp đúng chiều cuộn giấy (mặt giấy mịn bóng áp vào đầu nhiệt). Sau đó ấn mạnh nắp đậy xuống cho nghe tiếng "tạch" giòn giã ở cả hai bên lẫy.'
        ]
      },
      {
        title: '2. Nguyên nhân 2: Lỗi kẹt dao cắt tự động (Auto-cutter jam)',
        paragraphs: [
          'Các dòng máy in hóa đơn khổ lớn K80 như Xprinter Q200 hay Epson TM-T82 đều trang bị dao thép để tự động cắt bill sau khi hoàn tất in. Nếu giấy bị ẩm, nhăn hoặc dao bị mòn, dao cắt có thể bị kẹt giữa chừng không thụt về được, khiến máy in báo lỗi đỏ.',
          'Cách khắc phục thủ công cực kỳ an toàn:'
        ],
        list: [
          'Tắt công tắc nguồn máy in.',
          'Mở nắp nhựa nhỏ phía trước máy (nắp che phần dao cắt).',
          'Tìm bánh răng nhựa màu trắng bên trong và xoay theo chiều kim đồng hồ cho đến khi dao cắt thụt hẳn về vị trí ban đầu.',
          'Bật lại nguồn và test thử nút FEED.'
        ],
        alert: 'Lưu ý cực quan trọng: Tuyệt đối không dùng dao kéo, vật sắc nhọn kim loại thọc vào khe cắt để cạy dao, vì sẽ làm gãy lưỡi dao cắt tự động và hỏng hóc đầu in nhiệt cực kỳ tốn chi phí thay thế!'
      },
      {
        title: '3. Nguyên nhân 3: Quá nhiệt đầu in (Thermal Head Protection)',
        paragraphs: [
          'Nếu cửa hàng của bạn đang vào giờ cao điểm và máy phải in liên tục hàng trăm mét hóa đơn không ngừng nghỉ, nhiệt độ đầu phun sẽ vượt ngưỡng an toàn (thường là trên 75°C). Máy in sẽ tự động ngắt và báo đỏ để bảo vệ chip nhiệt không bị cháy.',
          'Cách khắc phục: Tắt nguồn máy in, mở hẳn nắp giấy ra để đầu in nguội tự nhiên trong vòng 5-10 phút. Sau đó bật nguồn lại là có thể tiếp tục sử dụng bình thường.'
        ]
      }
    ]
  },
  {
    id: 'news-oji-k80-paper',
    title: 'Tại sao nên chọn giấy in nhiệt K80x45 Oji Japan bọc bạc cao cấp thay vì giấy thường?',
    slug: 'tai-sao-nen-chon-giay-in-nhiet-oji-japan',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=800',
    date: '04/04/2026',
    category: 'news',
    categoryLabel: 'Tin tức Công Nghệ',
    author: 'SOLUTION B A O Admin',
    views: 6420,
    readTime: '3 phút đọc',
    summary: 'Rất nhiều chủ cửa hàng vì ham rẻ vài chục ngàn đồng một thùng đã mua phải các dòng giấy in nhiệt trôi nổi chứa nhiều bụi giấy, khiến đầu in nhiệt máy in bill bị mài mòn nhanh chóng. Giấy Oji Nhật Bản bọc bạc là giải pháp bảo vệ máy in tối đa.',
    relatedProductIds: ['con-k80', 'con-k57'],
    sections: [
      {
        title: '1. Nguyên liệu giấy nhập khẩu chính hãng từ Nhật Bản',
        paragraphs: [
          'Giấy in nhiệt K80x45 bọc bạc do SOLUTION B A O phân phối sử dụng phôi giấy chính hiệu nhập từ tập đoàn Oji Paper - Nhật Bản. Bề mặt giấy được phủ lớp hóa chất cảm nhiệt đều, láng mịn, mang lại độ tương phản tuyệt vời khi in.'
        ]
      },
      {
        title: '2. Quy trình bọc bạc bảo quản tối ưu',
        paragraphs: [
          'Khác với các dòng giấy đóng gói thô sơ bằng màng nilon thông thường, từng cuộn giấy Oji tại SOLUTION B A O được bọc một lớp giấy bạc kín kẽ ở hai đầu:',
          'Lớp bạc này giúp chống ẩm mốc tuyệt đối, ngăn bức xạ nhiệt và ánh sáng trực tiếp phá hủy lớp hóa chất cảm ứng của giấy.',
          'Giúp tăng tuổi thọ bảo quản cuộn giấy chưa dùng lên tới 3 - 5 năm mà không lo bị mờ chữ hoặc ố vàng khi mang ra sử dụng.'
        ]
      },
      {
        title: '3. Bảo vệ đầu in nhiệt - Giảm chi phí bảo trì',
        paragraphs: [
          'Đầu in nhiệt (Thermal Printhead) chiếm đến 40% giá trị của một chiếc máy in bill. Sử dụng giấy thô ráp chứa nhiều tạp chất cát silic sẽ giống như dùng giấy nhám mài mòn đầu in mỗi ngày.',
          'Giấy Oji siêu sạch, hoàn toàn không tạo bụi giấy trong lồng máy, giúp giữ đầu nhiệt luôn bóng loáng, nâng tuổi thọ in ấn lên tới hơn 150km giấy.'
        ],
        alert: 'Lời khuyên từ SOLUTION B A O: Đầu tư giấy in chất lượng cao chính là cách tiết kiệm chi phí bảo trì và thay mới thiết bị khôn ngoan nhất của các chủ chuỗi nhà hàng, siêu thị lớn.'
      }
    ]
  },
  {
    id: 'news-wise-eye-setup',
    title: 'Hướng dẫn kết nối và đồng bộ máy chấm công vân tay với phần mềm Wise Eye On 39',
    slug: 'huong-dan-ket-noi-may-cham-cong-wise-eye-on-39',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    date: '22/03/2026',
    category: 'technical',
    categoryLabel: 'Hướng Dẫn Kỹ Thuật',
    author: 'Kỹ Thuật Viên Wise Eye',
    views: 11020,
    readTime: '6 phút đọc',
    summary: 'Wise Eye On 39 là phần mềm chấm công tiếng Việt được sử dụng nhiều nhất hiện nay nhờ giao diện tối ưu cho kế toán Việt Nam. Cùng xem hướng dẫn cấu hình mạng TCP/IP để tải dữ liệu chấm công từ xa.',
    relatedProductIds: ['att-rj1200', 'att-4000tid'],
    sections: [
      {
        title: '1. Cấu hình IP tĩnh cho máy chấm công',
        paragraphs: [
          'Để máy tính có thể kết nối ổn định với máy chấm công qua dải mạng LAN, bạn bắt buộc phải cấu hình cho máy chấm công một địa chỉ IP tĩnh không trùng lắp.',
          'Các bước thực hiện trên bàn phím máy chấm công:',
          'Bước 1: Ấn nút M/OK để vào Menu -> Chọn mục "Hệ thống" hoặc "Thiết lập liên kết" -> Chọn mục "Mạng/Ethernet".',
          'Bước 2: Tắt chế độ DHCP (chọn DHCP = OFF).',
          'Bước 3: Đặt địa chỉ IP tĩnh. Ví dụ nếu dải mạng văn phòng bạn là 192.168.1.X, hãy đặt IP máy chấm công là 192.168.1.201. Đặt Subnet Mask là 255.255.255.0 và Gateway là 192.168.1.1.'
        ],
        alert: 'Mẹo kỹ thuật: Hãy mở Command Prompt trên máy tính lên gõ lệnh "ping 192.168.1.201" để kiểm tra xem máy tính đã nhìn thấy máy chấm công trong mạng LAN chưa trước khi cấu hình trên phần mềm nhé!'
      },
      {
        title: '2. Khai báo máy chấm công trên phần mềm Wise Eye On 39',
        paragraphs: [
          'Mở phần mềm Wise Eye On 39 trên máy tính kế toán lên -> Vào mục "Danh mục" -> Chọn "Khai báo máy chấm công".',
          'Nhấn "Thêm mới", nhập các thông số:',
          'Tên máy: Máy Chấm Công Văn Phòng',
          'Kiểu kết nối: TCP/IP',
          'Địa chỉ IP: 192.168.1.201 (nhập chính xác IP tĩnh vừa cài đặt trên máy)',
          'Cổng (Port): Để mặc định là 4370.',
          'Số S/N và Mã đăng ký phần mềm: Nhập mã đăng ký SOLUTION B A O cung cấp đi kèm với máy chấm công khi mua hàng.'
        ]
      },
      {
        title: '3. Tải dữ liệu chấm công hàng ngày',
        paragraphs: [
          'Để tính lương cuối tháng, kế toán thực hiện các bước sau để cập nhật:',
          'Vào mục "Máy chấm công" trên thanh công cụ -> Chọn "Tải dữ liệu chấm công" -> Chọn máy cần tải và nhấn "Duyệt từ máy chấm công". Phần mềm sẽ load toàn bộ giờ IN/OUT của nhân viên và lưu vào database.'
        ]
      }
    ]
  },
  {
    id: 'news-barcode-scanner-guide',
    title: 'Kinh nghiệm chọn mua máy quét mã vạch cho siêu thị mini, shop thời trang',
    slug: 'kinh-nghiem-chon-mua-may-quet-ma-vach',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800',
    date: '18/02/2026',
    category: 'reviews',
    categoryLabel: 'Đánh Giá Sản Phẩm',
    author: 'SOLUTION B A O Consultant',
    views: 7890,
    readTime: '4 phút đọc',
    summary: 'Chọn máy quét mã vạch 1D hay 2D? Có cần mua máy không dây Bluetooth hay máy quét đa tia để bàn? Bài viết tổng hợp kinh nghiệm thực tế giúp chủ shop tiết kiệm ngân sách và thanh toán nhanh lẹ.',
    relatedProductIds: ['scan-orbit', 'scan-2101g'],
    sections: [
      {
        title: '1. Hiểu rõ sự khác biệt giữa mã vạch 1D và mã vạch 2D',
        paragraphs: [
          'Mã vạch 1D: Là các vạch đen sọc dọc song song thường thấy trên các hộp bánh kẹo, chai dầu gội... Các dòng máy quét giá rẻ sử dụng tia laser đỏ đều quét tốt loại mã vạch này.',
          'Mã vạch 2D: Tiêu biểu là mã QR Code, mã vạch PDF417 trên thẻ bảo hiểm y tế hoặc mã giảm giá trên màn hình điện thoại. Các dòng máy quét 1D thông thường SẼ KHÔNG QUÉT ĐƯỢC mã vạch này. Bạn bắt buộc phải chọn máy quét hỗ trợ cảm biến ảnh 2D (Imager).'
        ]
      },
      {
        title: '2. Gợi ý lựa chọn theo mô hình kinh doanh thực tế',
        paragraphs: [
          'Mỗi mô hình cửa hàng sẽ đòi hỏi dòng máy quét có thiết kế và tốc độ xử lý khác nhau để tránh làm khách hàng phải xếp hàng dài đợi thanh toán:'
        ],
        list: [
          'Siêu thị mini, tạp hóa đông đúc: Nên chọn dòng máy quét đa tia để bàn (ví dụ: Honeywell Orbit). Thiết bị này phát ra mạng lưới dải tia quét chéo nhau, thu ngân chỉ cần lướt sản phẩm qua là máy nhận ngay mà không cần căn chỉnh góc bắn.',
          'Shop thời trang, mỹ phẩm, nhà thuốc: Lượng khách vừa phải, mã vạch nhỏ mịn -> Nên chọn máy quét cầm tay 2D có dây thông thường để quét mã thẻ thành viên điện thoại tiện lợi.',
          'Kho bãi, shop có hàng hóa cồng kềnh: Chọn máy quét mã vạch không dây Bluetooth (ví dụ: dòng 2101G) để tự do di chuyển quét mã thùng hàng cách máy tính lên tới 15 - 30 mét.'
        ]
      }
    ]
  },
  {
    id: 'news-leo-top-google',
    title: 'Phần Mềm Leo Top Google - Hút Traffic Khủng, Đẩy Thứ Hạng Website An Toàn & Nhanh Chóng',
    slug: 'leo-top-google-hut-traffic-khung',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    date: '07/08/2026',
    category: 'promo',
    categoryLabel: 'Phần Mềm & Giải Pháp SEO',
    author: 'Chuyên Gia SEO SOLUTION B A O',
    views: 18500,
    readTime: '6 phút đọc',
    summary: 'Giải pháp phần mềm Leo Top Google giúp bứt phá lưu lượng truy cập (Traffic) cho website từ các nguồn Organic, Direct, Social, Referral, Random. Đột phá thứ hạng từ khóa Google, tác động thực tế lên Google Analytics & Search Console an toàn tuyệt đối.',
    relatedProductIds: ['sw-leo-top-google'],
    sections: [
      {
        title: '1. Giới thiệu phần mềm Leo Top Google - Bứt phá Traffic & Thứ hạng Google',
        paragraphs: [
          'Bạn đang sở hữu website nhưng chưa có lượng truy cập ổn định? Thứ hạng từ khóa trên Google đứng yên hoặc tụt dốc do thiếu tín hiệu tương tác từ người dùng?',
          'Phần mềm **Leo Top Google - Hút Traffic Khủng** chính là giải pháp tự động hóa đột phá giúp đẩy nhanh tốc độ lên TOP Google. Hệ thống tạo ra nguồn traffic an toàn, tự nhiên và tác động trực tiếp vào báo cáo Google Analytics 4 (GA4) cũng như Google Search Console (GSC).'
        ],
        list: [
          'Traffic đa nguồn phong phú: Organic Search (Từ khóa Google), Direct, Social (Facebook, Youtube, Zalo), Referral (Nguồn giới thiệu), Random.',
          'Ghi nhận chỉ số thực 100% trên Google Analytics & Google Search Console.',
          'Tự động tạo hệ thống backlink ảo chất lượng hỗ trợ SEO lâu dài.'
        ]
      },
      {
        title: '2. Cơ chế An Toàn Tuyệt Đối - Tương tác Như Người Dùng Thật',
        paragraphs: [
          'Khác với các công cụ bắn bot traffic thô sơ dễ bị Google phạt, phần mềm Leo Top Google áp dụng cơ chế mô phỏng hành vi chuyên sâu:',
          'Mỗi lượt truy cập được thực hiện bởi một Profile trình duyệt riêng biệt đã có sẵn lịch sử tìm kiếm, cookie thực tế và vân tay thiết bị (Browser Fingerprint) tự nhiên.'
        ],
        list: [
          'Tương tác cuộn trang, di chuyển chuột, click bài viết liên quan giống hệt người dùng thật.',
          'Tự động giải tất cả các loại Captcha (reCAPTCHA v2/v3, HCaptcha, Image Captcha).',
          'Tích hợp hệ thống Proxy xoay IP toàn quốc - Tùy chọn vị trí IP và nhà mạng theo ý muốn.',
          'Random thông minh thời gian dừng trên trang (Stay Time), số lần click trang con và tỷ lệ CTR theo từng từ khóa.'
        ],
        alert: '🛡️ An toàn tuyệt đối: Giúp kéo từ khóa lên TOP 1 - 3 tự nhiên mà không lo các đợt cập nhật thuật toán Core Update của Google!'
      },
      {
        title: '3. Đơn Giản & Dễ Dàng Sử Dụng - Hoạt Động Chạy Ẩn 24/7',
        paragraphs: [
          'Giao diện cài đặt phần mềm cực kỳ thân thiện và dễ thao tác. Bạn chỉ cần nhập danh sách URL website và từ khóa mục tiêu, cài đặt số lượng traffic mong muốn là phần mềm có thể tự động vận hành.',
          '⚡ Dễ sử dụng: Có thể chạy ẩn dưới khay hệ thống (System Tray), không chiếm màn hình, không giật lag và hoàn toàn không ảnh hưởng đến công việc hàng ngày của bạn.'
        ]
      },
      {
        title: '4. Đăng ký tư vấn & Nhận bản quyền dùng thử phần mềm',
        paragraphs: [
          'Hãy liên hệ ngay với đội ngũ giải pháp công nghệ tại SOLUTION B A O qua Hotline / Zalo 0908.555.547 để được tư vấn cài đặt trọn gói, demo chạy trực tiếp và nhận chương trình ưu đãi bản quyền hấp dẫn nhất!'
        ]
      }
    ]
  }
];
