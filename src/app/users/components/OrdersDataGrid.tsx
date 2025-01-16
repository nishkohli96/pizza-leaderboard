'use client';

import { Fragment, useState } from 'react';
import moment from 'moment';
import {
  GridActionsCellItem,
  GridColDef,
  GridPaginationModel,
  GridRowParams,
  GridRowsProp,
} from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { axiosApi } from '@/axios';
import { DataTable, ConfirmationDialog, RowIcons } from '@/components';
import { ResponseBody, UserOrderDetails } from '@/types';
import { getUserRecordIndex } from '@/utils';

type OrderRowDetails = UserOrderDetails & {
  sNo: number;
};

type OrderDataGridProps = {
  orders: UserOrderDetails[];
  nbRecords: number;
  paginationModel: GridPaginationModel;
  onPageChange: (paginationModel: GridPaginationModel) => void;
  refetch: () => void;
  loading: boolean;
};

const OrdersDataGrid = ({
  orders,
  nbRecords,
  paginationModel,
  onPageChange,
  refetch,
  loading
}: OrderDataGridProps) => {
  const [openPizzaLogPopUp, setOpenPizzaLogPopUp] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleClosePopUp = () => setOpenPizzaLogPopUp(false);

  const handleLogPizza = async () => {
    const response = await axiosApi.post<ResponseBody>(
      '/orders/log',
      { order_id: selectedItemId }
    );
    const isLogSuccess = response.data.success;
    if(isLogSuccess) {
      toast.success(response.data.message);
      setSelectedItemId(null);
      refetch();
    }
    handleClosePopUp();
  };

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
      hideable: false,
      type: 'number',
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'pizza_id',
      headerName: 'Pizza Id',
      type: 'number',
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'created_at',
      headerName: 'Placed At',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      headerAlign: 'center',
      getActions: (params: GridRowParams) => [
        ...(params.row.isLogged
          ? [<RowIcons.LoggedPill key="loggedPizza" />]
          : [
            <GridActionsCellItem
              key="eatPizza"
              icon={<RowIcons.EatPizzaIcon />}
              label="Eat Pizza"
              onClick={() => {
                setSelectedItemId(params.row.id);
                setOpenPizzaLogPopUp(true);
              }}
            />
          ])
      ]
    }
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
      logged_at: order.logged_at,
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
        loading={loading}
      />
      {openPizzaLogPopUp && (
        <ConfirmationDialog
          title={`Log Pizza with Order Id ${selectedItemId} ?`}
          open={openPizzaLogPopUp}
          onClose={handleClosePopUp}
          onConfirm={handleLogPizza}
          confirmBtnText="Confirm"
        />
      )}
    </Fragment>
  );
};

export default OrdersDataGrid;
