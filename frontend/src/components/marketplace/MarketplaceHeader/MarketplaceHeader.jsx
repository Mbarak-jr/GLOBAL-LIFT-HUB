import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiUser, FiHeart, FiShoppingCart, FiSearch } from 'react-icons/fi';

const MarketplaceHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-green-700 to-green-600 shadow-lg z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <Link to="/marketplace" className="flex items-center space-x-2">
            <div className="bg-white p-2 rounded-lg shadow-md">
              <FiShoppingBag className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-white text-2xl font-bold tracking-tight">Poverty<span className="text-yellow-300">Alleviate</span></span>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-1">
            <Link 
              to="/marketplace" 
              className="px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-all flex items-center space-x-1"
            >
              <FiShoppingBag className="h-4 w-4" />
              <span>Browse</span>
            </Link>
            <Link 
              to="/marketplace/seller" 
              className="px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-all flex items-center space-x-1"
            >
              <FiUser className="h-4 w-4" />
              <span>Seller Dashboard</span>
            </Link>
            <Link 
              to="/marketplace/orders" 
              className="px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-all flex items-center space-x-1"
            >
              <FiHeart className="h-4 w-4" />
              <span>My Orders</span>
            </Link>
          </nav>

          {/* User Controls */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-64 rounded-full bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <FiSearch className="absolute left-3 top-2.5 text-white/70" />
            </div>
            
            <Link 
              to="/marketplace/cart" 
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all relative"
            >
              <FiShoppingCart className="h-5 w-5 text-white" />
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>
            
            <Link 
              to="/profile" 
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            >
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white font-medium">
                U
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MarketplaceHeader;