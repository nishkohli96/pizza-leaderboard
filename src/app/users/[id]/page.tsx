import { Metadata } from 'next';
import { getUserById } from '@/db/actions';
import EditUserForm from './EditUserForm';
import { User } from '@/types';

export const metadata: Metadata = {
  title: 'Edit User',
  description: 'Edit user details in the database.'
};

type EditUserPageProps = {
  params: Promise<{ id: string }>;
}

export default async function EditUserPage({
  params
}: EditUserPageProps) {
  const userId = (await params).id;
  const { data } = await getUserById(userId);

  return (
    <EditUserForm user={data as User} userId={userId}/>
  );
}
