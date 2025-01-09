import { APIResponse, Order, ResponseBody } from '@/types';

export function generateSuccessPayload<T>(
	message: string,
	data: T
): ResponseBody<T> {
	return {
		success: true,
		statusCode: 200,
		message,
		data,
		error: null,
	}
}

export function generateErrorPayload(
	message: string,
	error: unknown
) {
	return {
		success: false,
		statusCode: 500,
		message,
		data: null,
		error: JSON.stringify(error)
	}
}
