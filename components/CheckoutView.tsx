
import React, { useState } from 'react';
import { CartItem, OrderInfo } from '../types';
import { ArrowLeft, Trash2, CreditCard, ShoppingBag, User, Phone, MapPin, CheckCircle2, Plus, Minus, ReceiptText, Calendar, Clock, Hash, MessageCircle } from 'lucide-react';

interface CheckoutViewProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onBack: () => void;
  onClear: () => void;
}

const ViberIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 512 512" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M444 49.9C431.3 37.3 414.4 30.1 396.5 30.1l-281 0c-17.9 0-34.8 7.1-47.5 19.8C55.4 62.5 48.3 79.4 48.3 97.3l0 281c0 17.9 7.1 34.8 19.8 47.5 12.7 12.7 29.6 19.8 47.5 19.8l20.4 0c1.7 0 3.1 1.4 3.1 3.1l0 35.8c0 4.1 4.5 6.6 8 4.6l73.5-40.4c0.9-0.5 1.9-0.7 3-0.7l172.7 0c17.9 0 34.8-7.1 47.5-19.8s19.8-29.6 19.8-47.5l0-281C463.7 79.4 456.6 62.5 444 49.9zM375.4 301.6c-4.4 12.4-17.6 19.8-30 15.4l-31.1-11c-6.8-2.4-11.2-8.8-11.2-16l0-21.3c0-1.8-1.5-3.3-3.3-3.3 -14.3 0-25.9-11.6-25.9-25.9 0-1.8-1.5-3.3-3.3-3.3l-21.3 0c-7.2 0-13.6-4.4-16-11.2l-11-31.1c-4.4-12.4 3-25.6 15.4-30l31.1-11c1.5-0.5 3-0.8 4.6-0.8l0 0c9.1 0 17.5 5.5 21 13.8l8 18.9c2.3 5.4 1.8 11.6-1.3 16.5l-10.4 16.3c-1.3 2-1.3 4.5 0.1 6.4 7.6 10.4 17.2 19.3 28.3 26.2 1.9 1.2 4.3 1.1 6.1-0.2l15.1-11.1c5.1-3.7 11.9-4.4 17.7-1.7l19.1 8.8c8.2 3.8 13.3 12.1 13.3 21.1l0 0c0 1.5-0.2 3-0.7 4.4L375.4 301.6zM322 173.8l0 0.1c16.3 7 28.5 22.3 32.2 40.5 0.3 1.7 1.8 2.8 3.5 2.8l15 0c2 0 3.7-1.8 3.5-3.8 -4.6-32.9-29.1-59.5-60.8-67 -1.9-0.4-3.8 1.1-3.8 3l0 17.9C311.6 170.8 316.5 172.5 322 173.8zM286.7 175c4.7 2 8.3 5.9 9.8 10.7 0.5 1.5 1.9 2.5 3.4 2.5l14 0c1.9 0 3.4-1.7 3.1-3.5 -2.4-15.5-13.6-27.5-28.5-30.8 -1.7-0.4-3.4 1-3.4 2.8l0 15.8C285.1 173.6 285.8 174.4 286.7 175z" />
  </svg>
);

// Helper to parse price from strings like "3000 Ks" or "Starting at 200,000 Ks"
const parsePrice = (priceStr: string): number => {
  const matches = priceStr.replace(/,/g, '').match(/\d+/);
  return matches ? parseInt(matches[0]) : 0;
};

const formatPrice = (amount: number): string => {
  return amount.toLocaleString() + " Ks";
};

