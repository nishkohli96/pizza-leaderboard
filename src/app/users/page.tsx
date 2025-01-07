import { Metadata } from 'next';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { axiosApi } from '@/api';
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
  console.log('queryParams: ', queryParams);
  const response = await axiosApi.get<GetUsersResponse>('/users', {
    params: queryParams
  });
  const usersListData = response.data.data!;
  const { page, perPage, nbRecords, records } = usersListData;

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant="h5" color="primary">
          Users List
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
          />
        </Container>
      </Grid>
    </Grid>
  );
}
