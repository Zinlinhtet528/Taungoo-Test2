
import React from 'react';
import { Home, Grid, ShoppingCart, User } from 'lucide-react';

interface MobileNavProps {
  activeView: 'shop' | 'checkout';
  setView: (view: 'shop' | 'checkout') => void;
  cartCount: number;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeView, setView, cartCount }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 md:hidden pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
      <div className="flex justify-around items-center h-16">
        <button 
          onClick={() => setView('shop')}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${activeView === 'shop' ? 'text-primary' : 'text-gray-400'}`}
        >
          <Home className="h-6 w-6" />
          <span className="text-[10px] font-bold">Home</span>
        </button>
        
        <a 
          href="#categories" 
          onClick={() => setView('shop')}
          className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-primary space-y-1"
        >
          <Grid className="h-6 w-6" />
          <span className="text-[10px] font-bold">Shops</span>
        </a>

        <button 
          onClick={() => setView('checkout')}
          className={`relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${activeView === 'checkout' ? 'text-primary' : 'text-gray-400'}`}
        >
          <ShoppingCart className="h-6 w-6" />
          {cartCount > 0 && (
            <span className="absolute top-2 right-4 bg-red-500 text-white text-[8px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white">
              {cartCount}
            </span>
          )}
          <span className="text-[10px] font-bold">Checkout</span>
        </button>

        <a href="#contact" className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-primary space-y-1">
          <User className="h-6 w-6" />
          <span className="text-[10px] font-bold">Admin</span>
        </a>
      </div>
    </div>
  );
};
