import React, { useState } from 'react';
import { Business, Category } from '../types';
import { MapPin, Phone, Star, ExternalLink, ImageOff } from 'lucide-react';

interface BusinessCardProps {
  business: Business;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  const [imgError, setImgError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full overflow-hidden">
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
        <div className="absolute top-2 right-2 bg-white/95 px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-800 shadow-sm flex items-center gap-1">
          <Star className="h-3 w-3 text-yellow-500 fill-current" />
          {business.rating}
        </div>
        
        {/* Category Badge */}
        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-medium tracking-wide">
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
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <a 
            href={`tel:${business.phone}`}
            className="flex items-center justify-center gap-1.5 bg-green-50 hover:bg-green-100 text-green-700 py-2.5 rounded-lg border border-green-200 transition-colors font-semibold text-xs"
          >
            <Phone className="h-3.5 w-3.5 fill-current" />
            Call
          </a>
          <a 
            href={business.googleMapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 bg-primary/5 hover:bg-primary/10 text-primary py-2.5 rounded-lg border border-primary/20 transition-colors font-semibold text-xs"
          >
            <MapPin className="h-3.5 w-3.5" />
            Map
          </a>
        </div>
      </div>
    </div>
  );
};