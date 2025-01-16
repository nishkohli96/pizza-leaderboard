import { NextRequest } from 'next/server';
import { NextApiResponse } from '@/utils';
import db from '@/db';
import { dbTables, messages } from '@/constants';
import { UserOrdersListResponse, UserDetails } from '@/types';
import { getPaginationValues } from '@/utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const userId = searchParams.get('userId');
    if(!userId) {
      return NextApiResponse.failure({
        statusCode: 400,
        message: messages.order.fetchUserFail,
        error: messages.order.missingUserId
      });
    }

    const supabase = await db.connect();
    const { data: userData }: { data: UserDetails | null } = await supabase
      .from(dbTables.user)
      .select('id')
      .eq('id', userId)
      .single();
    if(!userData) {
      return NextApiResponse.failure({
        statusCode: 400,
        message: messages.user.notFound,
        error: null
      });
    }

    const { page, limit, skip } = getPaginationValues(
      searchParams.get('page'),
      searchParams.get('limit')
    );

    const { data: userOrdersList } = await supabase
      .from(dbTables.order)
      .select('id, pizza_id, isLogged, created_at, logged_at')
      .eq('user_id', userId)
      .eq('isLogged', true)
      .range(skip, skip + limit - 1);
    const { count } = await supabase
      .from(dbTables.order)
      .select('id', { count: 'exact' })
      .eq('user_id', userId)
      .eq('isLogged', true);

    return NextApiResponse.success<UserOrdersListResponse>({
      message: messages.order.fetchLoggedSuccess,
      data: {
        nbRecords: count ?? 0,
        page,
        perPage: limit,
        records: userOrdersList ?? []
      }
    });
  } catch (error) {
    return NextApiResponse.failure({
      message: messages.order.fetchLoggedFail,
      error
    });
  }
}
