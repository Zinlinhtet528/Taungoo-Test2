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
      case Category.RESTAURANT:
        return 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80';
      case Category.MOBILE:
        return 'https://images.unsplash.com/photo-1598327105666-5b89351aff70?w=500&q=80';
      case Category.ELECTRONICS:
        return 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&q=80';
      case Category.COSMETICS:
        return 'https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?w=500&q=80';
      case Category.FASHION:
        return 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80';
      case Category.BABY:
        return 'https://images.unsplash.com/photo-1515488042361-25f4682ae2ed?w=500&q=80';
      case Category.ESSENTIALS:
        return 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500&q=80';
      case Category.FURNITURE:
        return 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80';
      default:
        return 'https://images.unsplash.com/photo-1472851294608-415522f96319?w=500&q=80';
    }
  };

  const hasImage = business.imageUrl && business.imageUrl.trim() !== '';

  const imageSrc = !hasImage || imgError ? getFallbackImage(business.category) : business.imageUrl;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100 flex flex-col h-full overflow-hidden">
      {/* Image Section */}
      <div className="relative aspect-video bg-gray-100 overflow-hidden group">
        {hasImage && !imgError ? (
          <>
            {!isLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />
            )}
            <img
              src={imageSrc}
              alt={business.name}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onError={() => setImgError(true)}
              onLoad={() => setIsLoaded(true)}
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
            <div className="bg-gray-200 rounded-full p-3">
              <ImageOff className="h-6 w-6" />
            </div>
            <span className="text-xs font-medium">No image available</span>
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-white/95 px-1.5 py-0.5 rounded-full text-[11px] font-bold text-gray-800 shadow-sm flex items-center gap-1">
          <Star className="h-3 w-3 text-yellow-500 fill-current" />
          {business.rating}
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-0.5 rounded text-[10px] font-medium tracking-wide">
          {business.category}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-base font-bold text-gray-900 mb-1 font-burmese leading-tight">
          {business.name}
        </h3>

        <p className="text-gray-500 text-xs mb-1 line-clamp-2 font-burmese min-h-[2.5em]">
          {business.description}
        </p>

        {business.price && (
          <p className="text-xs font-semibold text-emerald-600 mb-2 font-burmese">
            💰 စျေးနှုန်း: {business.price}
          </p>
      {business.itemCode && (
  <p className="text-xs text-blue-700 font-medium mb-2 font-burmese">
    🏷 Item Code : {business.itemCode}
  </p>

        )}

        <div className="mt-auto space-y-2 mb-4">
          <div className="flex items-start gap-2 text-xs text-gray-600">
            <MapPin className="h-3.5 w-3.5 mt-0.5 text-primary shrink-0" />
            <span className="font-burmese line-clamp-1">{business.address}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <a
            href={`tel:${business.phone}`}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-primary/60 text-primary text-xs font-semibold hover:bg-primary hover:text-white transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            Call
          </a>
          <a
            href={business.googleMapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-primary/20 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <MapPin className="h-3.5 w-3.5" />
            Map
          </a>
  
  <a
    href={`viber://chat?number=${business.viber.replace(/^0/, "95")}`}
    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-purple-500 text-purple-600 text-xs font-semibold hover:bg-purple-500 hover:text-white transition-colors"
  >
    💜 Viber
  </a>

        </div>
      </div>
    </div>
  );
};
