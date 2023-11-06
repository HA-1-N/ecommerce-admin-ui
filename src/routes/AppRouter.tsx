import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Register from '@/pages/auth/register/Register';
import ErrorPage from '@/pages/404/ErrorPage';
import Login from '@/pages/auth/login/Login';
import { Layout } from 'antd';
import LayoutApp from '@/pages/layout/LayoutApp';
import AuthenticationRouter from '@/components/auth/AuthenticationRouter';
import AuthorizationRouter from '@/components/auth/AuthorizationRouter';
import { ROLE_CONSTANT } from '@/constants/auth.constants';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: '/sign-in',
      element: <Login />,
    },
    // {
    //   path: '/sign-up',
    //   element: <Register />,
    // },
    {
      path: '/404',
      element: <ErrorPage />,
    },
    {
      path: '/',
      errorElement: <ErrorPage />,
      element: (
        <AuthenticationRouter>
          <AuthorizationRouter roles={[ROLE_CONSTANT.ADMIN]}>
            <LayoutApp />
          </AuthorizationRouter>
        </AuthenticationRouter>
      ),
      children: [],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
