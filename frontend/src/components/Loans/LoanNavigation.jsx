import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiList } from 'react-icons/fi';

const LoanNavigation = ({ showMyLoans = true }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between mb-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <FiArrowLeft className="mr-2" />
        Back
      </button>
      {showMyLoans && (
        <button
          onClick={() => navigate('/loans/myloans')}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <FiList className="mr-2" />
          My Loans
        </button>
      )}
    </div>
  );
};

export default LoanNavigation;