import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Unauthorized = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">403 - Unauthorized Access</h1>
        <p className="mb-4">
          You don't have permission to access <code>{location.state?.from?.pathname || 'this page'}</code>
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Go Home
          </Link>
          <Link
            to="/auth/login"
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
          >
            Login as Different User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;