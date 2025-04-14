import React from 'react';

const ItemCard = ({ item, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 hover:shadow-lg"
    >
      <div className="relative">
        <img 
          src={item.images[0]} 
          alt={item.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2 flex space-x-2">
          {item.isFairTrade && (
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
              Fair Trade
            </span>
          )}
          {item.isOrganic && (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
              Organic
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{item.category}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-blue-600">${item.price.toFixed(2)}</span>
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span>{item.rating?.toFixed(1) || 'New'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;