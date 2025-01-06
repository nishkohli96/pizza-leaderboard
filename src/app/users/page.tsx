import { Metadata } from 'next';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { getUsers } from '@/db/actions';
import { UserRow } from '@/types';
import { UserDataGrid } from './components';

export const metadata: Metadata = {
	title: 'Users List',
	description: 'List of users competing'
}

export default async function UsersListPage() {
  const { data, error } = await getUsers();
	console.log('data: ', data);
	return (
		<Grid container>
			<Grid size={12}>
				<Typography variant='h3' color='primary'>
					Users List
				</Typography>
			</Grid>
			<Grid size={12}>
				<UserDataGrid
          users={data as UserRow[]}
					nbRecords={10}
					isFetchingData={false}
				/>
			</Grid>
		</Grid>
	);
}