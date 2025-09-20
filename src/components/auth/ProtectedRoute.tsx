import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { RoleGuard } from './RoleGuard';
import { Loader } from '../ui';

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: string[];
  permissions?: string[];
  requireAll?: boolean;
  redirectTo?: string;
}

/**
 * ProtectedRoute component for route-level access control
 * 
 * @param roles - Array of roles that can access the route
 * @param permissions - Array of permissions required to access the route
 * @param requireAll - If true, user must have ALL specified roles/permissions
 * @param redirectTo - Route to redirect to if access is denied (defaults to /signin)
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  roles = [],
  permissions = [],
  requireAll = false,
  redirectTo = '/signin'
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <Loader />
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (roles.length === 0 && permissions.length === 0) {
    return <>{children}</>;
  }

  return (
    <RoleGuard 
      roles={roles} 
      permissions={permissions} 
      requireAll={requireAll}
      redirectTo={redirectTo}
    >
      {children}
    </RoleGuard>
  );
};

export const AdminRoute: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ProtectedRoute roles={['admin']}>
    {children}
  </ProtectedRoute>
);

export const CSRRoute: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ProtectedRoute roles={['csr']}>
    {children}
  </ProtectedRoute>
);

export const AdminOrCSRRoute: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ProtectedRoute roles={['admin', 'csr']}>
    {children}
  </ProtectedRoute>
);

export default ProtectedRoute;
