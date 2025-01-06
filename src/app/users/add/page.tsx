'use client';

import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { User } from '@/types';
import { addUser } from '@/db/actions';

export const metadata: Metadata = {
  title: 'Add User',
  description: 'Create a new user in the database.'
};

const UserForm = dynamic(() => import('../components/UserForm'), {
  ssr: false
});

export default function AddUserPage() {
  async function createUser(user: User) {
    const { error, data } = await addUser(user);
  }

  return (
    <UserForm
      title='Add User'
      onSubmit={createUser}
    />
  );
}
