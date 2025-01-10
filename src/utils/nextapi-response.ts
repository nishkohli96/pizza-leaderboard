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
}

class NextApiResponse {
  static success<T = null>({
    message,
    data = null,
    statusCode = 200
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
    error = null,
    statusCode = 500
  }: ErrorResponseOptions): NextResponse<ResponseBody> {
    const responseBody: ResponseBody = {
      success: false,
      statusCode,
      message,
      data: null,
      error: JSON.stringify(error)
    };
    return NextResponse.json(responseBody, { status: statusCode });
  }
}

export default NextApiResponse;
