import React, { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';

interface RoleGuardProps {
  children: ReactNode;
  roles?: string[];
  permissions?: string[];
  requireAll?: boolean;
  fallback?: ReactNode;
  redirectTo?: string;
}

/**
 * RoleGuard component for conditional rendering based on user roles and permissions
 * 
 * @param roles - Array of roles that can access the content
 * @param permissions - Array of permissions required to access the content
 * @param requireAll - If true, user must have ALL specified roles/permissions
 * @param fallback - Component to render if access is denied
 * @param redirectTo - Route to redirect to if access is denied (alternative to fallback)
 */
export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  roles = [],
  permissions = [],
  requireAll = false,
  fallback = null,
  redirectTo
}) => {
  const { user, hasRole, hasPermission, hasAnyRole, hasAnyPermission } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    if (redirectTo) {
      navigate(redirectTo);
      return null;
    }
    return <>{fallback}</>;
  }

  let hasAccess = true;

  if (roles.length > 0) {
    if (requireAll) {
      hasAccess = roles.every(role => hasRole(role));
    } else {
      hasAccess = hasAnyRole(roles);
    }
  }

  if (permissions.length > 0 && hasAccess) {
    if (requireAll) {
      hasAccess = permissions.every(permission => hasPermission(permission));
    } else {
      hasAccess = hasAnyPermission(permissions);
    }
  }

  if (!hasAccess) {
    if (redirectTo) {
      navigate(redirectTo);
      return null;
    }
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export const AdminOnly: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ 
  children, 
  fallback = null 
}) => (
  <RoleGuard roles={['admin']} fallback={fallback}>
    {children}
  </RoleGuard>
);

export const CSROnly: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ 
  children, 
  fallback = null 
}) => (
  <RoleGuard roles={['csr']} fallback={fallback}>
    {children}
  </RoleGuard>
);

export const AdminOrCSR: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ 
  children, 
  fallback = null 
}) => (
  <RoleGuard roles={['admin', 'csr']} fallback={fallback}>
    {children}
  </RoleGuard>
);

export default RoleGuard;
