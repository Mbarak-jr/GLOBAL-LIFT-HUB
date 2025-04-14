import React from 'react';
import { FiPercent, FiDollarSign, FiCalendar } from 'react-icons/fi';

const LoanInfoCards = ({ institution }) => {
  const interestRate = institution ? `${institution.interestRate}%` : '5-20%';
  const rateDescription = institution ? 'Fixed rate' : 'Varies by institution';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-blue-50">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-full mr-3">
            <FiPercent className="text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-700">Interest Rate</h3>
            <p className="text-2xl font-bold text-blue-600">{interestRate}</p>
            <p className="text-xs text-gray-500">{rateDescription}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-full mr-3">
            <FiDollarSign className="text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-700">Loan Range</h3>
            <p className="text-2xl font-bold text-blue-600">$50 - $5,000</p>
            <p className="text-xs text-gray-500">Flexible amounts</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-full mr-3">
            <FiCalendar className="text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-700">Repayment</h3>
            <p className="text-2xl font-bold text-blue-600">3-24 months</p>
            <p className="text-xs text-gray-500">Flexible terms</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanInfoCards;