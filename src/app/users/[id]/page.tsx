import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { getUserById } from '@/db/actions';
import { User } from '@/types';

// const UserForm = dynamic(() => import('../components/UserForm'), {
//   ssr: false
// });

export const metadata: Metadata = {
  title: 'Add User',
  description: 'Create a new user in the database.'
};


type EditUserPageProps = {
  params: Promise<{ id: string }>;
}

export default async function EditUserPage({ 
  params 
}: EditUserPageProps) {
  const userId = (await params).id
  const { data, error } = await getUserById(userId);
  console.log('data: ', data);

  function onS(user: User) {
    console.log('user: ', user);
  }

  return (
    <p>hello</p>
    // <UserForm title="Edit User" onSubmit={onS} />
  );
}
