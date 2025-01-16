import { axiosApi } from '@/axios';
import {
  LeaderBoardListResponse,
  ResponseBody,
  UserListQueryParams
} from '@/types';
import { LeaderboardDataGrid } from '.';

type GetLeaderboardResponse = ResponseBody<LeaderBoardListResponse>;

type LeaderboardProps = {
  queryParams: UserListQueryParams;
}

export default async function Leaderboard({
  queryParams
}: LeaderboardProps) {
  const response = await axiosApi.get<GetLeaderboardResponse>('/leaderboard', {
    params: queryParams
  });
  const leaderboardListData = response.data.data!;
  const { page, perPage, nbRecords, records } = leaderboardListData;

  return (
    <LeaderboardDataGrid
      records={records}
      nbRecords={nbRecords}
      paginationModel={{
        page: page - 1,
        pageSize: perPage
      }}
    />
  );
}
