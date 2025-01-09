import { Metadata } from 'next';
import AddUserForm from './AddUserForm';

export const metadata: Metadata = {
  title: 'Add User',
  description: 'Create a new user in the database.'
};

export default function AddUserPage() {
  return (
    <AddUserForm />
  );
}
