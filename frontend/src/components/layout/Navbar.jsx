import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Check if current route is opportunities
  const isOpportunitiesRoute = location.pathname.startsWith('/opportunities');

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 group"
        >
          <div className="bg-white p-2 rounded-full group-hover:rotate-12 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white tracking-tighter">
            <span className="text-yellow-300">No</span>Poverty
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-1">
          <Link 
            to="/opportunities" 
            className={`px-4 py-2 text-white rounded-lg transition-all duration-300 flex items-center ${
              isOpportunitiesRoute 
                ? 'bg-yellow-400 text-blue-800 font-medium' 
                : 'hover:bg-yellow-400 hover:text-blue-800 hover:font-medium'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Opportunities
          </Link>
          <Link 
            to="/loans/apply" 
            className="px-4 py-2 text-white hover:bg-yellow-400 hover:text-blue-800 hover:font-medium rounded-lg transition-all duration-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Loans
          </Link>
          <Link 
            to="/marketplace" 
            className="px-4 py-2 text-white hover:bg-yellow-400 hover:text-blue-800 hover:font-medium rounded-lg transition-all duration-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Marketplace
          </Link>
          <Link 
            to="/skills" 
            className="px-4 py-2 text-white hover:bg-yellow-400 hover:text-blue-800 hover:font-medium rounded-lg transition-all duration-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Skills
          </Link>
        </div>

        {/* Login and Register Buttons */}
        <div className="hidden md:flex space-x-3 items-center">
          <Link
            to="/auth/login"
            className="px-4 py-2 bg-yellow-400 text-blue-800 font-medium rounded-lg hover:bg-yellow-300 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Login
          </Link>
          <Link
            to="/auth/register"
            className="px-4 py-2 bg-yellow-400 text-blue-800 font-medium rounded-lg hover:bg-yellow-300 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Join Now
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none p-2 rounded-full hover:bg-yellow-400 hover:text-blue-800 transition-all"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 px-4 pb-4 space-y-3 animate-fadeIn">
          <Link 
            to="/opportunities" 
            className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
              isOpportunitiesRoute
                ? 'bg-yellow-400 text-blue-800 font-medium'
                : 'text-white hover:bg-yellow-400 hover:text-blue-800 hover:font-medium'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Opportunities
          </Link>
          <Link 
            to="/loans/apply" 
            className="block px-4 py-3 text-white hover:bg-yellow-400 hover:text-blue-800 hover:font-medium rounded-lg transition-all duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Loans
          </Link>
          <Link 
            to="/marketplace" 
            className="block px-4 py-3 text-white hover:bg-yellow-400 hover:text-blue-800 hover:font-medium rounded-lg transition-all duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Marketplace
          </Link>
          <Link 
            to="/skills" 
            className="block px-4 py-3 text-white hover:bg-yellow-400 hover:text-blue-800 hover:font-medium rounded-lg transition-all duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Skills
          </Link>
          <div className="flex space-x-3 pt-2">
            <Link
              to="/auth/login"
              className="flex-1 text-center px-4 py-2 text-white hover:bg-yellow-400 hover:text-blue-800 font-medium rounded-lg transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/auth/register"
              className="flex-1 text-center px-4 py-2 bg-yellow-400 text-blue-800 font-medium rounded-lg hover:bg-yellow-300 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Join Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;