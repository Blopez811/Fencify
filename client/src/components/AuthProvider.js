import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for the authentication state
const AuthContext = createContext();

// Provide this context to components
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated
    // You can make a request to the server, check local storage, etc.
    // For now, let's assume the user is not authenticated
    setIsAuthenticated(false);
  }, []);

  const value = {
    isAuthenticated,
    setIsAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the authentication state in any component
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
