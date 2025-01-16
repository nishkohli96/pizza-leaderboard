'use client';

import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';
import { axiosApi } from '@/axios';
import { User, ResponseBody } from '@/types';

const UserForm = dynamic(() => import('../components/UserForm'), {
  ssr: false
});

type EditUserFormProps = {
  user: User;
  userId: string;
}

export default function EditUserForm({
  user,
  userId
}: EditUserFormProps) {

  async function handleUserUpdate(user: User) {
    const response = await axiosApi.patch<ResponseBody>(`/users/${userId}`, user);
    if(response.data.success) {
      toast.success(response.data.message);
      redirect('/users');
    }
  }
  return (
    <UserForm
      title="Edit User"
      initialData={user}
      onSubmit={handleUserUpdate}
    />
  );
}
