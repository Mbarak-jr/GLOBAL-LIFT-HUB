// src/pages/Auth/VerifyEmail.jsx
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../../services/authService';
import { FiCheckCircle, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('No verification token provided.');
      return;
    }
    
    const verify = async () => {
      try {
        const response = await verifyEmail(token);
        setStatus('success');
        setMessage(response.message || 'Email verified successfully!');
        // Redirect to login after 3 seconds
        setTimeout(() => navigate('/auth/login'), 3000);
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.message || 'Failed to verify email.');
      }
    };
    
    verify();
  }, [searchParams, navigate]);
  
  if (status === 'verifying') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">Verifying your email...</p>
        </div>
      </div>
    );
  }
  
  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="flex flex-col items-center">
            <FiCheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Email Verified!</h2>
            <p className="text-gray-600 mb-6 text-center">
              {message}
            </p>
            <p className="text-gray-500 text-sm text-center">
              You'll be redirected to login shortly...
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center">
          <FiAlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Failed</h2>
          <p className="text-gray-600 mb-6 text-center">{message}</p>
          <button
            onClick={() => navigate('/auth/login')}
            className="mt-4 text-blue-600 hover:text-blue-500 font-medium inline-flex items-center"
          >
            <FiArrowLeft className="mr-1" />
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;