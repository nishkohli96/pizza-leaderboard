import { NextRequest } from 'next/server';
import { NextApiResponse } from '@/utils';
import db from '@/db';
import { dbTables, messages } from '@/constants';
import { User } from '@/types';

export async function POST(
  request: NextRequest,
) {
  try {
    const supabase = await db.connect();
    const user: User = await request.json();
    await supabase.from(dbTables.user).insert({
      ...user,
      age: Number(user.age)
    });

    return NextApiResponse.success({
      message: messages.user.createSuccess,
    });
  } catch(error) {
    return NextApiResponse.failure({
      message: messages.user.createFail,
      error
    });
  }
}
