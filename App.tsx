
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MobileNav } from './components/MobileNav';
import { BusinessCard } from './components/BusinessCard';
import { CheckoutView } from './components/CheckoutView';
import { Business, Category, CartItem } from './types';
import { fetchBusinesses } from './services/api';
import { Filter, AlertCircle, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.ALL);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [aiMessage, setAiMessage] = useState<string>('');
  const [searchIds, setSearchIds] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [view, setView] = useState<'shop' | 'checkout'>('shop');

  const categories = Object.values(Category);

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

  useEffect(() => {
    let result = businesses;
    if (searchIds !== null) result = result.filter(b => searchIds.includes(b.id));
    if (selectedCategory !== Category.ALL) result = result.filter(b => b.category === selectedCategory);
    setFilteredBusinesses(result);
  }, [selectedCategory, searchIds, businesses]);

  const handleSearchResults = (ids: string[] | null, message: string) => {
    setSearchIds(ids);
    setAiMessage(message);
    if (ids !== null) setSelectedCategory(Category.ALL);
    setView('shop');
  };

  const handleAddToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existing = prev.find(i => i.businessId === item.businessId);
      if (existing) {
        return prev.map(i => i.businessId === item.businessId ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (businessId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.businessId === businessId) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (businessId: string) => {
    setCart(prev => prev.filter(i => i.businessId !== businessId));
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
      <Header cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)} onCartClick={() => setView('checkout')} onHomeClick={() => setView('shop')} />
      
      <main className="flex-grow pb-20 md:pb-0">
        {view === 'checkout' ? (
          <CheckoutView 
            cart={cart} 
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart} 
            onBack={() => setView('shop')} 
            onClear={() => setCart([])} 
          />
        ) : (
          <>
            <div id="search">
              <Hero onSearchResults={handleSearchResults} businesses={businesses} />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12" id="categories">
              {aiMessage && (
                <div className="mb-6 p-4 bg-sky-50 border border-sky-100 rounded-xl flex gap-3 items-start shadow-sm">
                  <div className="bg-white p-2 rounded-full shadow-sm shrink-0"><span>🤖</span></div>
                  <div>
                    <h4 className="font-semibold text-sky-900 text-sm uppercase tracking-wider mb-1">AI Recommendation</h4>
                    <p className="text-sky-800 font-burmese text-sm leading-relaxed">{aiMessage}</p>
                  </div>
                </div>
              )}

              <div className="sticky top-[64px] z-30 bg-gray-50/95 backdrop-blur-sm py-2 -mx-4 px-4 mb-6 border-b border-gray-200/50 md:static">
                <div className="overflow-x-auto scrollbar-hide">
                  <div className="flex space-x-2 min-w-max pb-1">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => { setSelectedCategory(cat); setSearchIds(null); setAiMessage(''); }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all border whitespace-nowrap
                          ${selectedCategory === cat ? 'bg-primary text-white border-primary shadow-md transform scale-105' : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'}`}
                      >
                        {cat === Category.ALL && <Filter className="h-3.5 w-3.5 inline mr-1" />}
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBusinesses.map((business) => (
                  <BusinessCard key={business.id} business={business} onAddToCart={handleAddToCart} />
                ))}
              </div>
            </div>
          </>
        )}
      </main>
      <MobileNav activeView={view} setView={setView} cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)} />
    </div>
  );
};

export default App;
