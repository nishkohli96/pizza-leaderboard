import { UserDetails, PaginatedResponse } from '.';

export type LeaderboardRecord = Pick<
  UserDetails,
	| 'id'
	| 'name'
	| 'coins'
> & { num_orders: number };

export type LeaderBoardListResponse = PaginatedResponse<LeaderboardRecord>;
