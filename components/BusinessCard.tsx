import React, { useState } from 'react';
import { Business, Category } from '../types';
import { MapPin, Phone, Star, ImageOff, Info, X, Download } from 'lucide-react';

interface BusinessCardProps {
  business: Business;
}

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
  const hasDetail = business.detail && business.detail.trim() !== '';

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

          {/* Action Buttons - Optimized for Mobile */}
          <div className="grid grid-cols-4 gap-2 mt-auto">
            {/* Call Button (Width: 1/4) */}
            <a 
              href={`tel:${business.phone}`}
              className="col-span-1 flex items-center justify-center bg-green-50 hover:bg-green-100 text-green-700 py-2.5 rounded-lg border border-green-200 transition-colors"
            >
              <Phone className="h-4 w-4 fill-current" />
            </a>

            {/* Map Button (Width: 1/4) */}
            <a 
              href={business.googleMapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-1 flex items-center justify-center bg-orange-50 hover:bg-orange-100 text-orange-600 py-2.5 rounded-lg border border-orange-200 transition-colors"
            >
              <MapPin className="h-4 w-4" />
            </a>

            {/* Detail Button (Width: 2/4 - Bigger) */}
            <button
              onClick={() => hasDetail ? setShowDetailModal(true) : alert('No details available for this shop.')}
              className={`col-span-2 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border transition-colors font-semibold text-xs
                ${hasDetail 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 shadow-sm' 
                  : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'}`}
            >
              <Info className="h-3.5 w-3.5" />
              Detail
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
              <h3 className="text-lg font-bold text-gray-900 font-burmese">{business.name} Details</h3>
              <button 
                onClick={() => setShowDetailModal(false)}
                className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {business.detail && (business.detail.startsWith('http') || business.detail.startsWith('data:')) ? (
                <div className="space-y-4">
                   <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white">
                      <img 
                        src={business.detail} 
                        alt="Shop Detail" 
                        className="w-full h-auto object-contain"
                      />
                   </div>
                   <p className="text-xs text-gray-500 text-center">Tap image to view full size or zoom.</p>
                </div>
              ) : (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                   <p className="text-gray-800 font-burmese whitespace-pre-line leading-relaxed">
                     {business.detail || "No details available."}
                   </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 bg-white grid grid-cols-2 gap-3">
              <button 
                onClick={() => setShowDetailModal(false)}
                className="w-full py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              
              {/* Only show Download button if it's an image link */}
              {business.detail && business.detail.startsWith('http') && (
                <a 
                  href={business.detail} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  download
                  className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Download className="h-4 w-4" />
                  Save Image
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
