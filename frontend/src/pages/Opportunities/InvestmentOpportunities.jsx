// pages/Opportunities/InvestmentOpportunities.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { 
  FiSearch, 
  FiFilter, 
  FiDollarSign,
  FiTrendingUp,
  FiBarChart2,
  FiArrowRight
} from 'react-icons/fi';


const InvestmentOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    industry: '',
    search: '',
    minReturn: ''
  });

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const params = {};
        if (filters.industry) params.industry = filters.industry;
        if (filters.search) params.search = filters.search;
        if (filters.minReturn) params.minReturn = filters.minReturn;
        
        const response = await axios.get('/api/opportunities/investment', { params });
        
        const data = Array.isArray(response.data) 
          ? response.data 
          : response.data.data || [];
        
        setOpportunities(data);
        setError(null);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load investment opportunities');
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-blue-600 font-medium">Loading investment opportunities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-50">
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 shadow-sm">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-red-800">Couldn't load opportunities</h3>
              <p className="text-red-700 mt-1">{error}</p>
              <div className="mt-4">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl mb-4">
              Investment <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">Opportunities</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover high-potential investment opportunities with attractive returns
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-10 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400 text-lg" />
              </div>
              <input
                type="text"
                name="search"
                placeholder="Search investment opportunities..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400"
                value={filters.search}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="relative flex-1 md:flex-none md:w-48">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFilter className="text-gray-400 text-lg" />
              </div>
              <select
                name="industry"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 appearance-none bg-white"
                value={filters.industry}
                onChange={handleFilterChange}
              >
                <option value="">All Industries</option>
                <option value="technology">Technology</option>
                <option value="real-estate">Real Estate</option>
                <option value="agriculture">Agriculture</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="renewable-energy">Renewable Energy</option>
              </select>
            </div>
            
            <div className="relative flex-1 md:flex-none md:w-48">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiTrendingUp className="text-gray-400 text-lg" />
              </div>
              <select
                name="minReturn"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 appearance-none bg-white"
                value={filters.minReturn}
                onChange={handleFilterChange}
              >
                <option value="">Min. Return</option>
                <option value="5">5%+</option>
                <option value="10">10%+</option>
                <option value="15">15%+</option>
                <option value="20">20%+</option>
              </select>
            </div>
          </div>
        </div>

        {/* Opportunities List */}
        {opportunities.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md overflow-hidden text-center py-16 border border-gray-200">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiDollarSign className="text-blue-500 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No Investment Opportunities Found</h3>
              <p className="text-gray-600 mb-6">
                {filters.industry || filters.search || filters.minReturn
                  ? "No investments match your filters. Try adjusting your criteria."
                  : "There are currently no investment opportunities available. Please check back later."}
              </p>
              <button
                onClick={() => setFilters({ industry: '', search: '', minReturn: '' })}
                className="px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 rounded-lg transition-colors flex items-center justify-center shadow-sm mx-auto"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {opportunities.map(opp => (
              <div key={opp._id || opp.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200">
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="p-3 rounded-lg bg-blue-50 mr-4 flex-shrink-0">
                      <FiDollarSign className="text-lg text-green-500" size={18} />
                    </div>
                    <div className="min-w-0">
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-2 bg-green-100 text-green-800">
                        {opp.industry || 'Investment'}
                      </span>
                      <h2 className="text-xl font-bold text-gray-800 truncate">{opp.title || 'Investment Opportunity'}</h2>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 my-4 line-clamp-3">{opp.description || 'No description provided'}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-700">
                      <FiTrendingUp className="mr-2 text-blue-500 flex-shrink-0" />
                      <span>Projected ROI: {opp.returnRate || 'N/A'}%</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FiBarChart2 className="mr-2 text-blue-500 flex-shrink-0" />
                      <span>Risk Level: {opp.riskLevel || 'Medium'}</span>
                    </div>
                    {opp.deadline && (
                      <div className="flex items-center text-gray-700">
                        <FiClock className="mr-2 text-blue-500 flex-shrink-0" />
                        <span>Closing {format(new Date(opp.deadline), 'MMM d, yyyy')}</span>
                      </div>
                    )}
                  </div>
                  
                  <Link 
                    to={`/opportunities/${opp._id || opp.id}`}
                    className="w-full flex items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    View Details <FiArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentOpportunities;