import React from 'react';
import { FiShoppingCart, FiHeart, FiStar, FiMapPin, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

const ItemCard = ({ 
  item, 
  onClick, 
  userRole, 
  onEdit, 
  onDelete,
  onAddToWishlist,
  onAddToCart
}) => {
  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await onDelete();
      toast.success('Item deleted successfully');
    } catch (error) {
      toast.error('Failed to delete item');
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart();
    toast.success('Added to cart!');
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    onAddToWishlist();
    toast.info('Added to wishlist');
  };

  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 relative flex flex-col h-full"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col space-y-2 z-10">
        {item.fairTrade && (
          <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center">
            <FiStar className="mr-1" size={12} />
            Fair Trade
          </span>
        )}
        {item.organic && (
          <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Organic
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="absolute top-3 right-3 flex flex-col space-y-2 z-10">
        {/* Wishlist Button */}
        <button 
          className="p-2 bg-white/90 rounded-full shadow-md hover:bg-red-100 hover:text-red-500 transition-all duration-300 hover:scale-110"
          onClick={handleAddToWishlist}
        >
          <FiHeart className="text-gray-600 group-hover:text-red-500 transition-colors" />
        </button>

        {/* Edit/Delete Buttons for sellers/admins */}
        {(userRole === 'seller' || userRole === 'admin') && (
          <>
            <button 
              className="p-2 bg-white/90 rounded-full shadow-md hover:bg-blue-100 hover:text-blue-500 transition-all duration-300 hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            >
              <FiEdit2 className="text-gray-600 group-hover:text-blue-500 transition-colors" />
            </button>
            <button 
              className="p-2 bg-white/90 rounded-full shadow-md hover:bg-red-100 hover:text-red-500 transition-all duration-300 hover:scale-110"
              onClick={handleDelete}
            >
              <FiTrash2 className="text-gray-600 group-hover:text-red-500 transition-colors" />
            </button>
          </>
        )}
      </div>

      {/* Product Image */}
      <div className="relative overflow-hidden aspect-square">
        <img 
          src={item.images?.[0] || '/placeholder-item.jpg'} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = '/placeholder-item.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Product Info */}
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-2 min-h-[3rem]">
              {item.name}
            </h3>
            <p className="text-gray-500 text-sm flex items-center">
              <FiMapPin className="mr-1" size={14} />
              {item.country}
            </p>
          </div>
          {item.stock <= 5 && item.stock > 0 && (
            <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap">
              Only {item.stock} left
            </span>
          )}
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              {item.originalPrice && (
                <span className="text-gray-400 line-through text-sm mr-2">
                  ${item.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="font-bold text-blue-600 text-xl">
                ${item.price.toFixed(2)}
              </span>
              <span className="text-xs text-gray-500 ml-1">
                {item.unit && `per ${item.unit}`}
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

          {/* Stock Indicator */}
          {item.stock > 0 ? (
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-blue-500 h-1.5 rounded-full" 
                  style={{ width: `${Math.min(100, (item.stock / 10) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {item.stock} available in stock
              </p>
            </div>
          ) : (
            <div className="mb-4">
              <p className="text-xs text-red-500 font-medium">
                Out of stock
              </p>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            disabled={item.stock <= 0}
            className={`w-full py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all active:scale-95 ${
              item.stock > 0 
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:brightness-110'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            onClick={handleAddToCart}
          >
            <FiShoppingCart className="text-lg" />
            <span>{item.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;