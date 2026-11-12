import { PRODUCTS_DATA } from '../data';
import { Product } from '../types';

export interface ParsedOrderInfo {
  productName: string;
  totalAmount: number;
  quantity: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  matchedProduct?: Product;
}

export function extractPhoneNumbers(text: string): string[] {
  if (!text) return [];
  const matches: string[] = [];
  
  // Match candidate phone patterns starting with 0, +84, or 84 with 7 to 11 digits, allowing optional dots, spaces, or dashes
  const candidateRegex = /(?:\+84|84|0)(?:\s*[\.\-]?\s*\d){7,11}\b/g;
  const rawMatches = text.match(candidateRegex);
  
  if (rawMatches) {
    for (const raw of rawMatches) {
      const cleaned = raw.replace(/[^\d+]/g, '');
      let formatted = cleaned;
      if (cleaned.startsWith('+84')) {
        formatted = '0' + cleaned.slice(3);
      } else if (cleaned.startsWith('84') && cleaned.length >= 10) {
        formatted = '0' + cleaned.slice(2);
      }
      
      if (formatted.length >= 8 && formatted.length <= 11 && formatted.startsWith('0')) {
        matches.push(formatted);
      }
    }
  }
  
  return matches;
}

export function parseOrderDetailsFromText(
  text: string,
  customProducts?: Product[],
  chatHistoryText?: string
): ParsedOrderInfo {
  const allProducts = customProducts && customProducts.length > 0 ? customProducts : PRODUCTS_DATA;
  const lowerText = text.toLowerCase();

  // 1. Detect Phone Number (supporting 8-11 digits, dots, spaces, dashes)
  const matchedPhones = extractPhoneNumbers(text);
  let customerPhone = matchedPhones.length > 0 ? matchedPhones[0] : '';
  if (!customerPhone && chatHistoryText) {
    const historyPhones = extractPhoneNumbers(chatHistoryText);
    if (historyPhones.length > 0) {
      customerPhone = historyPhones[historyPhones.length - 1];
    }
  }

  // 2. Extract Customer Name & Address based on Phone Number position & delimiters
  let customerName = '';
  let customerAddress = '';

  const cleanPunctuation = (s: string) => s.replace(/^[-:,/|.\s]+|[-:,/|.\s]+$/g, '').trim();

  // Explicit label regex checks
  const explicitNameMatch = text.match(/(?:tên\s*là|họ\s*tên|tên:)\s*([A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ\s]{2,25})/i);
  if (explicitNameMatch && explicitNameMatch[1]) {
    customerName = cleanPunctuation(explicitNameMatch[1]);
  }

  const explicitAddrMatch = text.match(/(?:địa\s*chỉ|đc|dc|giao\s*về|giao\s*tới|tại|ở)\s*:?\s*([0-9A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ\s,\.-]{3,80})/i);
  if (explicitAddrMatch && explicitAddrMatch[1]) {
    customerAddress = cleanPunctuation(explicitAddrMatch[1]);
  }

  // Positional extraction around phone number
  if (customerPhone) {
    const phoneIdx = text.indexOf(customerPhone);
    if (phoneIdx !== -1) {
      const beforePhone = cleanPunctuation(text.slice(0, phoneIdx));
      const afterPhone = cleanPunctuation(text.slice(phoneIdx + customerPhone.length));

      const isLikelyName = (s: string) => {
        if (!s) return false;
        if (s.length > 30) return false;
        if (/\d/.test(s)) return false; // names don't contain digits
        const lower = s.toLowerCase();
        if (/^(chốt|mua|lấy|cái|máy|sđt|sdt|địa chỉ|ở|giao|báo giá|đơn|cần|muốn|giao về|gửi)\b/i.test(lower) && s.split(/\s+/).length > 2) return false;
        return true;
      };

      if (!customerName && beforePhone && isLikelyName(beforePhone)) {
        customerName = beforePhone;
      }

      if (!customerAddress && afterPhone) {
        if (!customerName) {
          const parts = afterPhone.split(/[-|,]\s*|\s{2,}/).map(cleanPunctuation).filter(Boolean);
          if (parts.length >= 2 && isLikelyName(parts[0])) {
            customerName = parts[0];
            customerAddress = parts.slice(1).join(', ');
          } else if (parts.length === 1 && isLikelyName(parts[0])) {
            customerName = parts[0];
          } else {
            customerAddress = afterPhone;
          }
        } else {
          customerAddress = afterPhone;
        }
      }

      if (!customerName && beforePhone) {
        const parts = beforePhone.split(/[-|,]\s*|\s{2,}/).map(cleanPunctuation).filter(Boolean);
        if (parts.length >= 1 && isLikelyName(parts[0])) {
          customerName = parts[0];
          if (parts.length > 1 && !customerAddress) {
            customerAddress = parts.slice(1).join(', ');
          }
        }
      }
    }
  }

  // Format final customer name
  if (customerName) {
    const rawClean = customerName.replace(/^(tên|khách|tên là|tên:)\s*/i, '').trim();
    if (rawClean) {
      const capitalized = rawClean.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
      customerName = capitalized.toLowerCase().startsWith('khách') ? capitalized : `Khách ${capitalized}`;
    } else {
      customerName = '';
    }
  }

  if (customerAddress) {
    customerAddress = customerAddress.replace(/^(địa chỉ|đc|dc|giao về|giao tới|ở|tại|địa chỉ:)\s*/i, '').trim();
  }

  // 3. Detect Quantity
  let quantity = 1;
  const qtyMatch = lowerText.match(/(\d+)\s*(cái|chiếc|bộ|thùng|cuộn|máy|món|sp|x)/i);
  if (qtyMatch && qtyMatch[1]) {
    const q = parseInt(qtyMatch[1], 10);
    if (q > 0 && q < 100) {
      quantity = q;
    }
  }

  // 4. Product & Price Identification
  const modelKeywords: { keywords: string[]; productSearchKey: string; fallbackName: string; fallbackPrice: number }[] = [
    { keywords: ['rj1200', '1200'], productSearchKey: 'RJ1200', fallbackName: 'Ronald Jack RJ1200 - Máy chấm công vân tay & thẻ', fallbackPrice: 2450000 },
    { keywords: ['4000tid', '4000-tid', '4000'], productSearchKey: '4000TID', fallbackName: 'Ronald Jack 4000TID-C (Có pin lưu điện)', fallbackPrice: 3500000 },
    { keywords: ['fa113', 'fa-113', 'faceid', 'khuôn mặt'], productSearchKey: 'FA113', fallbackName: 'Gigata FA113 (Nhận diện khuôn mặt FaceID AI)', fallbackPrice: 5800000 },
    { keywords: ['908a', 'wse-908a', 'wise eye'], productSearchKey: '908A', fallbackName: 'Wise Eye WSE-908A', fallbackPrice: 2200000 },
    { keywords: ['k14', 'zkteco k14'], productSearchKey: 'K14', fallbackName: 'ZKTeco K14 - Máy chấm công vân tay giá rẻ', fallbackPrice: 1850000 },
    { keywords: ['x628', 'x628-c'], productSearchKey: 'X628', fallbackName: 'Ronald Jack X628-C', fallbackPrice: 2900000 },
    { keywords: ['420b', 'xp-420b', 'shopee', 'in đơn shopee'], productSearchKey: '420B', fallbackName: 'Máy in đơn hàng Shopee A6 Xprinter XP-420B', fallbackPrice: 2250000 },
    { keywords: ['350b', 'xp-350b'], productSearchKey: '350B', fallbackName: 'Máy in tem nhãn mã vạch Xprinter 350B', fallbackPrice: 1850000 },
    { keywords: ['g500', 'godex g500'], productSearchKey: 'G500', fallbackName: 'Máy in tem nhãn GoDEX G500', fallbackPrice: 3900000 },
    { keywords: ['te200', 'tsc te200'], productSearchKey: 'TE200', fallbackName: 'Máy in mã vạch TSC TE200', fallbackPrice: 3650000 },
    { keywords: ['q200', 'xp-q200'], productSearchKey: 'Q200', fallbackName: 'Máy in bill K80 Xprinter Q200', fallbackPrice: 1350000 },
    { keywords: ['a160m', 'a160'], productSearchKey: 'A160M', fallbackName: 'Máy in hóa đơn Wifi/LAN Xprinter A160M', fallbackPrice: 1650000 },
    { keywords: ['c300h'], productSearchKey: 'C300H', fallbackName: 'Máy in hóa đơn Xprinter C300H', fallbackPrice: 2300000 },
    { keywords: ['58iih', 'k57', 'xp-58'], productSearchKey: '58IIH', fallbackName: 'Máy in hóa đơn K57 Xprinter XP-58IIH', fallbackPrice: 650000 },
    { keywords: ['tm-t82', 'epson t82'], productSearchKey: 'T82', fallbackName: 'Máy in hóa đơn Epson TM-T82III', fallbackPrice: 3800000 },
    { keywords: ['li2208', 'zebra li2208'], productSearchKey: 'LI2208', fallbackName: 'Máy quét mã vạch Zebra LI2208', fallbackPrice: 2100000 },
    { keywords: ['mk7120', 'orbit', 'honeywell'], productSearchKey: '7120', fallbackName: 'Máy quét đa tia Honeywell MK7120', fallbackPrice: 4200000 },
    { keywords: ['2101g', 'xp-2101g'], productSearchKey: '2101G', fallbackName: 'Máy quét mã vạch không dây Xprinter 2101G', fallbackPrice: 1850000 },
    { keywords: ['qw2100', 'datalogic'], productSearchKey: 'QW2100', fallbackName: 'Máy quét mã vạch Datalogic QW2100', fallbackPrice: 1950000 },
    { keywords: ['rt405', 'rt-405', 'két', 'ngăn kéo'], productSearchKey: 'RT405', fallbackName: 'Két thu ngân RT405 Maken', fallbackPrice: 950000 },
    { keywords: ['k80', 'k80x45', 'giấy in bill', 'giấy in nhiệt'], productSearchKey: 'K80', fallbackName: 'Giấy in nhiệt K80x45 bọc bạc (Thùng 50 cuộn)', fallbackPrice: 350000 }
  ];

  let foundName = '';
  let unitPrice = 0;
  let matchedProduct: Product | undefined = undefined;

  // Function to search product by model or text token
  const findProductInCatalog = (searchStr: string) => {
    const sLower = searchStr.toLowerCase();
    
    // Check model keywords
    for (const item of modelKeywords) {
      if (item.keywords.some(kw => sLower.includes(kw))) {
        const p = allProducts.find(prod => 
          prod.name.toLowerCase().includes(item.productSearchKey.toLowerCase()) || 
          prod.id.toLowerCase().includes(item.productSearchKey.toLowerCase())
        );
        if (p) return { name: p.name, price: p.price, product: p };
        return { name: item.fallbackName, price: item.fallbackPrice, product: undefined };
      }
    }

    // Check full product list names
    for (const p of allProducts) {
      if (sLower.includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(sLower)) {
        return { name: p.name, price: p.price, product: p };
      }
    }

    return null;
  };

  // A. Search direct current message text first
  const directMatch = findProductInCatalog(text);
  if (directMatch) {
    foundName = directMatch.name;
    unitPrice = directMatch.price;
    matchedProduct = directMatch.product;
  }

  // B. Search chat history text if not found in current message!
  if (!foundName && chatHistoryText) {
    const historyLower = chatHistoryText.toLowerCase();

    // 1. Look for quotation block e.g. "Sản phẩm: Máy in đơn hàng Xprinter 350B"
    const prodMatch = chatHistoryText.match(/Sản\s*phẩm:\s*([^\n\r]+)/i);
    if (prodMatch && prodMatch[1]) {
      const rawProdStr = prodMatch[1].trim();
      const matchInCat = findProductInCatalog(rawProdStr);
      if (matchInCat) {
        foundName = matchInCat.name;
        unitPrice = matchInCat.price;
        matchedProduct = matchInCat.product;
      } else {
        foundName = rawProdStr;
      }
    }

    // 2. Look for price in quotation block
    const priceMatch = chatHistoryText.match(/(?:TỔNG THANH TOÁN|Đơn giá niêm yết|Đơn giá|Giá):\s*([\d\.\,\s]+)\s*(?:VNĐ|VND|đ)?/i);
    if (priceMatch && priceMatch[1]) {
      const parsedVal = parseInt(priceMatch[1].replace(/[\.\,\s]/g, ''), 10);
      if (parsedVal > 10000) {
        unitPrice = parsedVal;
      }
    }

    // 3. Fallback to model keywords in full chat history
    if (!foundName) {
      const histMatch = findProductInCatalog(chatHistoryText);
      if (histMatch) {
        foundName = histMatch.name;
        if (!unitPrice || unitPrice === 0) unitPrice = histMatch.price;
        matchedProduct = histMatch.product;
      }
    }
  }

  // C. Category fallbacks
  if (!foundName) {
    if (lowerText.includes('chấm công') || lowerText.includes('vân tay')) {
      foundName = 'Ronald Jack RJ1200 - Máy chấm công vân tay & thẻ';
      unitPrice = 2450000;
    } else if (lowerText.includes('in bill') || lowerText.includes('in hóa đơn')) {
      foundName = 'Máy in bill K80 Xprinter Q200';
      unitPrice = 1350000;
    } else if (lowerText.includes('in đơn') || lowerText.includes('in tem')) {
      foundName = 'Máy in đơn hàng Shopee A6 Xprinter XP-420B';
      unitPrice = 2250000;
    } else if (lowerText.includes('quét mã') || lowerText.includes('mã vạch')) {
      foundName = 'Máy quét mã vạch không dây Xprinter 2101G';
      unitPrice = 1850000;
    } else {
      foundName = 'Trọn bộ thiết bị bán hàng / chấm công Solution B A O';
      unitPrice = 2450000;
    }
  }

  // Check if explicit price is mentioned in text (e.g. "2.450.000", "1.850.000", "1tr850")
  const priceRegex = /(\d{1,3}(?:\.\d{3})+|\d{1,2}\s*tr\s*\d{0,3})\s*(đ|vnd|vnđ)?/i;
  const priceMatchText = text.match(priceRegex);
  if (priceMatchText) {
    const rawPrice = priceMatchText[1].toLowerCase().replace(/\./g, '');
    if (rawPrice.includes('tr')) {
      const parts = rawPrice.split('tr');
      const millions = parseInt(parts[0], 10) || 0;
      const thousands = parseInt(parts[1], 10) || 0;
      const parsedPrice = millions * 1000000 + thousands * 1000;
      if (parsedPrice > 10000) unitPrice = parsedPrice;
    } else {
      const parsedPrice = parseInt(rawPrice, 10);
      if (parsedPrice > 10000) unitPrice = parsedPrice;
    }
  }

  const totalAmount = unitPrice * quantity;

  return {
    productName: `${foundName}${quantity > 1 ? ` (${quantity} cái)` : ''}`,
    totalAmount,
    quantity,
    customerName: customerName || 'Khách Chát Trực Tuyến',
    customerPhone,
    customerAddress: customerAddress || 'Tư vấn trực tiếp qua Khung Chat',
    matchedProduct
  };
}
