'use client';

import dynamic from 'next/dynamic';
import { User } from '@/types';

const UserForm = dynamic(() => import('@/components/user-form'), {
  ssr: false
});

export default function EditUserPage() {
  function onS(user: User) {
    console.log('user: ', user);
  }

  return (
    <>
      <UserForm title="Add User" onSubmit={onS} />
    </>
  );
}
