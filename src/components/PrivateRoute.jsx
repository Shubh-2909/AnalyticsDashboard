import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import LoadingSpinner from './LoadingSpinner'; // Assuming LoadingSpinner is in the same directory

const PrivateRoute = ({ children }) => {
  const { loggedIn, checkingIn } = useAuthStatus();

  if (checkingIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return loggedIn ? children : <Navigate to="/sign-in" />;
};

export default PrivateRoute;