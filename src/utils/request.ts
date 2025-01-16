import { dataTableConfig } from '@/constants';

type QueryParamValue = string | null;

export function getPaginationValues(
  page: QueryParamValue,
  limit: QueryParamValue
) {
  const currentPage = page ? Number(page) : 1;
  const recordsPerPage = limit ? Number(limit) : dataTableConfig.defaultPageSize;
  const skip = (currentPage - 1) * recordsPerPage;
  return {
    page: currentPage,
    limit: recordsPerPage,
    skip
  };
}

