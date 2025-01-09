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

import { NextResponse } from 'next/server';
import db from '@/db';
import { dbTables } from '@/constants';
import { APIResponse, PizzaListResponse } from '@/types';

export const dynamic = 'force-static';

export async function GET(): APIResponse<PizzaListResponse> {
  try {
    const supabase = await db.connect();
    const { data } = await supabase
      .from(dbTables.pizza)
      .select('*');

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: 'List of pizzas.',
      data: {
        records: data ?? []
      },
      error: null
    });
  } catch {
    return NextResponse.json({
      success: false,
      statusCode: 500,
      message: 'Unable to fetch list of pizzas.',
      data: null,
      error: 'Unable to fetch list of pizzas.'
    });
  }
}
