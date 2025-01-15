'use client';

import { Fragment } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  GridColDef,
  GridPaginationModel,
  GridRowsProp,
} from '@mui/x-data-grid';
import { DataTable, RowIcons } from '@/components';
import { Gender, LeaderboardRecord } from '@/types';
import { getUserRecordIndex } from '@/utils';

type LeaderboardRow = LeaderboardRecord & { sNo: number };

type LeaderboardDataGridProps = {
  records: LeaderboardRecord[];
  nbRecords: number;
  paginationModel: GridPaginationModel;
};

const LeaderboardDataGrid = ({
  records,
  nbRecords,
  paginationModel,
}: LeaderboardDataGridProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const peopleTableColumns: GridColDef[] = [
    {
      field: 'sNo',
      headerName: 'S. No.',
      type: 'number',
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
    },
    {
      field: 'name',
      headerName: 'Name',
      hideable: false,
      type: 'string',
			disableColumnMenu: true,
			sortable: false,
    },
    {
      field: 'coins',
      headerName: 'Wallet Balance',
			disableColumnMenu: true,
			sortable: false,
      renderCell: params => (
        <RowIcons.RenderCoins coins={params.value} />
      )
    },
		{
      field: 'num_orders',
			disableColumnMenu: true,
			sortable: false,
			headerName: 'Pizzas Logged',
      type: 'number',
			align: 'center',
      headerAlign: 'center',
    },
  ];

  const leaderboardTableRows: GridRowsProp<LeaderboardRow> = records.map(
    (record, idx) => ({
      sNo: getUserRecordIndex(
        paginationModel.page,
        paginationModel.pageSize,
        idx
      ),
      id: record.id,
      name: record.name,
      coins: record.coins,
			num_orders: record.num_orders
    })
  );

  function handleOnPageChange(pagination: GridPaginationModel) {
    const newPage = pagination.page + 1;
    const limit = pagination.pageSize;
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    params.set('limit', limit.toString());
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Fragment>
      <DataTable
        columns={peopleTableColumns.map(col => ({
          ...col,
          flex: 1
        }))}
        rows={leaderboardTableRows}
        rowCount={nbRecords}
        paginationModel={paginationModel}
        onPageChange={handleOnPageChange}
      />
    </Fragment>
  );
};

export default LeaderboardDataGrid;
