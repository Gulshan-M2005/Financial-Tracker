// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Holds user object and loading status
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On initial mount, check for a token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Ideally decode or validate token and fetch user info here
      setUser({ email: 'user@example.com' }); // Replace with real user data
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  // Call this to log the user out everywhere
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Expose user, setUser, logout, and loading state via context
  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
