import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Auth context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
    const [instructorName, setInstructorName] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  

    useEffect(() => {
        const storedInstructorName = localStorage.getItem('instructorName');
        if (storedInstructorName) {
          setInstructorName(storedInstructorName); // Set instructorName from localStorage
          setIsAuthenticated(true); // Set isAuthenticated to true
        } else {
          setIsAuthenticated(false); // No instructorName, set isAuthenticated to false
        }
      }, []);
    

  // Function to log in and set user state
  const login = (name) => {
    setInstructorName(name);
    localStorage.setItem('instructorName', name); // Store instructorName in localStorage
    setIsAuthenticated(true); // Set isAuthenticated to true
  };

  // Function to log out and remove user state
  const logout = () => {
    setInstructorName(null);
    localStorage.removeItem('instructorName'); // Remove instructorName from localStorage
    setIsAuthenticated(false); // Set isAuthenticated to false
  };

  return (
    <AuthContext.Provider value={{ instructorName, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );    
};
