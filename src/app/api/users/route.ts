import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';
import { dbTables, dataTableConfig } from '@/constants';
import { APIResponse, UsersListResponse } from '@/types';

export async function GET(
  request: NextRequest
): APIResponse<UsersListResponse> {
  const { searchParams } = request.nextUrl;
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const limit = searchParams.get('limit')
    ? Number(searchParams.get('limit'))
    : dataTableConfig.paginationOptions[0];
  const skip = (page - 1) * limit;

  try {
    const supabase = await db.connect();
    const { data } = await supabase
      .from(dbTables.user)
      .select('id, name, gender, coins')
      .range(skip, skip + limit - 1);
    const { count } = await supabase
      .from(dbTables.user)
      .select('id', { count: 'exact' });

    return NextResponse.json({
      success: true,
      statusCode: 200,
      data: {
        nbRecords: count ?? 0,
        page,
        perPage: limit,
        records: data ?? []
      }
    });
  } catch {
    return NextResponse.json({
      success: false,
      statusCode: 500,
      data: null,
      error: 'Unable to fetch users list'
    });
  }
}
