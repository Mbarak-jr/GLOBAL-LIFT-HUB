import React from 'react';
import { 
  FiFilter, 
  FiX, 
  FiDollarSign, 
  FiGlobe, 
  FiStar, 
  FiRefreshCw,
  FiSearch,
  FiChevronDown
} from 'react-icons/fi';

const Filters = ({ filters, categories = [], countries = [], onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onFilterChange({
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 mt-16 sticky top-4 z-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg flex items-center">
          <FiFilter className="mr-2 text-blue-600" />
          Filters
        </h2>
        <button
          onClick={() => onFilterChange({
            category: '',
            search: '',
            minPrice: '',
            maxPrice: '',
            country: '',
            fairTrade: false,
            organic: false,
            sort: 'newest',
            page: 1,
          })}
          className="text-sm flex items-center text-gray-500 hover:text-blue-600 transition"
        >
          <FiRefreshCw className="mr-1" />
          Reset
        </button>
      </div>
      
      <div className="space-y-4">
        {/* Search Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <div className="relative">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleChange}
              className="w-full pl-9 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search items..."
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
            {filters.search && (
              <button 
                onClick={() => onFilterChange({ search: '' })}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <FiX />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <div className="relative">
            <select
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="w-full pl-3 pr-8 py-2 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category} className="py-1">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Country Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <div className="relative">
            <select
              name="country"
              value={filters.country || ''}
              onChange={handleChange}
              className="w-full pl-3 pr-8 py-2 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country} className="py-1">
                  {country}
                </option>
              ))}
            </select>
            <FiGlobe className="absolute left-3 top-2.5 text-gray-400" />
            <FiChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleChange}
                className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Min"
              />
              <FiDollarSign className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleChange}
                className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Max"
              />
              <FiDollarSign className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Certifications</label>
          <div className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition">
            <input
              type="checkbox"
              id="fairTrade"
              name="fairTrade"
              checked={filters.fairTrade}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="fairTrade" className="ml-2 text-sm text-gray-700 flex items-center">
              <FiStar className="mr-1 text-yellow-400" size={14} />
              Fair Trade
            </label>
          </div>
          <div className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition">
            <input
              type="checkbox"
              id="organic"
              name="organic"
              checked={filters.organic}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="organic" className="ml-2 text-sm text-gray-700 flex items-center">
              <svg className="h-3 w-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Organic
            </label>
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
          <div className="relative">
            <select
              name="sort"
              value={filters.sort}
              onChange={handleChange}
              className="w-full pl-3 pr-8 py-2 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="popular">Most Popular</option>
            </select>
            <FiChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;