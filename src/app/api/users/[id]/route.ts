import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';
import { dbTables } from '@/constants';
import { APIResponse, Params, User, UserDetails } from '@/types';

type ReqParams = Params<{
  id: string;
}>;

export async function GET(
  request: NextRequest,
  { params }: ReqParams
): APIResponse<UserDetails> {
  try {
    const userId = (await params).id;
    const supabase = await db.connect();
    const { data } = await supabase
      .from(dbTables.user)
      .select('*')
      .eq('id', userId)
      .single();

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: 'User details fetched.',
      data,
      error: null
    });
  } catch {
    return NextResponse.json({
      success: false,
      statusCode: 500,
      message: 'Unable to fetch user details.',
      data: null,
      error: 'Unable to fetch user details.'
    });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: ReqParams
): APIResponse {
  try {
    const userId = (await params).id;
    const userDetails: User = await request.json();
    const supabase = await db.connect();
    await supabase
      .from(dbTables.user)
      .update({
        ...userDetails,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: 'User details updated.',
      data: null,
      error: null
    });
  } catch {
    return NextResponse.json({
      success: false,
      statusCode: 500,
      message: 'Unable to update user details.',
      data: null,
      error: 'Unable to update user details.'
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: ReqParams
): APIResponse {
  try {
    const userId = (await params).id;
    const supabase = await db.connect();
    await supabase
      .from(dbTables.user)
      .update({
        isDeleted: true
      })
      .eq('id', userId)

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: 'User deleted successfully.',
      data: null,
      error: null
    });
  } catch {
    return NextResponse.json({
      success: false,
      statusCode: 500,
      message: 'Unable to delete user.',
      data: null,
      error: null
    });
  }
}
