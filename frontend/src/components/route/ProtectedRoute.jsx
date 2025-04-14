import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';

const ProtectedRoute = ({ roles = [] }) => {
  const { user, isAuthenticated, loading } = useContext(AuthContext);
  const location = useLocation();

  console.log('ProtectedRoute check:', {
    isAuthenticated,
    path: location.pathname,
    user: user ? { id: user._id || user.id, role: user.role } : null
  });

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  if (!isAuthenticated) {
    console.log('Redirecting to login from:', location.pathname);
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (roles.length > 0 && (!user.role || !roles.includes(user.role))) {
    console.log('Role check failed. User role:', user.role, 'Required:', roles);
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Outlet />; // <-- This renders nested routes!
};

export default ProtectedRoute;
