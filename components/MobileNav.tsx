import React from 'react';
import { Home, Grid, Search, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden pb-safe">
      <div className="flex justify-around items-center h-16">
        <a href="#" className="flex flex-col items-center justify-center w-full h-full text-primary space-y-1">
          <Home className="h-6 w-6" />
          <span className="text-[10px] font-medium">Home</span>
        </a>
        <a href="#categories" className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-primary space-y-1">
          <Grid className="h-6 w-6" />
          <span className="text-[10px] font-medium">Shops</span>
        </a>
        <a href="#search" className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-primary space-y-1">
          <Search className="h-6 w-6" />
          <span className="text-[10px] font-medium">Search</span>
        </a>
        <a href="#contact" className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-primary space-y-1">
          <User className="h-6 w-6" />
          <span className="text-[10px] font-medium">Admin</span>
        </a>
      </div>
    </div>
  );
};