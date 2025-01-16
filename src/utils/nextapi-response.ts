import { NextResponse } from 'next/server';
import { ResponseBody } from '@/types';

interface ResponseDetails {
  message: string;
  statusCode?: number;
}

interface SuccessResponseOptions<T = null> extends ResponseDetails {
  data?: T | null;
}

interface ErrorResponseOptions extends ResponseDetails {
  error: unknown | string | null;
  data?: unknown
}

class NextApiResponse {
  static success<T = null>({
    message,
    statusCode = 200,
    data = null,
  }: SuccessResponseOptions<T>): NextResponse<ResponseBody<T>> {
    const responseBody: ResponseBody<T> = {
      success: true,
      statusCode,
      message,
      data,
      error: null
    };

    return NextResponse.json(responseBody, { status: statusCode });
  }

  static failure({
    message,
    statusCode = 500,
    error = null,
    data = null
  }: ErrorResponseOptions): NextResponse<ResponseBody<typeof data>> {
    const responseBody: ResponseBody<typeof data> = {
      success: false,
      statusCode,
      message,
      data,
      error: JSON.stringify(error)
    };
    return NextResponse.json(responseBody, { status: statusCode });
  }
}

export default NextApiResponse;
