import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';
import { dbTables } from '@/constants';
import { APIResponse, User } from '@/types';

export async function POST(
  request: NextRequest,
): APIResponse {
  try {
    const supabase = await db.connect();
    const user: User = await request.json();
    await supabase.from(dbTables.user).insert({
      ...user,
      age: Number(user.age)
    });

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: 'User created successfully.',
      data: null,
      error: null
    });
  } catch {
    return NextResponse.json({
      success: false,
      statusCode: 500,
      message: 'Unable to create user.',
      data: null,
      error: 'Unable to create user.'
    });
  }
}
