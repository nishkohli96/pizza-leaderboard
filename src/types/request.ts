export type APIResponse<T> = {
	success: boolean;
	statusCode: number;
	data: T | null;
	error?: string;
}
