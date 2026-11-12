import React, { useState } from 'react';
import { 
  ArrowLeft, 
  PhoneCall, 
  Sparkles, 
  Check, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Zap, 
  HelpCircle, 
  Users, 
  Star, 
  ShoppingBag,
  ExternalLink,
  Play,
  Video,
  ShieldCheck,
  Truck,
  Headphones,
  Image as ImageIcon
} from 'lucide-react';
import { Product, ElementorLandingPage } from '../types';
import { ZaloIcon } from './ZaloIcon';

interface PublicLandingPageViewProps {
  page: ElementorLandingPage;
  products: Product[];
  onBackToHome: () => void;
  onSubmitLead: (data: { name: string; phone: string; address?: string; note?: string; campaign: string }) => void;
  primaryPhone?: string;
  zaloLink?: string;
}

export const PublicLandingPageView: React.FC<PublicLandingPageViewProps> = ({
  page,
  products,
  onBackToHome,
  onSubmitLead,
  primaryPhone = '0901.234.567',
  zaloLink = 'https://zalo.me'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    onSubmitLead({
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      note: formData.note,
      campaign: page.title
    });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col animate-fade-in text-left">
      {/* 1. TOP STICKY AD BAR */}
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white px-4 py-2.5 flex items-center justify-between shadow-lg">
        <button
          type="button"
          onClick={onBackToHome}
          className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white hover:underline transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về trang chủ</span>
        </button>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${primaryPhone.replace(/[^0-9]/g, '')}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-colors shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Hotline:</span>
            <span>{primaryPhone}</span>
          </a>

          <a
            href={zaloLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0068FF] hover:bg-[#0052cc] text-white font-extrabold text-xs transition-colors shadow-sm"
          >
            <ZaloIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Zalo</span>
          </a>
        </div>
      </header>

      {/* 2. DYNAMIC BLOCKS RENDERER */}
      <main className="flex-1 w-full space-y-0">
        {page.blocks.filter(b => b.isVisible !== false).map((block) => {
          switch (block.type) {
            case 'hero':
              return (
                <section key={block.id} className={`py-16 md:py-24 px-4 md:px-8 bg-gradient-to-br ${block.bgColor || 'from-slate-950 via-slate-900 to-red-950'} text-white overflow-hidden text-center md:text-left`}>
                  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-7 space-y-4">
                      {block.badge && (
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-600 text-white font-black text-xs uppercase tracking-wider shadow-lg border border-red-400">
                          <Flame className="w-4 h-4 fill-yellow-300 text-yellow-300 animate-pulse" />
                          <span>{block.badge}</span>
                        </span>
                      )}
                      <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight text-white drop-shadow-md">
                        {block.title}
                      </h1>
                      <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-xl">
                        {block.subtitle}
                      </p>
                      <div className="pt-3 flex flex-wrap gap-3 justify-center md:justify-start">
                        {block.buttonText && (
                          <a
                            href={block.buttonLink || '#lead-form'}
                            className="px-7 py-3.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-amber-300/40"
                          >
                            <span>{block.buttonText}</span>
                            <Sparkles className="w-4 h-4 text-yellow-300" />
                          </a>
                        )}
                        {block.secondaryButtonText && (
                          <a
                            href={block.secondaryButtonLink || `tel:${primaryPhone.replace(/[^0-9]/g, '')}`}
                            className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm uppercase tracking-wider rounded-xl border border-white/20 backdrop-blur-md transition-all flex items-center gap-2"
                          >
                            <PhoneCall className="w-4 h-4 text-emerald-400" />
                            <span>{block.secondaryButtonText}</span>
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="md:col-span-5 flex justify-center">
                      {block.imageUrl && (
                        <img
                          src={block.imageUrl}
                          alt={block.title}
                          className="rounded-3xl shadow-2xl border-4 border-white/10 max-h-96 w-full object-cover transform hover:scale-102 transition-transform"
                        />
                      )}
                    </div>
                  </div>
                </section>
              );

            case 'countdown':
              return (
                <section key={block.id} className="py-6 px-4 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white shadow-md">
                  <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <div>
                      <h3 className="text-base md:text-lg font-black uppercase tracking-tight flex items-center justify-center md:justify-start gap-2">
                        <Zap className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                        <span>{block.title}</span>
                      </h3>
                      <p className="text-xs text-amber-100 font-medium">{block.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-2 font-mono font-black text-slate-950">
                      <div className="bg-white px-3 py-1.5 rounded-xl shadow text-center">
                        <div className="text-xl text-red-600 leading-none">01</div>
                        <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Ngày</div>
                      </div>
                      <span className="text-white text-xl font-bold">:</span>
                      <div className="bg-white px-3 py-1.5 rounded-xl shadow text-center">
                        <div className="text-xl text-red-600 leading-none">14</div>
                        <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Giờ</div>
                      </div>
                      <span className="text-white text-xl font-bold">:</span>
                      <div className="bg-white px-3 py-1.5 rounded-xl shadow text-center">
                        <div className="text-xl text-red-600 leading-none">38</div>
                        <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Phút</div>
                      </div>
                      <span className="text-white text-xl font-bold">:</span>
                      <div className="bg-white px-3 py-1.5 rounded-xl shadow text-center">
                        <div className="text-xl text-red-600 leading-none animate-pulse">45</div>
                        <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Giây</div>
                      </div>
                    </div>
                  </div>
                </section>
              );

            case 'features':
              return (
                <section key={block.id} className="py-14 px-4 md:px-8 bg-slate-50 text-slate-800">
                  <div className="max-w-6xl mx-auto space-y-8 text-center">
                    <div className="space-y-2 max-w-2xl mx-auto">
                      <h2 className="text-2xl md:text-3xl font-black uppercase text-slate-900 tracking-tight">{block.title}</h2>
                      <p className="text-xs md:text-sm text-slate-500">{block.subtitle}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      {(block.items || []).map((item: any, i: number) => (
                        <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-left space-y-2.5 hover:shadow-md hover:-translate-y-1 transition-all">
                          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                          <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );

            case 'products':
              return (
                <section key={block.id} className="py-14 px-4 md:px-8 bg-white text-slate-800">
                  <div className="max-w-6xl mx-auto space-y-8 text-center">
                    <div className="space-y-2 max-w-2xl mx-auto">
                      <h2 className="text-2xl md:text-3xl font-black uppercase text-slate-900 tracking-tight">{block.title}</h2>
                      <p className="text-xs md:text-sm text-slate-500">{block.subtitle}</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-left">
                      {products.slice(0, 4).map((p) => (
                        <div key={p.id} className="bg-white border border-slate-200 rounded-2xl p-3 shadow-xs hover:shadow-xl hover:scale-[1.03] transition-all flex flex-col justify-between">
                          <div>
                            <div className="h-36 bg-slate-50 rounded-xl p-2 flex items-center justify-center mb-2 overflow-hidden">
                              {p.image ? (
                                <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                              ) : (
                                <div className="text-slate-300 font-bold text-sm">SP</div>
                              )}
                            </div>
                            <span className="text-[9px] font-black text-blue-600 uppercase tracking-wider">{p.categoryLabel}</span>
                            <h4 className="text-xs font-bold text-slate-900 line-clamp-2 h-8">{p.name}</h4>
                          </div>
                          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-xs font-black text-red-600 font-mono">{p.price.toLocaleString('vi-VN')}đ</span>
                            <a href="#lead-form" className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-[10px] uppercase rounded-lg shadow-xs">
                              Đặt Mua
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );

            case 'pricing':
              return (
                <section key={block.id} className="py-16 px-4 md:px-8 bg-slate-900 text-white">
                  <div className="max-w-6xl mx-auto space-y-8 text-center">
                    <div className="space-y-2 max-w-2xl mx-auto">
                      <h2 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tight">{block.title}</h2>
                      <p className="text-xs md:text-sm text-slate-400">{block.subtitle}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                      {(block.items || []).map((tier: any, i: number) => (
                        <div
                          key={i}
                          className={`rounded-3xl p-6 transition-all relative flex flex-col justify-between ${
                            tier.popular
                              ? 'bg-gradient-to-b from-slate-800 to-slate-950 border-2 border-red-500 shadow-2xl scale-105'
                              : 'bg-slate-800/80 border border-slate-700'
                          }`}
                        >
                          {tier.popular && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-red-600 text-white font-black text-[9px] uppercase tracking-wider shadow">
                              GÓI BÁN CHẠY NHẤT
                            </span>
                          )}
                          <div>
                            <h3 className="text-base font-black uppercase text-white tracking-wider">{tier.name}</h3>
                            <div className="my-3 flex items-baseline gap-2">
                              <span className="text-3xl font-black text-red-400 font-mono">{tier.price}</span>
                              {tier.originalPrice && (
                                <span className="text-xs text-slate-500 line-through font-mono">{tier.originalPrice}</span>
                              )}
                            </div>
                            <div className="space-y-2 py-3 border-t border-slate-700/80">
                              {(tier.features || []).map((feat: string, fi: number) => (
                                <div key={fi} className="flex items-center gap-2 text-xs text-slate-300">
                                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                  <span>{feat}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <a
                            href="#lead-form"
                            className={`mt-4 w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider text-center block transition-all shadow ${
                              tier.popular ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-slate-700 hover:bg-slate-600 text-white'
                            }`}
                          >
                            {tier.buttonText || 'Chọn Gói Này'}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );

            case 'testimonials':
              return (
                <section key={block.id} className="py-14 px-4 md:px-8 bg-slate-50 text-slate-800">
                  <div className="max-w-5xl mx-auto space-y-8 text-center">
                    <div className="space-y-2 max-w-2xl mx-auto">
                      <h2 className="text-2xl md:text-3xl font-black uppercase text-slate-900 tracking-tight">{block.title}</h2>
                      <p className="text-xs md:text-sm text-slate-500">{block.subtitle}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                      {(block.items || []).map((item: any, i: number) => (
                        <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                          <div className="flex gap-1 text-amber-400">
                            {[...Array(item.rating || 5)].map((_, si) => (
                              <Star key={si} className="w-4 h-4 fill-amber-400" />
                            ))}
                          </div>
                          <p className="text-xs md:text-sm text-slate-600 italic leading-relaxed">
                            "{item.comment}"
                          </p>
                          <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                            {item.avatar && (
                              <img src={item.avatar} alt={item.name} className="w-9 h-9 rounded-full object-cover" />
                            )}
                            <div>
                              <div className="font-bold text-xs text-slate-900">{item.name}</div>
                              <div className="text-[10px] text-slate-400 font-medium">{item.role}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );

            case 'lead_form':
              return (
                <section key={block.id} className="py-16 px-4 md:px-8 bg-gradient-to-br from-red-600 via-rose-600 to-amber-600 text-white" id="lead-form">
                  <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-2xl text-slate-900 space-y-5 text-center">
                    <div className="space-y-1">
                      <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-black text-[10px] uppercase tracking-wider inline-block">
                        ƯU ĐÃI DÀNH RIÊNG CHO BẠN
                      </span>
                      <h3 className="text-xl md:text-2xl font-black uppercase text-slate-900 tracking-tight">
                        {block.title}
                      </h3>
                      <p className="text-xs text-slate-500">{block.subtitle}</p>
                    </div>

                    {submitted ? (
                      <div className="py-8 space-y-2 text-center animate-fade-in">
                        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center font-bold">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h4 className="font-black text-lg text-slate-900">ĐĂNG KÝ THÀNH CÔNG!</h4>
                        <p className="text-xs text-slate-500 max-w-md mx-auto">
                          Cảm ơn bạn! Chuyên viên tư vấn kỹ thuật sẽ liên hệ lại qua số điện thoại của bạn trong 5 phút để xác nhận ưu đãi.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
                        <div>
                          <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Họ và tên của bạn</label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="VD: Nguyễn Văn Nam"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 text-xs text-slate-800"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Số điện thoại (Bắt buộc)</label>
                            <input
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="VD: 0901.234.567"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 text-xs text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Tỉnh / Thành phố</label>
                            <input
                              type="text"
                              value={formData.address}
                              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                              placeholder="VD: TP. Hồ Chí Minh..."
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 text-xs text-slate-800"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Nhu cầu cụ thể</label>
                          <textarea
                            rows={2}
                            value={formData.note}
                            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                            placeholder="VD: Cần 2 máy in bill K80 và 1 máy POS cho nhà hàng..."
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 text-xs text-slate-800"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs md:text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl active:scale-98 transition-all cursor-pointer"
                        >
                          {block.buttonText || 'GỬI ĐĂNG KÝ NGAY'}
                        </button>
                      </form>
                    )}
                  </div>
                </section>
              );

            case 'faq':
              return (
                <section key={block.id} className="py-14 px-4 md:px-8 bg-white text-slate-800">
                  <div className="max-w-4xl mx-auto space-y-6">
                    <div className="text-center space-y-2">
                      <h2 className="text-2xl md:text-3xl font-black uppercase text-slate-900 tracking-tight">{block.title}</h2>
                      <p className="text-xs md:text-sm text-slate-500">{block.subtitle}</p>
                    </div>
                    <div className="space-y-3">
                      {(block.items || []).map((faq: any, i: number) => (
                        <div key={i} className="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 space-y-1.5 text-left">
                          <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                            <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                            <span>{faq.q}</span>
                          </h4>
                          <p className="text-xs text-slate-600 pl-6 leading-relaxed">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );

            case 'video':
              return (
                <section key={block.id} className="py-16 px-4 md:px-8 bg-slate-950 text-white">
                  <div className="max-w-4xl mx-auto space-y-6 text-center">
                    <div className="space-y-2">
                      {block.badge && (
                        <span className="px-3 py-1 rounded-full bg-red-600/90 text-white font-black text-xs uppercase tracking-wider inline-block">
                          {block.badge}
                        </span>
                      )}
                      <h2 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tight">{block.title || 'VIDEO TRẢI NGHIỆM THỰC TẾ'}</h2>
                      <p className="text-xs md:text-sm text-slate-400 max-w-xl mx-auto">{block.subtitle || 'Xem cận cảnh quá trình vận hành, tốc độ in và độ sắc nét thực tế của thiết bị'}</p>
                    </div>
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-800 bg-slate-900 aspect-video max-w-3xl mx-auto">
                      {block.videoUrl && (block.videoUrl.includes('youtube.com') || block.videoUrl.includes('youtu.be')) ? (
                        <iframe
                          src={block.videoUrl.includes('watch?v=') 
                            ? block.videoUrl.replace('watch?v=', 'embed/') 
                            : block.videoUrl.includes('youtu.be/')
                            ? `https://www.youtube.com/embed/${block.videoUrl.split('youtu.be/')[1]}`
                            : block.videoUrl
                          }
                          title={block.title || 'Video quảng cáo'}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-slate-900 via-slate-800 to-red-950 p-6 text-center">
                          <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg mb-3">
                            <Play className="w-8 h-8 fill-white ml-1" />
                          </div>
                          <h4 className="font-bold text-sm text-white">Video Thuyết Minh & Trải Nghiệm Thực Tế</h4>
                          <p className="text-xs text-slate-400 max-w-md mt-1">Được ghi hình trực tiếp tại trung tâm kỹ thuật Solution Bảo</p>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              );

            case 'gallery':
              return (
                <section key={block.id} className="py-16 px-4 md:px-8 bg-slate-50 text-slate-800">
                  <div className="max-w-6xl mx-auto space-y-8 text-center">
                    <div className="space-y-2 max-w-2xl mx-auto">
                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-black text-xs uppercase tracking-wider inline-block">
                        HÌNH ẢNH THỰC TẾ
                      </span>
                      <h2 className="text-2xl md:text-3xl font-black uppercase text-slate-900 tracking-tight">{block.title || 'DỰ ÁN & CỬA HÀNG ĐÃ LẮP ĐẶT'}</h2>
                      <p className="text-xs md:text-sm text-slate-500">{block.subtitle || 'Một số hình ảnh bàn giao thiết bị thực tế tại các điểm kinh doanh trên toàn quốc'}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {(block.items && block.items.length > 0 ? block.items : [
                        { url: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80', caption: 'Lắp đặt chuỗi siêu thị' },
                        { url: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=600&q=80', caption: 'Bộ máy POS nhà hàng' },
                        { url: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=600&q=80', caption: 'Máy in bill quán cafe' },
                        { url: 'https://images.unsplash.com/photo-1556742208-999815fca738?auto=format&fit=crop&w=600&q=80', caption: 'Két tiền và máy quét mã vạch' }
                      ]).map((imgItem: any, idx: number) => (
                        <div key={idx} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all aspect-4/3 bg-slate-200">
                          <img 
                            src={typeof imgItem === 'string' ? imgItem : imgItem.url} 
                            alt={imgItem.caption || 'Thực tế lắp đặt'} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                            <span className="text-white text-xs font-bold">{imgItem.caption || `Dự án thực tế #${idx + 1}`}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );

            case 'cta_banner':
              return (
                <section key={block.id} className={`py-12 px-4 md:px-8 bg-gradient-to-r ${block.bgColor || 'from-red-600 via-rose-600 to-amber-600'} text-white`}>
                  <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                    <div className="space-y-2">
                      {block.badge && (
                        <span className="px-3 py-0.5 rounded-full bg-white/20 text-white font-black text-xs uppercase tracking-wider inline-block">
                          {block.badge}
                        </span>
                      )}
                      <h3 className="text-xl md:text-3xl font-black uppercase tracking-tight">{block.title || 'ƯU ĐÃI CHỈ ÁP DỤNG TRONG HÔM NAY!'}</h3>
                      <p className="text-xs md:text-sm text-white/90 max-w-xl">{block.subtitle || 'Liên hệ ngay để nhận chiết khấu trực tiếp và gói quà tặng giấy in trị giá 500.000đ'}</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                      <a
                        href={`tel:${primaryPhone.replace(/[^0-9]/g, '')}`}
                        className="px-5 py-3 rounded-2xl bg-white text-red-600 font-black text-xs md:text-sm uppercase tracking-wider shadow-lg hover:bg-slate-100 active:scale-95 transition-all flex items-center gap-2"
                      >
                        <PhoneCall className="w-4 h-4 text-red-600 animate-bounce" />
                        <span>Gọi: {primaryPhone}</span>
                      </a>
                      <a
                        href={zaloLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3 rounded-2xl bg-[#0068FF] text-white font-black text-xs md:text-sm uppercase tracking-wider shadow-lg hover:bg-[#0052cc] active:scale-95 transition-all flex items-center gap-2"
                      >
                        <ZaloIcon className="w-4 h-4" />
                        <span>Chat Zalo Báo Giá</span>
                      </a>
                    </div>
                  </div>
                </section>
              );

            default:
              return null;
          }
        })}
      </main>

      {/* 3. FOOTER */}
      <footer className="py-8 px-4 bg-slate-950 text-slate-400 text-center text-xs border-t border-slate-800 space-y-2">
        <p className="font-bold text-white">SOLUTION B A O TECHNOLOGY - PHÂN PHỐI THIẾT BỊ BÁN HÀNG & CHẤM CÔNG CHÍNH HÃNG</p>
        <p>Hotline hỗ trợ kỹ thuật và bảo hành: <span className="text-amber-400 font-mono font-bold">{primaryPhone}</span></p>
        <p className="text-slate-600 text-[10px]">© 2026 Bản quyền thuộc về SOLUTION B A O. Tất cả các quyền được bảo lưu.</p>
      </footer>
    </div>
  );
};
