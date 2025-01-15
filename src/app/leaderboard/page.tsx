import { Metadata } from 'next';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { axiosApi } from '@/axios';
import { LeaderBoardListResponse, ResponseBody, SearchParams, UserListQueryParams } from '@/types';
import { LeaderboardDataGrid } from './components';

export const metadata: Metadata = {
  title: 'Leaderboards',
  description: 'Users logged in most pizzas listed at the top'
};

type GetLeaderboardResponse = ResponseBody<LeaderBoardListResponse>;

export default async function LeaderboardPage({
	searchParams
}: SearchParams<UserListQueryParams>) {
	const queryParams = await searchParams;
	const response = await axiosApi.get<GetLeaderboardResponse>('/orders/leaderboard', {
		params: queryParams
	});
	const leaderboardListData = response.data.data!;
	const { page, perPage, nbRecords, records } = leaderboardListData;
	
  return (
    <Box sx={{ p: '30px 20px' }}>
      <Grid container spacing={2}>
        <Grid size={12} display="flex" justifyContent="center">
          <Typography variant="h5" color="primary">
            <u>Leaderboards</u>
          </Typography>
        </Grid>
        <Grid size={12}>
          <Container maxWidth="md">
            <LeaderboardDataGrid
						// @ts-ignore
              records={[records]}
              nbRecords={nbRecords}
              paginationModel={{
                page: page - 1,
                pageSize: perPage
              }}
            />
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}
