import { NextRequest } from 'next/server';
import { NextApiResponse } from '@/utils';
import db from '@/db';
import { dbTables, messages } from '@/constants';
import { UserOrdersListResponse, UserDetails } from '@/types';

export async function GET(request: NextRequest) {
  try {
		const { searchParams } = request.nextUrl;
		const userId = searchParams.get('userId');
		if(!userId) {
      return NextApiResponse.failure({
				statusCode: 400,
				message: messages.order.fetchUserFail,
				error: messages.order.missingUserId
			})
		}

    const supabase = await db.connect();
    const { data: userData }: { data: UserDetails | null } = await supabase
			.from(dbTables.user)
			.select('*')
			.eq('id', userId)
			.single();
		if(!userData) {
			return NextApiResponse.failure({
        statusCode: 400,
        message: messages.user.notFound,
        error: null
      });
		}

    const { data: userOrdersList } = await supabase
      .from(dbTables.order)
      .select('id, pizza_id, isLogged, created_at, logged_at')
      .eq('user_id', userId);

    return NextApiResponse.success<UserOrdersListResponse>({
      message: messages.order.fetchUserSuccess,
      data: {
        records: userOrdersList ?? []
      }
    });
  } catch (error) {
    return NextApiResponse.failure({
      message: messages.order.fetchUserFail,
      error
    });
  }
}
