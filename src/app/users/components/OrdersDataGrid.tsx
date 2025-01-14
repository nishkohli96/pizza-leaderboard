'use client';

import { Fragment, useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { DataTable, CenterContainer, ConfirmationDialog } from '@/components';
import { Gender, UserRow, ResponseBody, UserOrderDetails } from '@/types';
import { getUserRecordIndex } from '@/utils';
import { OrdersList, RowIcons } from '.';

type OrderRowDetails = UserOrderDetails & {
  sNo: number;
};

type OrderDataGridProps = {
  orders: UserOrderDetails[];
  nbRecords: number;
  // sortColumn?: GridSortItem;
  // onSortChange: (newSort: GridSortItem) => void;
  // filterModel?: GridFilterModel;
  // onFilterChange: (newFilter: GridFilterModel) => void;
  paginationModel: GridPaginationModel;
  // onPageChange: (newPageModel: GridPaginationModel) => void;
  // isFetchingData: boolean;
  // refetchData: () => void;
};

const UserDataGrid = ({
  orders,
  nbRecords,
  // sortColumn,
  // onSortChange,
  // filterModel,
  // onFilterChange,
  paginationModel,
  // onPageChange,
  // isFetchingData,
  // refetchData
}: OrderDataGridProps) => {
  const router = useRouter();
  const [openPizzaLogPopUp, setOpenPizzaLogPopUp] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleCloseDeletePopUp = () => setOpenPizzaLogPopUp(false);

  const handlePersonDelete = async () => {
    const response = await axiosApi.delete<ResponseBody>(
      `/orders/${selectedItemId}`
    );
    const isDeleted = response.data.success;
    if(isDeleted) {
      toast.success(response.data.message);
      setSelectedItemId(null);
    }
    handleCloseDeletePopUp();
  };

  const peopleTableColumns: GridColDef[] = [
    {
      field: 'sNo',
      headerName: 'S. No.',
      type: 'number',
      sortable: false,
      resizable: false,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
      filterable: false
    },
    {
      field: 'id',
      headerName: 'Order Id',
      hideable: false,
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
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      headerAlign: 'center',
      getActions: (params: GridRowParams) => [
        ...(params.row.isLogged
          ? [<RowIcons.LoggedPill />]
          : [
              <GridActionsCellItem
                key="buyPizza"
                icon={<RowIcons.EatPizzaIcon />}
                label="Buy Pizza"
                onClick={() => {
                  setSelectedItemId(params.row.id);
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
          flex: 1
        }))}
        rows={ordersTableRows}
        // isFetchingData={isFetchingData}
        rowCount={nbRecords}
        // sortColumn={sortColumn}
        // onSortChange={onSortChange}
        // filterModel={filterModel}
        // onFilterChange={onFilterChange}
        paginationModel={paginationModel}
        // onPageChange={onPageChange}
      />
      {openPizzaLogPopUp && (
        <ConfirmationDialog
          title={`Log Pizza with Order Id ${selectedItemId} ?`}
          open={openPizzaLogPopUp}
          onClose={handleCloseDeletePopUp}
          onConfirm={handlePersonDelete}
          confirmBtnText="Confirm"
        />
      )}
    </Fragment>
  );
};

export default UserDataGrid;
