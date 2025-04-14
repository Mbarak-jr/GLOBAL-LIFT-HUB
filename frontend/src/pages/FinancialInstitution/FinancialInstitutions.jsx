import React, { useState, useEffect } from 'react';
import {
  AccountBalance as BankIcon,
  CreditCard as CreditCardIcon,
  Public as GlobeIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { getFinancialInstitutions } from '../../services/financialInstitutionService';
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const FinancialInstitutions = ({ onSelectInstitution }) => {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('kenya');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const data = await getFinancialInstitutions();
        setInstitutions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInstitutions();
  }, []);

  const countries = [
    { code: 'kenya', name: 'Kenya' },
    { code: 'nigeria', name: 'Nigeria' },
    { code: 'tanzania', name: 'Tanzania' },
    { code: 'uganda', name: 'Uganda' },
    { code: 'rwanda', name: 'Rwanda' },
  ];

  const institutionTypes = [
    { value: 'all', label: 'All Institutions' },
    { value: 'BANK', label: 'Banks Only' },
    { value: 'MFI', label: 'Microfinance Only' },
    { value: 'SACCO', label: 'SACCOs Only' }
  ];

  const filteredInstitutions = () => {
    let result = [...institutions];

    if (selectedType !== 'all') {
      result = result.filter(inst => inst.type === selectedType);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(inst =>
        inst.name.toLowerCase().includes(term) ||
        (inst.type && inst.type.toLowerCase().includes(term)));
    }

    return result;
  };

  const handleClearFilters = () => {
    setSelectedCountry('kenya');
    setSelectedType('all');
    setSearchTerm('');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Financial Institutions</h2>
        <p className="text-gray-600">Select a bank or microfinance institution to apply for a loan</p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <GlobeIcon className="text-gray-400" fontSize="small" />
          </div>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            {countries.map(country => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FilterIcon className="text-gray-400" fontSize="small" />
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            {institutionTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="text-gray-400" fontSize="small" />
          </div>
          <input
            type="text"
            placeholder="Search institutions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <CloseIcon className="text-gray-400 hover:text-gray-600" fontSize="small" />
            </button>
          )}
        </div>
      </div>

      {/* Active filters */}
      {(selectedCountry !== 'kenya' || selectedType !== 'all' || searchTerm) && (
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={handleClearFilters}
            className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded flex items-center"
          >
            Clear all
          </button>
          {selectedCountry !== 'kenya' && (
            <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded flex items-center">
              Country: {countries.find(c => c.code === selectedCountry)?.name}
              <button
                onClick={() => setSelectedCountry('kenya')}
                className="ml-1 text-blue-400 hover:text-blue-600"
              >
                <CloseIcon fontSize="small" />
              </button>
            </span>
          )}
          {selectedType !== 'all' && (
            <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded flex items-center">
              Type: {institutionTypes.find(t => t.value === selectedType)?.label}
              <button
                onClick={() => setSelectedType('all')}
                className="ml-1 text-blue-400 hover:text-blue-600"
              >
                <CloseIcon fontSize="small" />
              </button>
            </span>
          )}
          {searchTerm && (
            <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded flex items-center">
              Search: {searchTerm}
              <button
                onClick={() => setSearchTerm('')}
                className="ml-1 text-blue-400 hover:text-blue-600"
              >
                <CloseIcon fontSize="small" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Institutions List */}
      <div className="space-y-4">
        {filteredInstitutions().length > 0 ? (
          filteredInstitutions().map(inst => (
            <div
              key={inst._id}
              onClick={() => onSelectInstitution(inst)}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center">
                <div className="mr-4">
                  {inst.logo ? (
                    <img src={inst.logo} alt={inst.name} className="w-12 h-12 object-contain" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      {inst.type === 'MFI' ? (
                        <CreditCardIcon className="text-blue-500" fontSize="medium" />
                      ) : inst.type === 'SACCO' ? (
                        <BankIcon className="text-green-500" fontSize="medium" />
                      ) : (
                        <BankIcon className="text-blue-500" fontSize="medium" />
                      )}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{inst.name}</h3>
                  <p className="text-sm text-gray-600">
                    {inst.type} • Interest: {inst.interestRate}%
                  </p>
                </div>
                <div className="text-blue-500">
                  <ChevronRightIcon fontSize="medium" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No institutions found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialInstitutions;
