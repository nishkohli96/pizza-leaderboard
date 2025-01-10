import { NextRequest } from 'next/server';
import { NextApiResponse } from '@/utils';
import db from '@/db';
import { dbTables } from '@/constants';
import { Order } from '@/types';

export async function POST(
  request: NextRequest
) {
  try {
    // return NextResponse.json(
    // 	generateSuccessPayload(
    // 		'Order placed successfully.',
    // 		23,
    // 	)
    // )
    const data = { id: 1, name: 'John Doe' }; // Example payload
    return NextApiResponse.success({
      message: 'User created successfully',
      data: 34
    });
  } catch(error) {
    return NextApiResponse.failure({
      message: 'User created successfully',
      error
    });

    // return NextResponse.json(
    // 	generateErrorPayload(
    // 		'Unable to create an order',
    // 		error,
    // 	)
    // )
  }
}
