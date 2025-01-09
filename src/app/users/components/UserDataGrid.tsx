'use client';

import { Fragment, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  GridActionsCellItem,
  GridColDef,
  GridPaginationModel,
  GridRowParams,
  GridRowsProp,
} from '@mui/x-data-grid';
import { DataTable, CenterContainer } from '@/components';
import { Gender, UserRow } from '@/types';
import { getUserRecordIndex } from '@/utils';
import { PizzaList, RowIcons } from '.';

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
  const [open, setOpen] = useState(false);
  // const [displayDeletePopUp, setDisplayDeletePopUp] = useState<boolean>(false);
  // const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // const handleCloseDeletePopUp = () => {
  //   // setDisplayDeletePopUp(false);
  // };

  // const handlePersonDelete = async () => {
  //   // const isDeleted = await deletePerson(selectedItemId ?? '');
  //   // if(isDeleted) {
  //   //   // toast.success('Person record deleted!');
  //   //   refetchData();
  //   // }
  //   handleCloseDeletePopUp();
  // };

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
      headerAlign: 'left',
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key="buyPizza"
          icon={<RowIcons.PizzaIcon />}
          label="Buy Pizza"
          onClick={() => setOpen(true)}
          // onClick={() => {
          //   router.push(`/users/${params.row.id}`);
          //   // navigate(`${personRoute.rootPath}/${personRoute.subRoutes.edit}`, {
          //   //   state: params.row
          //   // });
          // }}
        />,
        <GridActionsCellItem
          key="edit"
          icon={<RowIcons.EditIcon />}
          label="Edit"
          onClick={() => {
            router.push(`/users/${params.row.id}`);
            // navigate(`${personRoute.rootPath}/${personRoute.subRoutes.edit}`, {
            //   state: params.row
            // });
          }}
          showInMenu
        />,
        <GridActionsCellItem
          key="delete"
          icon={<RowIcons.DeleteIcon />}
          label="Delete"
          onClick={() => {
            // setSelectedItemId(params.row._id);
            // setDisplayDeletePopUp(true);
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
        // onPageChange={onPageChange}
      />
      {open && (
        <PizzaList
          open={open}
          handleClose={() => setOpen(false)}
        />
      )}
      {/* {displayDeletePopUp && (
        <ConfirmationDialog
          title={`Delete Person with Id ${selectedItemId} ?`}
          contentText="This will soft-delete the record..."
          open={displayDeletePopUp}
          onClose={handleCloseDeletePopUp}
          onConfirm={handlePersonDelete}
          confirmBtnText="Confirm"
        />
      )} */}
    </Fragment>
  );
};

export default UserDataGrid;
