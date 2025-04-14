// src/pages/Opportunities/OpportunityDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { 
  FiArrowLeft, 
  FiClock, 
  FiMapPin, 
  FiBriefcase, 
  FiDollarSign, 
  FiAward,
  FiFileText,
  FiEdit2,
  FiTrash2
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';

const OpportunityDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const response = await axios.get(`/api/opportunities/${id}`);
        setOpportunity(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load opportunity');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunity();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this opportunity?')) {
      try {
        await axios.delete(`/api/opportunities/${id}`);
        toast.success('Opportunity deleted successfully');
        navigate('/opportunities');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete opportunity');
        console.error('Error:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-red-600 mb-2">Error Loading Opportunity</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            to="/opportunities"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <FiArrowLeft className="mr-2" />
            Back to Opportunities
          </Link>
        </div>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Opportunity Not Found</h3>
          <p className="text-gray-600 mb-4">The requested opportunity could not be found.</p>
          <Link
            to="/opportunities"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <FiArrowLeft className="mr-2" />
            Back to Opportunities
          </Link>
        </div>
      </div>
    );
  }

  const getCategoryIcon = (category) => {
    const iconProps = { className: "text-2xl", size: 24 };
    const normalizedCategory = String(category || '').toLowerCase();
    
    switch (normalizedCategory) {
      case 'job': return <FiBriefcase {...iconProps} style={{ color: '#3B82F6' }} />;
      case 'grant': return <FiAward {...iconProps} style={{ color: '#8B5CF6' }} />;
      case 'investment': return <FiDollarSign {...iconProps} style={{ color: '#10B981' }} />;
      default: return <FiBriefcase {...iconProps} style={{ color: '#F59E0B' }} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            to="/opportunities"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <FiArrowLeft className="mr-2" />
            Back to Opportunities
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-50 mr-4">
                {getCategoryIcon(opportunity.category)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{opportunity.title}</h2>
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mt-2 ${
                  opportunity.category === 'job' ? 'bg-blue-100 text-blue-800' :
                  opportunity.category === 'grant' ? 'bg-purple-100 text-purple-800' :
                  opportunity.category === 'investment' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {opportunity.category ? opportunity.category.charAt(0).toUpperCase() + opportunity.category.slice(1) : 'Opportunity'}
                </span>
              </div>
            </div>
            
            {currentUser?.role === 'admin' && (
              <div className="flex space-x-2">
                <Link
                  to={`/opportunities/edit/${id}`}
                  className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                  title="Edit"
                >
                  <FiEdit2 />
                </Link>
                <button
                  onClick={handleDelete}
                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                  title="Delete"
                >
                  <FiTrash2 />
                </button>
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="prose max-w-none mb-8">
              <p className="text-gray-700 whitespace-pre-line">{opportunity.description}</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-1">
                  <FiMapPin className="h-6 w-6 text-blue-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <p className="text-sm text-gray-900">{opportunity.location || 'Not specified'}</p>
                </div>
              </div>

              {opportunity.deadline && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-1">
                    <FiClock className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-500">Deadline</h3>
                    <p className="text-sm text-gray-900">
                      {format(new Date(opportunity.deadline), 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>
              )}

              {opportunity.amount && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-1">
                    <FiDollarSign className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-500">Amount/Funding</h3>
                    <p className="text-sm text-gray-900">{opportunity.amount}</p>
                  </div>
                </div>
              )}
            </div>

            {opportunity.requirements && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                  <FiFileText className="mr-2 text-blue-500" />
                  Requirements
                </h3>
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-line">{opportunity.requirements}</p>
                </div>
              </div>
            )}

            <div className="mt-8 border-t border-gray-200 pt-6">
              {currentUser?.role === 'admin' ? (
                <div className="flex justify-end space-x-3">
                  <Link
                    to={`/opportunities/edit/${id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FiEdit2 className="mr-2" />
                    Edit Opportunity
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => alert('Application functionality would go here')}
                  className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Apply Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetails;