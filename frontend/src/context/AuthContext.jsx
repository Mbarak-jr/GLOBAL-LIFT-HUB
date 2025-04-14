import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    // Normalize user data structure
    const normalizedUser = {
      ...(userData.user || userData), // Spread nested user or entire response
      token: userData.token || userData.user?.token // Get token from either level
    };

    // Validate required fields
    if (!normalizedUser._id && !normalizedUser.id) {
      console.error('Invalid user structure received:', userData);
      throw new Error('Invalid user data: Missing user identifier');
    }

    setUser(normalizedUser);
    localStorage.setItem('user', JSON.stringify(normalizedUser));
    return normalizedUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading,
      isAuthenticated: !!user && (!!user._id || !!user.id) 
    }}>
      {loading ? (
        <div className="loading-screen">Loading...</div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};