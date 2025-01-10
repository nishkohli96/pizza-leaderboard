import { NextRequest } from 'next/server';
import { NextApiResponse } from '@/utils';
import db from '@/db';
import { dbTables, dataTableConfig } from '@/constants';
import { UsersListResponse } from '@/types';

const defaultPageLimit = dataTableConfig.paginationOptions[0];

export async function GET(
  request: NextRequest
) {
  const { searchParams } = request.nextUrl;
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const limit = searchParams.get('limit')
    ? Number(searchParams.get('limit'))
    : defaultPageLimit;
  const skip = (page - 1) * limit;

  try {
    const supabase = await db.connect();
    const { data } = await supabase
      .from(dbTables.user)
      .select('id, name, gender, coins')
      .eq('isDeleted', false)
      .range(skip, skip + limit - 1);
    const { count } = await supabase
      .from(dbTables.user)
      .select('id', { count: 'exact' })
      .eq('isDeleted', false);

    return NextApiResponse.success<UsersListResponse>({
      message: 'Users list fethed successfully.',
      data: {
        nbRecords: count ?? 0,
        page,
        perPage: limit,
        records: data ?? []
      },
    });
  } catch(error) {
    return NextApiResponse.failure({
      message: 'Unable to fetch users list',
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
