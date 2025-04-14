// components/route/RoleBasedRedirect.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RoleBasedRedirect = ({ children, allowedRoles }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && !allowedRoles.includes(currentUser.role)) {
      if (currentUser.role === 'investor') {
        navigate('/investment-opportunities');
      } else {
        navigate('/opportunities');
      }
    }
  }, [currentUser, allowedRoles, navigate]);

  if (!currentUser || !allowedRoles.includes(currentUser.role)) {
    return null; // or a loading spinner
  }

  return children;
};

export default RoleBasedRedirect;