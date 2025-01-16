/**
 * Keeping the list of pizzas upto only 5 items, so
 * the response from this api should be cached. Using
 * "force-static" will enable static generation for the
 * route and cache the response during the build or the
 * first request.
 *
 * If there's a slight possibility of the data changing
 * and you want to regenerate it periodically, consider adding:
 *
 * export const revalidate = 3600; // Regenerate every hour (3600 seconds)
 */

import { NextApiResponse } from '@/utils';
import db from '@/db';
import { dbTables, messages } from '@/constants';
import { PizzaListResponse } from '@/types';

export const dynamic = 'force-static';

export async function GET() {
  try {
    const supabase = await db.connect();
    const { data } = await supabase.from(dbTables.pizza).select('*');

    return NextApiResponse.success<PizzaListResponse>({
      message: messages.pizza.fetchListSuccess,
      data: {
        records: data ?? []
      }
    });
  } catch (error) {
    return NextApiResponse.failure({
      message: messages.pizza.fetchListFail,
      error
    });
  }
}
