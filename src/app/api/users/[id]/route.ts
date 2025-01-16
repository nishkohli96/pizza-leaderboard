import { NextRequest } from 'next/server';
import { NextApiResponse } from '@/utils';
import db from '@/db';
import { dbTables, messages } from '@/constants';
import { Params, User, UserDetails } from '@/types';

type ReqParams = Params<{
  id: string;
}>;

export async function GET(request: NextRequest, { params }: ReqParams) {
  try {
    const userId = (await params).id;
    const supabase = await db.connect();

    const { data }: { data: UserDetails | null } = await supabase
      .from(dbTables.user)
      .select('*')
      .eq('id', userId)
      .single();
    if(!data) {
      return NextApiResponse.failure({
        statusCode: 400,
        message: messages.user.notFound,
        error: null
      });
    }

    return NextApiResponse.success<UserDetails>({
      message: messages.user.fetchSuccess,
      data
    });
  } catch (error) {
    return NextApiResponse.failure({
      message: messages.user.fetchFail,
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

    const { data }: { data: UserDetails | null } = await supabase
      .from(dbTables.user)
      .select('*')
      .eq('id', userId)
      .single();
    if(!data) {
      return NextApiResponse.failure({
        statusCode: 400,
        message: messages.user.notFound,
        error: null
      });
    }

    await supabase
      .from(dbTables.user)
      .update({
        ...userDetails,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    return NextApiResponse.success({
      message: messages.user.updateSuccess
    });
  } catch (error) {
    return NextApiResponse.failure({
      message: messages.user.updateFail,
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
      message: messages.user.deleteSuccess
    });
  } catch (error) {
    return NextApiResponse.failure({
      message: messages.user.deleteFail,
      error
    });
  }
}
