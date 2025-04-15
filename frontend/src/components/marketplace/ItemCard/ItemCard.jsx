import React from 'react';
import { FiShoppingCart, FiHeart, FiStar, FiMapPin } from 'react-icons/fi';

const ItemCard = ({ item, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-transparent hover:-translate-y-1 relative"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col space-y-2 z-10">
        {item.isFairTrade && (
          <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center">
            <FiStar className="mr-1" size={12} />
            Fair Trade
          </span>
        )}
        {item.isOrganic && (
          <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Organic
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button 
        className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-md z-10 hover:bg-red-100 hover:text-red-500 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          // Handle wishlist logic here
        }}
      >
        <FiHeart className="text-gray-600 group-hover:text-red-500" />
      </button>

      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img 
          src={item.images[0]} 
          alt={item.name} 
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-2 min-h-[3rem]">
              {item.name}
            </h3>
            <p className="text-gray-500 text-sm flex items-center">
              <FiMapPin className="mr-1" size={14} />
              {item.originCountry}
            </p>
          </div>
          {item.stock <= 5 && item.stock > 0 && (
            <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap">
              Only {item.stock} left
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-gray-400 line-through text-sm mr-2">
              {item.originalPrice ? `$${item.originalPrice.toFixed(2)}` : ''}
            </span>
            <span className="font-bold text-blue-600 text-xl">
              ${item.price.toFixed(2)}
            </span>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
              <FiStar className="text-yellow-400 mr-1" />
              <span className="font-medium text-gray-700">
                {item.rating?.toFixed(1) || 'New'}
              </span>
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          className="w-full mt-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium flex items-center justify-center space-x-2 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          onClick={(e) => {
            e.stopPropagation();
            // Handle add to cart logic here
          }}
        >
          <FiShoppingCart />
          <span>Add to Cart</span>
        </button>
      </div>

      {/* Stock Indicator */}
      {item.stock > 0 && (
        <div className="px-4 pb-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: `${Math.min(100, (item.stock / 10) * 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {item.stock} available in stock
          </p>
        </div>
      )}
    </div>
  );
};

export default ItemCard;