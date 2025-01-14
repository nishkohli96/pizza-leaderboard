export type ResponseBody<T = null> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T | null;
  error: string | null;
};

export type PaginatedResponse<T> = {
  page: number;
  perPage: number;
  nbRecords: number;
  records: T[];
}
