import React from 'react';
import { FiChevronDown, FiChevronUp, FiCreditCard } from 'react-icons/fi';
import { FaUniversity } from 'react-icons/fa';
import FinancialInstitutions from '../../pages/FinancialInstitution/FinancialInstitutions';

const InstitutionSelector = ({ 
  institution, 
  showInstitutions, 
  setShowInstitutions, 
  handleInstitutionSelect 
}) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Financial Institution
    </label>
    <button
      type="button"
      onClick={() => setShowInstitutions(!showInstitutions)}
      className={`w-full flex justify-between items-center p-4 border rounded-lg ${
        institution ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
      aria-expanded={showInstitutions}
      aria-controls="institutions-list"
    >
      <div className="flex items-center">
        {institution ? (
          <>
            <div className="mr-3">
              {institution.type === 'MFI' ? (
                <FiCreditCard className="text-blue-500 text-xl" />
              ) : (
                <FaUniversity className={
                  institution.type === 'SACCO' ? 'text-green-500 text-xl' : 'text-blue-500 text-xl'
                } />
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-800">{institution.name}</h3>
              <p className="text-sm text-gray-600">
                {institution.type} • {institution.interestRate}%
              </p>
            </div>
          </>
        ) : (
          <span className="text-gray-500">Select a financial institution</span>
        )}
      </div>
      {showInstitutions ? (
        <FiChevronUp className="text-gray-400" />
      ) : (
        <FiChevronDown className="text-gray-400" />
      )}
    </button>

    {showInstitutions && (
      <div className="mt-4" id="institutions-list">
        <FinancialInstitutions onSelectInstitution={handleInstitutionSelect} />
      </div>
    )}
  </div>
);

export default InstitutionSelector;