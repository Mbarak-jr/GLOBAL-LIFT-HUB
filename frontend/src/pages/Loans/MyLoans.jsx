import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FiDollarSign, 
  FiCalendar, 
  FiClock, 
  FiCheckCircle, 
  FiXCircle, 
  FiInfo,
  FiPlus,
  FiEye
} from 'react-icons/fi';
import  useAuth  from '../../hooks/useAuth';

const MyLoans = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get(`/api/loans?applicant=${user._id}`);
        setLoans(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch loans');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoans();
  }, [user._id]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FiCheckCircle className="mr-1" /> Approved
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <FiClock className="mr-1" /> Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <FiXCircle className="mr-1" /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <FiInfo className="mr-1" /> Unknown
          </span>
        );
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateProgress = (loan) => {
    if (!loan.repayments || loan.repayments.length === 0) return 0;
    const totalPaid = loan.repayments.reduce((sum, r) => sum + r.amount, 0);
    return Math.min(Math.round((totalPaid / loan.amount) * 100), 100);
  };

  const handleViewDetails = (loanId) => {
    navigate(`/loans/${loanId}`);
  };

  const handleNewLoan = () => {
    navigate('/loans/apply');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-center">
            <h1 className="text-2xl font-bold text-white">My Loan Applications</h1>
            <p className="text-blue-100 mt-1">
              Track your loan applications and repayment progress
            </p>
          </div>

          {/* Content */}
          <div className="p-6">
            {error && (
              <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            {isLoading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : loans.length === 0 ? (
              <div className="text-center py-10">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                  <FiInfo className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No loan applications</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You haven't applied for any loans yet. Get started today!
                </p>
                <div className="mt-6">
                  <button
                    onClick={handleNewLoan}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FiPlus className="mr-2" />
                    Apply for a Loan
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-end">
                  <button
                    onClick={handleNewLoan}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FiPlus className="mr-2" />
                    New Loan Application
                  </button>
                </div>

                {loans.map((loan) => (
                  <div key={loan._id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="p-4 bg-white">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900">{loan.purpose}</h3>
                          <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <FiDollarSign className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              ${loan.amount.toLocaleString()}
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <FiCalendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              Applied: {formatDate(loan.applicationDate)}
                            </div>
                            {loan.approvedDate && (
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <FiCalendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                Approved: {formatDate(loan.approvedDate)}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="mt-2 md:mt-0">
                          {getStatusBadge(loan.status)}
                        </div>
                      </div>
                    </div>

                    {loan.status === 'approved' && (
                      <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">
                          Repayment Progress
                        </h4>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${calculateProgress(loan)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="bg-gray-50 px-4 py-3 flex justify-end">
                      <button
                        onClick={() => handleViewDetails(loan._id)}
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                      >
                        <FiEye className="mr-1" />
                        View details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stats */}
          {loans.length > 0 && (
            <div className="bg-blue-50 px-6 py-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <h3 className="text-sm font-medium text-gray-500">Total Loans</h3>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">
                    {loans.length}
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <h3 className="text-sm font-medium text-gray-500">Active Loans</h3>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">
                    {loans.filter(l => l.status === 'approved').length}
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <h3 className="text-sm font-medium text-gray-500">Total Borrowed</h3>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">
                    ${loans.filter(l => l.status === 'approved').reduce((sum, loan) => sum + loan.amount, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SDG Attribution */}
        <div className="mt-8 text-center text-xs text-gray-500">
          Supporting UN Sustainable Development Goal #1: No Poverty
        </div>
      </div>
    </div>
  );
};

export default MyLoans;