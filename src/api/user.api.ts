import HTTP_ADMIN_SERVICE from '@/config/axios-admin.config';

export const currentUserByIdApi = (id: number) => {
  return HTTP_ADMIN_SERVICE.get(`/user/get-by-id/${id}`);
};
