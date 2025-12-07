import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MobileNav } from './components/MobileNav';
import { BusinessCard } from './components/BusinessCard';
import { Business, Category } from './types';
import { fetchBusinesses } from './services/api';
import { Filter, AlertCircle, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.ALL);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [aiMessage, setAiMessage] = useState<string>('');
  const [searchIds, setSearchIds] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const categories = Object.values(Category);

  // Load data from server (or mock fallback) on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await fetchBusinesses();
      setBusinesses(data);
      setFilteredBusinesses(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  // Handle filtering
  useEffect(() => {
    let result = businesses;

    // Filter by Search Results (if active)
    if (searchIds !== null) {
      result = result.filter(b => searchIds.includes(b.id));
    }

    // Filter by Category
    if (selectedCategory !== Category.ALL) {
      result = result.filter(b => b.category === selectedCategory);
    }

    setFilteredBusinesses(result);
  }, [selectedCategory, searchIds, businesses]);

  const handleSearchResults = (ids: string[] | null, message: string) => {
    setSearchIds(ids);
    setAiMessage(message);
    // Reset category filter when performing a new search
    if (ids !== null) {
      setSelectedCategory(Category.ALL);
    }
  };

  const handleCategoryClick = (cat: Category) => {
    setSelectedCategory(cat);
    setSearchIds(null);
    setAiMessage('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
          <p className="text-gray-500 font-medium">Loading directory data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header />
      
      {/* Padding bottom added to prevent content being hidden behind Mobile Nav */}
      <main className="flex-grow pb-20 md:pb-0">
        <div id="search">
          <Hero onSearchResults={handleSearchResults} businesses={businesses} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12" id="categories">
          
          {/* AI Response Message */}
          {aiMessage && (
            <div className="mb-6 p-4 bg-sky-50 border border-sky-100 rounded-xl flex gap-3 items-start animate-fade-in shadow-sm">
              <div className="bg-white p-2 rounded-full shadow-sm shrink-0">
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <h4 className="font-semibold text-sky-900 text-sm uppercase tracking-wider mb-1">AI Recommendation</h4>
                <p className="text-sky-800 font-burmese text-sm leading-relaxed">{aiMessage}</p>
              </div>
            </div>
          )}

          {/* Category Filter - Optimized for Swipe */}
          <div className="sticky top-[64px] z-30 bg-gray-50/95 backdrop-blur-sm py-2 -mx-4 px-4 mb-6 border-b border-gray-200/50 md:static md:bg-transparent md:border-none md:p-0 md:m-0 md:mb-10">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex space-x-2 min-w-max pb-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`
                      px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                      flex items-center gap-2 border whitespace-nowrap
                      ${selectedCategory === cat 
                        ? 'bg-primary text-white border-primary shadow-md transform scale-105' 
                        : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'}
                    `}
                  >
                    {cat === Category.ALL && <Filter className="h-3.5 w-3.5" />}
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="mb-4 md:mb-8 flex items-center justify-between">
             <h2 className="text-xl md:text-2xl font-bold text-gray-800 font-burmese truncate pr-2">
               {searchIds !== null ? 'Search Results' : `${selectedCategory}`}
             </h2>
             <span className="text-gray-500 text-xs md:text-sm font-medium bg-white border border-gray-100 px-2 py-1 rounded-full shadow-sm">
               {filteredBusinesses.length} shops
             </span>
          </div>

          {/* Listings Grid */}
          {filteredBusinesses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300 mx-4 md:mx-0">
              <div className="mx-auto h-12 w-12 text-gray-300 mb-3">
                <AlertCircle className="h-full w-full" />
              </div>
              <h3 className="text-base font-medium text-gray-900">No shops found</h3>
              <p className="mt-1 text-sm text-gray-500 max-w-xs mx-auto">
                Try a different category or search term.
              </p>
              <button 
                onClick={() => { setSearchIds(null); setSelectedCategory(Category.ALL); setAiMessage(''); }}
                className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-medium transition-colors"
              >
                View All Shops
              </button>
            </div>
          )}
        </div>
      </main>
      
      <div id="contact">
        <footer className="bg-gray-900 text-white py-12 mb-16 md:mb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div>
                <h3 className="text-lg font-bold mb-4 font-burmese text-primary">Taungoo Online Shop</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                  Connecting buyers and sellers in Taungoo. Find everything from fashion to daily essentials.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Contact Admin</h3>
                <p className="text-gray-400 text-sm mb-2">Email: info@taungooshopping.com</p>
                <p className="text-gray-400 text-sm">Viber/Phone: 09 123 456 789</p>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-600 text-xs">
              &copy; {new Date().getFullYear()} Taungoo Shopping Group.
            </div>
          </div>
        </footer>
      </div>

      <MobileNav />
    </div>
  );
};

export default App;