export const CheckoutView: React.FC<CheckoutViewProps> = ({ cart, onUpdateQuantity, onRemove, onBack, onClear }) => {
  const [form, setForm] = useState<OrderInfo>({ name: '', phone: '', address: '' });
  const [showReceipt, setShowReceipt] = useState(false);
  const [orderMeta, setOrderMeta] = useState({ id: '', date: '', time: '' });

  const grandTotal = cart.reduce((sum, item) => sum + (parsePrice(item.price) * item.quantity), 0);

  const handleBuy = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return alert('ပစ္စည်းအရင်ရွေးပါဦး။');
    
    // Generate order metadata with requested format: YYYYMMDD[AM/PM]-Serial
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = now.getHours();
    const period = hours < 12 ? 'AM' : 'PM';
    
    // Generate a random 2-digit suffix for the "Serial" part since we don't have a DB to track daily counts
    const suffix = Math.floor(Math.random() * 90 + 10); 
    const voucherId = `${year}${month}${day}${period}-${suffix}`;

    setOrderMeta({
      id: voucherId,
      date: now.toLocaleDateString('en-GB'), // DD/MM/YYYY
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
    });
    
    setShowReceipt(true);
  };

  const resetAll = () => {
    onClear();
    onBack();
  };

  if (showReceipt) {
    return (
      <div className="max-w-md mx-auto p-4 animate-fade-in pb-20">
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl overflow-hidden shadow-2xl">
          <div className="bg-slate-900 p-8 text-white text-center relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
            <ReceiptText className="h-12 w-12 mx-auto mb-3 text-primary" />
            <h2 className="text-2xl font-bold font-burmese uppercase tracking-widest">Order Receipt</h2>
            <p className="text-gray-400 text-xs mt-1 font-burmese">တောင်ငူ Online Shop Group</p>
          </div>
          
          <div className="p-8 space-y-6 bg-white">
            {/* Voucher Metadata Bar */}
            <div className="flex justify-between items-center py-3 border-y border-gray-100 mb-2">
              <div className="flex flex-col items-start">
                <span className="text-[9px] font-black text-gray-400 uppercase flex items-center gap-1"><Hash className="h-2.5 w-2.5" /> Voucher No</span>
                <span className="text-xs font-bold text-slate-900">{orderMeta.id}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[9px] font-black text-gray-400 uppercase flex items-center gap-1"><Calendar className="h-2.5 w-2.5" /> Date</span>
                <span className="text-xs font-bold text-slate-900">{orderMeta.date}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-gray-400 uppercase flex items-center gap-1"><Clock className="h-2.5 w-2.5" /> Time</span>
                <span className="text-xs font-bold text-slate-900">{orderMeta.time}</span>
              </div>
            </div>

            {/* Customer Info */}
            <div className="space-y-3">
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-400 text-[10px] font-bold uppercase">Customer</span>
                <span className="font-bold text-gray-900 font-burmese text-sm">{form.name}</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-400 text-[10px] font-bold uppercase">Phone</span>
                <span className="font-bold text-gray-900 text-sm">{form.phone}</span>
              </div>
              <div className="flex justify-between items-start border-b border-gray-50 pb-2">
                <span className="text-gray-400 text-[10px] font-bold uppercase">Address</span>
                <span className="font-bold text-gray-900 text-right font-burmese text-sm max-w-[180px]">{form.address}</span>
              </div>
            </div>

            {/* Items Table */}
            <div>
              <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase mb-3 px-1">
                <span>Items & Quantity</span>
                <span>Amount</span>
              </div>
              <div className="space-y-4">
                {cart.map((item, idx) => {
                  const price = parsePrice(item.price);
                  const subtotal = price * item.quantity;
                  return (
                    <div key={idx} className="flex justify-between items-start animate-fade-in">
                      <div className="flex flex-col">
                        <span className="text-gray-800 font-bold font-burmese text-sm leading-tight">{item.businessName}</span>
                        <span className="text-gray-400 text-[10px] font-medium">
                          {formatPrice(price)} x {item.quantity}
                        </span>
                      </div>
                      <span className="font-bold text-gray-900 font-burmese text-sm">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Total Section */}
            <div className="pt-6 border-t-2 border-slate-100">
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                <span className="text-slate-500 font-bold text-xs uppercase">Grand Total</span>
                <span className="text-2xl font-black text-primary font-burmese">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>

            <div className="text-center space-y-4 pt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold">
                <CheckCircle2 className="h-3 w-3" /> PAID & CONFIRMED
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed font-burmese">
                ဝယ်ယူအားပေးမှုအတွက် အထူးကျေးဇူးတင်ရှိပါသည်။<br/>
                ဤဘောင်ချာအား Screenshot ရိုက်သိမ်းထားပေးပါ။
              </p>

              {/* Viber Order Instruction - Prominent Styling */}
              <a 
                href="viber://chat?number=+95967382800" 
                className="block mt-4 p-4 bg-purple-50 border border-purple-100 rounded-2xl group hover:bg-purple-100 transition-colors"
              >
                <div className="flex items-center justify-center gap-2 text-[#7360f2] mb-1">
                  <ViberIcon className="h-5 w-5 animate-bounce" />
                  <span className="font-black text-[10px] uppercase tracking-widest">Order via Viber</span>
                </div>
                <p className="text-xs font-bold text-purple-900 font-burmese leading-relaxed">
                  ထိုဘောင်ချာအား <span className="underline decoration-wavy decoration-purple-400 underline-offset-4">Viber+95967382800</span> သို့ ပေးပို့မှာယူပါ
                </p>
              </a>
            </div>
          </div>
          
          {/* Decorative Zigzag Bottom */}
          <div className="h-4 bg-white flex overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-50 rotate-45 transform translate-y-2 shrink-0"></div>
            ))}
          </div>
        </div>

        <button 
          onClick={resetAll}
          className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl hover:bg-slate-800 transition-all active:scale-95 font-burmese"
        >
          မူလစာမျက်နှာသို့ ပြန်သွားမည်
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:py-10 pb-24 md:pb-10">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-primary mb-8 font-medium transition-colors group font-burmese">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> ဝယ်ယူခြင်းကို ဆက်လက်လုပ်ဆောင်မည်
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Cart List Column */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2.5 rounded-xl"><ShoppingBag className="text-primary h-6 w-6" /></div>
              <h2 className="text-2xl font-bold text-gray-900 font-burmese">သင့်ဈေးဝယ်လှည်း</h2>
            </div>
            {cart.length > 0 && (
              <button onClick={onClear} className="text-xs font-bold text-red-500 hover:text-red-600 bg-red-50 px-3 py-1.5 rounded-lg transition-colors font-burmese">
                အားလုံးဖျက်မည်
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center border-2 border-dashed border-gray-100 flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="h-10 w-10 text-gray-200" />
              </div>
              <p className="text-gray-400 font-burmese mb-6">ပစ္စည်းများ မရှိသေးပါ။</p>
              <button onClick={onBack} className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-md font-burmese">
                ဈေးဝယ်ထွက်မည်
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, idx) => {
                const priceNum = parsePrice(item.price);
                const subtotal = priceNum * item.quantity;
                
                return (
                  <div key={item.businessId} className="bg-white p-4 rounded-3xl flex flex-col sm:flex-row gap-4 items-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative group">
                    <img src={item.imageUrl} className="w-24 h-24 rounded-2xl object-cover bg-gray-50 shrink-0" alt={item.businessName} />
                    
                    <div className="flex-1 text-center sm:text-left">
                      <h4 className="font-bold text-gray-900 font-burmese text-lg leading-tight mb-1">{item.businessName}</h4>
                      <p className="text-primary font-black font-burmese text-sm">{item.price}</p>
                      <div className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                        Subtotal: <span className="text-slate-900 font-burmese">{formatPrice(subtotal)}</span>
                      </div>
                    </div>

                    <div className="flex items-center bg-gray-50 rounded-2xl p-1.5 border border-gray-100">
                      <button 
                        onClick={() => onUpdateQuantity(item.businessId, -1)}
                        className="p-2 hover:bg-white rounded-xl transition-colors text-gray-500"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 font-bold text-gray-900 w-10 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.businessId, 1)}
                        className="p-2 hover:bg-white rounded-xl transition-colors text-primary"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button 
                      onClick={() => onRemove(item.businessId)} 
                      className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 sm:relative sm:opacity-100 sm:top-auto sm:right-auto"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Form and Summary Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[32px] shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
            
            <div className="flex items-center gap-3 mb-8 relative">
              <div className="bg-blue-50 p-2.5 rounded-xl"><User className="text-blue-500 h-6 w-6" /></div>
              <h2 className="text-2xl font-bold text-gray-900 font-burmese">ပို့ဆောင်မည့်လိပ်စာ</h2>
            </div>

            <form onSubmit={handleBuy} className="space-y-6 relative">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-burmese text-gray-900"
                  placeholder="သင့်အမည်..."
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                <input 
                  required
                  type="tel" 
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all text-gray-900"
                  placeholder="09..."
                  value={form.phone}
                  onChange={e => setForm({...form, phone: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Delivery Address</label>
                <textarea 
                  required
                  rows={3}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-burmese text-gray-900 resize-none"
                  placeholder="မြို့နယ်၊ လမ်း၊ အိမ်နံပါတ်..."
                  value={form.address}
                  onChange={e => setForm({...form, address: e.target.value})}
                />
              </div>

              {/* Order Summary in Sidebar */}
              <div className="pt-6 border-t border-gray-50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500 font-medium">Total Payable:</span>
                  <span className="text-2xl font-black text-primary font-burmese">{formatPrice(grandTotal)}</span>
                </div>
                
                <button 
                  type="submit"
                  disabled={cart.length === 0}
                  className="w-full py-5 rounded-[24px] font-bold text-xl shadow-xl transition-all flex items-center justify-center gap-3 bg-primary text-white hover:bg-orange-600 transform hover:-translate-y-1 active:scale-95 font-burmese disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <CreditCard className="h-6 w-6" />
                  Buy (ဝယ်ယူမည်)
                </button>
              </div>
            </form>
          </div>
          
          <div className="bg-slate-900 p-6 rounded-[24px] text-white flex items-center gap-4">
            <div className="bg-white/10 p-3 rounded-2xl"><CheckCircle2 className="h-6 w-6 text-primary" /></div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Trusted Shopping</p>
              <p className="text-sm font-medium font-burmese">တောင်ငူမြို့တွင်း အမြန်ပို့ဆောင်ပေးပါသည်။</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
