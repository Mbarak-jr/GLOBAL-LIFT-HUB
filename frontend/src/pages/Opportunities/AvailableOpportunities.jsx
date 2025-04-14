import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  FiSearch, 
  FiFilter, 
  FiClock, 
  FiMapPin, 
  FiBriefcase, 
  FiDollarSign, 
  FiAward,
  FiArrowRight,
  FiRefreshCw
} from 'react-icons/fi';
import { getOpportunities } from '../../services/opportunityService';
import OpportunitiesHeader from '../../components/opportunities/OpportunitiesHeader';
import OpportunitiesFooter from '../../components/opportunities/OpportunitiesFooter';

const AvailableOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    search: ''
  });

    const fetchOpportunities = useCallback(async (signal) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const data = await getOpportunities(filters, token, signal);
      setOpportunities(data);
    } catch (err) {
      if (!signal?.aborted) {
        setError(err.response?.data?.message || err.message || 'Failed to load opportunities');
        setOpportunities([]);
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, [filters]);


  useEffect(() => {
    const abortController = new AbortController();
    const debounceTimer = setTimeout(() => {
      fetchOpportunities(abortController.signal);
    }, 300);

    return () => {
      abortController.abort();
      clearTimeout(debounceTimer);
    };
  }, [fetchOpportunities]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({ category: '', search: '' });
  };

  const getCategoryIcon = (category) => {
    const iconProps = { className: "text-lg", size: 18 };
    const normalizedCategory = String(category || '').toLowerCase();
    
    switch (normalizedCategory) {
      case 'job': return <FiBriefcase {...iconProps} style={{ color: '#3B82F6' }} />;
      case 'grant': return <FiAward {...iconProps} style={{ color: '#8B5CF6' }} />;
      case 'investment': return <FiDollarSign {...iconProps} style={{ color: '#10B981' }} />;
      default: return <FiBriefcase {...iconProps} style={{ color: '#F59E0B' }} />;
    }
  };

  if (loading && !opportunities.length) {
    return (
      <div className="min-h-screen flex flex-col">
        <OpportunitiesHeader />
        <main className="flex-grow pt-24">
          <div className="min-h-[50vh] flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-blue-600 font-medium">Loading opportunities...</p>
          </div>
        </main>
        <OpportunitiesFooter />
      </div>
    );
  }

  if (error && !opportunities.length) {
    return (
      <div className="min-h-screen flex flex-col">
        <OpportunitiesHeader />
        <main className="flex-grow pt-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-red-500">
              <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Opportunities</h2>
              <p className="text-gray-700 mb-6">{error}</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => fetchOpportunities()}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center"
                >
                  <FiRefreshCw className="mr-2" />
                  Try Again
                </button>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </main>
        <OpportunitiesFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <OpportunitiesHeader />
      
      <main className="flex-grow pt-24 bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <div className="relative z-10">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl mb-6">
                <span className="block">Transform Your Future</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Discover Opportunities
                </span>
              </h1>
              <p className="max-w-3xl mx-auto text-xl text-gray-600">
                Find jobs, grants, and investments to help you break the cycle of poverty.
              </p>
            </div>
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-200 rounded-full opacity-20 mix-blend-multiply filter blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-200 rounded-full opacity-20 mix-blend-multiply filter blur-3xl"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Search and Filter Section */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-10 border border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400 text-lg" />
                </div>
                <input
                  type="text"
                  name="search"
                  placeholder="Search opportunities..."
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
                  name="category"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 appearance-none bg-white"
                  value={filters.category}
                  onChange={handleFilterChange}
                >
                  <option value="">All Categories</option>
                  <option value="job">Jobs</option>
                  <option value="grant">Grants</option>
                  <option value="training">Training</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="investment">Investments</option>
                </select>
              </div>
            </div>
          </div>

          {/* Loading state while filtering */}
          {loading && opportunities.length > 0 && (
            <div className="mb-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg">
                <FiRefreshCw className="animate-spin mr-2" />
                Updating results...
              </div>
            </div>
          )}

          {/* Opportunities List */}
          {opportunities.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md overflow-hidden text-center py-16 border border-gray-200">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiBriefcase className="text-blue-500 text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">No Opportunities Found</h3>
                <p className="text-gray-600 mb-6">
                  {filters.category || filters.search 
                    ? "No opportunities match your filters. Try adjusting your search criteria."
                    : "There are currently no opportunities available. Please check back later."}
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 rounded-lg transition-colors flex items-center justify-center shadow-sm mx-auto"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {opportunities.map(opp => (
                <div key={opp._id || opp.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 group">
                  <div className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="p-3 rounded-lg bg-blue-50 mr-4 flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                        {getCategoryIcon(opp.category)}
                      </div>
                      <div className="min-w-0">
                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-2 ${
                          opp.category === 'job' ? 'bg-blue-100 text-blue-800' :
                          opp.category === 'grant' ? 'bg-purple-100 text-purple-800' :
                          opp.category === 'training' ? 'bg-green-100 text-green-800' :
                          opp.category === 'investment' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {opp.category ? opp.category.charAt(0).toUpperCase() + opp.category.slice(1) : 'Opportunity'}
                        </span>
                        <h2 className="text-xl font-bold text-gray-800 truncate">{opp.title || 'Untitled Opportunity'}</h2>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 my-4 line-clamp-3">{opp.description || 'No description provided'}</p>
                    
                    <div className="space-y-3 mb-6">
                      {opp.location && (
                        <div className="flex items-center text-gray-700">
                          <FiMapPin className="mr-2 text-blue-500 flex-shrink-0" />
                          <span className="truncate">{opp.location}</span>
                        </div>
                      )}
                      {opp.deadline && (
                        <div className="flex items-center text-gray-700">
                          <FiClock className="mr-2 text-blue-500 flex-shrink-0" />
                          <span>Until {format(new Date(opp.deadline), 'MMM d, yyyy')}</span>
                        </div>
                      )}
                    </div>
                    
                    <Link 
                      to={`/opportunities/${opp._id || opp.id}`}
                      className="w-full flex items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded-lg transition-colors group-hover:bg-blue-100"
                    >
                      View Details <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <OpportunitiesFooter />
    </div>
  );
};

export default AvailableOpportunities;