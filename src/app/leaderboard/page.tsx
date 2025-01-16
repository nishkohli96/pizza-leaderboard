import { Suspense } from 'react';
import { Metadata } from 'next';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { TableSkeleton } from '@/components';
import {
  SearchParams,
  UserListQueryParams
} from '@/types';
import { Leaderboard } from './components';

export const metadata: Metadata = {
  title: 'Leaderboards',
  description: 'Users logged in most pizzas listed at the top'
};

export default async function LeaderboardPage({
  searchParams
}: SearchParams<UserListQueryParams>) {
  const queryParams = await searchParams;
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
            <Suspense fallback={<TableSkeleton />}>
              <Leaderboard queryParams={queryParams} />
            </Suspense>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}
