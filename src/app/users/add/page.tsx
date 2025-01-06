'use client';

import dynamic from 'next/dynamic';
import { User } from '@/types';
import { addUser } from '@/db/actions';

const UserForm = dynamic(() => import('@/components/user-form'), { ssr: false });

export default function AddUserPage() {
  async function createUser(user: User) {
    const { error, data } = await addUser(user);
  }

  return (
    <>
      <UserForm
        title='Add User'
        onSubmit={createUser}
      />
    </>
  );
}
