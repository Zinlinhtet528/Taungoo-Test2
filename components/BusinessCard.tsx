
import React, { useState } from 'react';
import { Business, Category } from '../types';
import { MapPin, Phone, Star, ImageOff, Info, X, Download } from 'lucide-react';

interface BusinessCardProps {
  business: Business;
}

// Custom Viber Icon SVG component - Updated to match official branding silouette
const ViberIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 512 512" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M444 49.9C431.3 37.3 414.4 30.1 396.5 30.1l-281 0c-17.9 0-34.8 7.1-47.5 19.8C55.4 62.5 48.3 79.4 48.3 97.3l0 281c0 17.9 7.1 34.8 19.8 47.5 12.7 12.7 29.6 19.8 47.5 19.8l20.4 0c1.7 0 3.1 1.4 3.1 3.1l0 35.8c0 4.1 4.5 6.6 8 4.6l73.5-40.4c0.9-0.5 1.9-0.7 3-0.7l172.7 0c17.9 0 34.8-7.1 47.5-19.8s19.8-29.6 19.8-47.5l0-281C463.7 79.4 456.6 62.5 444 49.9zM375.4 301.6c-4.4 12.4-17.6 19.8-30 15.4l-31.1-11c-6.8-2.4-11.2-8.8-11.2-16l0-21.3c0-1.8-1.5-3.3-3.3-3.3 -14.3 0-25.9-11.6-25.9-25.9 0-1.8-1.5-3.3-3.3-3.3l-21.3 0c-7.2 0-13.6-4.4-16-11.2l-11-31.1c-4.4-12.4 3-25.6 15.4-30l31.1-11c1.5-0.5 3-0.8 4.6-0.8l0 0c9.1 0 17.5 5.5 21 13.8l8 18.9c2.3 5.4 1.8 11.6-1.3 16.5l-10.4 16.3c-1.3 2-1.3 4.5 0.1 6.4 7.6 10.4 17.2 19.3 28.3 26.2 1.9 1.2 4.3 1.1 6.1-0.2l15.1-11.1c5.1-3.7 11.9-4.4 17.7-1.7l19.1 8.8c8.2 3.8 13.3 12.1 13.3 21.1l0 0c0 1.5-0.2 3-0.7 4.4L375.4 301.6zM322 173.8l0 0.1c16.3 7 28.5 22.3 32.2 40.5 0.3 1.7 1.8 2.8 3.5 2.8l15 0c2 0 3.7-1.8 3.5-3.8 -4.6-32.9-29.1-59.5-60.8-67 -1.9-0.4-3.8 1.1-3.8 3l0 17.9C311.6 170.8 316.5 172.5 322 173.8zM286.7 175c4.7 2 8.3 5.9 9.8 10.7 0.5 1.5 1.9 2.5 3.4 2.5l14 0c1.9 0 3.4-1.7 3.1-3.5 -2.4-15.5-13.6-27.5-28.5-30.8 -1.7-0.4-3.4 1-3.4 2.8l0 15.8C285.1 173.6 285.8 174.4 286.7 175z" />
  </svg>
);

