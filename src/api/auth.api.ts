import HTTP_ADMIN_SERVICE from '@/config/axios-admin.config';
import { LoginProps } from '@/model/auth.model';

export const loginApi = async (body: LoginProps) => {
  return await HTTP_ADMIN_SERVICE.post('/auth/login', body);
};
