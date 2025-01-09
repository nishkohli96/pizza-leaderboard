import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { axiosApi } from '@/axios';
import EditUserForm from './EditUserForm';
import { Params, ResponseBody, UserDetails } from '@/types';

export const metadata: Metadata = {
  title: 'Edit User',
  description: 'Edit user details in the database.'
};

type EditUserPageProps = Params<{
  id: string;
}>;

export default async function EditUserPage({ params }: EditUserPageProps) {
  const userId = (await params).id;
  const response = await axiosApi.get<ResponseBody<UserDetails>>(
    `/users/${userId}`
  );
  const userData = response.data.data;
  if (!userData) {
    return notFound();
  }

  const formData = {
    name: userData.name,
    age: userData.age,
    gender: userData.gender
  };

  return (
    <EditUserForm
      user={formData}
      userId={userId}
    />
  );
}
