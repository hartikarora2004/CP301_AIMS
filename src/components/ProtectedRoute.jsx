// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext'; // Assuming you're using the AuthContext

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  if (!localStorage.getItem('user')) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/" replace />;
  }

  console.log("Returned children");
  return children; // Render the child components if authenticated
};

export default ProtectedRoute;
