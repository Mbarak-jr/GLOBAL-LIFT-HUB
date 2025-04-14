import React from 'react';
import { FiDollarSign, FiUsers, FiGlobe, FiBarChart2, FiClock, FiHeart, FiShield, FiFilter, FiChevronDown } from 'react-icons/fi';

const MicrofinanceTab = ({ loans, loading, onApplyLoan }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Custom progress bar component using only Tailwind
  const ProgressBar = ({ value }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className="bg-blue-600 h-2.5 rounded-full" 
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 mb-8 text-white">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold mb-3">Empower Entrepreneurs Worldwide</h1>
          <p className="text-blue-100 mb-6 text-lg">
            Fund microloans that create opportunities and break the cycle of poverty. 
            Earn returns while making a measurable social impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onApplyLoan}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-all flex items-center justify-center shadow-md"
            >
              <FiDollarSign className="mr-2" size={18} />
              Fund a Loan
            </button>
            <button className="border-2 border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-all flex items-center justify-center">
              <FiHeart className="mr-2" size={18} />
              How It Works
            </button>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <FiDollarSign className="text-blue-600" size={20} />
            </div>
            <h3 className="font-semibold text-gray-800">Portfolio Performance</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600 mb-2">98.7%</p>
          <p className="text-gray-600 text-sm mb-3">Repayment Rate</p>
          <ProgressBar value={98.7} />
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-2 rounded-lg mr-3">
              <FiUsers className="text-green-600" size={20} />
            </div>
            <h3 className="font-semibold text-gray-800">Beneficiaries</h3>
          </div>
          <p className="text-3xl font-bold text-green-600 mb-2">15,328+</p>
          <p className="text-gray-600 text-sm mb-3">Entrepreneurs Funded</p>
          <div className="text-xs text-green-600">
            <span className="bg-green-100 px-2 py-1 rounded">+12% YoY</span>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-2 rounded-lg mr-3">
              <FiGlobe className="text-purple-600" size={20} />
            </div>
            <h3 className="font-semibold text-gray-800">Global Reach</h3>
          </div>
          <p className="text-3xl font-bold text-purple-600 mb-2">23</p>
          <p className="text-gray-600 text-sm mb-3">Countries</p>
          <div className="text-xs text-purple-600">
            <span className="bg-purple-100 px-2 py-1 rounded">Expanding</span>
          </div>
        </div>
      </div>
      
      {/* Loan Listings */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Available Loan Opportunities</h2>
          <div className="flex gap-3">
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Sort By: Newest</option>
                <option>Amount: Low to High</option>
                <option>Amount: High to Low</option>
                <option>Risk Level</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <FiFilter size={16} />
              Filter
            </button>
          </div>
        </div>
        
        <div className="space-y-6">
          {loans.map(loan => (
            <div key={loan.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all group">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Loan Details */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {loan.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      loan.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                      loan.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {loan.riskLevel} Risk
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{loan.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-500 text-xs uppercase font-medium mb-1">Amount</p>
                      <p className="font-bold text-gray-900">${loan.amount.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-500 text-xs uppercase font-medium mb-1">Interest</p>
                      <p className="font-bold text-gray-900">{loan.interestRate}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-500 text-xs uppercase font-medium mb-1">Term</p>
                      <p className="font-bold text-gray-900">{loan.term}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-500 text-xs uppercase font-medium mb-1">Impact</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(loan.impactScore / 2) ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-xs text-gray-600">({loan.impactScore}/10)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Funding Status */}
                <div className="w-full lg:w-64">
                  <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 h-full">
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">Funded</span>
                        <span className="text-sm font-bold text-blue-600">{loan.fundedPercent}%</span>
                      </div>
                      <ProgressBar value={loan.fundedPercent} />
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-5">
                      <FiClock className="mr-2" size={16} />
                      <span>{loan.daysLeft} days remaining</span>
                    </div>
                    
                    <button 
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:shadow-md transition-all flex items-center justify-center font-medium"
                      onClick={() => console.log(`Funding loan ${loan.id}`)}
                    >
                      Fund This Loan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">How Microfinance Creates Impact</h2>
          <p className="text-gray-600 text-lg">
            Our platform connects you directly with entrepreneurs in developing countries. 
            Your investment helps grow businesses, create jobs, and lift communities out of poverty.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              icon: <FiDollarSign className="text-blue-600" size={24} />,
              title: "Select a Loan",
              description: "Browse vetted opportunities with transparent impact metrics",
              color: "blue"
            },
            {
              icon: <FiShield className="text-green-600" size={24} />,
              title: "Fund Securely",
              description: "Invest any amount from $25 with our risk-assessed portfolio",
              color: "green"
            },
            {
              icon: <FiBarChart2 className="text-purple-600" size={24} />,
              title: "Track Impact",
              description: "Receive updates on repayments and business growth",
              color: "purple"
            }
          ].map((step, index) => (
            <div 
              key={index} 
              className={`bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-t-4 ${
                step.color === 'blue' ? 'border-blue-500' :
                step.color === 'green' ? 'border-green-500' :
                'border-purple-500'
              }`}
            >
              <div className={`w-12 h-12 rounded-full ${
                step.color === 'blue' ? 'bg-blue-100' :
                step.color === 'green' ? 'bg-green-100' :
                'bg-purple-100'
              } flex items-center justify-center mb-4`}>
                {step.icon}
              </div>
              <h3 className="font-bold text-lg mb-3 text-gray-800">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button 
            onClick={onApplyLoan}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-md"
          >
            Start Funding Loans Today
          </button>
        </div>
      </div>
    </div>
  );
};

// Default props for demonstration
MicrofinanceTab.defaultProps = {
  loans: [
    { 
      id: 1, 
      title: 'Small Business Starter Loan', 
      description: 'Interest-free loan for new entrepreneurs to purchase initial inventory and equipment. Perfect for women-led businesses in developing regions.', 
      amount: 500, 
      interestRate: '0%', 
      term: '6 months',
      riskLevel: 'Low',
      impactScore: 9,
      fundedPercent: 75,
      daysLeft: 14
    },
    { 
      id: 2, 
      title: 'Agricultural Equipment Financing', 
      description: 'Low-interest loans for farming tools and equipment to increase crop yields. Helps small farmers modernize their operations.', 
      amount: 1200, 
      interestRate: '3.5%', 
      term: '12 months',
      riskLevel: 'Medium',
      impactScore: 8,
      fundedPercent: 42,
      daysLeft: 21
    },
    { 
      id: 3, 
      title: 'Women Entrepreneurship Fund', 
      description: 'Special program supporting female-owned businesses in developing regions. Includes business training and mentorship.', 
      amount: 800, 
      interestRate: '2%', 
      term: '9 months',
      riskLevel: 'Low',
      impactScore: 10,
      fundedPercent: 93,
      daysLeft: 5
    }
  ],
  loading: false,
  onApplyLoan: () => console.log('Apply loan clicked')
};

export default MicrofinanceTab;