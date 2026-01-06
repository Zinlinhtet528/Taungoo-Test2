
import React, { useState } from 'react';
import { CartItem, OrderInfo } from '../types';
import { ArrowLeft, Trash2, CreditCard, ShoppingBag, User, Phone, CheckCircle2, Plus, Minus, ReceiptText, Calendar, Clock, Hash } from 'lucide-react';

interface CheckoutViewProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onBack: () => void;
  onClear: () => void;
}

const ViberIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 512 512" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M444 49.9C431.3 37.3 414.4 30.1 396.5 30.1l-281 0c-17.9 0-34.8 7.1-47.5 19.8C55.4 62.5 48.3 79.4 48.3 97.3l0 281c0 17.9 7.1 34.8 19.8 47.5 12.7 12.7 29.6 19.8 47.5 19.8l20.4 0c1.7 0 3.1 1.4 3.1 3.1l0 35.8c0 4.1 4.5 6.6 8 4.6l73.5-40.4c0.9-0.5 1.9-0.7 3-0.7l172.7 0c17.9 0 34.8-7.1 47.5-19.8s19.8-29.6 19.8-47.5l0-281C463.7 79.4 456.6 62.5 444 49.9zM375.4 301.6c-4.4 12.4-17.6 19.8-30 15.4l-31.1-11c-6.8-2.4-11.2-8.8-11.2-16l0-21.3c0-1.8-1.5-3.3-3.3-3.3 -14.3 0-25.9-11.6-25.9-25.9 0-1.8-1.5-3.3-3.3-3.3l-21.3 0c-7.2 0-13.6-4.4-16-11.2l-11-31.1c-4.4-12.4 3-25.6 15.4-30l31.1-11c1.5-0.5 3-0.8 4.6-0.8l0 0c9.1 0 17.5 5.5 21 13.8l8 18.9c2.3 5.4 1.8 11.6-1.3 16.5l-10.4 16.3c-1.3 2-1.3 4.5 0.1 6.4 7.6 10.4 17.2 19.3 28.3 26.2 1.9 1.2 4.3 1.1 6.1-0.2l15.1-11.1c5.1-3.7 11.9-4.4 17.7-1.7l19.1 8.8c8.2 3.8 13.3 12.1 13.3 21.1l0 0c0 1.5-0.2 3-0.7 4.4L375.4 301.6z" />
  </svg>
);

const parsePrice = (p: string): number => {
  const m = p.replace(/,/g, '').match(/\d+/);
  return m ? parseInt(m[0]) : 0;
};

const formatPrice = (a: number): string => a.toLocaleString() + " Ks";

