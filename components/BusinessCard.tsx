
import React, { useState } from 'react';
import { Business, Category, CartItem } from '../types';
import { MapPin, Phone, Star, ImageOff, Info, X, Download, ShoppingCart, Check } from 'lucide-react';

interface BusinessCardProps {
  business: Business;
  // Fix: changed onAddToCart parameter type to Omit<CartItem, 'quantity'> to match App.tsx implementation
  onAddToCart: (item: Omit<CartItem, 'quantity'>) => void;
}

const ViberIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 512 512" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M444 49.9C431.3 37.3 414.4 30.1 396.5 30.1l-281 0c-17.9 0-34.8 7.1-47.5 19.8C55.4 62.5 48.3 79.4 48.3 97.3l0 281c0 17.9 7.1 34.8 19.8 47.5 12.7 12.7 29.6 19.8 47.5 19.8l20.4 0c1.7 0 3.1 1.4 3.1 3.1l0 35.8c0 4.1 4.5 6.6 8 4.6l73.5-40.4c0.9-0.5 1.9-0.7 3-0.7l172.7 0c17.9 0 34.8-7.1 47.5-19.8s19.8-29.6 19.8-47.5l0-281C463.7 79.4 456.6 62.5 444 49.9zM375.4 301.6c-4.4 12.4-17.6 19.8-30 15.4l-31.1-11c-6.8-2.4-11.2-8.8-11.2-16l0-21.3c0-1.8-1.5-3.3-3.3-3.3 -14.3 0-25.9-11.6-25.9-25.9 0-1.8-1.5-3.3-3.3-3.3l-21.3 0c-7.2 0-13.6-4.4-16-11.2l-11-31.1c-4.4-12.4 3-25.6 15.4-30l31.1-11c1.5-0.5 3-0.8 4.6-0.8l0 0c9.1 0 17.5 5.5 21 13.8l8 18.9c2.3 5.4 1.8 11.6-1.3 16.5l-10.4 16.3c-1.3 2-1.3 4.5 0.1 6.4 7.6 10.4 17.2 19.3 28.3 26.2 1.9 1.2 4.3 1.1 6.1-0.2l15.1-11.1c5.1-3.7 11.9-4.4 17.7-1.7l19.1 8.8c8.2 3.8 13.3 12.1 13.3 21.1l0 0c0 1.5-0.2 3-0.7 4.4L375.4 301.6zM322 173.8l0 0.1c16.3 7 28.5 22.3 32.2 40.5 0.3 1.7 1.8 2.8 3.5 2.8l15 0c2 0 3.7-1.8 3.5-3.8 -4.6-32.9-29.1-59.5-60.8-67 -1.9-0.4-3.8 1.1-3.8 3l0 17.9C311.6 170.8 316.5 172.5 322 173.8zM286.7 175c4.7 2 8.3 5.9 9.8 10.7 0.5 1.5 1.9 2.5 3.4 2.5l14 0c1.9 0 3.4-1.7 3.1-3.5 -2.4-15.5-13.6-27.5-28.5-30.8 -1.7-0.4-3.4 1-3.4 2.8l0 15.8C285.1 173.6 285.8 174.4 286.7 175z" />
  </svg>
);

