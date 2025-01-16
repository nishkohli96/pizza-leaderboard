import axios from 'axios';
import { toast } from 'react-toastify';
import { ResponseBody } from '@/types';

export function handleAxiosError(error: unknown) {
  if(error instanceof axios.AxiosError) {
    const apiResponse = error.response?.data as ResponseBody;
    toast.error(apiResponse.message);
  } else {
    toast.error(JSON.stringify(error));
  }
}
