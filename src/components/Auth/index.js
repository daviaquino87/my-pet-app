import React from 'react';
import { Navigate } from 'react-router-dom';

function AuthUser({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to={'/'} />;
  }
  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthUser;