export const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  const [imgError, setImgError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

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
  const hasDetail = (business.detail && business.detail.trim() !== '') || business.description || business.googleMapLink;

  // Clean viber number (remove non-digits for URL)
  const viberLink = `viber://chat?number=${business.viber?.replace(/\D/g, '') || business.phone.replace(/\D/g, '')}`;

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full overflow-hidden relative">
        {/* Price Tag (Top Left) */}
        {business.price && (
          <div className="absolute top-0 left-0 z-20 bg-orange-500 text-white px-3 py-1.5 rounded-br-xl text-xs font-bold shadow-md font-burmese">
            {business.price}
          </div>
        )}

        {/* Image Section */}
        <div className="relative aspect-video sm:h-48 bg-gray-100 overflow-hidden group">
          {hasImage && !imgError ? (
            <>
              {!isLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />
              )}
              <img 
                src={business.imageUrl} 
                alt={business.name} 
                className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                onError={() => setImgError(true)}
                onLoad={() => setIsLoaded(true)}
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </>
          ) : (
            <div className="w-full h-full relative">
              <img 
                src={getFallbackImage(business.category)}
                alt="Fallback"
                className="w-full h-full object-cover opacity-90"
                loading="lazy"
              />
               <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                 <span className="bg-white/90 text-gray-500 text-[10px] px-2 py-1 rounded shadow-sm flex items-center gap-1">
                   <ImageOff className="h-3 w-3" />
                   No Preview
                 </span>
              </div>
            </div>
          )}
          
          {/* Rating Badge */}
          <div className="absolute top-2 right-2 bg-white/95 px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-800 shadow-sm flex items-center gap-1 z-20">
            <Star className="h-3 w-3 text-yellow-500 fill-current" />
            {business.rating}
          </div>
          
          {/* Category Badge */}
          <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-medium tracking-wide z-20">
            {business.category}
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-base font-bold text-gray-900 mb-1 font-burmese leading-tight">{business.name}</h3>
          <p className="text-gray-500 text-xs mb-3 line-clamp-2 font-burmese min-h-[2.5em]">{business.description}</p>
          
          <div className="mt-auto space-y-2 mb-4">
            <div className="flex items-start gap-2 text-xs text-gray-600">
              <MapPin className="h-3.5 w-3.5 mt-0.5 text-primary shrink-0" />
              <span className="font-burmese line-clamp-1">{business.address}</span>
            </div>
          </div>

          {/* Tab-style Action Buttons */}
          <div className="grid grid-cols-3 border-t border-gray-100 pt-3 gap-1">
            {/* Phone Tab */}
            <a 
              href={`tel:${business.phone}`}
              className="flex flex-col items-center justify-center py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors group"
            >
              <Phone className="h-5 w-5 mb-1 fill-current group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-tighter">Phone</span>
            </a>

            {/* Viber Tab - UPDATED REAL VIBER ICON */}
            <a 
              href={viberLink}
              className="flex flex-col items-center justify-center py-2 text-[#7360f2] hover:bg-purple-50 rounded-lg transition-colors group"
            >
              <ViberIcon className="h-5 w-5 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-tighter">Viber</span>
            </a>

            {/* Detail Tab */}
            <button
              onClick={() => hasDetail ? setShowDetailModal(true) : alert('No details available.')}
              className={`flex flex-col items-center justify-center py-2 rounded-lg transition-colors group
                ${hasDetail ? 'text-blue-600 hover:bg-blue-50' : 'text-gray-300 cursor-not-allowed'}`}
            >
              <Info className="h-5 w-5 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-tighter">Detail</span>
            </button>
          </div>
        </div>
      </div>

      {/* DETAIL MODAL OVERLAY */}
      {showDetailModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 font-burmese">{business.name}</h3>
              <button 
                onClick={() => setShowDetailModal(false)}
                className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              
              {/* Promotion Flyer / Detail Image */}
              {business.detail && (business.detail.startsWith('http') || business.detail.startsWith('data:')) ? (
                <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
                  <img 
                    src={business.detail} 
                    alt="Detail/Flyer" 
                    className="w-full h-auto object-contain"
                  />
                  <div className="p-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs text-gray-500 font-medium">Shop Promotion Flyer</span>
                    <a 
                      href={business.detail} 
                      download 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 p-1 flex items-center gap-1 text-xs font-bold"
                    >
                      <Download className="h-3.5 w-3.5" /> Save
                    </a>
                  </div>
                </div>
              ) : (
                business.detail && (
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-gray-800 font-burmese whitespace-pre-line text-sm leading-relaxed italic">
                      {business.detail}
                    </p>
                  </div>
                )
              )}

              {/* Shop Description Area */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">About This Shop</h4>
                <p className="text-gray-800 font-burmese text-sm leading-relaxed">
                  {business.description || "Welcome to our shop! We offer quality products and services in Taungoo."}
                </p>
                <div className="flex items-center gap-2 pt-2 text-xs text-gray-500">
                   <MapPin className="h-3.5 w-3.5 text-primary" />
                   <span className="font-burmese">{business.address}</span>
                </div>
              </div>

              {/* MAP SECTION INSIDE DETAIL */}
              <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 shadow-sm">
                 <div className="flex items-center gap-3 mb-3">
                    <div className="bg-orange-500 p-2 rounded-lg shadow-sm">
                       <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                       <h4 className="text-sm font-bold text-orange-900 font-burmese">Google Maps Location</h4>
                       <p className="text-[10px] text-orange-700 font-medium">Open navigation to find our shop easily.</p>
                    </div>
                 </div>
                 <a 
                   href={business.googleMapLink}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-full bg-white border border-orange-200 text-orange-600 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-orange-100 transition-colors shadow-sm"
                 >
                   <MapPin className="h-4 w-4" />
                   လမ်းညွှန်ကြည့်မည် (View on Map)
                 </a>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <button 
                onClick={() => setShowDetailModal(false)}
                className="w-full py-3 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors text-sm shadow-sm"
              >
                ပိတ်မည် (Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
