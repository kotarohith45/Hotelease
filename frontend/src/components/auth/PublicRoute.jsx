import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const PublicRoute = ({ children }) => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  // If user is logged in, redirect to appropriate dashboard
  if (user) {
    const dashboardPaths = {
      customer: '/dashboard',
      manager: '/manager',
      admin: '/admin'
    };
    return <Navigate to={dashboardPaths[user.role] || '/dashboard'} replace />;
  }

  return children;
};

export default PublicRoute;
