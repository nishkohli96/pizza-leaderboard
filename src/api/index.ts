import axios from 'axios';
import { envVars } from '@/constants';

export const axiosApi = axios.create({
  baseURL: `${envVars.hostURL}/api`
});
