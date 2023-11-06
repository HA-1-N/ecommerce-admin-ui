import { KEY_STORES } from '@/constants/key-store.constant';

export const setLocalStorageToken = (value: any) => {
  localStorage.setItem(KEY_STORES.accessToken, value);
};

export const setLocalStorageId = (id: any) => {
  localStorage.setItem(KEY_STORES.id, id);
};

export const getToken = () => {
  localStorage.getItem(KEY_STORES.accessToken);
};

export const deleteToken = () => {
  return localStorage.removeItem(KEY_STORES.accessToken);
};
