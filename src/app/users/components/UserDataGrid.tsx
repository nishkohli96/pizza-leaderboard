'use client';

import { Fragment, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
import { Gender, UserRow, ResponseBody } from '@/types';
import { getUserRecordIndex } from '@/utils';
import { PizzaList, OrdersList, RowIcons } from '.';

type UserRowDetails = UserRow & { sNo: number };

type UserDataGridProps = {
  users: UserRow[];
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
  users,
  nbRecords,
  // sortColumn,
  // onSortChange,
  // filterModel,
  // onFilterChange,
  paginationModel,
  // onPageChange,
  // isFetchingData,
  // refetchData
}: UserDataGridProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [openPizzaList, setOpenPizzaList] = useState(false);
  const [openOrdersList, setOpenOrdersList] = useState(false);
  const [displayDeletePopUp, setDisplayDeletePopUp] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleCloseDeletePopUp = () => setDisplayDeletePopUp(false);

  const handlePersonDelete = async () => {
    const response = await axiosApi.delete<ResponseBody>(
      `/users/${selectedItemId}`
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
      filterable: false,
    },
    {
      field: 'name',
      headerName: 'Name',
      hideable: false,
      type: 'string',
    },
    {
      field: 'gender',
      headerName: 'Gender',
      align: 'center',
      headerAlign: 'center',
      type: 'singleSelect',
      valueOptions: Object.values(Gender),
      renderCell: params => (
        <CenterContainer>
          <RowIcons.GenderIcon gender={params.value} />
        </CenterContainer>
      )
    },
    {
      field: 'coins',
      headerName: 'Wallet',
      renderCell: params => (
        <RowIcons.RenderCoins coins={params.value} />
      )
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      headerAlign: 'center',
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key="buyPizza"
          icon={<RowIcons.PizzaMenuIcon />}
          label="Buy Pizza"
          onClick={() => {
            setSelectedItemId(params.row.id);
            setOpenPizzaList(true);
          }}
        />,
        <GridActionsCellItem
          key="logPizza"
          icon={<RowIcons.LogPizzaIcon />}
          label="Log Pizza"
          onClick={() => {
            setSelectedItemId(params.row.id);
            setOpenOrdersList(true);
          }}
        />,
        <GridActionsCellItem
          key="logPizza"
          icon={<RowIcons.PizzasLoggedIcon />}
          label="Logged Pizzas"
          onClick={() => setOpenPizzaList(true)}
        />,
        <GridActionsCellItem
          key="edit"
          icon={<RowIcons.EditIcon />}
          label="Edit"
          onClick={() => router.push(`/users/${params.row.id}`)}
          showInMenu
        />,
        <GridActionsCellItem
          key="delete"
          icon={<RowIcons.DeleteIcon />}
          label="Delete"
          onClick={() => {
            setSelectedItemId(params.row.id);
            setDisplayDeletePopUp(true);
          }}
          showInMenu
        />
      ]
    }
  ];

  const userTableRows: GridRowsProp<UserRowDetails> = users.map(
    (person, idx) => ({
      sNo: getUserRecordIndex(
        paginationModel.page,
        paginationModel.pageSize,
        idx
      ),
      id: person.id,
      name: person.name,
      gender: person.gender,
      coins: person.coins
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
        rows={userTableRows}
        // isFetchingData={isFetchingData}
        rowCount={nbRecords}
        // sortColumn={sortColumn}
        // onSortChange={onSortChange}
        // filterModel={filterModel}
        // onFilterChange={onFilterChange}
        paginationModel={paginationModel}
        onPageChange={handleOnPageChange}
      />
      {openPizzaList && (
        <PizzaList
          open={openPizzaList}
          userId={selectedItemId ?? ''}
          handleClose={() => {
            setSelectedItemId(null);
            setOpenPizzaList(false);
          }}
        />
      )}
      {openOrdersList && (
        <OrdersList
          open={openOrdersList}
          userId={selectedItemId ?? ''}
          handleClose={() => {
            setSelectedItemId(null);
            setOpenOrdersList(false);
          }}
        />
      )}
      {displayDeletePopUp && (
        <ConfirmationDialog
          title={`Delete Person with Id ${selectedItemId} ?`}
          contentText="This will soft-delete the record."
          open={displayDeletePopUp}
          onClose={handleCloseDeletePopUp}
          onConfirm={handlePersonDelete}
          confirmBtnText="Confirm"
        />
      )}
    </Fragment>
  );
};

export default UserDataGrid;
