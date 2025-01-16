'use client';

import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';
import { axiosApi } from '@/axios';
import { ResponseBody, User } from '@/types';

const UserForm = dynamic(() => import('../components/UserForm'), {
  ssr: false
});

export default function AddUserForm() {
  async function handleUserUpdate(user: User) {
    const response = await axiosApi.post<ResponseBody>(
      '/users/add',
      user
    );
    const success = response.data.success;
    if (success) {
      toast.success(response.data.message);
      redirect('/users');
    }
  }
  return (
    <UserForm
      title="Create User"
      onSubmit={handleUserUpdate}
    />
  );
}
