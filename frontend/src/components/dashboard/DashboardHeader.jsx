import React from 'react';

const DashboardHeader = ({ title }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
          <p className="mt-2 text-blue-100">
            Connecting global investors with poverty alleviation initiatives worldwide
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">SDG 1: No Poverty</span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Global Impact</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;