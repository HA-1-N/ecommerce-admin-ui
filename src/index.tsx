import React from 'react';
import ReactDOM from 'react-dom/client';

import GlobalStyles from '@/components/GlobalStyles/GlobalStyles';
import App from './App';
import './index.css';
import setupAxiosInterceptors from '@/config/axios-interceptor';
import HTTP_ADMIN_SERVICE from './config/axios-admin.config';
import { bindActionCreators } from '@reduxjs/toolkit';
import { store } from './app/store';
import { decreaseFetch, increaseFetch } from '@/features/app/appSlice';

const actions = bindActionCreators({ increaseFetch, decreaseFetch }, store.dispatch);

setupAxiosInterceptors(
  () => () => {},
  () => actions.increaseFetch(1),
  () => actions.decreaseFetch(1),
  HTTP_ADMIN_SERVICE,
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <GlobalStyles>
      <App />
    </GlobalStyles>
  </React.StrictMode>,
);
