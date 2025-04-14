import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24 md:py-32 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-yellow-300 rounded-full mix-blend-overlay"></div>
        <div className="absolute bottom-10 right-20 w-60 h-60 bg-blue-400 rounded-full mix-blend-overlay"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl leading-tight">
          <span className="text-yellow-300">NoPoverty</span> Platform
        </h1>
        <h2 className="mt-4 text-2xl sm:text-3xl font-bold">
          Empowering Communities for a Brighter Future
        </h2>
        <p className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto">
          Join our mission to eradicate poverty through financial inclusion, education, and sustainable opportunities.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/opportunities"
            className="inline-flex items-center justify-center bg-yellow-400 text-blue-800 font-bold py-4 px-8 rounded-lg hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Explore Opportunities
            <FiArrowRight className="ml-2" />
          </Link>
          <Link
            to="/loans/apply"
            className="inline-flex items-center justify-center bg-yellow-400 text-blue-800 font-bold py-4 px-8 rounded-lg hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Apply for Micro-Loan
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
        
        <div className="mt-12 flex justify-center space-x-6">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <span>1M+ Lives Impacted</span>
          </div>
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span>95% Success Rate</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;