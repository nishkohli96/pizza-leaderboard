import { NextResponse } from 'next/server';

export type ResponseBody<T = null> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T | null;
  error: string | null;
};

export type APIResponse<T = null> = Promise<NextResponse<ResponseBody<T>>>;
