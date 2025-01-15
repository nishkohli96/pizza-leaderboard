import { Metadata } from 'next';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { axiosApi } from '@/axios';
import {
  ResponseBody,
  SearchParams,
  UserListQueryParams,
  UsersListResponse,
} from '@/types';
import { UserDataGrid } from './components';

type GetUsersResponse = ResponseBody<UsersListResponse>;

export const metadata: Metadata = {
  title: 'Users List',
  description: 'List of users competing'
};

export default async function UsersListPage({
  searchParams
}: SearchParams<UserListQueryParams>) {
  const queryParams = await searchParams;
  const response = await axiosApi.get<GetUsersResponse>('/users', {
    params: queryParams
  });

  const usersListData = response.data.data!;
  const { page, perPage, nbRecords, records } = usersListData;

  return (
    <Grid container spacing={2}>
      <Grid size={12} display="flex" justifyContent="center">
        <Typography variant="h5" color="primary">
          <u>Users List</u>
        </Typography>
      </Grid>
      <Grid size={12}>
        <Container maxWidth="md">
          <UserDataGrid
            users={records}
            nbRecords={nbRecords}
            paginationModel={{
              page: page - 1,
              pageSize: perPage
            }}
            sortColumn={{
              field: queryParams.sortKey ?? 'coins',
              sort: queryParams.sortOrder ?? 'asc'
            }}
          />
        </Container>
      </Grid>
    </Grid>
  );
}
