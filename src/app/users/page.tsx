import { Metadata } from 'next';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { axiosApi } from '@/api';
import { dataTableConfig } from '@/constants';
import {
  APIResponse,
  SearchParams,
  UserRow,
  UserListQueryParams
} from '@/types';
import { UserDataGrid } from './components';

type UsersListResponse = APIResponse<{
	records: UserRow[];
  nbRecords: number;
}>;

export const metadata: Metadata = {
  title: 'Users List',
  description: 'List of users competing'
};

export default async function UsersListPage({
  searchParams
}: SearchParams<UserListQueryParams>) {
  const queryParams = await searchParams;
  const response = await axiosApi.get<UsersListResponse>('/users', {
    params: queryParams
  });
  const usersList = response.data.data?.records ?? [];
  const nbRecords = response.data.data?.nbRecords ?? 0;

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
            users={usersList}
            nbRecords={10}
            paginationModel={{
              page: 0,
              pageSize: dataTableConfig.defaultPageSize
            }}
          />
        </Container>
      </Grid>
    </Grid>
  );
}
