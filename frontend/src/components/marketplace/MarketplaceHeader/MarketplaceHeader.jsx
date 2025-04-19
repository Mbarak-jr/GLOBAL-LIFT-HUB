import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiUser, FiHeart, FiShoppingCart, FiSearch, FiHome } from 'react-icons/fi';

const MarketplaceHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center">
          {/* Logo/Brand with Home Button */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="p-2 rounded-full hover:bg-yellow-400 hover:text-blue-800 transition-all duration-300" title="Home">
              <FiHome className="h-6 w-6 text-white hover:text-blue-800" />
            </Link>
            <Link to="/marketplace" className="flex items-center space-x-2 group transition-all duration-300">
              <div className="bg-white p-2 rounded-full group-hover:rotate-12 transition-transform duration-300 shadow-md group-hover:shadow-lg">
                <FiShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                <span className="text-yellow-300 font-extrabold">Global</span>
                <span className="text-white font-bold"> Marketplace</span>
              </span>
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-1">
            <Link 
              to="/marketplace" 
              className="px-4 py-2 text-white hover:bg-yellow-400 hover:text-blue-800 hover:font-medium hover:shadow-md rounded-lg transition-all duration-300 flex items-center space-x-1"
            >
              <FiShoppingBag className="h-4 w-4" />
              <span>Browse</span>
            </Link>
            <Link 
              to="/marketplace/seller" 
              className="px-4 py-2 text-white hover:bg-yellow-400 hover:text-blue-800 hover:font-medium hover:shadow-md rounded-lg transition-all duration-300 flex items-center space-x-1"
            >
              <FiUser className="h-4 w-4" />
              <span>Seller Dashboard</span>
            </Link>
            <Link 
              to="/marketplace/orders" 
              className="px-4 py-2 text-white hover:bg-yellow-400 hover:text-blue-800 hover:font-medium hover:shadow-md rounded-lg transition-all duration-300 flex items-center space-x-1"
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
                className="pl-10 pr-4 py-2 w-64 rounded-full bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
              />
              <FiSearch className="absolute left-3 top-2.5 text-white/70" />
            </div>
            
            <Link 
              to="/marketplace/cart" 
              className="p-2 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-blue-800 transition-all duration-300 relative"
            >
              <FiShoppingCart className="h-5 w-5 text-white hover:text-blue-800" />
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-blue-800 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>
            
            <Link 
              to="/profile" 
              className="p-2 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-blue-800 transition-all duration-300"
            >
              <div className="h-8 w-8 rounded-full bg-white/20 hover:bg-yellow-400 flex items-center justify-center text-white hover:text-blue-800 font-medium transition-all duration-300">
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