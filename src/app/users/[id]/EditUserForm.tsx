'use client';

import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { User } from '@/types';
import { updateUser } from '@/db/actions';

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
    const success = await updateUser(userId, user);
    if(success) {
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
