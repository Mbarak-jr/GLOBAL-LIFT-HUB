import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import LoanNavigation from '../../components/Loans/LoanNavigation';
import LoanHeader from '../../components/Loans/LoanHeader';
import LoanInfoCards from '../../components/Loans/LoanInfoCards';
import InstitutionSelector from '../../components/Loans/InstitutionSelector';
import LoanForm from '../../components/Loans/LoanForm';

const ApplyLoans = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    amount: '',
    purpose: 'business',
    repaymentPlan: '6',
    description: '',
    institution: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showInstitutions, setShowInstitutions] = useState(false);

  const loanPurposes = [
    { value: 'business', label: 'Business Startup/Expansion' },
    { value: 'education', label: 'Education' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'housing', label: 'Housing Improvement' },
    { value: 'emergency', label: 'Emergency Needs' },
    { value: 'other', label: 'Other' }
  ];

  const repaymentPlans = [
    { value: '3', label: '3 months (Weekly repayments)' },
    { value: '6', label: '6 months (Bi-weekly repayments)' },
    { value: '12', label: '12 months (Monthly repayments)' },
    { value: '24', label: '24 months (Monthly repayments)' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const amount = Number(formData.amount);
    if (!amount || amount < 50 || amount > 5000) {
      setError('Loan amount must be between $50 and $5000');
      return false;
    }
    if (!formData.purpose) {
      setError('Please select a loan purpose');
      return false;
    }
    if (!formData.repaymentPlan) {
      setError('Please select a repayment plan');
      return false;
    }
    if (!formData.institution) {
      setError('Please select a financial institution');
      return false;
    }
    return true;
  };

  const handleInstitutionSelect = (institution) => {
    setFormData(prev => ({
      ...prev,
      institution
    }));
    setShowInstitutions(false);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const loanData = {
        amount: Number(formData.amount),
        purpose: formData.purpose,
        repaymentPlan: formData.repaymentPlan,
        description: formData.description,
        institution: {
          id: formData.institution.id,
          name: formData.institution.name,
          type: formData.institution.type
        },
        applicant: user._id,
        status: 'pending'
      };

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.post('/api/loans', loanData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data?._id) {
        setSuccess('Loan application submitted successfully! Our team will review your request shortly.');
        setFormData({
          amount: '',
          purpose: 'business',
          repaymentPlan: '6',
          description: '',
          institution: null
        });
        setTimeout(() => navigate('/loans/myloans'), 2000);
      }
    } catch (err) {
      console.error('Loan application error:', err);
      
      if (err.response) {
        if (err.response.status === 401) {
          setError('Your session has expired. Please login again.');
        } else if (err.response.status === 400) {
          setError(err.response.data.message || 'Invalid loan application data');
        } else {
          setError(err.response.data.message || 'Server error. Please try again.');
        }
      } else if (err.request) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError(err.message || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return <LoadingSpinner fullPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <LoanNavigation />
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <LoanHeader />
          <LoanInfoCards />
          
          <InstitutionSelector
            institution={formData.institution}
            showInstitutions={showInstitutions}
            setShowInstitutions={setShowInstitutions}
            handleInstitutionSelect={handleInstitutionSelect}
          />
          
          <LoanForm
            formData={formData}
            error={error}
            success={success}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            loanPurposes={loanPurposes}
            repaymentPlans={repaymentPlans}
          />
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
          Supporting UN Sustainable Development Goal #1: No Poverty
        </div>
      </div>
    </div>
  );
};

export default ApplyLoans;