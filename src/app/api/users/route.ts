import { NextRequest } from 'next/server';
import { NextApiResponse } from '@/utils';
import db from '@/db';
import { dbTables, dataTableConfig, messages } from '@/constants';
import { UsersListResponse } from '@/types';
import { getPaginationValues } from '@/utils';

const defaultPageLimit = dataTableConfig.paginationOptions[0];

export async function GET(
  request: NextRequest
) {
  const { searchParams } = request.nextUrl;
  const { page, limit, skip } = getPaginationValues(
    searchParams.get('page'),
    searchParams.get('limit')
  );

  try {
    const supabase = await db.connect();
    const { data } = await supabase
      .from(dbTables.user)
      .select('id, name, gender, coins')
      .eq('isDeleted', false)
      .order('coins', { ascending: true })
      .range(skip, skip + limit - 1);
    const { count } = await supabase
      .from(dbTables.user)
      .select('id', { count: 'exact' })
      .eq('isDeleted', false);

    return NextApiResponse.success<UsersListResponse>({
      message: messages.user.fetchListSuccess,
      data: {
        nbRecords: count ?? 0,
        page,
        perPage: limit,
        records: data ?? []
      },
    });
  } catch(error) {
    return NextApiResponse.failure({
      message: messages.user.fetchListFail,
      data: {
        nbRecords: 0,
        page: 1,
        perPage: defaultPageLimit,
        records: []
      },
      error
    });
  }
}
