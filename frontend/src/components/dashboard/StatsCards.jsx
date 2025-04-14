import React from 'react';
import { FiTrendingUp, FiUsers, FiGlobe, FiDollarSign } from 'react-icons/fi';

const StatsCards = ({ stats }) => {
  const formatNumber = (value) => Number(value || 0).toLocaleString();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500 transform hover:scale-105 transition-transform">
        <div className="flex items-center">
          <FiGlobe className="text-blue-500 text-2xl mr-3" />
          <h3 className="text-lg font-bold">Global Reach</h3>
        </div>
        <p className="text-3xl font-bold mt-3">{formatNumber(stats?.countries)} Countries</p>
        <p className="text-gray-500 mt-1">Poverty reduction initiatives</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-500 transform hover:scale-105 transition-transform">
        <div className="flex items-center">
          <FiUsers className="text-green-500 text-2xl mr-3" />
          <h3 className="text-lg font-bold">People Lifted</h3>
        </div>
        <p className="text-3xl font-bold mt-3">{formatNumber(stats?.peopleHelped)}+</p>
        <p className="text-gray-500 mt-1">From poverty since 2020</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-purple-500 transform hover:scale-105 transition-transform">
        <div className="flex items-center">
          <FiDollarSign className="text-purple-500 text-2xl mr-3" />
          <h3 className="text-lg font-bold">Capital Deployed</h3>
        </div>
        <p className="text-3xl font-bold mt-3">${formatNumber(stats?.capitalDeployed)}M</p>
        <p className="text-gray-500 mt-1">In microfinance loans</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-orange-500 transform hover:scale-105 transition-transform">
        <div className="flex items-center">
          <FiTrendingUp className="text-orange-500 text-2xl mr-3" />
          <h3 className="text-lg font-bold">ROI</h3>
        </div>
        <p className="text-3xl font-bold mt-3">{Number(stats?.ROI || 0)}%</p>
        <p className="text-gray-500 mt-1">Average social return on investment</p>
      </div>
    </div>
  );
};

export default StatsCards;
