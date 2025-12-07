import React from 'react';
import { ShoppingBag } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white sticky top-0 z-40 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-2.5">
            <div className="bg-gradient-to-tr from-primary to-orange-400 p-2 rounded-xl shadow-sm">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg md:text-xl font-bold text-gray-900 font-burmese leading-none">Taungoo Shop</h1>
              <span className="text-[10px] text-gray-500 font-medium tracking-wide mt-0.5">ONLINE GROUP</span>
            </div>
          </div>

          {/* Desktop Navigation - Hidden on Mobile */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-primary font-medium text-sm">Home</a>
            <a href="#categories" className="text-gray-600 hover:text-primary font-medium text-sm">Shops</a>
            <a href="#contact" className="text-gray-600 hover:text-primary font-medium text-sm">Contact Admin</a>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
               For Sellers
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};