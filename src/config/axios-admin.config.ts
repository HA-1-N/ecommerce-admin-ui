import { TIMEOUT } from '@/constants/axios.constants';
import axios from 'axios';

const HTTP_ADMIN_SERVICE = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
  timeout: TIMEOUT,
});

export default HTTP_ADMIN_SERVICE;
