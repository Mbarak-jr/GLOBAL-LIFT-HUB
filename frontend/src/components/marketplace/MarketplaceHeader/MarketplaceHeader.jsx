import React from 'react';
import { Link } from 'react-router-dom';

const MarketplaceHeader = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/marketplace" className="text-2xl font-bold text-blue-600">
          PovertyAlleviate
        </Link>
        <nav className="flex space-x-6">
          <Link to="/marketplace" className="text-gray-700 hover:text-blue-600">
            Browse
          </Link>
          <Link to="/marketplace/seller" className="text-gray-700 hover:text-blue-600">
            Seller Dashboard
          </Link>
          <Link to="/marketplace/orders" className="text-gray-700 hover:text-blue-600">
            My Orders
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default MarketplaceHeader;