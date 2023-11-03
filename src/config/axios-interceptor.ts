import { KEY_STORES } from '@/constants/key-store.constant';
import { AxiosRequestConfig } from 'axios';

const setupAxiosInterceptors = (onUnauthenticated: any, increaseFetch: any, decreaseFetch: any, axiosCustom: any) => {
  const onRequestSucess = (config: AxiosRequestConfig | any) => {
    if (!config.ignoreSpinner) {
      increaseFetch();
    }

    const token = localStorage.getItem(KEY_STORES.accessToken);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  };

  const onResponseSuccess = (response: any) => {
    if (!response.config.ignoreSpinner && !response.config) {
      decreaseFetch();
    }
    return response;
  };

  const onResponseError = (err: any) => {
    const { config } = err;
    if (!(config && config.ignoreSpinner)) {
      decreaseFetch();
    }
    const status = err.status || (err.response ? err.response.status : 0);
    if (status === 403 || status === 401) {
      onUnauthenticated();
    }
    return Promise.reject(err);
  };

  axiosCustom.interceptors.request.use(onRequestSucess);
  axiosCustom.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
