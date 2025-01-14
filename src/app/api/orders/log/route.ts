import { NextRequest } from 'next/server';
import { NextApiResponse } from '@/utils';
import db from '@/db';
import { dbTables, messages } from '@/constants';
import { LogPizza } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const supabase = await db.connect();
    const { order_id }: LogPizza = await request.json();
    await supabase.from(dbTables.order)
      .update({
        isLogged: true,
        logged_at: new Date()
      })
      .eq('id', order_id);

    return NextApiResponse.success({
      message: messages.order.logSuccess,
    });
  } catch (error) {
    return NextApiResponse.failure({
      message: messages.order.logFail,
      error
    });
  }
}
