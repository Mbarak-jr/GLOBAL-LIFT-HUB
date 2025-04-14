import React from 'react';

const LoanHeader = ({ institution }) => (
  <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-center">
    <h1 className="text-2xl font-bold text-white">
      {institution ? `Apply for Loan with ${institution.name}` : 'Apply for a Loan'}
    </h1>
    <p className="text-blue-100 mt-1">
      {institution 
        ? `Interest Rate: ${institution.interestRate}%` 
        : 'Get financial support from trusted institutions'}
    </p>
  </div>
);

export default LoanHeader;