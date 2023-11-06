import { useAppDispatch, useAppSelector } from '@/app/hook';
import { getCurrentUserByIdAsync } from '@/features/auth/authSlice';
import { clearStorage, getLocalStorageId, getLocalStorageToken } from '@/utils/auth.util';
import { isRejected } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

interface AuthenticationRouterProps {
  children: React.ReactNode;
}

const AuthenticationRouter = (props: AuthenticationRouterProps) => {
  const { children } = props;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = getLocalStorageToken();
  const id = getLocalStorageId();

  const currentUser = useAppSelector((state) => state?.auth?.currentUser);

  const init = async () => {
    if (token && id) {
      if (!currentUser) {
        const currentUserApiAsyncAction = await dispatch(getCurrentUserByIdAsync(Number(id)));
        if (isRejected(currentUserApiAsyncAction)) {
          clearStorage();
        }
      }
    }
  };

  useEffect(() => {
    init();
  }, []);

  if (token) {
    if (currentUser) {
      if (id) {
        return <>{children}</>;
      } else {
        return <Navigate to={'/sign-in'} replace />;
      }
    } else {
      // TODO: Add spinner
      return <></>;
    }
  }

  return <Navigate to={'/sign-in'} replace />;
};

export default AuthenticationRouter;
