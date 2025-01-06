'use client';

import dynamic from 'next/dynamic';
import { User } from '@/types';
import { createUser } from '@/db/actions';

const UserForm = dynamic(() => import('@/components/user-form'), { ssr: false });

export default function AddUserPage() {
  async function onS(user: User) {
    console.log('user: ', user);
    await createUser(user);
  }

  return (
    <>
      <UserForm
        title='Add User'
        onSubmit={onS}
      />
    </>
  );
}
