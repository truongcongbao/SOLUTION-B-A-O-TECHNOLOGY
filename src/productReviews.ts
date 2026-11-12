import { ProductReview } from './types';

export const INITIAL_PRODUCT_REVIEWS: ProductReview[] = [
  {
    id: 'rev-rj1200-1',
    productId: 'att-rj1200',
    author: 'Nguyễn Minh Tuấn (Chủ chuỗi Cafe)',
    rating: 5,
    comment: 'Máy chạy êm, quét vân tay nhạy lắm kể cả khi tay có dính nước. Phần mềm tiếng Việt dễ dùng, xuất file Excel báo cáo rất rõ ràng.',
    date: '28/06/2026'
  },
  {
    id: 'rev-rj1200-2',
    productId: 'att-rj1200',
    author: 'Trần Thị Thu Thủy (HR Manager)',
    rating: 5,
    comment: 'SOLUTION B A O hỗ trợ cài đặt qua UltraViewer rất nhanh chóng và nhiệt tình. Máy dùng hơn 3 tháng nay chưa gặp bất kỳ lỗi gì.',
    date: '12/05/2026'
  },
  {
    id: 'rev-rj1200-3',
    productId: 'att-rj1200',
    author: 'Lê Văn Nam (Cửa hàng ăn uống)',
    rating: 4,
    comment: 'Máy ổn định, giá thành hợp lý. Rất hài lòng với dịch vụ hỗ trợ của kỹ thuật viên.',
    date: '02/04/2026'
  },
  {
    id: 'rev-q200-1',
    productId: 'prn-q200',
    author: 'Phạm Thanh Sơn (Chủ siêu thị mini)',
    rating: 5,
    comment: 'Máy in hóa đơn siêu nhanh, tự động cắt giấy sắc lẹm không bị kẹt giấy. K80 là khổ chuẩn nhìn chuyên nghiệp hẳn.',
    date: '14/06/2026'
  },
  {
    id: 'rev-q200-2',
    productId: 'prn-q200',
    author: 'Hoàng Ngọc Ánh (Thu ngân)',
    rating: 5,
    comment: 'Không tốn tiền mua mực, in nét căng. Đèn báo rõ ràng, dùng cực kỳ sướng tay!',
    date: '20/05/2026'
  },
  {
    id: 'rev-fa113-1',
    productId: 'att-fa113',
    author: 'Vũ Đức Hải (Giám đốc công ty xây dựng)',
    rating: 5,
    comment: 'Công nghệ FaceID quá xịn sò, đeo khẩu trang máy vẫn nhận diện được chính xác. Đỡ phải dùng vân tay xước sát.',
    date: '05/06/2026'
  },
  {
    id: 'rev-fa113-2',
    productId: 'att-fa113',
    author: 'Đỗ Thị Hồng (Kế toán trưởng)',
    rating: 5,
    comment: 'Máy sang trọng nâng tầm văn phòng công ty. Báo cáo chấm công tải cực nhanh qua mạng dây.',
    date: '18/04/2026'
  },
  {
    id: 'rev-a160m-1',
    productId: 'prn-a160m',
    author: 'Nguyễn Quốc Bảo (Quản lý nhà hàng)',
    rating: 5,
    comment: 'In qua mạng LAN từ điện thoại cực kỳ nhạy. Thu ngân đứng đâu cũng bấm in hóa đơn xuống bếp được.',
    date: '25/05/2026'
  },
  {
    id: 'rev-zk-k14-1',
    productId: 'att-zk-k14',
    author: 'Nguyễn Văn Tiến (Văn phòng nhỏ)',
    rating: 4,
    comment: 'Máy chấm công nhỏ gọn, lắp đặt nhanh. Phù hợp cho công ty dưới 30 người như bên mình.',
    date: '10/06/2026'
  },
  {
    id: 'rev-oji-k80-1',
    productId: 'con-k80',
    author: 'Bùi Minh Quân (Chủ tiệm trà sữa)',
    rating: 5,
    comment: 'Giấy in dày dặn, bọc bạc kỹ càng nên bảo quản tốt. In ra chữ đen đậm, không bị bụi giấy làm mờ đầu in.',
    date: '11/06/2026'
  },
  {
    id: 'rev-scan-yhd-1',
    productId: 'scn-yhd1100',
    author: 'Lê Thu Trang (Chủ shop quần áo)',
    rating: 5,
    comment: 'Quét mã siêu nhanh, cầm tay nhẹ nhàng. Hàng chính hãng dùng an tâm tuyệt đối.',
    date: '01/06/2026'
  }
];

export function removeVietnameseTones(str: string): string {
  let res = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  res = res.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  res = res.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  res = res.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  res = res.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  res = res.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  res = res.replace(/đ/g, "d");
  res = res.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  res = res.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  res = res.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  res = res.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  res = res.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  res = res.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  res = res.replace(/Đ/g, "D");
  // Normalize combined characters
  res = res.replace(/\u0300|\u0301|\u0309|\u0303|\u0323/g, "");
  res = res.replace(/\u02C6|\u0306|\u031B/g, "");
  return res;
}

export function getAutoTags(comment: string): string[] {
  if (!comment) return [];
  const normalized = removeVietnameseTones(comment.toLowerCase());
  const tags: string[] = [];

  // Rules for 'Thiết bị tốt'
  const qualityKeywords = [
    'tot', 'ben', 'chat luong', 'muot', 'nhay', 'on dinh', 'dep', 'chinh hang', 'xin', 'ngon', 'ok', 'ung y', 'hoan thien', 'cau hinh', 'man hinh', 'pin', 'am thanh', 'loa', 'ket noi', 'cung cap'
  ];
  if (qualityKeywords.some(keyword => normalized.includes(keyword))) {
    tags.push('Thiết bị tốt');
  }

  // Rules for 'Dịch vụ hỗ trợ'
  const serviceKeywords = [
    'ho tro', 'tu van', 'ky thuat', 'nhiet tinh', 'chu dao', 'huong dan', 'phuc vu', 'cham soc', 'nhan vien', 'lap dat', 'cai dat', 'giai thich', 'giai dap', 'than thien', 'tra loi', 'ultraview', 'ultraviewer'
  ];
  if (serviceKeywords.some(keyword => normalized.includes(keyword))) {
    tags.push('Dịch vụ hỗ trợ');
  }

  // Rules for 'Giao hàng nhanh'
  const shippingKeywords = [
    'giao', 'ship', 'nhanh', 'toc hanh', 'hoa toc', 'nhan hang', 'dong goi', 'can than', 'som', 'mau', 'boc hang', 'van chuyen', 'chuyen phat'
  ];
  if (shippingKeywords.some(keyword => normalized.includes(keyword))) {
    tags.push('Giao hàng nhanh');
  }

  return tags;
}
