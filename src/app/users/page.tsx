import { Metadata } from 'next';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { getUsers } from '@/db/actions';
import { UserRow } from '@/types';
import { UserDataGrid } from './components';
import { dataTableConfig } from '@/constants';

export const metadata: Metadata = {
  title: 'Users List',
  description: 'List of users competing'
};

export default async function UsersListPage() {
  const { data, error } = await getUsers();
  console.log('data: ', data);
  return (
  // <>
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant='h5' color='primary'>
          Users List
        </Typography>
      </Grid>
      <Grid size={12}>
        <Container maxWidth="md">
          <UserDataGrid
            users={data as UserRow[]}
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
  // {/* </> */}
}
