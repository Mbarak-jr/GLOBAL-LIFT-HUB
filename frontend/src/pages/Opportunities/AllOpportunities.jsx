import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { 
  FiSearch, 
  FiFilter, 
  FiPlus, 
  FiClock, 
  FiMapPin, 
  FiBriefcase, 
  FiDollarSign, 
  FiAward, 
  FiZap,
  FiUser,
  FiShield
} from 'react-icons/fi';

const AllOpportunities = ({ userRole }) => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    type: ''
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Check user role and redirect if needed
  useEffect(() => {
    if (userRole === 'admin') {
      navigate('/admin/dashboard');
    } else if (userRole === 'donor') {
      navigate('/donation-opportunities');
    } else if (userRole === 'partner') {
      navigate('/partnership-opportunities');
    } else if (userRole === 'beneficiary' || userRole === 'user') {
      navigate('/available-opportunities');
    }
  }, [userRole, navigate]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        // Fetch opportunities
        const params = {};
        if (filters.category) params.category = filters.category;
        if (filters.search) params.search = filters.search;
        if (filters.type) params.type = filters.type;
        
        const [oppsResponse, catsResponse] = await Promise.all([
          axios.get('/api/opportunities', { params }),
          axios.get('/api/opportunities/categories')
        ]);
        
        if (!isMounted) return;
        
        // Process opportunities
        if (!oppsResponse.data) {
          throw new Error('No opportunities data received');
        }

        const oppsData = Array.isArray(oppsResponse.data) 
          ? oppsResponse.data 
          : oppsResponse.data.data || oppsResponse.data.items || [];

        if (!Array.isArray(oppsData)) {
          throw new Error('Invalid opportunities data format');
        }

        // Process categories
        const catsData = Array.isArray(catsResponse?.data) 
          ? catsResponse.data 
          : catsResponse?.data?.categories || [];

        setOpportunities(oppsData);
        setCategories(catsData);
        setError(null);
      } catch (err) {
        if (!isMounted) return;
        console.error('Fetch error:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load data');
        setOpportunities([]);
        setCategories([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      search: '',
      type: ''
    });
  };

  const getCategoryIcon = (category) => {
    const iconProps = { className: "text-lg", size: 18 };
    const normalizedCategory = String(category || '').toLowerCase();
    
    switch (normalizedCategory) {
      case 'job': return <FiBriefcase {...iconProps} style={{ color: '#3B82F6' }} />;
      case 'grant': return <FiAward {...iconProps} style={{ color: '#8B5CF6' }} />;
      case 'investment': return <FiDollarSign {...iconProps} style={{ color: '#10B981' }} />;
      default: return <FiZap {...iconProps} style={{ color: '#F59E0B' }} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-blue-600 font-medium">Loading opportunities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-4xl w-full p-6">
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
                  <Link
                    to="/"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    Return to Home
                  </Link>
                </div>
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
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">Opportunities</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore various opportunities available for you
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
                placeholder="Search by title, description..."
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
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="relative flex-1 md:flex-none md:w-48">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-400 text-lg" />
              </div>
              <select
                name="type"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 appearance-none bg-white"
                value={filters.type}
                onChange={handleFilterChange}
              >
                <option value="">All Types</option>
                <option value="job">Jobs</option>
                <option value="grant">Grants</option>
                <option value="investment">Investments</option>
                <option value="event">Events</option>
              </select>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={clearFilters}
                className="flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 px-4 py-3 rounded-lg transition-colors shadow-sm"
              >
                Clear Filters
              </button>
              {userRole === 'admin' && (
                <Link 
                  to="/opportunities/create" 
                  className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all shadow hover:shadow-md"
                >
                  <FiPlus className="mr-2" size={18} />
                  Post New
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Opportunities List */}
        {opportunities.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md overflow-hidden text-center py-16 border border-gray-200">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiBriefcase className="text-blue-500 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No Opportunities Found</h3>
              <p className="text-gray-600 mb-6">
                {filters.category || filters.search || filters.type 
                  ? "No opportunities match your filters. Try adjusting your search criteria."
                  : "There are currently no opportunities available."}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                {userRole === 'admin' && (
                  <Link
                    to="/opportunities/create"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm flex items-center justify-center"
                  >
                    <FiPlus className="mr-2" />
                    Create Opportunity
                  </Link>
                )}
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 rounded-lg transition-colors flex items-center justify-center shadow-sm"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {opportunities.map(opp => (
                <div key={opp._id || opp.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200">
                  <div className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="p-3 rounded-lg bg-blue-50 text-blue-500">{getCategoryIcon(opp.category)}</div>
                      <h3 className="text-xl font-semibold text-gray-800 ml-4">{opp.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{opp.description.substring(0, 100)}...</p>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <FiClock size={14} />
                        <span>{format(new Date(opp.createdAt), 'dd/MM/yyyy')}</span>
                      </div>
                      {opp.location && (
                        <div className="flex items-center gap-1">
                          <FiMapPin size={14} />
                          <span>{opp.location}</span>
                        </div>
                      )}
                    </div>
                    <Link
                      to={`/opportunity/${opp._id || opp.id}`}
                      className="block text-center text-blue-600 hover:text-blue-700 mt-4"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllOpportunities;
