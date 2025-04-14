import { Link } from 'react-router-dom';
import { FiSearch, FiBriefcase, FiAward, FiDollarSign } from 'react-icons/fi';

const OpportunitiesHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-700 to-blue-800 shadow-lg z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <Link to="/opportunities" className="flex items-center space-x-2">
            <div className="bg-white p-2 rounded-lg shadow-md">
              <FiBriefcase className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-white text-2xl font-bold tracking-tight">NoPoverty<span className="text-yellow-300">Opportunities</span></span>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-1">
            <Link 
              to="/opportunities" 
              className="px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-all flex items-center space-x-1"
            >
              <FiBriefcase className="h-4 w-4" />
              <span>All Opportunities</span>
            </Link>
            <Link 
              to="/opportunities/jobs" 
              className="px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-all flex items-center space-x-1"
            >
              <FiAward className="h-4 w-4" />
              <span>Jobs</span>
            </Link>
            <Link 
              to="/opportunities/grants" 
              className="px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-all flex items-center space-x-1"
            >
              <FiDollarSign className="h-4 w-4" />
              <span>Grants</span>
            </Link>
          </nav>

          {/* User Controls */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search opportunities..."
                className="pl-10 pr-4 py-2 w-64 rounded-full bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <FiSearch className="absolute left-3 top-2.5 text-white/70" />
            </div>
            
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

export default OpportunitiesHeader;