import { NextRequest } from 'next/server';
import { NextApiResponse } from '@/utils';
import db from '@/db';
import { messages } from '@/constants';
import { LeaderBoardListResponse } from '@/types';
import { getPaginationValues } from '@/utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const supabase = await db.connect();
    const { page, limit, skip } = getPaginationValues(
      searchParams.get('page'),
      searchParams.get('limit')
    );

    const { data } = await supabase.rpc('getleaderboard', {
      perpage: limit,
      skip
    });
    const { data: count } = await supabase.rpc('leaderboards_count');

    return NextApiResponse.success<LeaderBoardListResponse>({
      message: messages.leaderboard.fetchSuccess,
      data: {
        nbRecords: count ?? 0,
        page,
        perPage: limit,
        records: data ?? []
      }
    });
  } catch (error) {
    return NextApiResponse.failure({
      message: messages.leaderboard.fetchFail,
      error
    });
  }
}