export const CheckoutView: React.FC<CheckoutViewProps> = ({ cart, onUpdateQuantity, onRemove, onBack, onClear }) => {
  const [form, setForm] = useState<OrderInfo>({ name: '', phone: '', address: '' });
  const [showReceipt, setShowReceipt] = useState(false);
  const [orderMeta, setOrderMeta] = useState({ id: '', date: '', time: '' });

  const grandTotal = cart.reduce((sum, item) => sum + (parsePrice(item.price) * item.quantity), 0);

  const handleBuy = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return alert('ပစ္စည်းအရင်ရွေးပါဦး။');
    
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const h = now.getHours();
    const ampm = h < 12 ? 'AM' : 'PM';
    const serial = Math.floor(Math.random() * 90 + 10);
    const voucherId = `${y}${m}${d}${ampm}-${serial}`;

    setOrderMeta({
      id: voucherId,
      date: now.toLocaleDateString('en-GB'),
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
    });
    setShowReceipt(true);
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

            <div>
              <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase mb-3 px-1">
                <span>Items</span>
                <span>Amount</span>
              </div>
              <div className="space-y-4">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-gray-800 font-bold font-burmese text-sm leading-tight">{item.businessName}</span>
                      <span className="text-gray-400 text-[10px] font-medium">{item.price} x {item.quantity}</span>
                    </div>
                    <span className="font-bold text-gray-900 font-burmese text-sm">{formatPrice(parsePrice(item.price) * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t-2 border-slate-100">
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                <span className="text-slate-500 font-bold text-xs uppercase">Grand Total</span>
                <span className="text-2xl font-black text-primary font-burmese">{formatPrice(grandTotal)}</span>
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

              {/* Prominent Viber Instruction Footer */}
              <div className="mt-6 p-5 bg-purple-600 rounded-3xl text-white shadow-xl shadow-purple-200">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <ViberIcon className="h-6 w-6" />
                  <span className="font-black text-[10px] uppercase tracking-widest opacity-90">ORDER VIA VIBER</span>
                </div>
                <p className="text-sm font-bold font-burmese leading-relaxed">
                  ထိုဘောင်ချာအား <br/>
                  <span className="text-lg underline decoration-white/40 decoration-wavy underline-offset-4">Viber+95967382800</span> <br/>
                  သို့ ပေးပို့မှာယူပါ
                </p>
              </div>
            </div>
          </div>
          
          <div className="h-4 bg-white flex overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-50 rotate-45 transform translate-y-2 shrink-0"></div>
            ))}
          </div>
        </div>

        <button onClick={() => { onClear(); onBack(); }} className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl hover:bg-slate-800 font-burmese">
          မူလစာမျက်နှာသို့ ပြန်သွားမည်
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:py-10 pb-24">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-primary mb-8 font-medium font-burmese">
        <ArrowLeft className="h-4 w-4" /> ဝယ်ယူခြင်းကို ဆက်လက်လုပ်ဆောင်မည်
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2.5 rounded-xl"><ShoppingBag className="text-primary h-6 w-6" /></div>
              <h2 className="text-2xl font-bold text-gray-900 font-burmese">သင့်ဈေးဝယ်လှည်း</h2>
            </div>
            {cart.length > 0 && (
              <button onClick={onClear} className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-lg font-burmese">
                အားလုံးဖျက်မည်
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center border-2 border-dashed border-gray-100 flex flex-col items-center">
              <ShoppingBag className="h-10 w-10 text-gray-200 mb-4" />
              <p className="text-gray-400 font-burmese">ပစ္စည်းများ မရှိသေးပါ။</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.businessId} className="bg-white p-4 rounded-3xl flex gap-4 items-center border border-gray-100 shadow-sm relative">
                  <img src={item.imageUrl} className="w-20 h-20 rounded-2xl object-cover" alt={item.businessName} />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 font-burmese text-lg">{item.businessName}</h4>
                    <p className="text-primary font-bold font-burmese">{item.price}</p>
                  </div>
                  <div className="flex items-center bg-gray-50 rounded-2xl p-1">
                    <button onClick={() => onUpdateQuantity(item.businessId, -1)} className="p-2 hover:bg-white rounded-xl"><Minus className="h-4 w-4" /></button>
                    <span className="px-4 font-bold">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.businessId, 1)} className="p-2 hover:bg-white rounded-xl"><Plus className="h-4 w-4" /></button>
                  </div>
                  <button onClick={() => onRemove(item.businessId)} className="ml-2 text-gray-300 hover:text-red-500"><Trash2 className="h-5 w-5" /></button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[32px] shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 font-burmese mb-8">ပို့ဆောင်မည့်လိပ်စာ</h2>
            <form onSubmit={handleBuy} className="space-y-6">
              <input required className="w-full px-5 py-4 bg-gray-50 border rounded-2xl outline-none font-burmese" placeholder="သင့်အမည်..." value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              <input required type="tel" className="w-full px-5 py-4 bg-gray-50 border rounded-2xl outline-none" placeholder="ဖုန်းနံပါတ်..." value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
              <textarea required rows={3} className="w-full px-5 py-4 bg-gray-50 border rounded-2xl outline-none font-burmese" placeholder="လိပ်စာအပြည့်အစုံ..." value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
              <div className="pt-6 border-t">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500">Total Payable:</span>
                  <span className="text-2xl font-black text-primary font-burmese">{formatPrice(grandTotal)}</span>
                </div>
                <button type="submit" disabled={cart.length === 0} className="w-full py-5 rounded-[24px] font-bold text-xl bg-primary text-white shadow-xl font-burmese disabled:bg-gray-200">
                  <CreditCard className="h-6 w-6 inline mr-2" /> Buy (ဝယ်ယူမည်)
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
