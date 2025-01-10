import { NextRequest } from 'next/server';
import { NextApiResponse } from '@/utils';
import db from '@/db';
import { dbTables } from '@/constants';
import { Params, User, UserDetails } from '@/types';

type ReqParams = Params<{
  id: string;
}>;

export async function GET(request: NextRequest, { params }: ReqParams) {
  try {
    const userId = (await params).id;
    const supabase = await db.connect();
    const { data } = await supabase
      .from(dbTables.user)
      .select('*')
      .eq('id', userId)
      .single();

    return NextApiResponse.success<UserDetails>({
      message: 'User details fetched.',
      data
    });
  } catch (error) {
    return NextApiResponse.failure({
      message: 'Unable to fetch user details.',
      error
    });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: ReqParams
) {
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
      .eq('id', userId);

    return NextApiResponse.success({
      message: 'User details updated.'
    });
  } catch (error) {
    return NextApiResponse.failure({
      message: 'Unable to update user details.',
      error
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: ReqParams
) {
  try {
    const userId = (await params).id;
    const supabase = await db.connect();
    await supabase
      .from(dbTables.user)
      .update({
        isDeleted: true
      })
      .eq('id', userId);

    return NextApiResponse.success({
      message: 'User deleted successfully.'
    });
  } catch (error) {
    return NextApiResponse.failure({
      message: 'Unable to delete user.',
      error
    });
  }
}