export const BusinessCard: React.FC<BusinessCardProps> = ({ business, onAddToCart }) => {
  const [imgError, setImgError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart({
      businessId: business.id,
      businessName: business.name,
      price: business.price || 'Price TBA',
      imageUrl: business.imageUrl
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const getFallbackImage = (category: Category) => {
    switch (category) {
      case Category.RESTAURANT: return 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80';
      case Category.MOBILE: return 'https://images.unsplash.com/photo-1598327105666-5b89351aff70?w=500&q=80';
      case Category.ELECTRONICS: return 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&q=80';
      case Category.COSMETICS: return 'https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?w=500&q=80';
      case Category.FASHION: return 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80';
      case Category.BABY: return 'https://images.unsplash.com/photo-1515488042361-25f4682ae2ed?w=500&q=80';
      case Category.ESSENTIALS: return 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500&q=80';
      case Category.FURNITURE: return 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80';
      default: return 'https://images.unsplash.com/photo-1472851294608-415522f96319?w=500&q=80';
    }
  };

  const hasImage = business.imageUrl && business.imageUrl.trim() !== '';
  const viberLink = `viber://chat?number=${business.viber?.replace(/\D/g, '') || business.phone.replace(/\D/g, '')}`;

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full overflow-hidden relative">
        {business.price && (
          <div className="absolute top-0 left-0 z-20 bg-orange-500 text-white px-3 py-1.5 rounded-br-xl text-xs font-bold shadow-md font-burmese">
            {business.price}
          </div>
        )}

        <div className="relative aspect-video sm:h-48 bg-gray-100 overflow-hidden group">
          {hasImage && !imgError ? (
            <>
              {!isLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />}
              <img 
                src={business.imageUrl} 
                alt={business.name} 
                className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                onError={() => setImgError(true)}
                onLoad={() => setIsLoaded(true)}
                referrerPolicy="no-referrer"
              />
            </>
          ) : (
            <img src={getFallbackImage(business.category)} alt="Fallback" className="w-full h-full object-cover opacity-90" />
          )}
          <div className="absolute top-2 right-2 bg-white/95 px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-800 shadow-sm flex items-center gap-1 z-20">
            <Star className="h-3 w-3 text-yellow-500 fill-current" />
            {business.rating}
          </div>
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-base font-bold text-gray-900 mb-1 font-burmese leading-tight">{business.name}</h3>
          <p className="text-gray-500 text-xs mb-3 line-clamp-2 font-burmese min-h-[2.5em]">{business.description}</p>
          
          <div className="grid grid-cols-3 border-t border-gray-100 pt-3 gap-1">
            <a href={`tel:${business.phone}`} className="flex flex-col items-center justify-center py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors group">
              <Phone className="h-5 w-5 mb-1 fill-current group-hover:scale-110" />
              <span className="text-[10px] font-bold uppercase tracking-tighter">Phone</span>
            </a>
            <a href={viberLink} className="flex flex-col items-center justify-center py-2 text-[#7360f2] hover:bg-purple-50 rounded-lg transition-colors group">
              <ViberIcon className="h-5 w-5 mb-1 group-hover:scale-110" />
              <span className="text-[10px] font-bold uppercase tracking-tighter">Viber</span>
            </a>
            <button onClick={() => setShowDetailModal(true)} className="flex flex-col items-center justify-center py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group">
              <Info className="h-5 w-5 mb-1 group-hover:scale-110" />
              <span className="text-[10px] font-bold uppercase tracking-tighter">Detail</span>
            </button>
          </div>
        </div>
      </div>

      {showDetailModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 font-burmese">{business.name}</h3>
              <button onClick={() => setShowDetailModal(false)} className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full">
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {business.detail && (
                <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
                  <img src={business.detail} alt="Flyer" className="w-full h-auto" />
                </div>
              )}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-gray-800 font-burmese text-sm leading-relaxed">{business.description}</p>
                <div className="flex items-center gap-2 pt-2 text-xs text-gray-500">
                   <MapPin className="h-3.5 w-3.5 text-primary" />
                   <span className="font-burmese">{business.address}</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-white space-y-2">
              <button 
                onClick={handleAddToCart}
                className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all shadow-sm
                  ${isAdded ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-orange-600'}`}
              >
                {isAdded ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
                {isAdded ? 'ထည့်ပြီးပါပြီ' : 'ဈေးဝယ်ခြင်းထည့်ရန်'}
              </button>
              <button onClick={() => setShowDetailModal(false)} className="w-full py-2 rounded-xl text-gray-500 font-medium text-sm">
                ပိတ်မည်
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
