import { NextResponse } from 'next/server';

export type ResponseBody<T> = {
	success: boolean;
	statusCode: number;
	data: T | null;
	error?: string;
}

export type APIResponse<T> = Promise<NextResponse<ResponseBody<T>>>;
