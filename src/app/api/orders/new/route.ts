import { NextRequest } from 'next/server';
import { NextApiResponse } from '@/utils';
import db from '@/db';
import { dbTables } from '@/constants';
import { Order } from '@/types';

export async function POST(
  request: NextRequest
) {
  try {
    const orderDetails: Order = await request.json();
    console.log('orderDetails: ', orderDetails);
    return NextApiResponse.success({
      message: 'Order placed successfully',
      data: orderDetails
    });
  } catch(error) {
    return NextApiResponse.failure({
      message: 'Unable to place order',
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
