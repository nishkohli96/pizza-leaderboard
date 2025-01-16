import { axiosApi } from '@/axios';
import { ResponseBody, UserListQueryParams, UsersListResponse } from '@/types';
import { UserDataGrid } from '.';

type GetUsersResponse = ResponseBody<UsersListResponse>;

type UsersPageProps = {
  queryParams: UserListQueryParams;
};

export default async function UsersPage({
  queryParams
}: UsersPageProps) {
  const response = await axiosApi.get<GetUsersResponse>('/users', {
    params: queryParams
  });

  const usersListData = response.data.data!;
  const { page, perPage, nbRecords, records } = usersListData;

  return (
    <UserDataGrid
      users={records}
      nbRecords={nbRecords}
      paginationModel={{
        page: page - 1,
        pageSize: perPage
      }}
      sortColumn={
        queryParams.sortKey && queryParams.sortOrder
          ? {
              field: queryParams.sortKey,
              sort: queryParams.sortOrder
            }
          : undefined
      }
    />
  );
}
