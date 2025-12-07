import React, { useState } from 'react';
import { Search, Sparkles, Loader2 } from 'lucide-react';
import { searchDirectoryWithAI } from '../services/geminiService';
import { Business } from '../types';

interface HeroProps {
  onSearchResults: (ids: string[] | null, message: string) => void;
  businesses: Business[];
}

export const Hero: React.FC<HeroProps> = ({ onSearchResults, businesses }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      onSearchResults(null, "");
      return;
    }

    setIsSearching(true);
    const result = await searchDirectoryWithAI(query, businesses);
    setIsSearching(false);
    onSearchResults(result.recommendedIds.length > 0 ? result.recommendedIds : [], result.text);
  };

  return (
    <div className="relative bg-orange-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
         <img 
            src="https://images.unsplash.com/photo-1472851294608-415522f96319?q=80&w=1920" 
            alt="Taungoo Shopping Background" 
            className="w-full h-full object-cover"
         />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-900/95 to-orange-800/80"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-28">
        <div className="text-center">
          <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-orange-200 text-xs font-medium mb-4 backdrop-blur-sm border border-white/10">
            Welcome to Taungoo's #1 Shopping Directory
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 font-burmese tracking-tight">
            Taungoo <span className="text-orange-400">Online Shop</span>
          </h1>
          <p className="text-sm md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto font-burmese leading-relaxed">
            Discover the best local shops for Fashion, Mobile Phones, Cosmetics, and Essentials.
          </p>

          <div className="max-w-xl mx-auto relative z-10">
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                {isSearching ? (
                  <Loader2 className="h-5 w-5 text-primary animate-spin" />
                ) : (
                  <Sparkles className="h-5 w-5 text-primary" />
                )}
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-28 py-3.5 rounded-full border-0 ring-4 ring-white/10 focus:ring-primary/50 bg-white text-gray-900 placeholder-gray-400 focus:outline-none text-sm md:text-lg shadow-2xl font-burmese"
                placeholder="Ex: I want to buy iPhone 15..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type="submit"
                disabled={isSearching}
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-primary hover:bg-orange-600 text-white px-4 md:px-6 rounded-full font-medium transition-colors duration-200 flex items-center gap-2 text-sm"
              >
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};