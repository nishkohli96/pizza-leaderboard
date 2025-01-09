import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';
import { dbTables } from '@/constants';
import { APIResponse, Order } from '@/types';
import { generateSuccessPayload, generateErrorPayload } from '@/utils';

export async function POST(
	request: NextRequest
): APIResponse<number> {
  try {
		return NextResponse.json(
			generateSuccessPayload(
				'Order placed successfully.',
				23,
			)
		)
	} catch(error) {
    return NextResponse.json(
			generateErrorPayload(
				'Unable to create an order',
				error,
			)
		)
	}
}