import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  RotateCcw,
  X,
  Phone,
  CheckCircle2,
  User,
  MapPin,
  FileText,
  ShoppingBag,
  MessageSquare,
  Zap,
  ChevronDown,
  ShieldCheck,
  Headphones
} from 'lucide-react';
import { ChatMessage, Product } from '../types';
import { parseOrderDetailsFromText } from '../utils/orderParser';

interface AiChatbotBoxProps {
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  userInput: string;
  setUserInput: (val: string) => void;
  isAiLoading: boolean;
  handleSendAiMessage: (textToSend?: string) => Promise<void>;
  products?: Product[];
  setActiveTab?: (tab: any) => void;
  showToast?: (msg: string) => void;
  mode?: 'embedded' | 'floating'; // embedded = used in Advisor Page, floating = bottom right chat widget
  isOpenFloating?: boolean;
  setIsOpenFloating?: (open: boolean) => void;
}

export const AiChatbotBox: React.FC<AiChatbotBoxProps> = ({
  chatMessages,
  setChatMessages,
  userInput,
  setUserInput,
  isAiLoading,
  handleSendAiMessage,
  products = [],
  setActiveTab,
  showToast,
  mode = 'embedded',
  isOpenFloating = false,
  setIsOpenFloating
}) => {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custAddress, setCustAddress] = useState('');
  const [custNote, setCustNote] = useState('');
  const [custInterestedProduct, setCustInterestedProduct] = useState('');
  const [leadFormError, setLeadFormError] = useState('');
  const [leadSuccessId, setLeadSuccessId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isAiLoading, isLeadFormOpen]);

  // Handle Lead / Order submission from AI Chatbot
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadFormError('');

    const trimmedName = custName.trim();
    const trimmedPhone = custPhone.trim();
    const trimmedAddress = custAddress.trim();
    const trimmedNote = custNote.trim();

    if (!trimmedName || trimmedName.length < 2) {
      setLeadFormError('Vui lòng nhập Họ và Tên hợp lệ (từ 2 ký tự trở lên).');
      return;
    }

    const cleanPhone = trimmedPhone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 9 || cleanPhone.length > 11) {
      setLeadFormError('Số điện thoại không hợp lệ. Vui lòng nhập đúng 10 chữ số.');
      return;
    }

    const leadId = `lead-${Date.now().toString().slice(-6)}`;
    const orderId = `ĐH-${Date.now().toString().slice(-6)}`;
    const dateStr = new Date().toLocaleDateString('vi-VN');
    const timeStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

    const chatHistoryText = chatMessages.slice(-6).map(m => m.content).join('\n');
    const parsedOrder = parseOrderDetailsFromText(
      `${custInterestedProduct || ''} ${trimmedNote || ''}`,
      products,
      chatHistoryText
    );

    const finalProductName = parsedOrder.productName;
    const finalPrice = parsedOrder.totalAmount;

    const selectedProductText = custInterestedProduct
      ? `Sản phẩm quan tâm: ${custInterestedProduct}`
      : `Sản phẩm: ${finalProductName}`;

    const fullContent = `[💬 CHÁT TƯ VẤN TRỰC TIẾP] ${selectedProductText} | Báo giá: ${finalPrice.toLocaleString('vi-VN')}đ. Ghi chú: ${trimmedNote || 'Cần gọi điện giao hàng hỏa tốc.'} | Địa chỉ: ${trimmedAddress || 'Chưa cung cấp'}`;

    const newConsultation = {
      id: leadId,
      name: trimmedName,
      phone: cleanPhone,
      email: `${cleanPhone}@khachhang.solutionbao.vn`,
      address: trimmedAddress,
      content: fullContent,
      status: 'Chưa liên hệ',
      date: `${dateStr} ${timeStr}`,
      source: '💬 Tư Vấn Trực Tuyến'
    };

    const newOrder = {
      id: orderId,
      customerName: trimmedName,
      customerPhone: cleanPhone,
      customerEmail: `${cleanPhone}@khachhang.solutionbao.vn`,
      customerAddress: trimmedAddress || 'Kỹ thuật gọi xác nhận địa chỉ',
      productName: finalProductName,
      totalAmount: finalPrice,
      status: 'Chờ xử lý',
      date: `${dateStr} ${timeStr}`,
      notes: `Ghi chú: ${trimmedNote || 'Khách chốt đơn qua Khung Chát Tư Vấn'}`,
      paymentMethod: 'COD - Thanh toán khi nhận hàng'
    };

    // Save to localStorage under solutionbao_consultations and solutionbao_orders so Admin gets it instantly in both sections
    try {
      // 1. Save Consultation
      const savedConsults = localStorage.getItem('solutionbao_consultations');
      let currentConsults = [];
      if (savedConsults) {
        try { currentConsults = JSON.parse(savedConsults); } catch (e) {}
      }
      currentConsults.unshift(newConsultation);
      localStorage.setItem('solutionbao_consultations', JSON.stringify(currentConsults));

      // 2. Save Order directly to Admin Quản lý Đơn Hàng
      const savedOrders = localStorage.getItem('solutionbao_orders');
      let currentOrders = [];
      if (savedOrders) {
        try { currentOrders = JSON.parse(savedOrders); } catch (e) {}
      }
      if (!Array.isArray(currentOrders)) currentOrders = [];
      currentOrders.unshift(newOrder);
      localStorage.setItem('solutionbao_orders', JSON.stringify(currentOrders));

      // 3. Save system notification for admin
      const savedNotifs = localStorage.getItem('solutionbao_system_notifications');
      let currentNotifs = [];
      if (savedNotifs) {
        try { currentNotifs = JSON.parse(savedNotifs); } catch (e) {}
      }
      currentNotifs.unshift({
        id: `notif-order-${Date.now()}`,
        title: '🛒 ĐƠN HÀNG MỚI TỪ KHUNG TƯ VẤN!',
        message: `Khách hàng ${trimmedName} (SĐT: ${cleanPhone}) vừa chốt đơn hàng #${orderId}: "${finalProductName}" - Giá: ${finalPrice.toLocaleString('vi-VN')}đ.`,
        type: 'order',
        read: false,
        date: `${dateStr} ${timeStr}`
      });
      localStorage.setItem('solutionbao_system_notifications', JSON.stringify(currentNotifs));

      // Dispatch events so all admin tabs update in real-time
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('solutionbao_new_notif'));
    } catch (err) {
      console.error('Error saving consultation and order:', err);
    }

    // Insert confirmation message in chat thread
    const confirmationMsg: ChatMessage = {
      role: 'assistant',
      content: `🎉 ĐÃ TẠO ĐƠN HÀNG XÁC NHẬN BÁO GIÁ THÀNH CÔNG!

--------------------------------------------
ĐƠN HÀNG SOLUTION B A O
• Mã Đơn Hàng: #${orderId}
• Khách Hàng: ${trimmedName}
• Số Điện Thoại: ${cleanPhone}
• Địa Chỉ Giao Hàng: ${trimmedAddress || 'Kỹ thuật gọi xác nhận địa chỉ'}
• Sản Phẩm Đặt Mua: ${finalProductName}
• Giá Tiền Niêm Yết: ${finalPrice > 0 ? finalPrice.toLocaleString('vi-VN') + ' VNĐ' : 'Liên hệ báo giá ưu đãi'}
• Phí Vận Chuyển & Lắp Đặt: MIỄN PHÍ (Nội thành)
• Phần Mềm Tặng Kèm: MIỄN PHÍ VĨNH VIỄN
• Ghi Chú: ${trimmedNote || 'Giao hỏa tốc & cài đặt tận nơi'}
--------------------------------------------

Em Nguyễn Hoàng Anh đã chuyển đơn hàng về bộ phận Kỹ thuật & Kho bãi SOLUTION B A O. Bên em sẽ gọi lại số ${cleanPhone} trong 5 - 10 phút để giao hàng và lắp đặt tận nơi cho Anh/Chị ạ!`
    };

    setChatMessages((prev) => [...prev, confirmationMsg]);
    setIsLeadFormOpen(false);
    setCustName('');
    setCustPhone('');
    setCustAddress('');
    setCustNote('');
    setCustInterestedProduct('');
    setLeadSuccessId(leadId);

    if (showToast) {
      showToast(`Đã gửi thông tin chốt đơn thành công! Mã yêu cầu #${leadId}`);
    }
  };

  const openLeadFormWithAutoDetect = () => {
    if (!custInterestedProduct) {
      const chatHistoryText = chatMessages.slice(-6).map(m => m.content).join('\n');
      const parsed = parseOrderDetailsFromText('', products, chatHistoryText);
      if (parsed.matchedProduct) {
        setCustInterestedProduct(parsed.matchedProduct.name);
      } else if (parsed.productName && !parsed.productName.includes('Trọn bộ thiết bị')) {
        setCustInterestedProduct(parsed.productName);
      }
    }
    setIsLeadFormOpen(true);
  };

  const getDynamicNextPrompts = (messages: ChatMessage[]): string[] => {
    if (!messages || messages.length <= 1) {
      return [
        'Tư vấn máy chấm công vân tay',
        'Báo giá máy in bill K80',
        'Máy in đơn Shopee XP-420B',
        'Két thu ngân RT405 Maken'
      ];
    }

    const recentText = messages.slice(-4).map(m => m.content).join(' ').toLowerCase();

    // 1. Máy chấm công (Ronald Jack, Gigata, K14, FA113, vân tay, khuôn mặt)
    if (recentText.includes('chấm công') || recentText.includes('vân tay') || recentText.includes('khuôn mặt') || recentText.includes('rj1200') || recentText.includes('k14') || recentText.includes('fa113') || recentText.includes('4000tid')) {
      if (recentText.includes('cài đặt') || recentText.includes('phần mềm') || recentText.includes('ultraviewer') || recentText.includes('wifi') || recentText.includes('lan')) {
        return [
          'Chế độ bảo hành 12 tháng & UltraViewer',
          'Giá gồm chi phí lắp đặt tận nơi chưa?',
          'Yêu cầu gọi lại tư vấn hỗ trợ',
          'Chốt đơn máy chấm công này'
        ];
      } else if (recentText.includes('thông số') || recentText.includes('cấu hình') || recentText.includes('chi tiết') || recentText.includes('máy dùng')) {
        return [
          'Hướng dẫn cài đặt & phần mềm chấm công',
          'Chế độ bảo hành & hỗ trợ kỹ thuật',
          'Máy có lưu dữ liệu khi cúp điện không?',
          'Chốt đơn giao hỏa tốc'
        ];
      } else {
        return [
          'Xem thông số kỹ thuật chi tiết',
          'Hướng dẫn cài đặt & phần mềm chấm công',
          'Máy hỗ trợ bao nhiêu vân tay/khuôn mặt?',
          'Chốt đơn máy chấm công giao hỏa tốc'
        ];
      }
    }

    // 2. Máy in bill / hóa đơn K80 (XP-Q200, in bill, cắt giấy)
    if (recentText.includes('in bill') || recentText.includes('hóa đơn') || recentText.includes('k80') || recentText.includes('q200')) {
      if (recentText.includes('cài đặt') || recentText.includes('driver') || recentText.includes('phần mềm') || recentText.includes('pos')) {
        return [
          'Chế độ bảo hành 12 tháng tận nơi',
          'Báo giá cuộn giấy in nhiệt K80 bọc bạc',
          'Chốt đơn máy in bill K80'
        ];
      } else if (recentText.includes('thông số') || recentText.includes('cổng') || recentText.includes('cắt giấy')) {
        return [
          'Hướng dẫn cài driver máy in qua UltraViewer',
          'Máy in kết nối phần mềm bán hàng nào?',
          'Chốt đơn giao hỏa tốc'
        ];
      } else {
        return [
          'Xem thông số kỹ thuật & cổng kết nối',
          'Máy có tự động cắt giấy không?',
          'Hướng dẫn cài driver qua UltraViewer',
          'Chốt đơn máy in bill K80'
        ];
      }
    }

    // 3. Máy in đơn Shopee / TikTok / Mã vạch (XP-420B, XP-350B)
    if (recentText.includes('shopee') || recentText.includes('420b') || recentText.includes('350b') || recentText.includes('mã vạch') || recentText.includes('in đơn') || recentText.includes('tem')) {
      if (recentText.includes('cài đặt') || recentText.includes('driver') || recentText.includes('điện thoại') || recentText.includes('bluetooth')) {
        return [
          'Chế độ bảo hành 12 tháng chính hãng',
          'Báo giá cuộn giấy in đơn A6 (100x150mm)',
          'Chốt đơn máy in XP-420B'
        ];
      } else if (recentText.includes('thông số') || recentText.includes('mực') || recentText.includes('a6') || recentText.includes('khổ')) {
        return [
          'Hướng dẫn cài driver máy tính qua UltraViewer',
          'In đơn từ ứng dụng điện thoại qua WiFi/Bluetooth',
          'Chốt đơn giao hàng hỏa tốc'
        ];
      } else {
        return [
          'Xem thông số kỹ thuật & khổ giấy in A6',
          'Máy có cần mua thêm mực in không?',
          'Hướng dẫn cài driver qua UltraViewer',
          'Chốt đơn máy in XP-420B'
        ];
      }
    }

    // 4. Két thu ngân / đầu đọc mã vạch
    if (recentText.includes('két') || recentText.includes('rt405') || recentText.includes('quét') || recentText.includes('đầu đọc')) {
      return [
        'Xem thông số & kích thước két thu ngân',
        'Két có tự mở khi in bill không?',
        'Hướng dẫn cắm cáp RJ11 vào máy in bill',
        'Chốt đơn két thu ngân RT405'
      ];
    }

    // 5. Giá / Bảo hành / Chốt đơn
    if (recentText.includes('giá') || recentText.includes('báo giá') || recentText.includes('bao nhiêu')) {
      return [
        'Xem thông số kỹ thuật chi tiết',
        'Khuyến mãi & quà tặng phần mềm đi kèm',
        'Chính sách bảo hành 12 tháng tận nơi',
        'Chốt đơn giao hàng hỏa tốc'
      ];
    }

    // Default suggestions
    return [
      'Máy chấm công Ronald Jack RJ1200',
      'Máy in đơn Shopee A6 XP-420B',
      'Máy in bill K80 Xprinter XP-Q200',
      'Két đựng tiền RT405 Maken'
    ];
  };

  const dynamicPrompts = getDynamicNextPrompts(chatMessages);

  return (
    <div className={`flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm text-left ${mode === 'embedded' ? 'h-[620px] w-full' : 'h-[520px] sm:h-[580px] w-full max-w-sm sm:max-w-md shadow-2xl'}`}>
      
      {/* Header */}
      <div className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-sm">
              <Headphones className="w-5 h-5" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-black tracking-wide text-white">
                Nguyễn Hoàng Anh - Tư Vấn
              </h3>
              <span className="px-1.5 py-0.2 bg-emerald-500 text-white text-[9px] font-black rounded uppercase">
                TRỰC TUYẾN
              </span>
            </div>
            <p className="text-[10px] text-slate-300 font-medium">
              SOLUTION B A O Technology
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              setChatMessages([
                {
                  role: 'assistant',
                  content: 'Lịch sử cuộc trò chuyện tư vấn đã được làm mới. Em có thể hỗ trợ thêm thông tin gì về thiết bị chấm công hay máy in hóa đơn cho anh/chị ạ?'
                }
              ]);
            }}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Đặt lại hội thoại"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {mode === 'floating' && setIsOpenFloating && (
            <button
              type="button"
              onClick={() => setIsOpenFloating(false)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Đóng chatbox"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Action Banner inside Chat Header */}
      <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 border-b border-amber-200/50 px-3 py-2 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800">
          <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0 fill-amber-500" />
          <span className="truncate">Cần đặt hàng gấp hoặc nhận báo giá?</span>
        </div>
        <button
          type="button"
          onClick={openLeadFormWithAutoDetect}
          className="px-2.5 py-1 bg-[#CD1818] hover:bg-red-700 text-white font-black text-[10px] uppercase tracking-wider rounded-lg shadow-xs cursor-pointer shrink-0 active:scale-95 transition-all flex items-center gap-1"
        >
          <Sparkles className="w-3 h-3 text-yellow-300" />
          <span>⚡ Chốt Đơn Nhanh</span>
        </button>
      </div>

      {/* Messages Listing */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
        {chatMessages.map((msg, index) => {
          const isUser = msg.role === 'user';
          const isAssistant = !isUser;

          return (
            <div key={index} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-1.5`}>
              <div
                className={`max-w-[88%] rounded-2xl p-3 text-xs leading-relaxed ${
                  isUser
                    ? 'bg-blue-600 text-white shadow-sm font-medium rounded-br-xs'
                    : 'bg-white border border-slate-200 text-slate-800 shadow-xs rounded-bl-xs'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans space-y-1">
                  {msg.content ? msg.content.replace(/\*\*/g, '') : ''}
                </div>
              </div>

              {/* Smart Follow-Up Suggestions directly under Assistant responses */}
              {isAssistant && index === chatMessages.length - 1 && dynamicPrompts && dynamicPrompts.length > 0 && (
                <div className="flex flex-col gap-1.5 pl-1 max-w-[95%] mt-1 animate-fade-in">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                    <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
                    <span>Gợi ý câu hỏi tiếp theo (bấm chọn không cần gõ):</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {dynamicPrompts.map((p, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => handleSendAiMessage(p)}
                        disabled={isAiLoading}
                        className="px-2.5 py-1.5 bg-white hover:bg-blue-50 text-blue-700 hover:text-blue-800 border border-blue-200/80 rounded-xl text-[11px] font-semibold cursor-pointer shadow-2xs transition-all active:scale-95 text-left flex items-center gap-1"
                      >
                        <span>👉 {p}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {isAiLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-500 flex items-center gap-2.5 shadow-xs rounded-bl-xs">
              <div className="flex gap-1 shrink-0">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce delay-200" />
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce delay-300" />
              </div>
              <span className="font-semibold text-slate-600 text-[11px]">Hoàng Anh đang trả lời...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Dynamic Quick Suggestion Pills */}
      <div className="p-2 bg-slate-100/70 border-t border-slate-200 shrink-0 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-1.5">
        <span className="text-[10px] font-bold text-slate-500 shrink-0 flex items-center gap-1 pl-1">
          <MessageSquare className="w-3 h-3 text-blue-600" />
          <span>Gợi ý:</span>
        </span>

        {dynamicPrompts.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendAiMessage(p)}
            className="px-2.5 py-1 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 rounded-full text-[10px] font-bold cursor-pointer shrink-0 transition-colors active:scale-95"
            disabled={isAiLoading}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendAiMessage();
        }}
        className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          placeholder="Nhập sản phẩm hoặc nhu cầu cần tư vấn..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          disabled={isAiLoading}
        />

        <button
          type="submit"
          disabled={!userInput.trim() || isAiLoading}
          className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl shadow cursor-pointer transition-colors shrink-0"
          title="Gửi câu hỏi"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Modal / Form Chốt Đơn AI Inline Overlay */}
      {isLeadFormOpen && (
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs z-30 flex flex-col justify-end sm:justify-center p-3 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92%] flex flex-col text-left">
            <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-amber-400 text-slate-950 rounded-lg">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">
                    Form Chốt Đơn & Tư Vấn Nhanh
                  </h4>
                  <p className="text-[9px] text-slate-300">Lưu dữ liệu trực tiếp vào hệ thống CSKH Admin</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsLeadFormOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleLeadSubmit} className="p-4 space-y-3 overflow-y-auto text-xs">
              {leadFormError && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl font-bold text-[11px]">
                  {leadFormError}
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Họ và Tên Khách Hàng <span className="text-red-500">*</span>:
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    placeholder="VD: Nguyễn Văn Anh"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Số Điện Thoại <span className="text-red-500">*</span>:
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value)}
                    placeholder="VD: 0908555547"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Sản Phẩm Cần Chốt / Báo Giá:
                </label>
                <select
                  value={custInterestedProduct}
                  onChange={(e) => setCustInterestedProduct(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Chọn sản phẩm quan tâm (Tùy chọn) --</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} - {p.price ? p.price.toLocaleString('vi-VN') + 'đ' : 'Báo giá'}
                    </option>
                  ))}
                  <option value="Trọn bộ máy in K80 + Máy chấm công FaceID">
                    Trọn bộ Máy In Bill K80 + Máy Chấm Công FaceID
                  </option>
                  <option value="Trọn bộ máy POS bán hàng + Két thu ngân">
                    Trọn bộ Máy POS Cảm Ứng + Két Đựng Tiền
                  </option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Địa Chỉ Nhận Hàng / Khảo Sát:</label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={custAddress}
                    onChange={(e) => setCustAddress(e.target.value)}
                    placeholder="VD: 355/4E Sư Vạn Hạnh, Q10, TP.HCM"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Ghi Chú Yêu Cầu Cần Hỗ Trợ:</label>
                <textarea
                  rows={2}
                  value={custNote}
                  onChange={(e) => setCustNote(e.target.value)}
                  placeholder="VD: Cần giao ngay trong ngày + cài phần mềm tiếng Việt."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsLeadFormOpen(false)}
                  className="w-1/3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2 bg-[#CD1818] hover:bg-red-700 text-white font-black uppercase tracking-wider rounded-xl shadow transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4 text-yellow-300" />
                  <span>Xác Nhận Chốt Đơn</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
