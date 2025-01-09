import axios from 'axios';
import { envVars } from '@/constants';

/**
 * By default, Axios does not automatically respect HTTP
 * cache headers like Cache-Control, ETag, or Expires. So
 * to allow that we need to use the below package:
 * 
 * https://www.npmjs.com/package/axios-cache-interceptor
 */
export const axiosApi = axios.create({
  baseURL: `${envVars.hostURL}/api`
});
