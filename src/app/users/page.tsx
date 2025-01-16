import { Suspense } from 'react';
import { Metadata } from 'next';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { TableSkeleton } from '@/components'; 
import {
  ResponseBody,
  SearchParams,
  UserListQueryParams,
  UsersListResponse,
} from '@/types';
import { UsersPage } from './components';

type GetUsersResponse = ResponseBody<UsersListResponse>;

export const metadata: Metadata = {
  title: 'Users List',
  description: 'List of users competing'
};

export default async function UsersListPage({
  searchParams
}: SearchParams<UserListQueryParams>) {
  const queryParams = await searchParams;
  return (
    <Grid container spacing={2}>
      <Grid size={12} display="flex" justifyContent="center">
        <Typography variant="h5" color="primary">
          <u>Users List</u>
        </Typography>
      </Grid>
      <Grid size={12}>
        <Container maxWidth="md">
          <Suspense fallback={<TableSkeleton />}>
            <UsersPage queryParams={queryParams} />
          </Suspense>
        </Container>
      </Grid>
    </Grid>
  );
}
