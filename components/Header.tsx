
import React from 'react';
import { ShoppingBag, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onHomeClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick, onHomeClick }) => {
  return (
    <header className="bg-white sticky top-0 z-40 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={onHomeClick}>
            <div className="bg-gradient-to-tr from-primary to-orange-400 p-2 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg md:text-xl font-bold text-gray-900 font-burmese leading-none">Taungoo Shop</h1>
              <span className="text-[10px] text-gray-500 font-medium tracking-wide mt-0.5">ONLINE GROUP</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex space-x-6 mr-4">
              <button onClick={onHomeClick} className="text-gray-600 hover:text-primary font-medium text-sm">Home</button>
              <a href="#categories" className="text-gray-600 hover:text-primary font-medium text-sm">Shops</a>
            </nav>
            
            <button 
              onClick={onCartClick}
              className="relative p-2 bg-orange-50 text-primary rounded-xl hover:bg-orange-100 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
