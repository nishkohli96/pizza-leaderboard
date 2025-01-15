'use client';

import { Fragment } from 'react';
import moment from 'moment';
import {
  GridColDef,
  GridPaginationModel,
  GridRowsProp,
} from '@mui/x-data-grid';
import { DataTable } from '@/components';
import { UserOrderDetails } from '@/types';
import { getUserRecordIndex } from '@/utils';

type OrderRowDetails = UserOrderDetails & {
  sNo: number;
};

type OrderDataGridProps = {
  orders: UserOrderDetails[];
  nbRecords: number;
  paginationModel: GridPaginationModel;
  onPageChange: (paginationModel: GridPaginationModel) => void;
};

const OrdersDataGrid = ({
  orders,
  nbRecords,
  paginationModel,
  onPageChange
}: OrderDataGridProps) => {

  const peopleTableColumns: GridColDef[] = [
    {
      field: 'sNo',
      headerName: 'S. No.',
      type: 'number',
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'id',
      headerName: 'Order Id',
      type: 'number',
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'pizza_id',
      headerName: 'Pizza Id',
      type: 'number',
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'created_at',
      headerName: 'Placed At'
    },
    {
      field: 'logged_at',
      headerName: 'Logged At'
    },
  ];

  const ordersTableRows: GridRowsProp<OrderRowDetails> = orders.map(
    (order, idx) => ({
      sNo: getUserRecordIndex(
        paginationModel.page,
        paginationModel.pageSize,
        idx
      ),
      id: order.id,
      pizza_id: order.pizza_id,
      created_at: moment(order.created_at).format('HH:mm - DD MMM YYYY'),
      logged_at: moment(order.logged_at).format('HH:mm - DD MMM YYYY'),
      isLogged: order.isLogged
    })
  );


  return (
    <Fragment>
      <DataTable
        columns={peopleTableColumns.map(col => ({
          ...col,
          flex: 1,
          disableColumnMenu: true,
          sortable: false
        }))}
        rows={ordersTableRows}
        rowCount={nbRecords}
        paginationModel={paginationModel}
        onPageChange={onPageChange}
      />
    </Fragment>
  );
};

export default OrdersDataGrid;
