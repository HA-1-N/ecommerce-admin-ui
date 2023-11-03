import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Register from '@/pages/auth/register/Register';
import ErrorPage from '@/pages/404/ErrorPage';
import Login from '@/pages/auth/login/Login';
import { Layout } from 'antd';
import LayoutApp from '@/pages/layout/LayoutApp';

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
      path: '/',
      errorElement: <ErrorPage />,
      element: <LayoutApp />,
      children: [],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
