import { useAppSelector } from '@/app/hook';
import { RoleModel } from '@/model/role.model';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface AuthorizationRouterProps {
  roles: String[];
  children: React.ReactNode;
}

const AuthorizationRouter = (props: AuthorizationRouterProps) => {
  const { roles, children } = props;

  const currentUser = useAppSelector((state) => state?.auth?.currentUser);
  const currentUserRoles: RoleModel[] = currentUser.roles;

  if (currentUser) {
    if (currentUserRoles) {
      if (currentUserRoles.some((role) => roles.includes(role?.code))) {
        return <>{children}</>;
      } else {
        return <Navigate to={'/404'} replace />;
      }
    }
  }
  return <Navigate to={'/sign-in'} replace />;
};

export default AuthorizationRouter;
